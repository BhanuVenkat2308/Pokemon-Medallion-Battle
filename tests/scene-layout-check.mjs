import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({reducedMotion:'reduce'});
const page=await context.newPage(),errors=[];
page.on('pageerror',e=>errors.push(e.message));
const nav=async name=>page.locator(`nav [data-page=${name}]`).click();
async function seed(unlocked=true,passes=6){
 await page.goto('http://127.0.0.1:5173');
 await page.evaluate(async({unlocked,passes})=>{
  const {newSave}=await import('/tests/legacy-save.js');
  const {refreshRaids}=await import('/src/raids.js');
  const s=newSave();s.started=true;s.coins=12000;s.candy=4000;
  if(unlocked){s.gym=11;s.rating=s.bestRating=6000;refreshRaids(s);s.raid.passes=passes;s.raid.updated=Date.now();}
  localStorage.setItem('pmb-save-v1',JSON.stringify(s));
 },{unlocked,passes});await page.reload();
}
try{
 await seed();
 for(const [width,height]of[[320,568],[375,667],[390,844],[430,740],[430,932],[768,1024],[1280,720],[1440,900],[1920,1080]]){
  await page.setViewportSize({width,height});let teamY;
  for(const name of ['battle','raids']){
   await nav(name);
   assert.equal(await page.locator('.scene-team .medallion').count(),6);
   const metrics=await page.evaluate(()=>{
    const cards=[...document.querySelectorAll('.scene-team .medallion')].map(n=>n.getBoundingClientRect());
    const button=document.querySelector('.scene-battle').getBoundingClientRect();
    return {overflow:document.documentElement.scrollWidth>innerWidth,ys:cards.map(r=>r.y),teamBottom:Math.max(...cards.map(r=>r.bottom)),buttonTop:button.top,buttonBottom:button.bottom,navTop:document.querySelector('.sidebar').getBoundingClientRect().top};
   });
   assert.equal(metrics.overflow,false,`${name} overflow ${width}`);
   assert.ok(Math.max(...metrics.ys)-Math.min(...metrics.ys)<1,'Six cards stay on one row');
   assert.ok(metrics.buttonTop>=metrics.teamBottom,'Battle button follows the team');
   assert.ok(metrics.buttonBottom<=metrics.navTop,'Battle button stays above navigation');
   if(name==='battle')teamY=metrics.ys[0];else assert.ok(Math.abs(teamY-metrics.ys[0])<2,`Gym and raid teams align at ${width}: ${teamY} vs ${metrics.ys[0]}`);
   const images=await page.locator('.scene-team .coin > img').evaluateAll(es=>es.map(e=>e.getAttribute('src')));
   assert.ok(images.every(src=>src.startsWith('/pokemon/')),'Existing Pokémon image files are retained');
   if([390,1440].includes(width))await page.screenshot({path:`/tmp/approved-${name}-${width}.png`});
  }
 }
 await page.setViewportSize({width:390,height:844});await nav('raids');
 await page.locator('.scene-actions a[href="#raid-details"]').click();
 assert.ok(await page.locator('#raid-details').isVisible());
 assert.equal(await page.locator('.trail-stop').count(),11);
 await nav('battle');await page.locator('[data-action=daily]').click();
 await page.locator('[data-action=close-modal]').first().click();
 assert.equal(await page.locator('[data-action=daily]').isDisabled(),true);
 await seed(true,0);await nav('raids');assert.equal(await page.locator('.scene-battle').isDisabled(),true);
 await seed(false);await nav('raids');assert.equal(await page.locator('.scene-lock-message').count(),1);
 assert.equal(await page.locator('.scene-battle').getAttribute('data-mode'),'ranked');
 await page.screenshot({path:'/tmp/approved-raids-locked.png'});
 assert.deepEqual(errors,[]);
 console.log('Scene layout passed: 18 viewport/page combinations, aligned decks, unchanged image paths, controls, daily claim, locked raids, exhausted passes, rewards and Gym journey.');
}finally{await browser.close();}
