import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 for(const width of [1440,390]){
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  const click=action=>page.locator(`[data-action=${action}]`).first().click();
  const saved=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('pmb-save-v1')));
  await page.goto('http://127.0.0.1:5173');
  await page.locator('[data-action=starter][data-id="4"]').click();
  assert.equal((await saved()).collection.length,1);
  await page.reload();await page.locator('[data-action=welcome-open]').waitFor();
  await page.screenshot({path:`/tmp/medallion-welcome-pack-${width}.png`});
  for(let i=0;i<2;i++){
   await click('welcome-open');assert.equal(await page.locator('.reward-medallions .medallion').count(),5);
   const before=await saved();assert.equal(before.collection.length,1+(i+1)*5);
   await page.reload();await page.locator('[data-action=welcome-next]').waitFor();
   assert.deepEqual((await saved()).collection,before.collection);
   await page.keyboard.press('Escape');assert.equal(await page.locator('[data-action=welcome-next]').count(),1);
   await click('welcome-next');
  }
  assert.equal(new Set((await saved()).collection.map(p=>p.species)).size,11);
  assert.equal((await saved()).coins,650);assert.equal((await saved()).candy,400);
  assert.ok(await page.locator('[data-action=welcome-finish]').isDisabled());
  for(let i=0;i<3;i++)await page.locator('[data-action=welcome-toggle]').nth(i).click();
  const partial=(await saved()).team;await page.reload();await page.locator('[data-action=welcome-toggle]').first().waitFor();
  assert.deepEqual((await saved()).team,partial);
  for(let i=3;i<6;i++)await page.locator('[data-action=welcome-toggle]').nth(i).click();
  await page.screenshot({path:`/tmp/medallion-welcome-team-${width}.png`});
  assert.equal(await page.locator('.modal').evaluate(el=>el.scrollWidth>el.clientWidth),false);
  await click('welcome-finish');assert.equal((await saved()).welcome,null);
  await page.reload();assert.equal(await page.locator('.welcome-flow').count(),0);
  await page.locator('[data-action=start][data-mode=ranked]').click();
  await page.locator('[data-action=select]').first().click();await click('commit');await page.locator('[data-action=next-round]').waitFor();
  assert.deepEqual(errors,[]);await context.close();
 }
 console.log(JSON.stringify({passed:true,viewports:[1440,390],reloads:'starter, both pack reveals, partial team, completed onboarding',firstBattle:true}));
}finally{await browser.close();}
