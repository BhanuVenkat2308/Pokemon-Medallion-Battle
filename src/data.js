import {assetUrl} from './assets.js';
import {EXPEDITIONS} from './raid-config.js';
import {RAID_ROSTER} from './raid-roster.js';
import {GYM_ROSTER} from './gym-roster.js';
// Curated roster. Base CP follows the researched species tables; nine unlisted species retain recreation values.
const rows = [
 [1,'Bulbasaur','Grass',450,1,3,'effective',2,0,'bulba'],[2,'Ivysaur','Grass',650,2,3,'support',3,0,'bulba'],[3,'Venusaur','Grass',1150,3,3,'effective',null,0,'bulba'],
 [4,'Charmander','Fire',450,1,3,'effective',5,0,'char'],[5,'Charmeleon','Fire',750,2,3,'entry',6,0,'char'],[6,'Charizard','Fire',1250,3,3,'effective',null,0,'char'],
 [7,'Squirtle','Water',450,1,3,'effective',8,0,'squirt'],[8,'Wartortle','Water',650,2,3,'clearance',9,0,'squirt'],[9,'Blastoise','Water',1150,3,3,'effective',null,0,'squirt'],
 [10,'Caterpie','Grass',150,1,1,'support',11,0,'cat'],[11,'Metapod','Grass',250,1,1,'protect',12,0,'cat'],[12,'Butterfree','Grass',550,2,1,'reveal',null,0,'cat'],
 [16,'Pidgey','Colorless',150,1,1,'priority',17,0,'pidge'],[17,'Pidgeotto','Colorless',400,1,1,'priority',18,0,'pidge'],[18,'Pidgeot','Colorless',650,2,1,'priority',null,0,'pidge'],
 [19,'Rattata','Colorless',300,1,1,'priority',20,0,'rat'],[20,'Raticate','Colorless',600,2,1,'effective',null,0,'rat'],
 [172,'Pichu','Lightning',150,1,3,'effective',25,0,'pika'],
 [25,'Pikachu','Lightning',300,1,3,'effective',26,0,'pika'],[26,'Raichu','Lightning',550,2,3,'arena',null,0,'pika'],
 [27,'Sandshrew','Fighting',350,1,1,'entry',28,0,'sand'],[28,'Sandslash','Fighting',600,2,1,'entry',null,0,'sand'],
 [35,'Clefairy','Colorless',250,1,2,'support',36,1,'clef'],[36,'Clefable','Colorless',500,2,2,'protect',null,1,'clef'],
 [37,'Vulpix','Fire',250,1,2,'effective',38,2,'vulp'],[38,'Ninetales','Fire',650,2,2,'arena',null,2,'vulp'],
 [39,'Jigglypuff','Colorless',350,1,2,'protect',40,0,'jigg'],[40,'Wigglytuff','Colorless',650,2,2,'support',null,0,'jigg'],
 [43,'Oddish','Grass',200,1,2,'entry',44,1,'odd'],[44,'Gloom','Grass',450,1,2,'entry',45,1,'odd'],[45,'Vileplume','Grass',500,2,2,'arena',null,1,'odd'],
 [52,'Meowth','Colorless',300,1,3,'reveal',53,1,'meow'],[53,'Persian','Colorless',550,2,3,'priority',null,1,'meow'],
 [54,'Psyduck','Water',250,1,2,'reveal',55,0,'duck'],[55,'Golduck','Water',450,1,2,'effective',null,0,'duck'],
 [58,'Growlithe','Fire',400,1,3,'support',59,2,'grow'],[59,'Arcanine','Fire',650,2,3,'priority',null,2,'grow'],
 [63,'Abra','Psychic',300,1,2,'protect',64,1,'abra'],[64,'Kadabra','Psychic',650,2,2,'reveal',65,1,'abra'],[65,'Alakazam','Psychic',1150,3,2,'effective',null,1,'abra'],
 [66,'Machop','Fighting',150,1,1,'effective',67,3,'mach'],[67,'Machoke','Fighting',450,1,1,'support',68,3,'mach'],[68,'Machamp','Fighting',1100,3,1,'effective',null,3,'mach'],
 [74,'Geodude','Fighting',200,1,2,'protect',75,1,'geo'],[75,'Graveler','Fighting',450,1,2,'entry',76,1,'geo'],[76,'Golem','Fighting',650,2,2,'entry',null,1,'geo'],
 [79,'Slowpoke','Psychic',250,1,2,'support',80,3,'slow'],[80,'Slowbro','Psychic',650,2,2,'protect',null,3,'slow'],
 [92,'Gastly','Psychic',150,1,1,'entry',93,4,'gast'],[93,'Haunter','Psychic',400,1,1,'effective',94,4,'gast'],[94,'Gengar','Psychic',1100,3,1,'clearance',null,4,'gast'],
 [95,'Onix','Fighting',550,2,2,'entry',null,2,'onix'],[104,'Cubone','Fighting',200,1,1,'effective',105,2,'cubo'],[105,'Marowak','Fighting',400,1,1,'effective',null,2,'cubo'],
 [123,'Scyther','Grass',450,1,2,'priority',null,4,'scyth'],[129,'Magikarp','Water',50,1,2,'protect',130,0,'magi'],[130,'Gyarados','Water',500,2,2,'effective',null,0,'magi'],
 [131,'Lapras','Water',650,2,3,'support',null,3,'lap'],[133,'Eevee','Colorless',300,1,3,'reveal',[134,135,136],0,'eevee'],[134,'Vaporeon','Water',650,2,3,'protect',null,0,'eevee'],[135,'Jolteon','Lightning',650,2,3,'priority',null,0,'eevee'],[136,'Flareon','Fire',650,2,3,'effective',null,0,'eevee'],
 [143,'Snorlax','Colorless',700,2,3,'protect',null,5,'snor'],[147,'Dratini','Colorless',250,1,3,'support',148,4,'drat'],[148,'Dragonair','Colorless',500,1,3,'arena',149,4,'drat'],[149,'Dragonite','Colorless',1300,3,3,'priority',null,4,'drat'],
 [144,'Articuno','Water',1250,3,4,'effective',null,0,'arti'],[145,'Zapdos','Lightning',1200,3,4,'arena',null,0,'zap'],[146,'Moltres','Fire',650,3,4,'entry',null,0,'molt'],[150,'Mewtwo','Psychic',900,3,4,'effective',null,0,'mewtwo'],[151,'Mew','Psychic',1100,3,5,'reveal',null,0,'mew']
];
const existing = rows.map(([id,name,type,cp,tier,rarity,power,evolution,gym,family])=>({id,name,type,cp,tier,rarity,power,evolution,gym,family}));
const existingById=Object.fromEntries(existing.map(p=>[p.id,p]));
const ordinaryRoster=[...GYM_ROSTER.map(({powers,optional,...p})=>({...p,power:existingById[p.id]?.power||powers[0].kind,gymRoster:true})),...existing.filter(p=>!GYM_ROSTER.some(d=>d.id===p.id))].sort((a,b)=>a.id-b.id);
// Preserve the original ordinary-pack eligibility, including its existing legends.
const ordinaryEvolved=new Set(ordinaryRoster.flatMap(p=>[p.evolution].flat().filter(Boolean)));
const ordinaryPackIds=new Set(ordinaryRoster.filter(p=>!ordinaryEvolved.has(p.id)).map(p=>p.id));
export const POKEMON=[...ordinaryRoster.map(p=>{const raid=RAID_ROSTER.find(r=>r.id===p.id);return raid?{...p,evolution:raid.evolution??p.evolution}:p;}),...RAID_ROSTER.filter(p=>!ordinaryRoster.some(d=>d.id===p.id)).map(({powers,optional,...p})=>({...p,power:powers[0].kind}))].sort((a,b)=>a.id-b.id);
for(const raid of RAID_ROSTER){const previous=ordinaryRoster.find(p=>RAID_ROSTER.some(r=>r.id===p.id&&r.family===raid.family));if(previous)POKEMON.find(p=>p.id===raid.id).family=previous.family;}
export const DEX = Object.fromEntries(POKEMON.map(p=>[p.id,p]));
const evolvedSpecies=new Set(POKEMON.flatMap(p=>p.evolution?(Array.isArray(p.evolution)?p.evolution:[p.evolution]):[]));
export const BASE_POKEMON=POKEMON.filter(p=>!evolvedSpecies.has(p.id)&&p.rarity<4);
const FAMILY_RP={clef:1200,odd:1200,meow:1200,geo:1200,vulp:1400,grow:1400,abra:1400,mach:1800,onix:1800,slow:1800,cubo:1800,gast:2200,scyth:2600,lap:2600,drat:2600,snor:3000,arti:3600,zap:3600,molt:3600,mewtwo:3600,mew:3600};
export const GYM_UNLOCK_RP=[1150,1200,1400,1600,1800,2200,2600,3000,3600,4200,5000];
export const unlockRP=p=>p.raidRoster?Infinity:p.gymRoster?GYM_UNLOCK_RP[p.gym]:FAMILY_RP[p.family]||1150;
export const PACK_POKEMON=POKEMON.filter(p=>ordinaryPackIds.has(p.id));
const collectible=new Set([...PACK_POKEMON.map(p=>p.id),...EXPEDITIONS.flatMap(r=>[r.boss,...r.pool])]);
for(let pass=0;pass<4;pass++)for(const id of [...collectible])for(const next of [DEX[id].evolution].flat().filter(Boolean))collectible.add(next);
for(const p of POKEMON)p.enemyOnly=!collectible.has(p.id);
export const RP_MILESTONES=[...new Set(PACK_POKEMON.map(unlockRP))].sort((a,b)=>a-b);
export const TYPES = ['Grass','Fire','Water','Lightning','Fighting','Psychic','Colorless'];
export const COLORS = {Grass:'#70a16e',Fire:'#e88660',Water:'#69a7c1',Lightning:'#d8b24c',Fighting:'#bb9577',Psychic:'#b58aac',Colorless:'#a6aaa0'};
export const SYMBOLS = {Grass:'♧',Fire:'♨',Water:'◈',Lightning:'ϟ',Fighting:'◆',Psychic:'◎',Colorless:'✧'};
export const COUNTERS = {Grass:'Water',Fire:'Grass',Water:'Fire',Lightning:'Water',Fighting:'Lightning',Psychic:'Fighting',Colorless:'Psychic'};
export const POWERS = {
 none:{name:'No power',icon:'',text:'Battles using its CP.'},
 effective:{name:'Super Effective',icon:'ϟ',text:'Doubles CP against its target type. Activates once per match.'},
 support:{name:'Support',icon:'+',text:'Your next two deployed Pokémon gain 100 CP.'},
 entry:{name:'Entry Hazard',icon:'↓',text:'Your opponent’s next two deployed Pokémon lose 100 CP.'},
 priority:{name:'Priority',icon:'»',text:'Wins immediately if higher in adjusted CP, or tied and choosing first, after Clearance and existing field effects.'},
 protect:{name:'Protect',icon:'◇',text:'Prevents a loss once. Both medallions return; you lead the next turn.'},
 reveal:{name:'Reveal',icon:'◉',text:'Reveals a random medallion on the opposing bench.'},
 arena:{name:'Arena',icon:'⌁',text:'All Pokémon of this type gain 100 CP for the rest of this match.'},
 clearance:{name:'Clearance',icon:'≋',text:'Removes hazards on its own side before CP is compared. Friendly Support and the opponent’s hazards remain.'}
};
export const GYMS = [
 ['Trainer Town','Your adventure starts here.',1200,'Colorless'],['Greenwood Grove','Find your footing among the leaves.',1400,'Grass'],['Scorchfire Summit','A spark becomes a flame.',1600,'Fire'],['Clearwater Coast','Turn the tide in your favor.',1800,'Water'],['Power Plant','Bring a little more energy.',2200,'Lightning'],['Dustrock Dojo','Strength comes from balance.',2600,'Fighting'],['Shadowmoss Shrine','Trust your intuition.',3000,'Psychic'],['Dragon’s Den','Fortune favors the fearless.',3600,'Colorless'],['Silverglade Safari','Take the path less traveled.',4200,'Grass'],['Mistwreath Mountains','Rise above the clouds.',5000,'Water'],['Mooncrest Meadow','One final step toward greatness.',6000,'Psychic']
].map(([name,description,rating,type],id)=>({id,name,description,rating,type}));
export const RAID_BOSSES = [144,145,146,150,151];
export const TASKS = [{id:'play',label:'A little friendly competition',detail:'Play 3 battles',goal:3,coins:100,candy:20},{id:'win',label:'Make your mark',detail:'Win 2 battles',goal:2,coins:120,candy:20},{id:'pack',label:'A new friend awaits',detail:'Open a pack',goal:1,coins:80,candy:15},{id:'evolve',label:'Growing together',detail:'Evolve a Pokémon',goal:1,coins:150,candy:30}];
export const ART = id=>assetUrl(`pokemon/${id}.png`);
// Approved Candy schedule, charged against the selected destination.
export const EVOLUTION_COST = (p,destination)=>{
 if(!p.evolution)return 0;
 const next=DEX[destination??(Array.isArray(p.evolution)?p.evolution[0]:p.evolution)];
 if(next.tier===3)return 800;
 if(next.tier===2)return ({1:200,2:300,3:400})[p.rarity];
 return p.rarity===1?100:200;
};
