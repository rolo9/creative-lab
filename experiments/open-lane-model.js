/* Fixed-capacity congestion game; expected random queue rank, not physical motion. */
class OpenLaneModel {
  constructor(batch=100) {
    this.batch=batch; this.round=0; this.cursor=0; this.lastMoves=0;
    this.lanes=Array.from({length:100},(_,i)=>(i+1)%5===0?1:0);
    this.switches=Array(100).fill(0);this.history=[20];
    this.order=Array.from({length:100},(_,i)=>i);let seed=1729;
    for(let i=99;i>0;i--){seed=(Math.imul(1664525,seed)+1013904223)>>>0;const j=seed%(i+1);[this.order[i],this.order[j]]=[this.order[j],this.order[i]];}
  }
  countFast(){return this.lanes.reduce((a,b)=>a+b,0)}
  evaluate(id,fast=this.countFast()){
    const lane=this.lanes[id],own=lane?fast:100-fast,other=100-own;
    return {stay:(own+1)*(lane?2:5)/2,move:(other+2)*(lane?5:2)/2};
  }
  isStable(){const fast=this.countFast();return this.lanes.every((_,id)=>{const d=this.evaluate(id,fast);return d.move>=d.stay})}
  step(){
    const fast=this.countFast(),moving=[];
    for(let i=0;i<this.batch;i++){const id=this.order[(this.cursor+i)%100],d=this.evaluate(id,fast);if(d.move<d.stay)moving.push(id)}
    for(const id of moving){this.lanes[id]=1-this.lanes[id];this.switches[id]++}
    this.cursor=(this.cursor+this.batch)%100;this.round++;this.lastMoves=moving.length;this.history.push(this.countFast());return moving;
  }
}
if(typeof module!=='undefined')module.exports=OpenLaneModel;
