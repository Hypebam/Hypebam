import { chromium } from 'playwright';
let browser;
try { browser = await chromium.launch({ channel: 'msedge' }); }
catch { browser = await chromium.launch({ channel: 'chrome' }); }
for (const c of [{n:'tablet 768',w:768,h:1024},{n:'phone 390',w:390,h:844},{n:'phone 360',w:360,h:800}]) {
  const ctx = await browser.newContext({ viewport:{width:c.w,height:c.h}, isMobile:true, hasTouch:true });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000',{waitUntil:'load'});
  await page.waitForFunction(()=>document.documentElement.classList.contains('is-ready'),null,{timeout:12000}).catch(()=>{});
  await page.waitForTimeout(1400);
  await page.evaluate(async()=>{const H=document.body.scrollHeight;for(let y=0;y<=H;y+=innerHeight*0.5){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,80));}});

  // ---- TESTIMONIAL layering + slider position ----
  const t = await page.evaluate(()=>{
    const sec=document.querySelector('.testimonial-section');
    window.scrollTo(0, sec.getBoundingClientRect().top+scrollY);
    const zi=s=>{const e=document.querySelector(s);if(!e)return null;const cs=getComputedStyle(e);return {z:cs.zIndex,pos:cs.position,tf:cs.transform.slice(0,20),op:cs.opacity};};
    const box=s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return {top:Math.round(r.top),bot:Math.round(r.bottom),h:Math.round(r.height)};};
    const secH=Math.round(sec.getBoundingClientRect().height);
    const sw=box('.testimonial-slider-wrapper');
    return {
      secH,
      bgImg:zi('.bg-img'), can:zi('.testimonial-top-img'), heading:zi('.big-title-wrapper'), slider:zi('.testimonial-slider'),
      container:zi('.testimonial-container'), gridLayout:zi('.testimonial-container .grid-layout'), bgWrap:zi('.bg-img-wrapper'),
      sliderWrapBox: sw, gapBelowSlider: sw ? secH - sw.bot : null,
      bigHeadingBox: box('.big-title-wrapper'), canBox: box('.testimonial-top-img'),
    };
  });

  // ---- INSIDER heading line count ----
  const ins = await page.evaluate(()=>{
    const h=document.querySelector('.insider-heading'); if(!h)return null;
    const cs=getComputedStyle(h); const lh=parseFloat(cs.lineHeight)||parseFloat(cs.fontSize)*1.2;
    const r=h.getBoundingClientRect();
    return {fontSize:Math.round(parseFloat(cs.fontSize)), lines:Math.round(r.height/lh), h:Math.round(r.height), brCount:h.querySelectorAll('br').length};
  });

  // ---- STAGE-LOGO padding/empty space ----
  const logo = await page.evaluate(()=>{
    const slot=document.querySelector('.stage-logo'); const img=document.querySelector('.stage-logo-img');
    if(!slot||!img)return null;
    const sr=slot.getBoundingClientRect(), ir=img.getBoundingClientRect();
    return {slotH:Math.round(sr.height), imgH:Math.round(ir.height), emptyAbove:Math.round(ir.top-sr.top), emptyBelow:Math.round(sr.bottom-ir.bottom), marginTop:getComputedStyle(slot).marginTop};
  });

  // ---- MARQUEE text vertical balance on band ----
  const marq = await page.evaluate(()=>{
    const band=document.querySelector('.marquee-bg-svg'), txt=document.querySelector('.marquee-text-svg text');
    if(!band||!txt)return null;
    const br=band.getBoundingClientRect(), tr=txt.getBoundingClientRect();
    return {bandTop:Math.round(br.top),bandBot:Math.round(br.bottom),txtTop:Math.round(tr.top),txtBot:Math.round(tr.bottom),
      gapAbove:Math.round(tr.top-br.top),gapBelow:Math.round(br.bottom-tr.bottom)};
  });

  // ---- SEQUENCE-SIGNATURE overlap ----
  const sig = await page.evaluate(()=>{
    const s=document.querySelector('.sequence-signature'); if(!s)return null;
    const sr=s.getBoundingClientRect();
    return {top:Math.round(sr.top+scrollY),bot:Math.round(sr.bottom+scrollY),h:Math.round(sr.height),pos:getComputedStyle(s).position};
  });

  console.log(`\n===== ${c.n} =====`);
  console.log('TESTIMONIAL:', JSON.stringify(t));
  console.log('INSIDER heading:', JSON.stringify(ins));
  console.log('STAGE-LOGO:', JSON.stringify(logo));
  console.log('MARQUEE:', JSON.stringify(marq));
  console.log('SEQ-SIGNATURE:', JSON.stringify(sig));
  await ctx.close();
}
await browser.close();
