import { NextResponse } from 'next/server';

/**
 * Contact form endpoint — delivers enquiries to the Hype Bam inboxes.
 *
 * Deliberately dependency-free: it calls the mail provider's plain REST API
 * with `fetch` rather than pulling in an SDK. (The site's CSP forbids the
 * BROWSER from talking to any third-party origin — `connect-src 'self'` — so
 * the send has to happen server-side anyway, and server-side fetch is not
 * subject to CSP at all.)
 *
 * Required env vars (set in Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY   — API key from resend.com
 *   CONTACT_FROM     — verified sender, e.g. "Hype Bam <website@hypebam.lk>"
 * Optional:
 *   CONTACT_TO       — comma-separated override for the recipients below
 */

const RECIPIENTS = (process.env.CONTACT_TO ?? 'info@hypebam.lk,sales@hypebam.lk')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

// Deliberately permissive: one @, no spaces, a dot in the domain. Stricter
// regexes reject valid real-world addresses far more often than they catch
// typos, and the address is verified for real by whether the reply lands.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = { name: 100, phone: 40, email: 200, message: 4000 } as const;

/** Per-IP throttle. NOTE the real limitation: serverless instances are not
 *  shared and get recycled, so this Map is per-instance and resets on cold
 *  start — it reliably stops a single client hammering a warm instance, but it
 *  is NOT a hard global cap. It is one layer of several (origin check, dwell
 *  time, honeypot); if real abuse ever shows up, the right escalation is a
 *  shared store (Vercel KV / Upstash) or a CAPTCHA — see SECURITY notes in
 *  .env.example. */
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
    recent.push(now);
    hits.set(ip, recent);
    if (hits.size > 5000) hits.clear();   // crude memory guard
    return recent.length > MAX_PER_WINDOW;
}

/** Only accept posts that a browser made from our own page. Blocks drive-by
 *  scripts and curl'd spam outright; browsers always send Origin on a
 *  cross-origin-capable POST, so a missing Origin means "not our form".
 *  Compared against the request's OWN host, so preview deployments and the
 *  custom domain both work with no config. */
function sameOrigin(request: Request): boolean {
    const origin = request.headers.get('origin');
    if (!origin) return false;
    const host = request.headers.get('host');
    try {
        return !!host && new URL(origin).host === host;
    } catch {
        return false;
    }
}

/** Naive bots submit the instant they see a form. A real person needs seconds
 *  to type four fields. `startedAt` is the client's form-mount timestamp. */
const MIN_DWELL_MS = 3_000;
const MAX_BODY_BYTES = 16_000;

/** Escape user input before it goes into the HTML email body. */
function esc(s: string): string {
    return s.replace(/[&<>"']/g, (c) =>
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!)
    );
}

export async function POST(request: Request) {
    if (!sameOrigin(request)) {
        return NextResponse.json({ error: 'Invalid request.' }, { status: 403 });
    }

    // Cap the body before parsing so a huge payload can't be used to burn CPU.
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
        return NextResponse.json({ error: 'That message is too long.' }, { status: 413 });
    }

    let body: Record<string, unknown>;
    try {
        body = JSON.parse(raw);
    } catch {
        return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
    }

    // Honeypot: a field hidden from humans via CSS. Bots fill every input they
    // find, so anything here means "bot" — answer 200 so they don't learn.
    if (typeof body.company === 'string' && body.company.trim() !== '') {
        return NextResponse.json({ ok: true });
    }

    // Submitted implausibly fast for a human-typed form → bot. Same silent 200.
    const startedAt = Number(body.startedAt);
    if (Number.isFinite(startedAt) && Date.now() - startedAt < MIN_DWELL_MS) {
        return NextResponse.json({ ok: true });
    }

    const name = String(body.name ?? '').trim();
    const phone = String(body.phone ?? '').trim();
    const email = String(body.email ?? '').trim();
    const message = String(body.message ?? '').trim();

    const errors: Record<string, string> = {};
    if (!name) errors.name = 'Please enter your name.';
    else if (name.length > LIMITS.name) errors.name = 'That name is too long.';

    if (!phone) errors.phone = 'Please enter your phone number.';
    else if (phone.length > LIMITS.phone) errors.phone = 'That phone number is too long.';
    else if (!/[0-9]/.test(phone)) errors.phone = 'Please enter a valid phone number.';

    if (!email) errors.email = 'Please enter your email.';
    else if (email.length > LIMITS.email) errors.email = 'That email is too long.';
    else if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.';

    if (!message) errors.message = 'Please enter a message.';
    else if (message.length > LIMITS.message) errors.message = 'That message is too long.';

    if (Object.keys(errors).length) {
        return NextResponse.json({ errors }, { status: 400 });
    }

    const ip =
        request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
        request.headers.get('x-real-ip') ||
        'unknown';
    if (rateLimited(ip)) {
        return NextResponse.json(
            { error: 'Too many messages. Please wait a minute and try again.' },
            { status: 429 }
        );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.CONTACT_FROM;
    if (!apiKey || !from) {
        // Never silently swallow: without this the form would "succeed" while
        // no mail is ever delivered.
        console.error('[contact] RESEND_API_KEY and/or CONTACT_FROM is not set — cannot send.');
        return NextResponse.json(
            { error: 'The contact form is not configured yet. Please email info@hypebam.lk directly.' },
            { status: 503 }
        );
    }

    const html = `
        <h2 style="font-family:Arial,sans-serif">New enquiry from hypebam.lk</h2>
        <table style="font-family:Arial,sans-serif;font-size:15px;border-collapse:collapse">
          <tr><td style="padding:4px 12px 4px 0"><strong>Name</strong></td><td>${esc(name)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0"><strong>Phone</strong></td><td>${esc(phone)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0"><strong>Email</strong></td><td>${esc(email)}</td></tr>
        </table>
        <p style="font-family:Arial,sans-serif;font-size:15px"><strong>Message</strong></p>
        <p style="font-family:Arial,sans-serif;font-size:15px;white-space:pre-wrap">${esc(message)}</p>
    `;

    try {
        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from,
                to: RECIPIENTS,
                // Hitting Reply in the inbox replies to the customer, not to us.
                reply_to: email,
                subject: `Hype Bam enquiry — ${name}`,
                html,
                text:
                    `New enquiry from hypebam.lk\n\n` +
                    `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}\n`,
            }),
        });

        if (!res.ok) {
            const detail = await res.text().catch(() => '');
            console.error('[contact] provider rejected the send:', res.status, detail);
            return NextResponse.json(
                { error: 'We could not send your message. Please try again, or email info@hypebam.lk.' },
                { status: 502 }
            );
        }
    } catch (err) {
        console.error('[contact] network error while sending:', err);
        return NextResponse.json(
            { error: 'We could not send your message. Please try again, or email info@hypebam.lk.' },
            { status: 502 }
        );
    }

    return NextResponse.json({ ok: true });
}
