# P11-T09: Sensor + Mascot Scene

**Task ID:** P11-T09  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-12  
**Parent:** [phase-11-tasks.md](../../phase-11-tasks.md) | [phase-11-product-overview.md](../../phase-11-product-overview.md)  
**Depends on:** [P11-T05](./P11-T05-overview-shell.md), [P11-T03](./P11-T03-product-fixtures.md), Phase 10 panels  
**Blocks:** P11-T10, P11-T13  
**Blocker:** Yes

---

## Goal

Replace the companions placeholder with distinct Sensor and Mascot surfaces that reuse Phase 10 marketing panels in their final states, with a local mascot still and no live Lottie.

---

## Output

[`components/marketing/product-overview/scenes/CompanionsOverviewScene.tsx`](../../../components/marketing/product-overview/scenes/CompanionsOverviewScene.tsx)

---

## What shipped

| Element | Behavior |
|---------|----------|
| Sensor panel | `MarketingSensorCalcPanel` at final state (`15% of 240` → **36**) |
| Mascot panel | Local Sherpa still + `MarketingMascotAttachmentPanel` at final attachment hit |
| Labels | Separate "Companion window" chrome for each surface |
| Stagger | `sensorVisible` / `mascotVisible` props for overview scroll enter |
| Safety | No Lottie, Tauri, brain, or product imports |

Uses `COMPANIONS_SCENE_FIXTURES_ACME`.

---

## Acceptance checklist

- [x] Sensor command and deterministic result are shown
- [x] Mascot conversation or attachment result is shown
- [x] Sensor and Mascot remain distinct product surfaces
- [x] Existing Phase 10 marketing panels are reused where practical
- [x] Mascot uses local stills; no live Lottie is loaded
