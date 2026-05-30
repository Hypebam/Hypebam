import { chromium } from 'playwright';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const URL = process.argv[2] || 'http://localhost:3092/';
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto(URL, { waitUntil: 'load' }).catch(() => {});
await page.waitForTimeout(2500);
// wheel down to testimonials
for (let i = 0; i < 220; i++) {
  const done = await page.evaluate(() => {
    const el = document.querySelector('.testimonial-section'); if (!el) return true;
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight * 0.2 && r.top > -200;
  });
  if (done) break;
  await page.mouse.wheel(0, 300); await page.waitForTimeout(80);
}
await page.waitForTimeout(1200);
const m = await page.evaluate(() => {
  const rect = (s) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); const cs = getComputedStyle(e); return { top: Math.round(b.top), bottom: Math.round(b.bottom), left: Math.round(b.left), right: Math.round(b.right), h: Math.round(b.height), pos: cs.position, z: cs.zIndex, of: cs.objectFit }; };
  return {
    section: rect('.testimonial-section'),
    bgWrapper: rect('.bg-img-wrapper'),
    topImg: rect('.testimonial-top-img'),
    bgImg: rect('.bg-img'),
    container: rect('.testimonial-container'),
    grid: rect('.testimonial-section .grid-layout'),
    bigHeading: rect('.testimonial-big-heading'),
    heading: rect('.testimonial-heading'),
    slider: rect('.testimonial-slider'),
  };
});
console.log(JSON.stringify(m, null, 2));
await page.screenshot({ path: join(tmpdir(), 'diag_testimonial.png') });
await browser.close();
process.exit(0);
