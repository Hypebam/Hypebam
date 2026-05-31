import { chromium } from 'playwright';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const URL = process.argv[2] || 'http://localhost:3121/';
const TEMP = tmpdir();
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })).newPage();
const errs = [];
page.on('pageerror', e => errs.push(String(e.message || e)));
await page.goto(URL, { waitUntil: 'load' }).catch(() => {});
await page.waitForTimeout(2500);
const state = async () => page.evaluate(() => { const e = document.querySelector('.sequence-final-mobile .sequence-title'); if (!e) return null; const cs = getComputedStyle(e); const r = e.getBoundingClientRect(); return { inview: e.classList.contains('is-inview'), opacity: cs.opacity, top: Math.round(r.top) }; });
console.log('@load        ', JSON.stringify(await state()));
let revealed = null;
for (let i = 0; i < 80; i++) {
  await page.mouse.wheel(0, 650); await page.waitForTimeout(70);
  const s = await state();
  if (s && s.inview && !revealed) { revealed = { step: i, ...s }; }
  if (s && s.top < 700 && s.top > -200) { console.log('near title st' + i, JSON.stringify(s)); break; }
}
await page.waitForTimeout(900);
console.log('first inview ', JSON.stringify(revealed));
console.log('final        ', JSON.stringify(await state()));
await page.screenshot({ path: join(TEMP, 'vt_title.png') });
console.log('pageErrors', errs.filter(e => !/play\(\) request/.test(e)));
await browser.close();
process.exit(0);
