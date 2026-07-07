// v1.6.0 Data-Driven loader: HTTP/GitHub Pages에서는 manifest의 assets/characters/*/character.json을 우선 로드한다.
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
 const out={};
 const manifest=await loadJsonSafe('data/character_manifest.json');
 if(Array.isArray(manifest)){
  for(const path of manifest){
   const raw=await loadJsonSafe(path);
   if(raw&&raw.key) out[raw.key]=normalizeCharacterData(raw);
  }
 }
 if(Object.keys(out).length) return {characters:out};
 const fallbackChars=Array.isArray(window.HOUHOU_CHARACTER_DATA)?window.HOUHOU_CHARACTER_DATA:null;
 if(fallbackChars){
  for(const raw of fallbackChars) if(raw&&raw.key) out[raw.key]=normalizeCharacterData(raw);
 }
 if(!Object.keys(out).length) return null;
 return {characters:out};
}
