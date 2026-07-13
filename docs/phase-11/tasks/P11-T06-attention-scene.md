# P11-T06: Attention Board Scene

**Task ID:** P11-T06  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-10  
**Parent:** [phase-11-tasks.md](../../phase-11-tasks.md) | [phase-11-product-overview.md](../../phase-11-product-overview.md)  
**Depends on:** [P11-T05](./P11-T05-overview-shell.md), [P11-T03](./P11-T03-product-fixtures.md)  
**Blocks:** P11-T10, P11-T13  
**Blocker:** Yes

---

## Goal

Replace the Attention Board placeholder with a fixture-driven ranked board that matches the shipping product hierarchy: Now, Later Today, Quietly Handled, source badges, why-now, and calendar overlap.

---

## Output

[`components/marketing/product-overview/scenes/AttentionOverviewScene.tsx`](../../../components/marketing/product-overview/scenes/AttentionOverviewScene.tsx)

---

## What shipped

| Element | Behavior |
|---------|----------|
| Overlap alert | Schedule overlap chip from fixtures (`showOverlapChip` prop) |
| Now | Two action cards with source icons, badges, why-now; anchor card for 2pm prep |
| Later Today | Lower-weight card for standup notes |
| Quietly Handled | Expandable quiet rows with detail lines (expanded by default for static finals) |
| Sources | Marketing integration icons (Gmail, Calendar, Jira, …) |

Uses `ATTENTION_BOARD_FIXTURES_ACME`. No product imports, no live attention engine.

Desktop wiring passes `showOverlapChip={visual.showOverlapChip}` from overview scroll state.

---

## Acceptance checklist

- [x] Now, Later Today, and Quietly Handled are represented
- [x] Multiple ranked items are visible
- [x] Source badges and why-now reasoning are legible
- [x] Calendar overlap or timing context is shown
- [x] Final state works without animation
