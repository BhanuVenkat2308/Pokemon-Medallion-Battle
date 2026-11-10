import {newSave} from './legacy-save.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {openPack,evolve,validateSave} from '../src/state.js';
import {makeBattle,resolveRound} from '../src/engine.js';
import {POKEMON} from '../src/data.js';
import {POWER_OPTIONS} from '../src/powers.js';

test('pack and evolution credit the new day when performed across midnight',()=>{
 for(const action of ['pack','evolve']){
  const s=newSave();s.daily.day='2000-01-01';s.daily[action]=7;s.daily.claimed=[action];
  if(action==='pack')openPack(s,'poke',()=>.5);
  else evolve(s,s.collection.find(p=>p.species===4).uid,()=>.5);
  assert.equal(s.daily[action],1);assert.deepEqual(s.daily.claimed,[]);
  assert.equal(validateSave(JSON.parse(JSON.stringify(s))).daily[action],1);
 }
});

test('full bag pack rejection preserves currency and saved collection',()=>{
 const s=newSave();
 while(s.collection.length<500)s.collection.push({...s.collection[0],uid:crypto.randomUUID()});
 const before=structuredClone(s);
 assert.throws(()=>openPack(s,'poke'),/bag is full/);
 assert.deepEqual(s,before);assert.equal(validateSave(s).collection.length,500);
});

test('all configured power pairings resolve with finite CP and terminate',()=>{
 const variants=POKEMON.flatMap(p=>POWER_OPTIONS[p.id].map(powerKey=>({uid:`${p.id}-${powerKey}`,species:p.id,iv:31,powerKey})));
 for(const left of variants)for(const right of variants){
  const b=makeBattle([left],[right]);let rounds=0;
  while(!b.finished){
   assert.ok(++rounds<=3,`${left.powerKey} vs ${right.powerKey} stalled`);
   const result=resolveRound(b,[0,0],()=>0);
   assert.ok(result.cp.every(cp=>Number.isFinite(cp)&&cp>=0));
  }
  assert.ok([0,1].includes(b.winner));
 }
});
