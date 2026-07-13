# P8-T13: Feature Grid + FAQ Discovery Links

**Task ID:** P8-T13  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-10  
**Parent:** [phase-8-tasks.md](../phase-8-tasks.md) | [phase-8-sensor-mascot.md](../phase-8-sensor-mascot.md)  
**Depends on:** [P8-T01](./P8-T01-ia-decision.md), [P8-T10](./P8-T10-sensor-page.md), [P8-T12](./P8-T12-mascot-page.md)  
**Blocks:** P8-T19  
**Blocker:** Yes

---

## Goal

Discover `/sensor` and `/mascot` from the homepage feature grid and FAQ, without changing the homepage narrative lead (hero / Connect-Focus-Execute).

---

## Deliverables

| File | Change |
|------|--------|
| [`components/marketing/sections/FeatureGridSection.tsx`](../../../components/marketing/sections/FeatureGridSection.tsx) | 7 cards; Sensor + Mascot after Upcoming events, before Security |
| [`app/faq/page.tsx`](../../../app/faq/page.tsx) | Sensor / Mascot answers from content module + Learn more links; generic `learnMore` on FAQ items |
| [`docs/phase-1/tasks/P1-T09-feature-grid.md`](../../phase-1/tasks/P1-T09-feature-grid.md) | Amendment: exclusion superseded for discovery cards |

Copy stubs: `SENSOR_MASCOT_FEATURE_GRID_CARDS` and `SENSOR_MASCOT_FAQ_LINKS` in [`lib/marketing-sensor-mascot-content.ts`](../../../lib/marketing-sensor-mascot-content.ts).

---

## Feature grid order (locked)

1. Connected apps  
2. Inbox  
3. Daily narrative  
4. Upcoming events  
5. **Sensor** → `/sensor`  
6. **Mascot** → `/mascot`  
7. Security  

---

## FAQ

| Question | Learn more |
|----------|------------|
| What is the Sensor Bar? | Learn more → `/sensor` |
| What is Mascot? | Learn more → `/mascot` |
| Which apps can I connect? | View connected apps → `/connected-apps` (unchanged behavior, now via `learnMore`) |

Sensor / Mascot answer copy aligned with P8-T04 stubs.

---

## Acceptance

- [x] Feature grid shows 7 cards in P8-T01 order  
- [x] FAQ Sensor + Mascot entries link to depth pages  
- [x] P1-T09 amended (discovery exclusion superseded)  
- [x] Homepage hero / theaters unchanged  
- [x] `tsc --noEmit` clean  

---

## Handoff

| Next | Work |
|------|------|
| P8-T14 | Legacy `/sensor&mascot` redirect + overlay allowlist |
| P8-T19 | Sign-off (discovery checklist) |
