"""Train and export a small, real neural predictor of vertical motion. No downloaded data."""
import json, warnings
from pathlib import Path
import numpy as np
import sklearn
from sklearn.neural_network import MLPRegressor
from sklearn.exceptions import ConvergenceWarning
ROOT=Path(__file__).parent
DT=.05; G=9.8; FLOOR=.15; REST=.3

def step(y,v):
    yn=y+v*DT-.5*G*DT*DT;vn=v-G*DT
    hit=yn<FLOOR
    return np.where(hit,2*FLOOR-yn,yn),np.where(hit,-vn*REST,vn)

def examples(seed,n):
    rng=np.random.default_rng(seed)
    y=rng.uniform(FLOOR,5.5,n);v=rng.uniform(-10,8,n)
    y[:n//3]=rng.uniform(FLOOR,.8,n//3)
    yn,vn=step(y,v)
    return np.column_stack([y/6,v/12]),np.column_stack([yn/6,vn/12])
X,Y=examples(4317,24000)
model=MLPRegressor(hidden_layer_sizes=(48,48),activation='tanh',random_state=4317,max_iter=160,early_stopping=True,validation_fraction=.15,n_iter_no_change=14,batch_size=256,learning_rate_init=.003,tol=1e-6)
with warnings.catch_warnings(record=True) as caught:
    warnings.simplefilter('always',ConvergenceWarning);model.fit(X,Y)
Xt,Yt=examples(9321,6000);pred=model.predict(Xt)
meta={'seed':4317,'dt':DT,'gravity':G,'floor':FLOOR,'restitution':REST,'training_candidates':len(X),'internal_validation_fraction':.15,'test_samples':len(Xt),'test_seed':9321,'input':['height / 6','vertical velocity / 12'],'output':['next height / 6','next vertical velocity / 12'],'hidden_layers':[48,48],'activation':'tanh','iterations':model.n_iter_,'sklearn_version':sklearn.__version__,'numpy_version':np.__version__,'test_height_mae_m':float(np.abs(pred[:,0]-Yt[:,0]).mean()*6),'test_velocity_mae_mps':float(np.abs(pred[:,1]-Yt[:,1]).mean()*12),'convergence_warnings':[str(w.message) for w in caught]}
bundle={'meta':meta,'weights':[a.tolist() for a in model.coefs_],'biases':[a.tolist() for a in model.intercepts_]}
(ROOT/'learned-model.json').write_text(json.dumps(bundle,separators=(',',':'))+'\n')
# Holdout states certify browser inference against sklearn; never used in training.
(ROOT/'inference-fixtures.json').write_text(json.dumps({'inputs':Xt[:12].tolist(),'outputs':pred[:12].tolist()},separators=(',',':'))+'\n')
(ROOT/'training-report.json').write_text(json.dumps(meta,indent=2)+'\n')
print(json.dumps(meta,indent=2))
