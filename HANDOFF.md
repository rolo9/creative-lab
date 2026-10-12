# Creative Lab — Runtime Handoff (2026-10-12)

## Identity and boundaries
- Successor chat: **Creative Lab 01** (subsequent chat numbers may change).
- Repository: **rolo9/creative-lab** (public). Live site: https://rolo9.github.io/creative-lab/
- This work arose in a chat initially intended as an AI Native OS Governance successor, following Human–Life reflection on how AI Native OS should relate to Human. **Creative Lab is not Life and is not Governance.** Life remains separate. The successor takes only the creative workstream.
- Private AI Native OS / human-state information must not be written to this public repository. This note records only a minimal boundary, not private architecture or incident details.

## Current artifacts
- `main/index.html`: public particle work, provisional v0.7; do not alter without deliberate release decision.
- `WORKFLOW.md`: lightweight Observe → Discuss → Prototype → Verify → Release, with no automatic implementation.
- Draft PR #2, branch `experiment/orbital-motion`, `experiments/orbit.html`: orbital dynamics; not merged.
- Draft PR #3, branch `experiment/same-observation-different-rules`, `experiments/same-observation.html`: fixed-center versus moving-centroid attraction; not merged. The original intervention moved 15 particles and looked indistinguishable to Human. Revised intervention moves all 100 particles; Human saw the difference but found it unsurprising. Do not treat technical success as artistic success.
- Draft PR #4, branch `experiment/hundred-right-answers`, `experiments/hundred-right-answers.html`: two queue policies, all 100 selectable people, deadline slider and playback; implementation and arithmetic checks completed, actual browser QA and artistic surprise unverified. See `notes/2026-10-12-hundred-right-answers-prototype.md`.
- Same Draft PR #4 also contains `experiments/open-lane.html` / `open-lane-model.js`: everyone may choose either lane. Timing controls reveal simultaneous oscillation versus sequential equilibrium; intervention works mid-run. Human explicitly requested this follow-up. Model tests and DOM-substitute checks passed; actual browser QA and artistic surprise remain unverified. See `notes/2026-10-12-open-lane-experiment.md` and `tests/open-lane.test.cjs`.
- `notes/2026-10-12-rationality-and-emergence.md`: discussion path from particle phenomena to supply chains, echo chambers, emergent behavior, escalator capacity, and whose rationality is optimized.

## Continuation
The most valuable direction is open-ended Human–AI discovery, not mechanically improving particle animation. Follow the insight as it arises, debate interpretations and counterexamples, and avoid converting inspiration into a predetermined demonstration or making Human an involuntary tester. Human subsequently authorized creating the '100人の正解' prototype and iterating through making, experiencing and discovering, even when experiments fail. That prototype is now in Draft PR #4. This authorization does not approve merging into public main. Preserve intellectual honesty, playful exploration, and clear distinction between aggregate throughput, collective welfare, and individual interests.

## Fresh runtime procedure
Fresh retrieve README, WORKFLOW, latest notes, live main, and open PRs from this repository. Do not trust conversation summary as Current. Discuss before implementing, and keep experiments on separate branches until explicitly accepted. Chat numbers identify sessions, not durable authority.
