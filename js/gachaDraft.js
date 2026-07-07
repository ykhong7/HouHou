class GachaDraft{
 constructor(gacha,assets){this.gacha=gacha;this.assets=assets;this.reset();}
 reset(){this.rolls=[];this.selected=null;this.anim=0;this.revealIndex=-1;}
 canRoll(){return this.rolls.length<3&&!this.selected;}
 roll(){if(!this.canRoll())return null;let key=this.gacha.roll(this.rolls);this.rolls.push(key);this.anim=.55;this.revealIndex=this.rolls.length-1;return key;}
 rollAt(i){if(this.selected||this.rolls[i])return null;let exclude=this.rolls.filter(Boolean);let key=this.gacha.roll(exclude);this.rolls[i]=key;this.anim=.55;this.revealIndex=i;return key;}
 choose(i){if(this.rolls[i]&&!this.selected){this.selected=this.rolls[i];return this.selected;}return null;}
 update(dt){if(this.anim>0)this.anim-=dt;}
 drawCard(c,x,y,w,h,key,i){let d=this.assets.characters[key];let selected=this.selected===key;let gc=gradeColor(d.grade);c.save();c.fillStyle=selected?'rgba(255,245,190,.95)':'rgba(255,255,255,.92)';panel(c,x,y,w,h,14);if(gc==='rainbow'){let colors=['#ff3b3b','#ff9f1c','#ffe600','#2ecc71','#3498db','#8e44ad'];for(let j=0;j<colors.length;j++){c.strokeStyle=colors[j];roundRect(c,x+j*2,y+j*2,w-j*4,h-j*4,14,false,true);}}else{c.strokeStyle=gc;c.lineWidth=3;roundRect(c,x,y,w,h,14,false,true);}let scale=(this.revealIndex===i&&this.anim>0)?1+Math.sin((.55-this.anim)*16)*.08:1;let img=d.sprites.idle;if(img)c.drawImage(img,0,0,96,96,x+w/2-48*scale,y+30,96*scale,96*scale);c.fillStyle='#111';c.textAlign='center';c.font='bold 16px sans-serif';c.fillText(d.grade,x+w/2,y+22);c.font=d.name.length>7?'16px sans-serif':'20px sans-serif';c.fillText(d.name,x+w/2,y+150);c.font='14px sans-serif';c.fillText('ATK '+d.atk+' / HP '+d.hp,x+w/2,y+174);c.fillText(i+1+'번 카드',x+w/2,y+198);if(selected){c.font='bold 18px sans-serif';c.fillText('선택됨',x+w/2,y+225);}c.restore();}
 draw(c){c.save();
  c.shadowColor='rgba(20,20,45,.30)';c.shadowBlur=22;c.shadowOffsetY=8;
  let bg=c.createLinearGradient(285,150,995,450);
  bg.addColorStop(0,'rgba(255,95,162,.96)');
  bg.addColorStop(.45,'rgba(139,92,246,.96)');
  bg.addColorStop(1,'rgba(34,211,238,.94)');
  c.fillStyle=bg;c.strokeStyle='rgba(255,255,255,.72)';c.lineWidth=2.2;roundRect(c,285,150,710,300,18,true,true);
  c.fillStyle='rgba(255,255,255,.96)';c.textAlign='center';c.font='bold 28px sans-serif';c.fillText('3회 뽑기 - 1명 선택',640,188);
  c.font='16px sans-serif';c.fillText('물음표 카드를 누르면 랜덤 캐릭터가 공개됩니다.',640,215);
  for(let i=0;i<3;i++){let x=330+i*210,y=235,w=170,h=200;if(this.rolls[i])this.drawCard(c,x,y,w,h,this.rolls[i],i);else{
   let g=c.createLinearGradient(x,y,x+w,y+h);g.addColorStop(0,'rgba(255,255,255,.96)');g.addColorStop(.52,'rgba(255,243,205,.96)');g.addColorStop(1,'rgba(219,234,254,.96)');
   c.fillStyle=g;roundRect(c,x,y,w,h,16,true,false);
   c.strokeStyle='rgba(255,255,255,.95)';c.lineWidth=3;roundRect(c,x,y,w,h,16,false,true);
   c.strokeStyle='rgba(255,95,162,.75)';c.lineWidth=1.6;roundRect(c,x+5,y+5,w-10,h-10,13,false,true);
   c.fillStyle='#8b5cf6';c.font='bold 66px sans-serif';c.fillText('?',x+w/2,y+116);
   c.fillStyle='#475569';c.font='bold 14px sans-serif';c.fillText('눌러서 공개',x+w/2,y+150);
  }}c.restore();}
}

