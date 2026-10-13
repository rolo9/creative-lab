/* A drawing rule, not a biological simulation. Positions use normalized canvas coordinates. */
class ForgettingGarden {
  constructor(seed=4317){this.seed=seed>>>0;this.blooms=[];this.fragments=[];this.time=0;this.nextId=0;this.palette=0;this.touchCount=0}
  random(){this.seed=(Math.imul(this.seed,1664525)+1013904223)>>>0;return this.seed/4294967296}
  static palettes=[['#ce5846','#e99965','#e2bc76','#46695e','#344e64'],['#526e9a','#8aa8af','#bba9cc','#324859','#c89c80'],['#59785b','#96a379','#b9b78d','#d9906b','#3a5651']];
  add(x,y){
    x=Math.max(.02,Math.min(.98,x));y=Math.max(.02,Math.min(.98,y));
    const palette=ForgettingGarden.palettes[this.palette],borrowed=[],id=this.nextId++;
    const nearby=this.blooms.map(b=>({b,d:Math.hypot(b.x-x,b.y-y)})).filter(o=>o.d<.28&&o.b.life>.15).sort((a,b)=>a.d-b.d).slice(0,3);
    for(const {b,d} of nearby){
      const direction=Math.atan2(y-b.y,x-b.x),count=Math.max(3,Math.floor(b.petals.length*(.25+(1-d/.28)*.35)));
      const candidates=b.petals.filter(p=>p.strength>.4).sort((p,q)=>Math.abs(Math.atan2(Math.sin(p.angle-direction),Math.cos(p.angle-direction)))-Math.abs(Math.atan2(Math.sin(q.angle-direction),Math.cos(q.angle-direction)))).slice(0,count);
      for(const p of candidates){p.strength*=.15;borrowed.push(p.color);this.fragments.push({x:b.x,y:b.y,angle:p.angle,r:b.radius*p.length,toX:x,toY:y,age:0,duration:1.2+this.random()*.8,color:p.color,curve:(this.random()-.5)*.2})}
      b.life*=.9;
    }
    const n=19+Math.floor(this.random()*12),rotation=this.random()*Math.PI*2,petals=[];
    for(let i=0;i<n;i++){const own=palette[Math.floor(this.random()*palette.length)];petals.push({angle:rotation+i*Math.PI*2/n+(this.random()-.5)*.22,length:.55+this.random()*.55,width:.08+this.random()*.13,bend:(this.random()-.5)*.5,strength:1,color:borrowed.length&&this.random()<.65?borrowed[Math.floor(this.random()*borrowed.length)]:own})}
    const bloom={id,x,y,radius:.09+this.random()*.065,age:0,life:1,petals,borrowed:borrowed.length};
    this.blooms.push(bloom);if(this.blooms.length>36)this.blooms.shift();if(this.fragments.length>400)this.fragments.splice(0,this.fragments.length-400);this.touchCount++;return bloom;
  }
  advance(dt){dt=Math.max(0,Math.min(.1,dt));this.time+=dt;for(const b of this.blooms){b.age+=dt;b.life=Math.max(0,b.life-dt/240)}this.blooms=this.blooms.filter(b=>b.life>.025);for(const f of this.fragments)f.age+=dt;this.fragments=this.fragments.filter(f=>f.age<f.duration)}
  clear(){this.blooms=[];this.fragments=[];this.touchCount=0;this.nextId=0;this.time=0}
}
function drawForgettingGarden(ctx,garden,width,height){
  const scale=Math.min(width,height);ctx.clearRect(0,0,width,height);ctx.fillStyle='#f4f0e7';ctx.fillRect(0,0,width,height);
  ctx.save();
  for(const b of garden.blooms){
    const grow=1-Math.pow(1-Math.min(1,b.age/1.7),3),radius=b.radius*scale*grow;
    ctx.save();ctx.translate(b.x*width,b.y*height);
    for(const p of b.petals){
      const r=radius*p.length,wind=garden.motion===false?0:Math.sin(garden.time*.22+b.id)*.025;
      ctx.save();ctx.rotate(p.angle+wind);ctx.strokeStyle=p.color;ctx.fillStyle=p.color;ctx.globalAlpha=b.life*p.strength*.72;
      const bend=p.bend*r,w=p.width*r;
      ctx.lineWidth=.65;ctx.beginPath();ctx.moveTo(0,0);ctx.bezierCurveTo(r*.26,bend*.5,r*.6,bend,r*.98,bend*.3);ctx.stroke();
      ctx.beginPath();ctx.moveTo(r*.18,bend*.3);ctx.bezierCurveTo(r*.38,-w+bend*.7,r*.81,-w+bend,r,bend*.3);ctx.bezierCurveTo(r*.78,w+bend,r*.34,w*.4+bend*.7,r*.18,bend*.3);ctx.fill();
      ctx.globalAlpha=b.life*p.strength*.27;ctx.beginPath();ctx.moveTo(r*.25,bend*.2);ctx.bezierCurveTo(r*.46,-w*1.4+bend*.3,r*.84,-w*.9+bend*.7,r*1.015,bend*.2);ctx.bezierCurveTo(r*.72,w*.8+bend*.9,r*.35,w*.8+bend*.3,r*.25,bend*.2);ctx.fill();
      ctx.globalAlpha=b.life*p.strength*.4;ctx.strokeStyle='#f4f0e7';ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(r*.24,bend*.4);ctx.quadraticCurveTo(r*.65,bend,r*.92,bend*.3);ctx.stroke();ctx.restore();
    }
    ctx.globalAlpha=b.life*.75;ctx.fillStyle=b.petals[0].color;ctx.beginPath();ctx.arc(0,0,2.3*grow,0,Math.PI*2);ctx.fill();ctx.restore();
  }
  for(const f of garden.fragments){const t=f.age/f.duration,e=t*t*(3-2*t),sx=f.x*width+Math.cos(f.angle)*f.r*scale,sy=f.y*height+Math.sin(f.angle)*f.r*scale;
    const x=sx+(f.toX*width-sx)*e+Math.sin(t*Math.PI)*f.curve*scale,y=sy+(f.toY*height-sy)*e+Math.sin(t*Math.PI)*f.curve*scale*.5;
    ctx.save();ctx.translate(x,y);ctx.rotate(f.angle+t*4);ctx.globalAlpha=Math.sin(Math.PI*t)*.75;ctx.fillStyle=f.color;ctx.beginPath();ctx.ellipse(0,0,5*(1-t)+1,1.5,0,0,Math.PI*2);ctx.fill();ctx.restore();
  }
  ctx.restore();
}
if(typeof module!=='undefined')module.exports={ForgettingGarden,drawForgettingGarden};
