"""Controlled synthetic impact experiment. No rollout data or external dataset."""
import json,warnings
from pathlib import Path
import numpy as np
from sklearn.neural_network import MLPRegressor
from sklearn.exceptions import ConvergenceWarning
ROOT=Path(__file__).parent
rng=np.random.default_rng(4317)
# Paired speeds make missing information explicit, without changing sample count.
v=np.repeat(rng.uniform(2,9,900),4); e=np.tile([.3,.45,.6,.75],900)
# Split by base speed: adjacent paired observations stay together.
fit=np.arange(3000); val=np.arange(3000,3600)
test_rng=np.random.default_rng(9321); tv=np.repeat(test_rng.uniform(2,9,500),4); te=np.tile([.3,.45,.6,.75],500)
models={};report={};fixtures={}
for name in ['single','mixed','informed']:
    targets=.75*v if name=='single' else e*v
    X=np.column_stack([v/10,e]) if name=='informed' else (v/10).reshape(-1,1)
    # Explicit held-out validation and fixed iterations: validation is reported, not fitted.
    m=MLPRegressor(hidden_layer_sizes=(16,16),activation='tanh',random_state=4317,max_iter=400,batch_size=128,learning_rate_init=.003,tol=1e-7,n_iter_no_change=30,early_stopping=False)
    with warnings.catch_warnings(record=True) as caught:
        warnings.simplefilter('always',ConvergenceWarning);m.fit(X[fit],targets[fit]/10)
    def pred(vv,ee):
        xx=np.column_stack([vv/10,ee]) if name=='informed' else (vv/10).reshape(-1,1)
        return m.predict(xx)*10
    report[name]={'iterations':m.n_iter_,'fit_samples':len(fit),'validation_samples':len(val),'validation_mae_mps':float(np.mean(abs(m.predict(X[val])*10-targets[val]))),'warnings':[str(w.message) for w in caught]}
    for label,ev in [('known',te),('unseen_inside',np.full_like(tv,.525)),('unseen_outside',np.full_like(tv,.9))]:
        report[name][label+'_mae_mps']=float(np.mean(abs(pred(tv,ev)-tv*ev)))
    models[name]={'weights':[w.tolist() for w in m.coefs_],'biases':[b.tolist() for b in m.intercepts_]}
    xx=np.column_stack([tv[:8]/10,te[:8]]) if name=='informed' else (tv[:8]/10).reshape(-1,1)
    fixtures[name]={'inputs':xx.tolist(),'outputs':m.predict(xx).tolist()}
meta={'seed':4317,'test_seed':9321,'training_floors':[.3,.45,.6,.75],'impact_speed_range_mps':[2,9],'target':'upward speed immediately after impact','law':'upward speed = restitution * downward speed','model':'MLP tanh (16,16), squared loss','split':'base speed groups; first 750 fit, remaining 150 validation; independent test seed','fit_samples_each':3000,'validation_samples_each':600,'test_samples_each':2000,'no_noise':True,'report':report}
(ROOT/'models.json').write_text(json.dumps({'meta':meta,'models':models},separators=(',',':'))+'\n')
(ROOT/'fixtures.json').write_text(json.dumps(fixtures,separators=(',',':'))+'\n')
(ROOT/'report.json').write_text(json.dumps(meta,indent=2)+'\n')
print(json.dumps(report,indent=2))
