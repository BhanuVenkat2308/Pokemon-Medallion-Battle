import fs from 'node:fs/promises';
import {POKEMON} from '../src/data.js';
const missing=[];
for(const p of POKEMON){try{await fs.access(`public/pokemon/${p.id}.png`);}catch{missing.push(p);}}
let cursor=0;
await Promise.all(Array.from({length:8},async()=>{while(cursor<missing.length){const p=missing[cursor++];const res=await fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`);if(!res.ok)throw Error(`${p.name}: ${res.status}`);const bytes=Buffer.from(await res.arrayBuffer());if(bytes.subarray(1,4).toString()!=='PNG')throw Error(`Invalid artwork: ${p.name}`);await fs.writeFile(`public/pokemon/${p.id}.png`,bytes);}}));
console.log(`Downloaded ${missing.length} official-artwork sprites from PokeAPI.`);
