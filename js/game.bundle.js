const GRID_COLS=30;
const GRID_CELL=1280/GRID_COLS;
const GRID_START_X=0;
const GRID_END_X=1280;
let BASE_DATA={"normal_man":{"id":1,"key":"normal_man","name":"걍사람","grade":"NORMAL","hp":180,"atk":20,"def":20,"attackSpeed":1,"attackArea":45,"attackRange":2,"moveSpeed":2,"bodyRadius":48,"stopGap":16,"critRate":0.15,"attackType":"melee","frameSize":96,"spritePath":"assets/characters/normal_man/","effectPath":"assets/effects/normal_man/attack.png","effectFrames":5,"animations":{"idle":2,"walk":4,"attack":3,"hit":1,"dead":2},"soundPath":"assets/sounds/normal_man/","gridMovementRule":"screen_width_30_cells","gachaRate":10,"gridMoveSpeed":2,"gridAttackRange":2,"gridBattleRule":"30_columns_full_engine","rangeMultiplierApplied":"x2_v0.6.1","effectStartFrame":0,"effectFrameWidth":96,"critDamageMin":1.5,"critDamageMax":2,"feature":"기본 근거리"},"meongdungi":{"id":2,"key":"meongdungi","name":"멍둥이","grade":"NORMAL","hp":180,"atk":20,"def":20,"attackSpeed":1,"attackArea":60,"attackRange":2,"moveSpeed":2,"bodyRadius":48,"stopGap":16,"critRate":0.15,"attackType":"projectile","projectilePath":"assets/projectiles/meongdungi/stone.png","projectileSpeed":520,"frameSize":96,"spritePath":"assets/characters/meongdungi/","effectPath":"assets/effects/meongdungi/attack.png","effectFrames":5,"gachaRate":10,"attackMethod":"입에서 돌맹이가 나옴","feature":"돌멩이 투사체","animations":{"idle":2,"walk":4,"attack":3,"hit":1,"dead":2},"soundPath":"assets/sounds/meongdungi/","gridMovementRule":"screen_width_30_cells","gridMoveSpeed":2,"gridAttackRange":2,"gridBattleRule":"30_columns_full_engine","projectileSpeedCells":8,"rangeMultiplierApplied":"x2_v0.6.1","effectStartFrame":0,"effectFrameWidth":96,"projectileFrames":1,"projectileStartFrame":0,"projectileFrameWidth":96,"critDamageMin":1.5,"critDamageMax":2},"gomangi":{"id":3,"key":"gomangi","name":"고망이","grade":"RARE","hp":180,"atk":20,"def":50,"damageReduction":0.1,"attackSpeed":1,"attackArea":45,"attackRange":2,"moveSpeed":2,"bodyRadius":64,"stopGap":16,"critRate":0.15,"attackType":"melee","frameSize":96,"spritePath":"assets/characters/gomangi/","effectPath":"assets/effects/gomangi/attack.png","effectFrames":5,"gachaRate":10,"attackMethod":"주먹을 위에서 아래로 내려친다","feature":"피해 10% 감소","animations":{"idle":2,"walk":4,"attack":3,"hit":1,"dead":2},"soundPath":"assets/sounds/gomangi/","gridMovementRule":"screen_width_30_cells","gridMoveSpeed":2,"gridAttackRange":2,"gridBattleRule":"30_columns_full_engine","rangeMultiplierApplied":"x2_v0.6.1","effectStartFrame":0,"effectFrameWidth":96,"critDamageMin":1.5,"critDamageMax":2},"eungae":{"id":4,"key":"eungae","name":"응애","grade":"NORMAL","hp":140,"atk":20,"def":10,"attackSpeed":2,"attackArea":60,"attackRange":6,"moveSpeed":2,"bodyRadius":36,"stopGap":16,"critRate":0.15,"attackType":"projectile","projectilePath":"assets/projectiles/eungae/candy.png","projectileSpeed":620,"frameSize":96,"spritePath":"assets/characters/eungae/","effectPath":"assets/effects/eungae/attack.png","effectFrames":5,"gachaRate":10,"attackMethod":"입에서 사탕을 뱉음","feature":"사탕 투사체","animations":{"idle":2,"walk":4,"attack":3,"hit":1,"dead":2},"soundPath":"assets/sounds/eungae/","gridMovementRule":"screen_width_30_cells","gridMoveSpeed":2,"gridAttackRange":6,"gridBattleRule":"30_columns_full_engine","projectileSpeedCells":8,"rangeMultiplierApplied":"x2_v0.6.1","effectStartFrame":0,"effectFrameWidth":96,"projectileFrames":1,"projectileStartFrame":0,"projectileFrameWidth":96,"critDamageMin":1.5,"critDamageMax":2},"awakened_normal_man":{"id":5,"key":"awakened_normal_man","name":"각성한 걍사람","grade":"SPECIAL","hp":200,"atk":35,"def":80,"attackSpeed":2.5,"attackArea":70,"attackRange":4,"moveSpeed":3,"bodyRadius":56,"stopGap":18,"critRate":0.15,"attackType":"melee","frameSize":96,"spritePath":"assets/characters/awakened_normal_man/","effectPath":"assets/effects/awakened_normal_man/attack.png","effectFrames":5,"gachaRate":10,"attackMethod":"몸 중심에서 각성 에너지를 예열한 뒤 전방으로 방출한다. Frame1~3은 예열, Frame4부터 히트가 시작되고 Frame5는 상대 방향으로 크게 뻗는다.","feature":"중심 각성 이펙트 후 전방 방출","animations":{"idle":2,"walk":4,"attack":4,"hit":1,"dead":2,"win":4},"soundPath":"assets/sounds/awakened_normal_man/","gridMovementRule":"screen_width_30_cells","gridMoveSpeed":3,"gridAttackRange":4,"gridBattleRule":"30_columns_full_engine","rangeMultiplierApplied":"x2_v0.6.1_v0.8.22_awakened_effect5_forward","effectStartFrame":0,"effectFrameWidth":192,"centerEffect":true,"effectAnchor":"attacker_center","effectFrameSequence":[0,1,2,3,4],"effectFrameOffsets":[0,20,40,40,96],"effectScale":1.35,"hitEffect":true,"hitEffectStart":0.6,"critDamageMin":1.5,"critDamageMax":3},"bokjujok":{"id":6,"key":"bokjujok","name":"폭주족","grade":"EPIC","hp":120,"atk":25,"def":40,"attackSpeed":4,"attackArea":45,"attackRange":2,"moveSpeed":3.5,"bodyRadius":48,"stopGap":16,"critRate":0.15,"attackType":"melee","frameSize":96,"spritePath":"assets/characters/bokjujok/","effectPath":"assets/effects/bokjujok/attack.png","effectFrames":6,"gachaRate":10,"attackMethod":"손이 여러 개 보이도록 공격","feature":"연속 손 공격","animations":{"idle":2,"walk":4,"attack":3,"hit":1,"dead":2},"aiType":"rush","soundPath":"assets/sounds/bokjujok/","gridMovementRule":"screen_width_30_cells","gridMoveSpeed":3.5,"gridAttackRange":2,"gridBattleRule":"30_columns_full_engine","rangeMultiplierApplied":"x2_v0.6.1","effectStartFrame":0,"effectFrameWidth":96,"critDamageMin":1.5,"critDamageMax":2},"jjabbeorin":{"id":7,"key":"jjabbeorin","name":"짭버린","grade":"EPIC","hp":120,"atk":25,"def":50,"attackSpeed":4,"attackArea":45,"attackRange":2,"moveSpeed":3.5,"bodyRadius":48,"stopGap":16,"critRate":0.15,"attackType":"melee","frameSize":96,"spritePath":"assets/characters/jjabbeorin/","effectPath":"assets/effects/jjabbeorin/attack.png","effectFrames":6,"gachaRate":10,"attackMethod":"손등에 튀어나온 칼날손톱으로 공격","feature":"칼날손톱 공격","animations":{"idle":2,"walk":4,"attack":3,"hit":1,"dead":2},"aiType":"rush","soundPath":"assets/sounds/jjabbeorin/","gridMovementRule":"screen_width_30_cells","gridMoveSpeed":3.5,"gridAttackRange":2,"gridBattleRule":"30_columns_full_engine","rangeMultiplierApplied":"x2_v0.6.1","effectStartFrame":0,"effectFrameWidth":96,"critDamageMin":1.5,"critDamageMax":2},"storm_spirit":{"id":8,"key":"storm_spirit","name":"폭풍정령","grade":"LEGENDARY","hp":120,"atk":35,"def":80,"attackSpeed":5,"attackArea":70,"attackRange":4,"moveSpeed":3,"bodyRadius":56,"stopGap":18,"critRate":0.15,"attackType":"projectile","projectilePath":"assets/projectiles/storm_spirit/tornado.png","projectileSpeed":680,"projectileFrames":6,"frameSize":96,"spritePath":"assets/characters/storm_spirit/","effectPath":"assets/effects/storm_spirit/attack.png","effectFrames":6,"gachaRate":10,"attackMethod":"강력한 회오리를 발사","feature":"회오리 발사","animations":{"idle":2,"walk":4,"attack":3,"hit":1,"dead":2},"aiType":"projectile","soundPath":"assets/sounds/storm_spirit/","gridMovementRule":"screen_width_30_cells","gridMoveSpeed":3,"gridAttackRange":4,"gridBattleRule":"30_columns_full_engine","projectileSpeedCells":8,"rangeMultiplierApplied":"x2_v0.6.1","effectStartFrame":0,"effectFrameWidth":96,"projectileStartFrame":0,"projectileFrameWidth":96,"critDamageMin":1.5,"critDamageMax":2.5},"vampire_king":{"id":9,"key":"vampire_king","name":"뱀파이어킹","grade":"SUPER EPIC","hp":100,"atk":35,"def":50,"attackSpeed":2,"attackArea":90,"attackRange":6,"moveSpeed":3,"bodyRadius":56,"stopGap":18,"critRate":0.15,"attackType":"projectile","projectilePath":"assets/projectiles/vampire_king/blood_wave.png","projectileSpeed":580,"projectileFrames":6,"lifeSteal":0.2,"frameSize":96,"spritePath":"assets/characters/vampire_king/","effectPath":"assets/effects/vampire_king/attack.png","effectFrames":6,"gachaRate":10,"attackMethod":"술잔에 든 진한 빨간 피를 흩뿌린다","feature":"20% 흡혈","animations":{"idle":2,"walk":4,"attack":3,"hit":1,"dead":2},"aiType":"projectile","soundPath":"assets/sounds/vampire_king/","gridMovementRule":"screen_width_30_cells","gridMoveSpeed":3,"gridAttackRange":6,"gridBattleRule":"30_columns_full_engine","projectileSpeedCells":8,"rangeMultiplierApplied":"x2_v0.6.1","effectStartFrame":0,"effectFrameWidth":96,"projectileStartFrame":0,"projectileFrameWidth":96,"critDamageMin":1.5,"critDamageMax":2.5},"fire_spirit":{"id":10,"key":"fire_spirit","name":"불꽃정령","grade":"LEGENDARY","hp":120,"atk":30,"def":60,"attackSpeed":2,"attackArea":5,"attackRange":10,"gridAttackRange":10,"moveSpeed":2,"gridMoveSpeed":2,"bodyRadius":56,"stopGap":18,"critRate":0.15,"attackType":"projectile","projectilePath":"assets/projectiles/fire_spirit/fire_ground.png","projectileSpeedCells":8,"projectileFrames":5,"frameSize":96,"spritePath":"assets/characters/fire_spirit/","effectPath":"assets/effects/fire_spirit/attack.png","effectFrames":5,"soundPath":"assets/sounds/fire_spirit/","gachaRate":10,"attackMethod":"불꽃을 손으로 쏴서 지면을 불태운다.","feature":"지면 불꽃 공격","animations":{"idle":2,"walk":4,"attack":3,"hit":1,"dead":2,"win":4},"aiType":"projectile","gridBattleRule":"30_columns_full_engine","rangeMultiplierApplied":"none_fire_spirit_v0.6.5","effectStartFrame":1,"effectFrameWidth":96,"projectileStartFrame":1,"projectileFrameWidth":96,"critDamageMin":1.5,"critDamageMax":2.5},"lightning_spirit":{"id":11,"key":"lightning_spirit","name":"번개정령","grade":"LEGENDARY","hp":120,"atk":35,"def":60,"attackSpeed":2,"attackArea":8,"attackRange":10,"gridAttackRange":10,"moveSpeed":2,"gridMoveSpeed":2,"bodyRadius":56,"stopGap":18,"critRate":0.15,"attackType":"projectile","projectilePath":"assets/projectiles/lightning_spirit/lightning_bolt.png","projectileSpeedCells":10,"projectileFrames":4,"frameSize":96,"spritePath":"assets/characters/lightning_spirit/","effectPath":"assets/effects/lightning_spirit/attack.png","effectFrames":4,"soundPath":"assets/sounds/lightning_spirit/","gachaRate":10,"attackMethod":"번개를 손으로 쏴서 꿰뚫는다","feature":"원거리 번개 공격","animations":{"idle":2,"walk":4,"attack":3,"hit":1,"dead":2,"win":4},"aiType":"projectile","gridBattleRule":"30_columns_full_engine","rangeMultiplierApplied":"none_lightning_spirit_v0.8.5","effectStartFrame":0,"effectFrameWidth":96,"projectileStartFrame":0,"projectileFrameWidth":96,"critDamageMin":1.5,"critDamageMax":2.5},"little_spirit":{"id":12,"key":"little_spirit","name":"꼬마정령","grade":"LEGENDARY","hp":100,"atk":40,"def":50,"attackSpeed":2,"attackArea":5,"attackRange":5,"gridAttackRange":5,"moveSpeed":4,"gridMoveSpeed":4,"bodyRadius":36,"stopGap":14,"critRate":0.15,"attackType":"melee","lifeSteal":0.15,"extraHitChance":0.5,"extraHitAtk":20,"frameSize":96,"spritePath":"assets/characters/little_spirit/","effectPath":"assets/effects/little_spirit/attack.png","effectFrames":6,"soundPath":"assets/sounds/little_spirit/","gachaRate":10,"attackMethod":"공격 시 50% 확률로 2번 공격한다. 2번째 공격은 공격력 20으로 계산한다.","feature":"15% 흡혈, 50% 확률 2타","animations":{"idle":2,"walk":4,"attack":4,"hit":1,"dead":2,"win":4},"aiType":"rush","gridBattleRule":"30_columns_full_engine","rangeMultiplierApplied":"none_little_spirit_v0.8.11_speed4_grid_removed","effectStartFrame":0,"effectFrameWidth":96,"critDamageMin":1.5,"critDamageMax":3},"slimecute":{"id":13,"key":"slimecute","name":"걍슬라임","grade":"EPIC","hp":85,"atk":90,"def":20,"attackSpeed":2,"attackArea":2,"attackRange":2,"gridAttackRange":2,"moveSpeed":3,"gridMoveSpeed":3,"bodyRadius":42,"stopGap":14,"critRate":0.15,"attackType":"melee","paralyzeChance":1.0,"paralyzeDuration":1.0,"paralyzeCooldownAfter":2.0,"frameSize":96,"spritePath":"assets/characters/slimecute/","effectPath":"assets/effects/slimecute/attack.png","effectFrames":4,"soundPath":"assets/sounds/slimecute/","gachaRate":10,"attackMethod":"공격 시 100% 확률로 상대방을 1초 마비시킨다. 마비 후 2초 동안 다시 마비되지 않는다.","feature":"1초 마비, 2초 재마비 방지","animations":{"idle":2,"walk":6,"attack":6,"hit":1,"dead":2,"win":4},"aiType":"rush","gridBattleRule":"30_columns_full_engine","rangeMultiplierApplied":"none_slimecute_v0.8.15_grid_removed_paralyze_cooldown","effectStartFrame":0,"effectFrameWidth":96,"critDamageMin":1.5,"critDamageMax":2}};
let GACHA_DATA={"pool": [{"key": "normal_man", "rate": 10}, {"key": "meongdungi", "rate": 10}, {"key": "eungae", "rate": 10}, {"key": "gomangi", "rate": 10}, {"key": "bokjujok", "rate": 10}, {"key": "jjabbeorin", "rate": 10}, {"key": "awakened_normal_man", "rate": 10}, {"key": "storm_spirit", "rate": 10}, {"key": "vampire_king", "rate": 10}, {"key": "fire_spirit", "rate": 10}, {"key": "lightning_spirit", "rate": 10}, {"key": "little_spirit", "rate": 10}, {"key": "slimecute", "rate": 10}]};
// v0.8.21 slime safety restore: slimecute must stay in gacha/profile/battle data.
if(BASE_DATA.slimecute && !GACHA_DATA.pool.some(it=>it.key==='slimecute')) GACHA_DATA.pool.push({key:'slimecute',rate:BASE_DATA.slimecute.gachaRate||10});



