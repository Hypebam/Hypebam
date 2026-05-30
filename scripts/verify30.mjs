import { chromium } from 'playwright';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const URL = process.argv[2] || 'http://localhost:3107/';
const TEMP = tmpdir();
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto(URL, { waitUntil: 'load' }).catch(() => {});
await page.waitForTimeout(2500);
const jump = async (y) => { await page.evaluate((yy) => { if (window.lenis?.scrollTo) window.lenis.scrollTo(yy, { immediate: true }); else window.scrollTo(0, yy); window.ScrollTrigger?.update?.(); }, y); await page.waitForTimeout(600); };
const top = (s) => page.evaluate((sel) => { const e = document.querySelector(sel); return e ? Math.round(e.getBoundingClientRect().top + window.scrollY) : -1; }, s);

// 1) Lines thickness — screenshot (boost visibility)
await page.evaluate(() => { document.querySelectorAll('.sequence-lines').forEach(el => el.style.zIndex = '50'); });
const sTop = await top('.sequence-section');
await jump(sTop + 600);
await page.screenshot({ path: join(TEMP, 'v30_line.png') });

// 2) Benefit flames fill — force-load imgs + screenshot
const bw = await top('.img-wrapper');
await jump(bw - 120);
await page.evaluate(() => { const w = document.querySelector('.img-wrapper'); if (!w) return; w.querySelectorAll('img').forEach(i => { i.style.opacity = '1'; i.loading = 'eager'; const u = i.getAttribute('src'); i.src=''; i.src=u; }); });
await page.waitForTimeout(900);
await page.screenshot({ path: join(TEMP, 'v30_benefit.png') });

// 3) Hover test — measure card size before/after hover
const insTop = await top('.insider-section');
await jump(insTop + 200);
await page.waitForTimeout(800);
async function hoverTest(sel) {
  const before = await page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return { w: Math.round(b.width), h: Math.round(b.height), top: Math.round(b.top) }; }, sel);
  await page.hover(sel).catch(() => {});
  await page.waitForTimeout(600);
  const after = await page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); const cs = getComputedStyle(e); return { w: Math.round(b.width), h: Math.round(b.height), top: Math.round(b.top), z: cs.zIndex }; }, sel);
  // move mouse away
  await page.mouse.move(5, 5); await page.waitForTimeout(300);
  return { sel, before, after };
}
const r1 = await hoverTest('.testimonial-inner-wrap.is-first');
const r3 = await hoverTest('.testimonial-inner-wrap.is-third');
console.log('HOVER is-first', JSON.stringify(r1));
console.log('HOVER is-third', JSON.stringify(r3));
console.log('done');
await browser.close();
process.exit(0);
