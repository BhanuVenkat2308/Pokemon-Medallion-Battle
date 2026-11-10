import {newSave} from './legacy-save.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {DEX,POKEMON,EVOLUTION_COST} from '../src/data.js';
import {createMedallion,evolve} from '../src/state.js';

test('Candy schedule covers every approved rarity and transition',()=>{
 for(const [id,cost] of [[10,100],[43,200],[172,200],[17,200],[44,300],[4,400],[5,800],[64,800],[67,800],[148,800],[133,400],[6,0]]){
  assert.equal(EVOLUTION_COST(DEX[id]),cost,DEX[id].name);
 }
});
test('every existing evolution has a defined cost, including all Eevee branches',()=>{
 for(const p of POKEMON.filter(p=>p.evolution)){
  assert.ok([100,200,300,400,800].includes(EVOLUTION_COST(p)),p.name);
  for(const target of Array.isArray(p.evolution)?p.evolution:[p.evolution]){
   assert.equal(EVOLUTION_COST({...p,evolution:target}),EVOLUTION_COST(p),p.name);
  }
 }
});
test('evolution requires and deducts exactly the displayed Candy cost',()=>{
 for(const id of [10,43,172,17,44,4,5,64,67,148,133]){
  const s=newSave();const p=createMedallion(id,31,()=>.5);s.collection.push(p);
  const cost=EVOLUTION_COST(DEX[id]);s.candy=cost-1;
  const before=structuredClone(s);
  assert.throws(()=>evolve(s,p.uid,()=>.5),/Evolution needs/);
  assert.deepEqual(s,before);
  s.candy=cost;const uid=p.uid;evolve(s,uid,()=>.5);
  assert.equal(s.candy,0);assert.equal(p.uid,uid);assert.equal(p.iv,31);
  assert.equal(s.daily.evolve,1);
 }
});
