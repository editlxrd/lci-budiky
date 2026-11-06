'use strict';
const fs=require('fs'),path=require('path'),vm=require('vm');
const {Resvg}=require('@resvg/resvg-js'),fontkit=require('fontkit');
const ROOT=path.resolve(__dirname,'../..');
function straight(input){const b=Buffer.from(input);for(let i=0;i<b.length;i+=4){const a=b[i+3];if(a&&a<255)for(let c=0;c<3;c++)b[i+c]=Math.min(255,Math.round(b[i+c]*255/a));}return b;}
const font=fontkit.openSync(path.join(ROOT,'docs/porovnani/assets/Inter.ttf'));
const out=path.join(ROOT,'preview-stage/cluster-art');fs.mkdirSync(out,{recursive:true});
function outline(text,x,y,size,anchor,color){const run=font.layout(text),scale=size/font.unitsPerEm,width=run.positions.reduce((s,p)=>s+p.xAdvance,0)*scale;let dx=anchor==='middle'?-width/2:anchor==='end'?-width:0;let str='';run.glyphs.forEach((g,i)=>{const p=run.positions[i];str+=`<path d="${g.path.toSVG()}" transform="translate(${x+dx+p.xOffset*scale},${y-p.yOffset*scale}) scale(${scale},${-scale})" fill="${color||'#c9d7e4'}"/>`;dx+=p.xAdvance*scale;});return str;}
const script=fs.readFileSync(path.join(ROOT,'design/approved-layout.js'),'utf8');let svgContent='';
const dummy=()=>({value:0,hidden:false,textContent:'',onclick:null,onchange:null,oninput:null});const attrs={};const svg={get innerHTML(){return svgContent;},set innerHTML(v){svgContent=v;},dataset:{},setAttribute:(n,v)=>attrs[n]=v,querySelector:()=>null,querySelectorAll:()=>[]};
const stage={clientWidth:1920,clientHeight:720,querySelector:()=>svg};const controls={};const root={isConnected:true,querySelector:s=>s==='.red-screen'?stage:(controls[s]||(controls[s]=dummy()))};
vm.runInNewContext(script,{document:{getElementById:()=>root},window:{addEventListener:()=>{}},ResizeObserver:class{observe(){}},requestAnimationFrame:()=>1,cancelAnimationFrame:()=>{},performance:{now:()=>0},matchMedia:()=>({matches:true}),setTimeout,clearTimeout,console});
let faces=(svgContent.match(/<g class="red-gauge-(?:left|right)"[\s\S]*?<\/g>/g)||[]).join('');
if(!faces)throw new Error('Approved geometry extraction failed');
faces=faces.replace(/<path[^>]*class="(?:rpm-fill|rpm-pointer|speed-pointer)"[^>]*\/>/g,'');
faces=faces.replace(/<text\b([^>]*)>([^<]*)<\/text>/g,(all,attrs,text)=>{const get=n=>(new RegExp(n+'="([^"]*)"').exec(attrs)||[])[1];return outline(text,Number(get('x')),Number(get('y')),Number(get('font-size')),get('text-anchor'),get('fill'));});
const defs=(svgContent.match(/<defs>[\s\S]*?<\/defs>/)||[''])[0];
const originalLogo=fs.readFileSync(path.join(ROOT,'design/bmw-m-mark.svg'),'utf8');const mPaths=originalLogo.match(/<g clip-path="url\(#b\)">([\s\S]*?)<\/g>/)[1];const croppedLogo='<svg xmlns="http://www.w3.org/2000/svg" viewBox="65.121 13.391 74 25.855">'+mPaths+'</svg>';const mLogo='<image href="data:image/svg+xml;base64,'+Buffer.from(croppedLogo).toString('base64')+'" x="926.4" y="163" width="67.2" height="23.8"/>';
const svgFace='<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="720">'+defs+faces+mLogo+'</svg>';
fs.writeFileSync(path.join(out,'face.svg'),svgFace);const face=new Resvg(svgFace).render();fs.writeFileSync(path.join(out,'face.rgba'),straight(face.pixels));fs.writeFileSync(path.join(out,'face.png'),new Resvg(svgFace.replace('</defs>','</defs><rect width="1920" height="720" fill="#020509"/>')).render().asPng());
console.log('Approved face rebuilt with Inter.');
