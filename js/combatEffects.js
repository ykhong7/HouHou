// v1.7.0: Combat effect and critical damage helpers moved out of game.bundle.js
function critMultiplier(u){
 const min=Number.isFinite(Number(u.critDamageMin))?Number(u.critDamageMin):(Number.isFinite(Number(u.criticalMin))?Number(u.criticalMin):(Number.isFinite(Number(u.criticalMultiplier))?Number(u.criticalMultiplier):1.5));
 const max=Number.isFinite(Number(u.critDamageMax))?Number(u.critDamageMax):(Number.isFinite(Number(u.criticalMax))?Number(u.criticalMax):min);
 const lo=Math.min(min,max);
 const hi=Math.max(min,max);
 if(hi<=lo)return lo;
 return lo+Math.random()*(hi-lo);
}

function loadImage(src){return new Promise(resolve=>{if(!src){resolve(null);return;}const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>resolve(null);img.src=src;});}
// UI helpers moved to js/uiCore.js in v1.3.0
// Assets class moved to js/assetManager.js in v1.6.0
// Gacha class moved to js/gachaManager.js in v1.5.0
// AudioManager moved to js/audioManager.js in v1.4.0
// Button class moved to js/uiCore.js in v1.3.0

class Effects{
 constructor(){this.items=[];this.heals=[];this.texts=[];this.shake=0;this.hitStop=0;}
 clear(){this.items=[];this.heals=[];this.texts=[];this.shake=0;this.hitStop=0;}
 spawn(target,attacker,dmg,crit){this.spawnHitEffect(target,attacker,dmg,crit);} // legacy alias
 spawnAttackEffect(target,attacker,dmg,crit){
  this.spawnConfiguredEffect('attack',target,attacker,dmg,crit,attacker.attackEffect,attacker.attackEffectImage,true);
 }
 spawnHitEffect(target,attacker,dmg,crit,showDamage=true){
  this.spawnConfiguredEffect('hit',target,attacker,dmg,crit,attacker.hitEffect,attacker.hitEffectImage,showDamage);
 }
 spawnConfiguredEffect(kind,target,attacker,dmg,crit,cfg,img,showDamage=true){
  cfg=cfg||{};
  const dir=attacker.dir||1;
  const anchor=cfg.anchor||'target';
  const ox=Number(cfg.offsetX??0)*dir;
  const oy=Number(cfg.offsetY??(kind==='hit'?12:-25));
  const useAttacker=cfg.centerEffect||anchor==='attacker'||anchor==='attacker_center';
  const cx=useAttacker?attacker.x:target.x+ox;
  const cy=useAttacker?(anchor==='attacker_center'?attacker.y-48:attacker.y+oy):target.y+oy;
  const seq=cfg.frameSequence||null;
  const frames=Number(cfg.frames||5);
  const dur=seq?Math.max(.4,seq.length/18):(crit?.55:.4);
  this.items.push({
   kind,x:cx,y:cy,tx:target.x,ty:target.y-48,dmg,crit,showDamage,
   img,frames,start:Number(cfg.startFrame||0),fw:Number(cfg.frameWidth||96),
   seq,offsets:cfg.frameOffsets||null,dir,t:0,l:dur,key:attacker.key,
   center:!!cfg.centerEffect,anchor,
   scale:Number(cfg.scale||1),width:cfg.width!=null?Number(cfg.width):null,height:cfg.height!=null?Number(cfg.height):null,
   style:cfg.style||'image',burstStart:Number(cfg.start??0.38)
  });
  this.shake=crit?.22:.12;
  this.hitStop=crit?.06:.035;
 }
 update(dt){
  let rd=dt;
  if(this.hitStop>0){this.hitStop-=dt;dt=0;}
  for(const e of this.items)e.t+=rd;
  this.items=this.items.filter(e=>e.t<e.l);
  for(const h of this.heals)h.t+=rd;
  this.heals=this.heals.filter(h=>h.t<h.l);
  for(const tx of this.texts)tx.t+=rd;
  this.texts=this.texts.filter(tx=>tx.t<tx.l);
  if(this.shake>0)this.shake-=rd;
 }
 spawnHeal(x,y,amount){if(amount>0)this.heals.push({x,y,amount,t:0,l:.65});}
 spawnText(x,y,text,opt={}){this.texts.push({x,y,text:String(text||''),t:0,l:Number(opt.duration||1),color:opt.color||'#d21b1b',size:Number(opt.size||36)});}
 offset(){return this.shake>0?{x:(Math.random()-.5)*10,y:(Math.random()-.5)*6}:{x:0,y:0};}
 frozen(){return this.hitStop>0;}
 drawBurst(c,e,p){
  let hp=(p-e.burstStart)/(1-e.burstStart),hx=e.tx,hy=e.ty;
  if(hp<0)return;
  c.save();
  c.globalAlpha=Math.max(0,1-hp*.75);
  c.lineWidth=3;
  for(let r=0;r<3;r++){
   c.beginPath();
   c.strokeStyle=['#fff2a8','#8fffd7','#ff8df3'][r];
   c.arc(hx,hy,18+r*10+hp*26,0,Math.PI*2);
   c.stroke();
  }
  for(let k=0;k<10;k++){
   let a=(Math.PI*2/10)*k+hp*2,rr=26+hp*45;
   c.beginPath();
   c.moveTo(hx+Math.cos(a)*12,hy+Math.sin(a)*12);
   c.lineTo(hx+Math.cos(a)*rr,hy+Math.sin(a)*rr);
   c.strokeStyle=['#ffcf52','#55e7ff','#b76cff','#ff8df3'][k%4];
   c.stroke();
  }
  c.restore();
 }
 draw(c){
  for(const tx of this.texts){
   let p=tx.t/tx.l;
   c.save();
   c.globalAlpha=Math.max(0,1-p*.65);
   c.fillStyle=tx.color;
   c.strokeStyle='rgba(255,255,255,.95)';
   c.lineWidth=5;
   c.font='bold '+tx.size+'px sans-serif';
   c.textAlign='center';
   c.strokeText(tx.text,tx.x,tx.y-p*36);
   c.fillText(tx.text,tx.x,tx.y-p*36);
   c.restore();
  }
  for(const h of this.heals){
   let p=h.t/h.l;
   c.save();
   c.globalAlpha=1-p;
   c.fillStyle='#118833';
   c.font='bold 22px sans-serif';
   c.textAlign='center';
   c.fillText('+'+h.amount,h.x,h.y-95-p*35);
   c.restore();
  }
  for(const e of this.items){
   let p=e.t/e.l,total=e.frames||5,start=e.start||0,fw=e.fw||96,playable=Math.max(1,total-start),fr=start+Math.min(playable-1,Math.floor(p*playable));
   if(e.seq&&e.seq.length){fr=e.seq[Math.min(e.seq.length-1,Math.floor(p*e.seq.length))];}
   c.save();
   c.globalAlpha=1-p*.25;
   if(e.img){
    let sc=e.scale||1,ew=Number(e.width||120)*sc,eh=Number(e.height||120)*sc;
    let ox=(e.offsets&&e.offsets[fr]?e.offsets[fr]:0)*(e.dir||1),dx=e.x+ox,dy=e.y;
    c.save();
    c.translate(dx,dy);
    if(e.dir<0)c.scale(-1,1);
    c.drawImage(e.img,fr*fw,0,fw,96,-ew/2,-eh/2,ew,eh);
    c.restore();
   }
   if(e.key==='jjabbeorin'&&e.kind==='attack'){
    c.globalAlpha=.75-p*.5;
    c.strokeStyle='#2f8cff';
    c.lineWidth=4;
    for(let s=0;s<3;s++){
     c.beginPath();
     c.moveTo(e.x-55+fr*8,e.y-35+s*20);
     c.quadraticCurveTo(e.x,e.y-65+s*8,e.x+55-fr*4,e.y-15+s*18);
     c.stroke();
    }
   }
   if(e.style==='burst'&&p>=e.burstStart)this.drawBurst(c,e,p);
   if(e.showDamage){
    c.fillStyle=e.crit?'#8b0000':'#111';
    c.font=e.crit?'bold 32px sans-serif':'bold 22px sans-serif';
    c.textAlign='center';
    const tx=e.kind==='hit'?e.tx:e.x;
    const ty=e.kind==='hit'?e.ty:e.y;
    c.fillText((e.crit?'CRIT ':'')+'-'+e.dmg,tx,ty-75-p*45);
   }
   c.restore();
  }
 }
}
