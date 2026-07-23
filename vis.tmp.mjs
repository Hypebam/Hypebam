import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
const OUT=process.argv[2]; mkdirSync(OUT,{recursive:true});
let browser;
try { browser = await chromium.launch({ channel: 'msedge' }); }
catch { browser = await chromium.launch({ channel: 'chrome' }); }
async function shot(w,h,name,fn){
  const ctx=await browser.newContext({viewport:{width:w,height:h},isMobile:w<1000,hasTouch:w<1000});
  const page=await ctx.newPage();
  await page.goto('http://localhost:3000',{waitUntil:'load'});
  await page.waitForFunction(()=>document.documentElement.classList.contains('is-ready'),null,{timeout:12000}).catch(()=>{});
  await page.waitForTimeout(1500);
  await page.evaluate(async()=>{const H=document.body.scrollHeight;for(let y=0;y<=H;y+=innerHeight*0.5){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,80));}window.scrollTo(0,0);await new Promise(r=>setTimeout(r,300));});
  await fn(page);
  await page.screenshot({path:`${OUT}/${name}.png`});
  await ctx.close();
}
const toSel=(selr,frac=0)=>async(page)=>{await page.evaluate(({selr,frac})=>{const e=document.querySelector(selr);if(e)window.scrollTo(0,Math.max(0,e.getBoundingClientRect().top+scrollY-innerHeight*frac));},{selr,frac});await page.waitForTimeout(900);};
// can clip on desktop short windows
await shot(1440,800,'can-1440x800',toSel('.testimonial-section',0));
await shot(1440,700,'can-1440x700',toSel('.testimonial-section',0));
// testimonial mobile full (layering + slider + stuck)
await shot(390,844,'testi-phone',toSel('.testimonial-section',0));
// hero logo tab + phone
await shot(768,1024,'hero-tab',toSel('.stage',0));
await shot(390,844,'hero-phone',toSel('.stage',0));
// marquee closeup phone (scroll so marquee band is centered)
await shot(390,844,'marquee-phone',async(page)=>{await page.evaluate(()=>{const m=document.querySelector('.marquee');window.scrollTo(0,m.getBoundingClientRect().top+scrollY-innerHeight*0.35);});await page.waitForTimeout(900);});
// sequence signature phone
await shot(390,844,'seqsig-phone',async(page)=>{await page.evaluate(()=>{const s=document.querySelector('.sequence-signature');window.scrollTo(0,s.getBoundingClientRect().top+scrollY-60);});await page.waitForTimeout(900);});
await browser.close();console.log('done');
