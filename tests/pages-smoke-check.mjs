import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {completeWelcome} from './welcome-browser-helper.mjs';

const url=process.argv[2] || 'http://127.0.0.1:4173/Pokemon-Medallion-Battle/';
const browser=await chromium.launch({channel:'chrome'});
const checks=[];
try {
 for(const width of [1440,390]) {
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
  const page=await context.newPage(),errors=[],failures=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400)failures.push(`${r.status()} ${r.url()}`);});
  await page.goto(url,{waitUntil:'networkidle'});
  await page.locator('[data-action=starter][data-id="4"]').click();
  await completeWelcome(page);
  const saved=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('pmb-save-v1')));
  assert.equal((await saved()).collection.length,11);
  for(const name of ['battle','collection','pokedex','raids','shop']) {
   await page.locator(`nav [data-page=${name}]`).click();
   await page.waitForLoadState('networkidle');
   await page.waitForFunction(()=>[...document.images].filter(e=>e.loading!=='lazy').every(e=>e.complete),null,{timeout:15000});
   const broken=await page.locator('img').evaluateAll(es=>es.filter(e=>e.loading!=='lazy'&&(!e.complete||!e.naturalWidth)).map(e=>e.src));
   assert.deepEqual(broken,[],`${name} broken images`);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  }
  await page.locator('nav [data-page=shop]').click();
  await page.locator('[data-action=pack][data-kind=poke]').click();
  await page.locator('[data-action=close-modal]').first().click();
  assert.equal((await saved()).collection.length,16);
  await page.locator('nav [data-page=battle]').click();
  await page.screenshot({path:`/tmp/pages-tested-${width}.png`});
  await page.locator('[data-action=start][data-mode=practice]').click();
  let rounds=0;
  while(!await page.locator('.result-modal').count()) {
   assert.ok(++rounds<=15,'battle completes');
   await page.locator('[data-action=select]:not(:disabled)').first().click();
   await page.locator('[data-action=commit]').click();
   await page.locator('[data-action=next-round]').click({timeout:30000});
  }
  assert.equal((await saved()).played,1);
  await page.locator('[data-action=finish-battle]').click();
  const before=await saved();await page.reload();
  assert.equal((await saved()).played,before.played);
  assert.equal((await saved()).collection.length,before.collection.length);
  assert.deepEqual(errors,[]);assert.deepEqual(failures,[]);
  checks.push({width,rounds,pages:5,collection:before.collection.length,errors,failedRequests:failures});
  await context.close();
 }
 console.log(JSON.stringify({url,passed:true,checks}));
} finally {await browser.close();}
