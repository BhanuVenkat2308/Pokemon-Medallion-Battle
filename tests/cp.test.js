import {newSave} from './legacy-save.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {DEX} from '../src/data.js';
import {cpOf,makeBattle,effectiveBase} from '../src/engine.js';
import {validateSave,evolve} from '../src/state.js';

test('existing collection and both raid teams use corrected CP without changing saved progress',()=>{
 const s=newSave();s.started=true;s.raid.damage=321;s.coins=456;s.candy=789;
 const pika=s.collection.find(p=>p.species===25);pika.iv=31;pika.powerKey='legacy-25';
 const original=structuredClone(s),loaded=validateSave(JSON.parse(JSON.stringify(s)));
 assert.deepEqual(loaded.collection,original.collection);assert.deepEqual(loaded.team,original.team);
 for(const k of ['coins','candy','rating','bestRating','wins','played'])assert.equal(loaded[k],original[k]);
 assert.deepEqual(loaded.raid,original.raid);
 const owned=loaded.collection.find(p=>p.uid===pika.uid);assert.equal(cpOf(owned),331);
 const boss={uid:'moltres-raid',species:146,iv:16,powerKey:'146-0'};
 const raid=makeBattle([owned],[boss],'raid',1);
 assert.equal(effectiveBase(raid,raid.teams[0][0],0),331);
 assert.equal(effectiveBase(raid,raid.teams[1][0],1),666);
 assert.deepEqual(owned,pika);
});
test('Pichu family uses source base CP plus preserved IV after evolution and reload',()=>{
 const s=newSave();s.gym=11;s.candy=10000;
 const p={uid:'cp-evolution',species:172,iv:31,powerKey:'172-0'};s.collection.push(p);
 assert.equal(cpOf(p),181);evolve(s,p.uid);assert.equal(cpOf(p),331);evolve(s,p.uid);assert.equal(cpOf(p),581);
 assert.equal(cpOf(validateSave(JSON.parse(JSON.stringify(s))).collection.find(x=>x.uid===p.uid)),581);
});
test('explicit source exceptions and unlisted recreation species keep intended bases',()=>{
 assert.equal(DEX[129].cp,50);assert.equal(DEX[150].cp,900);assert.equal(DEX[145].cp,1200);
 assert.equal(DEX[149].cp,1300);assert.equal(DEX[19].cp,300);assert.equal(DEX[65].cp,1150);
});

test('owned Great medallions and raid opponents use new CP while preserving IV',()=>{
 const s=newSave();s.collection.push({uid:'great-cp',species:28,iv:31,powerKey:'legacy-28'});
 const restored=validateSave(JSON.parse(JSON.stringify(s)));
 assert.deepEqual(restored.collection,s.collection);
 const p=restored.collection.find(p=>p.uid==='great-cp');
 const raid=makeBattle([p],[p],'raid');
 for(const side of raid.teams)assert.equal(cpOf(side[0]),631);
});
