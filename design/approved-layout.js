// Approved local G20 geometry. No embedded BMW font or captured vehicle identity.

(()=>{
const root=document.getElementById('bmw-red-cluster'),stage=root.querySelector('.red-screen'),svg=stage.querySelector('.cluster-svg');
const LOGO='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzQiIGhlaWdodD0iMjYiIHZpZXdCb3g9IjY1LjEyMSAxMy4zOTEgNzQgMjUuODU1IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPGcgY2xpcC1wYXRoPSJ1cmwoI2EpIj4KICAgIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMCAyNS41YzAtMTMuMjU1IDEwLjc0NS0yNCAyNC0yNHMyNCAxMC43NDUgMjQgMjQtMTAuNzQ1IDI0LTI0IDI0LTI0LTEwLjc0NS0yNC0yNFptMjQgMjIuNDRjMTIuMzk0IDAgMjIuNDQtMTAuMDQ4IDIyLjQ0LTIyLjQ0QzQ2LjQ0IDEzLjEwOCAzNi4zOTEgMy4wNiAyNCAzLjA2IDExLjYwOCAzLjA2IDEuNTYgMTMuMTA5IDEuNTYgMjUuNWMwIDEyLjM5MiAxMC4wNDYgMjIuNDQgMjIuNDQgMjIuNDRaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTM1LjYzMiAxNS4zMThjLjMyNi4zNS43OTYuOTE0IDEuMDYgMS4yNTdsNC44Ni0zLjA4NWMtLjI0My0uMzE3LS42My0uOC0uOTItMS4xNGwtMy4wNzcgMi4wMzUtLjIxLjE4LjE1Ni0uMjI4IDEuMzYtMi43MTItLjk2Mi0uOTYxLTIuNzEzIDEuMzU5LS4yMjkuMTU2LjE4Mi0uMjEgMi4wMzYtMy4wNzZhMjkuNjk0IDI5LjY5NCAwIDAgMC0xLjE0MS0uOTIzbC0zLjA4NSA0Ljg1NmMuMzkxLjMuOTA2Ljc0MiAxLjIzNSAxLjA0MmwyLjkwNC0xLjUwNy4xODYtLjEzNy0uMTM3LjE4Ny0xLjUwNSAyLjkwN1pNMjQuNjA0IDkuMTY0bDEuMzI4LTIuOTc1LjA4NC0uMjY0LS4wMjQuMjc1LjE0IDMuOTc1Yy40NjYuMDQ0Ljk0Ny4xMSAxLjQyMS4xODhsLS4yMTYtNS44ODdhMjkuNDggMjkuNDggMCAwIDAtMS45ODQtLjE1NEwyNC4wNDUgNy41N2wtLjA0Ny4yNDEtLjA0Ni0uMjQtMS4zMDctMy4yNDhjLS42Ni4wMjgtMS4zMi4wOC0xLjk4NC4xNTRsLS4yMTYgNS44ODdhMjEuMDcgMjEuMDcgMCAwIDEgMS40MjEtLjE4OGwuMTQtMy45NzUtLjAyNC0uMjc1LjA4NS4yNjQgMS4zMjggMi45NzVoMS4yMDlaIiBmaWxsPSIjZmZmIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMy44NjUgMTMuODU2Yy43NjctLjgwOSAxLjIwMi0xLjc0My40MzQtMi42MzUtLjQxNy0uNDg0LTEuMTE5LS41OS0xLjctLjM1MWwtLjA1OC4wMjIuMDE4LS4wNWMuMDg3LS4yMy4xNDItLjk2NC0uNDgzLTEuNDdhMS40NDYgMS40NDYgMCAwIDAtMS4wNzQtLjNjLS43MjEuMDczLTEuMjc2LjU2Ni0yLjc4NiAyLjI1QTM2LjM3OCAzNi4zNzggMCAwIDAgNi43IDEzLjE1bDQuMTQ3IDMuOTM0YTExMC4yODggMTEwLjI4OCAwIDAgMSAyLjM5NC0yLjU3M2wuNjI1LS42NTVabS01LjQxMi0uOTYzYy44MzYtMS4wMjEgMS43MjMtMS45NDkgMi4xMjUtMi4zMTUuMTI3LS4xMTYuMjY2LS4yMzIuNDM0LS4yNzcuMjcyLS4wNzUuNTUzLjExOS42MTYuMzk4LjA2NC4yOC0uMTEzLjU0Ny0uMzA5Ljc2OC0uNDQyLjQ5OC0yLjA2MSAyLjE5Mi0yLjA2MSAyLjE5MmwtLjgwNS0uNzY2Wm0zLjcxNy0uNjZjLS41MTUuNTMzLTIuMDkzIDIuMjAxLTIuMDkzIDIuMjAxbC44NDEuNzk3IDIuMDkyLTIuMjM4Yy4xNi0uMTczLjM1NS0uNC40MDgtLjYzOWEuNDkyLjQ5MiAwIDAgMC0uMjEyLS41MmMtLjE3OC0uMTE4LS4zNzctLjEtLjU1OS0uMDEtLjE0MS4wNjktLjI3Mi4xOTctLjQ3Ny40MDlaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTM4LjIzMiAyNS41SDI0VjExLjI2OGM3Ljg2NiAwIDE0LjIzMiA2LjM2NiAxNC4yMzIgMTQuMjMyWk0yNCAyNS41djE0LjIzMmMtNy44NjYgMC0xNC4yMzItNi4zNjctMTQuMjMyLTE0LjIzMkgyNFoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMjQgMTEuMjY4VjI1LjVIOS43NjhjMC03Ljg2NiA2LjM2Ni0xNC4yMzIgMTQuMjMyLTE0LjIzMlpNMzguMjMyIDI1LjVjMCA3Ljg2NS02LjM2NiAxNC4yMzItMTQuMjMyIDE0LjIzMlYyNS41aDE0LjIzMloiIGZpbGw9IiMwMDY2QjEiLz48L2c+PGcgY2xpcC1wYXRoPSJ1cmwoI2IpIj48cGF0aCBkPSJNMTIzLjAwNCAxMy4zOTF2MTAuNjg3bDYuMjkzLTEwLjY4N2g5LjgyM3YyNS44NTVoLTkuMTlsLjAwMS0xMC42ODctNi4zMDEgMTAuNjg3aC04LjY4VjI4LjU2bC02LjMwMSAxMC42ODdIOTcuNzY4bDE1LjIzNC0yNS44NTVoMTAuMDAyWiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik05MS4yMzkgMTMuMzkxIDc2LjAwNCAzOS4yNDZINjUuMTIxbDE1LjIzNS0yNS44NTVoMTAuODgzWiIgZmlsbD0iIzAwNjZCMSIvPjxwYXRoIGQ9Ik0xMDIuMTIyIDEzLjM5MSA4Ni44ODUgMzkuMjQ2SDc2LjAwNGwxNS4yMzUtMjUuODU1aDEwLjg4M1oiIGZpbGw9IiMwMDNENzgiLz48cGF0aCBkPSJNMTEzLjAwMyAxMy4zOTEgOTcuNzY4IDM5LjI0Nkg4Ni44ODVsMTUuMjM2LTI1Ljg1NWgxMC44ODJaIiBmaWxsPSIjRTIyNzE4Ii8+PC9nPjxkZWZzPjxjbGlwUGF0aCBpZD0iYSI+PHBhdGggZmlsbD0iI2ZmZiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxLjUpIiBkPSJNMCAwaDQ4djQ4SDB6Ii8+PC9jbGlwUGF0aD48Y2xpcFBhdGggaWQ9ImIiPjxwYXRoIGZpbGw9IiNmZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDY1LjEyMSAxMy4zOTEpIiBkPSJNMCAwaDc0djI1Ljg1NUgweiIvPjwvY2xpcFBhdGg+PC9kZWZzPgo8L3N2Zz4K';
const measured={speed:0,rpm:0,gear:'P',torque:0,fuelLitres:8.796875,tankLitres:36,fuelRange:98,electricRange:0,outside:4.5,oil:95,coolant:76,transmissionOil:77,averageConsumption:7.65,currentConsumption:0,tyres:[{name:'Levé přední',short:'LP',pressure:2.9,temp:16},{name:'Pravé přední',short:'PP',pressure:2.8,temp:14},{name:'Levé zadní',short:'LZ',pressure:3.0,temp:15},{name:'Pravé zadní',short:'PZ',pressure:2.9,temp:13}]};
const views=['original','music','thermal','tyres','consumption','power','performance','map'];const cfg={scale:.91,mapSpread:146,shiftStart:4400,shiftAt:6000,accent:'#e03b50'};
let saved=window.openai?.widgetState?.privateContent||{};
const state={view:views.includes(saved.view)?saved.view:'original',source:'car',speed:0,rpm:0,gear:'P',torque:0,play:null,runStart:0,lastTick:0};
const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const f=(v,d=0)=>Number(v).toLocaleString('cs-CZ',{maximumFractionDigits:d,minimumFractionDigits:d});
const motion={rpm:0,last:0,frames:[],fps:null};let smoothRaf=0;
function gaugePosition(value,right){const values=right?[0,1,2,3,4,5,6,7]:[0,30,60,90,120,150,200,260],ts=[0,.16,.32,.48,.64,.76,.88,1];let i=0;for(let k=0;k<7;k++)if(value>=values[k])i=k;return ts[i]+Math.max(0,Math.min(1,(value-values[i])/(values[i+1]-values[i])))*(ts[i+1]-ts[i]);}
function gaugePoint(t,inner=false){const bottom=inner?676:563,kink=inner?511:373,top=inner?680:563;return t<=.64?[bottom+(kink-bottom)*t/.64,627+(326-627)*t/.64]:[kink+(top-kink)*(t-.64)/.36,326+(94-326)*(t-.64)/.36];}
function rpmShapes(rpm){const t=gaugePosition(rpm/1000,true),out=gaugePoint(t),inside=gaugePoint(t,true),points=[gaugePoint(0)];if(t>.64)points.push(gaugePoint(.64));points.push(out,inside);if(t>.64)points.push(gaugePoint(.64,true));points.push(gaugePoint(0,true));const path=points.map(([x,y],i)=>(i?'L':'M')+(1920-x)+' '+y).join(' ')+'Z';return {fill:path,pointer:`M${1920-out[0]} ${out[1]}L${1920-inside[0]} ${inside[1]}`};}
function consumptionNow(){return state.source==='car'?measured.currentConsumption:(state.speed>3?Math.max(0,3+state.torque/40+state.rpm/1600):0);}
function updateDynamics(){
 const q=rpmShapes(motion.rpm);svg.querySelector('.rpm-fill')?.setAttribute('d',q.fill);svg.querySelector('.rpm-pointer')?.setAttribute('d',q.pointer);
 const sp=gaugePoint(gaugePosition(state.speed,false));svg.querySelector('.speed-pointer')?.setAttribute('d',`M${sp[0]-2} ${sp[1]-4}L${sp[0]+108} ${sp[1]-11}L${sp[0]+108} ${sp[1]+3}L${sp[0]} ${sp[1]+5}Z`);
 svg.querySelectorAll('[data-live-speed]').forEach(n=>{n.textContent=f(state.speed)+(state.view==='original'?'':' km/h');});svg.querySelector('[data-live-gear]')?.replaceChildren(document.createTextNode(state.gear));
 const kw=state.torque*state.rpm/9549.2966;svg.querySelector('[data-live-power]')?.replaceChildren(document.createTextNode(f(kw)+' kW'));svg.querySelector('[data-live-hp]')?.replaceChildren(document.createTextNode(f(kw*1.3596216)+' k · odhad'));svg.querySelector('[data-live-consumption]')?.replaceChildren(document.createTextNode(f(consumptionNow(),1)+' l/100 km'));
 const p=state.source==='demo'?timer.out:recordTimer.out;for(const [key,val]of Object.entries({last50:p.last50,last100:p.last100,best50:p.best50,best100:p.best100})){const n=svg.querySelector(`[data-time="${key}"]`);if(n)n.textContent=(key.startsWith('best')?'PB ':'')+(val===null?'—':f(val,2)+' s');}const status=svg.querySelector('[data-time-status]');if(status)status.textContent=p.active?f(p.elapsed,2)+' s':p.event;
 const high=state.source==='demo'&&state.rpm>=cfg.shiftAt,ledGroup=svg.querySelector('[data-led-group]');if(ledGroup){const was=ledGroup.classList.contains('shift-flash');if(was!==high)ledGroup.classList.toggle('shift-flash',high);}svg.querySelector('[data-shift-label]')?.setAttribute('opacity',high?'1':'0');
 svg.querySelectorAll('[data-led-rank]').forEach(n=>{const rank=+n.dataset.ledRank,on=motion.rpm>=cfg.shiftStart+rank*(cfg.shiftAt-cfg.shiftStart)/6,col=rank<3?'#dfb653':rank<5?'#eb7646':cfg.accent;n.setAttribute('fill',on?col:'#1b2739');});svg.querySelectorAll('[data-led-glow]').forEach(n=>{const rank=+n.dataset.ledGlow;n.setAttribute('opacity',motion.rpm>=cfg.shiftStart+rank*(cfg.shiftAt-cfg.shiftStart)/6?'.58':'0');});
}
function smoothTick(now){if(!root.isConnected){smoothRaf=0;return;}const dt=motion.last?Math.min(80,now-motion.last):16.67;motion.last=now;motion.rpm+= (state.rpm-motion.rpm)*(1-Math.exp(-dt/65));if(Math.abs(state.rpm-motion.rpm)<.5)motion.rpm=state.rpm;updateDynamics();motion.frames.push(now);motion.frames=motion.frames.filter(t=>now-t<=1000);if(motion.frames.length>12){motion.fps=(motion.frames.length-1)*1000/(now-motion.frames[0]);svg.dataset.measuredFps=motion.fps.toFixed(1);}if(state.play||Math.abs(state.rpm-motion.rpm)>.5){smoothRaf=requestAnimationFrame(smoothTick);}else{smoothRaf=0;motion.last=0;}}
function scheduleMotion(){if(!smoothRaf){motion.last=0;motion.frames=[];smoothRaf=requestAnimationFrame(smoothTick);}}
// TIMER_START: monotonic timestamps; interpolation at 5, 50 and 100 km/h.
function createAccelerationTimer(bestInput={}){
 let prev=null,armed=false,start=null,finished50=false,finished100=false;
 const out={best50:Number.isFinite(bestInput.best50)&&bestInput.best50>0?bestInput.best50:null,best100:Number.isFinite(bestInput.best100)&&bestInput.best100>0?bestInput.best100:null,last50:null,last100:null,elapsed:0,active:false,event:'Čeká na rozjezd',attempts:0};
 function reset(){prev=null;armed=false;start=null;finished50=false;finished100=false;out.active=false;out.elapsed=0;}
 function sample(v,t){
  if(!Number.isFinite(v)||!Number.isFinite(t)||v<0||v>350){reset();out.event='Chybí platná rychlost';return out;}
  if(prev&&(t<=prev.t||t-prev.t>1000)){reset();out.event='Přerušený signál';}
  if(v<=3){armed=true;start=null;finished50=false;finished100=false;out.active=false;out.elapsed=0;}
  const at=target=>prev.t+(target-prev.v)/(v-prev.v)*(t-prev.t);
  if(prev&&armed&&start===null&&prev.v<=5&&v>5){start=at(5);armed=false;out.attempts++;out.active=true;out.event='Měření běží';}
  if(start!==null){
   if(prev&&prev.v<50&&v>=50&&!finished50){out.last50=(at(50)-start)/1000;finished50=true;const pb=out.best50===null||out.last50<out.best50;if(pb)out.best50=out.last50;out.event=pb?'NOVÝ PERSONAL BEST · 0–50':'0–50 dokončeno';}
   if(prev&&prev.v<100&&v>=100&&!finished100){out.last100=(at(100)-start)/1000;finished100=true;const pb=out.best100===null||out.last100<out.best100;if(pb)out.best100=out.last100;out.event=pb?'NOVÝ PERSONAL BEST · 0–100':'0–100 dokončeno';out.active=false;}
   out.elapsed=finished100?out.last100:Math.max(0,(t-start)/1000);
  }
  prev={v,t};return out;
 }
 return {sample,reset,out};
}
// TIMER_END
const timer=createAccelerationTimer(saved.demoBest||{}),recordTimer=createAccelerationTimer();let raf=0;
function save(){window.openai?.setWidgetState?.({modelContent:{clusterDirection:'LCI · červené akcenty, originální BMW font a M logo',bcView:state.view,performanceTiming:'Názvy 0–50 / 0–100 km/h; start měření při 5 km/h',demoPersonalBest:timer.out.best100},privateContent:{view:state.view,demoBest:{best50:timer.out.best50,best100:timer.out.best100}}})?.catch(()=>{});}
function matrix(right,map){let s=map?cfg.scale-.045:cfg.scale,p=right?1500:420,shift=map?(right?cfg.mapSpread:-cfg.mapSpread):0;return `matrix(${s},0,0,${s},${p*(1-s)+shift},${360*(1-s)})`;}
function render(animate=false){
const W=stage.clientWidth,H=stage.clientHeight,S=Math.min(W/1920,H/720),dx=(W-1920*S)/2,dy=(H-720*S)/2,narrow=W<650,tiny=W<430,isMap=state.view==='map',oldMap=svg.dataset.map==='true';
svg.dataset.map=String(isMap);svg.setAttribute('viewBox',`0 0 ${W} ${H}`);let a='';
const T=(x,y,t,size=30,color='#cad7e8',anchor='start',extra='')=>a+=`<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${color}" font-family="BMWClusterNext,Arial,sans-serif" font-weight="300" font-variant-numeric="tabular-nums" font-size="${Math.max(11/S,size)}" ${extra}>${esc(t)}</text>`;
const P=(d,fill='none',stroke='none',width=1,extra='')=>a+=`<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" ${extra}/>`;
const R=(x,y,w,h,fill,rx=0,extra='')=>a+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" rx="${rx}" ${extra}/>`;
const L=(x,y,x2,y2,col='#bfcad9',width=2)=>P(`M${x} ${y}L${x2} ${y2}`,'none',col,width);
a+=`<defs><radialGradient id="red-bg"><stop stop-color="#090e1c"/><stop offset="1" stop-color="#020508"/></radialGradient><linearGradient id="red-ribbon" x1="0" y1="0" x2="1" y2=".9"><stop stop-color="#0b1423"/><stop offset="1" stop-color="#172038"/></linearGradient><linearGradient id="red-heat" x1=".4" y1="0" x2=".7" y2="1"><stop stop-color="#100713" stop-opacity="0"/><stop offset=".6" stop-color="#7a142c" stop-opacity=".25"/><stop offset=".88" stop-color="${cfg.accent}" stop-opacity=".9"/><stop offset="1" stop-color="#fa6471"/></linearGradient><linearGradient id="red-edge"><stop stop-color="#8ca2b6"/><stop offset=".5" stop-color="#d1dfdf"/><stop offset="1" stop-color="#c5cce3"/></linearGradient><pattern id="red-fine" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><path d="M0 0V6" stroke="#596286" stroke-opacity=".24" stroke-width="1"/></pattern><radialGradient id="red-glow"><stop stop-color="${cfg.accent}" stop-opacity=".25"/><stop offset="1" stop-color="#090d19" stop-opacity="0"/></radialGradient><radialGradient id="red-gridfade"><stop stop-color="white"/><stop offset=".92" stop-color="black"/></radialGradient><mask id="red-grid-mask"><ellipse cx="960" cy="350" rx="350" ry="235" fill="url(#red-gridfade)"/></mask><filter id="red-led-glow" x="-70%" y="-150%" width="240%" height="400%"><feGaussianBlur stdDeviation="7"/></filter><clipPath id="red-map-clip"><rect x="505" y="172" width="910" height="364" rx="10"/></clipPath></defs>`;
a+=`<g transform="translate(${dx} ${dy}) scale(${S})">`;R(0,0,1920,720,'url(#red-bg)');
// Side geometry keeps the supplied LCI silhouette and moves as a whole for the map.
function side(right){const m=x=>right?1920-x:x;const coords=pts=>pts.map((p,i)=>(i?'L':'M')+m(p[0])+' '+p[1]).join(' ')+'Z';
a+=`<g class="red-gauge-${right?'right':'left'}" transform="${matrix(right,isMap)}">`;a+=`<ellipse cx="${m(530)}" cy="535" rx="250" ry="130" fill="url(#red-glow)"/>`;
const band=[[563,94],[680,94],[511,326],[676,627],[563,627],[372,326]];
P(coords(band),'url(#red-ribbon)');if(right){const shape=rpmShapes(motion.rpm);P(shape.fill,'#6b83a8','none',1,'class="rpm-fill" opacity=".46"');}P(coords(band),'url(#red-fine)');P(coords([[690,320],[783,590],[708,590],[641,440]]),'url(#red-heat)');
P(`M${m(680)} 94L${m(511)} 326Q${m(508)} 331 ${m(512)} 338L${m(676)} 627`,'none','#3c425c',2);
P(`M${m(676)} 627L${m(563)} 627L${m(374)} 338Q${m(367)} 327 ${m(376)} 317L${m(563)} 94L${m(680)} 94`,'none','url(#red-edge)',7,'stroke-linejoin="round"');
const marks=right?[[0,0],[1,.16],[2,.32],[3,.48],[4,.64],[5,.76],[6,.88],[7,1]]:[[0,0],[30,.16],[60,.32],[90,.48],[120,.64],[150,.76],[200,.88],[260,1]];
const pt=t=>t<=.64?[563+(373-563)*t/.64,627+(326-627)*t/.64]:[373+(563-373)*(t-.64)/.36,326+(94-326)*(t-.64)/.36];
for(let k=0;k<7;k++)for(let j=0;j<5;j++){const t=marks[k][1]+(marks[k+1][1]-marks[k][1])*j/5,[x,y]=pt(t),major=j===0;L(m(x+6),y,m(x+(major?40:j===2?24:15)),y,right&&t>.94?cfg.accent:'#b9c9df',major?3:1.4);}
marks.forEach(([value,t],i)=>{if(narrow&&![0,2,4,7].includes(i))return;let[x,y]=pt(t);T(m(x-29),y+11,value,34,'#adbed4',right?'start':'end');});
const value=right?state.rpm/1000:state.speed;let idx=0;for(let i=0;i<7;i++)if(value>=marks[i][0])idx=i;const lo=marks[idx],hi=marks[idx+1],t=lo[1]+Math.max(0,Math.min(1,(value-lo[0])/(hi[0]-lo[0])))*(hi[1]-lo[1]);const[x,y]=pt(t);
if(right)P(rpmShapes(motion.rpm).pointer,'none','#eef6ff',3,'class="rpm-pointer"');else P(`M${m(x-2)} ${y-4}L${m(x+108)} ${y-11}L${m(x+108)} ${y+3}L${m(x)} ${y+5}Z`,'#d4e5fa','none',1,'class="speed-pointer"');
T(m(615),78,right?'1/min ×1000':'km/h',28,'#a8b9cc','middle');P(coords([[680,627],[722,629],[817,630],[832,624],[807,624],[720,625]]),cfg.accent);a+='</g>';
}
side(false);side(true);
// Thick paired LEDs advance from the outer ends into the centre.
const shift=state.source==='demo'&&state.rpm>=cfg.shiftAt;
a+=`<g data-led-group class="${shift?'shift-flash':''}">`;
for(let rank=0;rank<7;rank++){let threshold=cfg.shiftStart+rank*(cfg.shiftAt-cfg.shiftStart)/6,on=state.rpm>=threshold,color=rank<3?'#dfb653':rank<5?'#eb7646':cfg.accent;for(const right of [false,true]){let x=right?1171-rank*35:719+rank*35;R(x-2,39,34,25,color,5,`filter="url(#red-led-glow)" opacity="${on?'.58':'0'}" data-led-glow="${rank}"`);R(x,42,30,20,on?color:'#1b2739',4,`data-led-rank="${rank}"`);}}
a+='</g>';if(!tiny)T(960,104,'SHIFT',25,'#f16a7c','middle',`data-shift-label opacity="${shift?1:0}"`);
// Official transparent BMW M artwork, isolated from the site's combined BMW/M masthead.
a+=`<image href="${LOGO}" x="926.4" y="${isMap?108:163}" width="67.2" height="23.8"/>`;
if(!isMap){a+='<g mask="url(#red-grid-mask)">';for(let j=-3;j<8;j++){let y=175+j*61;L(620,y,1300,y+390,'#25406b',1.6);L(620,y,1300,y-390,'#25406b',1.6);}for(let i=0;i<12;i++)L(645+i*57,130,645+i*57,570,'#1b3052',1.4);a+='</g>';}
a+='<g class="red-bc">';
if(state.view==='original'){
T(960,400,f(state.speed),146,'#e6e9ee','middle','data-live-speed');T(960,451,'km/h',31,'#a6b8d0','middle');
}else if(state.view==='music'){
R(758,244,100,100,'#242139',5);P('M766 335L804 263L843 335Z','#9a3f5a');T(894,267,'Night Drive',40,'#e3e9f2');T(894,311,'Demo Artist',27,'#9eafc8');R(769,390,385,4,'#27334b');R(769,390,153,4,cfg.accent);T(769,434,'1:28',23,'#a4b6d1');T(1154,434,'3:42',23,'#a4b6d1','end');
}else if(state.view==='thermal'){
[['OLEJ',measured.oil,250],['CHLADIVO',measured.coolant,365],[tiny?'PŘEVOD.':'PŘEVODOVKA',measured.transmissionOil,480]].forEach(([label,val,y],row)=>{const begin=tiny?690:760,end=tiny?1230:1155,width=end-begin;T(begin,y-18,label,24,'#9bafc8');T(end,y-18,val+' °C',36,'#e0e9f3','end');for(let i=0;i<40;i++)R(begin+i*width/40,y,width/40-3,10,i<(val-40)/100*40?cfg.accent:'#1b283d');const mark=begin+.4*width;if(row<2)L(mark,y-7,mark,y+19,'#dfd0a7',3);T(begin,y+40,'40',20,'#8298b4');if(row<2)T(mark,y+40,'80*',20,'#d8cda9','middle');T(end,y+40,'140',20,'#8298b4','end');});
}else if(state.view==='tyres'){
measured.tyres.forEach((tyre,i)=>{const x=i%2?1060:770,y=i<2?250:405;T(x,y,tiny?tyre.short:tyre.name,24,'#9bafc8','start',`aria-label="${tyre.name}"`);T(x,y+45,f(tyre.pressure,1)+' bar',36,'#e0e9f3');T(x,y+83,tyre.temp+' °C',27,'#a6bdd7');});
}else if(state.view==='consumption'){
T(960,264,'Průměrná Spotřeba',31,'#bccce0','middle');T(960,309,f(measured.averageConsumption,2)+' l/100 km',28,'#e0e9f3','middle');
T(960,399,'Aktuální Spotřeba',31,'#bccce0','middle');T(960,450,f(consumptionNow(),1)+' l/100 km',36,'#e0e9f3','middle','data-live-consumption');
}else if(state.view==='power'){
const kw=state.torque*state.rpm/9549.2966;T(960,270,'Výkon motoru',32,'#bccce0','middle');T(960,353,f(kw)+' kW',68,'#e0e9f3','middle','data-live-power');T(960,405,f(kw*1.3596216)+' k · odhad',28,'#9eb4cf','middle','data-live-hp');
}else if(state.view==='performance'){
const p=state.source==='demo'?timer.out:recordTimer.out,t=v=>v===null?'—':f(v,2)+' s';
T(960,243,'ACCELERATION',25,'#91a5c0','middle');
[['0–50 km/h',p.last50,p.best50,770,'50'],['0–100 km/h',p.last100,p.best100,1020,'100']].forEach(([label,last,best,x,id])=>{T(x,300,label,29,'#b3c3d8');T(x,356,t(last),44,'#e6edf6','start',`data-time="last${id}"`);T(x,413,'PB '+t(best),25,'#df6477','start',`data-time="best${id}"`);});
T(960,476,p.active?f(p.elapsed,2)+' s':p.event,24,p.event.includes('PERSONAL')?'#ef7586':'#95aac7','middle','data-time-status');
}else{
a+='<g class="red-map" clip-path="url(#red-map-clip)">';R(505,172,910,364,'#0d1820');for(let i=0;i<6;i++){P(`M480 ${190+i*64}L760 ${155+i*66}L1040 ${230+i*44}L1440 ${165+i*70}`,'none','#25313a',15);P(`M${555+i*165} 160L${630+i*142} 355L${535+i*160} 550`,'none','#1d2a33',13);}P('M590 540L795 455L880 357L1055 296L1360 223','none','#2e5e9f',22);P('M590 540L795 455L880 357L1055 296L1360 223','none','#83b8f8',10);T(550,215,'Waze / CarPlay',26,'#cfdded');if(!narrow)T(550,253,'Vyhrazený střed · schematická projekce',21,'#9aaec1');a+='</g>';
}
a+='</g>';
if(state.view!=='original')T(960,568,f(state.speed)+' km/h',38,'#e0e8f2','middle','data-live-speed');T(960,638,state.gear,46,'#c9d5e5','middle','data-live-gear');
// Actual captured ranges and fuel, with no false percent signal.
P('M103 598L280 598L310 623L435 623','none','#6c819e',3);P('M1485 623L1610 623L1640 598L1817 598','none','#6c819e',3);
const pct=measured.fuelLitres/measured.tankLitres*100;
T(116,654,measured.fuelRange+' km',30,'#d7e0ec');
for(let i=0;i<32;i++)R(117+i*7,675,5,7,i<Math.round(pct/100*32)?'#bdcce0':'#233046');
T(675,683,'21:34',29,'#bccbdf','middle');
T(1840,654,measured.electricRange+' km',30,'#c4dcf3','end');if(!tiny)T(1624,654,'eDojezd',23,'#819fbe','end');
T(1245,683,'+ '+f(measured.outside,1)+' °C',29,'#c1d2e5','middle');
// Permanently visible, fine coolant meter beside electric range.
if(!tiny){T(1780,691,measured.coolant+' °C',25,'#b9ccdf','end');for(let i=0;i<24;i++)R(1536+i*9,705,6,5,i<(measured.coolant-40)/100*24?cfg.accent:'#253249');L(1622,699,1622,713,'#d4c09b',2);}
a+='</g>';svg.innerHTML=a;
if(animate&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
 svg.querySelector('.red-bc').animate([{transform:'translateY(12px)',opacity:0},{transform:'translateY(0)',opacity:1}],{duration:330,easing:'ease-out'});
 if(oldMap!==isMap)for(const right of [false,true])svg.querySelector('.red-gauge-'+(right?'right':'left')).animate([{transform:matrix(right,oldMap)},{transform:matrix(right,isMap)}],{duration:650,easing:'cubic-bezier(.22,.75,.15,1)'});
}
root.querySelector('[data-view]').value=state.view;root.querySelector('[data-source]').value=state.source;root.querySelector('.red-rpm').hidden=state.source!=='demo';root.querySelector('[data-rpm-label]').textContent=f(state.rpm)+' /min';root.querySelector('[data-rpm]').value=state.rpm;
const detail=state.source==='car'?'Záznam z tvého 330e · benzínový dojezd 98 km · eDojezd 0 km.':'SIMULACE · časy a Personal Best jsou ukázkové.';
root.querySelector('.red-status').textContent=detail+(state.view==='performance'?' Názvy 0–50 / 0–100 km/h; měření začíná při 5 km/h.':state.view==='thermal'?' *80 °C je návrhová značka oleje a chladiva, pro převodovku práh nestanoven.':state.view==='tyres'?' Tlak a teplota každého kola ze záznamu.'+(tiny?' LP/PP přední · LZ/PZ zadní.':''):state.view==='music'?' Hudební metadata jsou demo.':state.view==='consumption'?' Průměr 7,65 l/100 km je z cestovního BC.':state.view==='power'?' Odhad výkonu spalovacího motoru z momentu a otáček.':'');
root.querySelector('[data-drive]').textContent=state.play==='drive'?'Zastavit ukázku':'Ukázka jízdy · 24 s';
updateDynamics();if(state.play||Math.abs(motion.rpm-state.rpm)>.5)scheduleMotion();
}
function stop(){cancelAnimationFrame(raf);raf=0;state.play=null;state.lastTick=0;}
function applyRecord(){stop();Object.assign(state,{source:'car',speed:0,rpm:0,gear:'P',torque:0});render();}
function play(type){stop();state.source='demo';state.play=type;state.runStart=performance.now();state.lastTick=0;if(type==='drive'){state.view='performance';timer.reset();}const duration=type==='drive'?24000:8000;
 function tick(now){if(!root.isConnected){stop();return;}const ms=now-state.runStart;if(ms>=duration){stop();Object.assign(state,{speed:0,rpm:0,gear:'P',torque:0});save();render();return;}
 if(now-state.lastTick>=75){state.lastTick=now;let t=ms/1000;if(type==='drive'){
  let speed=t<1?0:t<8.5?(t-1)*14.4:t<10.5?108*(1-(t-8.5)/2):t<12?0:t<18?(t-12)*18:t<20?108*(1-(t-18)/2):0;
  state.speed=Math.max(0,speed);state.gear=speed>3?'M'+Math.min(5,1+Math.floor(speed/30)):'P';state.rpm=speed>3?2200+(speed%30)/30*4100:0;state.torque=speed>3?290:0;timer.sample(state.speed,ms);
 }else{state.speed=88;state.gear='M3';state.rpm=t<5?2800+t*660:t<7?6200:3000;state.torque=180;}
 root.querySelector('[data-rpm-label]').textContent=f(state.rpm)+' /min';root.querySelector('[data-rpm]').value=state.rpm;scheduleMotion();}raf=requestAnimationFrame(tick);
 }raf=requestAnimationFrame(tick);render(true);
}
root.querySelector('[data-bc]').onclick=()=>{state.view=views[(views.indexOf(state.view)+1)%views.length];render(true);save();};root.querySelector('[data-view]').onchange=e=>{state.view=e.target.value;render(true);save();};root.querySelector('[data-source]').onchange=e=>{if(e.target.value==='car')applyRecord();else{stop();Object.assign(state,{source:'demo',speed:88,rpm:2200,gear:'M3',torque:180});render();}save();};
root.querySelector('[data-drive]').onclick=()=>{if(state.play==='drive'){stop();render();save();}else play('drive');};root.querySelector('[data-lights]').onclick=()=>play('lights');root.querySelector('[data-rpm]').oninput=e=>{stop();Object.assign(state,{source:'demo',rpm:+e.target.value,speed:88,gear:'M3',torque:180});render();};
new ResizeObserver(()=>render()).observe(stage);render();
if(document.fonts)document.fonts.ready.then(()=>render());
if(globalThis.Tweak){const tweak=new Tweak({container:root,onChange:()=>render()});tweak.addSlider(cfg,'scale',{label:'Velikost bočních stupnic',min:.84,max:.98,step:.01});tweak.addSlider(cfg,'mapSpread',{label:'Rozšíření při mapě',min:90,max:180,step:5});tweak.addSlider(cfg,'shiftAt',{label:'Shift lights · horní práh návrhu',min:5200,max:6500,step:100,unit:'/min'});tweak.addColorPicker(cfg,'accent',{label:'Červený akcent'});}
window.addEventListener('openai:set_globals',e=>{const s=e.detail?.globals?.widgetState?.privateContent;if(s&&views.includes(s.view)){state.view=s.view;render();}});
})();
