// v1.6.0: Asset loading moved out of game.bundle.js.
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
   d.effectImage=await loadImage(d.effectPath);
   if(d.projectilePath)d.projectileImage=await loadImage(d.projectilePath);
   this.characters[key]=d;
  }
 }
 create(key){const s=this.characters[key];return {...s,animations:{...s.animations},sprites:s.sprites,effectImage:s.effectImage,projectileImage:s.projectileImage};}
 keys(){return Object.keys(this.characters);}
}
