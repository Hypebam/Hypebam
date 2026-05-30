import { chromium } from 'playwright';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const URL = process.argv[2] || 'http://localhost:3106/';
const TEMP = tmpdir();
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto(URL, { waitUntil: 'load' }).catch(() => {});
await page.waitForTimeout(2500);
const jump = async (y) => { await page.evaluate((yy) => { if (window.lenis?.scrollTo) window.lenis.scrollTo(yy, { immediate: true }); else window.scrollTo(0, yy); window.ScrollTrigger?.update?.(); }, y); await page.waitForTimeout(600); };
const top = (s) => page.evaluate((sel) => { const e = document.querySelector(sel); return e ? Math.round(e.getBoundingClientRect().top + window.scrollY) : -1; }, s);

// 1) Benefit img-wrapper (force-load + reveal the imgs)
const bw = await top('.img-wrapper');
await jump(bw - 120);
await page.evaluate(() => {
  const w = document.querySelector('.img-wrapper'); if (!w) return;
  w.querySelectorAll('img').forEach(i => { i.style.opacity = '1'; i.loading = 'eager'; const u = i.getAttribute('src'); i.src=''; i.src=u; });
});
await page.waitForTimeout(900);
await page.screenshot({ path: join(TEMP, 'v29_benefit.png') });

// 2) Flavour -> Payment boundary: measure gap + screenshot
const hbfTop = await top('.hbf');
const payTop = await top('.payment-section');
const gap = await page.evaluate(() => {
  const hbf = document.querySelector('.hbf'); const pay = document.querySelector('.payment-section');
  const payHeading = document.querySelector('.payment-section .insider-heading');
  const hbfBottom = hbf.getBoundingClientRect().bottom + window.scrollY;
  const payContentTop = (payHeading || pay).getBoundingClientRect().top + window.scrollY;
  return { hbfBottomAbs: Math.round(hbfBottom), payTopAbs: Math.round(pay.getBoundingClientRect().top + window.scrollY), payHeadingTopAbs: Math.round(payContentTop) };
});
console.log('hbfTop', hbfTop, 'payTop', payTop, 'gap', JSON.stringify(gap));
// screenshot around the boundary
await jump(payTop - 700);
await page.screenshot({ path: join(TEMP, 'v29_boundary.png') });

// 3) Sequence lines rotation
await page.evaluate(() => { document.querySelectorAll('.sequence-lines').forEach(el => el.style.zIndex = '50'); });
const sTop = await top('.sequence-section');
for (const o of [600, 1900, 3900]) { await jump(sTop + o); await page.screenshot({ path: join(TEMP, `v29_line_${o}.png`) }); }
console.log('done');
await browser.close();
process.exit(0);
