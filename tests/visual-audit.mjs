import {chromium} from '@playwright/test';
import {mkdir, writeFile} from 'node:fs/promises';

const phase = process.argv[2] || 'after';
const directory = 'docs/visual-polish/' + phase;
await mkdir(directory, {recursive: true});
const browser = await chromium.launch({channel: 'chrome'});
const context = await browser.newContext({reducedMotion: 'reduce'});
const page = await context.newPage();
page.setDefaultTimeout(12000);
const errors = [];
const measurements = [];
page.on('pageerror', error => errors.push(error.message));
const click = selector => page.locator(selector + ':visible').first().click();
const close = async () => {
  if (await page.locator('[data-action=close-modal]').count()) await click('[data-action=close-modal]');
};
async function seed(unlocked = false, fullRoster = false) {
  await page.goto('http://127.0.0.1:5173');
  await page.evaluate(async ({unlocked, fullRoster}) => {
    const {newSave, createMedallion} = await import('/tests/legacy-save.js');
    const {POKEMON} = await import('/src/data.js');
    const s = newSave();
    s.started = true;
    s.name = 'Trainer';
    s.gym = 6;
    s.rating = s.bestRating = 2625;
    s.coins = 4000;
    s.candy = 2000;
    if (fullRoster) {
      s.collection = POKEMON.map(d => createMedallion(d.id, 31, () => .5));
      s.team = [4,25,16,54,39,27].map(id => s.collection.find(p => p.species === id).uid);
      s.discovered = s.collection.filter((p,i) => i % 3 === 0).map(p => p.species);
    }
    s.raid = {version:2,unlockedAt:unlocked ? Date.now() : null,week:0,stage:1,damage:0,passes:6,updated:Date.now(),inbox:[],claimed:[],cleared:[],active:null};
    localStorage.setItem('pmb-save-v1', JSON.stringify(s));
  }, {unlocked, fullRoster});
  await page.reload();
}
async function shot(name) {
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({path: directory + '/' + name + '.png'});
}
async function measure(name, width, height) {
  const data = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('.collection-card, .pokedex-entry, .raid-pool-card, .research-task, .counter-pack')];
    const overflow = cards.filter(el => el.scrollWidth > el.clientWidth + 2).map(el => el.innerText.slice(0,90));
    return {horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1,
      pageHeight: document.documentElement.scrollHeight, cardCount: cards.length, overflowingCards: overflow};
  });
  measurements.push({name, width, height, ...data});
}
try {
  await seed(false, true);
  const viewports = [[320,740],[375,667],[390,844],[430,932],[768,1024],[1024,768],[1280,720],[1440,900],[1920,1080]];
  for (const [width,height] of viewports) {
    await page.setViewportSize({width,height});
    for (const name of ['battle','collection','pokedex','raids','shop']) {
      await click('nav [data-page=' + name + ']');
      await measure(name, width, height);
      if ([320,390,768,1280,1440,1920].includes(width)) await shot(name + '-' + width);
    }
  }
  for (const width of [390,1440]) {
    await page.setViewportSize({width,height:width===390?844:900});
    await click('nav [data-page=collection]');
    await page.locator('#search').fill('no-such-pokemon');
    await shot('collection-empty-' + width);
    await page.locator('#search').fill('Charizard');
    await click('.collection-card [data-action=detail]');
    await shot('detail-final-shiny-' + width); await close();
    await page.locator('#search').fill('Greninja');
    await click('.collection-card [data-action=detail]');
    await shot('detail-dual-' + width); await close();
    await page.locator('#search').fill('Charmander');
    await click('.collection-card [data-action=detail]');
    await shot('detail-evolution-' + width); await close();
    await click('.team-editor [data-action=swap]');
    await shot('swap-disabled-' + width); await close();
    await click('[data-action=settings]');
    await shot('settings-' + width);
    await click('[data-action=reset-confirm]');
    await shot('reset-confirm-' + width); await close();
    await click('nav [data-page=battle]');
    await click('[data-action=rules]');
    await shot('rules-' + width); await close();
    await click('nav [data-page=pokedex]');
    await page.locator('#dex-search').fill('no-such-pokemon');
    await shot('pokedex-empty-' + width);
    await page.locator('#dex-search').fill('');
    await click('nav [data-page=shop]');
    await click('[data-action=pack][data-kind=poke]');
    await shot('pack-rewards-' + width); await close();
    await page.locator('.shop-guide summary').click();
    await shot('shop-guide-' + width);
  }
  await seed(true);
  for (const width of [390,1440]) {
    await page.setViewportSize({width,height:width===390?844:900});
    await click('nav [data-page=raids]');
    await shot('raids-unlocked-' + width);
    await page.locator('.raid-utilities details').evaluateAll(nodes => nodes.forEach(n => n.open = true));
    await shot('raid-rules-open-' + width);
    await click('nav [data-page=battle]');
    await click('[data-action=start][data-mode=practice]');
    await shot('battle-waiting-' + width);
    await click('[data-action=select]:not(:disabled)');
    await shot('battle-selected-' + width);
    await click('[data-action=commit]');
    await page.locator('[data-action=next-round]:not(:disabled)').waitFor();
    await shot('battle-resolved-' + width);
    await click('[data-action=leave-battle]');
    await shot('leave-confirm-' + width);
    await click('[data-action=confirm-leave]');
    await close();
  }
  // New-player flow is inspected in a fresh isolated browser context.
  await context.clearCookies();
  await page.evaluate(() => localStorage.removeItem('pmb-save-v1'));
  await page.reload();
  await page.setViewportSize({width:390,height:844});
  await shot('starter-mobile');
  await click('[data-action=starter][data-id="4"]');
  await shot('welcome-pack-mobile');
  await click('[data-action=welcome-open]');
  await shot('welcome-rewards-mobile');
  await click('[data-action=welcome-next]');
  await click('[data-action=welcome-open]');
  await click('[data-action=welcome-next]');
  await shot('welcome-team-mobile');
  await writeFile(directory + '/measurements.json', JSON.stringify({measurements,errors},null,2));
  console.log(JSON.stringify({phase, pages:measurements.length, errors, overflow:measurements.filter(m=>m.horizontalOverflow), cardOverflow:measurements.filter(m=>m.overflowingCards.length).map(m=>({name:m.name,width:m.width,count:m.overflowingCards.length}))},null,2));
} finally { await browser.close(); }
