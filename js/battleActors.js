class Projectile{
 constructor(owner,target,audio=null){
this.o=owner;
this.t=target;
this.audio=audio;

// 손에서 발사되는 위치
this.startX=owner.x+owner.dir*46;
this.startY=owner.y-58;

// 상대 발밑/지면을 향해 떨어지는 목표 위치
this.targetX=target.x-owner.dir*18;
this.targetY=target.y+35;

this.x=this.startX;
this.y=this.startY;

const speed=owner.projectileSpeed||((owner.projectileSpeedCells||8)*GRID_CELL);
const dx=this.targetX-this.startX;
const dy=this.targetY-this.startY;
const len=Math.max(1,Math.hypot(dx,dy));
this.vx=dx/len*speed;
this.vy=dy/len*speed;

this.life=0;
this.maxLife=Math.max(.25,len/speed+.15);
this.dead=false;
this.img=owner.projectileImage;
}
 update(dt,effects){
 const prevX=this.x;
 const prevY=this.y;
 this.life+=dt;
 this.x+=this.vx*dt;
 this.y+=this.vy*dt;

 const distToGround=Math.hypot(this.x-this.targetX,this.y-this.targetY);
 const prevDist=Math.hypot(prevX-this.targetX,prevY-this.targetY);
 const passed=distToGround>prevDist && this.life>0.05;
 const timeout=this.life>=this.maxLife;

 if(distToGround<28||passed||timeout){
  this.dead=true;

  let dmg=Math.max(1,Math.round(this.o.atk*(100/(100+this.t.def))));
  let crit=Math.random()<(this.o.critRate||0);
  if(crit)dmg=Math.round(dmg*critMultiplier(this.o));

  let final=this.t.damage(dmg,crit);
  if(this.o.paralyzeChance&&(this.t.paralyzeCooldown||0)<=0&&Math.random()<this.o.paralyzeChance){const pd=this.o.paralyzeDuration||1;this.t.stunTimer=Math.max(this.t.stunTimer||0,pd);this.t.paralyzeCooldown=pd+(this.o.paralyzeCooldownAfter||2);}

  if(this.o.lifeSteal){
   let heal=Math.max(1,Math.round(final*this.o.lifeSteal));
   this.o.hp=Math.min(this.o.maxHp,this.o.hp+heal);
   effects.spawnHeal(this.o.x,this.o.y,heal);
  }

  if(this.audio)this.audio.hit(this.t,crit);

  // 지면 충돌 지점에서 고유 이펙트 표시
  const oldX=this.t.x, oldY=this.t.y;
  this.t.x=this.targetX;
  this.t.y=this.targetY-12;
  effects.spawn(this.t,this.o,final,crit);
  this.t.x=oldX;
  this.t.y=oldY;
  return;
 }

 if(this.x<0||this.x>1280||this.y<0||this.y>720)this.dead=true;
}
 draw(c){
 if(this.img){
  let total=this.o.projectileFrames||1,start=this.o.projectileStartFrame||0,fw=this.o.projectileFrameWidth||96;
  let playable=Math.max(1,total-start);
  let fr=start+(Math.floor(Date.now()/80)%playable);
  const angle=Math.atan2(this.vy,this.vx);
  c.save();
  c.translate(this.x,this.y);
  c.rotate(angle*0.18);
  c.drawImage(this.img,fr*fw,0,fw,96,-48,-26,105,52);
  c.restore();
 }
}
}

