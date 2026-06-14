"use client";

import { useEffect } from "react";

/**
 * ResourcePreloader
 * ─────────────────
 * Handles all run-time asset preloading that can't be done statically in <head>.
 *
 * Strategy by asset type:
 * 1. Flavour images  — Prefetch all 5 when flavour section is 400px away  (interactive gallery)
 * 2. Sequence frames — Prefetch in rolling batches as the user scrolls into the canvas section
 * 3. Testimonial videos — Set preload="metadata" when InsiderSection enters viewport
 *                         so the browser fetches only duration/dimensions, not the full file
 */

// ── Flavour can images (local webps, ~190 KB each) ──────────────────────────
const FLAVOUR_IMAGES = [
  "/img/flavours/can-1.webp",
  "/img/flavours/can-2.webp",
  "/img/flavours/can-3.webp",
  "/img/flavours/can-4.webp",
  "/img/flavours/can-5.webp",
];

// ── Sequence section canvas frames ─────────────────────────────────────────
//    seq_0 = 200 frames (HypeBam can spin). app.js's sequence canvas only ever
//    loads seq_0_*; we prefetch them in batches so the browser pipeline stays clean.
const SEQ_0_TOTAL = 200; // seq_0_0 … seq_0_199
const SEQ_BATCH   = 30;  // frames per IntersectionObserver trigger

function buildSeqPaths(prefix: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => `/img/${prefix}_${i}.webp`);
}

function prefetchImages(paths: string[]): void {
  paths.forEach((src) => {
    const link = document.createElement("link");
    link.rel  = "prefetch";
    link.as   = "image";
    link.href = src;
    document.head.appendChild(link);
  });
}

export function ResourcePreloader() {
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    // ── 1. Flavour images: prefetch all when section 600px away ───────────
    const flavourSection = document.querySelector("#flavours-section") as HTMLElement | null;
    if (flavourSection) {
      let done = false;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !done) {
            done = true;
            prefetchImages(FLAVOUR_IMAGES);
            obs.disconnect();
          }
        },
        { rootMargin: "600px" } // trigger 600px before in viewport
      );
      obs.observe(flavourSection);
      observers.push(obs);
    }

    // ── 2. Sequence frames: rolling batch prefetch ────────────────────────
    const seqSection = document.querySelector("[data-sequence]") as HTMLElement | null;
    if (seqSection) {
      const seq0 = buildSeqPaths("seq_0", SEQ_0_TOTAL);
      let batchIndex = 0;

      const prefetchNextBatch = () => {
        const start = batchIndex * SEQ_BATCH;
        const end   = Math.min(start + SEQ_BATCH, SEQ_0_TOTAL);
        if (start >= SEQ_0_TOTAL) return;
        prefetchImages(seq0.slice(start, end));
        batchIndex++;
      };

      // First batch immediately when section is 800px out
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            prefetchNextBatch();
          }
        },
        { rootMargin: "800px", threshold: 0 }
      );
      obs.observe(seqSection);
      observers.push(obs);

      // Continue prefetching remaining batches on scroll inside section
      const scrollObs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && batchIndex * SEQ_BATCH < SEQ_0_TOTAL) {
            prefetchNextBatch();
          }
        },
        { threshold: [0, 0.25, 0.5, 0.75] }
      );
      scrollObs.observe(seqSection);
      observers.push(scrollObs);
    }

    // ── 3. Video preload: set preload="metadata" when insider section near ─
    //    Full video data streams only when user scrolls to that section.
    //    preload="metadata" fetches just the first frame + duration (~50KB).
    const insiderSection = document.querySelector(".insider-section") as HTMLElement | null;
    if (insiderSection) {
      let videosUpgraded = false;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !videosUpgraded) {
            videosUpgraded = true;
            const videos = insiderSection.querySelectorAll<HTMLVideoElement>("video[data-video]");
            videos.forEach((v) => {
              if (v.preload === "none") {
                v.preload = "metadata";
              }
            });
            obs.disconnect();
          }
        },
        { rootMargin: "400px" }
      );
      obs.observe(insiderSection);
      observers.push(obs);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Renders nothing — pure side-effect component
  return null;
}

export default ResourcePreloader;
