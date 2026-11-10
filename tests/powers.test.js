import {newSave} from './legacy-save.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {POKEMON,DEX} from '../src/data.js';
import {evolve,validateSave,createMedallion} from '../src/state.js';
import {powerOf,POWER_OPTIONS,REGISTRY,evolutionPower,validPower,displayPokemon,powerText} from '../src/powers.js';
import {makeBattle,resolveRound} from '../src/engine.js';
const mon=(species,powerKey,iv=0)=>({uid:crypto.randomUUID(),species,powerKey,iv});
function evolveOne(p,random=()=>0){const s=newSave();s.gym=11;s.candy=10000;s.collection.push(p);evolve(s,p.uid,random);return p;}
test('Support Ivysaur keeps Leech Seed as Venusaur, including old saves',()=>{
 for(const key of [undefined,'2-1']){const p=mon(2,key,31),uid=p.uid;evolveOne(p);assert.equal(p.species,3);assert.equal(p.uid,uid);assert.equal(p.iv,31);assert.equal(powerOf(p).kind,'support');assert.equal(powerOf(p).name,'Leech Seed');const b=makeBattle([p],[mon(143,'143-0')]);resolveRound(b,[0,0]);assert.equal(b.fields[0].support[0].amount,100);}
});
test('Vine Whip upgrades through Power Whip to Solar Beam and retains Water target',()=>{
 const p=mon(1,'1-0');evolveOne(p);assert.equal(powerOf(p).name,'Power Whip');assert.equal(powerOf(p).multiplier,2);evolveOne(p);assert.equal(powerOf(p).name,'Solar Beam');assert.equal(powerOf(p).target,'Water');assert.equal(powerOf(p).multiplier,2.5);
});
test('Rapid Spin and Foresight retain their paths',()=>{
 for(const [species,key,next,kind,name] of [[8,'8-1',9,'clearance','Rapid Spin'],[54,'54-0',55,'reveal','Foresight'],[58,'58-0',59,'support','Baton Pass']]){const p=evolveOne(mon(species,key));assert.equal(p.species,next);assert.equal(powerOf(p).kind,kind);assert.equal(powerOf(p).name,name);}
});
test('every original and legacy evolution option has a valid consistent successor',()=>{
 for(const d of POKEMON){if(!d.evolution)continue;const next=Array.isArray(d.evolution)?d.evolution:[d.evolution];for(const key of [...POWER_OPTIONS[d.id],`legacy-${d.id}`])for(const id of next){const p=mon(d.id,key);const result=evolutionPower(p,id,()=>0);assert.ok(validPower(id,result),`${d.name}: ${key} -> ${result}`);if(d.id!==14&&!Array.isArray(d.evolution)&&powerOf(p).kind!=='none')assert.ok(REGISTRY[result].kind===powerOf(p).kind||(REGISTRY[result].effects||[]).some(e=>e.kind===powerOf(p).kind)||DEX[id].raidRoster,`${d.name} lost its category`);}}
});
test('powerless acquisition can unlock either Ivysaur path without rerolling afterward',()=>{
 const a=createMedallion(1,0,()=>0);assert.equal(powerOf(a).kind,'none');const b={...a,uid:crypto.randomUUID()};evolveOne(a,()=>0);evolveOne(b,()=>.99);assert.equal(powerOf(a).kind,'effective');assert.equal(powerOf(b).kind,'support');evolveOne(b);assert.equal(powerOf(b).kind,'support');
});
test('save migration preserves all old powers and validates new per-medallion keys',()=>{
 const s=newSave();for(const d of POKEMON)s.collection.push(mon(d.id,undefined));const migrated=validateSave(JSON.parse(JSON.stringify(s)));for(const p of migrated.collection.slice(s.collection.length-POKEMON.length)){assert.equal(powerOf(p).kind,DEX[p.species].power);assert.equal(p.powerKey,`legacy-${p.species}`);}assert.deepEqual(validateSave(JSON.parse(JSON.stringify(migrated))).collection,migrated.collection);
 migrated.collection[0].powerKey='151-0';assert.throws(()=>validateSave(migrated),/Invalid power/);
});
test('two same-species medallions retain independent variants across save roundtrip',()=>{
 const s=newSave();s.collection.push(mon(2,'2-0'),mon(2,'2-1'));const x=validateSave(JSON.parse(JSON.stringify(s))).collection.slice(-2);assert.deepEqual(x.map(p=>powerOf(p).kind),['effective','support']);assert.equal(displayPokemon(x[1]).moveName,'Leech Seed');assert.match(powerText(powerOf(x[1])),/gain 100 CP/);
});
test('tier targets are evaluated by tier rather than Pokémon type',()=>{
 const p=mon(52,'52-0',1);const b=makeBattle([p],[mon(28,'legacy-28')]);assert.equal(resolveRound(b,[0,0]).cp[0],602);const c=makeBattle([p],[mon(4,'4-0')]);assert.equal(resolveRound(c,[0,0]).cp[0],301);
});
test('source multipliers round CP down and do not activate twice',()=>{
 const p=mon(4,'4-0',1);const b=makeBattle([p],[mon(12,'12-0')]);assert.equal(resolveRound(b,[0,0]).cp[0],676);assert.equal(b.teams[0][0].powerUsed,true);assert.equal(resolveRound(b,[0,0]).cp[0],451);
});
test('50 CP arenas and one-deployment support use their configured amounts',()=>{
 const b=makeBattle([mon(131,'131-0'),mon(7,'7-0')],[mon(129,'129-0'),mon(129,'129-0')]);assert.deepEqual(resolveRound(b,[0,0]).cp,[700,100]);assert.equal(resolveRound(b,[1,1]).cp[0],500);
 const c=makeBattle([mon(58,'58-0'),mon(4,'4-0')],[mon(143,'143-0'),mon(143,'143-0')]);resolveRound(c,[0,0]);assert.equal(c.fields[0].support[0].turns,1);assert.equal(resolveRound(c,[1,1]).cp[0],550);assert.equal(c.fields[0].support.length,0);
});
test('Eevee branches use their own powers',()=>{for(const [rng,id,kind] of [[0,134,'protect'],[.13,135,'priority'],[.26,136,'effective'],[.38,196,'reveal'],[.51,197,'effective'],[.63,470,'effective'],[.76,471,'effective'],[.99,700,'effective']]){const p=evolveOne(mon(133,'133-0'),()=>rng);assert.equal(p.species,id);assert.equal(powerOf(p).kind,kind);}});

test('Pichu is obtainable and evolves through the full Pikachu family',async()=>{
 const {PACK_POKEMON,BASE_POKEMON}=await import('../src/data.js');
 const {cpOf,validateTeam}=await import('../src/engine.js');
 assert.ok(PACK_POKEMON.some(p=>p.id===172));assert.ok(BASE_POKEMON.some(p=>p.id===172));
 assert.ok(!PACK_POKEMON.some(p=>p.id===25));
 const p=mon(172,'172-0',31);assert.equal(cpOf(p),181);assert.equal(powerOf(p).target,'Colorless');
 evolveOne(p);assert.equal(p.species,25);assert.equal(powerOf(p).name,'Volt Tackle');assert.equal(powerOf(p).target,'tier1');
 evolveOne(p);assert.equal(p.species,26);assert.equal(powerOf(p).target,'tier2');assert.equal(p.iv,31);
 const s=newSave();const baby=mon(172,'172-0');s.collection.push(baby);const team=[...s.team];team[2]=baby.uid;assert.ok(validateTeam(team,s.collection,11));
});
