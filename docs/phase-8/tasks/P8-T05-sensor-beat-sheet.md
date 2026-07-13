# P8-T05: Lock Sensor Theater Beat Sheet

**Task ID:** P8-T05  
**Status:** done  
**Type:** Strategy / documentation (code in P8-T07 + P8-T09)  
**Completed:** 2026-07-10  
**Parent:** [phase-8-tasks.md](../phase-8-tasks.md) | [phase-8-sensor-mascot.md](../phase-8-sensor-mascot.md)  
**Depends on:** [P8-T03](./P8-T03-copy-decks.md), [P1-T06](../../phase-1/tasks/P1-T06-theater-connect.md) format  
**Blocks:** P8-T07, P8-T09  
**Blocker:** Yes

---

## Quick reference

| Field | Value |
|-------|-------|
| Theater id | `sensor` |
| Story | Open Sensor → type intent → ranked results → highlight → confirm |
| Wrapper | `min-h-[220vh]` desktop · `min-h-[120vh]` mobile |
| Sticky frame | Same as homepage theaters (`ProductFrame`, top offset per Phase 3) |
| Reduced-motion jump | **0.90** (start of `sensor-hold`) |
| Caption | Sensor finds Calendar from a short command without leaving your flow. |
| Primary query | `Open Cal` (8 chars including space) |
| Confirm chip | Opening Calendar… |
| Persona | Acme / Alex (align with marketing demos) |

Copy source: [P8-T03](./P8-T03-copy-decks.md). This task freezes **progress numbers**, **fixtures**, and **helper contracts** for implementation.

---

## Locked progress steps (`SENSOR_PROGRESS_STEPS`)

Implement as `TheaterProgressStep[]` in [`lib/marketing-theater-scroll.ts`](../../../lib/marketing-theater-scroll.ts) (P8-T07).

| index | id | progressStart | progressEnd | UI state | Motion |
|------:|----|--------------:|------------:|----------|--------|
| 0 | `sensor-idle` | 0.00 | 0.12 | Empty command bar; caret; hint “Ask or open anything…” | Bar at rest (`opacity` 1) |
| 1 | `sensor-type-query` | 0.12 | 0.35 | Query types: `Open Cal` via scroll-synced char index | Char reveal only |
| 2 | `sensor-results` | 0.35 | 0.55 | Three result rows appear (Calendar, Calculator, Meetings) | Stagger `translateY(8px→0)` + `opacity 0→1` |
| 3 | `sensor-highlight` | 0.55 | 0.72 | Top row (Calendar) selected; focus ring | Ring / background emphasis (`opacity` / scale ≤ 1.02 once) |
| 4 | `sensor-confirm` | 0.72 | 0.90 | Success chip: Opening Calendar… | Chip `opacity 0→1` |
| 5 | `sensor-hold` | 0.90 | 1.00 | Final state hold (query full, Calendar selected, chip visible) | Static |

**Invariants**

- Steps are contiguous: each `progressEnd` equals the next `progressStart`.
- Last step ends at `1.0`.
- `getTheaterStep('sensor', progress)` returns `index` for the active step (same rules as Connect/Focus/Execute).
- Reduced motion pins progress to **0.90** so the hold beat is active and the confirm chip is fully visible.

---

## Fixtures (Acme)

### Command bar

| Field | Value |
|-------|-------|
| Placeholder / idle hint | Ask or open anything… |
| Query string | `Open Cal` |
| Query length | 8 |

### Result rows (order = visual order)

| Order | id | Title | Hint | Icon cue |
|------:|----|-------|------|----------|
| 1 | `calendar` | Calendar | Enter | Calendar |
| 2 | `calculator` | Calculator | | Calculator |
| 3 | `meetings` | Meetings tomorrow | | Calendar / list |

Primary selection is always **Calendar** (`calendar`). Do not rotate the primary query in the scroll demo; alternate prompts may appear as static chips outside the scrubbed query if desired (optional UI, not required for beat math).

### Confirm

| Field | Value |
|-------|-------|
| Chip text | Opening Calendar… |
| Visible from | `progress >= 0.72` (full by 0.90) |

### Alternate prompts (non-scrubbed chrome only)

`Do I have meetings tomorrow?` · `Find invoices from Acme` · `Open Calculator`

---

## Helper contracts (P8-T07 / P8-T09)

Reuse existing primitives; add Sensor-specific wrappers as needed.

| Need | Reuse / add |
|------|-------------|
| Step from progress | `getTheaterStep('sensor', progress)` after steps registered |
| Local beat 0→1 | `getBeatLocalProgress('sensor', progress)` or beat-id helper |
| Query typing | `getScrollSyncedCharIndex(query, 'sensor', progress, 'sensor-type-query')` |
| Result row motion | New `getSensorResultMotion(progress, index, total=3)` using `sensor-results` local progress + stagger (mirror `getConnectCardMotion` pattern; `translateY` 8px) |
| Highlight strength | New `getSensorHighlightProgress(progress)` from `sensor-highlight` local 0→1 |
| Confirm chip opacity | New `getSensorConfirmOpacity(progress)` from `sensor-confirm` local 0→1 |
| Reduced motion | `REDUCED_MOTION_FINAL_PROGRESS.sensor = 0.9` |
| Wrapper classes | `THEATER_WRAPPER_VH.sensor = { desktop: 220, mobile: 120 }` |

**Visual state aggregator (recommended for P8-T09):**

```ts
getSensorVisualStateFromProgress(progress) → {
  queryCharIndex,
  showResults,      // progress >= 0.35
  resultMotions[],  // per row
  highlightProgress, // 0–1
  confirmOpacity,    // 0–1
  showHold,          // progress >= 0.90
}
```

Motion rule: **`transform` + `opacity` only** (Phase 3–4 contract).

---

## Reduced motion

| Field | Value |
|-------|-------|
| Final progress | **0.90** |
| Expected UI | Full query `Open Cal`; three results visible; Calendar highlighted; confirm chip fully opaque |
| Caption | Sensor finds Calendar from a short command without leaving your flow. |
| Pause | `isPaused: true` while reduced-motion (same as other theaters) |

---

## Section chrome (from P8-T03; not reopened)

| Element | Copy |
|---------|------|
| Title | See Sensor in action. |
| Subtitle | A short command becomes a clear result, then an action you can trust. |
| Caption | Sensor finds Calendar from a short command without leaving your flow. |
| Footer | Explore Mascot → `/mascot` |

---

## Implementation handoff

| Task | Work |
|------|------|
| P8-T07 | Register `sensor` on `TheaterId`, steps, VH, reduced-motion map, helpers above |
| P8-T09 | `SensorTheaterDemo` scrubbing this sheet inside `TheaterScrollSection` |
| P8-T04 | May export fixture strings; beat numbers live in scroll kit |

Do **not** change Connect / Focus / Execute thresholds in this phase.

---

## Acceptance

- [x] Six contiguous beats with frozen `progressStart` / `progressEnd`
- [x] Exact query, result rows, confirm chip, reduced-motion **0.90** + caption
- [x] Helper reuse list specified for P8-T07 / P8-T09
- [x] Parent draft in phase-8-sensor-mascot.md updated to “locked”
