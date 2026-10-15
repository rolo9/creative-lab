/* Simulator state is supplied directly; no image recognition. Fixed step: 50ms. */
const MotionLab={DT:.05,G:9.8,FLOOR:.15,REST:.75,
  step(s,rest=this.REST){let y=s.y+s.vy*this.DT-.5*this.G*this.DT*this.DT,vy=s.vy-this.G*this.DT;if(y<this.FLOOR){y=2*this.FLOOR-y;vy=-vy*rest}return{x:s.x+s.vx*this.DT,y,vx:s.vx,vy}},
  network(input,model){let a=input;for(let l=0;l<model.weights.length;l++){const w=model.weights[l],b=model.biases[l];a=b.map((bias,j)=>{let value=bias;for(let i=0;i<a.length;i++)value+=a[i]*w[i][j];return l<model.weights.length-1?Math.tanh(value):value})}return a},
  learnedStep(s,model){const out=this.network([s.y/6,s.vy/12],model);return{x:s.x+s.vx*this.DT,y:out[0]*6,vx:s.vx,vy:out[1]*12}},
  trajectory(initial,seconds,kind,model){const path=[{...initial}],n=Math.round(seconds/this.DT);for(let i=0;i<n;i++){const s=path.at(-1);let next;if(kind==='straight')next={x:s.x+s.vx*this.DT,y:s.y+s.vy*this.DT,vx:s.vx,vy:s.vy};else if(kind==='physics')next=this.step(s);else next=this.learnedStep(s,model);path.push(next)}return path},
  sample(path,seconds){const at=Math.max(0,Math.min(path.length-1,seconds/this.DT)),i=Math.floor(at),j=Math.min(i+1,path.length-1),f=at-i;return{x:path[i].x*(1-f)+path[j].x*f,y:path[i].y*(1-f)+path[j].y*f}},
  compare(initial,seconds,model){const truth=this.trajectory(initial,seconds,'physics',model),paths={};for(const kind of ['straight','physics','learned']){const path=this.trajectory(initial,seconds,kind,model),error=path.map((p,i)=>Math.hypot(p.x-truth[i].x,p.y-truth[i].y));paths[kind]={path,finalError:error.at(-1),meanError:error.reduce((s,x)=>s+x,0)/error.length}}return{truth,paths}}
};

if(typeof module!=="undefined")module.exports={MotionLab};
