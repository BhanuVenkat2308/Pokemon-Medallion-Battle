import {newSave} from './legacy-save.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {openPack,STARTER_SPECIES} from '../src/state.js';
import {DEX,GYM_UNLOCK_RP} from '../src/data.js';
const starter=p=>STARTER_SPECIES.includes(p.species);
for(const kind of ['poke','silver']){
 test(`${kind}: 2.5% whole-pack starter threshold, never from another slot`,()=>{
  const s=newSave();s.rating=s.bestRating=6000;s.gym=11;
  let hits=0;
  const initial=s.collection.slice();
  for(let n=0;n<1000;n++){
   s.collection=initial.slice();s.coins=s.candy=10000;
   let first=true;const pack=openPack(s,kind,()=>{if(first){first=false;return n/1000;}return .5;});
   const count=pack.filter(starter).length;
   assert.equal(count,n<25?1:0);hits+=count;
   assert.ok(DEX[pack[3].species].rarity>=2);
   assert.equal(DEX[pack[4].species].gym,10);
  }
  assert.equal(hits,25);
 });
 test(`${kind}: starter rolls respect every gym unlock and newest-gym guarantee`,()=>{
  for(let gym=0;gym<11;gym++)for(const rest of [0,.5,.999]){
   const s=newSave();s.gym=gym;s.rating=s.bestRating=GYM_UNLOCK_RP[gym];s.coins=s.candy=10000;
   let first=true;const pack=openPack(s,kind,()=>{if(first){first=false;return 0;}return rest;});
   assert.equal(pack.filter(starter).length,gym?1:0);
   assert.ok(pack.filter(starter).every(p=>DEX[p.species].gym<=gym));
   assert.equal(DEX[pack[4].species].gym,gym);
   assert.ok(DEX[pack[3].species].rarity>=2);
  }
 });
}
