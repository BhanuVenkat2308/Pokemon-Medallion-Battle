import test from 'node:test';
import assert from 'node:assert/strict';
import {newSave} from './legacy-save.js';
import {rollPackIV,openPack} from '../src/state.js';
for(const [kind,chance,min] of [['poke',.04,0],['silver',.06,16]]){
 test(`${kind} packs have exact Shiny threshold and bounded non-Shiny IVs`,()=>{
  assert.equal(rollPackIV(kind,()=>chance-.000001),31);
  for(const [second,expected] of [[0,min],[.999999,30]]){
   let first=true;assert.equal(rollPackIV(kind,()=>{if(first){first=false;return chance;}return second;}),expected);
  }
  let shiny=0;
  for(let i=0;i<10000;i++){
   let first=true;const iv=rollPackIV(kind,()=>{if(first){first=false;return i/10000;}return .999999;});
   if(iv===31)shiny++;else assert.equal(iv,30);
  }
  assert.equal(shiny,chance*10000);
 });
 test(`${kind} opening uses the configured odds for all five slots`,()=>{
  const s=newSave();s.candy=1000;s.coins=1000;
  assert.ok(openPack(s,kind,()=>chance-.000001).every(p=>p.iv===31));
  assert.ok(openPack(s,kind,()=>chance).every(p=>p.iv>=min&&p.iv<=30));
 });
}
