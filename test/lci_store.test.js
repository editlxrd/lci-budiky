'use strict';
const assert=require('assert'),fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..'), m=require('../mgu-repo.json').apps;
assert(/^[^*]+\/\*$/.test(m.path),'Store path must be <folder>/*');
const folder=m.path.slice(0,-2);
const offered=fs.readdirSync(path.join(root,folder)).filter(x=>!m.exclude.includes(x)&&fs.existsSync(path.join(root,folder,x,m.manifest)));
assert.deepStrictEqual(offered,['dv_lci_budiky']);
console.log('PASS Store wildcard path and only LCI app offered');

const app=require('../apps/dv_lci_budiky/app.json');
assert.strictEqual(app.signals['de.bmw.infotainment.hmi.hmimediastate.HmiMediaState']._instances,'HMI_CID');
assert(fs.readFileSync(path.join(root,'apps/dv_lci_budiky/cluster/lci_vehicle.js'),'utf8').includes("HmiMediaState','HMI_CID'"));
