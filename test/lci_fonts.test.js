'use strict';
const fs=require('fs'),zlib=require('zlib'),assert=require('assert');
for(const name of ['regular','strong']){
 const f=JSON.parse(fs.readFileSync('apps/dv_lci_budiky/data/fonts/lci_'+name+'.json'));
 for(const s of f.sizes){const px=zlib.inflateSync(Buffer.from(s.alpha,'base64'));assert.equal(px.length,s.atlasW*s.atlasH);
 for(const c of 'Příliš žluťoučký kůň úpěl ďábelské ódy. ĚŠČŘŽÝÁÍÉŮÚŤŇÓĎ')assert(s.glyphs[c.codePointAt(0)],name+' misses '+c);}
}
console.log('PASS Inter atlas dimensions and full Czech character coverage');
