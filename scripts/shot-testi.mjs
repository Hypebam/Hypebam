import { chromium } from 'playwright';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const URL = process.argv[2] || 'http://localhost:3094/';
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
const secTop = await page.evaluate(() => {
  const e = document.querySelector('.testimonial-section');
  return e ? Math.round(e.getBoundingClientRect().top + window.scrollY) : 0;
});
// capture a few offsets within the section to span the parallax range
const offsets = [-60, 60, 200, 360];
for (let k = 0; k < offsets.length; k++) {
  await jumpTo(secTop + offsets[k]);
  await page.screenshot({ path: join(TEMP, `testi_${k}.png`) });
}
console.log('secTop', secTop, 'done');
await browser.close();
process.exit(0);
