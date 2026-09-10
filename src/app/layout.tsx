import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { ResourcePreloader } from "@/components/ui";
import { ASSET_VERSION } from "@/lib/assetVersion";

// ── Local fonts ──────────────────────────────────────────────────────────────
const badBrush = localFont({
  // woff2 only. The .woff twin was a fallback for browsers that no longer
  // exist, and next/font PRELOADED it too — 119 KB of dead weight on the
  // hero's critical path on every visit.
  src: [
    { path: "../../public/fonts/bad-brush/BadBrush.woff2" },
  ],
  variable: "--font-bad-brush",
  display: "swap",
});

const goga = localFont({
  // Only the weights actually used across the CSS are loaded (300–800).
  // Hairline(100)/Thin(200)/Light(350)/Black(900) were unused and removed.
  src: [
    { path: "../../public/fonts/goga/GogaTest-Extralight-BF6646d5d82fb83.otf", weight: "300" },
    { path: "../../public/fonts/goga/GogaTest-Regular-BF6646d5d84f69b.otf",    weight: "400" },
    { path: "../../public/fonts/goga/GogaTest-Medium-BF6646d5d84754e.otf",     weight: "500" },
    { path: "../../public/fonts/goga/GogaTest-Semibold-BF6646d5d8544cf.otf",   weight: "600" },
    { path: "../../public/fonts/goga/GogaTest-Bold-BF6646d5d83c978.otf",       weight: "700" },
    { path: "../../public/fonts/goga/GogaTest-Extrabold-BF6646d5d7d0a2b.otf", weight: "800" },
  ],
  variable: "--font-goga",
  display: "swap",
});

const caveat = localFont({
  src: [
    { path: "../../public/fonts/caveat/Caveat-VariableFont_wght.ttf" },
  ],
  weight: "400 700",
  variable: "--font-caveat",
  display: "swap",
  // 384 KB, and only used BELOW the fold (.reviews-swipe-hint, .hbf-tagline).
  // Preloading it put the single largest asset on the page ahead of the hero
  // frames and CSS on a slow phone. It still loads on demand (display:swap)
  // the moment its first glyph is rendered, long before the user scrolls there.
  preload: false,
});

// Set NEXT_PUBLIC_SITE_URL in your deploy env to the real domain so social/OG
// image + canonical URLs resolve absolutely. Falls back to the handle domain.
/* ASSET_VERSION (imported above from src/lib/assetVersion.ts) cache-busts the
   static /public stylesheets AND /scripts/app.js — bump it there on every edit
   to any of them. */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://drinkhypebam.com";

/* ── Hero frame prefetch + DECODE — the very first thing in <head> ──
   app.js's yo() cannot lift the loader until hero frame 0 is a decoded
   bitmap, and it only STARTS that fetch at the end of a long chain (hydrate
   → 6 GSAP files → app.js → fonts). This script runs the instant the parser
   reaches it, so the frames download + decode in parallel with everything
   else; app.js's P() reads the promises straight out of window.__hypeHeroFrames.

   WHY A RAW <script> AND WHY IT MUST SIT ABOVE THE STYLESHEETS: a browser will
   not execute an inline script until every <link rel=stylesheet> BEFORE it has
   finished loading. As a next/script this landed after 215 KB of CSS and on a
   throttled phone sat idle for the whole page load (measured: zero frame
   requests in 14 s). Position in head = JSX order, so it lives up here.

   ORDERING (all three alternatives were measured on a throttled 4G phone):
     · all 23 High from parse time  → they out-compete the CSS/JS/fonts the
       reveal is gated on; reveal 6.6 s, "SplitText before fonts" warnings
     · frames 2-22 Low              → Chrome throttles Low so hard during load
       that only 12 of 23 were even requested after 14 s; reveal 4.8 s
     · this: frames 0-1 now (High — the reveal needs them), frames 2-22 only
       once app.js is EXECUTING (window.__hypeHeroKick, called from
       initializeApp) — by then CSS, Next chunks and GSAP are all in, the pipe
       is otherwise idle, and the frames get it to themselves at 6-wide.
       A 20 s timer auto-kicks in case app.js never arrives — deliberately
       long: on 3G app.js itself takes >4 s, and an early kick put 1 MB of
       frames in front of it.

   This is NOT extra bandwidth: app.js already fetched all 23. It moves that
   work earlier and orders it correctly. ── */
