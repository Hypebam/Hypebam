import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })).newPage();
try { await page.goto('https://more-nutrition.webflow.io/', { waitUntil: 'load', timeout: 45000 }); } catch (e) { console.log('goto', e.message); }
await page.waitForTimeout(4000);
const dump = await page.evaluate(() => {
  const pick = (el) => { if (!el) return null; const cs = getComputedStyle(el); const b = el.getBoundingClientRect();
    return { cls: el.className, w: Math.round(b.width), h: Math.round(b.height), top: Math.round(b.top), left: Math.round(b.left),
      position: cs.position, display: cs.display, marginTop: cs.marginTop, marginLeft: cs.marginLeft, transform: cs.transform.slice(0,40), inset: cs.inset, alignSelf: cs.alignSelf, gridArea: cs.gridArea }; };
  const facts = document.querySelector('.stage-facts');
  const outers = [...document.querySelectorAll('.stage-fact-outer')].map(pick);
  const circles = [...document.querySelectorAll('.stage-fact')].map(pick);
  const factsCS = facts ? (() => { const cs = getComputedStyle(facts); return { display: cs.display, flexDirection: cs.flexDirection, position: cs.position, height: Math.round(facts.getBoundingClientRect().height), justifyContent: cs.justifyContent, alignItems: cs.alignItems, gap: cs.gap, gridArea: cs.gridArea }; })() : null;
  // also the parent of stage-facts
  const parent = facts ? pick(facts.parentElement) : null;
  return { factsCS, parentOfFacts: parent, outers, circles };
});
console.log(JSON.stringify(dump, null, 2));
await browser.close();
process.exit(0);
