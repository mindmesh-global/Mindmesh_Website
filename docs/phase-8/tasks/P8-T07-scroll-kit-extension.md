# P8-T07: Extend Scroll Kit for `sensor` + `mascot`

**Task ID:** P8-T07  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-10  
**Parent:** [phase-8-tasks.md](../phase-8-tasks.md) | [phase-8-sensor-mascot.md](../phase-8-sensor-mascot.md)  
**Depends on:** [P8-T05](./P8-T05-sensor-beat-sheet.md), [P8-T06](./P8-T06-mascot-beat-sheet.md), [phase-3-scroll-kit.md](../../phase-3-scroll-kit.md)  
**Blocks:** P8-T09, P8-T11  
**Blocker:** Yes

---

## Goal

Register Sensor and Mascot on the shared theater scroll kit so depth-page demos can reuse `TheaterScrollSection` / `useScrollSection` without changing homepage Connect / Focus / Execute thresholds.

---

## Deliverables

| File | Change |
|------|--------|
| [`lib/marketing-theater-scroll.ts`](../../../lib/marketing-theater-scroll.ts) | `TheaterId` + VH/classes + steps + reduced-motion + Sensor/Mascot helpers |
| [`app/globals.css`](../../../app/globals.css) | `[data-theater='sensor'|'mascot']` min-height rules |
| [`lib/marketing-demo-data.ts`](../../../lib/marketing-demo-data.ts) | `HomepageTheaterId` so Acme fixtures stay connect/focus/execute only |

No page or demo UI in this task.

---

## Scroll kit registration

| Field | Sensor | Mascot |
|-------|--------|--------|
| Wrapper desktop / mobile | 220vh / 120vh | 240vh / 120vh |
| Reduced-motion jump | **0.90** | **0.88** |
| Steps export | `SENSOR_PROGRESS_STEPS` | `MASCOT_PROGRESS_STEPS` |
| Wired into | `THEATER_PROGRESS_STEPS` | same |

Beat tables match P8-T05 / P8-T06 (six contiguous steps, last ends at `1.0`).

---

## Helpers added

**Sensor (P8-T09):**

| Helper | Role |
|--------|------|
| `getSensorQueryCharIndex` | Scroll-synced typing for `sensor-type-query` |
| `getSensorResultMotion` | Staggered result fly-in (`opacity` + `translateY`) |
| `getSensorHighlightProgress` | Local 0→1 on `sensor-highlight` |
| `getSensorConfirmOpacity` | Local 0→1 on `sensor-confirm` |
| `getSensorVisualStateFromProgress` | Aggregator for demo wiring |

**Mascot (P8-T11):**

| Helper | Role |
|--------|------|
| `getMascotUserAskMotion` | User bubble opacity + Y |
| `getMascotReplyVisibleCount` | Staged paragraphs (`0 \| 1 \| 2 \| 3`; chunk at 0.33 / 0.66) |
| `getMascotActionOpacity` | Open inbox control |
| `getMascotVisualStateFromProgress` | Aggregator for demo wiring |

Shared: `getNamedBeatLocalProgress` (internal). Existing `getTheaterStep` / `getBeatLocalProgress` / `getScrollSyncedCharIndex` / `getTheaterWrapperMinHeightClass` accept the new IDs via `TheaterId`.

---

## CSS

`[data-theater='sensor']` and `[data-theater='mascot']` follow the same mobile 120vh / desktop 220vh (sensor) or 240vh (mascot) pattern as homepage theaters, gated by `data-reduced-motion`.

---

## Homepage isolation

`THEATER_DEMO_FIXTURES` / `getTheaterDemoFixtures` are typed with `HomepageTheaterId = 'connect' | 'focus' | 'execute'`. Sensor/Mascot fixtures remain in [`lib/marketing-sensor-mascot-content.ts`](../../../lib/marketing-sensor-mascot-content.ts).

Connect / Focus / Execute step boundaries and reduced-motion values were not changed.

---

## Verification

- [x] `tsc --noEmit` clean  
- [x] Script asserts: contiguous steps for all five theaters; Sensor/Mascot VH + reduced-motion; helper samples at mid/hold progress; homepage hold thresholds unchanged  
- [x] `TheaterScrollSection` / `useScrollSection` already take `TheaterId` (no API change)

---

## Handoff

| Next | Work |
|------|------|
| P8-T08 | Route gate for `/sensor` + `/mascot` |
| P8-T09 | `SensorTheaterDemo` consuming `getSensorVisualStateFromProgress` |
| P8-T11 | `MascotTheaterDemo` consuming `getMascotVisualStateFromProgress` |
