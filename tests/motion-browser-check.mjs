import {completeWelcome} from './welcome-browser-helper.mjs';
import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'no-preference'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:5173');
 await page.evaluate(async()=>{const {newSave}=await import('/tests/legacy-save.js');const s=newSave();s.started=true;localStorage.setItem('pmb-save-v1',JSON.stringify(s));});await page.reload();
 await page.locator('nav [data-page=battle]').click();await page.locator('[data-action=start][data-mode=practice]').click();
 await page.locator('[data-action=select]').first().click();await page.locator('[data-action=commit]').click();
 await page.locator('.battle-motion').waitFor();
 assert.equal(await page.locator('[data-action=next-round]').isDisabled(),true);
 assert.equal(await page.locator('.motion-side-0 .medallion').isVisible(),true);
 assert.equal(await page.locator('.motion-front').isVisible(),false);
 assert.equal(await page.locator('.motion-back').isVisible(),true);
 await page.locator('.motion-skip').click();
 await page.locator('.battle-motion').waitFor({state:'detached'});
 assert.equal(await page.locator('[data-action=next-round]').isEnabled(),true);
 // Exercise all visual categories from real resolved rounds without writing the save.
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:width===390?844:1000});
  for(const [id,key,foe] of [[1,'1-0',131],[657,'657-0',4],[11,'11-0',143],[2,'2-1',143],[95,'95-0',143],[131,'131-0',129],[8,'8-1',135],[135,'135-0',16]]){
   await page.evaluate(async({id,key,foe})=>{
    const {makeBattle,resolveRound,cpOf}=await import('/src/engine.js');const {playBattleMotion,battleCues}=await import('/src/battle-motion.js');const {DEX,ART}=await import('/src/data.js');
    const mon=(species,powerKey)=>({uid:crypto.randomUUID(),species,powerKey,iv:0});
    const mons=[mon(id,key),mon(foe,`${foe}-0`)];const b=makeBattle([mons[0],mon(16,'16-0')],[mons[1],mon(21,'21-0')]);
    if(id===8){b.fields[0]={entry:[{name:'Spikes',amount:200,turns:3}],support:[{name:'Leech Seed',amount:50,turns:2}]};b.fields[1]={entry:[{name:'Spikes',amount:100,turns:3}],support:[]};}
    const result=resolveRound(b,[0,0],()=>0);const before=JSON.stringify({b,result});
    const board=document.querySelector('.battle-board');
    const html=mons.map(m=>`<button class="medallion"><span class="coin tier-${DEX[m.species].tier}"><span class="coin-inner"></span><img src="${ART(m.species)}" alt="${DEX[m.species].name}"><span class="coin-cp"><small>CP</small><strong>${cpOf(m)}</strong></span></span><span class="med-name">${DEX[m.species].name}</span></button>`);
    window.cueTrace=[];window.expectedCues=battleCues(result,mons).filter(c=>c.phase!=='order').map(c=>c.name);let previous='';
    const watcher=new MutationObserver(()=>{const active=board.querySelectorAll('.motion-active');if(active.length>1)throw Error('Overlapping powers');const banner=board.querySelector('.motion-banner');const name=banner&&!banner.classList.contains('motion-banner-exit')?banner.querySelector('b')?.textContent||'':'';if(name&&name!==previous)window.cueTrace.push({name,time:performance.now()});previous=name;});watcher.observe(board,{subtree:true,childList:true,attributes:true});
    window.motionTest=playBattleMotion(board,{result,mons,initialCP:mons.map(cpOf),medallions:html,isCurrent:()=>true}).then(()=>{watcher.disconnect();if(JSON.stringify({b,result})!==before)throw Error('Animation mutated battle');});
   },{id,key,foe});
   if(id===657||id===8){
    await page.locator('.motion-back').waitFor({state:'visible'});
    await page.screenshot({path:`/tmp/medallion-flip-${width}.png`,fullPage:false});
    await page.locator('.motion-front').waitFor({state:'visible'});
    await page.locator('.motion-banner:not(:empty)').waitFor();await page.screenshot({path:`/tmp/medallion-motion-${id}-${width}.png`,fullPage:false});}
   await page.evaluate(()=>window.motionTest);
   const trace=await page.evaluate(()=>({cues:window.cueTrace,expected:window.expectedCues}));
   assert.deepEqual(trace.cues.map(c=>c.name),trace.expected);
   for(let i=1;i<trace.cues.length;i++)assert.ok(trace.cues[i].time-trace.cues[i-1].time>=1450,'Power cues must complete their exit and gap before the next starts');
   assert.equal(await page.locator('.battle-motion').count(),0);
   assert.equal(await page.locator('.motion-playing').count(),0);
  }
 }
 // Actual Gym UI: the higher-RP CPU leads, its pick stays hidden, and our own pick stays visible.
 await page.evaluate(async()=>{const {newSave}=await import('/tests/legacy-save.js');const s=newSave();s.started=true;s.gym=2;s.rating=s.bestRating=1450;localStorage.setItem('pmb-save-v1',JSON.stringify(s));});
 await page.reload();await page.evaluate(()=>{window.originalRandom=Math.random;Math.random=()=>.99;});
 await page.locator('[data-action=nav][data-page=battle]:visible').first().click();
 await page.locator('[data-action=start][data-mode=ranked]').click();
 await page.evaluate(()=>{Math.random=window.originalRandom;});
 assert.match(await page.locator('.combatant.top small').textContent(),/1,548 Rating/);
 assert.match(await page.locator('.battle-status h3').textContent(),/rival has committed/);
 assert.match(await page.locator('.enemy-slot').getAttribute('aria-label'),/face-down/);
 assert.equal(await page.locator('.enemy-slot img').count(),0);
 await page.locator('[data-action=select]').first().click();
 assert.equal(await page.locator('.arena-slot.occupied img').isVisible(),true);
 assert.equal(await page.locator('.enemy-slot img').count(),0);
 await page.locator('[data-action=commit]').click();await page.locator('.motion-back').waitFor({state:'visible'});
 assert.equal(await page.locator('.motion-front').isVisible(),false);
 await page.locator('.motion-skip').click();await page.locator('.battle-motion').waitFor({state:'detached'});
 // Reset during active motion, then complete another reveal: stale timers cannot lock the new battle.
 const click=selector=>page.locator(selector+':visible').first().click();
 const reset=async()=>{await click('[data-action=settings]');await click('[data-action=reset-confirm]');await click('[data-action=reset]');await click('[data-action=starter][data-id="4"]');await completeWelcome(page);};
 const commit=async()=>{await click('[data-action=nav][data-page=battle]');await click('[data-action=start][data-mode=practice]');await click('[data-action=select]');await click('[data-action=commit]');await page.locator('.battle-motion').waitFor();};
 await reset();await commit();await reset();await commit();
 await page.locator('.motion-skip').click();await page.locator('.battle-motion').waitFor({state:'detached'});
 assert.equal(await page.locator('[data-action=next-round]').isEnabled(),true);
 assert.deepEqual(errors,[]);
 console.log(JSON.stringify({passed:true,viewports:[1440,390],categories:['effective','reveal','protect','support','entry','arena','clearance','priority'],skip:true,unchangedResults:true,pageErrors:errors}));
}finally{await browser.close();}
