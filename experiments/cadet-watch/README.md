# Cadet's Log — 最初の当直

A small unofficial Star Trek TNG-inspired cadet RPG episode. Original room, crew, planet, mission and probe specifications; not a canonical Academy curriculum. User-approved scope: one room, movement, mentor conversation, probe operation, handoff. Pixel-art avatars and room; readable non-pixel instrument schematic. Future missions, promotion and persistent long-term crew relationships are not implemented.

## Play

Walk by tapping the room or using arrow keys. Destination buttons auto-walk and interact. Speak to Ren, accept the watch, then use the console. Only the one-minute operation advances mission time. At two minutes, a science request arrives. Run ten minutes, return to Ren and hand over. Help, local save/continue, reset confirmation and replay are included. No AI/chat API, runtime credit use or backend required by the game. Browser-local storage is the only save; blocking storage falls back to in-memory play.

## Simulation and limits

Pure engine receives persistent state and makes a fresh next state. Thermal mass 1,000 J/K; base power 20 W; observation rest/low/high 0/30/120 W produces 0/2/7 records per minute; transmitter 75 W sends up to six FIFO records/minute. Battery begins at 30 Wh, temperature at 28 C. Heat loss approximated by 60+2*(T-20) W, with temperature clipped to a 20 C lower bound. Explicit 60-second Euler step. >=58 C at the beginning of a step inhibits observation for that step, not transmission. Insufficient energy for the complete step inhibits all operation and does not draw the unaffordable energy. No recharge. 32-record capacity; observation generated before transmission, overflow is counted as missed records. Time window [2,6) tags phenomenon records. Record count is not a scientific discovery score.

Physical teaching model, not a validated spacecraft model. Omits T^4 radiation, solar/planetary heating, multiple thermal nodes, radio propagation delay/noise and real atmospheric measurements. All consumed electrical power is approximated as body heating. The fictional story and a simplified physical model are separated explicitly in the interface. No ML inserted to meet an unrelated learning roadmap.

## Verification

`verification.json` records pure engine and real-Canvas/substitute-DOM integration checks. Four strategies tested: normal, continuous high, concentrated observation with delayed transmission, and no transmission. Tests include incomplete-energy step, heat protection, buffer overflow, conservation of buffer bounds, terminal lock at ten minutes, walking, briefing, science call, consultation, settings, handoff, local save and reset. Real Canvas room render was visually inspected.

Run from repository root after installing `@napi-rs/canvas`:

```
node tests/cadet-watch.cjs
```

The test accepts CADET_ROOT, CANVAS_MODULE and optional ROOM_PNG environment paths. No browser is launched by this test.

**Actual browser layout/touch/dialog QA unverified.** The supported Sites preview supervisor failed before app startup (`bwrap: Can't mount proc on /newroot/proc: Operation not permitted`). No substitute server/browser was used. This is an infrastructure limitation, not a passing visual/interaction test.

## Continuation

The prior ML roadmap and standalone star-tracker expansion remain paused. This is a playable first episode, not evidence that the user enjoyed it or learned the fields. Evaluate the actual experience before increasing scope. Keep public main/index.html unchanged; prototype belongs on experiment/cadet-watch and private Sites. Resource-conscious work in bounded episodes; no unrequested multi-agent work or heavy asset generation.
