# P6-T05: `/billing` Marketing Shell Alignment

**Task ID:** P6-T05  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-09  
**Parent:** [phase-6-tasks.md](../phase-6-tasks.md) | [phase-6-polish.md](../phase-6-polish.md)  
**Depends on:** [P5-T02](../../phase-5/tasks/P5-T02-marketing-depth-layout.md)  
**Blocks:** P6-T15

---

## Goal

Move `/billing` onto the marketing depth shell and `mm-*` tokens. Remove `SiteNav` and the page-local CSS module. No Hero.

---

## Deliverables

| File | Change |
|------|--------|
| [`app/billing/page.tsx`](../../../app/billing/page.tsx) | `MarketingDepthLayout` + plans section |
| [`BillingPlansClient.tsx`](../../../app/billing/BillingPlansClient.tsx) | Tailwind `mm-*` restyle; waitlist via `MARKETING_CTA_HREF` |
| [`billing.module.css`](../../../app/billing/billing.module.css) | **Deleted** |
| [`lib/marketing-routes.ts`](../../../lib/marketing-routes.ts) | Added `/billing` to `MARKETING_FUNNEL_PATHS` |
| [`scripts/verify-marketing-routes.mjs`](../../../scripts/verify-marketing-routes.mjs) | Expect `/billing` |

---

## Before → after

| Item | Before | After |
|------|--------|-------|
| Shell | `SiteNav` + custom dark CSS | `MarketingDepthLayout` + slim marketing shell |
| Tokens | Hard-coded blues in CSS module | `mm-*` utilities |
| Route gate | Legacy `LegacyAppShell` | `isMarketingRoute('/billing')` → true |
| Features link | Inline hero lead → `/#features` | Depth `backHref` / `backLabel` |

---

## Page structure

1. Depth hero: Plans & billing · Simple pricing… · Explore the product → `/#features`  
2. Monthly / yearly toggle  
3. Free / Pro / Enterprise plan cards  
4. Billing notes: waitlist (`/#cta`) + Terms

---

## Acceptance criteria

- [x] No `SiteNav` / Hero on `/billing`
- [x] Wrapped in `MarketingDepthLayout`
- [x] Plans UI uses marketing tokens (no CSS module)
- [x] `/billing` on marketing route gate
- [x] Verify script updated
- [x] HTTP 200; MarketingNav present

---

## Verification

```text
200 /billing
MarketingNav + "Simple pricing" present
SiteNav / Hero absent
node scripts/verify-marketing-routes.mjs → ok
```

---

## Next steps

- **P6-T06:** Clean Hero route lists (blocker path)
- Optional later: FAQ / privacy shell (P6-T13)
