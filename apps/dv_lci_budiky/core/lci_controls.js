'use strict';
const PAGES=['Rychlost','Hudba','Zahřátí pohonu','Pneumatiky','Spotřeba','Výkon','Časy 0–100 km/h','Mapa'];
class Controls{
 constructor(settings){this.settings=settings;}
 snapshot(){const s=this.settings,n=Number(s.get('lciBCPage'));return {bc:Number.isInteger(n)&&n>=0&&n<PAGES.length?n:0,shift:s.get('lciShift')!=='off',map:s.get('lciMap')!=='off',requested:s.get('lciEnabled')==='on',shiftAt:Number(s.get('lciShiftAt'))||6000};}
 nextBC(){const n=(this.snapshot().bc+1)%PAGES.length;this.settings.set('lciBCPage',n);return n;}
 toggle(key){if(['lciShift','lciMap','lciEnabled'].indexOf(key)<0)throw new Error('Nastavení není dovoleno');const defaultOn=key!=='lciEnabled';const on=this.settings.get(key)===undefined?defaultOn:this.settings.get(key)!=='off';this.settings.set(key,on?'off':'on');}
 nextShift(){const at=this.snapshot().shiftAt;this.settings.set('lciShiftAt',at>=7000?5000:at+500);}
}
module.exports={Controls,PAGES};
