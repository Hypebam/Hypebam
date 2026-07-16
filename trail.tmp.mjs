// Measures how far the sequence canvas trails the requested frame, per rAF,
// across three scroll profiles: human-speed, fast flick, and stop-dead.
import { chromium } from 'playwright';

let browser;
try { browser = await chromium.launch({ channel: 'msedge' }); }
catch { browser = await chromium.launch({ channel: 'chrome' }); }

for (const c of [
  { name: 'desktop', width: 1440, height: 900, mobile: false, dsf: 1 },
  { name: 'iphone14@3x', width: 390, height: 844, mobile: true, dsf: 3 },
]) {
  const ctx = await browser.newContext({ viewport: { width: c.width, height: c.height }, deviceScaleFactor: c.dsf, isMobile: c.mobile, hasTouch: c.mobile });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('http://localhost:3000', { waitUntil: 'load' });
  await page.waitForFunction(() => document.documentElement.classList.contains('is-ready'), null, { timeout: 12000 }).catch(() => {});
  await page.waitForTimeout(5000); // blobs land

  const profile = async (label, totalMs, fracStart, fracEnd) => {
    const r = await page.evaluate(async ({ totalMs, fracStart, fracEnd }) => {
      const seq = document.querySelector('.sequence-scroll-wrap');
      const cv = document.querySelector('.sequence-canvas');
      const top = seq.getBoundingClientRect().top + scrollY;
      const H = seq.scrollHeight - innerHeight;
      window.scrollTo(0, top + H * fracStart);
      await new Promise((r2) => setTimeout(r2, 800));
      const trail = [];
      let running = true;
      const tick = () => {
        if (cv.__seq && cv.__seq.shown >= 0) trail.push(Math.abs(cv.__seq.req - cv.__seq.shown));
        if (running) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      const t0 = performance.now();
      while (performance.now() - t0 < totalMs) {
        const f = fracStart + (fracEnd - fracStart) * ((performance.now() - t0) / totalMs);
        window.scrollTo(0, top + H * f);
        await new Promise((r2) => setTimeout(r2, 16));
      }
      await new Promise((r2) => setTimeout(r2, 700)); // settle after stop
      running = false;
      const zero = trail.filter((t) => t === 0).length;
      let maxRun = 0, run = 0;
      trail.forEach((t) => { run = t > 0 ? run + 1 : 0; maxRun = Math.max(maxRun, run); });
      return {
        samples: trail.length,
        inSyncPct: Math.round((zero / trail.length) * 100),
        maxTrail: Math.max(...trail),
        maxStuckTicks: maxRun,
        settledTrail: trail[trail.length - 1],
      };
    }, { totalMs, fracStart, fracEnd });
    console.log(`${c.name} ${label}:`, JSON.stringify(r));
  };

  await profile('human (12s full runway)   ', 12000, 0.02, 0.98);
  await profile('fast-flick (1.5s half)    ', 1500, 0.1, 0.6);
  await profile('reverse (5s, up)          ', 5000, 0.9, 0.2);
  console.log(`${c.name} errors:`, errors.length ? [...new Set(errors)].slice(0, 4).join(' | ') : 'none');
  await ctx.close();
}
await browser.close();
console.log('DONE');
