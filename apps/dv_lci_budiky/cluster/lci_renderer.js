'use strict';
// Renderer ownership, pixel accounting and dead-man animation follow G's Dash's approach.
const EventEmitter=require('events'),path=require('path'),zlib=require('zlib');
const CL=require('./kit/cluster_render'),MEM=require('./cluster_memory'),FS=require('./failsafe'),pack=require('./kit/pack'),SH=require('./lci_shaders'),Painter=require('./lci_painter');
class Renderer extends EventEmitter{
 constructor(log,options){super();this.log=log;this.o=options||{};this.now=this.o.now||Date.now;this.cr=null;this.phase='off';this.reason='Vypnuto';this.lastErr='';this.guard={crashed:false,strikes:0};this.refs=[];this.assets=[];this.layers={};this.meta=null;}
 load(){if(this.meta)return;const p=pack.open(path.join(__dirname,'lci_cluster'));this.meta=p.json('meta.json');if(!this.meta.sides||this.meta.maxLayers!==4)throw new Error('Chybí grafické podklady');this.textures={};for(const s of ['L','R']){const j=p.json('side_'+s+'.json');this.textures[s]={w:j.w,h:j.h,data:zlib.inflateSync(Buffer.from(j.data,'base64'))};}const l=p.json('logo.json');this.logo={w:l.w,h:l.h,data:zlib.inflateSync(Buffer.from(l.data,'base64'))};}
 start(v,options){this.stop('Příprava');this.lastErr='';this.load();this.v=v;this.opts=options;this.started=this.now();this.statusAt=this.started;this.lastStatusAsk=0;this.mapVisible=false;this.phase='connecting';this.reason='Připojuji vykreslování';const c=CL.loadClient(this.o);if(c.error){this.fault(c.text);return;}
 const cr=this.cr=new c.ClusterRender('dv_lci_budiky',c.sock);this.refs=[];this.assets=[];this.layers={};this.textKey='';this.level=null;this.statusText='';
 cr.on('ready',()=>{if(this.cr!==cr)return;if(cr.backend!=='id7'||String(cr.targets).indexOf('panel:1920x720')<0){this.fault('Nepodporovaný panel nebo backend');return;}this.reason='Kontroluji paměť rendereru';cr.status();});
 cr.on('status',text=>{if(this.cr!==cr)return;this.statusAt=this.now();this.statusText=String(text||'');const uploads=MEM.uploads(this.statusText,'dv_lci_budiky','panel');if(this.phase==='active'&&(uploads.failed||uploads.unwritten||uploads.assets!==this.assets.length)){this.fault('Nahrání nebo držení grafiky selhalo');return;}this.mapVisible=/layer \d+ \w+ of \S+ on map,.*: (shown|suspended)/.test(this.statusText);
  try{if(this.phase==='connecting')this.build();if(this.phase==='preparing')this.confirm();}catch(e){this.fault(e.message);}});
 cr.on('layer',(ref,state,why)=>{if(this.cr!==cr||this.refs.indexOf(ref)<0)return;this.layers[ref]=state;if(state==='error'||(this.phase==='active'&&['unavailable','stalled','waiting'].indexOf(state)>=0))this.fault('Vrstva není dostupná: '+(why||state));});
 cr.on('refused',(op,ref,why)=>{if(this.cr===cr&&op!=='drop'){this.lastErr=op+': '+why;this.fault('Renderer odmítl '+op+': '+why);}});
 cr.on('disconnected',()=>{if(this.cr===cr)this.fault('Spojení s rendererem ztraceno');});
 cr.on('target',(target,state)=>{if(this.cr===cr&&target==='panel'&&['unavailable','parked','waiting'].indexOf(state)>=0)this.fault('Panel není dostupný: '+state);});
 cr.connect();
 }
 asset(t){const ref=this.cr.asset({target:'panel',format:'rgba8',w:t.w,h:t.h,sampling:'nearest'});if(!ref)throw new Error('Asset nebyl přijat');this.assets.push(ref);this.cr.pixels(ref,null,t.data);return ref;}
 effect(opts){const ref=this.cr.effect(Object.assign({target:'panel',klass:'content',exclusive:false,contend:false,visible:true,z:90},opts));if(!ref)throw new Error('Vrstva nebyla přijata');this.refs.push(ref);this.layers[ref]='preparing';const row={ref,anim:0,base:-1};FS.setBase(this.cr,row,0);return row;}
 build(){const cr=this.cr,fit=MEM.fits(this.statusText,this.meta.totalBytes);if(!fit.ok)throw new Error('Nedostatek sdílené grafické paměti');this.phase='preparing';this.reason='Připravuji 4 grafické vrstvy';this.rows=[];
 for(const s of ['L','R']){const region=this.meta.sides[s].region,a=this.asset(this.textures[s]),L=this.effect({x:region.x,y:region.y,w:region.w,h:region.h,fs:SH.side(region,this.meta.sides[s].dims,s)});cr.bind(L.ref,'u_art',a);cr.uniform(L.ref,'u_level',[0]);this.rows.push(L);if(s==='R')this.rpmRef=L.ref;}
 const opts=Object.assign({},this.opts,{mapVisible:this.opts.map&&(this.mapVisible||this.v.guidance===true)}),img=Painter.paint(this.v,opts,this.logo);this.contentAsset=this.asset(img);const centre=this.effect({x:640,y:90,w:640,h:570,fs:SH.centre,z:91});cr.bind(centre.ref,'u_content',this.contentAsset);this.rows.push(centre);
 this.lights=this.effect({x:719,y:38,w:482,h:28,fs:SH.lights,time:true,z:92});this.rows.push(this.lights);cr.uniform(this.lights.ref,'u_rpm',[0]);cr.uniform(this.lights.ref,'u_shift',[this.opts.shiftAt]);cr.uniform(this.lights.ref,'u_on',[0]);cr.status();
 }
 confirm(){const up=MEM.uploads(this.statusText,'dv_lci_budiky','panel');if(up.failed)throw new Error('Nahrání grafiky selhalo');if(this.refs.length!==4||up.assets!==this.assets.length||up.unwritten||this.refs.some(r=>this.layers[r]!=='shown'))return;this.phase='active';this.reason='Test běží';for(const L of this.rows)FS.setBase(this.cr,L,1);this.rearm();this.emit('active');}
 rearm(){if(!this.cr||this.phase!=='active')return;for(const L of this.rows)if(!FS.rearm(this.cr,L,200,40))throw new Error('Nelze aktivovat hlídání čerstvosti');this.rearmed=this.now();}
 update(v,options){if(!this.cr)return;this.v=v;this.opts=options;const at=this.now();try{
  if(at-this.started>8000&&this.phase!=='active')throw new Error('Grafika nebyla potvrzena do 8 sekund');
  if(at-this.statusAt>3500)throw new Error('Renderer přestal odpovídat');
  if(at-this.lastStatusAsk> (this.phase==='active'?1000:200)){this.lastStatusAsk=at;this.cr.status();}
  if(this.phase!=='active')return;
  const map=options.map&&(this.mapVisible||v.guidance===true),next=SH.level(v.rpm||0);if(next!==this.level){if(this.rpmAnim)this.cr.stop(this.rpmRef,this.rpmAnim);this.cr.uniform(this.rpmRef,'u_level',[this.level===null?next:this.level]);this.rpmAnim=this.cr.animate(this.rpmRef,{property:'uniform',name:'u_level',keys:[[0,this.level===null?next:this.level],[120,next]]});this.level=next;}
  this.cr.uniform(this.lights.ref,'u_rpm',[v.rpm||0]);this.cr.uniform(this.lights.ref,'u_shift',[options.shiftAt]);this.cr.uniform(this.lights.ref,'u_on',[options.shift?1:0]);
  const key=JSON.stringify([options.bc,map,v.speed,v.gear,v.title,v.artist,v.oil,v.coolant,v.transmissionOil,v.tyreFLBar,v.tyreFRBar,v.tyreRLBar,v.tyreRRBar,v.tyreFLTemp,v.tyreFRTemp,v.tyreRLTemp,v.tyreRRTemp,v.averageConsumption,v.currentConsumption,v.rpm,v.torque,v.best50,v.best100]);
  if(key!==this.textKey){this.textKey=key;const img=Painter.paint(v,Object.assign({},options,{mapVisible:map}),this.logo);this.cr.pixels(this.contentAsset,null,img.data);}
  if(at-(this.rearmed||0)>=60)this.rearm();
 }catch(e){this.fault(e.message);}}
 fault(reason){this.lastErr=reason;this.stop(reason);this.emit('fault',reason);}
 stop(reason){const cr=this.cr;this.cr=null;if(cr){for(const L of this.rows||[]){try{FS.setBase(cr,L,0);}catch(e){}}for(const ref of this.refs){try{cr.drop(ref);}catch(e){}}for(const a of this.assets){try{cr.drop(a);}catch(e){}}cr.close();}this.refs=[];this.assets=[];this.rows=[];this.phase='off';this.reason=reason||'Vypnuto';this.rpmAnim=0;}
 view(){return {kind:this.phase==='active'?'on':this.phase==='off'?'off':'pending',text:this.reason};}
 refusal(){return this.lastErr;}
}
module.exports={Renderer};
