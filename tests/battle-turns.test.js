import test from 'node:test';
import assert from 'node:assert/strict';
import {rivalRating,openingSide} from '../src/battle-turns.js';
import {GYMS,GYM_UNLOCK_RP} from '../src/data.js';
import {makeBattle,resolveRound} from '../src/engine.js';
test('higher RP leads Gym battles; ties remain random; raids always lead',()=>{
 assert.equal(openingSide('ranked',1450,1500,()=>0),1);
 assert.equal(openingSide('ranked',1500,1450,()=>.99),0);
 assert.equal(openingSide('ranked',1500,1500,()=>0),0);
 assert.equal(openingSide('ranked',1500,1500,()=>.99),1);
 assert.equal(openingSide('raid',6000,1150,()=>0),1);
 assert.equal(openingSide('practice',1500,1600,()=>0),0);
});
test('CPU RP stays within the current gym and is a valid whole number',()=>{
 for(let gym=0;gym<11;gym++)for(const rating of [GYM_UNLOCK_RP[gym],GYMS[gym].rating-1])for(const rng of [0,.5,.999]){
  const rp=rivalRating(rating,gym,()=>rng);assert.ok(Number.isInteger(rp));assert.ok(rp>=GYM_UNLOCK_RP[gym]&&rp<GYMS[gym].rating);
 }
 assert.equal(rivalRating(6000,11,()=>0),6000);
});
const mon=species=>({species,uid:crypto.randomUUID(),iv:0,powerKey:`${species}-0`});
test('each round winner leads the next, including when the follower wins',()=>{
 for(const first of [0,1])for(const winner of [0,1]){
  const a=winner===0?143:16,b=winner===1?143:16;
  const battle=makeBattle([mon(a),mon(21)],[mon(b),mon(21)],'ranked',first);
  const r=resolveRound(battle,[0,0]);assert.equal(r.winner,winner);assert.equal(battle.first,winner);
 }
});
test('Protect lead and raid lead remain unchanged',()=>{
 const battle=makeBattle([mon(11),mon(16)],[mon(143),mon(21)],'ranked',1);
 assert.equal(resolveRound(battle,[0,0]).protected,true);assert.equal(battle.first,0);
 const raid=makeBattle([mon(143),mon(21)],[mon(16),mon(21)],'raid',1);
 resolveRound(raid,[1,0]);assert.equal(raid.first,1);
});
