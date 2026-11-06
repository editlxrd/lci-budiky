'use strict';
const PAGES=require('./lci_controls').PAGES;
const C={bg:'#080b10',card:'#11161e',line:'#252d38',text:'#eef2f7',dim:'#8793a5',red:'#e23d56',muted:'#341922'};
function text(cv,s,x,y,size,col,strong,align){cv.text(s,x,y,size,col||C.text,{font:strong?'lciStrong':'lci',align:align||'left',literal:true});}
function card(cv,x,y,w,h){cv.roundRect(x,y,w,h,15,C.card);cv.strokeRoundRect(x,y,w,h,15,1,C.line);}
function button(cv,label,x,y,w,h,run,primary,key){cv.roundRect(x,y,w,h,10,primary?C.red:'#202832');text(cv,label,x+w/2,y+h/2+9,25,C.text,true,'center');cv.target(x,y,w,h,run,key||label,10);}
function nav(cv,current,onPage){[['Budíky',0],['Nastavení',1],['Diagnostika',3]].forEach((v,i)=>{const x=24+i*222,on=current===v[1];cv.roundRect(x,10,208,62,10,on?C.muted:C.bg);text(cv,v[0],x+104,50,26,on?C.text:C.dim,on,'center');if(on)cv.fillRect(x+28,68,152,3,C.red);cv.target(x,10,208,62,()=>onPage(v[1]),'lci-nav:'+v[1],10);});text(cv,'LCI / OEM RED',1566,49,18,C.dim,false,'right');}
function draw(cv,page,controls,onPage,h,status){const v=controls.snapshot(),bottom=h||520;cv.clear(C.bg);nav(cv,page,onPage);const y=94,H=bottom-y-22;
 if(page===1){
  const gap=18,w=(1552-gap)/2,x1=24,x2=x1+w+gap,rh=(H-18)/2;
  function row(x,yy,title,value,sub,run,key){card(cv,x,yy,w,rh);text(cv,title,x+26,yy+43,27,C.text,true);text(cv,sub,x+26,yy+rh-22,18,C.dim);text(cv,value,x+w-28,yy+81,31,C.red,true,'right');if(run)cv.target(x,yy,w,rh,run,key,15);}
  row(x1,y,'Mapa uprostřed',v.map?'Zachovat':'Skrýt','Waze / CarPlay',()=>controls.toggle('lciMap'),'lci-map');
  row(x2,y,'Shift lights',v.shift?'Zapnuté':'Vypnuté','Světelná výzva k přeřazení',()=>controls.toggle('lciShift'),'lci-shift');
  row(x1,y+rh+18,'Bod přeřazení',v.shiftAt+' rpm','Klepnutím změnit otáčky',()=>controls.nextShift(),'lci-shift-at');
  row(x2,y+rh+18,'Jízdní režim','Sport Individual','Zatím ověřený režim tvého vozu');
 }else{
  const left=1000,rightX=1042,rightW=534;card(cv,24,y,left,H);card(cv,rightX,y,rightW,H);
  cv.fillRect(52,y+28,4,54,C.red);text(cv,'LCI Budíky',78,y+67,45,C.text,true);text(cv,'Vytvořeno Davidem My (330e)',54,y+111,25,C.dim);
  text(cv,'AKTUÁLNÍ STRÁNKA BC',54,y+163,18,C.dim,true);text(cv,PAGES[v.bc],54,y+211,36,C.text,true);
  for(let i=0;i<PAGES.length;i++)cv.roundRect(54+i*28,y+237,18,4,2,i===v.bc?C.red:C.line);
  button(cv,'Další hodnoty BC',54,y+H-86,430,58,()=>controls.nextBC(),true,'lci-bc');text(cv,'Záloha fyzického tlačítka na páčce',510,y+H-48,19,C.dim);
  text(cv,'Vlastní vzhled',rightX+28,y+47,26,C.text,true);text(cv,'OEM · červený akcent',rightX+28,y+86,23,C.dim);
  cv.fillRect(rightX+28,y+111,rightW-56,1,C.line);text(cv,'Ovládání budíků',rightX+28,y+157,25,C.text,true);
  button(cv,v.requested?'Vypnout test':'Zapnout test (60 s)',rightX+28,y+185,rightW-56,58,()=>controls.toggle('lciEnabled'),false,'lci-enable');
  const message=status?status.text:'Vypnuto';let line='',dy=0;for(const word of message.split(' ')){const next=(line?line+' ':'')+word;if(cv.textWidth(next,20,{font:'lci',literal:true})>rightW-56&&line){text(cv,line,rightX+28,y+284+dy*27,20,C.red,true);line=word;dy++;}else line=next;}if(dy<3)text(cv,line,rightX+28,y+284+dy*27,20,C.red,true);text(cv,'P · stání · Sport Individual',rightX+28,y+H-24,18,C.dim);
 }
}
module.exports={draw,nav,C};
