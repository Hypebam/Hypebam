// Dev-only cross-browser diagnostic. Renders the local prod build in
// Chromium + Firefox + WebKit (Safari engine) and reports console/page errors,
// ScrollTrigger state, whether the sequence section actually pins, the runway
// height, and any CDN requests. Not part of the shipped app.
//   node scripts/xbrowser-probe.mjs [http://localhost:3077/]
import { chromium, firefox, webkit } from 'playwright';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const URL = process.argv[2] || 'http://localhost:3077/';
const TEMP = tmpdir();
const engines = { chromium, firefox, webkit };

for (const [name, launcher] of Object.entries(engines)) {
  let browser;
  try {
    browser = await launcher.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const errors = [], consoleErrs = [], cdnReqs = [], notFound = new Set();
    page.on('pageerror', (e) => errors.push(String(e.message || e)));
    page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') consoleErrs.push(m.type() + ': ' + m.text()); });
    page.on('request', (r) => { const u = r.url(); if (/jsdelivr|cdnjs|unpkg|googleapis|website-files|morematcha/.test(u)) cdnReqs.push(u); });
    page.on('response', (r) => { if (r.status() >= 400) notFound.add(r.status() + ' ' + r.url()); });

    await page.goto(URL, { waitUntil: 'load', timeout: 30000 }).catch((e) => errors.push('goto: ' + e.message));
    await page.waitForTimeout(3000);

    const probeAt = async (y) => {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(350);
      return await page.evaluate(() => {
        const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { top: Math.round(b.top), bottom: Math.round(b.bottom) }; };
        return { sticky: r(document.querySelector('.sequence-sticky')), seq: r(document.querySelector('.sequence-section')), scrollY: Math.round(window.scrollY) };
      });
    };

    const seqTop = await page.evaluate(() => { const s = document.querySelector('.sequence-section'); return s ? Math.round(s.getBoundingClientRect().top + window.scrollY) : -1; });
    const pinA = await probeAt(seqTop + 300);
    const pinB = await probeAt(seqTop + 1500);

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);

    const data = await page.evaluate(() => {
      const st = window.ScrollTrigger;
      const wrap = document.querySelector('.sequence-scroll-wrap');
      const sticky = document.querySelector('.sequence-sticky');
      return {
        hasGsap: !!window.gsap,
        hasScrollTrigger: !!st,
        scrollTriggerCount: st && st.getAll ? st.getAll().length : -1,
        hasLenis: !!window.lenis,
        htmlClass: document.documentElement.className.replace(/w-mod-\S+/g, '').trim(),
        wrapHeight: wrap ? getComputedStyle(wrap).height : 'none',
        stickyPosition: sticky ? getComputedStyle(sticky).position : 'none',
        stickyHeight: sticky ? getComputedStyle(sticky).height : 'none',
      };
    });

    await page.screenshot({ path: join(TEMP, `xb_${name}_top.png`) });
    await page.evaluate((y) => window.scrollTo(0, y), seqTop + 800);
    await page.waitForTimeout(500);
    await page.screenshot({ path: join(TEMP, `xb_${name}_seq.png`) });

    const a = pinA.sticky?.top, b = pinB.sticky?.top;
    console.log(`\n===== ${name} =====`);
    console.log(JSON.stringify({ data, pinnedHeuristic: (Math.abs(a ?? 9999) < 60 && Math.abs(b ?? 9999) < 60) ? 'PINNED' : 'NOT pinned (top ' + a + ' -> ' + b + ')', pageErrors: errors, cdnRequests: cdnReqs, badResponses: [...notFound] }, null, 2));
    await browser.close();
  } catch (e) {
    console.log(`\n===== ${name} FAILED: ${e.message} =====`);
    if (browser) await browser.close().catch(() => {});
  }
}
process.exit(0);
