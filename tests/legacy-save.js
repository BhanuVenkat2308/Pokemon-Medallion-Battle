import {newSave as freshSave,createMedallion} from '../src/state.js';
export {createMedallion} from '../src/state.js';
export function newSave(starter=4){
 const s=freshSave(starter);
 s.collection=[starter,25,16,54,39,27,...[1,4,7].filter(x=>x!==starter),10,19,129,133,11,17].map(id=>createMedallion(id,Math.floor(Math.random()*32),()=>.5));
 s.team=s.collection.slice(0,6).map(p=>p.uid);s.discovered=s.collection.map(p=>p.species);delete s.welcome;return s;
}
