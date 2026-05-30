import { chromium } from 'playwright';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const URL = process.argv[2] || 'http://localhost:3096/';
const TEMP = tmpdir();

async function run(vp) {
  const browser = await chromium.launch();
  const page = await (await browser.newContext({ viewport: { width: vp.w, height: vp.h } })).newPage();
  await page.goto(URL, { waitUntil: 'load' }).catch(() => {});
  await page.waitForTimeout(2500);
  const jump = async (y) => { await page.evaluate((yy) => { if (window.lenis?.scrollTo) window.lenis.scrollTo(yy, { immediate: true }); else window.scrollTo(0, yy); window.ScrollTrigger?.update?.(); }, y); await page.waitForTimeout(700); };
  const top = (s) => page.evaluate((sel) => { const e = document.querySelector(sel); return e ? Math.round(e.getBoundingClientRect().top + window.scrollY) : -1; }, s);

  for (const [sel, name] of [['.hbf', 'flavour'], ['.payment-section', 'payment'], ['.footer', 'footer']]) {
    const t = await top(sel);
    if (t < 0) { console.log(`${vp.tag} ${name} MISSING`); continue; }
    await jump(t - 40);
    await page.screenshot({ path: join(TEMP, `wz_${vp.tag}_${name}.png`) });
  }
  // full footer too (it has negative margin, capture lower)
  const ft = await top('.footer');
  await jump(ft + 300);
  await page.screenshot({ path: join(TEMP, `wz_${vp.tag}_footer2.png`) });
  await browser.close();
}
await run({ w: 1440, h: 900, tag: 'desk' });
await run({ w: 390, h: 844, tag: 'mob' });
console.log('done');
process.exit(0);
