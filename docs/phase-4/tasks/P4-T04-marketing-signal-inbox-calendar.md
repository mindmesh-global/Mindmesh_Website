# P4-T04: `MarketingSignalChips` + Inbox/Calendar Marketing Variants

**Task ID:** P4-T04  
**Status:** done  
**Type:** Component refactor + new build  
**Completed:** 2026-07-04  
**Parent:** [phase-4-tasks.md](../phase-4-tasks.md)  
**Depends on:** P3-T18, [P1-T23](../../phase-1/tasks/P1-T23-theater-reuse-map.md), [P1-T07](../../phase-1/tasks/P1-T07-theater-focus.md)  
**Blocks:** P4-T06

---

## Goal

Refactor `StaticInboxList` and `StaticCalendarEvents` for marketing fixtures; add `MarketingSignalChips` overlay for Focus theater beats.

---

## New component

### `MarketingSignalChips`

[`components/marketing/theater/marketing/MarketingSignalChips.tsx`](../../../components/marketing/theater/marketing/MarketingSignalChips.tsx)

| Prop | Purpose |
|------|---------|
| `chips` | `SIGNAL_FIXTURES_ACME` (Slack + Jira toasts) |
| `opacity` | Scroll-driven fade-in (0–1) for P4-T06 |
| `highlightIds` | Cross-highlight ring on linked chips (e.g. `jira-prod-142`) |

Exported from [`theater/index.ts`](../../../components/marketing/theater/index.ts).

---

## Refactored components

### `StaticInboxList`

[`components/dashboard/StaticInboxList.tsx`](../../../components/dashboard/StaticInboxList.tsx)

| Prop | Default (marketing) | Notes |
|------|---------------------|-------|
| `variant` | `'dashboard'` | Dashboard behavior unchanged |
| `messages` | `INBOX_FIXTURES_ACME` | 3 Acme rows |
| `maxRows` | `3` | Theater crowded inbox |
| `interactive` | `false` | No expand/dropdown in theater |
| `dimmed` | `false` | `opacity: 0.35` when true (beat 0.50+) |
| `highlightIds` | `[]` | Ring on Dana thread (`dana`) |

Marketing panel: compact dark theme, unread dots, QA attrs `data-inbox-message-id`, `data-inbox-highlight`.

### `StaticCalendarEvents`

[`components/dashboard/StaticCalendarEvents.tsx`](../../../components/dashboard/StaticCalendarEvents.tsx)

| Prop | Default (marketing) | Notes |
|------|---------------------|-------|
| `variant` | `'dashboard'` | Dashboard behavior unchanged |
| `events` | `CALENDAR_FIXTURES_ACME` | Standup + client call |
| `hideJoinButtons` | `true` | No join CTA in theater |
| `dimmed` | `false` | Matches inbox dimming |
| `highlightIds` | `[]` | Ring on `client-call` event |

---

## Fixtures (unchanged)

From [`lib/marketing-demo-data.ts`](../../../lib/marketing-demo-data.ts):

- `INBOX_FIXTURES_ACME` (3 rows)
- `CALENDAR_FIXTURES_ACME` (2 events)
- `SIGNAL_FIXTURES_ACME` (Slack + Jira chips)

---

## Checklist

- [x] `MarketingSignalChips` with Slack/Jira icons + opacity prop
- [x] `StaticInboxList` marketing variant (`variant="marketing"`)
- [x] `StaticCalendarEvents` marketing variant
- [x] Dashboard defaults preserved
- [x] `dimmed` + `highlightIds` props per P1-T23
- [x] Composed in `FocusTheaterDemo` (P4-T06)

---

## Next steps

- **P4-T05:** `MarketingPriorityCard`
- **P4-T06:** `FocusTheaterDemo` composes inbox + calendar + chips + priority card
