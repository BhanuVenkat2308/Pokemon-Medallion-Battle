import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
const nav=async name=>page.locator(`nav [data-page=${name}]`).click();
try{
 await page.goto('http://127.0.0.1:5173');
 await page.evaluate(async()=>{const {newSave}=await import('/tests/legacy-save.js');const s=newSave();s.started=true;s.gym=5;s.rating=s.bestRating=2500;s.raid={version:2,unlockedAt:Date.now(),week:0,stage:1,damage:0,passes:6,updated:Date.now(),inbox:[],claimed:[],cleared:[],active:null};localStorage.setItem('pmb-save-v1',JSON.stringify(s));});await page.reload();
 assert.deepEqual(await page.locator('nav .nav-item').evaluateAll(nodes=>nodes.map(n=>n.dataset.page)),['battle','collection','pokedex','raids','shop']);
 for(const [width,height] of [[1440,900],[1366,768],[1280,720],[1536,864]]){
  await page.setViewportSize({width,height});await nav('battle');
  const dimensions=await page.evaluate(()=>({h:document.documentElement.scrollHeight,w:document.documentElement.scrollWidth,innerHeight,innerWidth}));
  console.log('Battle fit',width,height,dimensions);if(dimensions.h>height+2){await page.screenshot({path:'/tmp/hub-overflow.png',fullPage:true});console.log(await page.locator('.battle-hub,.hub-heading,.battle-hub-grid,.arena-feature,.discovery-feature,.squad-feature,.trainer-strip').evaluateAll(nodes=>nodes.map(n=>({class:n.className,height:n.getBoundingClientRect().height,top:n.getBoundingClientRect().top}))));}assert.ok(dimensions.h<=height+2,`Battle requires vertical scroll at ${width}×${height}`);assert.ok(dimensions.w<=width);
  const teamBottom = await page.locator('.squad-feature .medallion').evaluateAll(items =>
    Math.max(...items.map(item => item.getBoundingClientRect().bottom)));
  const cardBottom = await page.locator('.squad-feature').evaluate(el => el.getBoundingClientRect().bottom);
  assert.ok(teamBottom + 4 <= cardBottom, 'The team must fit inside its card');
  for(const selector of ['.arena-feature','.squad-feature','.discovery-feature','.practice-feature'])assert.equal(await page.locator(selector).isVisible(),true);
 }
 await page.setViewportSize({width:1440,height:900});await nav('battle');await page.screenshot({path:'/tmp/medallion-new-battle.png',fullPage:false});
 await nav('raids');assert.equal(await page.locator('.trail-stop').count(),11);assert.equal(await page.locator('.raid-hero + .gym-trail').count(),1);await page.screenshot({path:'/tmp/medallion-new-raids.png',fullPage:false});
 await nav('shop');assert.equal(await page.locator('[data-action=claim-task]').count(),4);assert.equal(await page.locator('[data-action=pack]').count(),2);await page.screenshot({path:'/tmp/medallion-new-shop.png',fullPage:false});
 await page.locator('[data-action=pack][data-kind=poke]').click();await page.locator('[data-action=close-modal]').first().click();await page.locator('[data-action=claim-task][data-id=pack]').click();assert.equal(await page.locator('[data-action=claim-task][data-id=pack]').textContent(),'Claimed');
 await page.locator('[data-action=daily]').click();await page.locator('[data-action=close-modal]').first().click();assert.equal(await page.locator('[data-action=daily]').isDisabled(),true);await nav('battle');assert.equal(await page.locator('[data-action=daily]').isDisabled(),true);
 for(const width of [390,768]){await page.setViewportSize({width,height:844});for(const name of ['battle','collection','pokedex','raids','shop']){await nav(name);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${name} overflow ${width}`);assert.equal(await page.locator('nav .nav-item:visible').count(),5);if(width===390&&['battle','raids','shop'].includes(name))await page.screenshot({path:`/tmp/medallion-new-${name}-mobile.png`,fullPage:false});}}
 assert.deepEqual(errors,[]);console.log('Five-section hubs passed: navigation, desktop fit, mobile overflow, pack purchases, task claims, shared daily state.');
}finally{await browser.close();}
