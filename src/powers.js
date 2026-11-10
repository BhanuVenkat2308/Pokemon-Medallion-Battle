import {RAID_ROSTER} from './raid-roster.js';
import {GYM_ROSTER} from './gym-roster.js';
import {DEX,POKEMON,COUNTERS,POWERS} from './data.js';
import {MOVE_NAMES} from './presentation.js';
// Source: Bulbapedia Pokémon Medallion Battle, researched 2026-10-28.
// Base CP/economy remain recreation balance. Each medallion owns its power key.
const hit=(name,target,multiplier=1.5)=>({name,kind:'effective',target,multiplier});
const effect=(name,kind,amount=100,turns=2,target=null)=>({name,kind,amount,turns,target});
const none={name:'No power',kind:'none'};
const rows={
 1:[hit('Vine Whip','Water')],2:[hit('Power Whip','Water',2),effect('Leech Seed','support')],3:[hit('Solar Beam','Water',2.5),effect('Leech Seed','support')],
 4:[hit('Ember','Grass')],5:[hit('Fire Spin','Grass')],6:[hit('Fire Spin','Grass')],
 7:[hit('Bubble','Fire')],8:[hit('Bubble Beam','Fire',2),effect('Rapid Spin','clearance')],9:[hit('Hydro Pump','Fire',2.5),effect('Rapid Spin','clearance')],
 10:[none],11:[effect('Harden','protect')],12:[effect('Sleep Powder','protect')],
 16:[none],17:[hit('Gust','Grass')],18:[hit('Gust','Grass')],
 172:[hit('Thunder Shock','Colorless')],25:[hit('Volt Tackle','tier1')],26:[hit('Volt Tackle','tier2')],
 35:[hit('Metronome','tier2',2)],36:[hit('Metronome','tier3',2),effect('Moonlight','arena',100,0,'Psychic')],
 37:[hit('Ember','Grass')],38:[hit('Will-O-Wisp','Grass',2)],
 43:[hit('Razor Leaf','Water')],44:[hit('Razor Leaf','Water'),hit('Acid','Grass')],45:[hit('Petal Dance','tier2')],
 52:[hit('Pay Day','tier2',2)],53:[hit('Pay Day','tier3',2)],
 54:[effect('Foresight','reveal')],55:[effect('Foresight','reveal'),hit('Confusion','Fighting')],
 58:[effect('Baton Pass','support',100,1)],59:[effect('Baton Pass','support',100,1),effect('Extreme Speed','priority')],
 66:[none],67:[hit('Cross Chop','Colorless')],68:[hit('Cross Chop','Colorless')],
 74:[none],75:[hit('Rock Throw','Lightning')],76:[hit('Rock Slide','Lightning',2),hit('Magnitude','tier1',2)],
 79:[hit('Confusion','Fighting')],80:[hit('Psychic','Fighting',2)],
 92:[none],93:[hit('Lick','Psychic')],94:[hit('Dream Eater','Fighting',2),effect('Haze','clearance')],
 95:[effect('Stealth Rock','entry',200,1),hit('Earthquake','Lightning',2.5)],
 104:[none],105:[hit('Bonemerang','Lightning',2)],123:[hit('Fury Cutter','Psychic')],
 129:[none],130:[hit('Outrage','tier2')],131:[effect('Rain Dance','arena',50,0,'Water'),hit('Ice Beam','Grass',2)],
 133:[hit('Last Resort','tier1')],134:[effect('Acid Armor','protect')],135:[effect('Quick Attack','priority')],136:[hit('Fire Blast','Grass',2.5)],
 143:[none],147:[none],148:[none],149:[none],144:[hit('Ice Beam','Grass',2)],145:[hit('Thunderbolt','Colorless',2)],146:[hit('Sky Attack','tier3',2)],150:[hit('Psystrike','tier3')],151:[hit('Ancient Power','legendary',2)]
};
// Keep established keys and effects for existing saves; use source powers for added species.
for(const d of GYM_ROSTER)if(!rows[d.id])rows[d.id]=d.powers;
for(const d of RAID_ROSTER)if(!rows[d.id])rows[d.id]=d.powers;
export const SOURCE_SPECIES=Object.keys(rows).map(Number);
export const REGISTRY={};
const legacy={};
for(const d of POKEMON){
 const key=`legacy-${d.id}`;
 legacy[d.id]=key;
 REGISTRY[key]={key,name:MOVE_NAMES[d.id]||rows[d.id]?.[0]?.name||POWERS[d.power].name,kind:d.power,target:d.power==='effective'?COUNTERS[d.type]:d.power==='arena'?d.type:null,multiplier:2,amount:100,turns:2,origin:d.id,legacy:true};
}
export const POWER_OPTIONS=Object.fromEntries(POKEMON.map(d=>[d.id,(rows[d.id]||[REGISTRY[legacy[d.id]]]).map((p,i)=>{
 if(p.legacy)return p.key;
 const key=`${d.id}-${i}`;REGISTRY[key]={...p,key,origin:d.id};return key;
})]));
function descendants(id){const evo=DEX[id].evolution;return [id,...(evo?(Array.isArray(evo)?evo:[evo]).flatMap(descendants):[])];}
// Optional power odds were not published. 25% powerless is an explicit recreation choice.
const optional=new Set([1,4,7,172,25,35,37,43,52,54,58,79,95,123,131,133]);
for(const d of GYM_ROSTER)if(d.optional&&!MOVE_NAMES[d.id])optional.add(d.id);
for(const d of RAID_ROSTER)if(d.optional&&!MOVE_NAMES[d.id])optional.add(d.id);
for(const id of optional){const key=`${id}-none`;REGISTRY[key]={...none,key,origin:id};}
export function acquirePower(species,random=Math.random){
 if(optional.has(species)&&random()<.25)return `${species}-none`;
 return rollPower(species,random);
}
export function validPower(species,key){const a=REGISTRY[key];return !!a&&(POWER_OPTIONS[species].includes(key)||(optional.has(species)&&key===`${species}-none`)||(a.legacy&&descendants(a.origin).includes(species)));}
export function powerOf(p){
 const a=REGISTRY[p.powerKey??legacy[p.species]];
 if(!a?.legacy||a.origin===p.species)return a;
 const stage=POWER_OPTIONS[p.species].map(k=>REGISTRY[k]).find(x=>!x.legacy&&x.kind===a.kind);
 return stage?{...a,name:stage.name}:a;
}
export const legacyPowerKey=species=>legacy[species];
export function rollPower(species,random=Math.random){const options=POWER_OPTIONS[species];return options[Math.min(options.length-1,Math.floor(random()*options.length))];}
export function evolutionPower(p,next,random=Math.random){
 const old=powerOf(p),options=POWER_OPTIONS[next].map(k=>REGISTRY[k]);
 if(Array.isArray(DEX[p.species].evolution)||old.kind==='none')return rollPower(next,random);
 // Old saves keep the exact existing effect, including targets and amounts.
 if(old.legacy)return old.key;
 const matching=options.filter(a=>a.kind===old.kind||(a.effects||[]).some(e=>e.kind===old.kind));
 const match=matching.find(a=>a.name===old.name&&a.target===old.target)||matching.find(a=>a.target===old.target)||matching[0];
 // The source explicitly changes Kakuna’s Harden to Beedrill’s Agility.
 if(!match&&((p.species===14&&next===15)||DEX[next].raidRoster))return options[0].key;
 if(!match)throw Error('No consistent evolution power is configured.');
 return match.key;
}
export function displayPokemon(p){const a=powerOf(p);return {...DEX[p.species],power:a.kind,moveName:a.name,ability:a};}
export const targetName=t=>t==='fossil'?'Fossil':t?.startsWith('not-')?'non-'+t.slice(4).replaceAll(',', ' / '):({tier1:'Poké tier',tier2:'Great tier',tier3:'Ultra tier',legendary:'Legendary'}[t]||t);
export function matchesTarget(target,d){return target==='fossil'?[138,139,140,141,142,345,346,347,348,408,409,410,411,564,565,566,567,696,697,698,699].includes(d.id):target?.startsWith('not-')?!target.slice(4).split(',').includes(d.type):target==='legendary'?d.rarity>=4:target?.startsWith('tier')?d.tier===Number(target.slice(4)):d.type===target;}
export function powerText(a){
 if(a.effects)return a.effects.map(e=>powerText(e)).join(' ');
 if(a.kind==='reveal')return `Reveals ${a.count||1} random opposing benched Pokémon. Activates once per match.`;
 if(a.kind==='none')return 'No automatic power. Battles using its CP.';
 if(a.kind==='effective')return `${a.multiplier}× CP against ${targetName(a.target)} Pokémon. Activates once per match.`;
 if(a.kind==='support')return `Your next ${a.turns} deployed Pokémon gain ${a.amount} CP. Activates once per match.`;
 if(a.kind==='entry')return `Your opponent’s next ${a.turns} deployed Pokémon lose ${a.amount} CP. Activates once per match.`;
 if(a.kind==='arena')return `All ${targetName(a.target)} Pokémon ${a.amount<0?'lose':'gain'} ${Math.abs(a.amount)} CP for the rest of this match.`;
 return POWERS[a.kind].text;
}
export function evolutionPreview(p){const d=DEX[p.species];if(!d.evolution)return '';
 const ids=Array.isArray(d.evolution)?d.evolution:[d.evolution];return ids.map(id=>{
 const options=(Array.isArray(d.evolution)||powerOf(p).kind==='none')?POWER_OPTIONS[id]:[evolutionPower(p,id,()=>0)];
 return `${DEX[id].name}: ${options.map(k=>{const a=powerOf({...p,species:id,powerKey:k});return a.name+(a.kind==='effective'?` (vs ${targetName(a.target)})`:` (${POWERS[a.kind].name})`);}).join(' or ')}`;
 }).join(' · ');
}
