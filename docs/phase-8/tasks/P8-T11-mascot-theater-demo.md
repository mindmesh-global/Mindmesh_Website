# P8-T11: `MascotTheaterDemo` (Scroll-Linked)

**Task ID:** P8-T11  
**Status:** done  
**Type:** Client component + scroll animation  
**Completed:** 2026-07-10  
**Parent:** [phase-8-tasks.md](../phase-8-tasks.md) | [phase-8-sensor-mascot.md](../phase-8-sensor-mascot.md)  
**Depends on:** [P8-T06](./P8-T06-mascot-beat-sheet.md), [P8-T07](./P8-T07-scroll-kit-extension.md)  
**Blocks:** P8-T12  
**Blocker:** Yes

---

## Goal

Ship a scroll-driven Mascot theater demo that scrubs the locked P8-T06 beat sheet via `useTheaterScroll`, using transform/opacity only and no live `MascotChatbot` / Lottie.

---

## Deliverables

| File | Role |
|------|------|
| [`components/marketing/theater/demos/MascotTheaterDemo.tsx`](../../../components/marketing/theater/demos/MascotTheaterDemo.tsx) | Demo shell; maps progress → visual state |
| [`components/marketing/theater/marketing/MarketingMascotPanel.tsx`](../../../components/marketing/theater/marketing/MarketingMascotPanel.tsx) | Coded chat: user ask, typing dots, staged reply, Open inbox |
| [`components/marketing/theater/index.ts`](../../../components/marketing/theater/index.ts) | Exports `MascotTheaterDemo` + `MarketingMascotPanel` |

Page wiring is **P8-T12**.

---

## Behavior

| Progress | UI |
|----------|----|
| 0.00–0.10 | Idle companion-ready shell |
| 0.10–0.28 | User ask bubble (`translateY` + opacity) |
| 0.28–0.55 | Typing indicator (3 dots, opacity pulse) |
| 0.55–0.78 | Reply paragraphs 1→2→3 (staged count) |
| 0.78–0.88 | Open inbox control fades in |
| 0.88–1.00 | Hold |

Drivers: `getMascotVisualStateFromProgress` + `MASCOT_THEATER_FIXTURES`.

**Pause:** When `isPaused`, progress freezes (off-screen / reduced-motion parent jump to **0.88**).

**Forbidden:** `MascotChatbot`, Lottie, remote images.

---

## Acceptance

- [x] Client demo consumes `useTheaterScroll` (`progress`, `step`, `isPaused`)
- [x] Full Mascot beat sheet covered (staged paragraphs, not char scrub)
- [x] Motion: `transform` + `opacity` only
- [x] Fixtures from `lib/marketing-sensor-mascot-content.ts`
- [x] No `MascotChatbot` / Lottie
- [x] Exported from theater barrel
- [x] `tsc --noEmit` clean

---

## Handoff

| Next | Work |
|------|------|
| P8-T12 | `/mascot` page + `TheaterScrollSection` + dynamic import of this demo |
| P8-T16 | Reduced-motion / off-screen pause QA |
