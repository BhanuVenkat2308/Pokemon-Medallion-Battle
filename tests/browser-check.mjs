import {completeWelcome} from './welcome-browser-helper.mjs';
import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1050},reducedMotion:'reduce'});
const page=await context.newPage();
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const click=async selector=>page.locator(selector+':visible').first().click();
const saved=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('pmb-save-v1')));
await page.goto('http://127.0.0.1:5173');
await page.evaluate(async()=>{const {newSave}=await import('/tests/legacy-save.js');const s=newSave();s.started=true;localStorage.setItem('pmb-save-v1',JSON.stringify(s));});await page.reload();
await page.waitForFunction(()=>[...document.querySelectorAll('img')].every(i=>i.complete));
await page.screenshot({path:'/tmp/medallion-desktop.png',fullPage:true});
assert.ok(await page.locator('.type-icon').count()>0);
assert.ok(await page.locator('.type-icon').evaluateAll(images=>images.every(i=>i.complete&&i.naturalWidth>0)));
assert.ok(await page.locator('.team-row .med-power').allTextContents().then(names=>names.includes('Ember')));
assert.ok(await page.locator('.coin-type .type-icon').evaluateAll(images=>images.every(i=>{const r=i.getBoundingClientRect();return r.width>0&&r.width<=30&&r.height<=30;})));
const initial=await saved();assert.equal(initial.team.length,6);
// Team previews must match the tier/CP ordering used in raids.
const expectedTeamOrder=await page.evaluate(async()=>{
 const {compareBallTierCP}=await import('/src/engine.js');
 const s=JSON.parse(localStorage.getItem('pmb-save-v1'));
 return s.team.map(id=>s.collection.find(p=>p.uid===id)).sort(compareBallTierCP).map(p=>p.uid);
});
for(const name of ['battle','collection']){
 await click(`[data-action=nav][data-page=${name}]`);
 assert.deepEqual(await page.locator('.team-row .medallion').evaluateAll(nodes=>nodes.map(n=>n.dataset.id)),expectedTeamOrder);
}
assert.deepEqual((await saved()).team,initial.team);

await click('[data-action=nav][data-page=pokedex]');
assert.equal(await page.locator('.pokedex-entry').count(),await page.evaluate(async()=> (await import('/src/data.js')).POKEMON.length));
assert.equal(await page.locator('[data-species="172"]').count(),1);
await page.locator('[data-species="172"] img:not(.type-icon)').scrollIntoViewIfNeeded();
await page.waitForFunction(()=>{const img=document.querySelector('[data-species="172"] img:not(.type-icon)');return img?.complete&&img.naturalWidth>0;});
assert.ok(await page.locator('[data-species="4"]').evaluate(el=>el.classList.contains('discovered')));
assert.equal(await page.locator('[data-species="5"] img:not(.type-icon)').evaluate(el=>getComputedStyle(el).filter),'grayscale(1)');
await click('[data-action=nav][data-page=battle]');
await click('[data-action=daily]');await click('[data-action=close-modal]');
assert.equal((await saved()).collection.length,initial.collection.length+5);
assert.equal((await saved()).coins,initial.coins);
assert.equal((await saved()).candy,initial.candy);
assert.equal(await page.locator('[data-action=daily]').isDisabled(),true);
assert.match(await page.locator('[data-daily-countdown]').textContent(),/^\d{2}:\d{2}:\d{2}$/);
const clockBefore=await page.locator('[data-daily-countdown]').textContent();
await page.waitForFunction(before=>document.querySelector('[data-daily-countdown]').textContent!==before,clockBefore);

