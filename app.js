import { renderFeed } from './feed.js';import { renderDM } from './dm.js';import { renderCharacters } from './characters.js';import { renderLore } from './lore.js';
export function initApp(){
 const app=document.getElementById('app');
 app.innerHTML=`<div class='nav'>
 <button id='feedBtn'>Feed</button>
 <button id='dmBtn'>DMs</button>
 <button id='charBtn'>Characters</button>
 <button id='loreBtn'>Lore</button>
 </div>
 <div id='page'></div>`;
 document.getElementById('feedBtn').onclick=()=>renderFeed();
 document.getElementById('dmBtn').onclick=()=>renderDM();
 document.getElementById('charBtn').onclick=()=>renderCharacters();
 document.getElementById('loreBtn').onclick=()=>renderLore();
 renderFeed();
}