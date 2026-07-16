// Mobile layout audit: loads the site at real device viewports, scrolls
// through every section (letting ScrollTriggers fire), screenshots each stop,
// reports page JS errors + any element that pokes outside the viewport.
//
//   npm run build && npm start          (serve on :3000 first)
//   node scripts/mobile-audit.mjs out-dir
//
// Uses the system Edge/Chrome (Playwright channel) — no browser download.
// Run from the repo root so `playwright` resolves.
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import path from 'path';

const OUT = process.argv[2] || 'mobile-audit-shots';
mkdirSync(OUT, { recursive: true });

const DEVICES = [
  { name: 'iphone14', width: 390, height: 844, dsf: 3, mobile: true },
  { name: 'galaxy',   width: 360, height: 800, dsf: 3, mobile: true },
  { name: 'se',       width: 320, height: 568, dsf: 2, mobile: true },
  { name: 'tablet',   width: 768, height: 1024, dsf: 2, mobile: true },
];

let browser;
try { browser = await chromium.launch({ channel: 'msedge' }); }
catch { try { browser = await chromium.launch({ channel: 'chrome' }); } catch { browser = await chromium.launch(); } }
for (const d of DEVICES) {
  const ctx = await browser.newContext({
    viewport: { width: d.width, height: d.height },
    deviceScaleFactor: 1, // 1:1 pixels keep file sizes readable
    isMobile: d.mobile,
    hasTouch: d.mobile,
    userAgent: d.mobile
      ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
      : undefined,
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });

  await page.goto('http://localhost:3000', { waitUntil: 'load', timeout: 60000 });
  // wait for loader to lift (is-ready) — fallback forces it by 8s
  await page.waitForFunction(() => document.documentElement.classList.contains('is-ready'), null, { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(2500);

  // collect section stop-points
  const stops = await page.evaluate(() => {
    const pts = [];
    const add = (name, y) => pts.push({ name, y: Math.max(0, Math.round(y)) });
    const top = (sel) => { const el = document.querySelector(sel); return el ? el.getBoundingClientRect().top + window.scrollY : null; };
    add('hero', 0);
    const marq = top('.marquee'); if (marq != null) add('marquee', marq - innerHeight * 0.55);
    const ins = top('.insider-section'); if (ins != null) { add('insider-videos', ins - 40); add('insider-text', ins + innerHeight * 1.2); }
    const seq = document.querySelector('.sequence-scroll-wrap');
    if (seq) {
      const sTop = seq.getBoundingClientRect().top + scrollY, sH = seq.scrollHeight;
      [0.05, 0.3, 0.55, 0.8, 0.98].forEach((f, i) => add('sequence-' + i, sTop + sH * f - innerHeight * 0.2));
    }
    const ben = top('.benefit-section'); if (ben != null) { add('benefits', ben - 60); add('benefits-table', ben + innerHeight * 0.7); }
    const tes = top('.testimonial-section'); if (tes != null) { add('testimonial', tes - 30); add('testimonial-cards', tes + innerHeight * 0.8); }
    const hbf = top('.hbf'); if (hbf != null) { add('flavour', hbf - 30); add('flavour-info', hbf + innerHeight * 0.75); }
    const pay = top('.payment-section'); if (pay != null) add('payment', pay - 40);
    const foo = top('.footer'); if (foo != null) { add('footer', foo - 60); add('footer-end', document.body.scrollHeight); }
    return pts;
  });

  for (const s of stops) {
    await page.evaluate((y) => {
      if (window.lenis && window.lenis.scrollTo) window.lenis.scrollTo(y, { immediate: true });
      window.scrollTo(0, y);
    }, s.y);
    await page.waitForTimeout(900); // let ScrollTriggers/tweens settle
    await page.screenshot({ path: path.join(OUT, `${d.name}--${s.name}.png`) });
  }

  // horizontal overflow check
  const hOverflow = await page.evaluate(() => {
    const w = document.documentElement.clientWidth;
    const bad = [];
    document.querySelectorAll('body *').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width > 1 && (r.right > w + 8 || r.left < -8) && getComputedStyle(el).position !== 'fixed') {
        const cs = getComputedStyle(el);
        if (cs.visibility !== 'hidden' && cs.opacity !== '0' && cs.display !== 'none')
          bad.push(`${el.tagName}.${(el.className && el.className.baseVal ? el.className.baseVal : el.className) || ''} L${Math.round(r.left)} R${Math.round(r.right)} (vw ${w})`);
      }
    });
    return bad.slice(0, 25);
  });

  console.log(`\n===== ${d.name} (${d.width}x${d.height}) =====`);
  console.log('stops:', stops.map((s) => s.name).join(', '));
  if (errors.length) console.log('JS ERRORS:\n' + [...new Set(errors)].slice(0, 10).join('\n'));
  else console.log('JS ERRORS: none');
  if (hOverflow.length) console.log('H-OVERFLOW ELEMENTS:\n' + hOverflow.join('\n'));
  else console.log('H-OVERFLOW: none');
  await ctx.close();
}
await browser.close();
console.log('\nDONE');
