import {powerOf,matchesTarget} from './powers.js';
import {DEX} from './data.js';
export const cpOf = p=>DEX[p.species].cp+p.iv;
export const compareBallTierCP=(a,b)=>DEX[a.species].tier-DEX[b.species].tier||cpOf(a)-cpOf(b);
export function makeBattle(team,enemy,mode='ranked',first=0){
 if(mode==='raid'){team=[...team].sort(compareBallTierCP);enemy=[...enemy].sort(compareBallTierCP);}
 return {mode,teams:[team.map(p=>({...p,used:false,powerUsed:false,revealed:false})),enemy.map(p=>({...p,used:false,powerUsed:false,revealed:false}))],score:[0,0],first,initialFirst:first,round:1,fields:[{support:[],entry:[]},{support:[],entry:[]}],arenas:[],log:[],damage:0,finished:false,winner:null,revived:false};
}
export function effectiveBase(b,p,side){return Math.max(0,cpOf(p)+b.arenas.reduce((sum,t)=>sum+(typeof t==='string'?(matchesTarget(t,DEX[p.species])?100:0):(matchesTarget(t.type,DEX[p.species])?t.amount:0)),0)+b.fields[side].support.reduce((s,x)=>s+x.amount,0)-b.fields[side].entry.reduce((s,x)=>s+x.amount,0));}
export function chooseAI(b,random=Math.random,opponentTier=null){
 const candidates=b.teams[1].map((p,i)=>({p,i})).filter(x=>!x.p.used);
 if(!candidates.length)return -1;
 // The AI sees only public tier information, never the committed identity.
 if(random()<.28)return candidates[Math.floor(random()*candidates.length)].i;
 const target=opponentTier===3?1150:opponentTier===2?720:480;
 candidates.sort((a,c)=>Math.abs(effectiveBase(b,a.p,1)-target)-Math.abs(effectiveBase(b,c.p,1)-target));
 return candidates[0].i;
}
export function resolveRound(b,indices,random=Math.random){
 if(b.finished)throw new Error('Battle already finished');
 const p=indices.map((idx,s)=>b.teams[s][idx]);
 if(p.some(x=>!x||x.used))throw new Error('Choose an available medallion');
 const a=p.map(powerOf),d=p.map(x=>DEX[x.species]),events=[],timeline=[];
 const baseCP=p.map(cpOf);let cp=[...baseCP];
 const initiallyReady=p.map(x=>!x.powerUsed),triggered=[new Set(),new Set()];
 const effects=s=>a[s].effects||[a[s]];
 const effect=(s,kind)=>effects(s).find(e=>e.kind===kind);
 const ready=(s,kind)=>initiallyReady[s]&&!triggered[s].has(kind)&&!!effect(s,kind);
 const activate=(s,kind,text,details=effect(s,kind))=>{
  triggered[s].add(kind);p[s].powerUsed=true;
  const message=`${s===0?'Your':'Rival’s'} ${d[s].name} used ${a[s].name}: ${text}`;
  events.push(message);
  timeline.push({...details,phase:kind==='clearance'?'clearance':'power',side:s,kind,name:a[s].name,text:message,cp:[...cp]});
 };
 p.forEach(x=>x.revealed=true);
 // Clearance is the only pre-comparison power. Friendly Support and the rival's field survive.
 for(const s of [b.first,1-b.first])if(ready(s,'clearance')){
  b.fields[s].entry=[];activate(s,'clearance','cleared hazards on its own side.');
 }
 // Snapshot each carried-over effect for presentation, without re-running any game rules in the UI.
 const fieldStep=(side,kind,name,amount,details={})=>{
  cp[side]+=amount;
  timeline.push({...details,phase:'field',side,kind,name,amount,text:`${name}: ${amount>=0?'+':''}${amount} CP`,cp:cp.map(n=>Math.max(0,n))});
 };
 for(const side of [b.first,1-b.first]){
  for(const arena of b.arenas){const target=typeof arena==='string'?arena:arena.type,amount=typeof arena==='string'?100:arena.amount;
   if(matchesTarget(target,d[side]))fieldStep(side,'arena','Active arena',amount,{target});
  }
  for(const f of b.fields[side].support)fieldStep(side,'support',f.name||'Existing Support',f.amount,{turns:f.turns});
  for(const f of b.fields[side].entry)fieldStep(side,'entry',f.name||'Existing hazard',-f.amount,{turns:f.turns});
 }
 cp=cp.map(n=>Math.max(0,n));
 const adjustedCP=[...cp];
 const firstPower=cp[0]===cp[1]?b.first:cp[0]>cp[1]?0:1;
 const powerOrder=[firstPower,1-firstPower];
 timeline.push({phase:'order',side:firstPower,cp:[...cp]});
 // Existing durations tick once per deployment, never restart on Clearance.
 b.fields.forEach(f=>{for(const key of ['support','entry'])f[key]=f[key].map(x=>({...x,turns:x.turns-1})).filter(x=>x.turns>0);});
 let winner=null,protectedRound=false;
 // Priority only wins on the frozen, adjusted-CP comparison (including the choosing-first tie break).
 if(ready(firstPower,'priority')){activate(firstPower,'priority','struck first!');winner=firstPower;}
 if(winner===null){
  // Finish one Pokémon's eligible ordinary effects before the other acts. CP changes never reorder them.
  for(const side of powerOrder){
   if(ready(side,'arena')){const {target:type,amount}=effect(side,'arena');b.arenas.push(amount===100?type:{type,amount});for(let j=0;j<2;j++)if(matchesTarget(type,d[j]))cp[j]=Math.max(0,cp[j]+amount);activate(side,'arena',`${type} arena gives ${amount>=0?'+':''}${amount} CP.`);}
   if(ready(side,'entry')){const e=effect(side,'entry');b.fields[1-side].entry.push({amount:e.amount,turns:e.turns,name:a[side].name});activate(side,'entry',`set a hazard for the next ${e.turns} opponents.`);}
   if(ready(side,'effective')){const e=effects(side).find(e=>e.kind==='effective'&&matchesTarget(e.target,d[1-side]));if(e){cp[side]=Math.floor(cp[side]*e.multiplier);activate(side,'effective',`super effective! ${e.multiplier}× CP.`,e);}}
   if(ready(side,'reveal')){
    const choices=b.teams[1-side].filter((x,i)=>!x.used&&!x.revealed&&i!==indices[1-side]),names=[];
    for(let i=0;i<(effect(side,'reveal').count||1)&&choices.length;i++){const [chosen]=choices.splice(Math.floor(random()*choices.length),1);chosen.revealed=true;names.push(DEX[chosen.species].name);}
    if(names.length)activate(side,'reveal',`revealed ${names.join(' and ')}.`);
   }
   if(ready(side,'support')){const e=effect(side,'support');b.fields[side].support.push({amount:e.amount,turns:e.turns,name:a[side].name});activate(side,'support',`supports the next ${e.turns} friendly Pokémon.`);}
  }
  winner=cp[0]===cp[1]?b.first:cp[0]>cp[1]?0:1;
  const loser=1-winner;
  // Protect retains its established final-loss check and next-turn lead.
  if(ready(loser,'protect')){activate(loser,'protect','protected! Both medallions return.');b.first=loser;protectedRound=true;winner=null;}
 }
 if(!protectedRound){p.forEach(x=>x.used=true);b.score[winner]++;b.first=b.mode==='raid'?1:winner;if(b.mode==='raid'&&winner===0)b.damage+=Math.max(100,cp[0]-cp[1]);}
 const exhausted=b.teams.some(t=>t.every(x=>x.used));
 if(b.mode==='raid'){if(winner===1||exhausted){b.finished=true;b.winner=exhausted&&winner===0?0:1;}}
 else if(b.score.some(x=>x>=3)||exhausted){b.finished=true;b.winner=b.score[0]===b.score[1]?b.initialFirst:b.score[0]>b.score[1]?0:1;}
 const result={indices,baseCP,adjustedCP,powerOrder,cp,winner,protected:protectedRound,events,timeline,round:b.round};
 b.log.push(result);b.round++;return result;
}
export function validateTeam(team,collection,gym=0,{allowLegacyTiers=false}={}){
 if(team.length!==6||new Set(team).size!==6)return 'Choose six different medallions.';
 const roster=team.map(id=>collection.find(p=>p.uid===id));
 if(roster.some(p=>!p))return 'A medallion is missing from your collection.';
 if(new Set(roster.map(p=>DEX[p.species].family)).size<6)return 'Only one Pokémon from each evolution family can join a team.';
 if(roster.filter(p=>DEX[p.species].rarity>=4).length>2)return 'A team can contain at most two Legendary Pokémon.';
 if(!allowLegacyTiers){
 if(roster.filter(p=>DEX[p.species].tier>1).length>Math.min(6,2+Math.floor(gym/2)))return `Your current gym allows ${Math.min(6,2+Math.floor(gym/2))} Great or Ultra medallions.`;
 if(roster.filter(p=>DEX[p.species].tier===1).length<2)return 'Your team needs at least two Poké Ball (red) medallions.';
 if(roster.filter(p=>DEX[p.species].tier===3).length>2)return 'Your team can contain at most two Ultra Ball (yellow) medallions.';
 }
 return null;
}

// Let older saved teams repair the new tier limits one swap at a time.
export function validateTeamEdit(previous,next,collection,gym=0){
 const error=validateTeam(next,collection,gym);
 if(!error)return null;
 if(validateTeam(next,collection,gym,{allowLegacyTiers:true}))return error;
 const violations=ids=>{const tiers=ids.map(id=>DEX[collection.find(p=>p.uid===id).species].tier);return [Math.max(0,tiers.filter(t=>t>1).length-Math.min(6,2+Math.floor(gym/2))),Math.max(0,2-tiers.filter(t=>t===1).length),Math.max(0,tiers.filter(t=>t===3).length-2)];};
 const before=violations(previous),after=violations(next);
 return after.every((v,i)=>v<=before[i])&&after.some((v,i)=>v<before[i])?null:error;
}