function critMultiplier(u){
 const min=Number.isFinite(Number(u.critDamageMin))?Number(u.critDamageMin):(Number.isFinite(Number(u.criticalMin))?Number(u.criticalMin):(Number.isFinite(Number(u.criticalMultiplier))?Number(u.criticalMultiplier):1.5));
 const max=Number.isFinite(Number(u.critDamageMax))?Number(u.critDamageMax):(Number.isFinite(Number(u.criticalMax))?Number(u.criticalMax):min);
 const lo=Math.min(min,max);
 const hi=Math.max(min,max);
 if(hi<=lo)return lo;
 return lo+Math.random()*(hi-lo);
}

function loadImage(src){return new Promise(resolve=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>resolve(null);img.src=src;});}
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


// v1.2.0 Data-Driven loader: CharacterManager 우선, 실패 시 내장 fallback 사용.
async function loadJsonSafe(url){
 try{const r=await fetch(url,{cache:'no-store'}); if(!r.ok) throw new Error(url+' '+r.status); return await r.json();}
 catch(e){console.warn('[DataDriven] JSON load failed:',url,e); return null;}
}
function normalizeCharacterData(raw){
 const d={...raw};
 const st=d.stats||{};
 const cr=d.critical||{};
 const ga=d.gacha||{};
 const co=d.combat||{};
 const as=d.assets||{};
 const ef=d.effect||{};
 const pr=d.projectile||{};
 d.hp=Number(st.hp??d.hp??100);
 d.atk=Number(st.attack??st.atk??d.atk??10);
 d.def=Number(st.defense??st.def??d.def??0);
 d.attackSpeed=Number(st.attackSpeed??d.attackSpeed??1);
 d.attackArea=Number(st.attackArea??d.attackArea??45);
 d.attackRange=Number(st.attackRange??d.attackRange??2);
 d.moveSpeed=Number(st.moveSpeed??d.moveSpeed??2);
 d.bodyRadius=Number(st.bodyRadius??d.bodyRadius??48);
 d.stopGap=Number(st.stopGap??d.stopGap??16);
 d.gridMoveSpeed=Number(st.gridMoveSpeed??d.gridMoveSpeed??d.moveSpeed);
 d.gridAttackRange=Number(st.gridAttackRange??d.gridAttackRange??d.attackRange);
 d.critRate=Number(cr.chance??d.critRate??0.15); if(d.critRate>1)d.critRate=d.critRate/100;
 d.critDamageMin=Number(cr.min??d.critDamageMin??d.criticalMin??d.criticalMultiplier??1.5);
 d.critDamageMax=Number(cr.max??d.critDamageMax??d.criticalMax??d.critDamageMin);
 d.gachaRate=Number(ga.weight??ga.rate??d.gachaRate??10);
 d.attackType=co.attackType??d.attackType??'melee';
 d.aiType=co.aiType??d.aiType;
 d.attackMethod=co.attackMethod??d.attackMethod??'';
 d.feature=co.feature??d.feature??'';
 d.spritePath=as.spritePath??d.spritePath??('assets/characters/'+d.key+'/');
 d.effectPath=ef.path??as.effectPath??d.effectPath;
 d.soundPath=as.soundPath??d.soundPath??('assets/sounds/'+d.key+'/');
 d.projectilePath=pr.path??as.projectilePath??d.projectilePath;
 d.effectFrames=Number(ef.frames??d.effectFrames??5);
 d.effectStartFrame=Number(ef.startFrame??d.effectStartFrame??0);
 d.effectFrameWidth=Number(ef.frameWidth??d.effectFrameWidth??96);
 d.centerEffect=Boolean(ef.centerEffect??d.centerEffect??false);
 d.effectAnchor=ef.anchor??d.effectAnchor;
 d.effectScale=Number(ef.scale??d.effectScale??1);
 d.effectFrameSequence=ef.frameSequence??d.effectFrameSequence;
 d.effectFrameOffsets=ef.frameOffsets??d.effectFrameOffsets;
 d.hitEffect=Boolean(ef.hitEffect??d.hitEffect??false);
 d.hitEffectStart=Number(ef.hitEffectStart??d.hitEffectStart??0.38);
 if(d.projectilePath){
  d.projectileSpeed=Number(pr.speed??d.projectileSpeed??520);
  d.projectileSpeedCells=Number(pr.speedCells??d.projectileSpeedCells??8);
  d.projectileFrames=Number(pr.frames??d.projectileFrames??1);
  d.projectileStartFrame=Number(pr.startFrame??d.projectileStartFrame??0);
  d.projectileFrameWidth=Number(pr.frameWidth??d.projectileFrameWidth??96);
 }
 for(const s of (d.skills||[])){
  if(s.type==='lifesteal') d.lifeSteal=Number(s.value??0);
  if(s.type==='double_attack'){d.extraHitChance=Number(s.chance??0); if(d.extraHitChance>1)d.extraHitChance/=100; d.extraHitAtk=Number(s.damage??d.atk);}
  if(s.type==='paralyze'){d.paralyzeChance=Number(s.chance??1); if(d.paralyzeChance>1)d.paralyzeChance/=100; d.paralyzeDuration=Number(s.duration??1); d.paralyzeCooldownAfter=Number(s.cooldownAfter??2);}
  if(s.type==='damage_reduction') d.damageReduction=Number(s.value??0);
 }
 d.frameSize=Number(d.frameSize??96);
 d.animations=d.animations||{idle:2,walk:4,attack:3,hit:1,dead:2};
 return d;
}
async function loadCharacterDatabase(){
 if(window.CharacterManager&&typeof window.CharacterManager.loadDatabase==='function'){
  const db=await window.CharacterManager.loadDatabase({manifestPath:'data/character_manifest.json',gachaPath:'data/gacha.json'});
  if(db) return db;
 }
 const manifest=await loadJsonSafe('data/character_manifest.json');
 if(!Array.isArray(manifest)) return null;
 const out={};
 for(const path of manifest){
  const raw=await loadJsonSafe(path);
  if(raw&&raw.key) out[raw.key]=normalizeCharacterData(raw);
 }
 if(!Object.keys(out).length) return null;
 let gacha=await loadJsonSafe('data/gacha.json');
 if(!gacha||!Array.isArray(gacha.pool)) gacha={pool:Object.values(out).map(d=>({key:d.key,rate:d.gachaRate||10}))};
 gacha.pool=gacha.pool.filter(it=>out[it.key]).map(it=>({key:it.key,rate:Number(it.rate??it.weight??out[it.key].gachaRate??10)}));
 return {characters:out,gacha};
}

