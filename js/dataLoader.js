// v1.0.8 Data-Driven loader
// character.json 기준 역할:
// projectile   = 원거리 캐릭터의 날아가는 투사체
// attackEffect = 근접 캐릭터의 공격 중 표시 이미지
// hitEffect    = 원거리/근접 공통 타격 시 표시 이미지
async function loadJsonSafe(url){
 try{
  const r=await fetch(url,{cache:'no-store'});
  if(!r.ok) throw new Error(url+' '+r.status);
  return await r.json();
 }catch(e){
  console.warn('[DataDriven] JSON load failed:',url,e);
  return null;
 }
}
function asNumber(v,def=0){
 const n=Number(v);
 return Number.isFinite(n)?n:def;
}
function normalizeEffectConfig(src, defaults={}){
 if(!src) return null;
 const path=src.path??defaults.path??null;
 const style=src.style??defaults.style??'image';
 const enabled=Boolean(src.enabled??path??(style==='burst'?true:false));
 if(!enabled) return null;
 return {
  path,
  enabled,
  frames:asNumber(src.frames??defaults.frames,5),
  startFrame:asNumber(src.startFrame??defaults.startFrame,0),
  frameWidth:asNumber(src.frameWidth??defaults.frameWidth,96),
  centerEffect:Boolean(src.centerEffect??defaults.centerEffect??false),
  anchor:src.anchor??defaults.anchor??'target',
  offsetX:asNumber(src.offsetX??defaults.offsetX,0),
  offsetY:asNumber(src.offsetY??defaults.offsetY,0),
  scale:asNumber(src.scale??defaults.scale,1),
  width:src.width!=null?asNumber(src.width):defaults.width??null,
  height:src.height!=null?asNumber(src.height):defaults.height??null,
  frameSequence:src.frameSequence??defaults.frameSequence??null,
  frameOffsets:src.frameOffsets??defaults.frameOffsets??null,
  style,
  start:asNumber(src.start??defaults.start,0.38),
  playOnce:Boolean(src.playOnce??defaults.playOnce??true)
 };
}
function normalizeCharacterData(raw){
 const d={...raw};
 const st=d.stats||{};
 const cr=d.critical||{};
 const ga=d.gacha||{};
 const co=d.combat||{};
 const as=d.assets||{};
 const pr=d.projectile||d.projectiles||null;

 d.hp=asNumber(st.hp??d.hp,100);
 d.atk=asNumber(st.attack??st.atk??d.atk,10);
 d.def=asNumber(st.defense??st.def??d.def,0);
 d.attackSpeed=asNumber(st.attackSpeed??d.attackSpeed,1);
 d.attackArea=asNumber(st.attackArea??d.attackArea,45);
 d.attackRange=asNumber(st.attackRange??d.attackRange,2);
 d.moveSpeed=asNumber(st.moveSpeed??d.moveSpeed,2);
 d.bodyRadius=asNumber(st.bodyRadius??d.bodyRadius,48);
 d.stopGap=asNumber(st.stopGap??d.stopGap,16);
 d.gridMoveSpeed=asNumber(st.gridMoveSpeed??d.gridMoveSpeed??d.moveSpeed,d.moveSpeed);
 d.gridAttackRange=asNumber(st.gridAttackRange??d.gridAttackRange??d.attackRange,d.attackRange);
 d.critRate=asNumber(cr.chance??d.critRate,0.15);
 if(d.critRate>1)d.critRate=d.critRate/100;
 d.critDamageMin=asNumber(cr.min??d.critDamageMin??d.criticalMin??d.criticalMultiplier,1.5);
 d.critDamageMax=asNumber(cr.max??d.critDamageMax??d.criticalMax,d.critDamageMin);
 d.gachaRate=asNumber(ga.weight??ga.rate??d.gachaRate,10);
 d.attackType=co.attackType??d.attackType??'melee';
 d.aiType=co.aiType??d.aiType;
 d.attackMethod=co.attackMethod??d.attackMethod??'';
 d.feature=co.feature??d.feature??'';

 const tf=d.transform||co.transform||null;
 if(tf&&tf.target){
  d.transform={
   target:tf.target,
   hpBelow:asNumber(tf.hpBelow??tf.hpPercentBelow,0.5),
   chance:asNumber(tf.chance,1),
   text:tf.text??'각성',
   once:Boolean(tf.once??true),
   preserveHpRatio:Boolean(tf.preserveHpRatio??true),
   resetOnRound:Boolean(tf.resetOnRound??true)
  };
  if(d.transform.hpBelow>1)d.transform.hpBelow/=100;
  if(d.transform.chance>1)d.transform.chance/=100;
 }else{
  d.transform=null;
 }

 d.spritePath=as.spritePath??d.spritePath??('assets/characters/'+d.key+'/');
 d.soundPath=as.soundPath??d.soundPath??('assets/sounds/'+d.key+'/');

 d.attackEffect=normalizeEffectConfig(d.attackEffect, {offsetY:-25,width:120,height:120});
 d.hitEffect=normalizeEffectConfig(d.hitEffect, {offsetY:12,width:96,height:96});

 d.attackEffectPath=d.attackEffect?.path??null;
 d.hitEffectPath=d.hitEffect?.path??null;

 if(pr&&pr.path){
  d.projectilePath=pr.path??as.projectilePath??d.projectilePath;
  d.projectileSpeed=asNumber(pr.speed??d.projectileSpeed,520);
  d.projectileSpeedCells=asNumber(pr.speedCells??d.projectileSpeedCells,8);
  d.projectileFrames=asNumber(pr.frames??d.projectileFrames,1);
  d.projectileStartFrame=asNumber(pr.startFrame??d.projectileStartFrame,0);
  d.projectileFrameWidth=asNumber(pr.frameWidth??d.projectileFrameWidth,96);
  const tr=String(pr.trajectory??d.projectileTrajectory??'ground').toLowerCase();
  d.projectileTrajectory=tr==='staraight'?'straight':tr;
  d.projectileSpawnX=asNumber(pr.spawnX??d.projectileSpawnX,46);
  d.projectileSpawnY=asNumber(pr.spawnY??d.projectileSpawnY,-58);
  d.projectileTargetX=asNumber(pr.targetX??d.projectileTargetX,-18);
  d.projectileTargetY=asNumber(pr.targetY??d.projectileTargetY,35);
  d.projectileArcHeight=asNumber(pr.arcHeight??d.projectileArcHeight,80);
  d.projectileScale=asNumber(pr.scale??d.projectileScale,1);
  d.projectileWidth=pr.width!=null?asNumber(pr.width):(d.projectileFrameWidth||96);
  d.projectileHeight=pr.height!=null?asNumber(pr.height):96;
 }else{
  d.projectilePath=null;
 }

 for(const s of (d.skills||[])){
  if(s.type==='lifesteal') d.lifeSteal=asNumber(s.value,0);
  if(s.type==='double_attack'){
   d.extraHitChance=asNumber(s.chance,0);
   if(d.extraHitChance>1)d.extraHitChance/=100;
   d.extraHitAtk=asNumber(s.damage,d.atk);
  }
  if(s.type==='paralyze'){
   d.paralyzeChance=asNumber(s.chance,1);
   if(d.paralyzeChance>1)d.paralyzeChance/=100;
   d.paralyzeDuration=asNumber(s.duration,1);
   d.paralyzeCooldownAfter=asNumber(s.cooldownAfter,2);
  }
  if(s.type==='damage_reduction') d.damageReduction=asNumber(s.value,0);
 }
 d.frameSize=asNumber(d.frameSize,96);
 d.animations=d.animations||{idle:2,walk:4,attack:3,hit:1,dead:2};
 return d;
}
function getGitHubPagesRepoInfo(){
 const host=window.location.hostname;
 const path=window.location.pathname.split('/').filter(Boolean);
 if(!host.endsWith('.github.io')) return null;
 const owner=host.replace('.github.io','');
 const repo=path[0]||owner+'.github.io';
 return {owner,repo};
}
async function listCharacterJsonPathsFromGitHub(){
 const info=getGitHubPagesRepoInfo();
 if(!info) return [];
 const api='https://api.github.com/repos/'+info.owner+'/'+info.repo+'/contents/assets/characters';
 try{
  const r=await fetch(api,{cache:'no-store'});
  if(!r.ok) throw new Error(api+' '+r.status);
  const items=await r.json();
  if(!Array.isArray(items)) return [];
  return items
   .filter(item=>item&&item.type==='dir'&&item.name)
   .map(item=>'assets/characters/'+item.name+'/character.json');
 }catch(e){
  console.warn('[DataDriven] GitHub character auto-scan failed:',e);
  return [];
 }
}
async function loadCharactersFromPaths(paths){
 const out={};
 for(const path of paths){
  const raw=await loadJsonSafe(path);
  if(raw&&raw.key) out[raw.key]=normalizeCharacterData(raw);
 }
 return out;
}
async function loadCharacterDatabase(){
 let out=await loadCharactersFromPaths(await listCharacterJsonPathsFromGitHub());
 if(Object.keys(out).length) return {characters:out};

 const manifest=await loadJsonSafe('data/character_manifest.json');
 if(Array.isArray(manifest)) out=await loadCharactersFromPaths(manifest);
 if(Object.keys(out).length) return {characters:out};

 const fallbackChars=Array.isArray(window.HOUHOU_CHARACTER_DATA)?window.HOUHOU_CHARACTER_DATA:null;
 if(fallbackChars){
  for(const raw of fallbackChars) if(raw&&raw.key) out[raw.key]=normalizeCharacterData(raw);
 }
 return Object.keys(out).length?{characters:out}:null;
}
