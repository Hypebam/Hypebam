import { chromium } from 'playwright';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const URL = process.argv[2] || 'http://localhost:3123/';
const TEMP = tmpdir();
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })).newPage();
const errs = [];
page.on('pageerror', e => errs.push(String(e.message || e)));
await page.goto(URL, { waitUntil: 'load' }).catch(() => {});
await page.waitForTimeout(2500);
const st = async () => page.evaluate(() => { const e = document.querySelector('.sequence-final-mobile .sequence-title'); if (!e) return null; const cs = getComputedStyle(e); const r = e.getBoundingClientRect(); return { opacity: +(+cs.opacity).toFixed(2), top: Math.round(r.top) }; });
console.log('@load     ', JSON.stringify(await st()));
const samples = [];
for (let i = 0; i < 90; i++) {
  await page.mouse.wheel(0, 500); await page.waitForTimeout(60);
  const s = await st();
  if (s) samples.push(s.opacity);
  if (s && s.top < 250 && s.top > -200) break;
}
// show the opacity progression (dedup consecutive duplicates)
const prog = samples.filter((v, i) => i === 0 || v !== samples[i - 1]);
console.log('opacity progression while scrolling to title:', JSON.stringify(prog));
await page.waitForTimeout(900);
console.log('final     ', JSON.stringify(await st()));
await page.screenshot({ path: join(TEMP, 'vt2_title.png') });
console.log('pageErrors', errs.filter(e => !/play\(\) request/.test(e)));
await browser.close();
process.exit(0);
