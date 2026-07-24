import { chromium } from 'playwright';
let browser;
try { browser = await chromium.launch({ channel: 'msedge' }); }
catch { browser = await chromium.launch({ channel: 'chrome' }); }
const ctx = await browser.newContext({ viewport:{width:390,height:844}, isMobile:true, hasTouch:true });
const page = await ctx.newPage();
await page.goto('http://localhost:3000',{waitUntil:'load'});
await page.waitForFunction(()=>document.documentElement.classList.contains('is-ready'),null,{timeout:12000}).catch(()=>{});
await page.waitForTimeout(1500);
const d = await page.evaluate(()=>{
  const s=document.querySelector('.testimonial-section'); window.scrollTo(0,s.getBoundingClientRect().top+scrollY);
  const bt=document.querySelector('.big-title-wrapper'); const parent=bt.parentElement;
  return {
    wrapper:{L:Math.round(bt.getBoundingClientRect().left),W:Math.round(bt.getBoundingClientRect().width),ps:getComputedStyle(bt).placeSelf,gc:getComputedStyle(bt).gridColumn,gcs:getComputedStyle(bt).gridColumnStart,ma:getComputedStyle(bt).margin},
    parent:{tag:parent.tagName,cls:parent.className,L:Math.round(parent.getBoundingClientRect().left),W:Math.round(parent.getBoundingClientRect().width),disp:getComputedStyle(parent).display,gtc:getComputedStyle(parent).gridTemplateColumns,jc:getComputedStyle(parent).justifyContent}
  };
});
console.log(JSON.stringify(d,null,1));
await browser.close();
