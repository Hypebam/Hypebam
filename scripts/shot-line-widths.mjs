import { chromium } from 'playwright';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const URL = process.argv[2] || 'http://localhost:3103/';
const TEMP = tmpdir();
const browser = await chromium.launch();
for (const w of [1920, 1536, 1366]) {
  const page = await (await browser.newContext({ viewport: { width: w, height: 900 } })).newPage();
  await page.goto(URL, { waitUntil: 'load' }).catch(() => {});
  await page.waitForTimeout(2500);
  // boost line visibility
  await page.evaluate(() => {
    document.querySelectorAll('.sequence-lines').forEach(el => { el.style.zIndex = '50'; });
    /* keep real stroke (18) so thickness is realistic; just lift above canvas */
  });
  const jump = async (y) => { await page.evaluate((yy) => { if (window.lenis?.scrollTo) window.lenis.scrollTo(yy, { immediate: true }); else window.scrollTo(0, yy); window.ScrollTrigger?.update?.(); }, y); await page.waitForTimeout(450); };
  const sTop = await page.evaluate(() => { const e = document.querySelector('.sequence-section'); return Math.round(e.getBoundingClientRect().top + window.scrollY); });
  // bolt 1 fully drawn ~ +600
  await jump(sTop + 600);
  await page.screenshot({ path: join(TEMP, `lw_${w}.png`) });
  await page.close();
}
console.log('done');
await browser.close();
process.exit(0);
