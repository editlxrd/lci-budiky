'use strict';
const EventEmitter=require('events');
const TASU='com.harman.infotainment.systemfunctions.tasu.tasu.InternalTasu';
const LIMITS={speed:[0,330,1500],rpm:[0,8000,1500],gear:[0,0,1500],mode:[0,0,2000],oil:[-40,180,6000],coolant:[-40,160,6000],transmissionOil:[-40,180,15000],torque:[-200,800,2000],averageConsumption:[0,60,15000],currentConsumption:[0,100,15000],title:[0,0,10000],artist:[0,0,10000],guidance:[0,0,3000],guidanceNav:[0,0,3000],guidanceCarPlay:[0,0,3000]};
class Data{
 constructor(){this.values={};}
 put(k,v,at){let ok=false;const l=LIMITS[k]||(/Bar$/.test(k)?[.1,5,15000]:/Temp$/.test(k)?[-40,120,15000]:[0,10000,15000]);
  if(k==='mode')ok=Number.isInteger(v)||typeof v==='string';else if(k==='gear')ok=typeof v==='string'&&/^(P|N|R|D[1-9]?|M[1-9]?)$/.test(v);else if(k==='title'||k==='artist'){ok=typeof v==='string'&&v.length>0;if(ok)v=v.replace(/[\x00-\x1f]/g,' ').slice(0,64);}else if(k.indexOf('guidance')===0)ok=typeof v==='boolean';else ok=typeof v==='number'&&isFinite(v)&&v>=l[0]&&v<=l[1];
  this.values[k]={v:ok?v:null,at};
 }
 get(k,now){const d=this.values[k],ttl=(LIMITS[k]||[0,0,15000])[2];return d&&now>=d.at&&now-d.at<=ttl?d.v:null;}
 snapshot(now){const v={};Object.keys(this.values).forEach(k=>v[k]=this.get(k,now));v.guidance=v.guidanceNav===true||v.guidanceCarPlay===true;return v;}
}
class BC{constructor(){this.up=false;}feed(v){if(!Number.isInteger(v)||v<0||v>255){this.up=false;return false;}if(!(v&64)){this.up=true;return false;}const fire=this.up;this.up=false;return fire;}}
function isSportIndividual(v){return v===3||v==='SPORT_INDIVIDUAL';}
const JOBS=[[0x60,0xD10E],[0x18,0xDA2E],[0x60,0xD126],[0x60,0xD127],[0x12,0x5822],[0x18,0xDA12]];
function permitted(ecu,did){return JOBS.some(j=>j[0]===ecu&&j[1]===did);}
function decodeDid(ecu,did,raw){const b=Buffer.from(raw||[]);if(!permitted(ecu,did)||b.length<3||b[0]!==0x62||b.readUInt16BE(1)!==did)return {};const v=b.slice(3),out={};
 if(did===0xD10E&&v.length)out.bc=v[0];
 if(did===0xDA2E&&v.length>=2){out.gear=null;const a=v[0],s=v[1];if(a===0&&s===0)out.gear='P';else if(a===1&&s===1)out.gear='R';else if(a===2&&s===2)out.gear='N';else if((s===3||s===4)&&((a>=3&&a<=9)||a===16))out.gear=(s===3?'D':'M')+(a===16?8:a-2);}
 if(did===0xD126&&v.length>=6)out.currentConsumption=v.readUInt16BE(4)>=65533?null:v.readUInt16BE(4)/100;
 if(did===0xD127&&v.length>=2)out.averageConsumption=v.readUInt16BE(0)>=65533?null:v.readUInt16BE(0)/100;
 if(did===0x5822&&v.length)out.oil=v[0]===255?null:v[0]-60;
 if(did===0xDA12&&v.length>=2)out.transmissionOil=v.readInt16BE(0)-48;
 return out;
}
class Vehicle extends EventEmitter{
 constructor(signals,log,now){super();this.sig=signals;this.log=log;this.now=now||Date.now;this.data=new Data();this.seq=0;this.subs=[];this.running=false;this.bc=new BC();this.round=0;this.slow=0;this.units={};this.tyres={};}
 async start(){if(this.running)return;this.running=true;this.data=new Data();this.bc=new BC();const gen=++this.seq;const put=(k,v)=>{if(this.running&&this.seq===gen)this.data.put(k,v,this.now());};
 const fields=[
 ['de.bmw.infotainment.vehicle.Vehicle2','1',500,{statusCarSpeed2:v=>put('speed',number(v,'speedVehicleCentreOfGravity',1/64,0,65533))}],
 ['de.bmw.infotainment.vehicle.CDS','1',1000,{statusEngineSpeed2:v=>put('rpm',number(v,'actualValueRPMEngineCrankshaft',.25,0,65533)),statusEngineTemperature:v=>{put('oil',number(v,'temperatureEngineOilDrive',1,-48,255));put('coolant',number(v,'temperatureEngineDrive',1,-48,255));}}],
 ['de.bmw.infotainment.drivingexcitement.FES','1',500,{statusFESVehicleDynamicSwitchHMI:v=>put('mode',v&&v.actualValueModeDrivingExperience),statusActualValueTorque2:v=>put('torque',number(v,'actualValueTorqueCrankshaft',.5,-1023.5,4093))}],
 ['de.bmw.infotainment.vehicle.Vehicle','1',10000,{statusNewCurrentUnitsStatusExt:v=>{this.units=v||{};this.convertTyres();}}],
 ['de.bmw.infotainment.vehicle.TPMS','1',10000,{statusTyrePressure:v=>{this.tyres.p={v,at:this.now()};this.convertTyres();},statusTyreTemperature:v=>{this.tyres.t={v,at:this.now()};this.convertTyres();}}],
 ['de.bmw.infotainment.hmi.hmimediastate.HmiMediaState','HMI_CID',1000,{playerMetadata:v=>{put('title',v&&v.firstLineText);put('artist',v&&v.secondLineText);}}],
 ['de.bmw.infotainment.navigation.navigationstatus.NavigationStatus','1',1000,{guidingState:v=>{const x=v&&typeof v==='object'?v.guidingState:v;put('guidanceNav',x==='ACTIVE'||x===2);}}],
 ['de.bmw.infotainment.a4a.carplay.CarPlayManager','CarPlayManagerInst1',1000,{projectedGuidanceActive:v=>{const x=v&&typeof v==='object'?v.projectedGuidanceActive:v;put('guidanceCarPlay',x===true||x===1);}}]
 ];
 for(const row of fields){if(!this.running||this.seq!==gen)break;try{let provider=null;const handlers={};Object.keys(row[3]).forEach(f=>{handlers[f]=v=>{if(!this.running||this.seq!==gen||!provider||!provider.available)return;if(['statusCarSpeed2','statusEngineSpeed2','statusFESVehicleDynamicSwitchHMI'].indexOf(f)>=0)return;row[3][f](v);};});const sub=await this.sig.watch(row[0],row[1],handlers,this.log);provider=sub;if(!this.running||this.seq!==gen){if(sub&&sub.shutdown)sub.shutdown();break;}this.subs.push({sub,fields:row[3],period:row[2],next:0,busy:false});}catch(e){this.log.warn('LCI data: '+row[0]+': '+e.message);}}
 if(this.running&&this.seq===gen){this.timer=setInterval(()=>{this.pollGetters(gen);this.pollDid(gen).catch(e=>this.log.warn('LCI čtení: '+e.message));},100);this.pollGetters(gen);}
 }
 convertTyres(){if(!this.running)return;const pu=this.units.unitOfMeasurementAirPressure,tu=this.units.unitOfMeasurementTemperature;for(const suffix of ['FL','FR','RL','RR']){
  const src=suffix+'H',p=this.tyres.p,t=this.tyres.t;let bar=null,temp=null;
  if(p){const raw=p.v&&p.v['actualValuePressureTyre'+src];if(typeof raw==='number'&&raw>=0&&raw<65532){const x=raw*.1;if(pu===1||pu==='BAR')bar=x;else if(pu===2||pu==='KPA')bar=x/100;else if(pu===3||pu==='PSI')bar=x*.0689475729;}this.data.put('tyre'+suffix+'Bar',bar!==null&&bar<=5?bar:null,p.at);}
  if(t){const raw=t.v&&t.v['actualValueTemperatureTyre'+src];if(typeof raw==='number'&&raw>=0&&raw<65532){if(tu===1||tu==='C')temp=raw-40;else if(tu===2||tu==='F')temp=(raw-40-32)*5/9;}this.data.put('tyre'+suffix+'Temp',temp!==null&&temp>=-40&&temp<=120?temp:null,t.at);}
 }}
 pollGetters(gen){if(!this.running||gen!==this.seq)return;const at=this.now();for(const row of this.subs){if(row.busy||at<row.next||!row.sub.available||!row.sub.proxy)continue;row.next=at+row.period;row.busy=true;let p=Promise.resolve();for(const f of Object.keys(row.fields))p=p.then(()=>{if(!this.running||gen!==this.seq)return;return row.sub.proxy.getValue(f,800).then(v=>{if(this.running&&gen===this.seq&&row.sub.available)row.fields[f](v);}).catch(()=>{});});p.then(()=>{row.busy=false;},()=>{row.busy=false;});}}
 async readDid(ecu,did,gen){if(!permitted(ecu,did))throw new Error('Jen povolená čtení 0x22');if(!this.proxy){const p=await this.sig.proxy(TASU,'SystemFunctionsInternalTasuInst1');if(!this.running||gen!==this.seq){if(p&&p.shutdown)p.shutdown();return null;}this.proxy=p;await this.sig.on(p,'sendTasuResponse',v=>{if(this.running&&this.seq===gen&&this.proxy===p)this.reply(v);},this.log);}
 if(!this.running||gen!==this.seq)return null;return new Promise(resolve=>{const done=value=>{if(!this.pending||this.pending.done!==done)return;clearTimeout(this.pending.timer);this.pending=null;resolve(value);};this.pending={ecu,did,done,timer:setTimeout(()=>done(null),800)};
 this.sig.call(this.proxy,'sendTasuRequest',{sourceAddress:0xF2,targetAddress:ecu,serviceID:0x22,subroutineID:0,udsDataLength:2,udsData:Buffer.from([did>>8,did&255]),deadlockTime:0},1000).then(v=>{const e=v&&v.TasuErrorEnum;if(e!==undefined&&[0,1,'NO_ERROR','REQUEST_PENDING'].indexOf(e)<0)done(null);},()=>done(null));});}
 reply(value){if(!this.running||!this.pending)return;const err=value&&value.errorCode;if(err!==undefined&&err!==0&&err!=='NO_ERROR'){this.pending.done(null);return;}let raw=value&&value.udsResponse;if(raw&&raw.data)raw=raw.data;const b=Buffer.from(raw||[]),p=this.pending;if(b.length>=5&&b[2]===0x7F){p.done(null);return;}if(b.length<12||b[6]!==p.ecu)return;const v=b.slice(9);if(v[0]===0x7F&&v[1]===0x22){if(v[2]!==0x78)p.done(null);return;}if(v[0]===0x62&&v.readUInt16BE(1)===p.did)p.done(v);}
 async pollDid(gen){if(this.busy||!this.running||gen!==this.seq)return;this.busy=true;const n=this.round++%10,job=n<8?JOBS[0]:n===8?JOBS[1]:JOBS[2+this.slow++%4];try{const raw=await this.readDid(job[0],job[1],gen);if(!this.running||gen!==this.seq)return;const out=decodeDid(job[0],job[1],raw);if(job[1]===0xDA2E&&!Object.prototype.hasOwnProperty.call(out,'gear'))this.data.put('gear',null,this.now());if(job[1]===0xD10E&&!Object.prototype.hasOwnProperty.call(out,'bc'))this.bc.feed(null);Object.keys(out).forEach(k=>{if(k==='bc'){if(this.bc.feed(out[k]))this.emit('bc');}else this.data.put(k,out[k],this.now());});}finally{this.busy=false;}}
 stop(){this.running=false;this.seq++;clearInterval(this.timer);this.timer=null;if(this.pending)this.pending.done(null);for(const r of this.subs){try{if(r.sub.shutdown)r.sub.shutdown();}catch(e){}}this.subs=[];const p=this.proxy;this.proxy=null;if(p&&p.shutdown){try{p.shutdown();}catch(e){}}this.bc.feed(null);}
}
function number(v,key,scale,offset,invalid){const n=v&&v[key];return typeof n==='number'&&isFinite(n)&&n>=0&&n<invalid?n*scale+offset:null;}
module.exports={Vehicle,Data,BC,isSportIndividual,decodeDid,permitted,number,LIMITS};
