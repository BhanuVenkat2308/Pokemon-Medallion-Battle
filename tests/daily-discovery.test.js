import {newSave} from './legacy-save.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {claimDaily,openPack,dailyCountdown,refresh} from '../src/state.js';
test('daily discovery grants the normal pack for free once per UTC day',()=>{
 const s=newSave(),paid=structuredClone(s),coins=s.coins,candy=s.candy,count=s.collection.length;
 const free=claimDaily(s,()=>.5),normal=openPack(paid,'poke',()=>.5);
 assert.deepEqual(free.map(({uid,...p})=>p),normal.map(({uid,...p})=>p));
 assert.equal(s.collection.length,count+5);assert.equal(s.coins,coins);assert.equal(s.candy,candy);
 assert.equal(s.daily.pack,1);assert.equal(s.daily.gift,true);
 const before=JSON.stringify({collection:s.collection,daily:s.daily,coins:s.coins,candy:s.candy});assert.throws(()=>claimDaily(s),/already claimed/);assert.equal(JSON.stringify({collection:s.collection,daily:s.daily,coins:s.coins,candy:s.candy}),before);
 s.daily.day='2000-01-01';refresh(s);assert.equal(s.daily.gift,false);claimDaily(s,()=>.5);assert.equal(s.collection.length,count+10);
});
test('a full bag does not consume the free daily pack',()=>{
 const s=newSave();while(s.collection.length<496)s.collection.push({...s.collection[0],uid:crypto.randomUUID()});
 assert.throws(()=>claimDaily(s),/bag is full/);assert.equal(s.daily.gift,false);assert.equal(s.daily.pack,0);
 s.collection.pop();assert.equal(claimDaily(s,()=>.5).length,5);assert.equal(s.collection.length,500);
});
test('countdown follows midnight UTC, rounding partial seconds up',()=>{
 assert.equal(dailyCountdown(Date.parse('2026-11-01T00:00:00Z')),'24:00:00');
 assert.equal(dailyCountdown(Date.parse('2026-11-01T12:34:56Z')),'11:25:04');
 assert.equal(dailyCountdown(Date.parse('2026-11-01T23:59:59.500Z')),'00:00:01');
});
