'use strict';
const FRESH='precision highp float;varying vec2 v_uv;uniform float u_fresh;';
function side(region,dims,side){const q=side==='R'?'(p-vec2(342.,40.))/.9':'(p-vec2(-150.,40.))/.9';return FRESH+`uniform sampler2D u_art;uniform float u_level;
 vec4 tex(vec2 p){vec2 tile=floor(p/16.);vec4 h=texture2D(u_art,(tile+.5)/vec2(${dims[0]}.0,${dims[1]}.0));float n=floor(h.r*255.+.5)+floor(h.g*255.+.5)*256.;vec2 pos=vec2(mod(n,32.)*16.,${dims[2]}.0+floor(n/32.)*16.)+mod(p,16.);return texture2D(u_art,(pos+.5)/vec2(${dims[0]}.0,${dims[1]}.0));}
 void main(){vec2 local=floor(v_uv*vec2(${region.w}.0,${region.h}.0));vec2 p=local+vec2(${region.x}.0,${region.y}.0);vec4 col=tex(local);
 ${side==='R'?`if(col.a>.1){vec2 old=${q};vec2 g=(old-vec2(135.,32.4))/.91;float x=1920.-g.x,y=g.y,t=2.,outer=0.,inner=0.;if(y>=326.&&y<=627.){float a=(y-326.)/301.;outer=mix(373.,563.,a);inner=mix(511.,676.,a);t=(1.-a)*.64;}else if(y>=94.&&y<326.){float a=(326.-y)/232.;outer=mix(373.,563.,a);inner=mix(511.,680.,a);t=.64+a*.36;}if(x>=outer&&x<=inner&&t<=u_level)col.rgb=mix(col.rgb,vec3(.75,.84,.96),.5);if(x>=outer&&x<=inner&&abs(t-u_level)<.005&&u_level>0.)col.rgb=vec3(.96,.98,1.);}`:''}
 gl_FragColor=vec4(col.rgb,col.a*u_fresh);}`;}
const centre=FRESH+'uniform sampler2D u_content;void main(){vec4 c=texture2D(u_content,v_uv);gl_FragColor=vec4(c.rgb,c.a*u_fresh);}';
const lights=FRESH+`uniform float u_rpm;uniform float u_shift;uniform float u_time;uniform float u_on;
 void main(){vec2 p=v_uv*vec2(482.,28.);float ix=floor(p.x/35.);float k=min(ix,13.-ix);float x=mod(p.x,35.);if(ix>13.||x>30.)discard;float edge=min(min(x,30.-x),min(p.y,28.-p.y));float glow=smoothstep(0.,4.,edge);bool lit=u_rpm>=u_shift-1600.+k*(1600./6.);vec3 c=k<3.?vec3(.85,.68,.3):k<5.?vec3(.94,.35,.3):vec3(.94,.12,.23);float blink=u_rpm>=u_shift&&fract(u_time*3.6)>.5?.12:1.;gl_FragColor=vec4(lit?c:vec3(.07,.09,.13),u_fresh*u_on*(lit?(.3+.7*glow)*blink:.6));}`;
function level(rpm){const v=Math.max(0,Math.min(7,rpm/1000)),a=[0,.16,.32,.48,.64,.76,.88,1],i=Math.min(6,Math.floor(v));return a[i]+(v-i)*(a[i+1]-a[i]);}
module.exports={side,centre,lights,level};
