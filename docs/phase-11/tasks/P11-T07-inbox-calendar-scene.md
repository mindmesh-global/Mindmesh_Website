# P11-T07: Email + Upcoming Events Scene

**Task ID:** P11-T07  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-12  
**Parent:** [phase-11-tasks.md](../../phase-11-tasks.md) | [phase-11-product-overview.md](../../phase-11-product-overview.md)  
**Depends on:** [P11-T05](./P11-T05-overview-shell.md), [P11-T03](./P11-T03-product-fixtures.md)  
**Blocks:** P11-T10, P11-T13  
**Blocker:** Yes

---

## Goal

Replace the inbox/calendar placeholder with a product-true communication scene: folder hierarchy, thread list, focused email detail, upcoming events, and approval-aware framing for writes.

---

## Output

[`components/marketing/product-overview/scenes/InboxCalendarOverviewScene.tsx`](../../../components/marketing/product-overview/scenes/InboxCalendarOverviewScene.tsx)

---

## What shipped

| Element | Behavior |
|---------|----------|
| Folder strip | Inbox / All / Sent / Drafts with counts; Inbox active; decorative |
| Thread list | Reuses `StaticInboxList` marketing variant + Acme fixtures |
| Focused email | Dana Q2 rollout detail with unread + **Needs approval** badge |
| Upcoming events | Reuses `StaticCalendarEvents` marketing; Join hidden |
| Approval copy | Fixture `approvalHint`; no live send / schedule |

Uses `INBOX_CALENDAR_SCENE_FIXTURES_ACME`. No product / OAuth imports.

---

## Acceptance checklist

- [x] Inbox hierarchy resembles the current desktop product
- [x] All / Sent / Drafts are represented without implying live controls
- [x] One focused message exposes useful context
- [x] Upcoming event state is visible
- [x] Any send or write action is shown as approval-aware
