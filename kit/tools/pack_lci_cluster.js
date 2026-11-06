'use strict';
const fs=require('fs'),path=require('path'),zlib=require('zlib');
const root=path.resolve(__dirname,'../..'),A=require('../../apps/dv_lci_budiky/cluster/skin_assets'),S=require('../../apps/dv_lci_budiky/cluster/skin_core'),PNG=require('../../kit/runtime/png');
const face=fs.readFileSync(path.join(root,'preview-stage/cluster-art/face.rgba')),stock=PNG.decode(fs.readFileSync(path.join(root,'apps/dv_lci_budiky/images/skin_stock.png')));
const target=path.join(root,'apps/dv_lci_budiky/data/lci_cluster');fs.mkdirSync(target,{recursive:true});
const cuts=S.CUTS.concat([S.SMALL_BOX.L,S.SMALL_BOX.R]);
function protectedAt(x,y){return cuts.some(r=>x>=r[0]&&x<r[2]&&y>=r[1]&&y<r[3]);}
const meta={panel:[1920,720],cuts,sides:{},look:'approved G20 red / Inter',maxLayers:4};
for(const side of ['L','R']){
 const region=S.SIDES[side],W=region.w,H=region.h,data=Buffer.alloc(W*H*4),iSide=side==='L'?0:1;
 for(let yy=0;yy<H;yy++)for(let xx=0;xx<W;xx++){
  const x=region.x+xx,y=region.y+yy,d=(yy*W+xx)*4;if(protectedAt(x,y))continue;
  const cover=stock.data[(yy*stock.w+iSide*W+xx)*4+3],ca=cover>=128?1:cover/127;
  const ox=Math.floor((x-(side==='L'?-150:342))/.9),oy=Math.floor((y-40)/.9),q=(oy*1920+ox)*4;
  const ownHalf=side==='L'?ox<900:ox>1020;const a=ownHalf&&ox>=0&&ox<1920&&oy>=0&&oy<720?face[q+3]/255:0,alpha=a+ca*(1-a);
  if(!alpha)continue;for(let c=0;c<3;c++)data[d+c]=Math.round(((a?face[q+c]:0)*a+[2,5,9][c]*ca*(1-a))/alpha);data[d+3]=Math.round(alpha*255);
 }
 const atlas=A.pack({w:W,h:H,data});
 const obj={w:atlas.w,h:atlas.h,dims:atlas.dims,src:atlas.src,data:zlib.deflateSync(atlas.data).toString('base64')};
 fs.writeFileSync(path.join(target,'side_'+side+'.json'),JSON.stringify(obj));meta.sides[side]={region,dims:atlas.dims,pixelBytes:atlas.w*atlas.h*8};
}
const logo=Buffer.alloc(68*25*4);for(let y=0;y<25;y++)face.copy(logo,y*68*4,((163+y)*1920+926)*4,((163+y)*1920+994)*4);
fs.writeFileSync(path.join(target,'logo.json'),JSON.stringify({w:68,h:25,data:zlib.deflateSync(logo).toString('base64')}));
meta.sideBytes=Object.keys(meta.sides).reduce((n,k)=>n+meta.sides[k].pixelBytes,0);meta.centreBytes=640*570*8;meta.totalBytes=meta.sideBytes+meta.centreBytes;
fs.writeFileSync(path.join(target,'meta.json'),JSON.stringify(meta));console.log(JSON.stringify(meta));
