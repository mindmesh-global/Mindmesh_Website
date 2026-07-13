# P10-T04: Wire Sensor Calc Story on `/sensor`

**Task ID:** P10-T04  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-10  
**Parent:** [phase-10-tasks.md](../phase-10-tasks.md) | [P10-T02](./P10-T02-sensor-story-mode.md) | [P10-T03](./P10-T03-sensor-calc-demo.md)  
**Depends on:** P10-T03  
**Blocks:** P10-T09  
**Blocker:** Yes

---

## Goal

Mount the Sensor calc scroll theater on `/sensor` as a **second** section after Open Cal (Mode A). Keep `MarketingDepthLayout`.

---

## Deliverables

| File | Change |
|------|--------|
| [`ProductTheaterSensorCalc.tsx`](../../../components/marketing/sections/ProductTheaterSensorCalc.tsx) | Section + `TheaterScrollSection` `sensorCalc` + dynamic demo |
| [`app/sensor/page.tsx`](../../../app/sensor/page.tsx) | Render calc section after Open Cal |

---

## Page order (locked)

1. How it works  
2. Open Cal theater (`#sensor-theater`, `theaterId="sensor"`)  
3. **Calc theater** (`#sensor-calc-theater`, `theaterId="sensorCalc"`)  
4. Capabilities → comparison → privacy → CTA  

Chrome from `SENSOR_CALC_THEATER_SECTION` / fixtures (P10-T01–T03).

---

## Acceptance

- [x] Calc theater live on `/sensor` after Open Cal  
- [x] Dynamic import of demo (`ssr: false`) like Open Cal  
- [x] Caption + Explore Mascot footer  
- [x] Open Cal section unchanged  
- [x] Still on `MarketingDepthLayout`  

---

## Out of scope

- Theater QA (P10-T09)  
- Mascot attachment story (P10-T05+)  

---

## Next

**P10-T05:** Lock Mascot attachment-search beat sheet + fixtures.
