import { chromium } from 'playwright';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const URL = process.argv[2] || 'http://localhost:3099/';
const TEMP = tmpdir();
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto(URL, { waitUntil: 'load' }).catch(() => {});
await page.waitForTimeout(2500);
// Make the lines pop for verification: bump their stroke + raise above canvas TEMPORARILY (visual probe only)
await page.evaluate(() => {
  document.querySelectorAll('.sequence-lines').forEach(el => { el.style.zIndex = '50'; el.style.color = '#000'; });
  document.querySelectorAll('[data-sequence-svg] path').forEach(p => p.setAttribute('stroke-width', '30'));
});
const jump = async (y) => { await page.evaluate((yy) => { if (window.lenis?.scrollTo) window.lenis.scrollTo(yy, { immediate: true }); else window.scrollTo(0, yy); window.ScrollTrigger?.update?.(); }, y); await page.waitForTimeout(450); };
const sTop = await page.evaluate(() => { const e = document.querySelector('.sequence-section'); return Math.round(e.getBoundingClientRect().top + window.scrollY); });
for (const o of [300, 800, 1900, 2800, 3900, 4800]) {
  await jump(sTop + o);
  await page.screenshot({ path: join(TEMP, `ln_${o}.png`) });
}
console.log('sTop', sTop, 'done');
await browser.close();
process.exit(0);
