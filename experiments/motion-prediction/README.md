# Motion prediction — Experience 01

Human uses the artifact; AI owns implementation and verification. This is an artifact-first introduction to states, prediction and models, not a coding assignment.

## Open
Serve this directory over HTTP and open index.html. Published owner-private trial: https://creative-lab-hundred-answers.brawnytuna64.chatgpt.site/motion-prediction/index.html

Use Play, then switch the predictor without changing the time. Three initial-condition presets are included. The white trajectory is the simulator; the colored dashed trajectory is the selected prediction. All models receive the same initial state and predict 1.5s at 50ms steps.

## What is learned
The small tanh MLP learns the vertical transition `(height/6, vertical_velocity/12) -> (next_height/6, next_vertical_velocity/12)`. Horizontal motion is constant and shared by all models. Ground truth uses gravity 9.8, center-height floor .15 and restitution .75. A penetrated position is reflected at each fixed step, an approximate impact rule. Physical predictor calls that same step function, so its error is exactly zero by design. No camera, state estimation or physical robot is involved.

Training generates 24,000 state pairs (seed 4317), of which 15% are internal validation. Heights are .15–5.5m and velocities -10–8m/s; one-third of heights are sampled near the floor. Independent test generation uses seed 9321 with 6,000 pairs. This is a synthetic-state holdout, not a real-world/generalization benchmark. No test-based hyperparameter search was performed. Training reached the 160-iteration cap and emitted a non-convergence warning, retained in training-report.json. One-step height MAE is about .0221m and velocity MAE .1601m/s; these do not measure multi-step rollout accuracy. See rollout-report.json for the three displayed cases.

## Reproduce
Python with requirements.txt installed:

```
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 python experiments/motion-prediction/train.py
node tests/motion-prediction.test.cjs
```

The command is from repository root. Weights, biases, inference fixtures, dependency versions, seed and metrics are committed. Different numerical-library/platform environments can yield small training differences. Inference fixtures certify the exact shipped weights against sklearn outputs.

## Verification actually performed
Model tests: JS/sklearn equivalence, gravity and bounce, common initial conditions, aligned times, finite rollouts, physical-model identity and independent seed. UI script executed with a DOM substitute plus Canvas: load, hidden/revealed scores, model switch at fixed time, presets, playback completion, restart. JavaScript syntax and diff checks passed. Offline Canvas renders at desktop and mobile dimensions were visually inspected for paths and marker placement; they are not browser screenshots and do not verify browser fonts or CSS. No supported browser-control skill was available in this managed environment: live-browser/mobile QA remains unverified.

Public main/index.html is not replaced. This experience belongs to the separate experimental branch until release is deliberately decided.
