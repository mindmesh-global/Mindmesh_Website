# P7-T02: `/terms` Marketing Shell

**Task ID:** P7-T02  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-10  
**Parent:** [phase-7-tasks.md](../phase-7-tasks.md) | [phase-7-launch.md](../phase-7-launch.md)  
**Depends on:** [P6-T13](../../phase-6/tasks/P6-T13-faq-privacy-marketing-shell.md), [P5-T02](../../phase-5/tasks/P5-T02-marketing-depth-layout.md), [P7-T01](./P7-T01-metadata-alignment.md)  
**Blocks:** P7-T12

---

## Goal

Wrap `/terms` in `MarketingDepthLayout` + `mm-*` tokens. Delete the CSS module. Add `/terms` to the marketing route gate. Preserve legal section copy.

---

## Deliverables

| File | Change |
|------|--------|
| [`app/terms/page.tsx`](../../../app/terms/page.tsx) | `MarketingDepthLayout` + section cards; privacy + contact links |
| [`app/terms/terms.module.css`](../../../app/terms/terms.module.css) | **Deleted** |
| [`lib/marketing-routes.ts`](../../../lib/marketing-routes.ts) | Added `/terms` to `MARKETING_FUNNEL_PATHS` |
| [`scripts/verify-marketing-routes.mjs`](../../../scripts/verify-marketing-routes.mjs) | Expect `/terms` |

Metadata from P7-T01 kept (`MindMesh | Terms of Service`).

---

## Before → after

| Item | Before | After |
|------|--------|-------|
| Shell | `SiteNav` + CSS module | `MarketingDepthLayout` + slim marketing shell |
| Tokens | Hard-coded blues in CSS | `mm-*` utilities |
| Route gate | `isMarketingRoute('/terms')` false | true |
| Privacy cross-link | Text only | Link to `/privacy` + contact form |

---

## Acceptance criteria

- [x] No `SiteNav` / Hero on `/terms`
- [x] Wrapped in `MarketingDepthLayout`
- [x] Sixteen legal sections preserved
- [x] `terms.module.css` deleted
- [x] `/terms` on marketing route gate
- [x] Verify script updated

---

## Verification

```text
node scripts/verify-marketing-routes.mjs → ok
isMarketingRoute('/terms') → true
```

---

## Next steps

- **P7-T06:** Developer docs Hero cleanup (blocker)
- Optional: P7-T03 / T04 / T05 / T11
