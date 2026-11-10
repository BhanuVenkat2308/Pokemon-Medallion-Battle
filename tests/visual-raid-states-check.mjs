import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome'});
const page=await browser.newPage({reducedMotion:'reduce'});
page.setDefaultTimeout(15000);
const click=selector=>page.locator(selector+':visible').first().click();
const shot=name=>page.screenshot({path:'docs/visual-polish/after/'+name+'.png'});
async function seed(clear){
 await page.goto('http://127.0.0.1:5173');
 await page.evaluate(async clear=>{
  const {newSave}=await import('/tests/legacy-save.js');
  const {refreshRaids,beginRaid,selectRaid}=await import('/src/raids.js');
  const s=newSave();s.started=true;s.gym=11;s.rating=s.bestRating=6000;s.candy=2000;
  refreshRaids(s);
  if(clear){s.raid.stage=13;s.raid.damage=19999;}
  const attempt=beginRaid(s,()=>.5);
  attempt.battle.teams[0][0]={uid:'visual-player',species:clear?149:129,iv:31,powerKey:clear?'149-0':'129-0',used:false,powerUsed:true};
  attempt.battle.teams[1][0]={uid:'visual-rival',species:clear?129:149,iv:0,powerKey:clear?'129-0':'149-0',used:false,powerUsed:true};
  attempt.enemyPick=0;selectRaid(s,0);
  localStorage.setItem('pmb-save-v1',JSON.stringify(s));
 },clear);await page.reload();
}
try{
 for(const width of [390,1440]){
  await page.setViewportSize({width,height:width===390?844:900});
  await seed(false);
  await shot('raid-battle-'+width);
  await click('[data-action=commit]');await page.locator('[data-action=next-round]:not(:disabled)').waitFor();
  await click('[data-action=next-round]');
  await shot('raid-revive-'+width);
  await click('[data-action=raid-finish]');
  await shot('raid-defeat-'+width);
  await seed(true);
  await click('[data-action=commit]');await page.locator('[data-action=next-round]:not(:disabled)').waitFor();
  await click('[data-action=next-round]');
  assert.match(await page.locator('.result-modal').textContent(),/Raid Pack earned/);
  await shot('raid-victory-'+width);
  await click('.result-modal [data-page=raids]');
  await page.locator('.raid-inbox').scrollIntoViewIfNeeded();
  await shot('raid-inbox-ready-'+width);
  await click('[data-action=raid-pack]');
  await shot('raid-pack-rewards-'+width);
 }
 console.log('Raid battle, revive, defeat, stage-clear victory, inbox and claimed pack rendered on mobile and desktop.');
}finally{await browser.close();}
