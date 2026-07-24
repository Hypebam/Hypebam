import { chromium } from 'playwright';
let browser;
try { browser = await chromium.launch({ channel: 'msedge' }); }
catch { browser = await chromium.launch({ channel: 'chrome' }); }

for (const c of [{n:'phone 390',w:390,h:844,m:true},{n:'phone 360',w:360,h:800,m:true},{n:'tab 768',w:768,h:1024,m:true},{n:'desk 1440',w:1440,h:900,m:false}]) {
  const ctx = await browser.newContext({ viewport:{width:c.w,height:c.h}, isMobile:c.m, hasTouch:c.m });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000',{waitUntil:'load'});
  await page.waitForFunction(()=>document.documentElement.classList.contains('is-ready'),null,{timeout:12000}).catch(()=>{});
  await page.waitForTimeout(1400);
  await page.evaluate(async()=>{const H=document.body.scrollHeight;for(let y=0;y<=H;y+=innerHeight*0.5){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,80));}});

  // 1) testimonial-big-heading centering (mobile issue)
  const heading = await page.evaluate(()=>{
    const s=document.querySelector('.testimonial-section'); window.scrollTo(0,s.getBoundingClientRect().top+scrollY);
    const bt=document.querySelector('.big-title-wrapper'), h=document.querySelector('.testimonial-big-heading');
    if(!bt||!h)return null;
    const btr=bt.getBoundingClientRect(), hr=h.getBoundingClientRect();
    return {vw:innerWidth,
      wrapper:{L:Math.round(btr.left),R:Math.round(btr.right),W:Math.round(btr.width),centerOffset:Math.round((btr.left+btr.width/2)-innerWidth/2)},
      heading:{L:Math.round(hr.left),R:Math.round(hr.right),W:Math.round(hr.width),centerOffset:Math.round((hr.left+hr.width/2)-innerWidth/2)},
      textAlign:getComputedStyle(h).textAlign, wrapperPad:getComputedStyle(bt).padding, wrapperMargin:getComputedStyle(bt).margin,
      wrapperAlign:getComputedStyle(bt).alignItems + '/' + getComputedStyle(bt).justifyContent
    };
  });

  // 2) mobile finale — how progress-linked is it? sample opacity at scroll frac
  const finale = await page.evaluate(async()=>{
    const wrap=document.querySelector('.sequence-scroll-wrap'); if(!wrap)return null;
    const top=wrap.getBoundingClientRect().top+scrollY, H=wrap.scrollHeight-innerHeight;
    const t=document.querySelector('.sequence-final-mobile .sequence-title');
    if(!t||t.offsetParent===null) return {visible:false};
    // scroll to 40%, 60%, 80%, 100% and sample word states
    const results=[];
    for (const f of [0.30, 0.60, 0.80, 0.95, 1.0]) {
      window.scrollTo(0, top+H*f);
      await new Promise(r=>setTimeout(r,200));
      const words=[...t.querySelectorAll('.seq-final-word')];
      results.push({frac:f, wordCount:words.length, firstOp:words[0]?getComputedStyle(words[0]).opacity:'nowords', firstY:words[0]?getComputedStyle(words[0]).transform:'n/a'});
    }
    return {visible:true, results};
  });

  // 3) marquee text vertical alignment vs band CENTER (not top)
  const marq = await page.evaluate(()=>{
    const m=document.querySelector('.marquee'); if(!m)return null;
    window.scrollTo(0,m.getBoundingClientRect().top+scrollY-innerHeight*0.35);
  });
  await page.waitForTimeout(500);
  const marqData = await page.evaluate(()=>{
    const bg=document.querySelector('.marquee-bg-svg path'), txt=document.querySelector('.marquee-text-svg textPath');
    if(!bg||!txt)return null;
    const br=bg.getBoundingClientRect(), tr=txt.getBoundingClientRect();
    const bandCenter=br.top+br.height/2, txtCenter=tr.top+tr.height/2;
    return {
      band:{top:Math.round(br.top),bot:Math.round(br.bottom),h:Math.round(br.height),center:Math.round(bandCenter)},
      text:{top:Math.round(tr.top),bot:Math.round(tr.bottom),h:Math.round(tr.height),center:Math.round(txtCenter)},
      offsetFromCenter:Math.round(txtCenter-bandCenter),  // + = text below center, - = text above center
    };
  });

  // 4) stage-visual (hero can) size/position on mobile
  const stage = await page.evaluate(()=>{
    window.scrollTo(0,0);
    const sv=document.querySelector('.stage-visual'), cv=document.querySelector('.stage-canvas');
    if(!sv)return null;
    const svr=sv.getBoundingClientRect(), cvr=cv?.getBoundingClientRect();
    return {vh:innerHeight, stage:{top:Math.round(svr.top),bot:Math.round(svr.bottom),w:Math.round(svr.width),h:Math.round(svr.height)}, canvas:cvr?{w:Math.round(cvr.width),h:Math.round(cvr.height),scale:getComputedStyle(cv).scale}:null};
  });

  // 5) desktop testimonial can position (only for desktop)
  let deskCan = null;
  if (!c.m) {
    deskCan = await page.evaluate(()=>{
      const s=document.querySelector('.testimonial-section'); window.scrollTo(0,s.getBoundingClientRect().top+scrollY);
      const can=document.querySelector('.testimonial-top-img'), sec=document.querySelector('.testimonial-section');
      if(!can)return null;
      const cr=can.getBoundingClientRect(), sr=sec.getBoundingClientRect();
      return {vh:innerHeight,vw:innerWidth,secH:Math.round(sr.height),
        canBox:{top:Math.round(cr.top-sr.top),h:Math.round(cr.height)},
        fit:getComputedStyle(can).objectFit, pos:getComputedStyle(can).objectPosition, scale:getComputedStyle(can).scale, tr:getComputedStyle(can).translate
      };
    });
  }

  console.log(`\n===== ${c.n} =====`);
  console.log('BIG HEADING:', JSON.stringify(heading));
  console.log('MOBILE FINALE:', JSON.stringify(finale));
  console.log('MARQUEE:', JSON.stringify(marqData));
  console.log('STAGE:', JSON.stringify(stage));
  if(deskCan) console.log('DESK CAN:', JSON.stringify(deskCan));
  await ctx.close();
}
await browser.close();
