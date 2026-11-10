import {newSave} from './legacy-save.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {validateTeam,validateTeamEdit} from '../src/engine.js';
import {validateSave,evolve} from '../src/state.js';
const roster=ids=>ids.map(species=>({uid:`mon-${species}`,species,iv:0}));
const check=(ids,gym=11)=>{const c=roster(ids);return validateTeam(c.map(p=>p.uid),c,gym);};
test('two red plus two Great plus two Ultra is valid at a sufficiently high gym',()=>{
 assert.equal(check([1,25,80,28,6,9]),null);
 assert.match(check([1,25,80,28,6,9],0),/current gym/);
});
test('at least two red and at most two Ultra are separately enforced',()=>{
 assert.match(check([1,80,28,53,6,9]),/at least two/);
 assert.match(check([1,25,6,9,65,28]),/at most two Ultra/);
 assert.equal(check([1,25,55,28,105,53]),null);
});
test('Legendary and family limits still apply',()=>{
 assert.match(check([1,25,144,145,146,28]),/Legendary/);
 assert.match(check([1,2,25,55,6,28]),/evolution family/);
});
test('old teams load without data loss and can be repaired incrementally',()=>{
 const s=newSave();s.gym=11;s.coins=1234;
 const old=roster([3,6,9,18,65,25]);s.collection.push(...old,...roster([63,7,16]));s.team=old.map(p=>p.uid);
 const loaded=validateSave(JSON.parse(JSON.stringify(s)));
 assert.deepEqual(loaded.team,s.team);assert.equal(loaded.coins,1234);assert.ok(validateTeam(loaded.team,loaded.collection,11));
 for(const [from,to] of [[65,63],[9,7],[18,16]]){
  const next=loaded.team.map(id=>id===`mon-${from}`?`mon-${to}`:id);
  assert.equal(validateTeamEdit(loaded.team,next,loaded.collection,11),null);loaded.team=next;
 }
 assert.equal(validateTeam(loaded.team,loaded.collection,11),null);
 const worse=loaded.team.map(id=>id==='mon-63'?'mon-65':id);
 assert.ok(validateTeamEdit(loaded.team,worse,loaded.collection,11));
});
test('evolution cannot remove the second red medallion or create a third Ultra',()=>{
 for(const [ids,evolving] of [[[44,25,80,28,6,9],44]]){
  const s=newSave();s.gym=11;s.candy=10000;const c=roster(ids);s.collection=c;s.team=c.map(p=>p.uid);
  assert.throws(()=>evolve(s,`mon-${evolving}`),/at least two/);
  assert.equal(s.candy,10000);assert.equal(c[0].species,44);
 }
 const s=newSave();s.gym=11;s.candy=10000;s.collection=roster([1,25,55,5,9,65]);s.team=s.collection.map(p=>p.uid);
 assert.throws(()=>evolve(s,'mon-5'),/at most two Ultra/);assert.equal(s.candy,10000);
});
