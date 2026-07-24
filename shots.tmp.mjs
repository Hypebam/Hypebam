import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
const OUT=process.argv[2]; mkdirSync(OUT,{recursive:true});
let browser;
try { browser = await chromium.launch({ channel: 'msedge' }); }
catch { browser = await chromium.launch({ channel: 'chrome' }); }
async function shot(w,h,name,fn,m=true){
  const ctx=await browser.newContext({viewport:{width:w,height:h},isMobile:m,hasTouch:m});
  const page=await ctx.newPage();
  await page.goto('http://localhost:3000',{waitUntil:'load'});
  await page.waitForFunction(()=>document.documentElement.classList.contains('is-ready'),null,{timeout:12000}).catch(()=>{});
  await page.waitForTimeout(1500);
  await page.evaluate(async()=>{const H=document.body.scrollHeight;for(let y=0;y<=H;y+=innerHeight*0.5){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,80));}window.scrollTo(0,0);await new Promise(r=>setTimeout(r,300));});
  await fn(page); await page.screenshot({path:`${OUT}/${name}.png`}); await ctx.close();
}
const to=(selr,frac)=>async(p)=>{await p.evaluate(({selr,frac})=>{const e=document.querySelector(selr);if(e)window.scrollTo(0,Math.max(0,e.getBoundingClientRect().top+scrollY-innerHeight*frac));},{selr,frac});await p.waitForTimeout(900);};
// 1. big heading centered - phone testimonial
await shot(390,844,'1-heading-phone',to('.testimonial-section',0));
// 2. mobile finale mid-scroll (0.7 of runway)
await shot(390,844,'2-finale-mid',async(p)=>{await p.evaluate(()=>{const w=document.querySelector('.sequence-scroll-wrap');const top=w.getBoundingClientRect().top+scrollY;window.scrollTo(0,top+(w.scrollHeight-innerHeight)*0.75);});await p.waitForTimeout(1200);});
// 3. marquee balance
await shot(390,844,'3-marquee-phone',to('.marquee',0.4));
await shot(768,1024,'3-marquee-tab',to('.marquee',0.4));
// 4. stage bigger
await shot(390,844,'4-stage-phone',to('.stage',0));
await shot(768,1024,'4-stage-tab',to('.stage',0));
// 5. desktop can higher
await shot(1440,900,'5-can-desk',to('.testimonial-section',0),false);
await browser.close();
