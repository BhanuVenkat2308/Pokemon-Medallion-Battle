// Presentation only. Receives an already-resolved round; never writes battle/save state.
import {DEX,COLORS} from './data.js';
import {targetName} from './powers.js';
import {powerIcon,typeIcon} from './presentation.js';
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const MOTION_TIMING=Object.freeze({flip:600,afterReveal:500,field:1000,power:1200,betweenPowers:500,result:1000});
export function battleCues(result,mons){
 return (result.timeline||[]).map(step=>{
  if(step.phase==='order')return {...step,cp:[...step.cp]};
  const {kind}=step;
  const label=step.phase==='field'?`${step.amount>=0?'+':'−'}${Math.abs(step.amount)} CP · carried over`:kind==='effective'?`${step.multiplier}× CP · vs ${targetName(step.target)}`:kind==='support'?`+${step.amount} CP · next ${step.turns}`:kind==='entry'?`−${step.amount} CP · next ${step.turns}`:kind==='arena'?`${step.amount>=0?'+':'−'}${Math.abs(step.amount)} CP · ${targetName(step.target)} arena`:kind==='reveal'?`Reveal ${step.count||1}`:kind==='priority'?'Strikes first · opponent’s power blocked':kind==='protect'?'Protected':'Own-side hazards cleared · Support kept';
  return {...step,cp:[...step.cp],label,color:COLORS[DEX[mons[step.side].species].type]};
 });
}
export const powerCues=(result,mons)=>battleCues(result,mons).filter(c=>c.phase==='power'||c.phase==='clearance');
export async function playBattleMotion(board,{result,mons,initialCP,medallions,isCurrent}){
 if(!board||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const center=board.querySelector('.battle-center');if(!center)return;
 const overlay=document.createElement('div');overlay.className='battle-motion';
 overlay.innerHTML=`<div class="motion-caption" role="status">BOTH CHOICES LOCKED · REVEALING</div><div class="motion-duel">${medallions.map((html,i)=>`<div class="motion-card motion-side-${i}" style="--motion-color:${COLORS[DEX[mons[i].species].type]}"><div class="motion-aura"></div>${i?`<div class="motion-flip"><div class="motion-back tier-${DEX[mons[i].species].tier}" aria-label="Face-down ${['','Poké','Great','Ultra'][DEX[mons[i].species].tier]} Ball"><span class="pokeball-mark"></span></div><div class="motion-front" hidden>${html}</div></div>`:html}<span class="motion-side-label">${i?'RIVAL':'YOU'}</span></div>`).join('<span class="motion-vs">VS</span>')}</div><div class="motion-banner" aria-live="polite"></div><div class="motion-particles" aria-hidden="true">${Array.from({length:10},(_,i)=>`<i style="--i:${i}"></i>`).join('')}</div><button class="motion-skip" type="button">Skip animation →</button>`;
 const cards=[...overlay.querySelectorAll('.motion-card')],numbers=cards.map(c=>c.querySelector('.coin-cp strong'));
 overlay.querySelectorAll('.medallion').forEach(el=>{el.disabled=true;el.removeAttribute('data-action');});
 let displayedCP=[...(result.baseCP||initialCP)];
 numbers.forEach((n,i)=>{n.textContent=displayedCP[i].toLocaleString();});
 const abort=new AbortController();const skip=overlay.querySelector('.motion-skip');
 skip.addEventListener('click',()=>abort.abort(),{once:true});
 const live=()=>!abort.signal.aborted&&isCurrent()&&overlay.isConnected;
 const pause=ms=>new Promise(resolve=>{const finish=()=>{clearTimeout(timer);abort.signal.removeEventListener('abort',finish);resolve();};const timer=setTimeout(finish,ms);abort.signal.addEventListener('abort',finish,{once:true});if(abort.signal.aborted)finish();});
 board.classList.add('motion-playing');center.append(overlay);
 try{
  await pause(260);
  if(!live())return;
  const flip=overlay.querySelector('.motion-flip');flip.classList.add('motion-flip-out');
  await pause(MOTION_TIMING.flip/2);if(!live())return;
  flip.querySelector('.motion-back').hidden=true;flip.querySelector('.motion-front').hidden=false;
  flip.classList.remove('motion-flip-out');flip.classList.add('motion-flip-in');
  await pause(MOTION_TIMING.flip/2);if(!live())return;
  flip.classList.remove('motion-flip-in');
  overlay.querySelector('.motion-caption').textContent='MEDALLIONS REVEALED';
  await pause(MOTION_TIMING.afterReveal);
  for(const cue of battleCues(result,mons)){
   if(cue.phase==='order'){
    if(!live())return;
    overlay.dataset.phase='order';
    overlay.querySelector('.motion-caption').textContent=`${DEX[mons[cue.side].species].name} acts first · adjusted CP ${cue.cp[0]} : ${cue.cp[1]}`;
    numbers.forEach((n,i)=>{n.textContent=cue.cp[i].toLocaleString();});displayedCP=[...cue.cp];
    await pause(500);continue;
   }
   if(!live())return;
   overlay.dataset.phase=cue.phase;overlay.dataset.effect=cue.kind;overlay.dataset.side=String(cue.side);
   cards.forEach((card,i)=>card.classList.toggle('motion-active',i===cue.side));
   const badge=cue.kind==='effective'?`<span class="motion-vs-icon">VS${cue.target==='legendary'?'♛':typeIcon(cue.target)}</span>`:powerIcon(cue.kind);
   overlay.querySelector('.motion-caption').textContent=`${cue.side?'Rival’s':'Your'} ${DEX[mons[cue.side].species].name}`;
   const old=overlay.querySelector('.motion-banner'),banner=old.cloneNode(false);
   const changes=cue.cp.map((cp,i)=>cp!==displayedCP[i]?`${i?'Rival':'Your'} CP ${displayedCP[i]} → ${cp}`:'').filter(Boolean).join(' · ');
   banner.style.setProperty('--motion-color',cue.color);banner.innerHTML=`<span class="motion-banner-icon">${badge}</span><span><b>${escape(cue.name)}</b><small>${escape(cue.label)}</small>${changes?`<em class="motion-cp-change">${escape(changes)}</em>`:''}</span>`;old.replaceWith(banner);
   const duration=cue.phase==='power'?MOTION_TIMING.power:MOTION_TIMING.field;
   const from=[...displayedCP],began=performance.now();
   while(live()){
    const fraction=Math.min(1,(performance.now()-began)/360);
    numbers.forEach((n,i)=>{n.textContent=Math.round(from[i]+(cue.cp[i]-from[i])*fraction).toLocaleString();});
    if(fraction===1)break;await pause(20);
   }
   displayedCP=[...cue.cp];await pause(Math.max(0,duration-(performance.now()-began)));
   if(!live())return;
   // Finish and clear every cue before starting the next, including dual effects.
   banner.classList.add('motion-banner-exit');
   cards.forEach(card=>card.classList.remove('motion-active'));
   delete overlay.dataset.effect;delete overlay.dataset.side;
   await pause(200);if(!live())return;
   banner.innerHTML='';banner.classList.remove('motion-banner-exit');
   await pause(MOTION_TIMING.betweenPowers-200);
  }
  if(!live())return;
  overlay.querySelector('.motion-banner').classList.add('motion-banner-out');
  cards.forEach(card=>card.classList.remove('motion-active'));
  overlay.dataset.effect=result.protected?'protect':'impact';
  overlay.dataset.side=String(result.protected?(result.events.findLast(e=>e.includes('protected!'))?.startsWith('Your ')?0:1):result.winner);
  overlay.querySelector('.motion-caption').textContent=result.protected?'PROTECTED · BACK TO THE BENCH':result.winner===0?'YOUR POKÉMON WINS':'RIVAL’S POKÉMON WINS';
  numbers.forEach((n,i)=>{n.textContent=result.cp[i].toLocaleString();});
  if(!live())return;
  if(!result.protected)cards[result.winner].classList.add('motion-winner');
  await pause(MOTION_TIMING.result);
 }finally{abort.abort();overlay.remove();board.classList.remove('motion-playing');}
}
