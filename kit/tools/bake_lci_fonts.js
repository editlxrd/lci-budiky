'use strict';
// Inter (SIL OFL): build-only dependencies fontkit and @resvg/resvg-js.
const fs=require('fs'),path=require('path'),zlib=require('zlib'),fontkit=require('fontkit'),{Resvg}=require('@resvg/resvg-js');
const root=path.resolve(__dirname,'../..'),font=fontkit.openSync(path.join(root,'docs/porovnani/assets/Inter.ttf'));
const chars=Array.from(new Set(Array.from(Array.from({length:224},(_,i)=>String.fromCharCode(i+32)).join('')+'ÁČĎÉĚÍŇÓŘŠŤÚŮÝŽáčďéěíňóřšťúůýž°·–—…×±²³€↑↓→←✓✕')));
for(const [name,weight] of [['regular',400],['strong',600]]){
 const f=font.getVariation({wght:weight,opsz:14}),sizes=[];
 for(const size of [18,24,32,44,64]){
  const k=size/f.unitsPerEm,W=1024,items=[];let x=0,y=0,row=0;
  for(const ch of chars){const g=f.glyphForCodePoint(ch.codePointAt(0)),b=g.bbox,ox=Math.floor(b.minX*k),oy=Math.floor(-b.maxY*k),w=Math.max(0,Math.ceil(b.maxX*k)-ox),h=Math.max(0,Math.ceil(-b.minY*k)-oy);
   if(x+w>W){x=0;y+=row+1;row=0;}let pixels=null;
   if(w&&h){const svg='<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'"><path fill="white" transform="translate('+(-ox)+' '+(-oy)+') scale('+k+' '+(-k)+')" d="'+g.path.toSVG()+'"/></svg>';pixels=new Resvg(svg).render().pixels;}
   items.push({ch,x,y,w,h,ox,oy,adv:g.advanceWidth*k,pixels});x+=w+1;row=Math.max(row,h);
  }
  const H=y+row+1,alpha=Buffer.alloc(W*H),glyphs={};
  for(const a of items){glyphs[a.ch.codePointAt(0)]=[a.x,a.y,a.w,a.h,a.ox,a.oy,+a.adv.toFixed(2)];if(a.pixels)for(let yy=0;yy<a.h;yy++)for(let xx=0;xx<a.w;xx++)alpha[(a.y+yy)*W+a.x+xx]=a.pixels[(yy*a.w+xx)*4+3];}
  sizes.push({size,ascent:Math.ceil(f.ascent*k),descent:Math.ceil(-f.descent*k),atlasW:W,atlasH:H,glyphs,alpha:zlib.deflateSync(alpha,{level:9}).toString('base64')});
 }
 const out=path.join(root,'apps/dv_lci_budiky/data/fonts/lci_'+name+'.json');fs.writeFileSync(out,JSON.stringify({family:'Inter',license:'SIL OFL 1.1',sizes}));console.log(name,sizes.length,'sizes');
}
