import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
const OUT=process.argv[2]; mkdirSync(OUT,{recursive:true});
let browser;
try { browser = await chromium.launch({ channel: 'msedge' }); }
catch { browser = await chromium.launch({ channel: 'chrome' }); }
async function shot(w,h,name,fn){
  const ctx=await browser.newContext({viewport:{width:w,height:h},isMobile:true,hasTouch:true});
  const page=await ctx.newPage();
  await page.goto('http://localhost:3000',{waitUntil:'load'});
  await page.waitForFunction(()=>document.documentElement.classList.contains('is-ready'),null,{timeout:12000}).catch(()=>{});
  await page.waitForTimeout(1500);
  await page.evaluate(async()=>{const H=document.body.scrollHeight;for(let y=0;y<=H;y+=innerHeight*0.5){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,80));}window.scrollTo(0,0);await new Promise(r=>setTimeout(r,300));});
  await fn(page); await page.screenshot({path:`${OUT}/${name}.png`}); await ctx.close();
}
const go=(selr,frac=0)=>async(p)=>{await p.evaluate(({selr,frac})=>{const e=document.querySelector(selr);if(e)window.scrollTo(0,Math.max(0,e.getBoundingClientRect().top+scrollY-innerHeight*frac));},{selr,frac});await p.waitForTimeout(900);};
await shot(390,844,'hero-phone',go('.stage',0));
await shot(390,844,'marquee-phone',go('.marquee',0.35));
await shot(360,800,'insider-360',go('.insider-section',0));
await shot(768,1024,'seqsig-tab',go('.sequence-signature',0.05));
await shot(768,1024,'testi-tab',go('.testimonial-section',0));
await browser.close();console.log('done');
