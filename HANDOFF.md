# Creative Lab — Runtime Handoff (2026-10-12)

## Current — 2026-10-18：脚本から再設計・実装保留
Humanは第1話を体験し、方向性は良いが機械を数回クリックする作業で何をしているか不明と評価。観測頻度・発熱を中心にした修正案も、未知の惑星調査が機械の利用方法へ戻ると指摘。成功体験とは扱わない。
現在の依頼は、既存の優れた作品の構成を調査し、候補生から艦長までに必要な経験を章へ編み、第1章を選ぶこと。今回は実装不要。研究と提案は notes/2026-10-18-cadet-story-design.md を参照。Pixar、Outer Wilds開発者、TNG Darmokの公式サイト解説を根拠として、事件・人物関係・責任の成長を三層で設計。独自提案と出典の事実を区別。
暫定8章の道筋と第1章「返事をする海」を提案済み。これは最終脚本のHuman承認や制作指示ではない。未知の発光現象を共同調査し、応答・生命・知的意図を区別する筋。加熱管理は第1章の主役から外す。物語の真相、証拠、調査行為、発見、人物の変化を先に整合させる。章順は柔軟、進級は年単位の経歴を伴う。ボーグは序盤の難しさの例で、制作依頼ではない。既存サイトとPRは保持、本日はコード・配信の変更なし。


## Current — 2026-10-17夜：士官候補生RPG 第1話を制作・配信
HumanはシミュレーションRPGを希望し、船内・アバターはドット絵、図解・計器は理解しやすい表現という方針を了承。利用枠への配慮から一気に大規模制作せず、一話ずつ区切る。第1話の設計後、制作を了承した。

第1話「最初の当直」：一室を歩く→先輩と会話→探査機を10分間運用→引き継ぎ。タップ/矢印移動、行き先ボタン、科学班の通信、温度・電池・保存/送信の状態変化、当直後の振り返り、ブラウザ内の保存/再開/やり直し。時間は運転ボタンでのみ進む。単なる正解選択や講義の羅列にせず、船内の人物・仕事・結果をつなぐ初版。長期関係・昇進・次任務は未実装。Humanの体験・楽しさ・学習効果は未確認。

- 体験URL: https://creative-lab-hundred-answers.brawnytuna64.chatgpt.site/cadet-watch/index.html （サイト入口も更新）
- Draft PR #11: https://github.com/rolo9/creative-lab/pull/11 / experiment/cadet-watch / head 98715597e51deb7df0231ab4c5b1909ed2f64a66
- Sites source: 3cdfc9238b79d40dfa5f2c7bc36df536ca569f3a。owner-private 配信成功。GitHub公開main/index.htmlは不変。
- 検証：四つの運用方針、熱・電力・容量・保護動作、実Canvas＋代替DOMで移動/着任/通信/相談/設定/終了/引継ぎ/保存/初期化を確認。ドット絵の描画を目視確認。実ブラウザのレイアウト/タッチ確認は未実施（対応プレビュー基盤がbwrapのprocマウント権限エラーで起動不能）。
- 部屋・人物・惑星・任務・機器仕様は創作。簡略熱収支モデルであり公式設定や実機性能ではない。モデルの式・省略・検証は同ブランチREADMEとverification.jsonに保存。MLやランタイムLLM呼出しは使わない。
- 以前のML/DL順序・スター・トラッカー拡張は引き続き保留。別学習活動へ無理に接続しない。次は今回の体験を踏まえて調整し、巨大なRPGや全職務を自動追加しない。


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
- `notes/2026-10-12-rationality-and-emergence.md`: discussion path from particle phenomena to supply chains, echo chambers, emergent behavior, escalator capacity, and whose rationality is optimized.