const HERO_PREFETCH = `
(function () {
  try {
    if (!window.fetch) return;
    var BASE = '/img/', TOTAL = 23, cache = {}, urls = [], ctl = {};
    for (var i = 1; i <= TOTAL; i++) urls.push(BASE + 'hypeBamVideo00' + i + '.webp');
    function decode(blob) {
      if (window.createImageBitmap) return createImageBitmap(blob, { imageOrientation: 'from-image' });
      return new Promise(function (ok, no) {
        var im = new Image(); im.onload = function () { ok(im); }; im.onerror = no;
        im.src = URL.createObjectURL(blob);
      });
    }
    // Every URL gets its promise NOW so app.js can await it; the fetches
    // themselves are metered through the queue below.
    urls.forEach(function (u) { cache[u] = new Promise(function (ok, no) { ctl[u] = { ok: ok, no: no }; }); });
    // limit = how many of the 23 may be started so far: 2 until kicked.
    var next = 0, active = 0, MAX = 2, limit = 2, kicked = false;
    function pump() {
      while (active < MAX && next < limit) {
        (function (u, idx) {
          active++;
          fetch(u, idx < 2 ? { priority: 'high' } : {})
            .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.blob(); })
            .then(decode)
            .then(function (bmp) { ctl[u].ok(bmp); })
            .catch(function (e) { ctl[u].no(e); })
            .then(function () { active--; pump(); });
        })(urls[next], next);
        next++;
      }
    }
    window.__hypeHeroKick = function () {
      if (kicked) return; kicked = true;
      limit = urls.length; MAX = 6; pump();
    };
    setTimeout(window.__hypeHeroKick, 20000);
    pump();
    window.__hypeHeroFrames = cache;
  } catch (e) { /* app.js falls back to its own fetch */ }
})();
`;
const OG_IMAGE = "/og-image.jpg"; // dedicated 1200×630 social card (JPG = max platform support)

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hype Bam | Sri Lankanized Energy Drink",
    template: "%s | Hype Bam",
  },
  description:
    "Hype Bam is a Sri Lankanized energy drink with 80mg caffeine, electrolytes, only 5g sugar and five bold flavours. Find your flavour and fuel the rebel.",
  applicationName: "Hype Bam",
  keywords: [
    "Hype Bam", "energy drink", "Sri Lanka", "Sri Lankanized", "caffeine",
    "electrolytes", "low sugar", "natural flavours", "fuel the rebel",
  ],
  authors: [{ name: "Hype Bam" }],
  creator: "Hype Bam",
  publisher: "Hype Bam",
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, address: false, email: false },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/img/hypebam-logo-final-vector-02-orange.svg", type: "image/svg+xml" },
    ],
    apple: "/img/hypebam-logo-final-vector-02-orange.svg",
  },
  appleWebApp: {
    capable: true,
    title: "Hype Bam",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "website",
    siteName: "Hype Bam",
    title: "Hype Bam | Sri Lankanized Energy Drink",
    description:
      "Hype Bam is a Sri Lankanized energy drink with 80mg caffeine, electrolytes, only 5g sugar and five bold flavours. Find your flavour and fuel the rebel.",
    url: "/",
    locale: "en_US",
    images: [{ url: OG_IMAGE, width: 900, height: 900, alt: "Hype Bam energy drink — Fuel The Rebel" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hype Bam | Sri Lankanized Energy Drink",
    description:
      "Hype Bam is a Sri Lankanized energy drink with 80mg caffeine, electrolytes, only 5g sugar and five bold flavours. Find your flavour and fuel the rebel.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // respect notch / safe areas on modern phones
  themeColor: "#E8460F",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${badBrush.variable} ${goga.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* FIRST in head, before any stylesheet — see HERO_PREFETCH above. */}
        <script id="hero-frame-prefetch" dangerouslySetInnerHTML={{ __html: HERO_PREFETCH }} />

        {/* ── All assets are served locally (no CDN). External CDN <link>s and
             preconnects were removed: Firefox/Safari/Edge privacy & tracking
             protection block third-party CDN requests, which broke styling
             cross-browser. Everything below is same-origin. ── */}

        {/* ── Critical above-fold CSS ──
             `?v=` CACHE BUST: these are STATIC files in /public, so unlike the
             bundled globals.css they get no content hash and Vercel serves them
             with a long-lived cache. Editing one therefore does NOT reach
             visitors (or even our own browser) until the cache expires — a fix
             can look "not applied" while the file on disk is already correct.
             Bump ASSET_VERSION on every edit to webflow/main/responsive.css. ── */}
        <link href={`/styles/webflow.css?v=${ASSET_VERSION}`} rel="stylesheet" type="text/css" />
        <link href={`/styles/main.css?v=${ASSET_VERSION}`} rel="stylesheet" type="text/css" />
        {/* ── Responsive overrides — MUST be last to win cascade ── */}
        <link href={`/styles/responsive.css?v=${ASSET_VERSION}`} rel="stylesheet" type="text/css" />

        {/* ── First sequence frame. app.js So() loads it with a plain fetch(),
             whose credentials mode is "same-origin" — for a preload that is
             crossorigin="anonymous"; without it the browser warns "credentials
             mode does not match" and fetches the file a second time. ── */}
        <link rel="preload" href="/img/seq_0_0.webp" as="fetch" type="image/webp" crossOrigin="anonymous" />

        {/* ── Preload EVERY above-the-fold image ──
             Everything the loader and the hero intro paint, requested at parse
             time so none of it is discovered late by the parser/GSAP. The loader
             icon goes first: it is the ONLY thing on screen for the first second,
             and it was never preloaded before (a blank dark void until the PNG
             arrived). ── */}
        <link rel="preload" href="/img/original-flavor-icon.png" as="image" type="image/png" fetchPriority="high" />
        <link rel="preload" href="/img/hypebam-logo-final-vector-02.svg" as="image" type="image/svg+xml" fetchPriority="high" />
        <link rel="preload" href="/img/cdn/688655fd2fed5f707c038914_Layer_1_3.svg" as="image" type="image/svg+xml" fetchPriority="high" />
        {/* The four fact badges (250 KB) animate in ~3 s into the intro — Low so
            they never outrank the CSS/JS/frame-0 the reveal itself needs. */}
        <link rel="preload" href="/img/hero/4.jpg" as="image" type="image/jpeg" fetchPriority="low" />
        <link rel="preload" href="/img/hero/3.jpg" as="image" type="image/jpeg" fetchPriority="low" />
        <link rel="preload" href="/img/hero/1.jpg" as="image" type="image/jpeg" fetchPriority="low" />
        <link rel="preload" href="/img/hero/2.jpg" as="image" type="image/jpeg" fetchPriority="low" />
        {/* NO preload for the flavour cans: they're below the fold and
            ResourcePreloader already prefetches all five at idle. The old
            parse-time preload of can-1 (198 KB) competed with the hero. */}

        {/* ── PRELOAD the critical JS up-front (high priority, in parallel with the
             loader) so the animation engine + Webflow bundle are already in cache
             the instant they're needed — no real-time fetch stall on first paint.
             These are small (gzip ~a few KB each) so they're mobile-data friendly,
             and we don't touch image quality. The matching <Script>/loader below
             then execute from cache. ── */}
        {/* fetchPriority="low": none of these can run until React has hydrated,
             and at default priority they were measured pushing Next's own
             chunks (which hydration IS waiting on) back by ~1 s. Low lets the
             chunks go first; these still finish well before they're needed. */}
        <link rel="preload" href="/vendor/gsap/gsap.min.js" as="script" fetchPriority="low" />
        <link rel="preload" href="/vendor/gsap/ScrollTrigger.min.js" as="script" fetchPriority="low" />
        <link rel="preload" href="/vendor/gsap/CustomEase.min.js" as="script" fetchPriority="low" />
        <link rel="preload" href="/vendor/gsap/DrawSVGPlugin.min.js" as="script" fetchPriority="low" />
        <link rel="preload" href="/vendor/gsap/InertiaPlugin.min.js" as="script" fetchPriority="low" />
        <link rel="preload" href="/vendor/gsap/SplitText.min.js" as="script" fetchPriority="low" />
        {/* Same `?v=` as useAnimations' loadScript — the URL must match exactly
             for the preload to be reused. app.js is immutable-cached for a year,
             so this query is the ONLY thing that gets a fix to returning phones.
             Default priority (NOT low): it is the first thing needed the instant
             hydration completes, and Low was measured deferring its download
             until after the chunks, costing ~500 ms. */}
        <link rel="preload" href={`/scripts/app.js?v=${ASSET_VERSION}`} as="script" />

        {/* ── Real GSAP 3.14 + the plugins app.js actually uses, served locally ──
            As of GSAP 3.13 (May 2025) every plugin is 100% free — no Club
            membership. We serve the genuine UMD builds from /vendor/gsap so
            app.js gets real SplitText / DrawSVG / Inertia / CustomEase /
            ScrollTrigger instead of hand-written polyfills. Order matters:
            gsap core first, then plugins (each UMD self-registers when it
            finds window.gsap; useAnimations also registers explicitly). */}
        {/* ── GSAP scripts: afterInteractive (NOT beforeInteractive) ──
             beforeInteractive makes these render-blocking — nothing shows (not
             even the loader) until all 6 download+execute. On slow mobile that
             means a blank white screen. afterInteractive lets the loader show
             immediately; the <link rel=preload> tags above already start the
             downloads at highest priority, and useAnimations.ts's waitFor()
             poll gates app.js until GSAP is actually ready. ── */}
        <Script src="/vendor/gsap/gsap.min.js" strategy="afterInteractive" />
        <Script src="/vendor/gsap/ScrollTrigger.min.js" strategy="afterInteractive" />
        <Script src="/vendor/gsap/CustomEase.min.js" strategy="afterInteractive" />
        <Script src="/vendor/gsap/DrawSVGPlugin.min.js" strategy="afterInteractive" />
        <Script src="/vendor/gsap/InertiaPlugin.min.js" strategy="afterInteractive" />
        <Script src="/vendor/gsap/SplitText.min.js" strategy="afterInteractive" />


        <Script id="webflow-classes" strategy="afterInteractive">
          {`
            (function (o, c) {
              var n = c.documentElement,
                t = " w-mod-";
              n.className += t + "js";
              if ("ontouchstart" in o || (o.DocumentTouch && c instanceof DocumentTouch)) {
                n.className += t + "touch";
              }
            })(window, document);
          `}
        </Script>
      </head>
      <body className="body" suppressHydrationWarning>
        {children}
        {/* Smart runtime prefetcher — watches scroll and pre-fetches assets just before needed */}
        <ResourcePreloader />
        <Script id="fallback-loader" strategy="afterInteractive">
          {`
            var __DEV__ = ${JSON.stringify(process.env.NODE_ENV !== 'production')};
            // ⚠ These are SAFETY NETS, not the normal path. app.js yo() lifts the
            // loader itself the moment hero frame 0 is drawable (~1-2s). If one
            // of these fires first, yo() detects is-ready is already present and
            // jumps its intro to the end state instead of hiding the (already
            // visible) hero and replaying it — that hide+replay was the
            // "site loads twice" bug. The old 6s value was routinely beaten by
            // the 1 MB frame set on 3G, which is exactly when it fired.
            setTimeout(function () {
              if (!document.documentElement.classList.contains('is-ready')) {
                if (__DEV__) console.warn('Fallback: forcing loader hide after 9s');
                document.documentElement.classList.add('fonts-loaded', 'is-ready', 'has-seq-ready');
              }
              document.documentElement.classList.remove('lenis-stopped');
              document.body.classList.remove('lenis-stopped');
              document.documentElement.style.overflow = '';
              document.body.style.overflow = '';
              if (window.lenis) window.lenis.start();
            }, 9000);

            // Safety: only un-stick the loader if it's STILL stuck after 11s.
            // Do NOT tear down lenis/animations here — a single unrelated runtime
            // error (e.g. a vendored Swiper edge case) must not disable the whole
            // scroll/animation experience.
            setTimeout(function () {
              if (!document.documentElement.classList.contains('is-ready')) {
                document.documentElement.classList.add('fonts-loaded', 'is-ready', 'has-seq-ready');
                document.documentElement.classList.remove('lenis-stopped');
                document.body.classList.remove('lenis-stopped');
                if (window.lenis) try { window.lenis.start(); } catch (e) {}
                if (__DEV__) console.warn('Fallback: forced loader hide after 11s');
              }
            }, 11000);

            // Last-resort: if the loader never lifts AND an error fired, just make
            // the page usable (reveal + scrollable). Crucially this does NOT remove
            // the lenis classes or stop lenis — keeping smooth scroll + animations
            // alive even when some non-critical script throws.
            window.addEventListener('error', function (ev) {
              if (__DEV__) console.warn('Runtime error (non-fatal for animations):', ev.message);
              if (!document.documentElement.classList.contains('is-ready')) {
                document.documentElement.classList.add('fonts-loaded', 'is-ready', 'has-seq-ready');
                document.documentElement.style.overflow = '';
                document.body.style.overflow = '';
              }
            });
          `}
        </Script>
      </body>
    </html>
  );
}
