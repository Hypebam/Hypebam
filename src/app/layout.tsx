import type { Metadata } from "next";
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
  src: [
    { path: "../../public/fonts/goga/GogaTest-Hairline-BF6646d5d845dae.otf",   weight: "100" },
    { path: "../../public/fonts/goga/GogaTest-Thin-BF6646d5d8040a9.otf",       weight: "200" },
    { path: "../../public/fonts/goga/GogaTest-Extralight-BF6646d5d82fb83.otf", weight: "300" },
    { path: "../../public/fonts/goga/GogaTest-Light-BF6646d5d84c8a2.otf",      weight: "350" },
    { path: "../../public/fonts/goga/GogaTest-Regular-BF6646d5d84f69b.otf",    weight: "400" },
    { path: "../../public/fonts/goga/GogaTest-Medium-BF6646d5d84754e.otf",     weight: "500" },
    { path: "../../public/fonts/goga/GogaTest-Semibold-BF6646d5d8544cf.otf",   weight: "600" },
    { path: "../../public/fonts/goga/GogaTest-Bold-BF6646d5d83c978.otf",       weight: "700" },
    { path: "../../public/fonts/goga/GogaTest-Extrabold-BF6646d5d7d0a2b.otf", weight: "800" },
    { path: "../../public/fonts/goga/GogaTest-Black-BF6646d5d78e551.otf",      weight: "900" },
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

export const metadata: Metadata = {
  title: "Hype Bam — Sri Lankanized Energy Drink",
  description:
    "Hype Bam: The Sri Lankanized energy drink. 80mg caffeine, 200mg electrolytes, 5g sugar. 5 incredible flavours. Fuel the rebel in you.",
  icons: {
    icon: "/img/hypebam-logo-final-vector-02-orange.svg",
  },
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

        {/* ── Critical above-fold CSS ── */}
        <link href="/styles/webflow.css" rel="stylesheet" type="text/css" />
        <link href="/styles/main.css" rel="stylesheet" type="text/css" />
        {/* ── Responsive overrides — MUST be last to win cascade ── */}
        <link href="/styles/responsive.css" rel="stylesheet" type="text/css" />

        {/* ── Preload: Hero canvas — first frame must paint instantly ── */}
        <link rel="preload" href="/img/hypeBamVideo001.webp" as="image" type="image/webp" />

        {/* ── Preload: Sequence section — first frame so canvas isn't blank ── */}
        <link rel="preload" href="/img/seq_0_0.webp" as="image" type="image/webp" />
        <link rel="preload" href="/img/seq_1_0.webp" as="image" type="image/webp" />

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
                  l.as = 'image';
                  l.type = 'image/webp';
                  l.href = '/img/hypeBamVideo' + n + '.webp';
                  document.head.appendChild(l);
                });
              } catch (e) { /* opt-out gracefully */ }
            })();
          `}
        </Script>

        {/* ── Preload: First flavour can (active by default) ── */}
        <link rel="preload" href="/img/flavours/original.webp" as="image" type="image/webp" />

        {/* ── Prefetch: Hero SVG decorations (above fold) ── */}
        <link
          rel="prefetch"
          href="/img/cdn/68a9a089d73e5cf84d4ded67_stage-sketch-arrow.svg"
          as="image"
        />
        <link
          rel="prefetch"
          href="/img/cdn/688655fd2fed5f707c038914_Layer_1_3.svg"
          as="image"
        />

        {/* ── Real GSAP 3.14 + ALL plugins, served locally ──
            As of GSAP 3.13 (May 2025) every plugin is 100% free — no Club
            membership. We serve the genuine UMD builds from /vendor/gsap so
            app.js gets real SplitText / DrawSVG / Inertia / CustomEase /
            ScrollTrigger instead of hand-written polyfills. Order matters:
            gsap core first, then plugins (each UMD self-registers when it
            finds window.gsap; useAnimations also registers explicitly). */}
        <Script src="/vendor/gsap/gsap.min.js" strategy="afterInteractive" />
        <Script src="/vendor/gsap/ScrollTrigger.min.js" strategy="afterInteractive" />
        <Script src="/vendor/gsap/CustomEase.min.js" strategy="afterInteractive" />
        <Script src="/vendor/gsap/CustomWiggle.min.js" strategy="afterInteractive" />
        <Script src="/vendor/gsap/CustomBounce.min.js" strategy="afterInteractive" />
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
