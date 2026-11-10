import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
page.on('dialog',dialog=>dialog.accept());
const click=selector=>page.locator(selector).filter({visible:true}).first().click();
const saved=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('pmb-save-v1')));
try{
 await page.goto('http://127.0.0.1:5173');
 await page.evaluate(async()=>{const {newSave}=await import('/tests/legacy-save.js');const s=newSave();s.started=true;localStorage.setItem('pmb-save-v1',JSON.stringify(s));});await page.reload();
 await click('[data-action=nav][data-page=raids]');assert.equal(await page.locator('.raid-locked').count(),1);assert.equal(await page.locator('[data-mode=raid]').count(),0);
 await page.evaluate(()=>{const s=JSON.parse(localStorage.getItem('pmb-save-v1'));s.gym=11;s.rating=s.bestRating=6000;localStorage.setItem('pmb-save-v1',JSON.stringify(s));});await page.reload();await click('[data-action=nav][data-page=raids]');
 assert.match(await page.locator('h1').textContent(),/Molten/);assert.match(await page.locator('.raid-hp').textContent(),/1,000/);
 await page.waitForFunction(()=>[...document.querySelectorAll('.raid-hero img,.raid-pool img')].every(i=>i.complete&&i.naturalWidth));
 await page.screenshot({path:'/tmp/medallion-raids-desktop.png',fullPage:true});
 const clockBefore=await page.locator('[data-raid-countdown]').textContent();await page.waitForFunction(before=>document.querySelector('[data-raid-countdown]').textContent!==before,clockBefore);
 await click('[data-mode=raid]');const initial=await saved();assert.equal(initial.raid.passes,5);assert.equal(await page.locator('.hidden-medallion').count(),6);
 await click('[data-action=select]:not(:disabled)');const selected=(await saved()).raid.active.selected;
 await page.reload();assert.equal((await saved()).raid.active.selected,selected);assert.deepEqual((await saved()).raid.active.battle.teams[1],initial.raid.active.battle.teams[1]);assert.equal((await saved()).raid.passes,5);
 await click('[data-action=commit]');await page.locator('[data-action=next-round]:not(:disabled)').waitFor();const result=await saved();await page.reload();assert.equal((await saved()).raid.passes,5);assert.deepEqual((await saved()).raid.active.lastResult,result.raid.active.lastResult);assert.equal((await saved()).raid.damage,result.raid.damage);
 // Protect can hand the player the lead: choose the CPU exactly once for animation and result.
 await page.evaluate(async()=>{
  const {finishRaid,beginRaid,selectRaid}=await import('/src/raids.js');const s=JSON.parse(localStorage.getItem('pmb-save-v1'));finishRaid(s,{abandon:true});s.raid.stage=8;s.raid.damage=0;
  const a=beginRaid(s,()=>.5);a.battle.first=0;a.enemyPick=null;for(const t of a.battle.teams)for(const p of t)p.powerUsed=true;selectRaid(s,0);localStorage.setItem('pmb-save-v1',JSON.stringify(s));
 });await page.reload();
 await page.evaluate(()=>{window.raidOriginalRandom=Math.random;window.raidRandomCalls=0;Math.random=()=>{window.raidRandomCalls++;return .5;};});
 await click('[data-action=commit]');await page.locator('[data-action=next-round]:not(:disabled)').waitFor();
 assert.equal(await page.evaluate(()=>window.raidRandomCalls),1,'CPU selection must not reroll between animation and resolution');
 await page.evaluate(()=>{Math.random=window.raidOriginalRandom;});
 // Seed an isolated near-clear attempt with a guaranteed winning matchup to verify UI settlement.
 await page.evaluate(async()=>{
  const {DEX}=await import('/src/data.js');const {beginRaid,refreshRaids,selectRaid,finishRaid}=await import('/src/raids.js');
  const s=JSON.parse(localStorage.getItem('pmb-save-v1'));finishRaid(s,{abandon:true});refreshRaids(s);s.raid.stage=13;s.raid.damage=19999;
  const a=beginRaid(s,()=>.5);a.battle.teams[0][0]={uid:'browser-winner',species:149,iv:31,powerKey:'149-0',used:false,powerUsed:true};
  a.battle.teams[1][0]={uid:'browser-loser',species:129,iv:0,powerKey:'129-0',used:false,powerUsed:true};a.enemyPick=0;selectRaid(s,0);localStorage.setItem('pmb-save-v1',JSON.stringify(s));
 });await page.reload();
 await click('[data-action=commit]');await page.locator('[data-action=next-round]:not(:disabled)').waitFor();
 const cleared=await saved();assert.equal(cleared.raid.stage,14);assert.equal(cleared.raid.damage,0);assert.equal(cleared.raid.inbox.length,1);assert.ok(cleared.raid.inbox[0].cards.every(p=>p.iv>=26));
 await page.reload();await click('[data-action=next-round]');assert.match(await page.locator('.result-modal').textContent(),/Raid Pack earned/);assert.equal((await saved()).raid.active,null);
 await click('.result-modal [data-page=raids]');assert.equal(await page.locator('[data-action=raid-pack]').count(),1);assert.match(await page.locator('.raid-inbox').textContent(),/15% Shiny/);
 const pack=(await saved()).raid.inbox[0],before=(await saved()).collection.length;
 await click('[data-action=raid-pack]');assert.equal((await saved()).collection.length,before+5);assert.deepEqual((await saved()).collection.slice(-5),pack.cards);assert.equal((await saved()).raid.inbox.length,0);await click('[data-action=close-modal]');
 // Weekly expiration rotates the page, while claimed progress and rewards remain.
 await page.evaluate(()=>{const s=JSON.parse(localStorage.getItem('pmb-save-v1'));s.raid.unlockedAt=Date.now()-7*86400000;s.raid.updated=Date.now();localStorage.setItem('pmb-save-v1',JSON.stringify(s));});await page.reload();await click('[data-action=nav][data-page=raids]');assert.match(await page.locator('h1').textContent(),/Shuttered/);assert.equal((await saved()).raid.stage,1);
 for(const width of [390,768,1440]){await page.setViewportSize({width,height:900});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`Raid overflow ${width}`);}
 await page.setViewportSize({width:390,height:844});assert.equal(await page.locator('.game-shell').count(),1);await page.screenshot({path:'/tmp/medallion-raids-mobile.png',fullPage:false});
 assert.deepEqual(errors,[]);console.log('Raid browser checks passed: lock/unlock, countdown, resume, saved results, stage 13 clear, inbox claim, rollover, desktop/mobile.');
}finally{await browser.close();}
