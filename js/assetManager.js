// v1.0.8: Asset loading. Legacy generic effect removed.
class Assets{
 async load(){
  const db=await loadCharacterDatabase();
  if(db)BASE_DATA=db.characters;
  this.bg=await loadImage('assets/bg/wasteland_sketch.png');
  this.characters={};
  for(const key of Object.keys(BASE_DATA)){
   const d={...BASE_DATA[key],animations:{...BASE_DATA[key].animations}};
   d.sprites={};
   for(const st of Object.keys(d.animations)) d.sprites[st]=await loadImage(d.spritePath+st+'.png');
   d.attackEffectImage=await loadImage(d.attackEffectPath);
   d.hitEffectImage=await loadImage(d.hitEffectPath);
   if(d.projectilePath)d.projectileImage=await loadImage(d.projectilePath);
   this.characters[key]=d;
  }
 }
 create(key){
  const s=this.characters[key];
  return {
   ...s,
   animations:{...s.animations},
   sprites:s.sprites,
   attackEffect:{...(s.attackEffect||{})},
   hitEffect:{...(s.hitEffect||{})},
   attackEffectImage:s.attackEffectImage,
   hitEffectImage:s.hitEffectImage,
   projectileImage:s.projectileImage
  };
 }
 keys(){return Object.keys(this.characters);}
}
