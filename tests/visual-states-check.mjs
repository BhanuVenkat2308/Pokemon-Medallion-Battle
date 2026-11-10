import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';

const browser = await chromium.launch({channel:'chrome'});
const context = await browser.newContext({reducedMotion:'reduce',viewport:{width:390,height:844}});
const page = await context.newPage();
page.setDefaultTimeout(15000);
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const click = selector => page.locator(selector+':visible').first().click();
const shot = name => page.screenshot({path:'docs/visual-polish/after/'+name+'.png'});
const close = () => click('[data-action=close-modal]');
async function seed({poor=false,raid=false}={}) {
  await page.goto('http://127.0.0.1:5173');
  await page.evaluate(async ({poor,raid}) => {
    const {newSave} = await import('/tests/legacy-save.js');
    const s = newSave(); s.started=true; s.coins=poor?0:1000; s.candy=poor?0:2000;
    if(raid){s.gym=11;s.rating=s.bestRating=6000;}
    localStorage.setItem('pmb-save-v1',JSON.stringify(s));
  },{poor,raid});
  await page.reload();
}
try {
  for(const width of [390,1440]) {
    await page.setViewportSize({width,height:width===390?844:900});
    await seed({poor:true});
    await click('nav [data-page=pokedex]');
    await shot('pokedex-mixed-'+width);
    await click('[data-action=dex-status][data-status=missing]');
    assert.equal(await page.locator('.pokedex-entry.discovered').count(),0);
    await shot('pokedex-undiscovered-'+width);
    await click('nav [data-page=collection]');
    await page.locator('#search').fill('Charmander');
    await click('.collection-card [data-action=detail]');
    assert.equal(await page.locator('[data-action=evolve]').isDisabled(),true);
    await shot('detail-disabled-'+width); await close();
    await page.locator('#search').fill('Eevee');
    await click('.collection-card [data-action=detail]');
    await click('[data-action=lab-confirm]');
    await shot('lab-confirm-'+width); await close();
    await click('nav [data-page=shop]');
    await click('[data-action=pack][data-kind=poke]');
    assert.equal(await page.locator('#toast.visible').count(),1);
    await shot('error-insufficient-currency-'+width);
    await click('[data-action=daily]');
    await close();
    assert.equal(await page.locator('[data-action=daily]').isDisabled(),true);
    await shot('daily-claimed-'+width);
    await click('[data-action=claim-task][data-id=pack]');
    await shot('task-claimed-'+width);
    await click('[data-action=settings]');
    await page.locator('#import-save').setInputFiles({name:'invalid.json',mimeType:'application/json',buffer:Buffer.from('invalid')});
    await page.waitForFunction(() => document.querySelector('#toast').textContent.startsWith('Could not import:'));
    await shot('error-invalid-save-'+width); await close();
    await click('nav [data-page=battle]');
    if(width===1440) {
      await page.locator('[data-action=start][data-mode=ranked]').hover();
      await shot('hover-play-desktop');
      await page.locator('[data-action=start][data-mode=ranked]').focus();
      await page.keyboard.press('Tab');
      await shot('focus-desktop');
      assert.ok(await page.evaluate(()=>getComputedStyle(document.activeElement).outlineStyle!=='none'));
    }
    await click('[data-action=start][data-mode=practice]');
    for(let turn=0;turn<16;turn++){
      await click('[data-action=select]:not(:disabled)'); await click('[data-action=commit]');
      await page.locator('[data-action=next-round]:not(:disabled)').waitFor();
      await click('[data-action=next-round]');
      if(await page.locator('.result-modal').count()) break;
    }
    assert.equal(await page.locator('.result-modal').count(),1);
    await shot('battle-result-'+width);
    await click('[data-action=finish-battle]');
  }
  // Verify desktop single-screen hubs and mobile Battle after the readability changes.
  await seed({raid:true});
  const fits=[];
  for(const [width,height] of [[320,740],[375,667],[390,844],[430,932],[768,1024],[1024,768],[1280,720],[1366,768],[1440,900],[1920,1080]]){
    await page.setViewportSize({width,height});
    for(const name of ['battle','raids','shop']){
      await click('nav [data-page='+name+']');
      const result=await page.evaluate(()=>({
        scroll:document.documentElement.scrollHeight, horizontal:document.documentElement.scrollWidth>innerWidth,
        cardsBottom:document.querySelector('.battle-hub-grid')?.getBoundingClientRect().bottom
      }));
      fits.push({name,width,height,...result});
      assert.equal(result.horizontal,false);
      if(width>=1280) assert.ok(result.scroll<=height+1, name+' must fit '+width+' × '+height);
      if(name==='battle'&&width<=430) assert.ok(result.cardsBottom<=height-68, 'Mobile Battle cards must fit '+width+' × '+height+' bottom='+result.cardsBottom);
    }
  }
  assert.deepEqual(errors,[]);
  await writeFile('docs/visual-polish/after/state-verification.json',JSON.stringify({fits,errors},null,2));
  console.log('States checked: mixed and missing dex, disabled evolution, lab confirmation, currency and import errors, daily/task success, hover, focus, complete battle, responsive hubs.');
} finally {await browser.close();}
