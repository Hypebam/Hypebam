// Loads the local production build on an emulated phone under a throttled
// network and records exactly what the user perceives:
//   - when html.is-ready lands (loader lifts)
//   - whether any hero element goes visible -> hidden -> visible AFTER reveal
//     (the "loads twice" signature)
//   - hydration / runtime console errors
//   - how many times each hero frame + app.js were fetched (dedupe check)
import { chromium } from 'playwright';

const BASE = process.env.BASE || 'http://localhost:3999';
const PROFILES = {
  fast4g: { downloadThroughput: 4 * 1024 * 1024 / 8, uploadThroughput: 1 * 1024 * 1024 / 8, latency: 70 },
  slow3g: { downloadThroughput: 500 * 1024 / 8, uploadThroughput: 200 * 1024 / 8, latency: 400 },
};
const profileName = process.argv[2] || 'fast4g';
const net = PROFILES[profileName];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true,
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
});
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);
await cdp.send('Network.enable');
await cdp.send('Network.emulateNetworkConditions', { offline: false, ...net });

const reqCounts = {};
page.on('request', (r) => {
  const u = new URL(r.url()).pathname + (new URL(r.url()).search || '');
  if (/hypeBamVideo00|app\.js|gsap|original-flavor-icon|hero\/\d\.jpg/.test(u)) reqCounts[u] = (reqCounts[u] || 0) + 1;
  if (/seq_0_/.test(u)) { reqCounts.__seqFrames = (reqCounts.__seqFrames || 0) + 1; if (!reqCounts.__firstSeqAt) reqCounts.__firstSeqAt = Date.now() - t0; }
});
const consoleErrs = [];
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') consoleErrs.push(m.type() + ': ' + m.text().slice(0, 200)); });
page.on('pageerror', (e) => consoleErrs.push('pageerror: ' + String(e).slice(0, 200)));

await page.addInitScript(() => {
  const L = (window.__probe = { t0: performance.now(), cls: [], cta: [], logo: [], canvas: [], navType: null, load: null, prefetchStart: null, appjs: null });
  window.addEventListener('load', () => { L.load = Math.round(performance.now()); });
  // init scripts run before <html> exists — wait for it
  const arm = () => {
    const html = document.documentElement;
    if (!html) return setTimeout(arm, 5);
    new MutationObserver(() => {
      const has = html.classList.contains('is-ready');
      const last = L.cls[L.cls.length - 1];
      if (!last || last.ready !== has) L.cls.push({ t: Math.round(performance.now()), ready: has });
    }).observe(html, { attributes: true, attributeFilter: ['class'] });
    // when did the head prefetcher + app.js actually start executing?
    const poll = setInterval(() => {
      if (L.prefetchStart == null && window.__hypeHeroFrames) L.prefetchStart = Math.round(performance.now());
      if (L.appjs == null && window.lenis) L.appjs = Math.round(performance.now());
      if (L.prefetchStart != null && L.appjs != null) clearInterval(poll);
    }, 20);
  };
  arm();
  const samp = (sel, arr) => {
    const el = document.querySelector(sel);
    if (!el) return;
    const cs = getComputedStyle(el);
    const o = +(+cs.opacity).toFixed(2);
    const last = arr[arr.length - 1];
    if (!last || last.o !== o) arr.push({ t: Math.round(performance.now()), o });
  };
  setInterval(() => {
    samp('[data-load-stage-cta]', L.cta);
    samp('.stage-logo', L.logo);
    samp('.stage-canvas', L.canvas);
  }, 50);
});

const t0 = Date.now();
await page.goto(BASE + '/', { waitUntil: 'commit' });
await page.waitForTimeout(Number(process.argv[3] || 14000));

const probe = await page.evaluate(() => {
  const nav = performance.getEntriesByType('navigation')[0];
  return { ...window.__probe, navType: nav && nav.type, frames: Object.keys(window.__hypeHeroFrames || {}).length };
});
await browser.close();

const readyAt = probe.cls.find((c) => c.ready);
// double-load signature: after reveal, CTA/logo opacity goes to ~1 then back to ~0 then 1 again
const afterReady = (arr) => readyAt ? arr.filter((s) => s.t >= readyAt.t) : arr;
const dip = (arr) => { const a = afterReady(arr); let seenOne = false; for (const s of a) { if (s.o >= 0.95) seenOne = true; else if (seenOne && s.o <= 0.05) return true; } return false; };

console.log(JSON.stringify({
  profile: profileName,
  isReadyAt_ms: readyAt ? readyAt.t : null,
  isReadyTransitions: probe.cls,
  windowLoad_ms: probe.load,
  navigationType: probe.navType,
  doubleLoad_CTA: dip(probe.cta),
  doubleLoad_logo: dip(probe.logo),
  ctaOpacityTimeline: probe.cta,
  canvasOpacityTimeline: probe.canvas,
  heroFramesPrefetched: probe.frames,
  requestCounts: reqCounts,
  consoleErrors: consoleErrs,
}, null, 2));
