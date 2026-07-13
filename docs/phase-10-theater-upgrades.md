# Phase 10: Sensor & Mascot Theater Upgrades

**Status:** Complete (P10-T10, 2026-07-10)  
**Prerequisite:** [Phase 9 sign-off](./phase-9/tasks/P9-T08-sign-off.md) (P9-T08, 2026-07-10) · [Phase 8 sign-off](./phase-8/tasks/P8-T19-sign-off.md)  
**Task breakdown:** [phase-10-tasks.md](./phase-10-tasks.md) · Sign-off: [P10-T10](./phase-10/tasks/P10-T10-sign-off.md)  
**Parent:** [phase-8-sensor-mascot.md](./phase-8-sensor-mascot.md) · Scroll kit: [phase-3-scroll-kit.md](./phase-3-scroll-kit.md)

Phase 10 deepens the **product-value** stories on `/sensor` and `/mascot` without reopening Slack Marketplace compliance.

---

## Goal

1. **Sensor:** Add a scrub story for quick calculation or definition → result card (beyond “Open Cal”)
2. **Mascot:** Attachment search story (“Find the attachment from Acme last year”) → grounded hit + open affordance
3. **Mascot:** Showcase offered **mascot icons / skins** with local assets

---

## Why after Phase 9

- Marketplace has an external deadline; these demos do not.  
- New beat sheets, fixtures, and QA are a product-demo phase.  
- Shipping with compliance in one phase risks delaying submit.

---

## Locked directions

| Surface | Story | Notes |
|---------|-------|-------|
| Sensor | Calc query → result card | Locked in [P10-T01](./phase-10/tasks/P10-T01-sensor-calc-beat-sheet.md); story mode **A** in [P10-T02](./phase-10/tasks/P10-T02-sensor-story-mode.md): second section, `TheaterId` `sensorCalc`, keep Open Cal |
| Mascot | Attachment search from Acme | Locked in [P10-T05](./phase-10/tasks/P10-T05-mascot-attachment-beat-sheet.md): Mode A second section, `TheaterId` `mascotAttachment`, keep email-count |
| Mascot | Icon / skin picker chrome | Approach A: 7 product Lottie characters as local stills under `public/images/mascot-skins/`; no live Lottie on marketing |

### Contracts (carry from Phase 8)

- Motion: `transform` + `opacity` only  
- Reduced-motion finals + off-screen pause  
- No live `MascotChatbot` / `SensorBarSpotlight` / Lottie on marketing funnel  
- Local `public/` or coded UI only  

---

## Task breakdown

Full list: [phase-10-tasks.md](./phase-10-tasks.md) (P10-T01–T10). All tasks `done` (P10-T10).

---

## Explicit non-goals

- Live API data in demos  
- Rewriting homepage Connect / Focus / Execute  
- Slack compliance pages (Phase 9)  
- `/dashboard` redesign  

---

## Definition of done

- [x] Sensor shows calc/definition value clearly in scroll theater  
- [x] Mascot shows attachment-search value clearly  
- [x] Mascot icons/skins visible with local assets  
- [x] Theater QA passed  
- [x] Phase 10 sign-off recorded ([P10-T10](./phase-10/tasks/P10-T10-sign-off.md))  
