'use strict';
const fs=require('fs'),path=require('path'),os=require('os');
module.exports=function stage(){const root=path.resolve(__dirname,'..'),out=fs.mkdtempSync(path.join(os.tmpdir(),'lci-test-'));
function cp(src,dst){fs.mkdirSync(path.dirname(dst),{recursive:true});fs.copyFileSync(src,dst);}
function flat(d){for(const x of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,x.name);if(x.isDirectory()&&x.name!=='data')flat(p);else if(x.isFile()&&/\.(js|png)$/.test(x.name))cp(p,path.join(out,x.name==='main.js'?'app.js':x.name));}}
flat(path.join(root,'apps/dv_lci_budiky'));
function tree(src,dst){fs.mkdirSync(dst,{recursive:true});for(const x of fs.readdirSync(src,{withFileTypes:true})){const a=path.join(src,x.name),b=path.join(dst,x.name);if(x.isDirectory())tree(a,b);else cp(a,b);}}
tree(path.join(root,'kit/runtime'),path.join(out,'kit'));for(const n of ['fonts','lci_cluster'])tree(path.join(root,'apps/dv_lci_budiky/data',n),path.join(out,n));return out;};
