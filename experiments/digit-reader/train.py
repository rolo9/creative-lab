"""Real handwritten digits; same stratified split for both classifiers."""
import json
from pathlib import Path
import numpy as np
import sklearn
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import confusion_matrix
ROOT=Path(__file__).parent
d=load_digits(); idx=np.arange(len(d.target)); train,test=train_test_split(idx,test_size=.25,stratify=d.target,random_state=4317)
X=d.data/16;y=d.target
lr=LogisticRegression(C=1,max_iter=1000).fit(X[train],y[train]);knn=KNeighborsClassifier(n_neighbors=3).fit(X[train],y[train])
report={'dataset':'sklearn load_digits / UCI Optical Recognition of Handwritten Digits','source':'https://archive.ics.uci.edu/dataset/80/optical+recognition+of+handwritten+digits','samples':len(y),'train':len(train),'test':len(test),'seed':4317,'input':'8x8 gray values /16','split':'stratified image-level random split; writer independence not established','sklearn_version':sklearn.__version__,'models':{}}
for name,m in [('knn',knn),('linear',lr)]:
 p=m.predict(X[test]);report['models'][name]={'accuracy':float(np.mean(p==y[test])),'correct':int(np.sum(p==y[test])),'confusion':confusion_matrix(y[test],p).tolist()}
 report['models'][name]['parameters']='k=3 uniform Euclidean, no tuning' if name=='knn' else 'multinomial logistic regression C=1 max_iter=1000, no tuning'
fixtures={'inputs':X[test[:12]].tolist(),'linear_probabilities':lr.predict_proba(X[test[:12]]).tolist(),'linear_labels':lr.predict(X[test[:12]]).tolist(),'knn_labels':knn.predict(X[test[:12]]).tolist()}
bundle={'meta':report,'train':{'images':d.data[train].astype(int).tolist(),'labels':y[train].tolist(),'ids':train.tolist()},'test':{'images':d.data[test].astype(int).tolist(),'labels':y[test].tolist(),'ids':test.tolist()},'linear':{'weights':lr.coef_.tolist(),'biases':lr.intercept_.tolist()}}
(ROOT/'data.json').write_text(json.dumps(bundle,separators=(',',':'))+'\n');(ROOT/'report.json').write_text(json.dumps(report,indent=2)+'\n');(ROOT/'fixtures.json').write_text(json.dumps(fixtures,separators=(',',':'))+'\n');(ROOT/'dataset-description.txt').write_text(d.DESCR)
print(json.dumps({k:{'accuracy':v['accuracy'],'correct':v['correct']}for k,v in report['models'].items()},indent=2))
