import { chromium } from 'playwright';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const OURS = process.argv[2] || 'http://localhost:3120/';
const ORIG = 'https://more-nutrition.webflow.io/';
const TEMP = tmpdir();
const browser = await chromium.launch();
async function shot(url, tag) {
  const page = await (await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })).newPage();
  try { await page.goto(url, { waitUntil: 'load', timeout: 45000 }); } catch (e) { console.log(tag, 'goto', e.message); }
  await page.waitForTimeout(4000);
  const info = await page.evaluate(() => {
    const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return { topAbs: Math.round(b.top + window.scrollY), w: Math.round(b.width), h: Math.round(b.height) }; };
    return { facts: r(document.querySelector('.stage-facts')), circle: r(document.querySelector('.stage-fact')) };
  });
  console.log(tag, JSON.stringify(info));
  if (info.circle) { await page.evaluate((y) => window.scrollTo(0, y), Math.max(0, info.circle.topAbs - 280)); await page.waitForTimeout(1200); await page.screenshot({ path: join(TEMP, `facts_${tag}.png`) }); }
  await page.close();
}
await shot(ORIG, 'orig');
await shot(OURS, 'ours');
console.log('done');
await browser.close();
process.exit(0);
