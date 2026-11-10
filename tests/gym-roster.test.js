import {newSave} from './legacy-save.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {GYM_ROSTER} from '../src/gym-roster.js';
import {DEX,GYM_UNLOCK_RP,PACK_POKEMON,unlockRP} from '../src/data.js';
import {openPack,packPool,validateSave,evolve,createMedallion} from '../src/state.js';
import {makeBattle,resolveRound} from '../src/engine.js';
import {powerOf} from '../src/powers.js';
const mon=(species,powerKey=`${species}-0`)=>({uid:crypto.randomUUID(),species,powerKey,iv:0});
test('all 217 source rows match CP, type, rarity and ball tier with local artwork',()=>{
 const groups=JSON.parse(fs.readFileSync(new URL('../docs/gym-source.json',import.meta.url)));
 assert.equal(GYM_ROSTER.length,217);
 assert.deepEqual(Array.from({length:11},(_,gym)=>GYM_ROSTER.filter(p=>p.gym===gym).length),[12,25,21,19,21,21,23,21,12,23,19]);
 for(const row of groups.flatMap(g=>g.rows)){
  const p=GYM_ROSTER.find(p=>p.name===row[1].text);assert.ok(p,row[1].text);
  assert.equal(p.cp,Number(row[5].text),p.name);assert.equal(p.rarity,row[2].text.length,p.name);
  assert.equal(p.type,row[3].images[0].alt,p.name);assert.equal(p.tier,Number(row[4].images[0].src.match(/Tier_(\d)/)[1]),p.name);
  const image=fs.readFileSync(new URL(`../public/pokemon/${p.id}.png`,import.meta.url));assert.equal(image.subarray(1,4).toString(),'PNG',p.name);
 }
});
test('gym roots unlock exactly on entering each gym and remain cumulative',()=>{
 for(let gym=0;gym<11;gym++){
  const s=newSave();s.rating=GYM_UNLOCK_RP[gym];
  const actual=packPool(s).filter(p=>p.gymRoster).map(p=>p.id);
  assert.deepEqual(actual,PACK_POKEMON.filter(p=>p.gymRoster&&p.gym<=gym).map(p=>p.id));
  if(gym){s.rating--;assert.ok(packPool(s).every(p=>!p.gymRoster||p.gym<gym));}
 }
 assert.equal(DEX[1].gym,1);assert.equal(DEX[152].gym,2);assert.equal(DEX[52].gym,8);assert.equal(DEX[133].gym,9);assert.equal(DEX[337].gym,10);
});
test('both packs guarantee newest gym and rarity slots through Champion, without relocking',()=>{
 for(const kind of ['poke','silver'])for(let gym=0;gym<=11;gym++)for(const roll of [0,.24,.5,.99]){
  const s=newSave();s.gym=gym;s.rating=gym===11?6000:GYM_UNLOCK_RP[gym];s.coins=s.candy=10000;
  const result=openPack(s,kind,()=>roll);assert.equal(result.length,5);
  assert.equal(DEX[result[4].species].gym,Math.min(gym,10));assert.ok(DEX[result[4].species].gymRoster);
  assert.ok(DEX[result[3].species].rarity>=2);assert.ok(result.every(p=>unlockRP(DEX[p.species])<=s.bestRating));
  s.rating=1150;const restored=validateSave(JSON.parse(JSON.stringify(s)));assert.deepEqual(restored.collection,s.collection);
  assert.equal(DEX[openPack(restored,kind,()=>roll)[4].species].gym,Math.min(gym,10));
 }
});
test('new branches preserve IV, identity and charge the approved Candy schedule',()=>{
 for(const [id,targets] of [[44,[45,182]],[79,[80,199]],[61,[62,186]],[281,[282,475]],[133,[134,135,136,196,197,470,471,700]]]){
  assert.deepEqual(DEX[id].evolution,targets);
  for(let i=0;i<targets.length;i++){const s=newSave();s.candy=10000;const p=createMedallion(id,31,()=>.5);s.collection.push(p);const uid=p.uid;evolve(s,uid,()=>i/targets.length);assert.equal(p.species,targets[i]);assert.equal(p.iv,31);assert.equal(p.uid,uid);assert.ok(powerOf(p));}
 }
});
test('dual target and reveal powers apply their source effects once',()=>{
 for(const foe of [4,129]){const b=makeBattle([mon(657),mon(16)],[mon(foe),mon(21),mon(54)]);const r=resolveRound(b,[0,0],()=>0);assert.equal(r.cp[0],Math.floor(DEX[657].cp*(foe===4?1.5:1)));assert.equal(b.teams[1][1].revealed,true);assert.equal(b.teams[0][0].powerUsed,true);}
 for(const foe of [129,10]){const b=makeBattle([mon(471)],[mon(foe)]);assert.equal(resolveRound(b,[0,0]).cp[0],DEX[471].cp*2);}
 const b=makeBattle([mon(196)],[mon(16),mon(21),mon(54),mon(129)]);resolveRound(b,[0,0],()=>0);assert.equal(b.teams[1].filter(p=>p.revealed).length,3);
 const c=makeBattle([mon(197)],[mon(143)]);assert.equal(resolveRound(c,[0,0]).cp[0],Math.floor(DEX[197].cp*1.5));
});
