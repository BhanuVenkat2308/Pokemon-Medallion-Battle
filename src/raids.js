import {DEX,POKEMON,PACK_POKEMON,unlockRP,GYMS} from './data.js';
import {acquirePower,POWER_OPTIONS,REGISTRY,validPower} from './powers.js';
import {makeBattle,chooseAI,resolveRound,validateTeam} from './engine.js';
import {EXPEDITIONS,RAID_WEEK_MS,RAID_PASS_MS,raidHP,raidPackRules,raidDifficulty} from './raid-config.js';
export {EXPEDITIONS,raidHP,raidPackRules};
const STARTERS=new Set(EXPEDITIONS.map(r=>r.starter));
const pick=(list,random)=>list[Math.min(list.length-1,Math.floor(random()*list.length))];
const uuid=()=>crypto.randomUUID();
const mon=(species,iv,random)=>({uid:uuid(),species,iv,powerKey:acquirePower(species,random)});
const bestRP=s=>Math.max(s.rating,s.bestRating||1150,s.gym?GYMS[s.gym-1].rating:1150);
export const canUnlockRaids=s=>s.gym>=11||bestRP(s)>=6000;
export function refreshRaids(s,now=Date.now()){
 if(s.raid.version!==2)s.raid={version:2,unlockedAt:null,week:0,stage:1,damage:0,passes:6,updated:now,inbox:[],claimed:[],cleared:[],active:null};
 const r=s.raid;
 if(r.unlockedAt===null&&canUnlockRaids(s)){r.unlockedAt=now;r.updated=now;}
 if(r.passes>=6)r.updated=now;
 else {const elapsed=Math.max(0,Math.floor((now-r.updated)/RAID_PASS_MS));if(elapsed){r.passes=Math.min(6,r.passes+elapsed);r.updated=r.passes===6?now:r.updated+elapsed*RAID_PASS_MS;}}
 if(r.unlockedAt!==null&&!r.active){const week=Math.max(r.week,Math.floor((now-r.unlockedAt)/RAID_WEEK_MS));if(week!==r.week){r.week=week;r.stage=1;r.damage=0;}}
 return r;
}
export const currentExpedition=s=>EXPEDITIONS[s.raid.week%EXPEDITIONS.length];
export const raidEndsAt=s=>s.raid.unlockedAt===null?null:s.raid.unlockedAt+(s.raid.week+1)*RAID_WEEK_MS;
export function clockText(ms){const sec=Math.max(0,Math.ceil(ms/1000)),days=Math.floor(sec/86400);return `${days?days+'d ':''}${String(Math.floor(sec/3600)%24).padStart(2,'0')}:${String(Math.floor(sec/60)%60).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`;}
export function raidIV(stage,random=Math.random){const rule=raidPackRules(stage);return random()<rule.shinyChance?31:rule.minIV+Math.floor(random()*(31-rule.minIV));}
export function rollRaidPack(s,expedition,stage,random=Math.random){
 const rule=raidPackRules(stage),legend=random()<rule.legendChance;
 const gymPool=PACK_POKEMON.filter(p=>p.rarity<4&&!STARTERS.has(p.id)&&unlockRP(p)<=bestRP(s));
 if(!gymPool.length)throw Error('No unlocked gym Pokémon available.');
 const cards=[];
 for(let i=0;i<5;i++){
  const species=i<rule.raidSlots?(i===0&&legend?expedition.boss:pick(expedition.pool,random)):pick(gymPool,random).id;
  cards.push(mon(species,raidIV(stage,random),random));
 }
 return cards;
}
function powerScore(power,team){
 const effects=power.effects||[power];
 return effects.reduce((sum,e)=>sum+(e.kind==='none'?0:e.kind==='support'?e.amount*e.turns/100:e.kind==='entry'?e.amount*e.turns/100:e.kind==='effective'?e.multiplier<1?-3:e.multiplier:e.kind==='arena'?team.filter(p=>DEX[p.species].type===e.target).length+1:2),0);
}
export function raidEnemyTeam(expedition,stage,gym=11,random=Math.random){
 const difficulty=raidDifficulty(stage);
 const boss=mon(expedition.boss,difficulty.boss,random);
 // Shuffle families once per attempt. Search legal forms, reserving the required red slots.
 const families=expedition.families.map(id=>({id,key:random()})).sort((a,b)=>a.key-b.key).map(x=>x.id);
 const options=families.map(id=>{
  const all=POKEMON.filter(p=>p.family===DEX[id].family&&p.rarity<4);
  const max=Math.max(...all.map(p=>p.cp)),min=Math.min(...all.map(p=>p.cp));
  const target=difficulty.band===0?min:difficulty.band===1?min+(max-min)*.5:max;
  return all.map(p=>({p,jitter:random()*30})).sort((a,b)=>Math.abs(a.p.cp-target)+a.jitter-Math.abs(b.p.cp-target)-b.jitter).map(x=>x.p);
 });
 const maxHigher=Math.min(4,2+Math.floor(gym/2));
 function build(index,team){
  if(team.length===6)return validateTeam(team.map(p=>p.uid),team,gym)?null:team;
  if(index>=options.length||team.length+options.length-index<6)return null;
  for(const d of options[index]){
   if(team.some(p=>DEX[p.species].family===d.family))continue;
   if(d.tier>1&&team.filter(p=>DEX[p.species].tier>1).length>=maxHigher)continue;
   if(d.tier===3&&team.filter(p=>DEX[p.species].tier===3).length>=2)continue;
   const candidate=mon(d.id,difficulty.min+Math.floor(random()*(difficulty.max-difficulty.min+1)),random);
   const result=build(index+1,[...team,candidate]);if(result)return result;
  }
  return build(index+1,team);
 }
 const team=build(0,[boss]);if(!team)throw Error('No legal raid team for '+expedition.name);
 // Later stages prefer coordinated powers; early stages use simpler available effects.
 for(const p of team){
  const choices=POWER_OPTIONS[p.species].map(k=>REGISTRY[k]);
  if(difficulty.band>=2)p.powerKey=[...choices].sort((a,b)=>powerScore(b,team)-powerScore(a,team))[0].key;
  else if(difficulty.band===0)p.powerKey=[...choices].sort((a,b)=>(a.effects?.length||1)-(b.effects?.length||1)||powerScore(a,team)-powerScore(b,team))[0].key;
 }
 return team;
}
export function beginRaid(s,random=Math.random,now=Date.now()){
 const r=refreshRaids(s,now);
 if(r.unlockedAt===null)throw Error('Earn all 11 badges or reach 6,000 RP to unlock raids.');
 if(r.active)return r.active;
 if(s.welcome)throw Error('Finish your welcome packs first.');
 const issue=validateTeam(s.team,s.collection,s.gym);if(issue)throw Error(issue);
 if(r.passes<1)throw Error('A new raid pass arrives every 30 minutes.');
 const expedition=currentExpedition(s),enemy=raidEnemyTeam(expedition,r.stage,s.gym,random);
 const battle=makeBattle(s.team.map(id=>s.collection.find(p=>p.uid===id)),enemy,'raid',1);
 battle.rival=DEX[expedition.boss].name;battle.rivalRating=0;battle.rewarded=false;
 r.active={id:uuid(),week:r.week,stage:r.stage,expedition:expedition.id,battle,selected:null,enemyPick:chooseAI(battle,random),phase:'choose',lastResult:null,appliedDamage:0,clear:false};
 if(r.passes===6)r.updated=now;r.passes--;
 return r.active;
}
export function selectRaid(s,index){const a=s.raid.active;if(!a||a.phase!=='choose'||!a.battle.teams[0][index]||a.battle.teams[0][index].used)return;a.selected=index;}
export function commitRaid(s,random=Math.random){
 const r=s.raid,a=r.active;if(!a||a.phase!=='choose'||a.selected===null)throw Error('Choose a Pokémon first.');
 if(a.enemyPick===null)a.enemyPick=chooseAI(a.battle,random,DEX[a.battle.teams[0][a.selected].species].tier);
 a.lastResult=resolveRound(a.battle,[a.selected,a.enemyPick],random);a.phase='reveal';
 const damage=Math.max(0,a.battle.damage-a.appliedDamage);a.appliedDamage=a.battle.damage;
 r.damage=Math.min(raidHP(a.stage),r.damage+damage);
 if(r.damage>=raidHP(a.stage)){
  const key=`${a.week}:${a.stage}`;
  if(!r.cleared.includes(key)){
   const pack={id:uuid(),key,expedition:a.expedition,stage:a.stage,earnedAt:Date.now(),cards:rollRaidPack(s,EXPEDITIONS[a.expedition],a.stage,random)};
   r.inbox.push(pack);r.cleared.push(key);s.coins+=300;s.candy+=100;
  }
  a.clear=true;a.battle.finished=true;a.battle.winner=0;r.stage=a.stage+1;r.damage=0;
 }
 return a.lastResult;
}
export function nextRaidRound(s,random=Math.random){const a=s.raid.active;if(!a||a.battle.finished)return;a.phase='choose';a.selected=null;a.lastResult=null;a.enemyPick=a.battle.first===1?chooseAI(a.battle,random):null;}
export function canReviveRaid(s){const a=s.raid.active,b=a?.battle;return !!b&&b.finished&&b.winner===1&&!b.revived&&b.teams.every(t=>t.some(p=>!p.used))&&!a.clear;}
export function reviveRaid(s,random=Math.random){
 if(!canReviveRaid(s)||s.candy<40)throw Error('A revive is not available.');
 const a=s.raid.active,b=a.battle;s.candy-=40;b.revived=true;b.finished=false;b.winner=null;b.teams[0][a.lastResult.indices[0]].used=false;b.first=1;nextRaidRound(s,random);
}
export function finishRaid(s,{abandon=false,now=Date.now()}={}){
 const a=s.raid.active;if(!a)return null;const b=a.battle;
 if(!b.finished&&!abandon)throw Error('Finish the attempt first.');
 if(abandon&&!a.clear){b.finished=true;b.winner=1;}
 const won=b.winner===0,coins=30+b.score[0]*20+(won?60:0),candy=won?20:10;
 if(!b.rewarded){s.coins+=coins;s.candy+=candy;s.played++;s.daily.play++;b.rewarded=true;}
 const result={battle:b,clear:a.clear,coins:coins+(a.clear?300:0),candy:candy+(a.clear?100:0),expedition:a.expedition,stage:a.stage};
 s.raid.active=null;refreshRaids(s,now);return result;
}
export function claimRaidPack(s,id){
 const r=s.raid,pack=r.inbox.find(p=>p.id===id);if(!pack||r.claimed.includes(id))throw Error('This pack has already been claimed.');
 if(s.collection.length+5>500)throw Error('Make room for five Pokémon. Your Raid Pack is safely stored.');
 for(const p of pack.cards){s.collection.push({...p});if(!s.discovered.includes(p.species))s.discovered.push(p.species);}
 r.inbox=r.inbox.filter(p=>p.id!==id);r.claimed.push(id);s.daily.pack++;return pack.cards;
}
// Validate persistent raid state before importing or loading it. Old raid saves migrate in refreshRaids.
export function validateRaid(r){
 if(r.version!==2)return {stage:r.stage,damage:r.damage,passes:r.passes,updated:r.updated};
 const integer=(n,min,max=1e8)=>Number.isInteger(n)&&n>=min&&n<=max;
 const id=value=>typeof value==='string'&&/^[\w-]{1,60}$/.test(value);
 const card=p=>p&&id(p.uid)&&DEX[p.species]&&integer(p.iv,0,31)&&validPower(p.species,p.powerKey);
 if(!(r.unlockedAt===null||Number.isFinite(r.unlockedAt)&&r.unlockedAt>=0&&r.unlockedAt<=Date.now()+60000)||!integer(r.week,0)||!integer(r.stage,1,100000)||!integer(r.damage,0,raidHP(r.stage))||!Array.isArray(r.inbox)||!Array.isArray(r.claimed)||!Array.isArray(r.cleared))throw Error('Invalid expedition progress.');
 if(r.inbox.some(p=>!p||!id(p.id)||!integer(p.expedition,0,24)||!integer(p.stage,1,100000)||!Array.isArray(p.cards)||p.cards.length!==5||!p.cards.every(card)))throw Error('Invalid Raid Pack.');
 if(!r.claimed.every(id)||!r.cleared.every(k=>typeof k==='string'&&/^\d+:\d+$/.test(k)))throw Error('Invalid reward ledger.');
 if(new Set(r.inbox.map(p=>p.id)).size!==r.inbox.length||r.inbox.some(p=>r.claimed.includes(p.id)))throw Error('Duplicate Raid Pack.');
 if(r.active){const a=r.active,b=a.battle;
  if(!integer(a.week,0)||a.week!==r.week||!integer(a.stage,1,100000)||a.stage!==(a.clear?r.stage-1:r.stage)||a.expedition!==a.week%25||!['choose','reveal'].includes(a.phase)||!b||b.mode!=='raid'||!Array.isArray(b.teams)||b.teams.length!==2||b.teams.some(t=>!Array.isArray(t)||t.length!==6||!t.every(card))||!integer(a.appliedDamage,0)||a.appliedDamage!==b.damage||!Array.isArray(b.log)||!Array.isArray(b.fields)||b.fields.length!==2||b.fields.some(f=>!Array.isArray(f.support)||!Array.isArray(f.entry))||!Array.isArray(b.arenas)||!Array.isArray(b.score)||b.score.length!==2)throw Error('Invalid active raid battle.');
  if(!id(a.id)||!integer(b.first,0,1)||!integer(b.initialFirst,0,1)||!integer(b.round,1,1000)||!b.score.every(n=>integer(n,0,6))||!b.fields.every(f=>[...f.support,...f.entry].every(e=>integer(e.amount,0,1000)&&integer(e.turns,1,10)))||b.teams.some(t=>new Set(t.map(p=>p.uid)).size!==6)||b.teams[1].filter(p=>p.species===EXPEDITIONS[a.expedition].boss).length!==1)throw Error('Invalid raid battle state.');
  if(a.phase==='reveal'&&(!Array.isArray(a.lastResult?.indices)||a.lastResult.indices.length!==2||!a.lastResult.indices.every(n=>integer(n,0,5))||!Array.isArray(a.lastResult.cp)||a.lastResult.cp.length!==2||!a.lastResult.cp.every(n=>integer(n,0))))throw Error('Invalid raid result.');
  b.rival=DEX[EXPEDITIONS[a.expedition].boss].name;
  if((a.selected!==null&&!integer(a.selected,0,5))||(a.enemyPick!==null&&!integer(a.enemyPick,0,5))||(a.phase==='reveal'&&!a.lastResult))throw Error('Invalid raid selection.');
 }
 return structuredClone(r);
}
