import {GYMS,GYM_UNLOCK_RP} from './data.js';
// CPU trainers have a visible match rating within the player's current gym.
export function rivalRating(rating,gym,random=Math.random){
 const index=Math.min(gym,10),floor=GYM_UNLOCK_RP[index];
 const ceiling=gym>=11?1000000:GYMS[index].rating-1;
 return Math.max(gym>=11?6000:floor,Math.min(ceiling,rating+Math.floor(random()*201)-100));
}
export function openingSide(mode,playerRP,rivalRP,random=Math.random){
 if(mode==='raid')return 1;
 if(mode==='ranked'&&playerRP!==rivalRP)return playerRP>rivalRP?0:1;
 return random()<.5?0:1;
}
