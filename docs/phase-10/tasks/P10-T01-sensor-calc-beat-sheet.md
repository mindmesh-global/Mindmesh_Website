# P10-T01: Lock Sensor Calc / Definition Beat Sheet + Fixtures

**Task ID:** P10-T01  
**Status:** done  
**Type:** Strategy / documentation (code in P10-T02–T04)  
**Completed:** 2026-07-10  
**Parent:** [phase-10-tasks.md](../phase-10-tasks.md) | [phase-10-theater-upgrades.md](../phase-10-theater-upgrades.md)  
**Depends on:** [P8-T05](../../phase-8/tasks/P8-T05-sensor-beat-sheet.md), [P8-T09](../../phase-8/tasks/P8-T09-sensor-theater-demo.md)  
**Blocks:** P10-T02, P10-T03  
**Blocker:** Yes

---

## Goal

Freeze scrub beats for a **quick calculation → result card** story (beyond “Open Cal”). Lock fixtures, reduced-motion final, and helper contracts. Definition stays as **non-scrubbed alternate chrome** only in this pass.

No page UI in this task. Story mode (second section vs replace Open Cal) is **P10-T02**.

---

## Quick reference

| Field | Value |
|-------|-------|
| Story | Open Sensor → type calc → resolve → **result card** → hold |
| Primary query | `15% of 240` (11 chars including spaces) |
| Result | Answer card: **36** · subtitle `15% of 240` |
| Reduced-motion jump | **0.90** (start of hold) |
| Caption | Sensor answers a quick calculation without opening another app. |
| Wrapper (if new section) | Same as Sensor: `min-h-[220vh]` desktop · `min-h-[120vh]` mobile |
| Motion | `transform` + `opacity` only |
| Persona | Acme / Alex (align with marketing demos) |

**Why calc over definition as the scrubbed story:** A numeric answer card reads clearly in a sticky frame and proves “instant action” without looking like another Open Cal. Definition is still product-true; keep it as a static alternate chip outside the scrubbed query.

---

## Locked progress steps (`SENSOR_CALC_PROGRESS_STEPS`)

Implement as `TheaterProgressStep[]` (P10-T03). TheaterId: **`sensorCalc`** ([P10-T02](./P10-T02-sensor-story-mode.md); second section, keep Open Cal on `sensor`).

| index | id | progressStart | progressEnd | UI state | Motion |
|------:|----|--------------:|------------:|----------|--------|
| 0 | `sensor-calc-idle` | 0.00 | 0.12 | Empty command bar; caret; hint “Ask or open anything…” | Bar at rest |
| 1 | `sensor-calc-type` | 0.12 | 0.38 | Query types: `15% of 240` via scroll-synced char index | Char reveal only |
| 2 | `sensor-calc-resolve` | 0.38 | 0.55 | Soft “Calculating…” / resolving row under the bar | `opacity` 0→1 |
| 3 | `sensor-calc-result` | 0.55 | 0.78 | Result card appears (answer **36**) | Card `translateY(8px→0)` + `opacity` 0→1 |
| 4 | `sensor-calc-settle` | 0.78 | 0.90 | Card fully opaque; optional secondary “Open Calculator” affordance at low emphasis | Settle only |
| 5 | `sensor-calc-hold` | 0.90 | 1.00 | Final hold: full query + result card | Static |

**Invariants**

- Steps are contiguous; last step ends at `1.0`.
- Reduced motion pins progress to **0.90** so the result card is fully visible.
- Do not scrub the Open Cal story inside this beat sheet; that remains P8-T05 / existing `SENSOR_PROGRESS_STEPS`.

---

## Fixtures (Acme)

### Command bar

| Field | Value |
|-------|-------|
| Placeholder / idle hint | Ask or open anything… |
| Query string | `15% of 240` |
| Query length | 11 |

### Resolve row

| Field | Value |
|-------|-------|
| Label | Calculating… |
| Visible | `progress >= 0.38` until result card dominates (`progress >= 0.55` may fade resolve to 0) |

### Result card (primary)

| Field | Value |
|-------|-------|
| Answer | `36` |
| Subtitle | `15% of 240` |
| Eyebrow (optional) | Result |
| Visible from | `progress >= 0.55` (full by 0.78) |

