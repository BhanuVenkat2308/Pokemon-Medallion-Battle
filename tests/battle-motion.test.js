import test from 'node:test';
import assert from 'node:assert/strict';
import {powerCues} from '../src/battle-motion.js';
import {makeBattle,resolveRound} from '../src/engine.js';
const mon=(species,powerKey)=>({uid:`${species}-${powerKey}`,species,powerKey,iv:0});
test('power cues follow actual activation order and never mutate the result or battle',()=>{
 for(const [id,key] of [[1,'1-0'],[2,'2-1'],[8,'8-1'],[11,'11-0'],[54,'54-0'],[95,'95-0'],[131,'131-0'],[135,'135-0'],[197,'197-0'],[657,'657-0'],[471,'471-0']]){
  const mons=[mon(id,key),mon(143,'143-0')];const b=makeBattle([mons[0],mon(16,'16-0')],[mons[1],mon(4,'4-0')]);
  const result=resolveRound(b,[0,0],()=>0),before=JSON.stringify({b,result,mons});
  const cues=powerCues(result,mons);
  assert.deepEqual(cues.map(c=>c.text),result.events);assert.ok(cues.every(c=>c.kind!=='none'&&c.name&&c.label));
  assert.equal(JSON.stringify({b,result,mons}),before);
 }
});
test('dual powers only animate components that actually activated',()=>{
 const mons=[mon(657,'657-0'),mon(4,'4-0')],b=makeBattle([mons[0]],[mons[1],mon(16,'16-0')]);
 assert.deepEqual(powerCues(resolveRound(b,[0,0],()=>0),mons).map(c=>c.kind),['effective','reveal']);
 const c=makeBattle([mon(657,'657-0')],[mon(143,'143-0')]);assert.deepEqual(powerCues(resolveRound(c,[0,0]),[c.teams[0][0],c.teams[1][0]]),[]);
});
