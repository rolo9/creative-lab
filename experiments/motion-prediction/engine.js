/* Simulator state is supplied directly; no image recognition. Fixed step: 50ms. */
const MotionLab={DT:.05,G:9.8,FLOOR:.15,REST:.75,
  step(s){let y=s.y+s.vy*this.DT-.5*this.G*this.DT*this.DT,vy=s.vy-this.G*this.DT;if(y<this.FLOOR){y=2*this.FLOOR-y;vy=-vy*this.REST}return{x:s.x+s.vx*this.DT,y,vx:s.vx,vy}},
  network(input,model){let a=input;for(let l=0;l<model.weights.length;l++){const w=model.weights[l],b=model.biases[l];a=b.map((bias,j)=>{let value=bias;for(let i=0;i<a.length;i++)value+=a[i]*w[i][j];return l<model.weights.length-1?Math.tanh(value):value})}return a},
  learnedStep(s,model){const out=this.network([s.y/6,s.vy/12],model);return{x:s.x+s.vx*this.DT,y:out[0]*6,vx:s.vx,vy:out[1]*12}},
  trajectory(initial,seconds,kind,model){const path=[{...initial}],n=Math.round(seconds/this.DT);for(let i=0;i<n;i++){const s=path.at(-1);let next;if(kind==='straight')next={x:s.x+s.vx*this.DT,y:s.y+s.vy*this.DT,vx:s.vx,vy:s.vy};else if(kind==='physics')next=this.step(s);else next=this.learnedStep(s,model);path.push(next)}return path},
  sample(path,seconds){const at=Math.max(0,Math.min(path.length-1,seconds/this.DT)),i=Math.floor(at),j=Math.min(i+1,path.length-1),f=at-i;return{x:path[i].x*(1-f)+path[j].x*f,y:path[i].y*(1-f)+path[j].y*f}},
  compare(initial,seconds,model){const truth=this.trajectory(initial,seconds,'physics',model),paths={};for(const kind of ['straight','physics','learned']){const path=this.trajectory(initial,seconds,kind,model),error=path.map((p,i)=>Math.hypot(p.x-truth[i].x,p.y-truth[i].y));paths[kind]={path,finalError:error.at(-1),meanError:error.reduce((s,x)=>s+x,0)/error.length}}return{truth,paths}}
};
function drawMotionScene(ctx,width,height,run,kind,elapsed,aim){
 const pad=30,usable=width-2*pad,sx=usable/14,ground=height-65,sy=(height-115)/6,px=x=>pad+x*sx,py=y=>ground-y*sy;
 ctx.clearRect(0,0,width,height);ctx.fillStyle='#111c27';ctx.fillRect(0,0,width,height);ctx.save();ctx.strokeStyle='#263442';ctx.lineWidth=1;
 for(let x=0;x<=14;x+=2){ctx.beginPath();ctx.moveTo(px(x),38);ctx.lineTo(px(x),ground);ctx.stroke()}for(let y=0;y<=6;y++){ctx.beginPath();ctx.moveTo(pad,py(y));ctx.lineTo(width-pad,py(y));ctx.stroke()}
 ctx.strokeStyle='#7d8b8b';ctx.beginPath();ctx.moveTo(pad,ground);ctx.lineTo(width-pad,ground);ctx.stroke();ctx.fillStyle='#8a9b9c';ctx.font='11px sans-serif';ctx.fillText('床',pad,ground+22);
 if(!run){ctx.fillText('予測モデルを読み込み中…',pad,55);ctx.restore();return}
 const colors={straight:'#83b5dc',physics:'#8dd8af',learned:'#f1b574'},path=run.paths[kind].path;
 function trace(points,color,dashed){ctx.beginPath();ctx.setLineDash(dashed?[5,5]:[]);ctx.strokeStyle=color;ctx.lineWidth=2.5;points.forEach((p,i)=>i?ctx.lineTo(px(p.x),py(p.y)):ctx.moveTo(px(p.x),py(p.y)));ctx.stroke();ctx.setLineDash([])}
 trace(path,colors[kind],true);
 const end=path.at(-1),inside=end.x>=0&&end.x<=14&&end.y>=0&&end.y<=6;
 if(inside){ctx.strokeStyle=colors[kind];ctx.lineWidth=2;ctx.beginPath();ctx.arc(px(end.x),py(end.y),11,0,Math.PI*2);ctx.stroke();ctx.fillStyle=colors[kind];ctx.fillText('予測した到着点',Math.min(width-126,Math.max(12,px(end.x)-40)),Math.max(18,py(end.y)-19))}
 else{ctx.fillStyle=colors[kind];ctx.fillText('予測は枠の外へ続きます',width-185,height-18)}
 const upto=Math.min(run.truth.length-1,Math.floor(elapsed/MotionLab.DT)),trail=run.truth.slice(0,upto+1),ball=MotionLab.sample(run.truth,elapsed);trail.push(ball);trace(trail,'#f5f3e9',false);
 const prediction=MotionLab.sample(path,elapsed);
 ctx.globalAlpha=.5;ctx.strokeStyle=colors[kind];ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(px(ball.x),py(ball.y));ctx.lineTo(px(prediction.x),py(prediction.y));ctx.stroke();ctx.globalAlpha=1;
 ctx.fillStyle=colors[kind];ctx.beginPath();ctx.arc(px(prediction.x),py(prediction.y),5,0,Math.PI*2);ctx.fill();
 ctx.fillStyle='#f5f3e9';ctx.shadowColor='#ffffff55';ctx.shadowBlur=15;ctx.beginPath();ctx.arc(px(ball.x),py(ball.y),8,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
 ctx.fillStyle='#e6e8df';ctx.font='12px sans-serif';ctx.fillText('実際のボール',Math.min(width-110,px(ball.x)+13),Math.min(height-25,py(ball.y)+26));
 if(aim){ctx.strokeStyle='#e9d9b0';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(aim.x1,aim.y1);ctx.lineTo(aim.x2,aim.y2);ctx.stroke();ctx.fillStyle='#e9d9b0';ctx.fillText('この方向へ投げる',Math.max(12,Math.min(width-140,aim.x2)),Math.max(20,aim.y2-12))}
 ctx.restore();
}
if(typeof module!=='undefined')module.exports={MotionLab,drawMotionScene};