### Secondary affordance (optional, low emphasis)

| Field | Value |
|-------|-------|
| Label | Open Calculator |
| Role | Shows Sensor can still jump to an app; **not** the hero of this story |
| Visible | `progress >= 0.78` |

### Alternate prompts (non-scrubbed chrome only)

`define latency` · `Open Cal` · `Do I have meetings tomorrow?`

If `define latency` is shown as a static chip, do **not** scrub a definition answer in this theater; that would be a future story.

---

## Helper contracts (P10-T03)

Reuse Sensor patterns from [`lib/marketing-theater-scroll.ts`](../../../lib/marketing-theater-scroll.ts).

| Need | Approach |
|------|----------|
| Step from progress | `getTheaterStep(theaterId, progress)` after steps registered |
| Query typing | `getScrollSyncedCharIndex(query, theaterId, progress, 'sensor-calc-type')` |
| Resolve opacity | Local progress of `sensor-calc-resolve` (fade out as result enters) |
| Result card motion | New `getSensorCalcResultMotion(progress)` from `sensor-calc-result` (`translateY` 8px + opacity) |
| Settle / secondary | Local progress of `sensor-calc-settle` |
| Reduced motion | `REDUCED_MOTION_FINAL_PROGRESS[theaterId] = 0.9` |
| Wrapper VH | Same as Sensor (`220` / `120`) unless P10-T02 chooses a shorter second section |

**Visual state aggregator (recommended for P10-T03):**

```ts
getSensorCalcVisualStateFromProgress(progress) → {
  queryCharIndex,
  resolveOpacity,     // 0–1
  resultMotion,       // { opacity, translateY }
  showSecondary,      // progress >= 0.78
  showHold,           // progress >= 0.90
}
```

---

## Reduced motion

| Field | Value |
|-------|-------|
| Final progress | **0.90** |
| Expected UI | Full query `15% of 240`; result card **36** fully opaque; resolve row gone or invisible |
| Caption | Sensor answers a quick calculation without opening another app. |
| Pause | `isPaused: true` while reduced-motion |

---

## Section chrome (draft for P10-T02 / P10-T04)

Use if this ships as a **second** theater on `/sensor`. If P10-T02 replaces Open Cal, keep existing “See Sensor in action.” chrome and swap caption only.

| Element | Copy (second-section variant) |
|---------|-------------------------------|
| Title | Instant answers, not just app jumps. |
| Subtitle | Type a quick calculation and get a clear result without leaving your flow. |
| Caption | Sensor answers a quick calculation without opening another app. |
| Footer | Explore Mascot → `/mascot` |

---

## Content module handoff

Export fixtures from [`lib/marketing-sensor-mascot-content.ts`](../../../lib/marketing-sensor-mascot-content.ts) (or a sibling module) in P10-T03, for example:

```ts
SENSOR_CALC_THEATER_FIXTURES = {
  query: '15% of 240',
  resolveLabel: 'Calculating…',
  result: { answer: '36', subtitle: '15% of 240', eyebrow: 'Result' },
  secondaryAction: 'Open Calculator',
  alternatePrompts: ['define latency', 'Open Cal', 'Do I have meetings tomorrow?'],
  caption: 'Sensor answers a quick calculation without opening another app.',
}
```

Beat **numbers** live in the scroll kit; strings live in the content module.

---

## Out of scope

- Choosing second section vs replace (P10-T02)  
- Implementing demo / wiring `/sensor` (P10-T03, P10-T04)  
- Scrubbed definition story (future; alternate chip only here)  
- Changing Connect / Focus / Execute or Open Cal thresholds  

---

## Acceptance

- [x] Six contiguous beats with frozen `progressStart` / `progressEnd`  
- [x] Exact query, result card, resolve label, reduced-motion **0.90** + caption  
- [x] Definition deferred to non-scrubbed chrome  
- [x] Helper reuse list specified for P10-T03  
- [x] No em dashes in locked copy  

---

## Next

**P10-T02:** Decide Sensor story mode (second section vs replace Open Cal vs alternate mode).
