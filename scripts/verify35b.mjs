import { chromium } from 'playwright';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const URL = process.argv[2] || 'http://localhost:3113/';
const TEMP = tmpdir();
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })).newPage();
await page.goto(URL, { waitUntil: 'load' }).catch(() => {});
await page.waitForTimeout(2500);
const jump = async (y) => { await page.evaluate((yy) => { if (window.lenis?.scrollTo) window.lenis.scrollTo(yy, { immediate: true }); else window.scrollTo(0, yy); window.ScrollTrigger?.update?.(); }, y); await page.waitForTimeout(500); };
const rect = (s) => page.evaluate((sel) => { const e = document.querySelector(sel); if (!e) return null; const b = e.getBoundingClientRect(); return { topAbs: Math.round(b.top + window.scrollY), h: Math.round(b.height), w: Math.round(b.width) }; }, s);

// Fact circles
const facts = await rect('.stage-facts');
const circle = await rect('.stage-fact');
console.log('stage-facts', JSON.stringify(facts), 'one .stage-fact', JSON.stringify(circle));
if (facts) { await jump(facts.topAbs - 250); await page.screenshot({ path: join(TEMP, 'm35b_facts.png') }); }

// Stage-right
const sr = await rect('.stage-right');
console.log('stage-right', JSON.stringify(sr));
if (sr) { await jump(sr.topAbs - 120); await page.screenshot({ path: join(TEMP, 'm35b_stageright.png') }); }

// Testimonial bottom edge
const ts = await rect('.testimonial-section');
if (ts) { await jump(ts.topAbs + ts.h - 700); await page.screenshot({ path: join(TEMP, 'm35b_testibottom.png') }); console.log('testimonial bottomAbs', ts.topAbs + ts.h); }
await browser.close();
process.exit(0);
