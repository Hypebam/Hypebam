// Precise critical-path timeline for the hero reveal on a throttled phone.
import { chromium } from 'playwright';

const BASE = 'http://localhost:3999';
const PROFILES = {
  fast4g: { downloadThroughput: 4 * 1024 * 1024 / 8, uploadThroughput: 1 * 1024 * 1024 / 8, latency: 70 },
  slow3g: { downloadThroughput: 500 * 1024 / 8, uploadThroughput: 200 * 1024 / 8, latency: 400 },
};
const profile = process.argv[2] || 'fast4g';
const waitMs = Number(process.argv[3] || 12000);

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);
await cdp.send('Network.enable');
await cdp.send('Network.emulateNetworkConditions', { offline: false, ...PROFILES[profile] });

let navStart = null;
const res = [];
page.on('requestfinished', async (r) => {
  const t = r.timing();
  if (!t) return;
  if (navStart == null && r.resourceType() === 'document') navStart = t.startTime;
  const u = new URL(r.url()).pathname;
  if (/\.css|chunks\/|gsap|app\.js|fonts|media\/|hypeBamVideo00(1|2|3|12|23)\.webp|original-flavor|hero\/|logo-final|seq_0_0/.test(u))
    res.push({ u, s: t.startTime, e: t.startTime + t.responseEnd });
});

await page.addInitScript(() => {
  const M = (window.__marks = {});
  const mark = (k) => { if (M[k] == null) M[k] = Math.round(performance.now()); };
  const arm = () => {
    if (!document.documentElement) return setTimeout(arm, 5);
    const iv = setInterval(() => {
      if (window.__hypeHeroFrames) mark('prefetchScriptRan');
      if (document.getElementById('mouse-glow-overlay') || document.querySelector('.loader img[src*="original-flavor"]')?.style?.transform) mark('hydrated');
      if (window.gsap) mark('gsapCore');
      if (window.gsap && window.SplitText && window.InertiaPlugin) mark('gsapAllPlugins');
      if (window.lenis) mark('appjsExecuting');
      try { if (document.fonts.check('1em badBrush') && document.fonts.check('1em goga')) mark('heroFontsReady'); } catch {}
      if (document.documentElement.classList.contains('fonts-loaded')) mark('fontsGatePassed');
      if (document.documentElement.classList.contains('has-seq-ready')) mark('frame0+grace done');
      if (document.documentElement.classList.contains('is-ready')) { mark('IS_READY'); }
    }, 10);
    if (window.__hypeHeroFrames) {
      const c = window.__hypeHeroFrames; const ks = Object.keys(c);
      c[ks[0]].then(() => mark('frame0decoded'));
      Promise.all(ks.map((k) => c[k].catch(() => {}))).then(() => mark('all23decoded'));
    } else {
      const w = setInterval(() => { if (window.__hypeHeroFrames) { clearInterval(w); const c = window.__hypeHeroFrames; const ks = Object.keys(c); c[ks[0]].then(() => mark('frame0decoded')); Promise.all(ks.map((k) => c[k].catch(() => {}))).then(() => mark('all23decoded')); } }, 10);
    }
  };
  arm();
});

await page.goto(BASE + '/', { waitUntil: 'commit' });
await page.waitForTimeout(waitMs);
const marks = await page.evaluate(() => window.__marks);
await browser.close();

const rel = (x) => Math.round(x - navStart);
const rows = res.map((r) => ({ u: r.u.replace('/_next/static/', '~/'), start: rel(r.s), end: rel(r.e) })).sort((a, b) => a.end - b.end);
console.log('== requests (ms from nav start) — sorted by finish ==');
for (const r of rows) console.log(String(r.start).padStart(6), '→', String(r.end).padStart(6), ' ', r.u);
console.log('\n== marks (ms, performance.now) ==');
for (const [k, v] of Object.entries(marks).sort((a, b) => a[1] - b[1])) console.log(String(v).padStart(6), ' ', k);
