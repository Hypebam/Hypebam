/**
 * Cache-bust token for the STATIC files in /public that next.config.ts serves
 * with `max-age=31536000, immutable` — /styles/*.css AND /scripts/app.js.
 *
 * Bump on EVERY edit to webflow.css / main.css / responsive.css / app.js.
 * Without the `?v=` a returning visitor's browser (and the CDN) keeps the old
 * file for a year and never even asks the server — a fix can be live on Vercel
 * for weeks while every existing visitor still runs the previous bundle.
 *
 * Shared by layout.tsx (the <link>/<preload> tags) and useAnimations.ts (the
 * runtime app.js loader) so the preload and the real request are byte-for-byte
 * the same URL and the preload cache is actually reused.
 */
export const ASSET_VERSION = "2026-09-10-1";
