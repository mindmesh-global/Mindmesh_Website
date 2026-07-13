# P3-T01: `lib/marketing-theater-scroll.ts` Constants

**Task ID:** P3-T01  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-04  
**Parent:** [phase-3-tasks.md](../phase-3-tasks.md)  
**Depends on:** P1-T06–08, P1-T15  
**Blocks:** P3-T04, P3-T05, P3-T11

---

## Quick reference

| Field | Value |
|-------|-------|
| **Module** | [`lib/marketing-theater-scroll.ts`](../../../lib/marketing-theater-scroll.ts) |
| **Theater ids** | `'connect' \| 'focus' \| 'execute'` |

---

## Exports

| Export | Source |
|--------|--------|
| `THEATER_WRAPPER_VH` | P1-T15 (Connect/Execute 220/120, Focus 240/120) |
| `THEATER_STICKY_TOP_PX` | P1-T15 (`80`) |
| `CONNECT_PROGRESS_STEPS` | P1-T06 (5 beats) |
| `FOCUS_PROGRESS_STEPS` | P1-T07 (6 beats) |
| `EXECUTE_PROGRESS_STEPS` | P1-T08 (7 beats) |
| `REDUCED_MOTION_FINAL_PROGRESS` | Connect 0.90, Focus 0.85, Execute 0.92 |
| `progressToStep(progress, steps)` | Shared mapper |
| `getTheaterStep(theaterId, progress)` | Convenience for Phase 4 |
| `getTheaterWrapperMinHeightClass(theaterId)` | Tailwind vh classes for wrappers |

---

## Beat counts

| Theater | Steps | Final reduced-motion progress |
|---------|-------|-------------------------------|
| Connect | 0–4 | 0.90 |
| Focus | 0–5 | 0.85 |
| Execute | 0–6 | 0.92 |

---

## Acceptance criteria

- [x] Thresholds match P1-T06–08 tables
- [x] TypeScript `TheaterId` type
- [x] `progressToStep` handles progress === 1 (last step)

---

## Next step

**P3-T02:** Upgrade sticky `ProductFrame` using `THEATER_STICKY_TOP_PX`.
