# P5-T03: `/connected-apps` 7-App Refactor

**Task ID:** P5-T03  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-09  
**Parent:** [phase-5-tasks.md](../phase-5-tasks.md) | [phase-5-depth-pages.md](../phase-5-depth-pages.md)  
**Depends on:** [P5-T02](./P5-T02-marketing-depth-layout.md), [P1-T20](../../phase-1/tasks/P1-T20-integrations-audit.md)  
**Blocks:** P5-T09, P5-T10, P5-T15

---

## Goal

Migrate `/connected-apps` onto `MarketingDepthLayout`, replace the 5-app Lucide list with [`MARKETING_INTEGRATIONS`](../../../lib/marketing-integrations.ts) (7 apps + PNG icons), and align copy/metadata with the homepage Connect narrative.

---

## Deliverables

| File | Change |
|------|--------|
| [`app/connected-apps/page.tsx`](../../../app/connected-apps/page.tsx) | Full rewrite: depth layout, 7-app grid, marketing tokens |
| `app/connected-apps/connected-apps.module.css` | **Deleted** (replaced by Tailwind `mm-*` utilities) |

---

## Before → after

| Item | Before | After |
|------|--------|-------|
| Shell | `SiteNav` + local CSS page | `MarketingDepthLayout` |
| Font | Per-page `Manrope` `@next/font` | Root `--font-manrope` / `font-display` |
| Apps | 5 Lucide icons (no Slack/Jira) | 7 from `MARKETING_INTEGRATIONS` |
| Icons | Lucide Mail / Calendar / Workflow | PNG icons under `/images/icons/` |
| Theme | Hardcoded hex in CSS module | `mm-*` marketing tokens |
| Metadata | Email/calendar-only description | Names Slack + Jira + full 7-app set |

---

## Page structure

1. **Depth hero** (layout): Connectivity · Connect the tools you already use · sources subtitle · link to `/#connect`
2. **Supported apps:** 7-card grid from `MARKETING_INTEGRATIONS`
3. **Workflow cards:** email/calendar, Slack/Jira, priority, execute
4. **Access / privacy:** read-only note + link to `/security`
5. **CTA:** Join waitlist → `/#cta`

---

## Acceptance criteria

- [x] Wrapped in `MarketingDepthLayout` (no `SiteNav`)
- [x] All 7 integrations rendered with canonical names and categories
- [x] PNG icons from `MARKETING_INTEGRATIONS` (no Lucide app placeholders)
- [x] No per-page Manrope import
- [x] Local CSS module removed
- [x] Metadata mentions Slack and Jira
- [x] Cross-links to `/#connect`, `/security`, `/#cta`
- [x] HTTP 200 on `/connected-apps`

---

## Verification

```text
200 /connected-apps
Gmail, Google Calendar, Outlook Email, Outlook Calendar, SMTP, Slack, Jira present
MarketingNav present; SiteNav / Manrope absent from HTML
```

---

## Next steps

- **P5-T04:** `/inbox` marketing alignment — [done](./P5-T04-inbox-alignment.md)
- **P5-T05:** `/yesterdays-narrative` alignment
- **P5-T09 / P5-T10:** FAQ + privacy copy can reuse the same 7-app list
