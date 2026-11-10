import test from 'node:test';
import assert from 'node:assert/strict';
import {newSave} from './legacy-save.js';
import {validateSave,packPool,openPack} from '../src/state.js';
import {DEX,POKEMON,PACK_POKEMON} from '../src/data.js';
import {RAID_ROSTER} from '../src/raid-roster.js';
import {EXPEDITIONS,RAID_WEEK_MS,RAID_PASS_MS,raidHP,raidPackRules,raidDifficulty} from '../src/raid-config.js';
import {refreshRaids,currentExpedition,raidEnemyTeam,rollRaidPack,raidIV,beginRaid,selectRaid,commitRaid,nextRaidRound,reviveRaid,finishRaid,claimRaidPack,validateRaid} from '../src/raids.js';
import {validateTeam,cpOf,makeBattle,resolveRound} from '../src/engine.js';
import {powerOf} from '../src/powers.js';
const NOW=Date.now()-100000;
function save(){const s=newSave();s.gym=11;s.rating=s.bestRating=6000;refreshRaids(s,NOW);return s;}
function rng(seed=42){return ()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};}
const restore=s=>validateSave(JSON.parse(JSON.stringify(s)));
function winning(s){const a=beginRaid(s,()=>.5,NOW);const b=a.battle; // Controlled legal engine inputs for lifecycle edge cases.
 b.teams[0][0]={uid:'win',species:149,iv:31,powerKey:'149-0',used:false,powerUsed:true};
 b.teams[1][0]={uid:'lose',species:129,iv:0,powerKey:'129-0',used:false,powerUsed:true};
 a.enemyPick=0;selectRaid(s,0);return a;}

