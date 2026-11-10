import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome'});
try{
 const page=await browser.newPage();
 await page.goto('http://127.0.0.1:5173');
 await page.evaluate(async()=>{
  const {newSave,createMedallion}=await import('/tests/legacy-save.js');
  const {POKEMON}=await import('/src/data.js');
  const s=newSave();s.started=true;s.gym=11;s.rating=s.bestRating=6000;
  const teamSpecies=s.collection.filter(p=>s.team.includes(p.uid)).map(p=>p.species);
  s.collection=POKEMON.map(d=>createMedallion(d.id,31,()=>.5));
  s.team=teamSpecies.map(id=>s.collection.find(p=>p.species===id).uid);
  localStorage.setItem('pmb-save-v1',JSON.stringify(s));
 });await page.reload();
 const rows=[];
 for(const width of [320,375,390,430,550,600,601,768,900,901,1024,1100,1101,1280,1440,1920]){
  await page.setViewportSize({width,height:900});
  for(const name of ['battle','collection','pokedex','raids','shop']){
   await page.locator('nav [data-page='+name+']').click();
   const data=await page.evaluate(()=>{
    const text=[...document.querySelectorAll('.med-name,.med-power,.pokedex-entry h3,.dex-entry-foot,.counter-pack-copy h3,.research-copy h3,.raid-pool-card b')];
    const clipped=text.filter(el=>el.clientWidth>0&&el.scrollWidth>el.clientWidth+1).map(el=>el.textContent);
    const controls=[...document.querySelectorAll('button:not(:disabled),input:not([type=file]),select,summary')].filter(el=>el.getClientRects().length&&getComputedStyle(el).visibility!=='hidden');
    const smallControls=controls.filter(el=>{const r=el.getBoundingClientRect();return r.width<24||r.height<24;}).map(el=>({label:el.getAttribute('aria-label')||el.textContent.trim(),class:el.className}));
    return {horizontal:document.documentElement.scrollWidth>innerWidth+1,textChecked:text.length,clipped,smallControls};
   });
   rows.push({width,name,...data});
   assert.equal(data.horizontal,false,name+' horizontal overflow '+width);
  }
 }
 await writeFile('docs/visual-polish/after/boundary-verification.json',JSON.stringify(rows,null,2));
 console.log(JSON.stringify({screens:rows.length,clipped:rows.filter(r=>r.clipped.length),smallControls:rows.filter(r=>r.smallControls.length).map(r=>({width:r.width,name:r.name,controls:r.smallControls}))},null,2));
}finally{await browser.close();}
