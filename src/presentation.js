import {assetUrl} from './assets.js';
// Display names only. Battle rules remain in data.js and engine.js.
// Documented Medallion Battle names where available; other names are adaptations.
export const MOVE_NAMES = Object.freeze({
  1:'Vine Whip',2:'Leech Seed',3:'Solar Beam',4:'Ember',5:'Fire Spin',6:'Fire Spin',
  7:'Bubble',8:'Rapid Spin',9:'Hydro Pump',10:'String Shot',11:'Harden',12:'Sleep Powder',
  16:'Quick Attack',17:'Gust',18:'Gust',19:'Quick Attack',20:'Hyper Fang',
  172:'Thunder Shock',25:'Volt Tackle',26:'Volt Tackle',27:'Sand Attack',28:'Spikes',35:'Helping Hand',36:'Protect',
  37:'Ember',38:'Will-O-Wisp',39:'Sing',40:'Helping Hand',43:'Razor Leaf',44:'Acid',45:'Petal Dance',
  52:'Pay Day',53:'Pay Day',54:'Foresight',55:'Confusion',58:'Helping Hand',59:'Extreme Speed',
  63:'Teleport',64:'Kinesis',65:'Psychic',66:'Karate Chop',67:'Cross Chop',68:'Cross Chop',
  74:'Defense Curl',75:'Stealth Rock',76:'Stealth Rock',79:'Confusion',80:'Psychic',
  92:'Confuse Ray',93:'Lick',94:'Haze',95:'Stealth Rock',104:'Bone Club',105:'Bonemerang',
  123:'Quick Attack',129:'Splash',130:'Outrage',131:'Rain Dance',133:'Last Resort',
  134:'Acid Armor',135:'Quick Attack',136:'Fire Blast',143:'Rest',144:'Ice Beam',
  145:'Thunderbolt',146:'Fire Spin',147:'Safeguard',148:'Rain Dance',149:'Extreme Speed',
  150:'Psystrike',151:'Ancient Power'
});
export const moveName = pokemon => pokemon.moveName || MOVE_NAMES[pokemon.id];
export const typeIcon = type => `<img class="type-icon" src="${assetUrl(`types/${type.toLowerCase()}.png`)}" alt="" aria-hidden="true" width="20" height="20" draggable="false"/>`;

// Vector recreations of the documented Medallion Battle power symbols.
// These are not extracted official assets. Colors belong to power categories.
const POWER_ART = {
 protect:['#497fc9','<path d="M16 5c4 3 7 3 10 3v9c0 6-6 10-10 12C12 27 6 23 6 17V8c3 0 6 0 10-3Z"/>'],
 reveal:['#9865b4','<circle cx="13" cy="13" r="9"/><path d="M4 13h18" fill="none" stroke="#352342" stroke-width="2"/><circle cx="13" cy="13" r="3" stroke="#352342" stroke-width="2"/><circle cx="21" cy="21" r="6" fill="#c6e9f8" stroke="#352342" stroke-width="2.5"/><path d="m25 25 5 5" stroke="#fff" stroke-width="4" stroke-linecap="round"/>'],
 priority:['#8a5fb4','<path d="m3 7 10 9L3 25h7l10-9L10 7Zm12 0 10 9-10 9h7l10-9-10-9Z"/>'],
 support:['#cd525f','<path d="M12 5h8v7h7v8h-7v7h-8v-7H5v-8h7Z"/>'],
 entry:['#dc883e','<path d="M12 4h8l-1 16h-6Z"/><circle cx="16" cy="26" r="3.5"/>'],
 arena:['#4e9564','<path d="M7 8h18l5 19H2Z" fill="none" stroke="#fff" stroke-width="2.5"/><path d="M16 8v19M5 17h22" stroke="#fff" stroke-width="2"/><ellipse cx="16" cy="17" rx="5" ry="3" fill="none" stroke="#fff" stroke-width="2"/>'],
 clearance:['#399d9b','<path d="M15 13C4 14 4 4 12 3c6-1 7 6 3 10Zm4 2c-1-11 9-11 10-3 1 6-6 7-10 3Zm-2 4c11-1 11 9 3 10-6 1-7-6-3-10Zm-4-2C14 28 4 28 3 20c-1-6 6-7 10-3Z"/><circle cx="16" cy="16" r="3"/>']
};
export function powerIcon(power){
 if(power==='none')return '';
 const [color,art]=POWER_ART[power]||['#ad8b43','<path d="m18 3-12 16h9l-1 10 12-17h-9Z"/>'];
 return `<svg class="power-icon" viewBox="0 0 36 36" aria-hidden="true" focusable="false"><rect width="36" height="36" rx="2" fill="${color}"/><path d="M2 2h32v12H2Z" fill="#fff" opacity=".12"/><g transform="translate(2 2)" fill="#fff">${art}</g></svg>`;
}
