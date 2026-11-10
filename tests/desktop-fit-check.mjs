import {chromium} from '@playwright/test';
const browser=await chromium.launch({channel:'chrome'});
const page=await browser.newPage();
await page.goto('http://127.0.0.1:5173');
await page.evaluate(async()=>{const {newSave}=await import('/tests/legacy-save.js');const s=newSave();s.started=true;localStorage.setItem('pmb-save-v1',JSON.stringify(s));});await page.reload();
const results=[];
for(const [width,height] of [[1024,768],[1280,600],[1280,720],[1366,768],[1440,800],[1440,900],[1536,864],[1920,1080]]){
 await page.setViewportSize({width,height});
 for(const name of ['battle','shop','raids']){
  await page.locator(`nav [data-page=${name}]`).click();await page.waitForTimeout(80);
  const result=await page.evaluate(()=>({height:document.documentElement.scrollHeight,width:document.documentElement.scrollWidth}));results.push({page:name,viewport:[width,height],...result});
  if(width===1280&&height===600)await page.screenshot({path:`/tmp/desktop-fit-${name}.png`});
 }
}
console.log(JSON.stringify(results));await browser.close();
if(results.some(r=>r.height>r.viewport[1]+1||r.width>r.viewport[0]))process.exitCode=1;
