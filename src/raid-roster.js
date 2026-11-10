// Verified against Bulbapedia's obtainable raid Pokémon tables, 2026-11-03.
// Compact rows: id|name|type|CP|tier|rarity|evolution|power specifications.
// Custom additions are explicitly marked below; they are not source-game claims.
const hit=(name,target,multiplier=1.5)=>({name,kind:'effective',target,multiplier});
function parsePower(spec){
 if(!spec)return {name:'No power',kind:'none'};
 const [name,kind,target,value,turns]=spec.split(':');
 if(kind==='hit'){const effects=target.split(',').map(t=>hit(name,t,Number(value||1.5)));return {...effects[0],...(effects.length>1?{effects}:{})};}
 if(kind==='arena')return {name,kind,target,amount:Number(value)};
 if(kind==='support'||kind==='entry')return {name,kind,amount:Number(target),turns:Number(value||2)};
 if(kind==='dual'){const effects=target.split(',').map(k=>k==='hit'?hit(name,value,Number(turns||1.5)):{kind:k});return {...effects[0],name,effects};}
 return {name,kind,count:1};
}
const source=`
41|Zubat|Psychic|200|1|2|42|
42|Golbat|Psychic|400|1|2|169|Poison Fang:hit:Grass:2
169|Crobat|Psychic|600|2|2||Cross Poison:hit:Grass:2.5;Quick Attack:priority
74|Geodude|Fighting|200|1|2|75|
75|Graveler|Fighting|450|1|2|76|Rock Throw:hit:Lightning
76|Golem|Fighting|650|2|2||Rock Slide:hit:Lightning:2;Magnitude:hit:tier1:2
88|Grimer|Psychic|300|1|2|89|Harden:protect
89|Muk|Psychic|600|2|2||Harden:protect;Haze:clearance
120|Staryu|Water|250|1|2|121|Water Gun:hit:Fire
121|Starmie|Water|350|1|2||Hydro Pump:hit:Fire:2.5;Rapid Spin:clearance
123|Scyther|Grass|450|1|2|212|Fury Cutter:hit:Psychic
212|Scizor|Grass|500|2|2||Bullet Punch:dual:priority,hit:tier2:1.5
124|Jynx|Water|400|1|2||Ice Punch:hit:Grass:2;Lovely Kiss:protect
239|Elekid|Lightning|150|1|3|125|
125|Electabuzz|Lightning|400|1|3|466|Thunder Punch:hit:Water:2
466|Electivire|Lightning|1150|3|3||Thunder Punch:hit:Water:2;Electric Terrain:arena:Lightning:50
137|Porygon|Colorless|250|1|3|233|Psybeam:hit:Fighting
233|Porygon2|Colorless|450|1|3|474|Psybeam:hit:Fighting
474|Porygon-Z|Colorless|1200|3|3||Conversion:hit:Fighting,Lightning
138|Omanyte|Water|350|1|2|139|Withdraw:protect
139|Omastar|Water|600|2|2||Withdraw:protect;Haze:clearance
140|Kabuto|Fighting|350|1|2|141|Aqua Jet:priority
141|Kabutops|Fighting|600|2|2||Aqua Jet:priority;Night Slash:hit:Psychic:2.5
142|Aerodactyl|Fighting|550|2|3||Take Down:hit:tier2;Prehistoric Call:arena:fossil:50
144|Articuno|Water|1250|3|4||Ice Beam:hit:Grass:2
145|Zapdos|Lightning|1200|3|4||Thunderbolt:hit:Colorless:2
146|Moltres|Fire|650|3|4||Sky Attack:hit:tier3:2
150|Mewtwo|Psychic|900|3|4||Psystrike:hit:tier3
151|Mew|Psychic|1100|3|5||Ancient Power:hit:legendary:2
167|Spinarak|Grass|250|1|2|168|Sticky Web:entry:50:2
168|Ariados|Grass|400|1|2||Sticky Web:entry:50:2;Poison Jab:hit:Grass:2
175|Togepi|Psychic|150|1|3|176|
176|Togetic|Psychic|400|1|3|468|Aerial Ace:dual:hit,reveal:Grass:1.5
468|Togekiss|Psychic|700|2|3||Aerial Ace:dual:hit,reveal:Grass:1.5
179|Mareep|Lightning|250|1|3|180|
180|Flaaffy|Lightning|400|1|3|181|Discharge:protect
181|Ampharos|Lightning|1100|3|3||Discharge:protect;Ion Deluge:priority
190|Aipom|Colorless|200|1|2|424|Double Hit:hit:tier1:2
424|Ambipom|Colorless|400|2|2||Double Hit:hit:tier2:2
202|Wobbuffet|Psychic|600|2|2||Mirror Coat:hit:Psychic:2.5;Counter:hit:Fighting:2.5
207|Gligar|Fighting|250|1|2|472|Fury Cutter:hit:Psychic
472|Gliscor|Fighting|700|2|2||Fury Cutter:hit:Psychic;Acrobatics:hit:Grass
215|Sneasel|Water|300|1|3|461|Ice Shard:priority
461|Weavile|Water|400|1|3||Ice Shard:priority;Beat Up:hit:tier2
225|Delibird|Water|400|1|2||Present:support:100:1
227|Skarmory|Colorless|600|2|2||Spikes:entry:100:2
228|Houndour|Fire|200|1|2|229|Fire Fang:hit:Grass:2
229|Houndoom|Fire|700|2|2||Fire Fang:hit:Grass:2;Crunch:hit:Psychic:2
243|Raikou|Lightning|750|2|4||Rain Dance:arena:Water:50
244|Entei|Fire|600|2|4||Flare Blitz:hit:tier2
245|Suicune|Water|700|2|4||Haze:clearance
246|Larvitar|Fighting|250|1|3|247|
247|Pupitar|Fighting|400|1|3|248|Crunch:hit:Psychic:2
248|Tyranitar|Fighting|1150|3|3||Dark Pulse:hit:Psychic:2.5;Sandstorm:arena:not-Fighting,Colorless:-100
249|Lugia|Colorless|1250|3|5||Pressure:arena:tier2:-100
250|Ho-Oh|Fire|1200|3|5||Sacred Fire:hit:Grass,Water:2
251|Celebi|Grass|650|2|4||Heal Bell:support:100:2
270|Lotad|Water|200|1|2|271|
271|Lombre|Water|400|1|2|272|Zen Headbutt:hit:Fighting:2
272|Ludicolo|Water|600|2|2||Zen Headbutt:hit:Fighting:2;Grass Knot:hit:tier1:2
278|Wingull|Water|250|1|2|279|Air Cutter:hit:Grass
279|Pelipper|Water|400|1|2||Air Slash:hit:Grass:2
287|Slakoth|Colorless|550|1|2|288|Slack Off:hit:tier1:0.5
288|Vigoroth|Colorless|200|1|2|289|Uproar:hit:tier1:2.5
289|Slaking|Colorless|1100|2|2||Slack Off:hit:tier2:0.5
302|Sableye|Colorless|350|1|2||Dark Pulse:hit:Psychic:2.5;Protect:protect
304|Aron|Colorless|200|1|2|305|
305|Lairon|Colorless|350|1|2|306|Take Down:hit:tier1
306|Aggron|Colorless|550|2|2||Take Down:hit:tier2;Heavy Slam:hit:tier1:2.5
307|Meditite|Psychic|250|1|2|308|Thunder Punch:hit:Water:2
308|Medicham|Psychic|650|2|2||Thunder Punch:hit:Water:2;Ice Punch:hit:Grass:2
318|Carvanha|Water|250|1|3|319|Ice Fang:dual:priority,protect
319|Sharpedo|Water|600|2|3||Ice Fang:dual:priority,protect
320|Wailmer|Water|250|1|2|321|Dive:dual:hit,protect:Fire:1.5
321|Wailord|Water|600|2|2||Dive:dual:hit,protect:Fire:1.5
322|Numel|Fire|250|1|2|323|Bulldoze:hit:Lightning
323|Camerupt|Fire|650|2|2||Earth Power:hit:Lightning:2
324|Torkoal|Fire|600|2|2||Eruption:hit:Grass:2.5;Rapid Spin:clearance
333|Swablu|Colorless|250|1|2|334|Peck:hit:Grass
334|Altaria|Colorless|600|2|2||Fly:dual:hit,protect:Grass:1.5
343|Baltoy|Fighting|400|1|3|344|Earth Power:hit:Lightning:2
344|Claydol|Fighting|650|2|3||Earthquake:hit:Lightning:2.5;Rapid Spin:clearance
345|Lileep|Grass|250|1|2|346|Energy Ball:hit:Water:2;Synthesis:support:50:2
346|Cradily|Grass|400|1|2||Energy Ball:hit:Water:2;Synthesis:support:50:2
347|Anorith|Grass|250|1|2|348|X-Scissor:hit:Psychic:2
348|Armaldo|Grass|400|1|2||X-Scissor:hit:Psychic:2;Brine:hit:Fire:2
355|Duskull|Psychic|250|1|3|356|Shadow Punch:hit:Fighting:2
356|Dusclops|Psychic|450|1|3|477|Shadow Punch:hit:Fighting:2
477|Dusknoir|Psychic|1200|3|3||Shadow Punch:hit:Fighting:2;Thunder Punch:hit:Water:2
361|Snorunt|Water|250|1|2|362,478|Icy Wind:hit:Grass
362|Glalie|Water|700|2|2||Frost Breath:hit:Grass
478|Froslass|Psychic|700|2|2||Hex:hit:Fighting
371|Bagon|Colorless|250|1|3|372|
372|Shelgon|Colorless|450|1|3|373|Flamethrower:hit:Grass:2
373|Salamence|Colorless|1150|3|3||Flame Blast:hit:Grass:2.5;Draco Meteor:hit:Colorless:2.5
374|Beldum|Colorless|250|1|3|375|
375|Metang|Colorless|550|1|3|376|Iron Defense:hit:Fire:0.5
376|Metagross|Colorless|1400|3|3||Iron Defense:hit:Fire:0.5
377|Regirock|Fighting|700|2|4||Hammer Arm:hit:Colorless:2.5
378|Regice|Water|700|2|4||Charge Beam:hit:Colorless,Water:2
379|Registeel|Colorless|800|2|4||Iron Defense:hit:Fire:0.5
382|Kyogre|Water|1250|3|4||Origin Pulse:hit:Fire:2
383|Groudon|Fighting|1150|3|4||Precipice Blades:hit:Lightning,Grass:2.5
384|Rayquaza|Colorless|1100|3|5||Dragon Ascent:dual:priority,protect
385|Jirachi|Colorless|650|2|5||Wish:support:200:1
386|Deoxys|Psychic|1150|3|4||Psycho Boost:hit:Fighting,Psychic:2.5
408|Cranidos|Fighting|250|1|2|409|Head Smash:hit:tier1:2
409|Rampardos|Fighting|400|2|2||Head Smash:hit:tier2:2
410|Shieldon|Colorless|350|1|2|411|Protect:protect
411|Bastiodon|Colorless|500|2|2||Metal Burst:dual:hit,protect:tier2:1.5
436|Bronzor|Psychic|250|1|2|437|Confusion:hit:Fighting
437|Bronzong|Psychic|650|2|2||Extrasensory:dual:hit,reveal:Fighting:2
443|Gible|Fighting|150|1|3|444|Mud Slap:hit:Lightning
444|Gabite|Fighting|350|1|3|445|Dig:dual:hit,protect:Lightning:1.5
445|Garchomp|Fighting|800|3|3||Dragon Rush:dual:priority,hit:tier3:1.5
564|Tirtouga|Water|250|1|2|565|Bite:hit:Psychic
565|Carracosta|Water|450|1|2||Bite:hit:Psychic;Smack Down:hit:Colorless
566|Archen|Fighting|250|1|2|567|Rock Throw:hit:Lightning
567|Archeops|Fighting|450|1|2||Rock Throw:hit:Lightning;Acrobatics:hit:Grass
594|Alomomola|Water|650|2|3||Aqua Ring:support:50:3
636|Larvesta|Fire|250|1|2|637|Flame Wheel:hit:Grass
637|Volcarona|Fire|450|1|2||Fiery Dance:hit:Grass;Absorb:hit:Water
646|Kyurem|Water|1200|3|5||Glaciate:clearance
649|Genesect|Grass|1200|3|5||Techno Blast:hit:Water,Fire:2
686|Inkay|Colorless|350|1|3|687|Topsy-Turvy:hit:tier2
687|Malamar|Colorless|700|2|3||Topsy-Turvy:hit:tier3;Psybeam:hit:Fighting
696|Tyrunt|Fighting|350|1|2|697|Stone Edge:hit:Colorless:2.5
697|Tyrantrum|Fighting|1050|3|2||Stone Edge:hit:Colorless:2.5;Stealth Rock:entry:200:1
698|Amaura|Water|450|1|2|699|Ice Wind:hit:Grass
699|Aurorus|Water|1100|3|2||Aurora Beam:hit:Grass:2;Hail:arena:not-Water:-50
716|Xerneas|Psychic|1100|3|4||Geomancy:support:100:2
717|Yveltal|Colorless|1150|3|4||Oblivion Wing:hit:Psychic,Grass:2.5
718|Zygarde|Fighting|1150|3|4||Land's Wrath:hit:Lightning,Fighting:2.5
721|Volcanion|Water|1200|3|5||Steam Eruption:hit:Fire,Grass:2
776|Turtonator|Fire|650|2|3||Shell Trap:protect
`;
// Approved custom balance: comparable Water/Psychic/Dragon/Steel source families.
const custom=`
170|Chinchou|Lightning|250|1|2|171|Spark:hit:Water
171|Lanturn|Lightning|650|2|2||Discharge:hit:Water:2
458|Mantyke|Water|250|1|2|226|Bubble:hit:Fire
226|Mantine|Water|600|2|2||Bubble Beam:hit:Fire:2;Wide Guard:protect
517|Munna|Psychic|300|1|2|518|Hypnosis:protect
518|Musharna|Psychic|650|2|2||Hypnosis:protect;Psychic:hit:Fighting:2
677|Espurr|Psychic|250|1|2|678|Confusion:hit:Fighting
678|Meowstic|Psychic|650|2|2||Psychic:hit:Fighting:2;Helping Hand:support:100:1
132|Ditto|Colorless|350|1|3||Transform:hit:tier2:1.5
328|Trapinch|Fighting|250|1|3|329|Mud Slap:hit:Lightning
329|Vibrava|Fighting|450|1|3|330|Bulldoze:hit:Lightning:2
330|Flygon|Fighting|1100|3|3||Earthquake:hit:Lightning:2.5;Dragon Rush:hit:Colorless:2
363|Spheal|Water|250|1|2|364|Powder Snow:hit:Grass
364|Sealeo|Water|450|1|2|365|Ice Beam:hit:Grass:2
365|Walrein|Water|1100|3|2||Blizzard:hit:Grass:2.5;Protect:protect
582|Vanillite|Water|250|1|2|583|Icy Wind:hit:Grass
583|Vanillish|Water|450|1|2|584|Ice Beam:hit:Grass:2
584|Vanilluxe|Water|1100|3|2||Blizzard:hit:Grass:2.5;Hail:arena:not-Water:-50
615|Cryogonal|Water|600|2|2||Ice Beam:hit:Grass:2;Rapid Spin:clearance
692|Clauncher|Water|250|1|2|693|Water Gun:hit:Fire
693|Clawitzer|Water|650|2|2||Water Pulse:hit:Fire:2;Dark Pulse:hit:Psychic:2
599|Klink|Colorless|250|1|3|600|Gear Grind:hit:tier1
600|Klang|Colorless|450|1|3|601|Gear Grind:hit:tier1:2
601|Klinklang|Colorless|1200|3|3||Gear Grind:hit:tier2:2;Shift Gear:support:100:1
632|Durant|Grass|600|2|2||X-Scissor:hit:Psychic:2;Iron Defense:protect
607|Litwick|Psychic|250|1|3|608|Hex:hit:Fighting
608|Lampent|Psychic|450|1|3|609|Shadow Ball:hit:Fighting:2
609|Chandelure|Psychic|1200|3|3||Shadow Ball:hit:Fighting:2;Flamethrower:hit:Grass:2
240|Magby|Fire|150|1|3|126|Scorcher:arena:Fire:50
126|Magmar|Fire|400|1|3|467|Scorcher:arena:Fire:50
467|Magmortar|Fire|1150|3|3||Scorcher:arena:Fire:50;Fire Blast:hit:Grass:2.5
198|Murkrow|Colorless|300|1|2|430|Peck:hit:Grass
430|Honchkrow|Colorless|650|2|2||Drill Peck:hit:Grass:2;Night Slash:hit:Psychic:2
`;
function parse(text,customBalance){return text.trim().split('\n').map(row=>{const [id,name,type,cp,tier,rarity,evo,spec]=row.split('|');const ids=evo?evo.split(',').map(Number):[];const powers=spec?spec.split(';').map(parsePower):[parsePower('')];return {id:+id,name,type,cp:+cp,tier:+tier,rarity:+rarity,evolution:ids.length>1?ids:ids[0]||null,powers,optional:+rarity<4&&!!spec&&!['Slack Off','Uproar','Iron Defense'].some(n=>spec.startsWith(n)),customBalance,raidRoster:true,gym:10,family:`raid-${id}`};});}
export const RAID_ROSTER=[...parse(source,false),...parse(custom,true)];
const byId=Object.fromEntries(RAID_ROSTER.map(p=>[p.id,p]));
const evolved=new Set(RAID_ROSTER.flatMap(p=>[p.evolution].flat().filter(Boolean)));
function family(p,key){p.family=key;for(const id of [p.evolution].flat().filter(Boolean))family(byId[id],key);}
for(const p of RAID_ROSTER.filter(p=>!evolved.has(p.id)))family(p,({74:'geo',123:'scyth',144:'arti',145:'zap',146:'molt',150:'mewtwo',151:'mew'})[p.id]||p.family);
