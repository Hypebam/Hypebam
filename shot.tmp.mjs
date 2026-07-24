import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
const OUT=process.argv[2]; mkdirSync(OUT,{recursive:true});
let browser;
try { browser = await chromium.launch({ channel: 'msedge' }); }
catch { browser = await chromium.launch({ channel: 'chrome' }); }
for (const c of [{n:'720p',w:1280,h:720},{n:'1080p',w:1920,h:1080},{n:'1440p',w:2560,h:1440}]) {
  const ctx = await browser.newContext({ viewport:{width:c.w,height:c.h} });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000',{waitUntil:'load'});
  await page.waitForFunction(()=>document.documentElement.classList.contains('is-ready'),null,{timeout:12000}).catch(()=>{});
  await page.waitForTimeout(1400);
  await page.evaluate(()=>{const s=document.querySelector('.testimonial-section');window.scrollTo(0,s.getBoundingClientRect().top+scrollY);});
  await page.waitForTimeout(900);
  await page.screenshot({path:`${OUT}/${c.n}.png`});
  await ctx.close();
}
await browser.close();
