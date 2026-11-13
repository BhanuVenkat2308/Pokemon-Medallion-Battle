import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});const page=await browser.newPage({reducedMotion:'reduce'});
try {
 await page.goto('http://127.0.0.1:5173');await page.evaluate(async()=>{const {newSave}=await import('/tests/legacy-save.js');const s=newSave();s.started=true;s.gym=6;s.rating=s.bestRating=2985;s.daily.gift=true;localStorage.setItem('pmb-save-v1',JSON.stringify(s));});await page.reload();
 for(const [width,height] of [[320,568],[375,667],[390,844],[430,740],[1440,900]]){
  await page.setViewportSize({width,height});
  const sizes=await page.locator('.topbar,.compact-gym-title,.compact-discovery').evaluateAll(es=>es.map(e=>e.getBoundingClientRect().height));assert.deepEqual(sizes,[48,44,36]);
  assert.equal(await page.locator('.compact-gym-title h1').textContent(),'Shadowmoss Shrine');
  assert.equal(await page.locator('.compact-gym-progress [role=progressbar]').getAttribute('aria-valuenow'),'96');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  assert.equal(await page.locator('.scene-claim').isDisabled(),true);
  const bounds=await page.locator('.compact-discovery .daily-clock,.compact-discovery .scene-claim').evaluateAll(es=>es.map(e=>({left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right})));
  assert.ok(bounds[0].right<=bounds[1].left,'Clock and claim status do not overlap');
  await page.screenshot({path:`/tmp/compact-header-${width}.png`});
 }
 await page.evaluate(()=>{const s=JSON.parse(localStorage.getItem('pmb-save-v1'));s.daily.gift=false;localStorage.setItem('pmb-save-v1',JSON.stringify(s));});await page.reload();
 assert.equal(await page.locator('.daily-ready').textContent(),'Daily pack ready');await page.locator('.scene-claim').click();await page.locator('[data-action=close-modal]').first().click();assert.equal(await page.locator('.scene-claim').isDisabled(),true);assert.equal(await page.locator('[data-daily-countdown]').count(),1);
 console.log('Compact header passed: exact 128px header, long Gym name, RP progress, claimed timer, ready-to-claimed transition, and no overlaps across five viewport sizes.');
}finally{await browser.close();}
