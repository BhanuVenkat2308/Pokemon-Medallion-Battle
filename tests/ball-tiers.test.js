import {newSave} from './legacy-save.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {DEX,POKEMON,EVOLUTION_COST} from '../src/data.js';
import {validateSave} from '../src/state.js';

test('actual evolution paths distinguish branches and low CP final forms',()=>{
 for(const id of [25,44,55,75,148])assert.equal(DEX[id].tier,1,DEX[id].name);
 for(const id of [26,28,40,45,95,130,131,134,135,136,143])assert.equal(DEX[id].tier,2,DEX[id].name);
 for(const id of [3,6,9,65,68,94,149])assert.equal(DEX[id].tier,3,DEX[id].name);
 for(const p of POKEMON.filter(p=>p.rarity>=4&&!p.raidRoster))assert.equal(p.tier,3,p.name);
});
test('existing saves keep ownership, IVs and progress while resolving new tiers',()=>{
 const s=newSave();s.coins=1234;s.raid.damage=567;
 s.collection.push(...[44,45,3].map(species=>({uid:`tier-${species}`,species,iv:31,powerKey:`legacy-${species}`})));
 const loaded=validateSave(JSON.parse(JSON.stringify(s)));
 assert.deepEqual(loaded.collection,s.collection);assert.deepEqual(loaded.team,s.team);
 assert.deepEqual(loaded.raid,s.raid);assert.equal(loaded.coins,s.coins);
 assert.deepEqual(loaded.collection.slice(-3).map(p=>DEX[p.species].tier),[1,2,3]);
});
test('evolution candy prices follow approved rarity and destination tier',()=>{
 assert.equal(EVOLUTION_COST(DEX[44]),300);
 assert.equal(EVOLUTION_COST(DEX[25]),400);
});