class Assets{
 async load(){
  const db=await loadCharacterDatabase();
  if(db){BASE_DATA=db.characters;GACHA_DATA=db.gacha;}
  if(BASE_DATA.slimecute && !GACHA_DATA.pool.some(it=>it.key==='slimecute')) GACHA_DATA.pool.push({key:'slimecute',rate:BASE_DATA.slimecute.gachaRate||10});
  this.bg=await loadImage('assets/bg/wasteland_sketch.png');
  this.characters={};
  for(const key of Object.keys(BASE_DATA)){
   const d={...BASE_DATA[key],animations:{...BASE_DATA[key].animations}};
   d.sprites={};
   for(const st of Object.keys(d.animations)) d.sprites[st]=await loadImage(d.spritePath+st+'.png');
   d.effectImage=await loadImage(d.effectPath);
   if(d.projectilePath)d.projectileImage=await loadImage(d.projectilePath);
   this.characters[key]=d;
  }
 }
 create(key){const s=this.characters[key];return {...s,animations:{...s.animations},sprites:s.sprites,effectImage:s.effectImage,projectileImage:s.projectileImage};}
 keys(){return Object.keys(this.characters);}
}

class Gacha{
 roll(exclude=[]){
let pool=GACHA_DATA.pool.filter(it=>!exclude.includes(it.key));
if(pool.length===0)pool=GACHA_DATA.pool;
let total=pool.reduce((a,b)=>a+b.rate,0),r=Math.random()*total,acc=0;
for(const it of pool){acc+=it.rate;if(r<=acc)return it.key;}
return pool[0].key;
}
}


