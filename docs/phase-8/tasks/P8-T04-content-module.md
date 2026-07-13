# P8-T04: Shared Content Module + Comparison Strip

**Task ID:** P8-T04  
**Status:** done  
**Type:** Implementation (content module; pages wire later)  
**Completed:** 2026-07-10  
**Parent:** [phase-8-tasks.md](../phase-8-tasks.md) | [phase-8-sensor-mascot.md](../phase-8-sensor-mascot.md)  
**Depends on:** [P8-T03](./P8-T03-copy-decks.md)  
**Blocks:** P8-T10, P8-T12  
**Blocker:** Yes

---

## Goal

Ship `lib/marketing-sensor-mascot-content.ts` exporting page content, comparison rows, and demo fixture strings for Sensor and Mascot depth pages.

---

## Deliverable

| File | Role |
|------|------|
| [`lib/marketing-sensor-mascot-content.ts`](../../../lib/marketing-sensor-mascot-content.ts) | Single source for P8-T03 copy + P8-T05 Sensor fixtures |

No page UI in this task. Consumers: P8-T09/T11 demos, P8-T10/T12 pages, P8-T13 discovery.

---

## Exports

| Export | Contents |
|--------|----------|
| `SENSOR_MASCOT_RELATIONSHIP_LINE` | Shared relationship sentence |
| `SENSOR_MASCOT_COMPARISON` / `SENSOR_MASCOT_COMPARISON_ROWS` | When-to-use strip + sibling CTAs |
| `SENSOR_MASCOT_PRIVACY` | Privacy line + `/security` link |
| `SENSOR_MASCOT_CTA` | Shared waitlist CTA block |
| `SENSOR_PAGE_CONTENT` | Metadata, hero, how-it-works, theater chrome, capabilities, feature-grid card |
| `MASCOT_PAGE_CONTENT` | Same shape for Mascot |
| `SENSOR_THEATER_FIXTURES` | Idle hint, `Open Cal`, results, confirm chip, alternate prompts (P8-T05) |
| `MASCOT_THEATER_FIXTURES` | User ask, reply paragraphs / body, Open inbox control |
| `SENSOR_MASCOT_FEATURE_GRID_CARDS` | Both cards for P8-T13 insert order |
| `SENSOR_MASCOT_FAQ_LINKS` | FAQ answer + learn-more stubs |
| `getSensorMascotPageContent` / `getSensorMascotSiblingCta` | Helpers by surface |

Beat **progress numbers** stay in [`lib/marketing-theater-scroll.ts`](../../../lib/marketing-theater-scroll.ts) (P8-T07), not this module.

---

## Verification

- [x] `tsc --noEmit` clean  
- [x] No em dashes in module strings  
- [x] Sensor fixtures match P8-T05 (`Open Cal`, three results, Opening Calendar…)  
- [x] Mascot reply matches P8-T03 tightened copy  

---

## Handoff

| Task | Use |
|------|-----|
| P8-T09 / P8-T11 | Import theater fixtures |
| P8-T10 / P8-T12 | Import page content + comparison + privacy + CTA |
| P8-T13 | Feature-grid cards + FAQ links |
| P8-T06 | May refine Mascot fixture shape when beat sheet locks; strings already present |
