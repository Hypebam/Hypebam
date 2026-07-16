# Hype Bam — Sri Lankanized Energy Drink

Production landing page for **Hype Bam** (drinkhypebam.com), built with **Next.js 15 + React 19 + TypeScript**. Fully self-hosted: every script, style, font, image and video ships from this repo — a production `Content-Security-Policy` blocks anything external.

## Stack

- **Next.js 15 (App Router)** — static prerender, deployed on Vercel
- **GSAP 3.14 + plugins** (ScrollTrigger, SplitText, DrawSVG, Inertia, CustomEase) — vendored UMD builds in `public/vendor/gsap`
- **Lenis smooth scroll + Webflow animation bundle** — `public/scripts/app.js` (hero canvas intro, 200-frame sequence scrub, inertia hovers, testimonial slider)
- **Local fonts** via `next/font/local` (Bad Brush, Goga Test, Caveat)

## Commands

```bash
npm install       # install deps
npm run dev       # dev server → http://localhost:3000
npm run build     # production build
npm start         # serve the production build
```

## Structure

```
src/
├── app/
│   ├── layout.tsx        # fonts, meta/OG, CSS links, GSAP scripts, fallback loaders
│   ├── page.tsx          # section composition
│   ├── globals.css       # ALL custom CSS fixes (bundled LAST → wins the cascade)
│   └── error / not-found / manifest / robots / sitemap
├── components/
│   ├── layout/           # Navbar, Loader (mascot intro)
│   ├── sections/         # Hero, Insider (videos), Sequence (pinned canvas +
│   │                     #   lightning), Benefits, Testimonials, Flavour
│   │                     #   (custom 3D coverflow), Payment, Footer
│   └── ui/               # Button, SocialLinks, ResourcePreloader (smart prefetch)
└── hooks/useAnimations.ts # GSAP boot pipeline + custom scroll animations

public/
├── img/                  # ~63 MB of frames/photos — NEVER resize or re-encode
│   ├── hypeBamVideo001…0090.webp   # hero can canvas frames (names NOT zero-padded)
│   ├── seq_0_0…199.webp            # sequence scrub frames
│   └── video/compressed/           # testimonial mp4s (originals git-ignored)
├── scripts/app.js        # Webflow bundle (Lenis + Lottie + site animations)
├── styles/               # webflow.css → main.css → responsive.css (load order matters)
└── vendor/gsap/          # GSAP core + plugins (all free since 3.13)

scripts/
├── compress-videos.mjs   # one-time ffmpeg pass for testimonial videos
└── optimize-images.mjs   # one-time sharp pass (already applied — do not re-run)
```

## CSS cascade (important)

`webflow.css`, `main.css`, `responsive.css` are static `<link>` files (no hot reload). `globals.css` is bundled by Next, loads **after** all of them, and is where every fix/override belongs.

## Conventions

- Images stay at their original sizes — performance work adapts *loading timing* (preload/prefetch/lazy), never quality.
- No external resources of any kind; the CSP in `next.config.ts` enforces `'self'` for scripts, styles, fonts, media and connections.
- Set `NEXT_PUBLIC_SITE_URL` in the deploy environment so canonical/OG/sitemap URLs resolve to the real domain.
