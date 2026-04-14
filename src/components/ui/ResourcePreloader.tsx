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

// ── Flavour images (local webps, ~125–202 KB each) ──────────────────────────
const FLAVOUR_IMAGES = [
  "/img/flavours/original.webp",
  "/img/flavours/lemon-lime.webp",
  "/img/flavours/pineapple-passion.webp",
  "/img/flavours/apple-berry.webp",
  "/img/flavours/mango-peach.webp",
];

// ── Sequence section canvas frames ─────────────────────────────────────────
//    seq_0 = 200 frames (HypeBam can spin), seq_1 = 23 frames (second animation)
//    We prefetch them in batches so the browser pipeline stays clean.
const SEQ_0_TOTAL = 200; // seq_0_0 … seq_0_199
const SEQ_1_TOTAL = 23;  // seq_1_0 … seq_1_22
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

function preloadImage(src: string): void {
  const link = document.createElement("link");
  link.rel  = "preload";
  link.as   = "image";
  link.href = src;
  link.setAttribute("fetchpriority", "low");
  document.head.appendChild(link);
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
      const seq1 = buildSeqPaths("seq_1", SEQ_1_TOTAL);
      let batchIndex = 0;
      let seq1Done   = false;

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
            if (!seq1Done) {
              prefetchImages(seq1);
              seq1Done = true;
            }
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

    // ── 4. Testimonial background images: preload when reviews section 500px out ──
    const reviewsSection = document.querySelector("#reviews") as HTMLElement | null;
    if (reviewsSection) {
      let done = false;
      const reviewImages = [
        "https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689541efc32332b4d96332e4_5aa593a5c181883619e1ec2e48b9a77009ae6ddd.webp",
        "https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689541d1c4bb0b452cb46e3e_b525d1f05540193d88caa60b825b8887a650d649.webp",
      ];
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !done) {
            done = true;
            prefetchImages(reviewImages);
            obs.disconnect();
          }
        },
        { rootMargin: "500px" }
      );
      obs.observe(reviewsSection);
      observers.push(obs);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Renders nothing — pure side-effect component
  return null;
}

export default ResourcePreloader;
