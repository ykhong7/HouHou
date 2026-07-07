// HouHou Fighter v1.2.0 - ProfileGrid UI module
// Extracted from game.bundle.js to continue real code reduction.

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

