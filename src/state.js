import {refreshRaids,validateRaid} from './raids.js';
import {acquirePower,legacyPowerKey,validPower,evolutionPower} from './powers.js';
import {DEX,PACK_POKEMON,unlockRP,GYM_UNLOCK_RP,GYMS,TASKS,EVOLUTION_COST} from './data.js';
import {validateTeam} from './engine.js';
const KEY='pmb-save-v1';
export const STARTER_PACK_CHANCE=.025;
export const STARTER_SPECIES=Object.freeze([1,4,7,152,155,158,252,255,258,387,390,393,495,498,501,650,653,656,722,725,728]);
const starterIds=new Set(STARTER_SPECIES);
export const dayKey=()=>new Date().toISOString().slice(0,10);
export function dailyCountdown(now=Date.now()){
 const date=new Date(now);
 const seconds=Math.ceil((Date.UTC(date.getUTCFullYear(),date.getUTCMonth(),date.getUTCDate()+1)-now)/1000);
 return [Math.floor(seconds/3600),Math.floor(seconds/60)%60,seconds%60].map(n=>String(n).padStart(2,'0')).join(':');
}
export const createMedallion=(species,iv=Math.floor(Math.random()*32),random=Math.random)=>({uid:crypto.randomUUID(),species,iv,powerKey:acquirePower(species,random)});
export function newSave(starter=4){
 if(![1,4,7].includes(starter))throw Error('Choose Bulbasaur, Charmander, or Squirtle.');
 const collection=[createMedallion(starter,Math.floor(Math.random()*32),()=>.5)];
 return {version:1,name:'Trainer',collection,team:[],welcome:{packsOpened:0,review:[]},coins:650,candy:400,rating:1150,bestRating:1150,gym:0,wins:0,played:0,discovered:collection.map(x=>x.species),daily:{day:dayKey(),play:0,win:0,pack:0,evolve:0,claimed:[],gift:false},raid:{stage:1,damage:0,passes:6,updated:Date.now()},sound:false,started:false};
}
export const bestRP=s=>Math.max(s.bestRating||1150,s.rating,s.gym?GYMS[s.gym-1].rating:1150);
export const newestPackGym=s=>GYM_UNLOCK_RP.findLastIndex(rp=>rp<=bestRP(s));
export const packPool=s=>PACK_POKEMON.filter(p=>unlockRP(p)<=bestRP(s));
export function refresh(s){
 s.bestRating=bestRP(s);
 if(s.daily.day!==dayKey())s.daily={day:dayKey(),play:0,win:0,pack:0,evolve:0,claimed:[],gift:false};
 refreshRaids(s);
 return s;
}
export function load(){try{const raw=localStorage.getItem(KEY);return raw?refresh(validateSave(JSON.parse(raw))):newSave();}catch{return newSave();}}
export function persist(s){try{localStorage.setItem(KEY,JSON.stringify(s));return true;}catch{return false;}}
export function validateSave(x){
 const int=(n,min,max)=>Number.isInteger(n)&&n>=min&&n<=max;
 if(!x||x.version!==1||!Array.isArray(x.collection)||x.collection.length<(x.welcome?1:6)||x.collection.length>500)throw Error('Invalid collection.');
 const collection=x.collection.map(p=>{if(!p||typeof p.uid!=='string'||!/^[a-zA-Z0-9-]{1,60}$/.test(p.uid)||!DEX[p.species]||!int(p.iv,0,31))throw Error('Invalid medallion.');const powerKey=p.powerKey??legacyPowerKey(p.species);if(!validPower(p.species,powerKey))throw Error('Invalid power.');return {uid:p.uid,species:p.species,iv:p.iv,powerKey};});
 if(new Set(collection.map(p=>p.uid)).size!==collection.length)throw Error('Duplicate medallion IDs.');
 for(const k of ['coins','candy','wins','played'])if(!int(x[k],0,100000000))throw Error('Invalid progress.');
 const welcome=x.welcome;
 if(welcome){
  if(!int(welcome.packsOpened,0,2)||collection.length!==1+welcome.packsOpened*5||new Set(collection.map(p=>p.species)).size!==collection.length||!Array.isArray(welcome.review)||![0,5].includes(welcome.review.length)||welcome.review.some((id,i)=>id!==collection.slice(-5)[i]?.uid)||(!welcome.packsOpened&&welcome.review.length))throw Error('Invalid welcome progress.');
 }
 if(!int(x.rating,1150,1000000)||!int(x.gym,0,11)||!Array.isArray(x.team)||(welcome?(x.team.length>6||new Set(x.team).size!==x.team.length||x.team.some(id=>!collection.some(p=>p.uid===id))):validateTeam(x.team,collection,x.gym,{allowLegacyTiers:true})))throw Error('Invalid team or gym.');
 if(!x.raid||!int(x.raid.stage,1,100000)||!int(x.raid.damage,0,100000000)||!int(x.raid.passes,0,6)||!Number.isFinite(x.raid.updated)||x.raid.updated<0||x.raid.updated>Date.now()+60000)throw Error('Invalid raid.');
 if(x.bestRating!==undefined&&!int(x.bestRating,1150,1000000))throw Error('Invalid best Rating.');
 const daily=x.daily;
 if(!daily||typeof daily.day!=='string'||!Array.isArray(daily.claimed)||['play','win','pack','evolve'].some(k=>!int(daily[k],0,1000000)))throw Error('Invalid tasks.');
 return {...newSave(),welcome:welcome?{packsOpened:welcome.packsOpened,review:[...welcome.review]}:null,name:typeof x.name==='string'?x.name.slice(0,24):'Trainer',collection,team:[...x.team],coins:x.coins,candy:x.candy,rating:x.rating,bestRating:bestRP(x),gym:x.gym,wins:x.wins,played:x.played,discovered:[...new Set([...(Array.isArray(x.discovered)?x.discovered.filter(id=>DEX[id]):[]),...collection.map(p=>p.species)])],daily:{day:daily.day,play:daily.play,win:daily.win,pack:daily.pack,evolve:daily.evolve,claimed:daily.claimed.filter(id=>TASKS.some(t=>t.id===id)),gift:!!daily.gift},raid:validateRaid(x.raid),sound:!!x.sound,started:!!x.started};
}
export function unlocks(s){s.bestRating=bestRP(s);const badges=[];while(s.gym<GYMS.length&&s.rating>=GYMS[s.gym].rating){badges.push(GYMS[s.gym]);s.gym++;}return badges;}
export function addPokemon(s,mon){s.collection.push(mon);if(!s.discovered.includes(mon.species))s.discovered.push(mon.species);}
export function rollPackIV(kind,random=Math.random){
 const silver=kind==='silver';
 if(random()<(silver?.06:.04))return 31;
 // Non-Shiny rolls exclude 31, so the Shiny probability is exactly the stated rate.
 return (silver?16:0)+Math.floor(random()*(silver?15:31));
}
export function openPack(s,kind,random=Math.random){
 if(s.welcome)throw Error('Finish your welcome packs and choose a team first.');
 const cost=kind==='silver'?400:200; const currency=kind==='silver'?'candy':'coins';
 if(s[currency]<cost)throw Error(`You need ${cost} ${currency} for this pack.`);
 return grantPack(s,kind,random,()=>{s[currency]-=cost;});
}
export function claimDaily(s,random=Math.random){
 if(s.welcome)throw Error('Finish your welcome packs and choose a team first.');
 refresh(s);
 if(s.daily.gift)throw Error('You have already claimed today’s discovery.');
 const result=grantPack(s,'poke',random);
 s.daily.gift=true;
 return result;
}
function grantPack(s,kind,random,onGrant=()=>{}){
 if(s.collection.length+5>500)throw Error('Your bag is full. Send spare medallions to the Lab.');
 s.bestRating=bestRP(s);
 const unlocked=packPool(s);
 const starters=unlocked.filter(p=>starterIds.has(p.id));
 const pool=unlocked.filter(p=>!starterIds.has(p.id));
 // One roll for the whole pack. A starter occupies the existing rarity-guaranteed slot.
 const starterHit=starters.length>0&&random()<STARTER_PACK_CHANCE;
 const result=Array.from({length:5},(_,i)=>{
 const candidates=i===4?pool.filter(p=>p.gymRoster&&p.gym===newestPackGym(s)):i===3?(starterHit?starters:pool.filter(p=>p.rarity>=2)):pool;
 const species=candidates[Math.floor(random()*candidates.length)].id;
 return createMedallion(species,rollPackIV(kind,random),random);
 });
 refresh(s);onGrant();result.forEach(p=>addPokemon(s,p));s.daily.pack++;return result;
}
export function evolve(s,uid,random=Math.random){
 const p=s.collection.find(p=>p.uid===uid);if(!p||!DEX[p.species].evolution)throw Error('This Pokémon is fully evolved.');
 const d=DEX[p.species];
 const next=Array.isArray(d.evolution)?d.evolution[Math.floor(random()*d.evolution.length)]:d.evolution;
 const cost=EVOLUTION_COST(d,next);if(s.candy<cost)throw Error(`Evolution needs ${cost} Candy.`);
 const replacement=s.collection.map(x=>x.uid===uid?{...x,species:next}:x);
 const issue=s.team.includes(uid)?validateTeam(s.team,replacement,s.gym):null;if(issue)throw Error(`${issue} Swap this Pokémon out before evolving it.`);
 const powerKey=evolutionPower(p,next,random);refresh(s);s.candy-=cost;p.powerKey=powerKey;p.species=next;s.daily.evolve++;if(!s.discovered.includes(next))s.discovered.push(next);return p;
}

