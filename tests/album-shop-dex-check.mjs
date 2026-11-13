import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});const page=await browser.newPage({reducedMotion:'reduce'});
const nav=async name=>page.locator(`nav [data-page=${name}]`).click();
const errors=[];page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto('http://127.0.0.1:5173');
 await page.evaluate(async()=>{const {newSave}=await import('/tests/legacy-save.js');const s=newSave();s.started=true;s.coins=5000;s.candy=2000;localStorage.setItem('pmb-save-v1',JSON.stringify(s));});await page.reload();
 for(const width of [320,375,390,430,480,1440]){
  await page.setViewportSize({width,height:900});
  for(const name of ['collection','shop','pokedex']){
   await nav(name);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${name} horizontal overflow ${width}`);
   if(name==='collection'){
    const ys=await page.locator('.team-editor .medallion').evaluateAll(es=>es.map(e=>e.getBoundingClientRect().y));assert.equal(ys.length,6);assert.ok(Math.max(...ys)-Math.min(...ys)<1,'Collection team has one row');
   }
   if(name!=='shop'){
    const selector=name==='collection'?'.collection-grid':'.pokedex-grid';
    assert.equal(await page.locator(selector).evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length),4);
   }else{
    const [a,b]=await page.locator('.pack-counter,.research-counter').evaluateAll(es=>es.map(e=>e.getBoundingClientRect().width));assert.ok(Math.abs(a-b)<1,'Pack and task panels have matching widths');
   }
   if([390,1440].includes(width))await page.screenshot({path:`/tmp/approved-${name}-${width}.png`});
  }
 }
 await page.setViewportSize({width:390,height:844});await nav('collection');
 await page.locator('#search').fill('Charmander');assert.equal(await page.locator('.collection-card').count(),1);
 await page.locator('.collection-card .medallion').click();assert.equal(await page.locator('.modal').count(),1);await page.locator('[data-action=close-modal]').first().click();
 await page.locator('#search').fill('no-match-pokemon');assert.equal(await page.locator('.empty-state').count(),1);await page.locator('[data-action=clear-filter]').click();
 await page.locator('.team-editor .medallion').first().click();assert.equal(await page.locator('.swap-grid').count(),1);await page.locator('[data-action=close-modal]').first().click();
 await nav('pokedex');await page.locator('[data-status=missing]').click();assert.equal(await page.locator('.pokedex-entry.discovered').count(),0);
 const filter=await page.locator('.pokedex-entry.undiscovered img').first().evaluate(e=>getComputedStyle(e).filter);assert.match(filter,/grayscale\(1\)/);
 await page.locator('[data-status=found]').click();assert.equal(await page.locator('.pokedex-entry.undiscovered').count(),0);
 await nav('shop');await page.locator('[data-action=pack][data-kind=poke]').click();await page.locator('[data-action=close-modal]').first().click();
 const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('pmb-save-v1')).coins);
 await page.locator('[data-action=claim-task][data-id=pack]').click();assert.equal(await page.locator('[data-action=claim-task][data-id=pack]').isDisabled(),true);
 const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('pmb-save-v1')).coins);assert.equal(after-before,80);
 await page.locator('[data-action=daily]').click();await page.locator('[data-action=close-modal]').first().click();assert.equal(await page.locator('[data-action=daily]').isDisabled(),true);
 await page.locator('.shop-guide > summary').click();assert.equal(await page.locator('.shop-guide').getAttribute('open'),'');
 assert.deepEqual(errors,[]);console.log('Approved album/shop/dex passed: 18 layouts, six-card team row, four-column grids, panel widths, search, detail, team picker, discovery filters, grey artwork, purchases, single claim, daily pack and odds.');
}finally{await browser.close();}