## Continuation
The most valuable direction is open-ended Human–AI discovery, not mechanically improving particle animation. Follow the insight as it arises, debate interpretations and counterexamples, and avoid converting inspiration into a predetermined demonstration or making Human an involuntary tester. The latest Human direction is artifact-first exploration of unfamiliar technologies, including ML/DL: build and use a concrete artifact, then connect its behavior to the underlying academic concepts. Do not limit Creative Lab to artistic works or the Human's existing professional domain. Read `EXPERIENCE_ROADMAP.md` first, then `notes/2026-10-15-artifact-first-ml-direction.md`. Human clarified that AI creates the artifacts and Human experiences them; do not turn this into implementation homework or ask Human to invent the next topic. The main sequence begins with a small motion-prediction artifact and moves through perception, action and embodiment-independent representation. Experience 01 is implemented on `experiment/motion-prediction`, Draft PR #6 (https://github.com/rolo9/creative-lab/pull/6), and deployed privately at https://creative-lab-hundred-answers.brawnytuna64.chatgpt.site/motion-prediction/index.html . Human experience and feedback are pending; do not infer understanding from delivery. Source, training records and verification boundaries are in `experiments/motion-prediction/README.md` and `notes/2026-10-15-motion-experience-01.md` on that branch. Public main/index.html remains unchanged. The camera color-picker is a retained, unstarted candidate. Preserve intellectual honesty, playful exploration, and clear distinction between aggregate throughput, collective welfare, and individual interests.

## Fresh runtime procedure
Fresh retrieve README, WORKFLOW, latest notes, live main, and open PRs from this repository. Do not trust conversation summary as Current. Discuss before implementing, and keep experiments on separate branches until explicitly accepted. Chat numbers identify sessions, not durable authority.

## Queue experiments — closed 2026-10-13 JST
Human requested ending the '100人の正解' / '空いている方へ' workstream. PR #4 is closed without merge; code, tests and creation notes remain on `experiment/hundred-right-answers`. Do not resume this experiment's improvements without a new Human request. Read `notes/2026-10-13-queue-experiments-closed.md` for the feedback and closure path. No prototype was adopted into public main/index.html. Other PRs are outside this closure.

## Current experience contract — 2026-10-15 JST
The purpose is to experience possible future artifacts and recognize the academic fields behind them: to discover the breadth of technology. AI owns the systematic sequence, artifact production and verification; Human operates and experiences artifacts. Read the explicit role boundaries, first experience and six-stage map in `EXPERIENCE_ROADMAP.md`. Treat the recovered Physical AI concern as a working hypothesis, not a universal claim about current VLA research. Keep other independent learning activities unchanged.

## Current correction — 2026-10-16
Read the Current redesign section of EXPERIENCE_ROADMAP.md before acting. Human has tried experiences 01/02 and found comparisons did not expand into meaningful design decisions. Older pending-feedback markers are historical. The catching device proposal is withdrawn; do not build it or advance the six-stage map automatically. Keep the ball/floor artifact and develop more data versus missing input, known parameters versus inferred history, model choice and pros/cons, and honest evaluation. AI explains and builds; Human operates, with no mandatory quiz or topic generation. Current task is project redesign, not new feature implementation.

## Current closure — 2026-10-16 midday JST
Human closed the initial ball/floor learning series as unsuccessful with little learning gained. Preserve artifacts as history; do not continue prior floor-coefficient/model-comparison plans automatically. Read the latest Current closure in EXPERIENCE_ROADMAP.md. AI should select the next useful learning artifact with a clear purpose and one takeaway, without another lengthy optimal-topic selection process. Next topic remains undecided; do not treat earlier image-recognition suggestions as Human-selected. Do not attribute failure to Human comprehension.

## Current artifact — 2026-10-16 afternoon JST
AI selected and delivered the next starting artifact: handwritten digit reader, Draft PR #9 on experiment/digit-reader, https://creative-lab-hundred-answers.brawnytuna64.chatgpt.site/digit-reader/index.html . Read the latest roadmap section for purpose and limits. Human experience pending. First ball/floor series remains closed as unsuccessful. Do not infer learning success from technical deployment. Compare kNN3 and logistic regression on identical real handwritten inputs, inspect neighbors/errors, optional freehand input. Next decisions concern data/input representation/models after observations, not unrelated functionality. Actual browser QA unverified; computation and real Canvas/substitute DOM checks passed.

## Current artifact — 2026-10-16 evening JST
Human expressed interest in space and authorized trying a star-based attitude device. Current is Draft PR #10 experiment/star-tracker, https://creative-lab-hundred-answers.brawnytuna64.chatgpt.site/star-tracker/index.html . Read latest roadmap section. Synthetic star pixels plus a fixed synthetic catalog genuinely drive identification and geometric attitude recovery, without true orientation/seed/observed IDs passed to the solver. No ML this version; purpose connects image processing, geometry and estimation. Human experience pending. Do not assume the digit-recognition task was new: Human already did it in a course and needs links from methods to uses/decisions. Preserve failed ball-series closure and all previous artifacts. Current app computational/Canvas-substitute checks pass; actual browser QA unverified.