test('25 complete expeditions have one boss, a starter and ten distinct opponent families',()=>{
 assert.equal(EXPEDITIONS.length,25);assert.equal(new Set(EXPEDITIONS.map(r=>r.boss)).size,25);
 for(const r of EXPEDITIONS){assert.ok(DEX[r.boss].rarity>=4);assert.ok(r.pool.includes(r.starter));assert.equal(r.families.length,10);assert.equal(new Set(r.families.map(id=>DEX[id].family)).size,10);assert.ok(r.pool.every(id=>DEX[id].rarity<4));}
 for(const r of RAID_ROSTER){assert.equal(DEX[r.id].cp,r.cp,r.name);assert.equal(DEX[r.id].tier,r.tier,r.name);assert.equal(DEX[r.id].rarity,r.rarity,r.name);}
});
test('unlock is permanent with either all badges or best 6000 RP, and old raids reset only once',()=>{
 const s=newSave();s.raid.stage=30;s.raid.damage=999;const before=structuredClone(s.collection);refreshRaids(s,NOW);assert.equal(s.raid.unlockedAt,null);assert.throws(()=>beginRaid(s),/6,000/);
 s.bestRating=6000;refreshRaids(s,NOW);assert.equal(s.raid.unlockedAt,NOW);assert.equal(s.raid.stage,1);assert.deepEqual(s.collection,before);
 s.bestRating=s.rating=1150;refreshRaids(s,NOW+1);assert.equal(s.raid.unlockedAt,NOW);
 const badges=newSave();badges.gym=11;refreshRaids(badges,NOW);assert.equal(badges.raid.unlockedAt,NOW);
});
test('rotation handles exact 168-hour boundaries, offline skips, wrapping and does not grant skipped rewards',()=>{
 const s=save();s.raid.stage=7;s.raid.damage=100;
 refreshRaids(s,NOW+RAID_WEEK_MS-1);assert.equal(s.raid.week,0);assert.equal(s.raid.stage,7);
 refreshRaids(s,NOW+RAID_WEEK_MS);assert.equal(currentExpedition(s).boss,145);assert.equal(s.raid.stage,1);assert.equal(s.raid.damage,0);
 refreshRaids(s,NOW+RAID_WEEK_MS*26);assert.equal(currentExpedition(s).boss,145);assert.equal(s.raid.week,26);assert.equal(s.raid.inbox.length,0);
});
test('boss HP and pack odds match every stage boundary',()=>{
 assert.deepEqual(Array.from({length:13},(_,i)=>raidHP(i+1)),[1000,1500,2500,4000,5500,7000,9000,11000,13000,15000,17000,19000,20000]);assert.equal(raidHP(300),20000);
 for(const [stage,slots,chance,shiny,min] of [[1,2,0,.02,0],[4,2,0,.02,0],[5,2,.2,.02,0],[7,2,.2,.02,0],[8,3,.25,.02,0],[12,3,.25,.02,0],[13,3,.3,.15,26]])assert.deepEqual(raidPackRules(stage),{raidSlots:slots,gymSlots:5-slots,legendChance:chance,shinyChance:shiny,minIV:min});
});
test('all expeditions generate legal boss teams across stage bands and deterministic edge rolls',()=>{
 for(const r of EXPEDITIONS)for(const stage of [1,4,5,7,8,12,13,50])for(const roll of [()=>0,()=>.999,rng(stage)]){
  const team=raidEnemyTeam(r,stage,11,roll),d=raidDifficulty(stage);
  assert.equal(validateTeam(team.map(p=>p.uid),team,11),null,r.name);
  assert.equal(team.filter(p=>p.species===r.boss).length,1);assert.equal(team.filter(p=>DEX[p.species].rarity>=4).length,1);
  for(const p of team){assert.ok(p.species===r.boss?p.iv===d.boss:p.iv>=d.min&&p.iv<=d.max);assert.ok(p.species===r.boss||r.families.some(id=>DEX[id].family===DEX[p.species].family));}
 }
});
test('raid-exclusive species never leak into ordinary packs or change original pool',()=>{
 const s=save();assert.equal(PACK_POKEMON.length,104);assert.ok(packPool(s).every(p=>!p.raidRoster));
 for(const kind of ['poke','silver']){s.coins=s.candy=10000;for(let i=0;i<8;i++)assert.ok(openPack(s,kind,rng(i)).every(p=>!DEX[p.species].raidRoster));}
});
test('packs roll one legendary only, exact slots, uniform non-legend pool and independent IVs',()=>{
 const s=save(),random=rng(91),r=EXPEDITIONS[0],counts=Object.fromEntries(r.pool.map(id=>[id,0]));let legends=0,shiny=0,total=0;
 for(let i=0;i<12000;i++){
  const cards=rollRaidPack(s,r,8,random);assert.equal(cards.length,5);const raid=cards.slice(0,3),gym=cards.slice(3);
  assert.ok(raid.every(p=>r.pool.includes(p.species)||p.species===r.boss));assert.ok(gym.every(p=>PACK_POKEMON.some(d=>d.id===p.species)&&DEX[p.species].rarity<4&&!EXPEDITIONS.some(e=>e.starter===p.species)));
  const n=raid.filter(p=>p.species===r.boss).length;assert.ok(n<=1);legends+=n;
  for(const p of raid)if(p.species!==r.boss)counts[p.species]++;
  for(const p of cards){shiny+=p.iv===31;total++;}
 }
 assert.ok(Math.abs(legends/12000-.25)<.02);assert.ok(Math.abs(shiny/total-.02)<.005);
 const average=Object.values(counts).reduce((a,b)=>a+b)/4;for(const n of Object.values(counts))assert.ok(Math.abs(n/average-1)<.06);
 assert.ok(rollRaidPack(s,r,4,()=>0).every(p=>p.species!==r.boss));
});
test('shiny probabilities exclude accidental IV31 and stage13 limits all five slots',()=>{
 for(const stage of [1,12,13,99]){const t=raidPackRules(stage);let values=[t.shinyChance-.0001,.99];assert.equal(raidIV(stage,()=>values.shift()),31);for(const value of [0,.999]){values=[t.shinyChance,value];assert.equal(raidIV(stage,()=>values.shift()),value===0?t.minIV:30);}}
 const cards=rollRaidPack(save(),EXPEDITIONS[24],13,()=>.999);assert.ok(cards.every(p=>p.iv===30));
});
test('attempt costs one pass, resume/reload preserves enemy and selection, damage applies once before settlement',()=>{
 let s=save();const a=winning(s),team=structuredClone(a.battle.teams[1]);assert.equal(s.raid.passes,5);assert.equal(beginRaid(s),a);assert.equal(s.raid.passes,5);
 s.raid.damage=0;a.stage=s.raid.stage=8;s=restore(s);assert.deepEqual(s.raid.active.battle.teams[1],team);assert.equal(s.raid.active.selected,0);
 const result=commitRaid(s,()=>.5);assert.equal(result.winner,0);assert.ok(s.raid.damage>0);const damage=s.raid.damage;
 s=restore(s);assert.equal(s.raid.damage,damage);assert.throws(()=>commitRaid(s),/Choose/);finishRaid(s,{abandon:true,now:NOW});assert.equal(s.raid.damage,damage);assert.equal(s.raid.active,null);assert.equal(s.rating,6000);
});
test('stage clear grants pack and currency exactly once, stops immediately and does not carry excess damage',()=>{
 let s=save();winning(s);const coins=s.coins,candy=s.candy;commitRaid(s,()=>.5);
 assert.equal(s.raid.stage,2);assert.equal(s.raid.damage,0);assert.equal(s.raid.inbox.length,1);assert.equal(s.coins,coins+300);assert.equal(s.candy,candy+100);assert.equal(s.raid.active.battle.finished,true);
 const pack=structuredClone(s.raid.inbox[0]);s=restore(s);nextRaidRound(s);assert.throws(()=>commitRaid(s));assert.deepEqual(s.raid.inbox[0],pack);
 finishRaid(s,{now:NOW});const earned=s.coins;assert.equal(finishRaid(s),null);assert.equal(s.coins,earned);assert.equal(s.raid.inbox.length,1);beginRaid(s,()=>.5,NOW);assert.equal(s.raid.passes,4);assert.equal(s.raid.active.stage,2);
});
test('active attempt survives expiry and rewards old expedition before rotating',()=>{
 const s=save();winning(s);refreshRaids(s,NOW+RAID_WEEK_MS*2);assert.equal(s.raid.week,0);commitRaid(s,()=>.5);finishRaid(s,{now:NOW+RAID_WEEK_MS*2});
 assert.equal(s.raid.week,2);assert.equal(s.raid.stage,1);assert.equal(s.raid.damage,0);assert.equal(s.raid.inbox[0].expedition,0);assert.equal(s.raid.inbox[0].stage,1);
});
test('loss preserves damage, revive is charged once and battle settlement never modifies RP',()=>{
 const s=save();const a=winning(s);a.stage=s.raid.stage=8;commitRaid(s,()=>.5);const damage=s.raid.damage;nextRaidRound(s,()=>.5);
 a.battle.teams[0][1]={uid:'weak',species:129,iv:0,powerKey:'129-0',used:false,powerUsed:true};a.battle.teams[1][1]={uid:'strong',species:149,iv:31,powerKey:'149-0',used:false,powerUsed:true};a.enemyPick=1;selectRaid(s,1);commitRaid(s,()=>.5);
 assert.equal(a.battle.winner,1);assert.equal(s.raid.damage,damage);const candy=s.candy;reviveRaid(s,()=>.5);assert.equal(s.candy,candy-40);assert.equal(a.battle.teams[0][1].used,false);assert.throws(()=>reviveRaid(s));const restored=restore(s);assert.equal(restored.raid.active.battle.revived,true);finishRaid(restored,{abandon:true,now:NOW});assert.equal(restored.rating,6000);assert.equal(restored.raid.damage,damage);
});
test('pack contents survive later stages, expiry and full bags; claims cannot duplicate',()=>{
 let s=save();winning(s);commitRaid(s,()=>.5);finishRaid(s,{now:NOW});const pack=structuredClone(s.raid.inbox[0]);
 while(s.collection.length<500)s.collection.push({...s.collection[0],uid:crypto.randomUUID()});assert.throws(()=>claimRaidPack(s,pack.id),/room/);assert.deepEqual(s.raid.inbox[0],pack);
 refreshRaids(s,NOW+RAID_WEEK_MS*3);s.raid.stage=20;s.raid.updated=Date.now();s=restore(s);assert.deepEqual(s.raid.inbox[0],pack);s.collection.splice(-5);const cards=claimRaidPack(s,pack.id);assert.deepEqual(cards,pack.cards);assert.equal(s.collection.length,500);assert.equal(s.raid.inbox.length,0);assert.throws(()=>claimRaidPack(s,pack.id),/claimed/);
});
test('passes regenerate offline with correct cap and restart timing',()=>{
 const s=save();beginRaid(s,()=>.5,NOW);finishRaid(s,{abandon:true,now:NOW});refreshRaids(s,NOW+RAID_PASS_MS-1);assert.equal(s.raid.passes,5);refreshRaids(s,NOW+RAID_PASS_MS);assert.equal(s.raid.passes,6);beginRaid(s,()=>.5,NOW+10*RAID_PASS_MS);assert.equal(s.raid.updated,NOW+10*RAID_PASS_MS);assert.equal(s.raid.passes,5);
});
test('negative source arenas adjust eligible CP while excluding their documented types',()=>{
 const mon=(species,key)=>({uid:crypto.randomUUID(),species,iv:0,powerKey:key});
 const b=makeBattle([mon(248,'248-1')],[mon(4,'4-0')]);resolveRound(b,[0,0],()=>.5);assert.equal(b.log[0].cp[0],DEX[248].cp);assert.equal(b.log[0].cp[1],DEX[4].cp-100);
});