// v1.2.0 Managers: CharacterManager 실제 로더 분리, Damage/Skill은 호환 내장 유지.
class DamageCalculator{
 static critMultiplier(u){
  const min=Number.isFinite(Number(u.critDamageMin))?Number(u.critDamageMin):(Number.isFinite(Number(u.criticalMin))?Number(u.criticalMin):(Number.isFinite(Number(u.criticalMultiplier))?Number(u.criticalMultiplier):1.5));
  const max=Number.isFinite(Number(u.critDamageMax))?Number(u.critDamageMax):(Number.isFinite(Number(u.criticalMax))?Number(u.criticalMax):min);
  const lo=Math.min(min,max),hi=Math.max(min,max);
  if(hi<=lo)return lo;
  return lo+Math.random()*(hi-lo);
 }
 static roll(attacker,target,baseAttack=null){
  const atk=Number(baseAttack??attacker.atk??1);
  let dmg=Math.max(1,Math.round(atk*(100/(100+(target.def||0)))));
  const crit=Math.random()<(attacker.critRate||0);
  if(crit)dmg=Math.round(dmg*this.critMultiplier(attacker));
  return {dmg,crit};
 }
}
class SkillManager{
 static applyOnHit(attacker,target,finalDamage,effects){
  if(attacker.paralyzeChance&&(target.paralyzeCooldown||0)<=0&&Math.random()<attacker.paralyzeChance){
   const pd=attacker.paralyzeDuration||1;
   target.stunTimer=Math.max(target.stunTimer||0,pd);
   target.paralyzeCooldown=pd+(attacker.paralyzeCooldownAfter||2);
  }
  if(attacker.lifeSteal){
   const heal=Math.max(1,Math.round(finalDamage*attacker.lifeSteal));
   attacker.hp=Math.min(attacker.maxHp,attacker.hp+heal);
   if(effects)effects.spawnHeal(attacker.x,attacker.y,heal);
  }
 }
 static applyExtraHits(attacker,target,effects,audio){
  if(!(attacker.extraHitChance&&Math.random()<attacker.extraHitChance&&!target.isDead&&target.hp>0))return;
  const result=DamageCalculator.roll(attacker,target,attacker.extraHitAtk||attacker.atk);
  const final=target.damage(result.dmg,result.crit);
  this.applyOnHit(attacker,target,final,effects);
  if(audio)audio.hit(target,result.crit);
  if(effects)effects.spawn(target,attacker,final,result.crit);
 }
}

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

  const result=DamageCalculator.roll(this.o,this.t);
  const final=this.t.damage(result.dmg,result.crit);
  SkillManager.applyOnHit(this.o,this.t,final,effects);

  if(this.audio)this.audio.hit(this.t,result.crit);

  // 지면 충돌 지점에서 고유 이펙트 표시
  const oldX=this.t.x, oldY=this.t.y;
  this.t.x=this.targetX;
  this.t.y=this.targetY-12;
  effects.spawn(this.t,this.o,final,result.crit);
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
calc(u,t){return DamageCalculator.roll(u,t);}
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
   const r=this.calc(u,t);
   const final=t.damage(r.dmg,r.crit);
   SkillManager.applyOnHit(u,t,final,this.e);
   if(this.audio)this.audio.hit(t,r.crit);
   this.e.spawn(t,u,final,r.crit);
   SkillManager.applyExtraHits(u,t,this.e,this.audio);
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


