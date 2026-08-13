import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { ResourcePreloader } from "@/components/ui";

// ── Local fonts ──────────────────────────────────────────────────────────────
const badBrush = localFont({
  src: [
    { path: "../../public/fonts/bad-brush/BadBrush.woff2" },
    { path: "../../public/fonts/bad-brush/BadBrush.woff" },
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
});

// Set NEXT_PUBLIC_SITE_URL in your deploy env to the real domain so social/OG
// image + canonical URLs resolve absolutely. Falls back to the handle domain.
/* Cache-bust token for the static /public stylesheets — bump on every edit to
   webflow.css / main.css / responsive.css so browsers and the CDN fetch the
   new file instead of a stale cached copy. */
const ASSET_VERSION = "2026-08-13-1";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://drinkhypebam.com";
const OG_IMAGE = "/og-image.jpg"; // dedicated 1200×630 social card (JPG = max platform support)

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hype Bam — Sri Lankanized Energy Drink",
    template: "%s · Hype Bam",
  },
  description:
    "Hype Bam: The Sri Lankanized energy drink. 80mg caffeine, 200mg electrolytes, 5g sugar. 5 bold natural flavours. Fuel the rebel in you.",
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
    title: "Hype Bam — Sri Lankanized Energy Drink",
    description:
      "80mg caffeine · 200mg electrolytes · 5g sugar · 5 bold natural flavours. Fuel the rebel in you.",
    url: "/",
    locale: "en_US",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Hype Bam energy drink flavours" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hype Bam — Sri Lankanized Energy Drink",
    description:
      "80mg caffeine · 200mg electrolytes · 5g sugar · 5 bold natural flavours. Fuel the rebel in you.",
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

        {/* ── Preload: Hero canvas + sequence first frames ──
             app.js consumes these via fetch()+createImageBitmap (NOT as <img>),
             so they MUST preload as `fetch`, not `image`. An `as=image` preload
             here is never matched by the fetch → the browser logs "preloaded but
             not used" AND may download the bytes twice. `crossorigin` (anonymous)
             makes the preload's request mode match app.js's same-origin fetch so
             the cached response is reused. (Ancient iOS<14 without
             createImageBitmap falls back to <img>, forgoing the head-start —
             acceptable for <1% of traffic.) ── */}
        <link rel="preload" href="/img/hypeBamVideo001.webp" as="fetch" type="image/webp" crossOrigin="anonymous" />
        <link rel="preload" href="/img/seq_0_0.webp" as="fetch" type="image/webp" crossOrigin="anonymous" />

        {/* ── Adaptive preload: extra hero frames 2-5 only on fast connections ── */}
        <Script id="adaptive-frame-preload" strategy="beforeInteractive">
          {`
            (function () {
              try {
                var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
                var slow = conn && (conn.saveData === true ||
                                    conn.effectiveType === 'slow-2g' ||
                                    conn.effectiveType === '2g' ||
                                    conn.effectiveType === '3g');
                if (slow) return;
                ['002','003','004','005'].forEach(function (n) {
                  var l = document.createElement('link');
                  l.rel = 'preload';
                  l.as = 'fetch';
                  l.type = 'image/webp';
                  l.crossOrigin = 'anonymous';
                  l.href = '/img/hypeBamVideo' + n + '.webp';
                  document.head.appendChild(l);
                });
              } catch (e) { /* opt-out gracefully */ }
            })();
          `}
        </Script>

        {/* ── Preload: First flavour can (centre of the carousel by default) ── */}
        <link rel="preload" href="/img/flavours/can-1.webp" as="image" type="image/webp" />

        {/* ── Prefetch: Hero subline underline SVG (above fold) ── */}
        <link
          rel="prefetch"
          href="/img/cdn/688655fd2fed5f707c038914_Layer_1_3.svg"
          as="image"
        />

        {/* ── PRELOAD the critical JS up-front (high priority, in parallel with the
             loader) so the animation engine + Webflow bundle are already in cache
             the instant they're needed — no real-time fetch stall on first paint.
             These are small (gzip ~a few KB each) so they're mobile-data friendly,
             and we don't touch image quality. The matching <Script>/loader below
             then execute from cache. ── */}
        <link rel="preload" href="/vendor/gsap/gsap.min.js" as="script" />
        <link rel="preload" href="/vendor/gsap/ScrollTrigger.min.js" as="script" />
        <link rel="preload" href="/vendor/gsap/CustomEase.min.js" as="script" />
        <link rel="preload" href="/vendor/gsap/DrawSVGPlugin.min.js" as="script" />
        <link rel="preload" href="/vendor/gsap/InertiaPlugin.min.js" as="script" />
        <link rel="preload" href="/vendor/gsap/SplitText.min.js" as="script" />
        <link rel="preload" href="/scripts/app.js" as="script" />

        {/* ── Real GSAP 3.14 + the plugins app.js actually uses, served locally ──
            As of GSAP 3.13 (May 2025) every plugin is 100% free — no Club
            membership. We serve the genuine UMD builds from /vendor/gsap so
            app.js gets real SplitText / DrawSVG / Inertia / CustomEase /
            ScrollTrigger instead of hand-written polyfills. Order matters:
            gsap core first, then plugins (each UMD self-registers when it
            finds window.gsap; useAnimations also registers explicitly). */}
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
            setTimeout(function () {
              if (!document.documentElement.classList.contains('is-ready')) {
                if (__DEV__) console.warn('Fallback: forcing loader hide after 6s');
                document.documentElement.classList.add('fonts-loaded', 'is-ready', 'has-seq-ready');
              }
              document.documentElement.classList.remove('lenis-stopped');
              document.body.classList.remove('lenis-stopped');
              document.documentElement.style.overflow = '';
              document.body.style.overflow = '';
              if (window.lenis) window.lenis.start();
            }, 6000);

            // Safety: only un-stick the loader if it's STILL stuck after 8s.
            // Do NOT tear down lenis/animations here — a single unrelated runtime
            // error (e.g. a vendored Swiper edge case) must not disable the whole
            // scroll/animation experience.
            setTimeout(function () {
              if (!document.documentElement.classList.contains('is-ready')) {
                document.documentElement.classList.add('fonts-loaded', 'is-ready', 'has-seq-ready');
                document.documentElement.classList.remove('lenis-stopped');
                document.body.classList.remove('lenis-stopped');
                if (window.lenis) try { window.lenis.start(); } catch (e) {}
                if (__DEV__) console.warn('Fallback: forced loader hide after 8s');
              }
            }, 8000);

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
