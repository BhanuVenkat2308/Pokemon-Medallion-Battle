import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({reducedMotion:'reduce'});
try {
 await page.goto('http://127.0.0.1:5173');
 await page.evaluate(async()=>{const {newSave}=await import('/tests/legacy-save.js');const s=newSave();s.started=true;s.gym=11;s.rating=s.bestRating=6000;localStorage.setItem('pmb-save-v1',JSON.stringify(s));});await page.reload();
 const native={};
 for(const width of [480,1440,1920,768,430,390,375,320]) {
  await page.setViewportSize({width,height:900});
  for(const name of ['battle','collection','pokedex','raids','shop']) {
   await page.locator(`nav [data-page=${name}]`).click();
   const m=await page.evaluate(()=>{
    const app=document.querySelector('#app').getBoundingClientRect(),nav=document.querySelector('.sidebar').getBoundingClientRect();
    const grid=document.querySelector('.collection-grid,.pokedex-grid,.shop-hub-grid,.scene-team .team-row');
    return {appWidth:app.width,appLeft:app.left,navWidth:nav.width,navLeft:nav.left,overflow:document.documentElement.scrollWidth>innerWidth,grid:grid?getComputedStyle(grid).gridTemplateColumns:null};
   });
   assert.equal(m.appWidth,Math.min(width,480));assert.equal(m.navWidth,m.appWidth);assert.ok(Math.abs(m.navLeft-m.appLeft)<1);assert.equal(m.overflow,false,`${name} overflow ${width}`);
   if(width===480)native[name]=m.grid;
   if(width>480)assert.equal(m.grid,native[name],`${name} must use the same mobile grid on desktop`);
   if([390,1440].includes(width))await page.screenshot({path:`/tmp/mobile-shell-${name}-${width}.png`});
  }
 }
 await page.setViewportSize({width:1440,height:900});
 await page.locator('.topbar [data-action=settings]').first().click();
 const r=await page.locator('.modal').boundingBox();assert.ok(r.width<=460);assert.ok(Math.abs(r.x+r.width/2-720)<1);
 await page.screenshot({path:'/tmp/mobile-shell-settings-desktop.png'});
 console.log('40 page/viewport checks passed: shared canvas, bottom navigation, mobile grids, no horizontal overflow, and centered dialogs.');
} finally {await browser.close();}
