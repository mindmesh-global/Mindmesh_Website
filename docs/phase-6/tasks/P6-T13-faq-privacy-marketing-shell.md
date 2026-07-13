# P6-T13: FAQ + Privacy Marketing Shell

**Task ID:** P6-T13  
**Status:** done  
**Type:** Implementation (optional polish)  
**Completed:** 2026-07-09  
**Parent:** [phase-6-tasks.md](../phase-6-tasks.md) | [phase-6-polish.md](../phase-6-polish.md)  
**Depends on:** [P5-T09](../../phase-5/tasks/P5-T09-faq-integration-copy.md), [P5-T10](../../phase-5/tasks/P5-T10-privacy-third-party-list.md), [P5-T02](../../phase-5/tasks/P5-T02-marketing-depth-layout.md)  
**Blocks:** —  
**Blocker:** No

---

## Goal

Wrap `/faq` and `/privacy` in `MarketingDepthLayout` so legal/support pages match the marketing depth shell. Keep existing 7-app FAQ copy and Slack/Jira privacy third-party language.

---

## Deliverables

| File | Change |
|------|--------|
| [`app/faq/page.tsx`](../../../app/faq/page.tsx) | `MarketingDepthLayout` + `mm-*` accordion; waitlist CTA |
| [`app/privacy/page.tsx`](../../../app/privacy/page.tsx) | `MarketingDepthLayout` + `mm-*` sections; copy preserved |
| [`app/privacy/privacy.module.css`](../../../app/privacy/privacy.module.css) | **Deleted** |
| [`lib/marketing-routes.ts`](../../../lib/marketing-routes.ts) | Added `/faq`, `/privacy` to `MARKETING_FUNNEL_PATHS` |
| [`scripts/verify-marketing-routes.mjs`](../../../scripts/verify-marketing-routes.mjs) | Expect `/faq`, `/privacy` |

---

## Before → after

| Item | Before | After |
|------|--------|-------|
| FAQ shell | `SiteNav` + hard-coded blues | `MarketingDepthLayout` + slim marketing shell |
| Privacy shell | `SiteNav` + CSS module | Same depth shell; no CSS module |
| Route gate | `isMarketingRoute` false | true for both |
| FAQ CTA | Empty / commented Try button | Join waitlist → `/#cta` + security link |

---

## Acceptance criteria

- [x] No `SiteNav` / Hero on `/faq` or `/privacy`
- [x] Both wrapped in `MarketingDepthLayout`
- [x] FAQ still lists 7 apps + `/connected-apps` link
- [x] Privacy still names Slack, Jira, Atlassian (+ processor links)
- [x] `/faq` and `/privacy` on marketing route gate
- [x] Verify script updated
- [x] HTTP 200; marketing theme present

---

## Verification

```text
node scripts/verify-marketing-routes.mjs → ok
200 /faq · data-marketing-theme · Slack · /connected-apps · <details>
200 /privacy · data-marketing-theme · slack.com/trust/privacy · Atlassian · Jira
SiteNav / faq-page-shell / privacy.module.css absent
```

---

## Next steps

- Optional **P6-T14:** `content-visibility` below-fold
- **P6-T15:** Phase 6 sign-off (or optional **P6-T11** metadata)
