"use client";

import { useEffect } from "react";

/**
 * ResourcePreloader
 * ─────────────────
 * Small, surgical prefetches only. The heavy canvas frames are NOT prefetched
 * here any more: app.js loads them directly (hero intro frames eagerly,
 * sequence frames chunked + metered-aware), so <link rel=prefetch> for the
 * same URLs only duplicated queue pressure against the real fetches.
 *
 * What remains:
 *   • flavour can renders (~960 KB) — pulled ahead at idle so the carousel
 *     never pops in
 *   • testimonial video hydration — the lazy <source data-src> gets its src
 *     ~600px before the section, so metadata/first frame are ready on arrival
 */

const FLAVOUR_IMAGES = [
  "/img/flavours/can-1.webp",
  "/img/flavours/can-2.webp",
  "/img/flavours/can-3.webp",
  "/img/flavours/can-4.webp",
  "/img/flavours/can-5.webp",
];

function prefetch(src: string): void {
  if (document.querySelector(`link[rel="prefetch"][href="${src}"]`)) return;
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.as = "image";
  link.href = src;
  document.head.appendChild(link);
}

export function ResourcePreloader() {
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const idle = (cb: () => void) => {
      const ric = (window as any).requestIdleCallback;
      if (typeof ric === "function") ric(cb, { timeout: 2500 });
      else setTimeout(cb, 1000);
    };

    idle(() => FLAVOUR_IMAGES.forEach(prefetch));

    // Testimonial videos: hydrate the lazy <source> as you approach.
    const insider = document.querySelector(".insider-section");
    if (insider) {
      let done = false;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting && !done) {
            done = true;
            insider.querySelectorAll<HTMLVideoElement>("video[data-video]").forEach((v) => {
              if (v.dataset.poster && !v.poster) v.poster = v.dataset.poster;
              const source = v.querySelector("source");
              if (source && source.dataset.src && !source.src) {
                source.src = source.dataset.src;
                v.preload = "metadata";
                v.load();
              } else if (v.preload === "none") {
                v.preload = "metadata";
              }
            });
            obs.disconnect();
          }
        },
        { rootMargin: "600px" }
      );
      obs.observe(insider);
      observers.push(obs);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return null;
}

export default ResourcePreloader;
