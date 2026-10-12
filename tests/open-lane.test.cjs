const assert=require('node:assert/strict');const M=require('../experiments/open-lane-model.js');
const simultaneous=new M(100);assert.equal(simultaneous.countFast(),20);simultaneous.step();assert.equal(simultaneous.countFast(),100);simultaneous.step();assert.equal(simultaneous.countFast(),0);simultaneous.step();assert.equal(simultaneous.countFast(),100);
const potential=m=>{const f=m.countFast(),s=100-f;return f*(f+3)/2+s*(s+3)*5/4};
const sequential=new M(1);for(let i=0;i<300&&!sequential.isStable();i++){const old=potential(sequential),moved=sequential.step();assert.ok(moved.length<=1);assert.ok(moved.length===0?potential(sequential)===old:potential(sequential)<old);assert.equal(sequential.lanes.length,100);assert.ok(sequential.lanes.every(x=>x===0||x===1))}
assert.equal(sequential.countFast(),72);assert.ok(sequential.isStable());for(let i=0;i<100;i++)assert.equal(sequential.step().length,0);
const intervention=new M(100);intervention.step();intervention.step();intervention.batch=1;for(let i=0;i<300&&!intervention.isStable();i++)intervention.step();assert.ok(intervention.isStable());
const first=new M(20),second=new M(20);for(let i=0;i<200;i++){first.step();second.step()}assert.deepEqual(first.lanes,second.lanes);assert.deepEqual(first.history,second.history);
console.log('PASS: conservation, simultaneous oscillation, sequential improvement and equilibrium, timing intervention, deterministic replay');
