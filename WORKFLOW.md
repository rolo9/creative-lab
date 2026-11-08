# Creative Lab — lightweight creation workflow

Creative Lab is a public space for Human–AI experiments, not a physics simulator or a copy of AI Native OS governance.

## Publication rule

- `main/index.html` is the **public experience**. Do not change it just because an observation or suggestion was made.
- An observation is **evidence to discuss**, not automatic authorization to implement.
- For meaningful behavioral changes, discuss alternative explanations, the model's assumptions, and trade-offs before implementation.
- Prototype on a separate branch, preferably with a Pull Request showing the proposed change and test notes.
- Publish only after a conscious release decision. Group related fixes rather than increasing version numbers per conversation turn.
- Record what was actually tested; distinguish static source checks from live browser verification.
- Human can suggest, critique, reject, or approve; AI should propose independent hypotheses, objections, and alternatives. Neither side's first proposal is automatically correct.

## Version convention

- Public version: `vMAJOR.MINOR` only for coherent, reviewed changes.
- Iterative commits/PRs do **not** increment public version.
- Current `v0.7` is a **provisional baseline**, not evidence of physical correctness or verified quality.
- Future version names are decided when a candidate is accepted, not before.

## Observation → experiment → release

1. **Observe:** Record what was seen, the conditions, and what remains uncertain.
2. **Discuss:** Distinguish factual behavior, physical analogy, and artistic rules; consider at least one alternative.
3. **Prototype:** Use a branch/PR and describe expected behavior and test method.
4. **Verify:** Check code and actual browser behavior where possible; keep limitations explicit.
5. **Release:** Deliberately merge, update version and a short release note; compare against baseline.

## Open questions

- What are the particles: material dust, abstract agents, or several interacting species?
- Is the circle a planet, force field, absorber, or visual metaphor?
- Should contact mean capture, scattering, reflection, or transmission?
- Is the aim physical realism, legible interaction, or unexpected emergent behavior?

Avoid publishing private conversations, credentials, ANO internal materials, company information, or personal information.

## Application projects — roadmap-led delivery

Human direction, 2026-11-07: preserve both the application's structure and the way Human and AI take an idea into sustained use. [Direction and interim rationale](https://github.com/rolo9/ai-native-os/issues/147#issuecomment-6700280789).

For a new application in this Lab:
1. Identify the intended user, the problem, a real usage cycle and what would make the result useful enough to keep using.
2. Outline the whole system before selecting isolated screens or infrastructure: connect domain rules and content to application behavior, data, storage/access, updates and everyday operation. Resolve details when their stage needs them; do not require every detail to be fixed up front.
3. Create the project's roadmap before implementation, with meaningful stages, dependencies, completion evidence, unknowns and the next action. Adapt the stages to the project rather than copying the meal-planner checklist unchanged. **Every new or revised roadmap must also specify planned chat/runtime handover points and the continuation information to preserve at each point**, following the [Protocol runtime-continuity section](https://github.com/rolo9/ai-native-os/blob/main/00_System/AI-Collaboration-and-Context-Protocol.md#runtime-continuity-and-fresh-recovery).
4. Work against that roadmap. Check how a local change affects the goal and the domain/application/operation connection. Revise the plan when assumptions or scope change; do not keep polishing a detail while the end-to-end use remains broken. Ordinary progress does not require a Human approval at each step.
5. Test an actual usage cycle, including input/correction burden, persistence/recovery and maintenance. A convincing screen, a successful calculation or following the plan is not sufficient evidence of continued usefulness.
6. Keep the roadmap, current artifact references, decisions and verification results recoverable for a successor. Record what helped, what failed, why the plan changed and what remains unverified.

The roadmap is an orientation and revision tool, not a fixed procedure whose compliance proves success. Existing publication, privacy and project-specific execution holds still apply.

For the current meal-planner, finish the primary user's useful household app first. Its [post-launch review](projects/meal-planner/ROADMAP.md) owns evaluation of this approach and the later copy/customization/reuse direction. Do not start a generic framework or add all storage providers now. Extract a provisional reusable application structure and delivery method from actual results; their transfer to a different app remains unverified until tried.

### Chat handover in the roadmap — required, 2026-11-09

A single project may need several chats before completion. Plan handovers at recoverable stage boundaries, such as a saved and verified release before starting a separate connection or operation change. For each point, state the work boundary, what must be saved and where, and the next work to recover. Preserve the artifact/version, verified results, decisions/constraints, unfinished work, attempted operations and outcomes, uncertain side effects, and private artifact recovery references in the existing authoritative records. Keep private content and credentials out of this public repository.

At those points, the AI checks the saved state by reading it back and assesses whether to move to a fresh chat; if a new chat must be opened by Human, provide a short trigger without requiring Human to reconstruct the history. Move earlier if continuity deteriorates, revise planned points as work changes, and do not delay a needed handover merely to finish the project in one push. Do not rely on getting a final summary from a chat after it reaches its limit, or impose a fixed message-count deadline. Verify the method through actual successor recovery and Human correction/handover burden; a written plan alone is not success.
