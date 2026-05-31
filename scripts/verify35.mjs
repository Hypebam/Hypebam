import { chromium } from 'playwright';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const URL = process.argv[2] || 'http://localhost:3113/';
const TEMP = tmpdir();
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })).newPage();
const errs = [];
page.on('pageerror', e => errs.push(String(e.message || e)));
await page.goto(URL, { waitUntil: 'load' }).catch(() => {});
await page.waitForTimeout(2500);

// Hero (top)
await page.screenshot({ path: join(TEMP, 'm35_hero.png') });

const jump = async (y) => { await page.evaluate((yy) => { if (window.lenis?.scrollTo) window.lenis.scrollTo(yy, { immediate: true }); else window.scrollTo(0, yy); window.ScrollTrigger?.update?.(); }, y); await page.waitForTimeout(500); };
const off = (s) => page.evaluate((sel) => { const e = document.querySelector(sel); return e ? Math.round(e.getBoundingClientRect().top + window.scrollY) : -1; }, s);

// Scroll to the mobile sequence finale title and check is-inview
const t = await page.evaluate(() => { const e = document.querySelector('.sequence-final-mobile .sequence-title'); return e ? Math.round(e.getBoundingClientRect().top + window.scrollY) : -1; });
if (t > 0) {
  await jump(t - 500);            // bring title into view
  await page.waitForTimeout(1200);
  const state = await page.evaluate(() => {
    const e = document.querySelector('.sequence-final-mobile .sequence-title');
    const cs = getComputedStyle(e);
    return { hasInview: e.classList.contains('is-inview'), opacity: cs.opacity, translate: cs.translate || cs.transform };
  });
  console.log('SEQ TITLE', JSON.stringify(state));
  await page.screenshot({ path: join(TEMP, 'm35_seqtitle.png') });
} else { console.log('SEQ TITLE not found'); }

// Testimonial bottom
const tt = await off('.testimonial-section');
await jump(tt + 200);
await page.screenshot({ path: join(TEMP, 'm35_testi.png') });

console.log('pageErrors', errs.filter(e=>!/play\(\) request/.test(e)));
await browser.close();
process.exit(0);
