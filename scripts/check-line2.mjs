import { chromium } from 'playwright';
const URL = process.argv[2] || 'http://localhost:3099/';
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
const errs = [];
page.on('pageerror', e => errs.push(String(e.message || e)));
await page.goto(URL, { waitUntil: 'load' }).catch(() => {});
await page.waitForTimeout(2500);
const jump = async (y) => { await page.evaluate((yy) => { if (window.lenis?.scrollTo) window.lenis.scrollTo(yy, { immediate: true }); else window.scrollTo(0, yy); window.ScrollTrigger?.update?.(); }, y); await page.waitForTimeout(350); };
const sTop = await page.evaluate(() => { const e = document.querySelector('.sequence-section'); return e ? Math.round(e.getBoundingClientRect().top + window.scrollY) : -1; });
const sample = async () => page.evaluate(() => {
  const paths = [...document.querySelectorAll('[data-sequence-svg] path')];
  const lines = paths.map(p => { const len = p.getTotalLength ? p.getTotalLength() : 0; const off = parseFloat(getComputedStyle(p).strokeDashoffset) || 0; return len ? +(1 - Math.min(1, Math.abs(off) / len)).toFixed(2) : null; });
  // also a card transform (to confirm cards unaffected) + final title
  const card = document.querySelector('[data-sequence-card]');
  const cardY = card ? Math.round(card.getBoundingClientRect().top) : null;
  return { lines, cardY };
});
const rows = [];
for (let o = 0; o <= 7200; o += 400) { await jump(sTop + o); const s = await sample(); rows.push({ o, ...s }); }
console.log('sTop', sTop, 'pageErrors', errs.length ? errs.filter(e=>!/play\(\) request/.test(e)) : 'none');
for (const r of rows) console.log('off+' + String(r.o).padStart(4), 'lines', JSON.stringify(r.lines), 'cardTop', r.cardY);
await browser.close();
process.exit(0);
