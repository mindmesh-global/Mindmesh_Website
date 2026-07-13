# P5-T09: FAQ Integration Copy (7 Apps)

**Task ID:** P5-T09  
**Status:** done  
**Type:** Copy  
**Completed:** 2026-07-09  
**Parent:** [phase-5-tasks.md](../phase-5-tasks.md) | [phase-5-depth-pages.md](../phase-5-depth-pages.md)  
**Depends on:** [P5-T03](./P5-T03-connected-apps-refactor.md), [P1-T20](../../phase-1/tasks/P1-T20-integrations-audit.md)  
**Blocks:** P5-T15  
**Blocker:** No

---

## Goal

Update the FAQ "Which apps can I connect?" answer to list all 7 production integrations from `MARKETING_INTEGRATIONS`.

---

## Deliverables

| File | Change |
|------|--------|
| [`app/faq/page.tsx`](../../../app/faq/page.tsx) | Integration answer sourced from `MARKETING_INTEGRATIONS`; link to `/connected-apps` |

**Out of scope:** Full FAQ shell migration to `MarketingDepthLayout` (FAQ is not in the marketing route gate yet). Sensor/Mascot FAQ items left for a later pass.

---

## Before → after

| Item | Before | After |
|------|--------|-------|
| App list | Gmail, Google Calendar, Outlook Email, Outlook Calendar, SMTP mailbox (5) | All 7 via `MARKETING_INTEGRATIONS` (adds Slack, Jira; SMTP Mailbox naming) |
| Source of truth | Hardcoded string | `MARKETING_INTEGRATIONS.map(...).join(', ')` |
| Depth link | None | "View connected apps →" → `/connected-apps` |

---

## Acceptance criteria

- [x] FAQ integration answer includes Slack and Jira
- [x] Names match `MARKETING_INTEGRATIONS` display names
- [x] Link to `/connected-apps` present
- [x] HTTP 200 on `/faq`

---

## Verification

```text
200 /faq
Slack, Jira, SMTP Mailbox, View connected apps present
```

---

## Next steps

- **P5-T10:** Privacy third-party services list (non-blocker)
- **P5-T11:** Cross-link + nav consistency (blocker path)
