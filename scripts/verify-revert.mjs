import { chromium } from 'playwright';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const URL = process.argv[2] || 'http://localhost:3095/';
const TEMP = tmpdir();
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto(URL, { waitUntil: 'load' }).catch(() => {});
await page.waitForTimeout(2500);
async function jumpTo(absY) {
  await page.evaluate((y) => {
    if (window.lenis && window.lenis.scrollTo) window.lenis.scrollTo(y, { immediate: true });
    else window.scrollTo(0, y);
    if (window.ScrollTrigger && window.ScrollTrigger.update) window.ScrollTrigger.update();
  }, absY);
  await page.waitForTimeout(700);
}
const off = (sel) => page.evaluate((s) => { const e = document.querySelector(s); return e ? Math.round(e.getBoundingClientRect().top + window.scrollY) : -1; }, sel);

// Testimonial: previous backdrop look
const tTop = await off('.testimonial-section');
await jumpTo(tTop + 60);
await page.screenshot({ path: join(TEMP, 'rv_testimonial.png') });

// Sequence: step through the runway, capture scattered scribbles drawing
const sTop = await off('.sequence-section');
const steps = [400, 900, 1500, 2200, 3000, 3800];
for (let i = 0; i < steps.length; i++) {
  await jumpTo(sTop + steps[i]);
  await page.screenshot({ path: join(TEMP, `rv_seq_${i}.png`) });
}
console.log('tTop', tTop, 'sTop', sTop, 'done');
await browser.close();
process.exit(0);