class Fighter{
 constructor(d,x,dir){
Object.assign(this,d);
this.gridMoveSpeed=this.gridMoveSpeed||this.moveSpeed||1;
this.gridAttackRange=this.gridAttackRange||this.attackRange||1;
this.moveSpeed=this.gridMoveSpeed*GRID_CELL;
this.attackRange=this.gridAttackRange*GRID_CELL;
if(this.projectileSpeedCells)this.projectileSpeed=this.projectileSpeedCells*GRID_CELL;
this.x=x;this.y=505;this.dir=dir;this.maxHp=this.hp;this.state='idle';this.frame=0;this.anim=0;this.attackTimer=.25;this.attackAnimLock=0;this.hitTimer=0;this.stunTimer=0;this.paralyzeCooldown=0;this.knock=0;this.flash=0;this.isDead=false;
}
 update(dt){if(this.hp<=0){this.hp=0;this.isDead=true;this.state='dead';}this.anim+=dt;let cnt=this.animations[this.state]||1,sp=this.state==='walk'?8:this.state==='attack'?12:3;this.frame=Math.floor(this.anim*sp)%cnt;if(this.hitTimer>0)this.hitTimer-=dt;if(this.paralyzeCooldown>0)this.paralyzeCooldown=Math.max(0,this.paralyzeCooldown-dt);if(this.stunTimer>0){this.stunTimer=Math.max(0,this.stunTimer-dt);if(this.hp>0)this.state='hit';}if(this.attackAnimLock>0)this.attackAnimLock-=dt;if(this.flash>0)this.flash-=dt;if(this.knock>0)this.knock=Math.max(0,this.knock-dt*90);}
 damage(v,crit){let final=Math.max(1,Math.round(v*(1-(this.damageReduction||0))));this.hp=Math.max(0,this.hp-final);this.hitTimer=.15;this.flash=crit?.18:.1;this.knock=0;if(this.hp>0)this.state='hit';return final;}
 draw(c,debug,hidden=false){c.save();c.fillStyle='rgba(0,0,0,.12)';c.beginPath();c.ellipse(this.x,this.y+42,45,12,0,0,6.28);c.fill();if(hidden){this.drawHidden(c);c.restore();return;}this.hpbar(c, this.dir<0 ? 78 : -78, -18);if(debug)this.debug(c);let img=this.sprites[this.state]||this.sprites.idle;c.translate(this.x-this.dir*this.knock,this.y);c.scale(this.dir,1);if(img)c.drawImage(img,this.frame*this.frameSize,0,this.frameSize,this.frameSize,-96,-118,192,192);if(this.flash>0){c.globalAlpha=Math.min(.65,this.flash*5);c.fillStyle='#fff';c.globalCompositeOperation='source-atop';c.fillRect(-96,-118,192,192);}c.restore();if(this.stunTimer>0){c.save();c.textAlign='center';c.font='bold 18px sans-serif';c.fillStyle='#2d8cff';c.fillText('마비',this.x,this.y-172);c.strokeStyle='rgba(45,140,255,.75)';c.lineWidth=3;c.beginPath();c.ellipse(this.x,this.y-122,36,10,0,0,6.28);c.stroke();c.restore();}}
 drawHidden(c){c.save();c.textAlign='center';c.fillStyle='rgba(255,255,255,.95)';c.fillRect(this.x-65,this.y-150,130,150);c.strokeStyle='#111';c.lineWidth=3;c.strokeRect(this.x-65,this.y-150,130,150);c.fillStyle='#111';c.font='bold 86px sans-serif';c.fillText('?',this.x,this.y-45);c.font='18px sans-serif';c.fillText('상대 미공개',this.x,this.y-15);c.restore();}
 hpbar(c,ox=0,oy=0){
c.save();
let gc=gradeColor(this.grade);
let bx=this.x-74+ox, by=this.y-163+oy;
panel(c,bx,by,148,58,12);
if(gc==='rainbow'){
 let colors=['#ff3b3b','#ff9f1c','#ffe600','#2ecc71','#3498db','#8e44ad'];
 for(let i=0;i<colors.length;i++){c.strokeStyle=colors[i];c.lineWidth=2;roundRect(c,bx+i*1.5,by+i*1.5,148-i*3,58-i*3,12,false,true);}
}else if(gc==='super'){
 let colors=['#8e44ad','#b00020','#8e44ad'];
 for(let i=0;i<colors.length;i++){c.strokeStyle=colors[i];c.lineWidth=2;roundRect(c,bx+i*2,by+i*2,148-i*4,58-i*4,12,false,true);}
}else{
 c.strokeStyle=gc;c.lineWidth=3;roundRect(c,bx,by,148,58,12,false,true);
}
c.textAlign='center';
c.fillStyle=gc==='rainbow'?'#d43cff':gc==='super'?'#8b0000':gc;
c.font='bold 12px sans-serif';
c.fillText(this.grade||'NORMAL',bx+74,by+16);
c.fillStyle='#111';
let nm=this.name;
c.font=nm.length>8?'13px sans-serif':nm.length>6?'15px sans-serif':'18px sans-serif';
c.fillText(nm,bx+74,by+33);

// HP bar
c.strokeStyle='#111';
c.lineWidth=1.5;
roundRect(c,bx+18,by+40,112,12,5,false,true);
c.fillStyle='#fff';
roundRect(c,bx+20,by+42,108,8,4,true,false);
c.fillStyle='#d42020';
let hpw=Math.max(0,108*(this.hp/this.maxHp));
roundRect(c,bx+20,by+42,hpw,8,4,true,false);
c.fillStyle='#111';
c.font='10px sans-serif';
c.fillText(this.hp+'/'+this.maxHp,bx+74,by+50);
c.restore()}
debug(c){c.save();c.strokeStyle='rgba(255,0,0,.5)';c.setLineDash([6,5]);c.beginPath();c.arc(this.x,this.y,this.attackRange,0,6.28);c.stroke();c.restore();}
}
