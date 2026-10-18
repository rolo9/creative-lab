(function(root){
const initial=()=>({version:1,t:0,temp:28,energy:30,buffer:[],received:0,special:0,lost:0,protected:0,briefed:false,notified:false,requestSeen:false,finished:false,mode:'low',tx:true,x:12,y:11,log:[],history:[]});
const modes={rest:{name:'休止',power:0,n:0},low:{name:'通常観測',power:30,n:2},high:{name:'集中観測',power:120,n:7}};
function step(s){
 if(s.t>=10||s.finished||!s.briefed)return s;
 const n=JSON.parse(JSON.stringify(s)),m=modes[s.mode]||modes.low;
 const protect=s.temp>=58,active=protect?modes.rest:m;
 const power=20+active.power+(s.tx?75:0),cool=60+2*Math.max(0,s.temp-20);
 const used=power/60,can=s.energy>=used;
 n.temp=Math.max(20,s.temp+((can?power:0)-cool)*60/1000); n.energy=Math.max(0,s.energy-(can?used:0));
 if(protect)n.protected++;
 const phenomenon=s.t>=2&&s.t<6;
 for(let i=0;i<(can?active.n:0);i++){if(n.buffer.length<32)n.buffer.push(phenomenon?1:0);else n.lost++;}
 const sent=can&&s.tx?n.buffer.splice(0,6):[];n.received+=sent.length;n.special+=sent.reduce((a,b)=>a+b,0);
 n.t++; n.history.push({t:n.t,temp:n.temp,energy:n.energy,buffer:n.buffer.length,received:n.received,mode:s.mode,tx:s.tx});
 let note=protect?'高温保護が作動。センサーはこの1分休止。':!can?'電力不足。機器の運転を停止。':`${active.name}。${sent.length}件を送信。`;
 if(n.lost>s.lost)note+=' 保存容量を超えた観測は記録できなかった。';
 n.log.push({t:n.t,text:note});return n;
}
const api={initial,modes,step};if(typeof module!=='undefined')module.exports=api;else root.WatchEngine=api;
})(typeof window!=='undefined'?window:globalThis);
