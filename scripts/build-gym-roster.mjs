import fs from 'node:fs';
import {POKEMON} from '../src/data.js';
const groups=JSON.parse(fs.readFileSync('docs/gym-source.json','utf8'));
const specialGym=i=>i<63?1+Math.floor(i/9):i<65?8:i<74?9:10;
const target=i=>i.alt||`tier${i.src.match(/Tier_(\d)/)[1]}`;
function power(name,cell){
 name=name.replace(/\s*\(100%\)/,'');
 const text=cell.text,targets=cell.images.map(target),effects=[];
 if(/×|Halves/.test(text))for(const t of targets.length?targets:['legendary'])effects.push({kind:'effective',target:t,multiplier:/Halves/.test(text)?.5:Number(text.match(/([\d.]+)×/)[1])});
 if(/Fights before/.test(text))effects.push({kind:'priority'});
 if(/protected/.test(text))effects.push({kind:'protect'});
 if(/reveal/i.test(text))effects.push({kind:'reveal',count:Number(text.match(/(?:Reveals?|reveals?) (\d)/)[1])});
 if(/Clears/.test(text))effects.push({kind:'clearance'});
 if(/next/.test(text)){effects.push({kind:/opponent/.test(text)?'entry':'support',turns:Number(text.match(/next (\d)/)?.[1]||1),amount:Number(text.match(/[-+]?([\d]+) CP/)[1])});}
 else if(/get \+/.test(text))effects.push({kind:'arena',target:targets[0],amount:Number(text.match(/\+(\d+)/)[1])});
 if(!effects.length)throw Error(name+': '+text);
 // The first effect drives the compact badge; all components resolve together.
 return {...effects[0],name,...(effects.length>1?{effects}:{} )};
}
const roster=groups.flatMap((g,gi)=>g.rows.map((r,i)=>{
 const id=Number(r[0].images[0].src.match(/\/(\d{4})[^/]+\.png/)[1]);
 const powers=[6,8].filter(i=>r[i]?.text).map(i=>power(r[i].text,r[i+1]));
 return {id,name:r[1].text,type:r[3].images[0].alt,cp:Number(r[5].text),tier:Number(r[4].images[0].src.match(/Tier_(\d)/)[1]),rarity:r[2].text.length,gym:gi===0?specialGym(i):gi-1,powers:powers.length?powers:[{name:'No power',kind:'none'}],optional:powers.length>0&&!r.some(c=>c.text.includes('(100%)'))};
}));
const chains=`1,2,3;4,5,6;7,8,9;152,153,154;155,156,157;158,159,160;252,253,254;255,256,257;258,259,260;387,388,389;390,391,392;393,394,395;495,496,497;498,499,500;501,502,503;650,651,652;653,654,655;656,657,658;722,723,724;725,726,727;728,729,730;52,53;133,134;133,135;133,136;133,196;133,197;133,470;133,471;133,700;16,17,18;21,22;659,660;54,55;129,130;10,11,12;13,14,15;187,188,189;43,44,45;44,182;102,103;77,78;661,662,663;667,668;37,38;218,219;116,117,230;90,91;349,350;81,82,462;694,695;309,310;172,25,26;66,67,68;104,105;95,208;453,454;447,448;46,47;92,93,94;577,578,579;79,80;79,199;755,756;401,402;111,112,464;177,178;147,148,149;216,217;204,205;231,232;522,523;194,195;60,61,62;61,186;200,429;580,581;757,758;58,59;173,35,36;440,113;298,183,184;285,286;280,281,282;281,475`.split(';').map(s=>s.split(',').map(Number));
const byId=Object.fromEntries(roster.map(p=>[p.id,p]));
for(const p of roster){p.evolution=null;p.family=POKEMON.find(d=>d.id===p.id)?.family||`family-${p.id}`;}
for(const chain of chains)for(let i=0;i<chain.length-1;i++){const p=byId[chain[i]],next=chain[i+1];if(!p||!byId[next])throw Error('Missing evolution '+chain);const ids=[...new Set([...(p.evolution?(Array.isArray(p.evolution)?p.evolution:[p.evolution]):[]),next])];p.evolution=ids.length===1?ids[0]:ids;}
// Propagate each root family, preserving existing family identifiers.
const evolved=new Set(chains.flatMap(c=>c.slice(1)));
function family(p,key){p.family=key;for(const id of p.evolution?(Array.isArray(p.evolution)?p.evolution:[p.evolution]):[])family(byId[id],key);}
for(const root of roster.filter(p=>!evolved.has(p.id))){const old=POKEMON.find(p=>p.id===root.id)||POKEMON.find(p=>chains.some(c=>c[0]===root.id&&c.includes(p.id)));family(root,old?.family||root.family);}
if(roster.length!==217||new Set(roster.map(p=>p.id)).size!==217)throw Error('Invalid roster');
fs.writeFileSync('src/gym-roster.js',`// Source: Bulbapedia Pokémon Medallion Battle. Generated from docs/gym-source.json.\n// Special groups 1–10 merge into gyms 2–11; gym indices are zero-based.\nexport const GYM_ROSTER = ${JSON.stringify(roster,null,1)};\n`);
console.log({species:roster.length,new:roster.filter(p=>!POKEMON.some(d=>d.id===p.id)).length,gyms:Array.from({length:11},(_,i)=>roster.filter(p=>p.gym===i).length)});
