# P11-T08: Yesterday Narrative + Connected Apps Scene

**Task ID:** P11-T08  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-12  
**Parent:** [phase-11-tasks.md](../../phase-11-tasks.md) | [phase-11-product-overview.md](../../phase-11-product-overview.md)  
**Depends on:** [P11-T05](./P11-T05-overview-shell.md), [P11-T03](./P11-T03-product-fixtures.md)  
**Blocks:** P11-T10, P11-T13  
**Blocker:** Yes

---

## Goal

Replace the narrative/apps placeholder with an actionable yesterday recap plus seven connected read sources, without implying OAuth or automatic writes.

---

## Output

[`components/marketing/product-overview/scenes/NarrativeAppsOverviewScene.tsx`](../../../components/marketing/product-overview/scenes/NarrativeAppsOverviewScene.tsx)

---

## What shipped

| Element | Behavior |
|---------|----------|
| Narrative card | Summary, stats row, highlight, open loop, evidence chips |
| Evidence | Gmail / Calendar / Jira chips with marketing icons |
| Connected apps | Reuses `StaticConnectedApps` marketing at final state (7 apps, badges, sync banner) |
| Truth copy | Explicit "reads them as context"; Slack/Jira called out as sources, not auto-writes |

Uses `NARRATIVE_APPS_SCENE_FIXTURES_ACME`. No product / OAuth imports.

---

## Acceptance checklist

- [x] Yesterday narrative contains an actionable recap
- [x] Evidence or supporting stats are visible
- [x] Seven connected product sources are represented
- [x] Connected and sync states are visually distinct
- [x] No unsupported automatic-write behavior is implied
