# P5-T10: Privacy Third-Party Services List

**Task ID:** P5-T10  
**Status:** done  
**Type:** Copy / legal alignment  
**Completed:** 2026-07-09  
**Parent:** [phase-5-tasks.md](../phase-5-tasks.md) | [phase-5-depth-pages.md](../phase-5-depth-pages.md)  
**Depends on:** [P5-T03](./P5-T03-connected-apps-refactor.md), [P1-T20](../../phase-1/tasks/P1-T20-integrations-audit.md)  
**Blocks:** P5-T15  
**Blocker:** No

---

## Goal

Name Slack, Jira, and Atlassian in the privacy policy third-party services section so legal copy matches the 7-app product surface.

---

## Deliverables

| File | Change |
|------|--------|
| [`app/privacy/page.tsx`](../../../app/privacy/page.tsx) | OAuth / third-party / use-of-data copy updated for Slack + Atlassian (Jira) |

**Out of scope:** Full privacy page shell migration to `MarketingDepthLayout` (privacy is not in the marketing route gate yet).

---

## Before → after

| Item | Before | After |
|------|--------|-------|
| OAuth credentials | Google, Microsoft | Google, Microsoft, Slack, Atlassian |
| Connected data | Email and calendar only | Email, calendar, messaging, and task accounts |
| §5 Third-party list | Google Gmail, Google Calendar, Microsoft Outlook | Google, Microsoft, Slack, Atlassian (Jira), SMTP |
| Processor links | OpenAI only | + Slack privacy policy + Atlassian privacy policy |

---

## Acceptance criteria

- [x] Slack named as a third-party connection / processor
- [x] Jira named via Atlassian (Jira)
- [x] Atlassian named with privacy policy link
- [x] OAuth credentials list includes Slack and Atlassian
- [x] HTTP 200 on `/privacy`

---

## Verification

```text
200 /privacy
Slack, Jira, Atlassian, slack.com/trust/privacy, atlassian.com/legal/privacy-policy present
```

---

## Next steps

- **P5-T11:** Cross-link + nav consistency (blocker path)
