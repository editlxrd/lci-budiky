'use strict';
// Inter glyph atlases include Czech; no system fonts or BMW font are needed at run time.
const path=require('path'),pack=require('./kit/pack'),fonts=require('./kit/fonts');
function install(){const p=pack.open(path.join(__dirname,'fonts'));const regular=p.json('lci_regular.json'),strong=p.json('lci_strong.json');
 ['label','light','lci'].forEach(n=>fonts.register(n,regular));['bold','lciStrong'].forEach(n=>fonts.register(n,strong));}
module.exports={install};
