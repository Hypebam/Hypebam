import { chromium } from 'playwright';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const URL = process.argv[2] || 'http://localhost:3116/';
const TEMP = tmpdir();
const browser = await chromium.launch();

// ---------- DESKTOP: #4 hover (with velocity) + #3 is-third rotate ----------
{
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await page.goto(URL, { waitUntil: 'load' }).catch(() => {});
  await page.waitForTimeout(2500);
  const jump = async (y) => { await page.evaluate((yy) => { if (window.lenis?.scrollTo) window.lenis.scrollTo(yy, { immediate: true }); else window.scrollTo(0, yy); window.ScrollTrigger?.update?.(); }, y); await page.waitForTimeout(500); };
  const top = (s) => page.evaluate((sel) => { const e = document.querySelector(sel); return e ? Math.round(e.getBoundingClientRect().top + window.scrollY) : -1; }, s);

  // Insider hover with velocity
  const insTop = await top('.insider-section');
  await jump(insTop + 150);
  await page.waitForTimeout(600);
  const card = '.testimonial-inner-wrap.is-first';
  const before = await page.evaluate((s) => { const b = document.querySelector(s).getBoundingClientRect(); return { w: Math.round(b.width), h: Math.round(b.height), cx: Math.round(b.left + b.width / 2), cy: Math.round(b.top + b.height / 2) }; }, card);
  // move onto the card WITH velocity (several quick steps from a far point)
  await page.mouse.move(before.cx - 300, before.cy - 200);
  await page.mouse.move(before.cx - 150, before.cy - 100, { steps: 3 });
  await page.mouse.move(before.cx, before.cy, { steps: 3 });
  await page.waitForTimeout(700);
  const after = await page.evaluate((s) => { const e = document.querySelector(s); const b = e.getBoundingClientRect(); const cs = getComputedStyle(e); return { w: Math.round(b.width), h: Math.round(b.height), top: Math.round(b.top), z: cs.zIndex, transform: cs.transform.slice(0,30), translate: cs.translate }; }, card);
  console.log('HOVER before', JSON.stringify(before), '\nHOVER after ', JSON.stringify(after));

  // is-third rotate — screenshot sequence (boost lines)
  await page.evaluate(() => document.querySelectorAll('.sequence-lines').forEach(el => el.style.zIndex = '50'));
  const sTop = await top('.sequence-section');
  await jump(sTop + 3900);
  await page.screenshot({ path: join(TEMP, 'v36_isthird.png') });
  await page.close();
}

// ---------- MOBILE: #1 title reveal via REAL wheel scroll ----------
{
  const page = await (await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })).newPage();
  await page.goto(URL, { waitUntil: 'load' }).catch(() => {});
  await page.waitForTimeout(2500);
  const state = async () => page.evaluate(() => { const e = document.querySelector('.sequence-final-mobile .sequence-title'); if (!e) return null; const cs = getComputedStyle(e); const r = e.getBoundingClientRect(); return { inview: e.classList.contains('is-inview'), opacity: cs.opacity, top: Math.round(r.top) }; });
  console.log('MOBILE @load', JSON.stringify(await state()));
  // real wheel scroll down in steps until near the finale, logging
  for (let i = 0; i < 60; i++) {
    await page.mouse.wheel(0, 700); await page.waitForTimeout(80);
    const s = await state();
    if (s && s.top < 844 && s.top > -200) { console.log('MOBILE near title (step ' + i + ')', JSON.stringify(s)); break; }
  }
  await page.waitForTimeout(800);
  console.log('MOBILE final', JSON.stringify(await state()));
  await page.screenshot({ path: join(TEMP, 'v36_mobtitle.png') });
  await page.close();
}
console.log('done');
await browser.close();
process.exit(0);
