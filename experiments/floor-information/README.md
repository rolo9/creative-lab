# 床のデータを増やせば、解決？

Continuing the same ball/floor subject, isolate impact prediction so recurrent trajectory error does not obscure the missing-input problem. Predict upward speed immediately after impact from downward speed. Synthetic law u=e*v. No actual material measurements, deformation, contact duration, spin, noise or drag. This is a different subtask and freshly trained models, not reuse of the trajectory predictors.

Three controlled conditions with identical architecture MLP (16,16), tanh, squared error, seed4317 and exactly3,000 fitting examples +600 validation examples each:
1. Only floor e=.75, speed input only.
2. Four floors e=.30,.45,.60,.75, speed only.
3. Exactly the same examples as2, speed and known e input.

900 random base speeds uniform2–9 are repeated four times. First750 speed groups fit;150 other groups validate. In1 labels all use e=.75. In2/3 each speed group has all four e. No group is split. Independent seed9321 creates500 test speeds crossed with four floors (2,000 examples). Inside held-out floor .525 and outside .90 are evaluated separately. Validation is recorded, not used to select or stop training. Optimizer may stop based on fitting loss; max_iter400 is an upper limit, not a promised fixed iteration count. No test-based tuning. Conditions2/3 differ in input dimension by design. Dataset count, architecture hidden widths, optimization settings and groups are otherwise matched.

Same independent four-floor test MAE in m/s: single1.2724, mixed.8465, informed.01034. The mixed model's low error on e=.525 is expected to be possible near the average condition; do not present all unseen-floor performance as failure. Model3's observed success at e=.90 is not an extrapolation guarantee. No model hierarchy is asserted generally.

Why MLP: preserve family and numerical regression flexibility to isolate data/input changes. Not a claim it is best: known law plus known e is sufficient and displayed as white ground truth. Need for ML, unknown coefficient identification and comparisons with interpretable baselines/models follow after this information experiment; no control/catching device is part of this release.

Reproduce with requirements.txt environment:
`OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 python experiments/floor-information/train.py`
`node tests/floor-information.test.cjs`

Training weights, independent fixtures and full evaluation saved. Tests verify Python/JS match, input blindness for1/2, response for3, equal fit counts and finite supported values. UI substitute DOM testing is separate from actual browser verification. Managed browser QA unavailable; actual browser visual/interaction QA unverified.