await click('[data-action=nav][data-page=shop]');
await click('[data-action=pack][data-kind=poke]');await click('[data-action=close-modal]');
assert.equal((await saved()).coins,initial.coins-200);
await click('[data-action=nav][data-page=collection]');
await page.locator('#search').fill('Charmander');
await page.locator('.collection-card [data-action=detail]').first().click();
assert.equal(await page.locator('.power-explainer h3').textContent(),'Ember');
assert.ok((await page.locator('.power-explainer').textContent()).includes('Grass'));
await click('[data-action=evolve]');await click('[data-action=close-modal]');
assert.ok((await saved()).collection.some(p=>p.species===5));
await click('[data-action=nav][data-page=pokedex]');
assert.equal(await page.locator('[data-species="5"] img:not(.type-icon)').evaluate(el=>getComputedStyle(el).filter),'none');
assert.ok(await page.locator('[data-species="4"]').evaluate(el=>el.classList.contains('discovered')));
await page.locator('#dex-search').fill('Charmeleon');
assert.equal(await page.locator('.pokedex-entry').count(),1);
await page.locator('#dex-search').fill('');
await click('[data-action=dex-status][data-status=missing]');
assert.equal(await page.locator('.pokedex-entry.discovered').count(),0);
await click('[data-action=dex-status][data-status=all]');
await page.screenshot({path:'/tmp/medallion-pokedex.png',fullPage:false});
await click('[data-action=nav][data-page=shop]');
await click('[data-action=claim-task][data-id=pack]');
assert.ok((await saved()).daily.claimed.includes('pack'));
await click('[data-action=nav][data-page=battle]');
await click('[data-action=start][data-mode=practice]');
await page.screenshot({path:'/tmp/medallion-battle.png',fullPage:true});
let rounds=0;
while(await page.locator('[data-action=select]:not(:disabled)').count()){
 if(++rounds>15)throw Error('Battle did not finish');
 await click('[data-action=select]:not(:disabled)');await click('[data-action=commit]');
 await page.locator('[data-action=next-round]').waitFor();await click('[data-action=next-round]');
 if(await page.locator('.result-modal').count())break;
}
assert.equal((await saved()).played,1);
await click('[data-action=finish-battle], .result-modal [data-action=nav][data-page=raids]');
await click('[data-action=nav][data-page=raids]');
await page.evaluate(()=>{const s=JSON.parse(localStorage.getItem('pmb-save-v1'));s.gym=11;s.rating=s.bestRating=6000;localStorage.setItem('pmb-save-v1',JSON.stringify(s));});await page.reload();await click('[data-action=nav][data-page=raids]');
await click('[data-action=start][data-mode=raid]');
assert.equal((await saved()).raid.passes,5);
await click('[data-action=select]:not(:disabled)');await click('[data-action=commit]');
await page.locator('[data-action=next-round]').waitFor();await click('[data-action=next-round]');
if(await page.locator('[data-action=raid-finish]').count())await click('[data-action=raid-finish]');
if(await page.locator('[data-action=finish-battle], .result-modal [data-action=nav][data-page=raids]').count())await click('[data-action=finish-battle], .result-modal [data-action=nav][data-page=raids]');
else {await click('[data-action=leave-battle]');await click('[data-action=confirm-leave]');if(await page.locator('[data-action=finish-battle], .result-modal [data-action=nav][data-page=raids]').count())await click('[data-action=finish-battle], .result-modal [data-action=nav][data-page=raids]');}
await click('[data-action=nav][data-page=battle]');
await page.reload();assert.equal((await saved()).daily.gift,true);
for(const width of [390,768,1440]){
 await page.setViewportSize({width,height:844});
 for(const name of ['battle','collection','pokedex','raids','shop']){
  await click(`[data-action=nav][data-page=${name}]`);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth);
  assert.equal(overflow,false,`${name} overflows at ${width}`);
 }
}
await page.setViewportSize({width:390,height:844});await click('[data-action=nav][data-page=battle]');
await page.screenshot({path:'/tmp/medallion-mobile.png',fullPage:true});
// Regression: an old Support Ivysaur must remain Support after evolution and reload.
await page.evaluate(async()=>{
 const {newSave}=await import('/tests/legacy-save.js');
 const s=newSave();s.started=true;s.gym=11;s.rating=6000;s.bestRating=6000;s.candy=10000;
 s.collection.push({uid:'legacy-ivysaur-check',species:2,iv:31});
 localStorage.setItem('pmb-save-v1',JSON.stringify(s));
});
await page.reload();
await click('[data-action=nav][data-page=collection]');
await page.locator('#search').fill('Ivysaur');
await page.locator('.collection-card [data-action=detail]').first().click();
assert.equal(await page.locator('.power-explainer h3').textContent(),'Leech Seed');
assert.ok((await page.locator('.evolution-preview').textContent()).includes('Venusaur: Leech Seed'));
await click('[data-action=evolve]');await click('[data-action=close-modal]');
await page.locator('#search').fill('Venusaur');
await page.locator('.collection-card [data-action=detail]').first().click();
assert.equal(await page.locator('.power-explainer h3').textContent(),'Leech Seed');
assert.ok((await page.locator('.power-explainer').textContent()).includes('gain 100 CP'));
assert.equal(await page.locator('.detail-medallion .target-badge').count(),0);
assert.equal(await page.locator('.detail-medallion .power-icon').count(),1);
await page.screenshot({path:'/tmp/medallion-support-evolution.png',fullPage:false});
await page.reload();
const evolved=(await saved()).collection.find(p=>p.uid==='legacy-ivysaur-check');
assert.equal(evolved.species,3);assert.equal(evolved.powerKey,'legacy-2');assert.equal(evolved.iv,31);
// Completed ranked matches must settle even when navigation precedes View results.
await click('[data-action=nav][data-page=battle]');
const beforeRanked=await saved();
await click('[data-action=start][data-mode=ranked]');
for(let turn=0;turn<16;turn++){
 await click('[data-action=select]:not(:disabled)');await click('[data-action=commit]');
 await page.locator('[data-action=next-round]').waitFor();
 if((await page.locator('[data-action=next-round]').textContent()).includes('View results'))break;
 assert.ok(turn<15,'Ranked battle did not finish');
 await click('[data-action=next-round]');
}
const playerWon=await page.locator('.combatant.bottom .score-pips .filled').count()===3;
await click('[data-action=nav][data-page=battle]');
assert.equal(await page.locator('.result-modal').count(),1);
const settled=await saved();
assert.equal(settled.played,beforeRanked.played+1);
assert.equal(settled.rating,playerWon?beforeRanked.rating+60:Math.max(6000,beforeRanked.rating-25));
assert.ok(settled.coins>beforeRanked.coins);
await click('[data-action=finish-battle], .result-modal [data-action=nav][data-page=raids]');
assert.equal((await saved()).coins,settled.coins);
// Replacing the adventure during the reveal timer must not lock a later battle.
await click('[data-action=nav][data-page=battle]');
await click('[data-action=start][data-mode=practice]');
await click('[data-action=select]:not(:disabled)');
await page.evaluate(()=>{
 const fire=selector=>document.querySelector(selector).click();
 fire('[data-action=commit]');fire('[data-action=settings]');
 fire('[data-action=reset-confirm]');fire('[data-action=reset]');
 fire('[data-action=starter][data-id="4"]');
});
await completeWelcome(page);
await click('[data-action=nav][data-page=battle]');
await click('[data-action=start][data-mode=practice]');
await click('[data-action=select]:not(:disabled)');
await click('[data-action=commit]');
await page.locator('[data-action=next-round]').waitFor();
await click('[data-action=leave-battle]');await click('[data-action=confirm-leave]');
// Expanded roster: dual badges, artwork and newest-gym pack guarantee.
await page.evaluate(async()=>{
 const {newSave,createMedallion}=await import('/tests/legacy-save.js');
 const s=newSave();s.started=true;s.gym=10;s.rating=s.bestRating=5000;s.coins=10000;
 s.collection.push({...createMedallion(658,31),powerKey:'658-0'});
 localStorage.setItem('pmb-save-v1',JSON.stringify(s));
});
await page.reload();
await click('[data-action=nav][data-page=collection]');
await page.locator('#search').fill('Greninja');
await page.locator('.collection-card [data-action=detail]').first().click();
assert.equal(await page.locator('.detail-medallion .target-badge').count(),1);
assert.equal(await page.locator('.detail-medallion .power-dot').count(),1);
assert.match(await page.locator('.power-explainer').textContent(),/Reveals 1/);
await page.waitForFunction(()=>document.querySelector('.detail-medallion .coin>img')?.naturalWidth>0);
await page.screenshot({path:'/tmp/medallion-new-gym-pokemon.png',fullPage:false});
await click('[data-action=close-modal]');
await click('[data-action=nav][data-page=shop]');
assert.match(await page.locator('.shop-guide').textContent(),/One slot guarantees your newest Gym/);
const beforeGymPack=(await saved()).collection.length;
await click('[data-action=pack][data-kind=poke]');
assert.equal(await page.evaluate(async()=>{const {DEX}=await import('/src/data.js');const s=JSON.parse(localStorage.getItem('pmb-save-v1'));return DEX[s.collection.at(-1).species].gym;}),10);
assert.equal((await saved()).collection.length,beforeGymPack+5);
assert.deepEqual(errors,[]);
console.log(JSON.stringify({passed:true,rounds,viewports:[390,768,1440],pageErrors:errors,collection:(await saved()).collection.length}));
await browser.close();
