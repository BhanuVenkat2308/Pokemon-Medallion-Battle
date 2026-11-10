import test from 'node:test';
import assert from 'node:assert/strict';
import {makeBattle,resolveRound} from '../src/engine.js';
import {battleCues,MOTION_TIMING} from '../src/battle-motion.js';
const mon=(species,powerKey=`${species}-0`,iv=0)=>({species,powerKey,iv,uid:crypto.randomUUID()});
const fight=(a,b,first=0)=>makeBattle([a,mon(16),mon(21),mon(129)],[b,mon(16),mon(21),mon(129)],'ranked',first);
test('681 Priority beats 681 Leech Seed only when it chose first',()=>{
 for(const first of [0,1]){
  const b=fight(mon(135,'135-0',31),mon(2,'2-1',31),first),r=resolveRound(b,[0,0]);
  assert.deepEqual(r.adjustedCP,[681,681]);assert.equal(r.winner,first);
  assert.deepEqual(r.powerOrder,[first,1-first]);
  assert.equal(b.teams[0][0].powerUsed,first===0);
  assert.equal(b.teams[1][0].powerUsed,first===1);
  assert.equal(b.fields[1].support.length,first===1?1:0);
  assert.equal(r.events.length,1);
 }
});
test('surviving hazards decide Priority eligibility before any ordinary powers',()=>{
 for(const penalty of [100,200]){
  const b=fight(mon(135),mon(4),1);b.fields[0].entry=[{name:'Spikes',amount:penalty,turns:2}];
  const r=resolveRound(b,[0,0]);assert.deepEqual(r.adjustedCP,[650-penalty,450]);
  assert.equal(b.teams[0][0].powerUsed,penalty===100);
  assert.equal(r.winner,penalty===100?0:1);
  assert.equal(r.timeline[0].phase,'field');assert.equal(r.timeline[0].name,'Spikes');
  assert.equal(b.fields[0].entry[0].turns,1);
 }
});
test('Clearance removes only its own hazards, preserves both Supports, and does not reset enemy timers',()=>{
 const b=fight(mon(8,'8-1'),mon(135),1);
 b.fields[0]={entry:[{amount:200,turns:3}],support:[{amount:50,turns:2}]};
 b.fields[1]={entry:[{amount:100,turns:3}],support:[{amount:25,turns:2}]};
 const r=resolveRound(b,[0,0]);
 assert.deepEqual(r.adjustedCP,[700,575]);assert.equal(r.winner,0);
 assert.equal(b.fields[0].entry.length,0);assert.equal(b.fields[0].support[0].turns,1);
 assert.equal(b.fields[1].entry[0].turns,2);assert.equal(b.fields[1].support[0].turns,1);
 assert.equal(b.teams[1][0].powerUsed,false);
 assert.equal(r.timeline[0].kind,'clearance');assert.equal(r.timeline.filter(t=>t.phase==='field'&&t.kind==='entry').length,1);
 resolveRound(b,[1,1]);assert.equal(b.fields[1].entry[0].turns,1);
 resolveRound(b,[2,2]);assert.equal(b.fields[1].entry.length,0);
});
test('both Clearances run before fields; used Clearance cannot clear hazards again',()=>{
 const b=fight(mon(8,'8-1'),mon(94,'94-1'));
 b.fields.forEach(f=>{f.entry=[{amount:100,turns:2}];f.support=[{amount:50,turns:2}];});
 const r=resolveRound(b,[0,0]);assert.deepEqual(r.adjustedCP,[700,1150]);
 assert.deepEqual(r.timeline.slice(0,2).map(t=>t.kind),['clearance','clearance']);
 assert.ok(b.fields.every(f=>!f.entry.length&&f.support.length===1));
 const c=fight(mon(8,'8-1'),mon(143));c.teams[0][0].powerUsed=true;c.fields[0].entry=[{amount:100,turns:2}];
 assert.equal(resolveRound(c,[0,0]).adjustedCP[0],550);assert.equal(c.fields[0].entry[0].turns,1);
});
test('ordinary powers follow frozen adjusted CP order, even when the second power changes the winner',()=>{
 const b=fight(mon(2,'2-1'),mon(4),1),r=resolveRound(b,[0,0]);
 assert.deepEqual(r.powerOrder,[0,1]);assert.deepEqual(r.cp,[650,675]);assert.equal(r.winner,1);
 assert.deepEqual(r.timeline.filter(t=>t.phase==='power').map(t=>t.kind),['support','effective']);
 assert.equal(b.fields[0].support[0].turns,2);
});
test('CP changes cannot make a formerly weaker Priority activate later',()=>{
 const b=fight(mon(200),mon(19,'legacy-19',31)),r=resolveRound(b,[0,0]);
 assert.deepEqual(r.adjustedCP,[600,331]);assert.deepEqual(r.cp,[300,331]);assert.equal(r.winner,1);
 assert.equal(b.teams[1][0].powerUsed,false);assert.ok(r.timeline.every(t=>t.kind!=='priority'));
});
test('each dual-power Pokémon finishes its eligible components before the next Pokémon acts',()=>{
 const b=fight(mon(657),mon(59,'59-0'),1),r=resolveRound(b,[0,0],()=>0);
 assert.deepEqual(r.timeline.filter(t=>t.phase==='power').map(t=>[t.side,t.kind]),[[0,'effective'],[0,'reveal'],[1,'support']]);
 assert.deepEqual(r.powerOrder,[0,1]);assert.equal(b.fields[1].support[0].turns,1);
});
test('Arena and Support count before Priority and CP cannot fall below zero',()=>{
 const b=fight(mon(135),mon(143));b.arenas=['Lightning'];b.fields[0].support=[{amount:50,turns:2}];
 const r=resolveRound(b,[0,0]);assert.deepEqual(r.adjustedCP,[800,700]);assert.equal(r.winner,0);
 assert.deepEqual(r.timeline.filter(t=>t.phase==='field').map(t=>t.kind),['arena','support']);
 const c=fight(mon(135),mon(16));c.fields[0].entry=[{amount:1000,turns:2}];
 assert.equal(resolveRound(c,[0,0]).adjustedCP[0],0);
});
test('presentation includes field CP snapshots and the approved timings without mutating battle state',()=>{
 assert.deepEqual(MOTION_TIMING,{flip:600,afterReveal:500,field:1000,power:1200,betweenPowers:500,result:1000});
 const b=fight(mon(135),mon(4));b.fields[0].entry=[{name:'Spikes',amount:100,turns:2}];
 const r=resolveRound(b,[0,0]),before=JSON.stringify(b),cues=battleCues(r,[b.teams[0][0],b.teams[1][0]]);
 assert.deepEqual(cues.map(c=>c.phase),['field','order','power']);
 assert.deepEqual(cues[0].cp,[550,450]);assert.equal(cues[2].kind,'priority');
 cues[0].cp[0]=999;assert.equal(JSON.stringify(b),before);
});

test('one-sided Clearance is symmetric for player and rival',()=>{
 for(const owner of [0,1]){
  const mons=[mon(135),mon(135)];mons[owner]=mon(8,'8-1');
  const b=fight(...mons,1-owner);b.fields[owner].entry=[{amount:200,turns:3}];b.fields[1-owner].entry=[{amount:100,turns:3}];
  const r=resolveRound(b,[0,0]);assert.equal(r.adjustedCP[owner],650);assert.equal(r.adjustedCP[1-owner],550);
  assert.equal(b.fields[owner].entry.length,0);assert.equal(b.fields[1-owner].entry[0].turns,2);assert.equal(r.winner,owner);
 }
});
test('Priority cannot block the special pre-comparison Clearance step',()=>{
 const b=fight(mon(135,'135-0',31),mon(8,'8-1'));b.fields[1].entry=[{amount:100,turns:2}];
 const r=resolveRound(b,[0,0]);assert.deepEqual(r.adjustedCP,[681,650]);
 assert.deepEqual(r.timeline.filter(t=>t.phase==='clearance'||t.phase==='power').map(t=>t.kind),['clearance','priority']);
 assert.equal(r.winner,0);assert.equal(b.fields[1].entry.length,0);
});
