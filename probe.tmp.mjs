import { chromium } from 'playwright';
let browser;
try { browser = await chromium.launch({ channel: 'msedge' }); }
catch { browser = await chromium.launch({ channel: 'chrome' }); }
const ctx = await browser.newContext({ viewport:{width:390,height:844}, isMobile:true, hasTouch:true });
const page = await ctx.newPage();
await page.goto('http://localhost:3000',{waitUntil:'load'});
await page.waitForFunction(()=>document.documentElement.classList.contains('is-ready'),null,{timeout:12000}).catch(()=>{});
await page.waitForTimeout(1400);
await page.evaluate(async()=>{const H=document.body.scrollHeight;for(let y=0;y<=H;y+=innerHeight*0.5){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,80));}});
const d = await page.evaluate(()=>{
  const sec=document.querySelector('.testimonial-section');
  window.scrollTo(0, sec.getBoundingClientRect().top+scrollY);
  const g=(s)=>{const e=document.querySelector(s);if(!e)return null;const c=getComputedStyle(e);const r=e.getBoundingClientRect();return {disp:c.display, fd:c.flexDirection, jc:c.justifyContent, ac:c.alignContent, flex:c.flex, h:Math.round(r.height), top:Math.round(r.top)};};
  return {
    section: g('.testimonial-section'),
    container: g('.testimonial-container'),
    grid: g('.testimonial-container > .grid-layout'),
    bigTitle: g('.big-title-wrapper'),
    slider: g('.testimonial-slider'),
  };
});
console.log(JSON.stringify(d,null,1));
await browser.close();