// Only the two welcome packs may include Caterpie before its normal RP unlock.
export function openWelcomePack(s,random=Math.random){
 const w=s.welcome;
 if(!w||w.packsOpened>=2||w.review.length)throw Error('No welcome pack is ready to open.');
 const kind=w.packsOpened===0?'poke':'silver';
 const owned=new Set(s.collection.map(p=>p.species));
 const pool=[...packPool(s),DEX[10]].filter((p,i,all)=>!owned.has(p.id)&&!starterIds.has(p.id)&&all.findIndex(x=>x.id===p.id)===i);
 // Reserve the guaranteed slots in this pack AND the unopened pack, so an early
 // random draw cannot exhaust a later rarity or newest-gym guarantee.
 const slots=Array.from({length:(2-w.packsOpened)*5},(_,i)=>i%5);
 const eligible=(p,slot)=>slot===3?p.rarity>=2:slot===4?p.gymRoster&&p.gym===newestPackGym(s):true;
 function canFill(remaining,available){
  if(!remaining.length)return true;
  const [slot,...rest]=[...remaining].sort((a,b)=>available.filter(p=>eligible(p,a)).length-available.filter(p=>eligible(p,b)).length);
  return available.some(p=>eligible(p,slot)&&canFill(rest,available.filter(x=>x.id!==p.id)));
 }
 const result=[];let available=pool;
 for(let i=0;i<5;i++){
  const candidates=available.filter(p=>eligible(p,slots[i])&&canFill(slots.slice(i+1),available.filter(x=>x.id!==p.id)));
  if(!candidates.length)throw Error('Not enough unique Pokémon for the welcome packs.');
  const d=candidates[Math.floor(random()*candidates.length)];
  result.push(createMedallion(d.id,rollPackIV(kind,random),random));
  available=available.filter(p=>p.id!==d.id);
 }
 refresh(s);result.forEach(p=>addPokemon(s,p));s.daily.pack++;w.packsOpened++;w.review=result.map(p=>p.uid);
 return result;
}
export function finishWelcome(s){
 if(!s.welcome||s.welcome.packsOpened!==2||s.welcome.review.length)throw Error('Open both welcome packs first.');
 const error=validateTeam(s.team,s.collection,s.gym);if(error)throw Error(error);
 s.welcome=null;
}
