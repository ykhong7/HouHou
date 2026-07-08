class Game{
 constructor(){this.c=document.getElementById('game');this.ctx=this.c.getContext('2d');this.w=1280;this.h=720;this.c.width=this.w;this.c.height=this.h;this.assets=new Assets();this.gacha=new Gacha(()=>BASE_DATA);this.debug=false;this.last=0;this.buttons=[];window.addEventListener('keydown',e=>{if(e.key==='F1'){e.preventDefault();this.debug=!this.debug;}if(e.code==='Space'&&this.battle)this.battle.start();});this.c.addEventListener('pointerdown',e=>this.click(e));this.resize();window.addEventListener('resize',()=>this.resize());this.start();}
 resize(){let s=Math.min(innerWidth/this.w,innerHeight/this.h);this.scale=s;this.c.style.width=this.w*s+'px';this.c.style.height=this.h*s+'px';}
 pos(e){let r=this.c.getBoundingClientRect();return {x:(e.clientX-r.left)/this.scale,y:(e.clientY-r.top)/this.scale};}
 click(e){let p=this.pos(e);if(this.profileGrid&&this.profileGrid.visible){this.profileGrid.handleClick(p);return;}if(this.battle&&this.battle.handleClick&&this.battle.handleClick(p)){this.hideDraft=true;return;}for(const b of this.buttons)if(inRect(p,b))b.fn();for(let i=0;i<3;i++){let r={x:330+i*210,y:235,w:170,h:200};if(!this.hideDraft&&inRect(p,r)){if(!this.draft.rolls[i]&&!this.draft.selected){this.audio.unlock();this.audio.system('gacha');this.draft.rollAt(i);return;}if(this.draft.rolls[i]&&!this.draft.selected){this.audio.system('card_flip');let key=this.draft.choose(i);let enemy=this.randomEnemy(key);this.battle.setSelection(key,enemy);return;}}}}
 randomEnemy(playerKey){
 const keys=Object.keys(BASE_DATA).filter(k=>k!==playerKey&&k!=='training_dummy');
 if(keys.length===0)return playerKey;
 let pool=keys;
 if(this.lastEnemyKey&&keys.length>1){
  pool=keys.filter(k=>k!==this.lastEnemyKey);
 }
 const pick=pool[Math.floor(Math.random()*pool.length)];
 this.lastEnemyKey=pick;
 return pick;
}
 async start(){this.ctx.fillStyle='#fff';this.ctx.fillRect(0,0,this.w,this.h);this.ctx.fillStyle='#111';this.ctx.font='30px sans-serif';this.ctx.fillText('리소스 로딩 중...',500,360);await this.assets.load();this.audio=new AudioManager();await this.audio.load();this.effects=new Effects();this.profileGrid=new ProfileGrid(this.assets);this.battle=new Battle(this.assets,this.effects,this.audio);this.draft=new GachaDraft(this.gacha,this.assets);this.buttons=[new Button(330,620,180,52,'뽑기',()=>{this.audio.unlock();this.audio.system('click');this.hideDraft=false;}),new Button(550,620,180,52,'전투 시작',()=>{
 this.audio.unlock();
 this.audio.system('battle_start');
 if(this.draft && !this.battle.playerKey){
   if(this.draft.rolls.filter(Boolean).length===0) this.draft.rollAt(0);
   let key=this.draft.selected || this.draft.rolls[0];
   if(key){
     this.draft.selected=key;
     let enemy=this.randomEnemy(key);
     this.battle.setSelection(key,enemy);
   }
 }
 this.battle.start();
 this.hideDraft=true;
}),new Button(770,620,180,52,'초기화',()=>{this.draft.reset();this.hideDraft=false;this.battle=new Battle(this.assets,this.effects,this.audio);}),new Button(1070,25,160,46,'캐릭터',()=>{this.audio.unlock();this.audio.system('click');this.profileGrid.open();}),new Button(1070,78,160,46,'사운드 ON',()=>{this.audio.unlock();this.audio.toggle();this.buttons[this.buttons.length-1].label=this.audio.enabled?'사운드 ON':'사운드 OFF';})];requestAnimationFrame(t=>this.loop(t));}
 loop(t){let dt=Math.min((t-this.last)/1000||0,.033);this.last=t;this.effects.update(dt);this.battle.update(dt);this.draft.update(dt);this.draw();requestAnimationFrame(tt=>this.loop(tt));}
 draw(){let c=this.ctx,off=this.effects.offset();c.clearRect(0,0,this.w,this.h);c.save();c.translate(off.x,off.y);if(this.assets.bg)c.drawImage(this.assets.bg,0,0);else{c.fillStyle='#fff';c.fillRect(0,0,this.w,this.h);}this.battle.draw(c,this.debug);this.effects.draw(c);c.restore();if(!this.hideDraft)this.draft.draw(c);this.buttons.forEach(b=>b.draw(c));panel(c,210,685,860,28,10);c.fillStyle='#111';c.textAlign='center';c.font='15px sans-serif';c.fillText('HouHou Engine v1.0.8 | effect 정리',640,705);c.textAlign='right';c.font='bold 15px sans-serif';c.fillStyle='rgba(20,20,20,.92)';c.fillText('Art by 홍은성',1250,705);c.textAlign='left';if(this.profileGrid)this.profileGrid.draw(c);}
}
