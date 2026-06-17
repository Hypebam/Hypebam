"use client";

import { useEffect } from "react";

/**
 * ResourcePreloader
 * ─────────────────
 * Pulls the heavy scroll-driven assets into cache AHEAD of time so nothing
 * downloads in real time while the user scrolls (which causes canvas stutter /
 * pop-in). It runs once the page is idle, in low-priority background chunks.
 *
 * Smart by connection (we keep full image quality — only the *timing* adapts):
 *   • Fast (wifi / 4g):   prefetch EVERYTHING ahead — hero frames, all 200
 *                         sequence frames, every flavour can. Zero real-time loads.
 *   • Slow / Save-Data:   only the tiny flavour cans up-front; the 35 MB sequence
 *                         stays just-in-time (rolling batches as you approach it)
 *                         so we never burn a metered connection.
 */

// ── Asset maps ──────────────────────────────────────────────────────────────
const FLAVOUR_IMAGES = [
  "/img/flavours/can-1.webp",
  "/img/flavours/can-2.webp",
  "/img/flavours/can-3.webp",
  "/img/flavours/can-4.webp",
  "/img/flavours/can-5.webp",
];

const SEQ_TOTAL = 200; // seq_0_0 … seq_0_199   (~35 MB — the can-spin scrub)
const HERO_TOTAL = 90; // hypeBamVideo001 … 0090 (~4.3 MB — the hero can canvas)

const seqPaths = (from: number, to: number) =>
  Array.from({ length: to - from }, (_, i) => `/img/seq_0_${from + i}.webp`);
// NOTE: the hero frames are named "00" + raw number — i.e. 001…009 then 0010…0090
// (NOT fixed-width padding). Matching that exactly avoids 404s.
const heroPaths = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => `/img/hypeBamVideo00${from + i}.webp`);

// ── Low-priority background prefetch ────────────────────────────────────────
function prefetch(src: string): void {
  // de-dupe so we never queue the same asset twice
  if (document.querySelector(`link[rel="prefetch"][href="${src}"]`)) return;
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.as = "image";
  link.href = src;
  document.head.appendChild(link);
}

// Queue links in gentle chunks so we never spike the network all at once — the
// browser then fetches them at idle priority, well before they're needed.
function prefetchChunked(paths: string[], chunk = 16, gap = 350): void {
  let i = 0;
  const run = () => {
    paths.slice(i, i + chunk).forEach(prefetch);
    i += chunk;
    if (i < paths.length) setTimeout(run, gap);
  };
  run();
}

export function ResourcePreloader() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    const metered = !!conn && (conn.saveData === true || ["slow-2g", "2g", "3g"].includes(conn.effectiveType));

    const observers: IntersectionObserver[] = [];

    const idle = (cb: () => void) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ric = (window as any).requestIdleCallback;
      if (typeof ric === "function") ric(cb, { timeout: 2500 });
      else setTimeout(cb, 1000);
    };

    // ── Metered fallback: keep the 35 MB sequence just-in-time ──────────────
    const sequenceJustInTime = () => {
      const seqSection = document.querySelector("[data-sequence]");
      if (!seqSection) return;
      let n = 0;
      const BATCH = 30;
      const nextBatch = () => {
        if (n >= SEQ_TOTAL) return;
        seqPaths(n, Math.min(n + BATCH, SEQ_TOTAL)).forEach(prefetch);
        n += BATCH;
      };
      // first batches well before it enters view, then more as you scroll through
      const ahead = new IntersectionObserver(([e]) => { if (e.isIntersecting) nextBatch(); }, { rootMargin: "1200px" });
      ahead.observe(seqSection);
      const through = new IntersectionObserver(([e]) => { if (e.isIntersecting && n < SEQ_TOTAL) nextBatch(); }, { threshold: [0, 0.25, 0.5, 0.75] });
      through.observe(seqSection);
      observers.push(ahead, through);
    };

    idle(() => {
      // Flavour cans are tiny (~960 KB) — always pull them ahead.
      FLAVOUR_IMAGES.forEach(prefetch);

      if (metered) {
        sequenceJustInTime();
        return;
      }

      // Fast connection → pull everything ahead, in the background, so nothing
      // ever loads in real time. Hero frames first (needed soonest), then the
      // full sequence.
      prefetchChunked(heroPaths(6, HERO_TOTAL), 16, 250);
      prefetchChunked(seqPaths(0, SEQ_TOTAL), 18, 350);
    });

    // ── Testimonial videos: fetch metadata only (≈50 KB) as you approach ────
    const insider = document.querySelector(".insider-section");
    if (insider) {
      let done = false;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting && !done) {
            done = true;
            insider.querySelectorAll<HTMLVideoElement>("video[data-video]").forEach((v) => {
              if (v.preload === "none") v.preload = "metadata";
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

  // Pure side-effect component
  return null;
}

export default ResourcePreloader;
