'use strict';
const assert=require('assert'),E=require('events'),{Session,conditions}=require('../apps/dv_lci_budiky/cluster/lci_session');
const good={speed:0,rpm:0,gear:'P',mode:3};assert.equal(conditions(good),'');for(const v of [{speed:1},{gear:'D1'},{mode:6},{mode:'INDIVIDUAL'},{rpm:null}])assert(conditions(Object.assign({},good,v)));
(async()=>{let now=100;const values={lciEnabled:'off',lciBCPage:0},settings={get:k=>values[k],set:(k,v)=>values[k]=v};
class V extends E{constructor(){super();this.v=Object.assign({},good);this.data={snapshot:()=>this.v};this.stops=0;}async start(){}stop(){this.stops++;}}
class R extends E{constructor(){super();this.phase='off';this.starts=0;this.reason='Vypnuto';}start(){this.starts++;this.phase='active';}update(){}stop(){this.phase='off';}view(){return{kind:'on',text:'Test běží'};}}
const vehicle=new V(),renderer=new R(),s=new Session({settings,log:{warn(){}},vehicle,renderer,now:()=>now,auto:false});
await s.request(true);s.tick();assert.equal(renderer.starts,1);assert.equal(s.phase,'active');values.lciBCPage=999;vehicle.emit('bc');assert.equal(values.lciBCPage,1);vehicle.v.gear='D1';s.tick();assert.equal(s.phase,'off');assert.equal(values.lciEnabled,'off');assert(vehicle.stops>0);
vehicle.v=Object.assign({},good);await s.request(true);s.tick();now+=60001;s.tick();assert.equal(s.phase,'off');assert.equal(values.lciEnabled,'off');
let done;vehicle.start=()=>new Promise(r=>done=r);const p=s.request(true);s.stop('Zrušeno');done();await p;assert.equal(s.phase,'off');assert.equal(renderer.starts,2,'cancelled startup cannot create a renderer');
console.log('PASS parked/Sport gate, live movement shutdown, 60 s lease and cancelled startup');})();
