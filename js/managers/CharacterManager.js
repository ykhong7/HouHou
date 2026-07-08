// v1.0.9: CharacterManager helper aligned with projectile / attackEffect / hitEffect schema.
class CharacterManager{
 static asNumber(v,def=0){const n=Number(v);return Number.isFinite(n)?n:def;}
 static normalizeEffectConfig(src,defaults={}){
  if(!src)return null;
  const path=src.path??defaults.path??null;
  const style=src.style??defaults.style??'image';
  const enabled=Boolean(src.enabled??path??(style==='burst'?true:false));
  if(!enabled)return null;
  return {
   path,enabled,style,
   frames:this.asNumber(src.frames??defaults.frames,5),
   startFrame:this.asNumber(src.startFrame??defaults.startFrame,0),
   frameWidth:this.asNumber(src.frameWidth??defaults.frameWidth,96),
   centerEffect:Boolean(src.centerEffect??defaults.centerEffect??false),
   anchor:src.anchor??defaults.anchor??'target',
   offsetX:this.asNumber(src.offsetX??defaults.offsetX,0),
   offsetY:this.asNumber(src.offsetY??defaults.offsetY,0),
   scale:this.asNumber(src.scale??defaults.scale,1),
   width:src.width!=null?this.asNumber(src.width):defaults.width??null,
   height:src.height!=null?this.asNumber(src.height):defaults.height??null,
   frameSequence:src.frameSequence??defaults.frameSequence??null,
   frameOffsets:src.frameOffsets??defaults.frameOffsets??null,
   start:this.asNumber(src.start??defaults.start,0.38),
   playOnce:Boolean(src.playOnce??defaults.playOnce??true)
  };
 }
 static normalize(d){
  const as=d.assets||{};
  d.spritePath=as.spritePath??d.spritePath??('assets/characters/'+d.key+'/');
  d.soundPath=as.soundPath??d.soundPath??('assets/sounds/'+d.key+'/');
  d.attackEffect=this.normalizeEffectConfig(d.attackEffect,{offsetY:-25,width:120,height:120});
  d.hitEffect=this.normalizeEffectConfig(d.hitEffect,{offsetY:12,width:96,height:96});
  d.attackEffectPath=d.attackEffect?.path??null;
  d.hitEffectPath=d.hitEffect?.path??null;
  const pr=d.projectile||null;
  if(pr&&pr.path){
   d.projectilePath=pr.path;
   d.projectileFrames=this.asNumber(pr.frames,1);
   d.projectileStartFrame=this.asNumber(pr.startFrame,0);
   d.projectileFrameWidth=this.asNumber(pr.frameWidth,96);
   d.projectileTrajectory=String(pr.trajectory??'ground').toLowerCase();
   if(d.projectileTrajectory==='staraight')d.projectileTrajectory='straight';
   d.projectileSpawnX=this.asNumber(pr.spawnX,46);
   d.projectileSpawnY=this.asNumber(pr.spawnY,-58);
   d.projectileTargetX=this.asNumber(pr.targetX,-18);
   d.projectileTargetY=this.asNumber(pr.targetY,35);
   d.projectileArcHeight=this.asNumber(pr.arcHeight,80);
   d.projectileScale=this.asNumber(pr.scale,1);
   d.projectileWidth=pr.width!=null?this.asNumber(pr.width):d.projectileFrameWidth;
   d.projectileHeight=pr.height!=null?this.asNumber(pr.height):96;
  }
  return d;
 }
}
