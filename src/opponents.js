import {POKEMON,DEX,RAID_BOSSES} from './data.js';
import {cpOf,validateTeam,compareBallTierCP} from './engine.js';
import {createMedallion} from './state.js';

export function generateOpponent(playerTeam,{mode='ranked',gym=0,stage=1,random=Math.random}={}){
 const pool=POKEMON.filter(d=>d.rarity<4&&!d.raidRoster&&(d.gymRoster?d.gym<=Math.min(10,gym):d.gym<=Math.max(1,gym)));
 const selected=[];
 // Reserve the boss before filling the team: it consumes a family and tier slot.
 if(mode==='raid')selected.push(DEX[RAID_BOSSES[(stage-1)%RAID_BOSSES.length]]);
 const higherLimit=Math.min(4,2+Math.floor(gym/2));
 let index=0;
 while(selected.length<6){
  const reds=selected.filter(d=>d.tier===1).length;
  const higher=selected.filter(d=>d.tier>1).length;
  const ultras=selected.filter(d=>d.tier===3).length;
  const families=new Set(selected.map(d=>d.family));
  // Fill the mandatory red slots first, then choose from the remaining legal tiers.
  const candidates=pool.filter(d=>!families.has(d.family)&&(reds>=2||d.tier===1)&&(d.tier===1||higher<higherLimit)&&(d.tier!==3||ultras<2));
  const target=cpOf(playerTeam[index++])+(mode==='raid'?Math.min(stage*22,300):-35);
  candidates.sort((a,b)=>Math.abs(a.cp-target)-Math.abs(b.cp-target));
  if(!candidates.length)throw Error('Unable to build a legal opponent team.');
  selected.push(candidates[Math.floor(random()*Math.min(5,candidates.length))]);
 }
 const result=selected.map((d,i)=>createMedallion(d.id,mode==='raid'&&i===0?16:Math.floor(random()*32),random));
 const issue=validateTeam(result.map(p=>p.uid),result,gym);
 if(issue)throw Error(`Invalid opponent team: ${issue}`);
 return result.sort(mode==='raid'?compareBallTierCP:(a,b)=>cpOf(a)-cpOf(b));
}
