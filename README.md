# Hype Bam — Sri Lankanized Energy Drink

Production marketing site for **Hype Bam** ([drinkhypebam.com](https://drinkhypebam.com)), built with **Next.js 15 · React 19 · TypeScript**.

Fully self-hosted: every script, style, font, image and video ships from this repo. A production `Content-Security-Policy` enforces that — no third-party origin can be contacted at runtime.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build |
| `npm start` | Serve the production build locally |
| `npm run lint` | ESLint (`next/core-web-vitals`) |

**Requirements:** Node.js 18.18+ (20 LTS recommended), npm 9+.

---

## ⚠️ Required before launch — contact form

The footer contact form posts to `/api/contact`, which relays the enquiry to
`info@hypebam.lk` and `sales@hypebam.lk`. **It cannot send until these
environment variables are set**, and will show visitors a clear
"not configured yet" message instead of silently failing.

| Variable | Required | Example |
| --- | --- | --- |
| `RESEND_API_KEY` | ✅ | `re_xxxxxxxxxxxx` |
| `CONTACT_FROM` | ✅ | `Hype Bam <website@hypebam.lk>` |
| `CONTACT_TO` | — | defaults to `info@hypebam.lk,sales@hypebam.lk` |
| `NEXT_PUBLIC_SITE_URL` | recommended | `https://drinkhypebam.com` |

**Setup:**

1. Create an account at [resend.com](https://resend.com).
2. Add the `hypebam.lk` domain and complete **domain verification** — add the
   SPF and DKIM DNS records it provides (a DMARC record is recommended too).
   Skipping this is the single most common cause of enquiries landing in spam.
3. Create an API key.
4. In **Vercel → Project → Settings → Environment Variables**, add
   `RESEND_API_KEY` and `CONTACT_FROM`, then redeploy.

See `.env.example` for the full annotated template.

> **Security:** `RESEND_API_KEY` is server-only. It is read at request time
> inside the Route Handler and is never bundled into client JavaScript
> (verified by building with a sentinel value and grepping the output).
> **Never rename a secret to `NEXT_PUBLIC_*`** — that prefix publishes it to
> every visitor. `.env` is git-ignored; keep real values in Vercel only.

---

## Deployment (Vercel)

The repo is Vercel-ready (`vercel.json` pins the Next.js framework preset).

1. Import the repository in Vercel.
2. Add the environment variables above.
3. Deploy — build command `npm run build`, output `.next`.

Security headers (CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`,
`Permissions-Policy`) and long-lived asset caching are configured in
`next.config.ts`.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # fonts, metadata/OG, CSS links, GSAP boot, ASSET_VERSION
│   ├── page.tsx            # section composition
│   ├── globals.css         # all custom CSS (see “CSS cascade” below)
│   ├── api/contact/        # contact form endpoint (server-only, sends mail)
│   └── error / not-found / manifest / robots / sitemap
├── components/
│   ├── layout/             # Navbar, Loader
│   ├── sections/           # Hero, Insider, Sequence, Benefits, Testimonials,
│   │                       #   Reviews, Flavour, Payment, Footer
│   └── ui/                 # Button, SocialLinks, ContactForm, ResourcePreloader
└── hooks/useAnimations.ts  # GSAP boot pipeline + scroll animations

public/
├── img/                    # photography & canvas frames — see “Images” below
│   ├── hypeBamVideo001…0023.webp   # hero canvas frames (names NOT zero-padded)
│   ├── seq_0_0…199.webp            # pinned-sequence scrub frames
│   └── video/compressed/           # testimonial mp4s (originals git-ignored)
├── scripts/app.js          # Lenis smooth scroll + site animation bundle
├── styles/                 # webflow.css → main.css → responsive.css
└── vendor/gsap/            # GSAP 3.14 core + plugins (UMD)

scripts/                    # dev tooling, not part of the build
├── mobile-audit.mjs        # Playwright audit: JS errors + horizontal overflow
├── compress-videos.mjs     # one-time ffmpeg pass
└── optimize-images.mjs     # one-time sharp pass — already applied, do not re-run
```

---

## Architecture notes

These are the non-obvious rules. Breaking them causes bugs that look
unrelated to the change that caused them.

### CSS cascade — load order is not source order

Next.js hoists the bundled `globals.css` **above** the manual `<link>` tags,
so the real browser order is:

```
globals.css  →  webflow.css  →  main.css  →  responsive.css
   (first)                                       (last, wins)
```

`globals.css` loads **first**, not last. At equal specificity the static files
win, so overrides in `globals.css` generally need `!important`, and
`responsive.css` is the most reliable place for a final override.

### Bump `ASSET_VERSION` when editing the static CSS

`public/styles/*.css` is served with `Cache-Control: immutable, max-age=1yr`.
Those files carry no content hash, so an edit will **not** reach browsers that
have already cached them — a correct fix can look completely unapplied.

After editing `webflow.css`, `main.css` or `responsive.css`, bump
`ASSET_VERSION` in `src/app/layout.tsx`.

### Images

Images are served at their **original** dimensions and are never resized or
re-encoded. Performance work adapts *loading strategy* (preload / prefetch /
lazy / decode timing), never quality.

Preload `as` must match how a resource is actually consumed: the hero and
sequence frames are fetched via `fetch()` + `createImageBitmap`, so they
preload as `as="fetch"`, not `as="image"`.

### Hero canvas frames

`app.js` loads **only frames 1–23** (the intro tweens 0→22, the idle loop
yoyos 22↔0). Frames 24–90 were never drawn and have been removed. If you
change the intro length, update both the frame files and the `length: 23`
array in `app.js`.

### Webflow grid IDs

Layout for several grid children comes from Webflow ID rules
(`#w-node-…{grid-column:span N}`), which outrank class rules. Replacing a
`w-node` id with a friendly one silently collapses that element's grid
placement — attach anchors to inner elements instead.

---

## Quality checks

```bash
npx tsc --noEmit               # types
npm run lint                   # lint
node scripts/mobile-audit.mjs  # JS errors + horizontal overflow, 4 device profiles
```

`mobile-audit.mjs` drives system Edge via Playwright (`channel: 'msedge'`).

**Verified:** zero JS errors and zero horizontal overflow at 320 / 360 / 375 /
390 / 768 / 1440 / 2560 / 3840 px.

---

## Browser support

Modern evergreen browsers plus Safari/iOS 13+ (see `browserslist` in
`package.json`). Progressive enhancement is used for newer CSS —
`svh` units fall back to `vh`, and `overflow: clip` falls back to `hidden`.

---

## License

Proprietary — © Hype Bam. All rights reserved.
