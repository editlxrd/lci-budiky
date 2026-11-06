'use strict';
const fs=require('fs'),path=require('path'),cp=require('child_process'),acorn=require('acorn');
const root=path.resolve(__dirname,'../..');let count=0;
for(const f of fs.readdirSync(path.join(root,'test')).filter(f=>f.endsWith('.test.js')).sort()){
 const p=cp.spawnSync(process.execPath,[path.join(root,'test',f)],{cwd:root,encoding:'utf8'});process.stdout.write(p.stdout||'');process.stderr.write(p.stderr||'');if(p.status!==0)process.exit(p.status||1);count++;
}
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else if(e.name.endsWith('.js'))acorn.parse(fs.readFileSync(p,'utf8'),{ecmaVersion:2017});}}
walk(path.join(root,'apps/dv_lci_budiky'));console.log('PASS all '+count+' test suites and Node 8 app syntax');

const packaging=cp.spawnSync('python3',[path.join(root,'test/build_lci_test.py')],{cwd:root,encoding:'utf8'});process.stdout.write(packaging.stdout||'');process.stderr.write(packaging.stderr||'');if(packaging.status!==0)process.exit(packaging.status||1);
