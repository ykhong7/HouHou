// v1.7.0: Combat effect and critical damage helpers moved out of game.bundle.js
function critMultiplier(u){
 const min=Number.isFinite(Number(u.critDamageMin))?Number(u.critDamageMin):(Number.isFinite(Number(u.criticalMin))?Number(u.criticalMin):(Number.isFinite(Number(u.criticalMultiplier))?Number(u.criticalMultiplier):1.5));
 const max=Number.isFinite(Number(u.critDamageMax))?Number(u.critDamageMax):(Number.isFinite(Number(u.criticalMax))?Number(u.criticalMax):min);
 const lo=Math.min(min,max);
 const hi=Math.max(min,max);
 if(hi<=lo)return lo;
 return lo+Math.random()*(hi-lo);
}

function loadImage(src){return new Promise(resolve=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>resolve(null);img.src=src;});}
// UI helpers moved to js/uiCore.js in v1.3.0


// Assets class moved to js/assetManager.js in v1.6.0


// Gacha class moved to js/gachaManager.js in v1.5.0


// AudioManager moved to js/audioManager.js in v1.4.0


// Button class moved to js/uiCore.js in v1.3.0


class Effects{
 constructor(){this.items=[];this.heals=[];this.shake=0;this.hitStop=0;}
 clear(){this.items=[];this.heals=[];this.shake=0;this.hitStop=0;}
 spawn(target,attacker,dmg,crit){let cx=attacker.centerEffect?attacker.x:(target.x-attacker.dir*18),cy=attacker.centerEffect?(attacker.y-48):(attacker.attackType==='projectile'?target.y+12:target.y-25);let dur=attacker.effectFrameSequence?Math.max(.4,attacker.effectFrameSequence.length/18):(crit?.55:.4);this.items.push({x:cx,y:cy,tx:target.x,ty:target.y-48,dmg,crit,img:attacker.effectImage,frames:attacker.effectFrames||5,start:attacker.effectStartFrame||0,fw:attacker.effectFrameWidth||96,seq:attacker.effectFrameSequence||null,offsets:attacker.effectFrameOffsets||null,dir:attacker.dir||1,t:0,l:dur,key:attacker.key,ground:attacker.attackType==='projectile'&&!attacker.centerEffect,center:!!attacker.centerEffect,scale:attacker.effectScale||1,hitEffect:!!attacker.hitEffect,hitStart:attacker.hitEffectStart||.38});this.shake=crit?.22:.12;this.hitStop=crit?.06:.035;}
 update(dt){let rd=dt;if(this.hitStop>0){this.hitStop-=dt;dt=0;}for(const e of this.items)e.t+=rd;this.items=this.items.filter(e=>e.t<e.l);for(const h of this.heals)h.t+=rd;this.heals=this.heals.filter(h=>h.t<h.l);if(this.shake>0)this.shake-=rd;}spawnHeal(x,y,amount){if(amount>0)this.heals.push({x,y,amount,t:0,l:.65});}
 offset(){return this.shake>0?{x:(Math.random()-.5)*10,y:(Math.random()-.5)*6}:{x:0,y:0};}
 frozen(){return this.hitStop>0;}
 draw(c){for(const h of this.heals){let p=h.t/h.l;c.save();c.globalAlpha=1-p;c.fillStyle='#118833';c.font='bold 22px sans-serif';c.textAlign='center';c.fillText('+'+h.amount,h.x,h.y-95-p*35);c.restore();}for(const e of this.items){let p=e.t/e.l,total=e.frames||5,start=e.start||0,fw=e.fw||96,playable=Math.max(1,total-start),fr=start+Math.min(playable-1,Math.floor(p*playable));if(e.seq&&e.seq.length){fr=e.seq[Math.min(e.seq.length-1,Math.floor(p*e.seq.length))];}c.save();c.globalAlpha=1-p*.25;if(e.img){
 if(e.ground){
  // v0.8.26: EffectRenderer 공통 처리. 공격 방향(dir)에 따라 모든 지면/원거리 이펙트를 좌우 반전한다.
  const gd=e.dir<0?-1:1;
  c.save();
  c.translate(e.x,e.y);
  c.scale(gd,1);
  c.drawImage(e.img,fr*fw,0,fw,96,-95,-8,190,62);
  c.restore();
 }else{
  // v0.8.26: 캐릭터별 예외가 아니라 EffectRenderer에서 전체 공격 이펙트 방향을 통일 처리한다.
  let sc=e.scale||1,sz=120*sc,ox=(e.offsets&&e.offsets[fr]?e.offsets[fr]:0)*(e.dir||1),dx=e.x+ox,dy=e.y;
  c.save();
  c.translate(dx,dy);
  if(e.dir<0)c.scale(-1,1);
  c.drawImage(e.img,fr*fw,0,fw,96,-sz/2,-sz/2,sz,sz);
  c.restore();
 }
}if(e.key==='jjabbeorin'){c.globalAlpha=.75-p*.5;c.strokeStyle='#2f8cff';c.lineWidth=4;for(let s=0;s<3;s++){c.beginPath();c.moveTo(e.x-55+fr*8,e.y-35+s*20);c.quadraticCurveTo(e.x,e.y-65+s*8,e.x+55-fr*4,e.y-15+s*18);c.stroke();}}if(e.hitEffect&&p>=e.hitStart){let hp=(p-e.hitStart)/(1-e.hitStart);let hx=e.tx,hy=e.ty;c.save();c.globalAlpha=Math.max(0,1-hp*.75);c.lineWidth=3;for(let r=0;r<3;r++){c.beginPath();c.strokeStyle=['#fff2a8','#8fffd7','#ff8df3'][r];c.arc(hx,hy,18+r*10+hp*26,0,Math.PI*2);c.stroke();}for(let k=0;k<10;k++){let a=(Math.PI*2/10)*k+hp*2,rr=26+hp*45;c.beginPath();c.moveTo(hx+Math.cos(a)*12,hy+Math.sin(a)*12);c.lineTo(hx+Math.cos(a)*rr,hy+Math.sin(a)*rr);c.strokeStyle=['#ffcf52','#55e7ff','#b76cff','#ff7f7f'][k%4];c.stroke();}c.restore();}c.fillStyle=e.crit?'#8b0000':'#111';c.font=e.crit?'bold 32px sans-serif':'bold 22px sans-serif';c.textAlign='center';c.fillText((e.crit?'CRIT ':'')+'-'+e.dmg,e.hitEffect?e.tx:e.x,(e.hitEffect?e.ty:e.y)-75-p*45);c.restore();}}
}
