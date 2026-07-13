# P8-T09: `SensorTheaterDemo` (Scroll-Linked)

**Task ID:** P8-T09  
**Status:** done  
**Type:** Client component + scroll animation  
**Completed:** 2026-07-10  
**Parent:** [phase-8-tasks.md](../phase-8-tasks.md) | [phase-8-sensor-mascot.md](../phase-8-sensor-mascot.md)  
**Depends on:** [P8-T05](./P8-T05-sensor-beat-sheet.md), [P8-T07](./P8-T07-scroll-kit-extension.md), [phase-4-theater-animation.md](../../phase-4-theater-animation.md)  
**Blocks:** P8-T10  
**Blocker:** Yes

---

## Goal

Ship a scroll-driven Sensor theater demo that scrubs the locked P8-T05 beat sheet via `useTheaterScroll`, using transform/opacity only and no live `SensorBarSpotlight`.

---

## Deliverables

| File | Role |
|------|------|
| [`components/marketing/theater/demos/SensorTheaterDemo.tsx`](../../../components/marketing/theater/demos/SensorTheaterDemo.tsx) | Demo shell; reads scroll context; maps progress → visual state |
| [`components/marketing/theater/marketing/MarketingSensorPanel.tsx`](../../../components/marketing/theater/marketing/MarketingSensorPanel.tsx) | Coded command bar + results + confirm chip |
| [`components/marketing/theater/index.ts`](../../../components/marketing/theater/index.ts) | Exports `SensorTheaterDemo` + `MarketingSensorPanel` |

Page wiring is **P8-T10** (`TheaterScrollSection theaterId="sensor"`).

---

## Behavior

| Progress | UI |
|----------|----|
| 0.00–0.12 | Idle hint + caret |
| 0.12–0.35 | `Open Cal` via `TypingText` `charIndex` |
| 0.35–0.55 | Three results stagger in |
| 0.55–0.72 | Calendar highlight ring + scale ≤ 1.02 |
| 0.72–0.90 | Confirm chip `Opening Calendar…` |
| 0.90–1.00 | Hold |

Drivers: `getSensorVisualStateFromProgress` + `SENSOR_THEATER_FIXTURES`.

**Pause:** When `isPaused`, progress freezes (off-screen / reduced-motion parent jump to **0.90**).

**Forbidden:** `SensorBarSpotlight`, Lottie, remote images.

---

## Acceptance

- [x] Client demo consumes `useTheaterScroll` (`progress`, `step`, `isPaused`)
- [x] Full Sensor beat sheet covered
- [x] Motion: `transform` + `opacity` only
- [x] Fixtures from `lib/marketing-sensor-mascot-content.ts`
- [x] No `SensorBarSpotlight` import
- [x] Exported from theater barrel
- [x] `tsc --noEmit` clean

---

## Handoff

| Next | Work |
|------|------|
| P8-T10 | `/sensor` page + `TheaterScrollSection` + dynamic import of this demo |
| P8-T11 | Mirror pattern for `MascotTheaterDemo` |
