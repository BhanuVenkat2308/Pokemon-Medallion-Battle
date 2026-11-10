import test from 'node:test';
import assert from 'node:assert/strict';
import {generateOpponent} from '../src/opponents.js';
import {newSave} from './legacy-save.js';
import {DEX,RAID_BOSSES} from '../src/data.js';
import {cpOf,validateTeam} from '../src/engine.js';
const s=newSave();const team=s.team.map(id=>s.collection.find(p=>p.uid===id));
for(const mode of ['ranked','practice','raid'])test(`${mode} opponents obey all team limits at every gym and boss stage`,()=>{
 for(let gym=0;gym<=11;gym++)for(const stage of [1,2,3,4,5,6,100])for(let seed=0;seed<20;seed++){
  let n=seed+1;const random=()=>((n=(Math.imul(n,1664525)+1013904223)>>>0)/4294967296);
  const before=JSON.stringify(team),enemy=generateOpponent(team,{mode,gym,stage,random});
  assert.equal(validateTeam(enemy.map(p=>p.uid),enemy,gym),null);
  assert.equal(enemy.length,6);assert.ok(enemy.filter(p=>DEX[p.species].tier===1).length>=2);
  assert.ok(enemy.filter(p=>DEX[p.species].tier===3).length<=2);
  if(mode==='raid'){
   const order=enemy.map(p=>DEX[p.species].tier*10000+cpOf(p));
   assert.deepEqual(order,[...order].sort((a,b)=>a-b));
  }else assert.deepEqual(enemy.map(cpOf),enemy.map(cpOf).sort((a,b)=>a-b));
  assert.equal(JSON.stringify(team),before);
  if(mode==='raid'){
   const bosses=enemy.filter(p=>p.species===RAID_BOSSES[(stage-1)%RAID_BOSSES.length]);
   assert.equal(bosses.length,1);assert.equal(bosses[0].iv,16);
  }
 }
});
test('extreme random draws still produce legal raid teams with boss counted in early gym quota',()=>{
 for(const value of [0,.999999])for(let stage=1;stage<=5;stage++){
  const enemy=generateOpponent(team,{mode:'raid',gym:0,stage,random:()=>value});
  assert.equal(validateTeam(enemy.map(p=>p.uid),enemy,0),null);
  assert.ok(enemy.filter(p=>DEX[p.species].tier>1).length<=2);
 }
});