class ProfileGrid{
 constructor(assets){this.assets=assets;this.visible=false;this.page=0;this.perPage=10;}
 open(){this.visible=true;this.page=0;}
 close(){this.visible=false;}
 sortedKeys(){
  const order={'SPECIAL':0,'LEGENDARY':1,'LEGEND':1,'SUPER EPIC':2,'EPIC':3,'RARE':4,'NORMAL':5};
  return Object.keys(this.assets.characters).sort((a,b)=>{
    const da=this.assets.characters[a], db=this.assets.characters[b];
    const oa=order[da.grade]??99, ob=order[db.grade]??99;
    if(oa!==ob)return oa-ob;
    return (da.id||999)-(db.id||999);
  });
 }
 draw(c){
  if(!this.visible)return;
  c.save();
  c.fillStyle='rgba(255,255,255,.96)';
  panel(c,120,70,1040,560,18);
  c.fillStyle='#111';
  c.textAlign='center';
  c.font='bold 30px sans-serif';
  c.fillText('등록 캐릭터 프로필',640,112);
  c.font='14px sans-serif';
  c.fillStyle='#555';
  c.fillText('정렬: SPECIAL → LEGENDARY → SUPER EPIC → EPIC → RARE → NORMAL',640,135);

  const keys=this.sortedKeys();
  const totalPages=Math.max(1,Math.ceil(keys.length/this.perPage));
  if(this.page>=totalPages)this.page=totalPages-1;
  const pageKeys=keys.slice(this.page*this.perPage,(this.page+1)*this.perPage);

  const cols=5, rows=2;
  const w=170,h=190,gapX=24,gapY=22;
  const startX=165,startY=160;
  pageKeys.forEach((key,i)=>{
    const d=this.assets.characters[key];
    const col=i%cols,row=Math.floor(i/cols);
    const x=startX+col*(w+gapX),y=startY+row*(h+gapY);
    let gc=gradeColor(d.grade);
    c.fillStyle='rgba(255,255,255,.92)';
    panel(c,x,y,w,h,14);
    if(gc==='rainbow'){
      let colors=['#ff3b3b','#ff9f1c','#ffe600','#2ecc71','#3498db','#8e44ad'];
      colors.forEach((cl,j)=>{c.strokeStyle=cl;c.lineWidth=2;roundRect(c,x+j*2,y+j*2,w-j*4,h-j*4,14,false,true);});
    }else if(gc==='super'){
      ['#8e44ad','#b00020','#8e44ad','#b00020'].forEach((cl,j)=>{c.strokeStyle=cl;c.lineWidth=2;roundRect(c,x+j*2,y+j*2,w-j*4,h-j*4,14,false,true);});
    }else{
      c.strokeStyle=gc;c.lineWidth=3;roundRect(c,x,y,w,h,14,false,true);
    }
    c.fillStyle=gc==='rainbow'?'#d43cff':gc==='super'?'#8b0000':gc;
    c.font='bold 13px sans-serif';
    c.fillText(d.grade||'NORMAL',x+w/2,y+20);
    const img=d.sprites.idle;
    if(img)c.drawImage(img,0,0,96,96,x+w/2-48,y+28,96,96);
    c.fillStyle='#111';
    c.font=d.name.length>8?'13px sans-serif':d.name.length>6?'15px sans-serif':'18px sans-serif';
    c.fillText(d.name,x+w/2,y+135);
    c.font='13px sans-serif';
    c.fillText('HP '+d.hp+'  ATK '+d.atk,x+w/2,y+154);
    c.fillText('DEF '+d.def+'  SPD '+d.attackSpeed,x+w/2,y+172);
    c.font='12px sans-serif';
    c.fillText('뽑기 '+(d.gachaRate!=null?d.gachaRate:'-')+'% / '+(d.attackType==='projectile'?'원거리':'근접'),x+w/2,y+188);
  });

  c.fillStyle='rgba(255,255,255,.92)';
  panel(c,1015,86,120,42,12);
  c.fillStyle='#111';
  c.font='20px sans-serif';
  c.fillText('닫기',1075,114);

  const prevDisabled=this.page<=0, nextDisabled=this.page>=totalPages-1;
  c.fillStyle=prevDisabled?'rgba(220,220,220,.8)':'rgba(255,255,255,.94)';
  panel(c,430,585,130,42,12);
  c.fillStyle=prevDisabled?'#999':'#111';
  c.font='bold 18px sans-serif';
  c.fillText('이전',495,612);
  c.fillStyle='rgba(255,255,255,.0)';
  c.fillStyle='#111';
  c.font='bold 16px sans-serif';
  c.fillText((this.page+1)+' / '+totalPages,640,612);
  c.fillStyle=nextDisabled?'rgba(220,220,220,.8)':'rgba(255,255,255,.94)';
  panel(c,720,585,130,42,12);
  c.fillStyle=nextDisabled?'#999':'#111';
  c.font='bold 18px sans-serif';
  c.fillText('다음',785,612);
  c.restore();
 }
 handleClick(p){
  if(!this.visible)return false;
  const totalPages=Math.max(1,Math.ceil(this.sortedKeys().length/this.perPage));
  if(p.x>=1015&&p.x<=1135&&p.y>=86&&p.y<=128){this.close();return true;}
  if(p.x>=430&&p.x<=560&&p.y>=585&&p.y<=627){if(this.page>0)this.page--;return true;}
  if(p.x>=720&&p.x<=850&&p.y>=585&&p.y<=627){if(this.page<totalPages-1)this.page++;return true;}
  if(p.x>=120&&p.x<=1160&&p.y>=70&&p.y<=630)return true;
  return false;
 }
}

