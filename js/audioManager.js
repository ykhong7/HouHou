class AudioManager{
 constructor(){this.enabled=true;this.volume=.45;this.cache={};this.unlocked=false;}
 async load(){
  const files=[
   'assets/sounds/system/click.wav','assets/sounds/system/gacha.wav','assets/sounds/system/card_flip.wav',
   'assets/sounds/system/battle_start.wav','assets/sounds/system/victory.wav','assets/sounds/system/defeat.wav','assets/sounds/system/crit.wav'
  ];
  for(const key of Object.keys(BASE_DATA)){
   const p=BASE_DATA[key].soundPath||('assets/sounds/'+key+'/');
   files.push(p+'attack.wav');files.push(p+'hit.wav');
  }
  for(const f of files)this.cache[f]=this.makePool(f,4);
 }
 makePool(src,n){let arr=[];for(let i=0;i<n;i++){let a=new Audio(src);a.volume=this.volume;arr.push(a);}return arr;}
 unlock(){if(this.unlocked)return;this.unlocked=true;this.play('assets/sounds/system/click.wav');}
 setEnabled(v){this.enabled=v;}
 toggle(){this.enabled=!this.enabled;return this.enabled;}
 play(src){if(!this.enabled||!src)return;const pool=this.cache[src]||this.makePool(src,3);this.cache[src]=pool;const a=pool.find(x=>x.paused)||pool[0];try{a.currentTime=0;a.volume=this.volume;a.play().catch(()=>{});}catch(e){}}
 system(name){this.play('assets/sounds/system/'+name+'.wav');}
 attack(unit){this.play((unit.soundPath||('assets/sounds/'+unit.key+'/'))+'attack.wav');}
 hit(unit,crit=false){this.play(crit?'assets/sounds/system/crit.wav':((unit.soundPath||('assets/sounds/'+unit.key+'/'))+'hit.wav'));}
}
