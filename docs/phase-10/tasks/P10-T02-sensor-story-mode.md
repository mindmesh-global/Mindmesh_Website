# P10-T02: Decide Sensor Story Mode

**Task ID:** P10-T02  
**Status:** done  
**Type:** Strategy / documentation (implementation in P10-T03–T04)  
**Completed:** 2026-07-10  
**Parent:** [phase-10-tasks.md](../phase-10-tasks.md) | [phase-10-theater-upgrades.md](../phase-10-theater-upgrades.md)  
**Depends on:** [P10-T01](./P10-T01-sensor-calc-beat-sheet.md)  
**Blocks:** P10-T03, P10-T04  
**Blocker:** Yes

---

## Decision (locked)

**Mode A: second theater section on `/sensor`.**

Keep the existing Open Cal scrub (`theaterId="sensor"`). Add a **second** scroll theater for the calc story below it. Do **not** replace Open Cal. Do **not** ship a toggle / alternate demo mode in this phase.

---

## Options considered

| Mode | Approach | Verdict |
|------|----------|---------|
| **A** | Second `TheaterScrollSection` on `/sensor` | **Chosen** |
| **B** | Replace Open Cal with calc as the only scrub | Rejected: drops the shipped “jump to app” proof and invalidates Phase 8 theater QA baselines for that story |
| **C** | One section, toggle / alternate mode | Rejected: harder reduced-motion finals, caption ambiguity, and QA surface for little gain |

---

## Why A

1. Phase 10 goal was a **second** scrub story beyond Open Cal, not a swap.  
2. Open Cal already proves Sensor as a command bar for **jumps**; calc proves **instant answers**. Both belong on the product page.  
3. Two independent `TheaterId`s keep beat sheets, reduced-motion pins, and off-screen pause isolated.  
4. Page already mounts a single `ProductTheaterSensor`; adding a sibling section matches homepage multi-theater patterns without nav clutter.

---

## Locked implementation contract

| Field | Value |
|-------|-------|
| Mode | **A** (second section) |
| Existing theater | Keep `ProductTheaterSensor` / `SensorTheaterDemo` / `theaterId="sensor"` / Open Cal fixtures |
| New theater id | **`sensorCalc`** (extend `TheaterId` in scroll kit) |
| New steps | `SENSOR_CALC_PROGRESS_STEPS` from [P10-T01](./P10-T01-sensor-calc-beat-sheet.md) |
| New demo | `SensorCalcTheaterDemo` (name may vary; coded UI only) |
| New section component | e.g. `ProductTheaterSensorCalc` |
| Section `id` | `sensor-calc-theater` |
| Wrapper VH | Same as Sensor: desktop `220`, mobile `120` |
| Reduced-motion final | **0.90** for `sensorCalc` |
| Page order on `/sensor` | How it works → **Open Cal theater** → **Calc theater** → capabilities → … |

### Section chrome (calc theater only)

From P10-T01 second-section variant:

| Element | Copy |
|---------|------|
| Title | Instant answers, not just app jumps. |
| Subtitle | Type a quick calculation and get a clear result without leaving your flow. |
| Caption | Sensor answers a quick calculation without opening another app. |
| Footer | Explore Mascot → `/mascot` (same sibling CTA as Open Cal section is fine) |

Open Cal section chrome stays as shipped in Phase 8 (“See Sensor in action.”).

---

## Scroll kit work (P10-T03)

| Change | Notes |
|--------|-------|
| `TheaterId` | Add `'sensorCalc'` |
| `THEATER_PROGRESS_STEPS` / VH / reduced-motion maps | Register `sensorCalc` |
| Helpers | `getSensorCalcVisualStateFromProgress` (and related) per P10-T01 |
| Do not mutate | Existing `SENSOR_PROGRESS_STEPS` / Open Cal helpers |

---

## Page wiring (P10-T04)

| Change | Notes |
|--------|-------|
| `app/sensor/page.tsx` | Render Open Cal section, then calc section |
| Content module | Export calc theater chrome + `SENSOR_CALC_THEATER_FIXTURES` |
| Dynamic import | Calc demo lazy-loaded like `SensorTheaterDemo` |

---

## Explicit non-goals

- Replacing or deleting the Open Cal theater  
- In-section mode toggle / tabs between Open Cal and calc  
- Scrubbed definition story (still alternate chrome only)  
- Changing homepage Connect / Focus / Execute  

---

## Acceptance

- [x] Mode A locked with rationale vs B and C  
- [x] New `TheaterId` `sensorCalc` named  
- [x] Page order and section chrome locked  
- [x] Handoff clear for P10-T03 / P10-T04  

---

## Next

**P10-T03:** Implement Sensor calc theater demo + scroll kit registration for `sensorCalc`.