class Game{
 constructor(){this.c=document.getElementById('game');this.ctx=this.c.getContext('2d');this.w=1280;this.h=720;this.c.width=this.w;this.c.height=this.h;this.assets=new Assets();this.gacha=new Gacha();this.debug=false;this.last=0;this.buttons=[];window.addEventListener('keydown',e=>{if(e.key==='F1'){e.preventDefault();this.debug=!this.debug;}if(e.code==='Space'&&this.battle)this.battle.start();});this.c.addEventListener('pointerdown',e=>this.click(e));this.resize();window.addEventListener('resize',()=>this.resize());this.start();}
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
 draw(){let c=this.ctx,off=this.effects.offset();c.clearRect(0,0,this.w,this.h);c.save();c.translate(off.x,off.y);if(this.assets.bg)c.drawImage(this.assets.bg,0,0);else{c.fillStyle='#fff';c.fillRect(0,0,this.w,this.h);}this.battle.draw(c,this.debug);this.effects.draw(c);c.restore();if(!this.hideDraft)this.draft.draw(c);this.buttons.forEach(b=>b.draw(c));panel(c,210,685,860,28,10);c.fillStyle='#111';c.textAlign='center';c.font='15px sans-serif';c.fillText('v1.2.0 | CharacterManager 실제 분리',640,705);c.textAlign='right';c.font='bold 15px sans-serif';c.fillStyle='rgba(20,20,20,.92)';c.fillText('Art by 홍은성',1250,705);c.textAlign='left';if(this.profileGrid)this.profileGrid.draw(c);}
}
window.onload=()=>new Game();
