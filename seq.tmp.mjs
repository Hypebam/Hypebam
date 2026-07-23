import { chromium } from 'playwright';
let browser;
try { browser = await chromium.launch({ channel: 'msedge' }); }
catch { browser = await chromium.launch({ channel: 'chrome' }); }
// TEST 1: mobile sequence-title animation during scroll
for (const c of [{n:'tablet',w:768,h:1024},{n:'phone',w:390,h:844}]) {
  const ctx = await browser.newContext({ viewport:{width:c.w,height:c.h}, isMobile:true, hasTouch:true });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000',{waitUntil:'load'});
  await page.waitForFunction(()=>document.documentElement.classList.contains('is-ready'),null,{timeout:12000}).catch(()=>{});
  await page.waitForTimeout(1500);
  const res = await page.evaluate(async()=>{
    const wrap=document.querySelector('.sequence-scroll-wrap');
    const title=document.querySelector('.sequence-final-mobile .sequence-title');
    const top=wrap.getBoundingClientRect().top+scrollY; const H=wrap.scrollHeight-innerHeight;
    const samples=[];
    for(const f of [0.80,0.86,0.90,0.94,0.98,1.0]){
      window.scrollTo(0,top+H*f); await new Promise(r=>setTimeout(r,250));
      const cs=getComputedStyle(title);
      samples.push({f, op:cs.opacity, tf:cs.transform.slice(0,24), visible: title.offsetParent!==null});
    }
    return {samples, mobileTitleExists: !!title};
  });
  console.log(`${c.n} sequence-final-mobile title:`, JSON.stringify(res));
  await ctx.close();
}
// TEST 2: desktop can top-clip across window heights
console.log('\n--- CAN CLIP across desktop window heights (width 1440) ---');
for (const h of [1080, 900, 800, 720, 660, 600]) {
  const ctx = await browser.newContext({ viewport:{width:1440,height:h} });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000',{waitUntil:'load'});
  await page.waitForFunction(()=>document.documentElement.classList.contains('is-ready'),null,{timeout:12000}).catch(()=>{});
  await page.waitForTimeout(1200);
  const d = await page.evaluate(()=>{
    const sec=document.querySelector('.testimonial-section'); window.scrollTo(0,sec.getBoundingClientRect().top+scrollY);
    const secH=sec.getBoundingClientRect().height, W=innerWidth;
    // art covers width: rendered art height = W*1180/1400 = 0.843W. can top in art = 0.236*artH. Scale from base 0.831.
    const S=parseFloat(getComputedStyle(document.querySelector('.testimonial-top-img')).scale)||1;
    const tr=getComputedStyle(document.querySelector('.testimonial-top-img')).translate;
    const artH=0.843*W; const canBaseArt=0.831*artH, canTopArt=0.236*artH;
    const cropTop=Math.max(0,artH-secH);
    const canTopScaled=canBaseArt-(canBaseArt-canTopArt)*S;
    return {secH:Math.round(secH),W,scale:S,translate:tr,cropTop:Math.round(cropTop),canTopAfterCrop:Math.round(canTopScaled-cropTop),clippedPx:Math.max(0,Math.round(cropTop-canTopScaled))};
  });
  console.log(`h=${h}:`, JSON.stringify(d));
  await ctx.close();
}
await browser.close();
