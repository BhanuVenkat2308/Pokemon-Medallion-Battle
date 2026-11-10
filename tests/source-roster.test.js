import {newSave} from './legacy-save.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {DEX} from '../src/data.js';
import {validateSave} from '../src/state.js';
import {validateTeam,validateTeamEdit} from '../src/engine.js';
const source=JSON.parse(readFileSync(new URL('../docs/source-roster.json',import.meta.url)));
test('every documented species matches verified CP, tier and rarity',()=>{
 assert.equal(Object.keys(source.species).length,62);
 for(const [id,values] of Object.entries(source.species)){
  const p=DEX[id];assert.deepEqual([p.cp,p.tier,p.rarity],values,p.name);
 }
});
test('unlisted species retain their pre-update values',()=>{
 assert.equal(Object.keys(source.unlisted).length,9);
 for(const [id,values] of Object.entries(source.unlisted)){
  const p=DEX[id];assert.deepEqual([p.cp,p.tier,p.rarity],values,p.name);
 }
});
test('source tier changes cannot erase an existing team that exceeds its gym quota',()=>{
 const s=newSave();s.coins=1234;
 s.collection=[95,131,143,25,4,7,16,54].map(species=>({uid:`source-${species}`,species,iv:31,powerKey:`legacy-${species}`}));
 s.team=s.collection.slice(0,6).map(p=>p.uid);
 const loaded=validateSave(JSON.parse(JSON.stringify(s)));
 assert.deepEqual(loaded.collection,s.collection);assert.deepEqual(loaded.team,s.team);assert.equal(loaded.coins,1234);
 assert.match(validateTeam(loaded.team,loaded.collection,0),/current gym/);
 const repaired=loaded.team.map(id=>id==='source-95'?'source-16':id);
 assert.equal(validateTeamEdit(loaded.team,repaired,loaded.collection,0),null);
 assert.equal(validateTeam(repaired,loaded.collection,0),null);
});
