# P10-T03: Implement Sensor Calc Theater Demo

**Task ID:** P10-T03  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-10  
**Parent:** [phase-10-tasks.md](../phase-10-tasks.md) | [P10-T01](./P10-T01-sensor-calc-beat-sheet.md) | [P10-T02](./P10-T02-sensor-story-mode.md)  
**Depends on:** P10-T01, P10-T02  
**Blocks:** P10-T04, P10-T09  
**Blocker:** Yes

---

## Goal

Ship the scroll-linked Sensor **calc** demo and register `sensorCalc` in the scroll kit. Page mount is **P10-T04**.

---

## Deliverables

| File | Change |
|------|--------|
| [`lib/marketing-theater-scroll.ts`](../../../lib/marketing-theater-scroll.ts) | `TheaterId` + `sensorCalc`; steps; VH; RM 0.90; visual-state helpers |
| [`lib/marketing-sensor-mascot-content.ts`](../../../lib/marketing-sensor-mascot-content.ts) | `SENSOR_CALC_THEATER_FIXTURES` + `SENSOR_CALC_THEATER_SECTION` |
| [`MarketingSensorCalcPanel.tsx`](../../../components/marketing/theater/marketing/MarketingSensorCalcPanel.tsx) | Command bar + resolve + result card + secondary |
| [`SensorCalcTheaterDemo.tsx`](../../../components/marketing/theater/demos/SensorCalcTheaterDemo.tsx) | Scroll-driven demo |
| [`theater/index.ts`](../../../components/marketing/theater/index.ts) | Re-exports |

Open Cal (`sensor`) untouched.

---

## Behavior

| Progress | UI |
|----------|-----|
| 0–0.12 | Idle hint |
| 0.12–0.38 | Types `15% of 240` |
| 0.38–0.55 | Calculating… (fades as result enters) |
| 0.55–0.78 | Result card **36** |
| 0.78–0.90 | Open Calculator secondary |
| 0.90–1.00 | Hold |

Motion: `transform` + `opacity` only. No live overlay / Lottie / remote images.

---

## Acceptance

- [x] `sensorCalc` registered in scroll kit maps  
- [x] Helpers: `getSensorCalcVisualStateFromProgress` (+ query / resolve / result / secondary)  
- [x] Demo + panel ship and export from theater index  
- [x] Fixtures + section chrome in content module  
- [x] `npx tsc --noEmit` clean  
- [x] Open Cal path unchanged  

---

## Out of scope

- Mounting on `/sensor` (P10-T04)  
- Theater QA (P10-T09)  

---

## Next

**P10-T04:** Wire `ProductTheaterSensorCalc` on `/sensor` after Open Cal.
