'use strict';
const {Canvas}=require('./kit/canvas');
const PAGES=require('./lci_controls').PAGES,SK=require('./skin_core');
const fmt=(v,d)=>typeof v==='number'&&isFinite(v)?v.toFixed(d||0).replace('.',','):'—';
function paint(v,o,logo){const c=new Canvas(640,570),page=o.bc,map=o.mapVisible||page===7;c.clear([0,0,0,0]);
 const text=(s,x,y,n,col,align)=>c.text(s,x,y,n,col||'#edf2f8',{font:'lci',literal:true,align:align||'left'});
 const mid=(s,y,n,col)=>text(s,320,y,n,col,'center');
 if(!map){c.fillRect(80,0,472,510,'#020509');if(logo)c.drawImage(logo.data,logo.w,logo.h,286,55,68,25);
  if(page===0){mid(fmt(v.speed),300,145);mid('km/h',345,30,'#a7b9d0');}
  if(page===1){mid(v.title||'Bez hudebních metadat',165,28);mid(v.artist||'—',212,23,'#9cacc0');}
  if(page===2){[['OLEJ',v.oil],['CHLADIVO',v.coolant],['PŘEVODOVKA',v.transmissionOil]].forEach((r,i)=>{const y=135+i*100;text(r[0],95,y,22,'#9cacc0');text(fmt(r[1])+' °C',545,y,31,'#edf2f8','right');for(let k=0;k<40;k++)c.fillRect(95+k*11,y+19,8,7,typeof r[1]==='number'&&k<(r[1]-40)/100*40?'#e23d56':'#1d2734');});}
  if(page===3){[['Levé přední','FL'],['Pravé přední','FR'],['Levé zadní','RL'],['Pravé zadní','RR']].forEach((r,i)=>{const x=i%2?365:100,y=i<2?140:285;text(r[0],x,y,21,'#9cacc0');text(fmt(v['tyre'+r[1]+'Bar'],1)+' bar',x,y+41,32);text(fmt(v['tyre'+r[1]+'Temp'])+' °C',x,y+76,24,'#a7b9d0');});}
  if(page===4){mid('Průměrná Spotřeba',140,30);mid(fmt(v.averageConsumption,2)+' l/100 km',190,27);mid('Aktuální Spotřeba',285,30);mid(fmt(v.currentConsumption,1)+' l/100 km',340,34);}
  if(page===5){const kw=typeof v.rpm==='number'&&typeof v.torque==='number'?v.rpm*v.torque/9549.2966:null;mid('Výkon motoru',150,29);mid(fmt(kw)+' kW',245,70);mid(kw===null?'—':fmt(kw*1.3596216)+' k · odhad',300,25,'#9cacc0');}
  if(page===6){mid('0–50 km/h',145,28);mid('PB '+fmt(v.best50,2)+' s',195,37);mid('0–100 km/h',285,28);mid('PB '+fmt(v.best100,2)+' s',335,37);}
 }
 // Fixed position in every BC view; never draw the stock bottom strip (panel y >= 660).
 if(page!==0||map)mid(fmt(v.speed)+' km/h',map?530:470,map?22:31);
 mid(v.gear||'—',map?560:545,map?26:42);
 const protectedRects=SK.CUTS.filter(r=>r!==SK.CENTRE).concat([SK.SMALL_BOX.L,SK.SMALL_BOX.R]);if(map)protectedRects.push(SK.CENTRE);
 for(const r of protectedRects){const x0=Math.max(0,Math.floor(r[0]-640)),x1=Math.min(c.w,Math.ceil(r[2]-640)),y0=Math.max(0,Math.floor(r[1]-90)),y1=Math.min(c.h,Math.ceil(r[3]-90));for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++)c.d[(y*c.w+x)*4+3]=0;}
 return {w:c.w,h:c.h,data:Buffer.from(c.d),map,page:PAGES[page]};
}
module.exports={paint,fmt};
