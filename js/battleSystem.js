// Battle flow system moved from game.bundle.js in v2.0.0
class Battle{
 constructor(a,e,audio=null){this.a=a;this.e=e;this.audio=audio;this.playerKey=null;this.enemyKey=null;this.win=0;this.lose=0;this.streak=0;this.usedEnemies=[];this.nextRoundTimer=0;this.projectiles=[];this.state='select';this.running=false;this.nextButton={x:525,y:205,w:230,h:54};}
 setSelection(playerKey,enemyKey){this.playerKey=playerKey;this.enemyKey=enemyKey;this.usedEnemies=[];if(enemyKey)this.usedEnemies.push(enemyKey);this.streak=0;this.reset(false);}
 pickNextEnemy(){let keys=Object.keys(BASE_DATA).filter(k=>k!==this.playerKey&&k!=='training_dummy');let pool=keys.filter(k=>!this.usedEnemies.includes(k));if(pool.length===0){this.usedEnemies=[];pool=keys;}let pick=pool[Math.floor(Math.random()*pool.length)];this.usedEnemies.push(pick);return pick;}
 reset(start=false){if(!this.playerKey)return;this.player=new Fighter(this.a.create(this.playerKey),230,1);this.enemy=new Fighter(this.a.create(this.enemyKey),1040,-1);this.projectiles=[];if(this.e&&this.e.clear)this.e.clear();this.nextRoundTimer=0;this.state=start?'approach':'ready';this.running=start;}
 start(){if(!this.playerKey){this.state='select';return;}if(this.state==='finished'&&!this.player.isDead){this.startNextRound();return;}this.reset(true);}
 startNextRound(){if(!this.playerKey||this.player.isDead)return;let keepHp=Math.min(this.player.maxHp,this.player.hp+Math.max(1,Math.round(this.player.maxHp*.2)));this.enemyKey=this.pickNextEnemy();this.player.x=230;this.player.y=505;this.player.dir=1;this.player.hp=keepHp;this.player.isDead=false;this.player.state='idle';this.player.frame=0;this.player.anim=0;this.player.attackTimer=.25;this.player.attackAnimLock=0;this.player.hitTimer=0;this.player.stunTimer=0;this.player.paralyzeCooldown=0;this.player.knock=0;this.player.flash=0;this.enemy=new Fighter(this.a.create(this.enemyKey),1040,-1);this.projectiles=[];if(this.e&&this.e.clear)this.e.clear();this.nextRoundTimer=0;this.state='approach';this.running=true;}
 update(dt){if(!this.playerKey)return;if(!this.running){this.player.update(dt);this.enemy.update(dt);return;}if(this.e.frozen())return;if(this.player.isDead||this.enemy.isDead){if(this.state!=='finished'){this.projectiles=[];if(this.e&&this.e.clear)this.e.clear();if(this.player.isDead){this.lose++;this.streak=0;}else{this.win++;this.streak++;this.nextRoundTimer=0;}let winner=this.player.isDead?this.enemy:this.player;if(winner.animations&&winner.animations.win){winner.state='win';winner.anim=0;winner.frame=0;}if(this.audio)this.audio.system(this.player.isDead?'defeat':'victory');}this.state='finished';this.running=false;this.player.update(dt);this.enemy.update(dt);return;}this.unit(this.player,this.enemy,dt);this.unit(this.enemy,this.player,dt);this.projectiles.forEach(p=>p.update(dt,this.e));this.projectiles=this.projectiles.filter(p=>!p.dead);this.prevent();this.player.update(dt);this.enemy.update(dt);}
 stop(u,t){
 // 30칸 기준 전투 규칙:
 // 원거리: 공격사거리 칸 안에 들어오면 즉시 정지
 // 근접: 몸통 겹침 방지 거리를 최소값으로 사용
 const rangePx=(u.gridAttackRange||1)*GRID_CELL;
 const body=(u.bodyRadius||48)+(t.bodyRadius||48)+Math.max(u.stopGap||0,t.stopGap||0);
 if(u.attackType==='projectile') return rangePx;
 return Math.max(rangePx,body);
}
gridDistance(u,t){return Math.abs(t.x-u.x)/GRID_CELL;}
calc(u,t){let dmg=Math.max(1,Math.round(u.atk*(100/(100+t.def))));let crit=Math.random()<(u.critRate||0);if(crit)dmg=Math.round(dmg*critMultiplier(u));return {dmg,crit};}
 unit(u,t,dt){
 if(!this.running||u.isDead||t.isDead)return;
 if(u.stunTimer>0)return;
 if(u.state==='hit'&&u.hitTimer>0)return;

 const distPx=Math.abs(t.x-u.x);
 const stopPx=this.stop(u,t);

 if(distPx>stopPx){
  u.state='walk';
  u.x+=u.dir*u.moveSpeed*dt;
  u.x=Math.max(GRID_START_X+40,Math.min(GRID_END_X-40,u.x));
  return;
 }

 // 사거리 안: 이동 정지 후 공격. 단, 공격 프레임이 끝나야 다음 공격 가능.
 u.state='attack';
 if(u.attackAnimLock>0)return;
 u.attackTimer-=dt;
 if(u.attackTimer<=0){
  u.attackTimer=1/u.attackSpeed;
  const attackFrames=(u.animations&&u.animations.attack)||3;
  u.attackAnimLock=attackFrames/12; // attack 애니메이션 속도 12fps 기준
  u.anim=0;
  if(this.audio)this.audio.attack(u);
  if(u.attackType==='projectile'){
   this.projectiles.push(new Projectile(u,t,this.audio));
  }else{
   let r=this.calc(u,t);
   let final=t.damage(r.dmg,r.crit);
   if(u.paralyzeChance&&(t.paralyzeCooldown||0)<=0&&Math.random()<u.paralyzeChance){const pd=u.paralyzeDuration||1;t.stunTimer=Math.max(t.stunTimer||0,pd);t.paralyzeCooldown=pd+(u.paralyzeCooldownAfter||2);}
   if(u.lifeSteal){
    let heal=Math.max(1,Math.round(final*u.lifeSteal));
    u.hp=Math.min(u.maxHp,u.hp+heal);
    this.e.spawnHeal(u.x,u.y,heal);
   }
   if(this.audio)this.audio.hit(t,r.crit);
   this.e.spawn(t,u,final,r.crit);

   // 꼬마정령: 공격 시 50% 확률로 2회 공격. 2타는 공격력 20으로 별도 계산.
   if(u.extraHitChance&&Math.random()<u.extraHitChance&&!t.isDead&&t.hp>0){
    let baseAtk=u.extraHitAtk||u.atk;
    let dmg2=Math.max(1,Math.round(baseAtk*(100/(100+t.def))));
    let crit2=Math.random()<(u.critRate||0);
    if(crit2)dmg2=Math.round(dmg2*critMultiplier(u));
    let final2=t.damage(dmg2,crit2);
    if(u.lifeSteal){
     let heal2=Math.max(1,Math.round(final2*u.lifeSteal));
     u.hp=Math.min(u.maxHp,u.hp+heal2);
     this.e.spawnHeal(u.x,u.y,heal2);
    }
    if(this.audio)this.audio.hit(t,crit2);
    this.e.spawn(t,u,final2,crit2);
   }
  }
 }
}
prevent(){let m=(this.player.bodyRadius||48)+(this.enemy.bodyRadius||48)+Math.max(this.player.stopGap||0,this.enemy.stopGap||0),d=Math.abs(this.enemy.x-this.player.x);if(d<m){let p=(m-d)/2;this.player.x-=p;this.enemy.x+=p;}}
 draw(c,debug){
if(!this.playerKey){
 c.save();
 panel(c,24,20,390,126,14);
 c.fillStyle='#111';
 c.font='bold 18px sans-serif';
 c.fillText('전투 정보',45,47);
 c.font='17px sans-serif';
 c.fillText('상태: 캐릭터 선택 전',45,75);
 c.fillText('3회 뽑기 후 카드 1장을 선택하세요',45,102);
 c.fillText('상대는 전투 시작 전까지 비공개',45,129);
 c.restore();
 return;
}
this.player.draw(c,debug,false);this.enemy.draw(c,debug,this.state!=='approach'&&this.state!=='finished'&&this.running===false);this.projectiles.forEach(p=>p.draw(c));c.save();modernPanel(c,24,20,430,150,14,'neutral');c.fillStyle='#263143';c.font='bold 22px sans-serif';c.fillText('연승: '+this.streak,45,48);c.font='17px sans-serif';c.fillText('승: '+this.win+'  패: '+this.lose,45,78);c.fillText('상태: '+this.state,45,105);c.fillText('선택: '+this.player.name+' ['+(this.player.grade||'NORMAL')+']',45,132);c.fillText('상대: '+this.enemy.name+' ['+(this.enemy.grade||'NORMAL')+']',45,157);c.restore();if(this.state==='finished'){let win=!this.player.isDead;modernPanel(c,445,96,390,180,20,win?'win':'lose');c.save();c.fillStyle=win?'#8a4b00':'#2f3a4f';c.textAlign='center';c.font='bold 34px sans-serif';c.fillText(win?'승리':'패배',640,145);c.font='17px sans-serif';c.fillText(win?'다음 전투 시작 버튼을 누르면 HP 20% 회복 후 진행':'연승이 종료되었습니다.',640,178);if(win){let b=this.nextButton;let g=c.createLinearGradient(b.x,b.y,b.x,b.y+b.h);g.addColorStop(0,'rgba(255,255,255,.98)');g.addColorStop(1,'rgba(245,211,139,.98)');c.fillStyle=g;c.strokeStyle='rgba(138,75,0,.8)';c.lineWidth=2;roundRect(c,b.x,b.y,b.w,b.h,16,true,true);c.fillStyle='#6f3d00';c.font='bold 21px sans-serif';c.fillText('다음 전투 시작',b.x+b.w/2,b.y+35);}c.restore();}}
 handleClick(p){if(this.state==='finished'&&!this.player.isDead&&inRect(p,this.nextButton)){if(this.audio)this.audio.system('battle_start');this.startNextRound();return true;}return false;}
}
window.Battle=Battle;
