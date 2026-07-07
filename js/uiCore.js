// HouHou Fighter v1.3.0 - UI core helpers
// Extracted from game.bundle.js: inRect, roundRect, panel, modernPanel, gradeColor, Button.

function inRect(p,r){return p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;}
function roundRect(c,x,y,w,h,r=12,fill=true,stroke=true){
 c.beginPath();
 c.moveTo(x+r,y);
 c.lineTo(x+w-r,y);
 c.quadraticCurveTo(x+w,y,x+w,y+r);
 c.lineTo(x+w,y+h-r);
 c.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
 c.lineTo(x+r,y+h);
 c.quadraticCurveTo(x,y+h,x,y+h-r);
 c.lineTo(x,y+r);
 c.quadraticCurveTo(x,y,x+r,y);
 if(fill)c.fill();
 if(stroke)c.stroke();
}
function panel(c,x,y,w,h,r=14){
 c.save();
 c.shadowColor='rgba(0,0,0,.16)';
 c.shadowBlur=12;
 c.shadowOffsetY=4;
 c.fillStyle='rgba(255,255,255,.94)';
 c.strokeStyle='rgba(20,20,20,.85)';
 c.lineWidth=2;
 roundRect(c,x,y,w,h,r,true,true);
 c.restore();
}
function modernPanel(c,x,y,w,h,r=18,tone='neutral'){
 c.save();
 c.shadowColor='rgba(20,28,45,.24)';
 c.shadowBlur=20;
 c.shadowOffsetY=8;
 let g=c.createLinearGradient(x,y,x,y+h);
 if(tone==='win'){g.addColorStop(0,'rgba(255,247,225,.98)');g.addColorStop(1,'rgba(255,226,171,.96)');c.strokeStyle='rgba(205,135,35,.9)';}
 else if(tone==='lose'){g.addColorStop(0,'rgba(240,244,255,.98)');g.addColorStop(1,'rgba(205,214,232,.96)');c.strokeStyle='rgba(81,91,112,.9)';}
 else {g.addColorStop(0,'rgba(248,250,255,.98)');g.addColorStop(1,'rgba(226,232,242,.96)');c.strokeStyle='rgba(94,105,128,.72)';}
 c.fillStyle=g;
 c.lineWidth=2;
 roundRect(c,x,y,w,h,r,true,true);
 c.restore();
}

function gradeColor(g){return g==='SPECIAL'?'rainbow':g==='SUPER EPIC'?'super':(g==='LEGEND'||g==='LEGENDARY')?'#d49a00':g==='EPIC'?'#7d3cff':g==='RARE'?'#2d6cdf':'#555';}

class Button{
 constructor(x,y,w,h,label,fn){Object.assign(this,{x,y,w,h,label,fn});}
 draw(c){
  c.save();
  c.shadowColor='rgba(20,28,45,.24)';
  c.shadowBlur=12;
  c.shadowOffsetY=5;
  let g=c.createLinearGradient(this.x,this.y,this.x+this.w,this.y+this.h);
  g.addColorStop(0,'rgba(255,255,255,.98)');
  g.addColorStop(1,'rgba(221,229,242,.96)');
  c.strokeStyle='rgba(77,90,115,.75)';
  c.fillStyle=g;
  c.lineWidth=1.8;
  roundRect(c,this.x,this.y,this.w,this.h,14,true,true);
  c.fillStyle='#263143';
  c.font='bold 20px sans-serif';
  c.textAlign='center';
  c.fillText(this.label,this.x+this.w/2,this.y+33);
  c.restore();
 }
}
