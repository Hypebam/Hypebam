import { chromium } from 'playwright';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const URL = process.argv[2] || 'http://localhost:3091/';
const TEMP = tmpdir();
async function scrollTo(page, sel) {
  for (let i = 0; i < 200; i++) {
    const done = await page.evaluate((s) => {
      const el = document.querySelector(s); if (!el) return true;
      const r = el.getBoundingClientRect();
      const c = r.top + Math.min(r.height, 400) / 2;
      return c < window.innerHeight * 0.55 && c > window.innerHeight * 0.05;
    }, sel);
    if (done) break;
    await page.mouse.wheel(0, 250); await page.waitForTimeout(90);
  }
  await page.waitForTimeout(1400);
}
for (const vp of [{ w: 1440, h: 900, tag: 'desk' }, { w: 390, h: 844, tag: 'mob' }]) {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'load', timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(2500);
  // benefit img-wrapper is EARLIER in the DOM than testimonials — capture first
  await scrollTo(page, '.img-wrapper');
  await page.screenshot({ path: join(TEMP, `vp_${vp.tag}_imgwrap.png`) });
  console.log(`${vp.tag} done`);
  await browser.close();
}
process.exit(0);
