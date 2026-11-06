'use strict';
const EventEmitter=require('events'),isSportIndividual=require('./lci_vehicle').isSportIndividual;
function conditions(v){if(typeof v.speed!=='number'||!isFinite(v.speed))return 'Chybí čerstvá rychlost';if(v.speed>=1||v.speed<0)return 'Test vyžaduje stojící vůz';if(v.gear!=='P')return 'Test vyžaduje potvrzené P z převodovky';if(!isSportIndividual(v.mode))return 'Test vyžaduje Sport Individual';if(typeof v.rpm!=='number'||!isFinite(v.rpm))return 'Chybí čerstvé otáčky';return '';}
class Session extends EventEmitter{
 constructor(o){super();this.settings=o.settings;this.log=o.log;this.vehicle=o.vehicle;this.renderer=o.renderer;this.now=o.now||Date.now;this.phase='off';this.reason='Vypnuto';this.generation=0;this.settings.set('lciEnabled','off');this.vehicle.on('bc',()=>{if(this.phase==='active'||this.phase==='preparing'){const raw=Number(this.settings.get('lciBCPage')),n=Number.isInteger(raw)&&raw>=0&&raw<8?raw:0;this.settings.set('lciBCPage',(n+1)%8);this.emit('bc');}});this.renderer.on('fault',r=>this.stop(r));if(o.auto!==false)this.timer=setInterval(()=>this.tick(),100);}
 opts(){const s=this.settings,n=Number(s.get('lciBCPage')),shift=Number(s.get('lciShiftAt'));return{bc:Number.isInteger(n)&&n>=0&&n<8?n:0,map:s.get('lciMap')!=='off',shift:s.get('lciShift')!=='off',shiftAt:[5000,5500,6000,6500,7000].indexOf(shift)>=0?shift:6000};}
 async request(on){if(!on){this.stop('Vypnuto');return;}if(this.phase!=='off')return;this.phase='loading';this.reason='Načítám P, rychlost a jízdní režim';this.waitAt=this.now();const gen=++this.generation;this.settings.set('lciEnabled','on');try{await this.vehicle.start();if(gen!==this.generation||this.phase==='off')return;this.tick();}catch(e){if(gen===this.generation)this.stop(e.message);}}
 tick(){try{if(this.settings.get('lciEnabled')!=='on'){if(this.phase!=='off')this.stop('Vypnuto');return;}if(this.phase==='off'){this.request(true).catch(e=>this.stop(e.message));return;}
  const now=this.now(),v=this.vehicle.data.snapshot(now),why=conditions(v);
  if(this.phase==='loading'){this.reason=why||'Připravuji budíky';const definite=(typeof v.speed==='number'&&v.speed>=1)||(v.gear!==null&&v.gear!==undefined&&v.gear!=='P')||(v.mode!==null&&v.mode!==undefined&&!isSportIndividual(v.mode));if(why){if(definite||now-this.waitAt>=8000)this.stop(why);return;}
   this.phase='preparing';this.until=now+60000;this.renderer.start(v,this.opts());if(this.phase==='off')return;
  }
  if(why){this.stop(why);return;}if(now>=this.until){this.stop('Test po 60 sekundách ukončen');return;}
  this.renderer.update(v,this.opts());if(this.phase==='off')return;
  if(this.renderer.phase==='active'){this.phase='active';this.reason='Test běží · zbývá '+Math.ceil((this.until-now)/1000)+' s';}else this.reason=this.renderer.reason||'Připravuji grafiku';
 }catch(e){this.stop('Chyba: '+e.message);}}
 stop(reason){this.generation++;this.phase='off';this.reason=reason||'Vypnuto';this.settings.set('lciEnabled','off');this.renderer.stop(this.reason);this.vehicle.stop();this.emit('change');}
 close(){clearInterval(this.timer);this.stop('Aplikace zavřena');}
 view(){const v=this.vehicle.data.snapshot(this.now()),f=x=>x===null||x===undefined?'—':String(x);return{kind:this.phase==='active'?'on':this.phase==='off'?'off':'pending',text:this.reason,details:'EGS: '+f(v.gear)+' · '+f(v.speed)+' km/h · režim '+f(v.mode)+' · '+f(v.rpm)+' rpm'};}
}
module.exports={Session,conditions};
