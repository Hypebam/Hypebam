import { chromium } from 'playwright';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const URL = process.argv[2] || 'http://localhost:3093/';
const TEMP = tmpdir();

async function fresh(browser) {
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await page.goto(URL, { waitUntil: 'load' }).catch(() => {});
  await page.waitForTimeout(2500);
  return page;
}
// scroll from top until selector top is near the top of viewport
async function toTop(page, sel) {
  for (let i = 0; i < 300; i++) {
    const r = await page.evaluate((s) => { const e = document.querySelector(s); if (!e) return 99999; return e.getBoundingClientRect().top; }, sel);
    if (r < 120 && r > -250) break;
    if (r === 99999) break;
    await page.mouse.wheel(0, r > 1200 ? 500 : 200); await page.waitForTimeout(70);
  }
  await page.waitForTimeout(1200);
}

const browser = await chromium.launch();

// Testimonial
let p = await fresh(browser);
await toTop(p, '.testimonial-section');
await p.screenshot({ path: join(TEMP, 'chk_testimonial.png') });
await p.close();

// Benefit img-wrapper
p = await fresh(browser);
await toTop(p, '.img-wrapper');
await p.screenshot({ path: join(TEMP, 'chk_benefit.png') });
await p.close();

// Sequence: step through the pinned runway capturing line draw
p = await fresh(browser);
await toTop(p, '.sequence-section');
for (let k = 0; k < 10; k++) {
  await p.screenshot({ path: join(TEMP, `seq_frame_${k}.png`) });
  for (let j = 0; j < 6; j++) { await p.mouse.wheel(0, 220); await p.waitForTimeout(60); }
  await p.waitForTimeout(350);
}
await p.close();

console.log('done');
await browser.close();
process.exit(0);
