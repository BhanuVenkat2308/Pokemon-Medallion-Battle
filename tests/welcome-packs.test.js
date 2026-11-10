import test from 'node:test';
import assert from 'node:assert/strict';
import {newSave,openWelcomePack,finishWelcome,validateSave,openPack,claimDaily,packPool} from '../src/state.js';
import {newSave as legacySave} from './legacy-save.js';
import {DEX,unlockRP} from '../src/data.js';
import {validateTeam} from '../src/engine.js';
const restore=s=>validateSave(JSON.parse(JSON.stringify(s)));
test('welcome flow preserves each step and grants eleven unique Pokémon for all starters and random draws',()=>{
 for(const starter of [1,4,7])for(let seed=0;seed<100;seed++){
  let value=seed+1;const random=()=>((value=(value*1664525+1013904223)>>>0)/4294967296);
  let s=newSave(starter);s.started=true;
  assert.deepEqual(s.collection.map(p=>p.species),[starter]);assert.deepEqual(s.team,[]);
  s=restore(s);
  assert.throws(()=>openPack(s,'poke'),/welcome/);assert.throws(()=>claimDaily(s),/welcome/);
  for(const kind of ['poke','silver']){
   const pack=openWelcomePack(s,random);
   assert.equal(pack.length,5);assert.ok(DEX[pack[3].species].rarity>=2);assert.ok(DEX[pack[4].species].gymRoster);assert.equal(DEX[pack[4].species].gym,0);
   assert.ok(pack.every(p=>p.species===10||unlockRP(DEX[p.species])<=1150));
   assert.ok(pack.every(p=>p.iv>=(kind==='silver'?16:0)&&p.iv<=31));
   assert.equal(new Set(s.collection.map(p=>p.species)).size,s.collection.length);
   const ids=pack.map(p=>p.uid);s=restore(s);assert.deepEqual(s.welcome.review,ids);
   assert.throws(()=>openWelcomePack(s),/No welcome pack/);
   s.welcome.review=[];s=restore(s);
  }
  assert.equal(s.collection.length,11);assert.equal(s.coins,650);assert.equal(s.candy,400);assert.equal(s.daily.pack,2);
  assert.ok(s.collection.some(p=>p.species===10));assert.ok(!packPool(s).some(p=>p.id===10));
  assert.throws(()=>openWelcomePack(s),/No welcome pack/);assert.throws(()=>finishWelcome(s),/six/);
  s.team=s.collection.slice(0,3).map(p=>p.uid);s=restore(s);assert.equal(s.team.length,3);
  s.team=s.collection.slice(0,6).map(p=>p.uid);assert.equal(validateTeam(s.team,s.collection),null);
  finishWelcome(s);s=restore(s);assert.equal(s.welcome,null);
  const normal=openPack(s,'poke',()=>.5);assert.ok(new Set(normal.map(p=>p.species)).size<5,'Later packs can repeat');
 }
});
test('welcome IV thresholds match normal and Silver packs, including extremes',()=>{
 for(const roll of [0,.039999,.04,.059999,.06,.999999]){
  const s=newSave();s.started=true;const poke=openWelcomePack(s,()=>roll);s.welcome.review=[];const silver=openWelcomePack(s,()=>roll);
  assert.equal(poke.every(p=>p.iv===31),roll<.04);assert.equal(silver.every(p=>p.iv===31),roll<.06);
 }
});
test('legacy collections and teams remain untouched and cannot claim welcome packs',()=>{
 const old=legacySave();old.started=true;const s=restore(old);
 assert.deepEqual(s.collection,old.collection);assert.deepEqual(s.team,old.team);assert.equal(s.welcome,null);assert.throws(()=>openWelcomePack(s));
});
test('malformed partial saves cannot erase progress or bypass team validation',()=>{
 const s=newSave();s.started=true;
 assert.throws(()=>restore({...s,welcome:{packsOpened:2,review:[]}}));
 assert.throws(()=>restore({...s,team:['missing']}));
 assert.throws(()=>restore({...s,welcome:null}));
 openWelcomePack(s);s.welcome.review=[];openWelcomePack(s);s.welcome.review=[];
 s.team=Array(6).fill(s.collection[0].uid);assert.throws(()=>finishWelcome(s),/different/);assert.throws(()=>restore(s));
});
