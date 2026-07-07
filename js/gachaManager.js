// v1.5.0: Gacha pool is derived from character JSON gachaRate.
class Gacha{
 constructor(getData){this.getData=getData||(()=>BASE_DATA);}
 pool(exclude=[]){
  const data=this.getData()||{};
  return Object.values(data)
   .filter(d=>d&&d.key&&!exclude.includes(d.key)&&d.key!=='training_dummy')
   .map(d=>({key:d.key,rate:Number(d.gachaRate??10)}));
 }
 roll(exclude=[]){
  let pool=this.pool(exclude);
  if(pool.length===0)pool=this.pool([]);
  if(pool.length===0)return null;
  let total=pool.reduce((a,b)=>a+b.rate,0),r=Math.random()*total,acc=0;
  for(const it of pool){acc+=it.rate;if(r<=acc)return it.key;}
  return pool[0].key;
 }
}
