import { chromium } from 'playwright';
const URL = process.argv[2] || 'http://localhost:3097/';
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
const errs = [];
page.on('pageerror', e => errs.push(String(e.message || e)));
await page.goto(URL, { waitUntil: 'load' }).catch(() => {});
await page.waitForTimeout(2500);
const jump = async (y) => { await page.evaluate((yy) => { if (window.lenis?.scrollTo) window.lenis.scrollTo(yy, { immediate: true }); else window.scrollTo(0, yy); window.ScrollTrigger?.update?.(); }, y); await page.waitForTimeout(500); };
const sTop = await page.evaluate(() => { const e = document.querySelector('.sequence-section'); return e ? Math.round(e.getBoundingClientRect().top + window.scrollY) : -1; });
// read the drawn fraction of each sequence line path across several offsets
const sample = async (y) => page.evaluate((yy) => {
  const paths = [...document.querySelectorAll('[data-sequence-svg] path')];
  return paths.map(p => {
    const len = p.getTotalLength ? p.getTotalLength() : 0;
    const cs = getComputedStyle(p);
    const off = parseFloat(cs.strokeDashoffset) || 0;
    const arr = cs.strokeDasharray;
    return { drawnFrac: len ? +(1 - Math.min(1, Math.abs(off) / len)).toFixed(2) : null, dash: arr.slice(0, 24) };
  });
}, y);
const offsets = [200, 1000, 2000, 3200, 4500, 6000];
const rows = [];
for (const o of offsets) { await jump(sTop + o); rows.push({ off: o, p: await sample(sTop + o) }); }
console.log('sTop', sTop, 'pageErrors', errs.length ? errs : 'none');
for (const r of rows) console.log('off+' + r.off, JSON.stringify(r.p.map(x => x.drawnFrac)));
await browser.close();
process.exit(0);
