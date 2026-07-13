# P5-T01: Expand Marketing Route Gate

**Task ID:** P5-T01  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-09  
**Parent:** [phase-5-tasks.md](../phase-5-tasks.md) | [phase-5-depth-pages.md](../phase-5-depth-pages.md)  
**Depends on:** [P4-T14](../../phase-4/tasks/P4-T14-sign-off.md), [P2-T06](../../phase-2/tasks/P2-T06-root-layout-marketing-branch.md)  
**Blocks:** P5-T02, P5-T03–T08

---

## Goal

Extend the slim marketing shell from `/` only to the Phase 5 primary funnel depth routes, so those pages do not mount mascot, sensor, custom cursor, or legacy Hero providers.

---

## Deliverables

| File | Change |
|------|--------|
| [`lib/marketing-routes.ts`](../../../lib/marketing-routes.ts) | `MARKETING_FUNNEL_PATHS`, `isMarketingRoute`, `normalizeMarketingPathname`; keep `isMarketingHomepage` for GA deferral |
| [`components/layout/RootAppShell.tsx`](../../../components/layout/RootAppShell.tsx) | Gate on `isMarketingRoute` instead of homepage-only |
| [`scripts/verify-marketing-routes.mjs`](../../../scripts/verify-marketing-routes.mjs) | Path-list + shell wiring verification (no Jest in repo) |
| [`components/layout/SiteNav.tsx`](../../../components/layout/SiteNav.tsx) | Use `useOptionalDashboardViewMode` so depth pages work without legacy provider until P5-T02 |

---

## Funnel paths (locked)

```ts
export const MARKETING_FUNNEL_PATHS = [
  '/',
  '/inbox',
  '/connected-apps',
  '/yesterdays-narrative',
  '/upcoming-events',
  '/security',
  '/trust',
] as const;
```

| Helper | Behavior |
|--------|----------|
| `isMarketingHomepage` | `/` only (unchanged; used by `DeferredGoogleAnalytics`) |
| `isMarketingRoute` | Homepage + six depth routes |
| `normalizeMarketingPathname` | Strips query/hash and trailing slash |

**Not gated yet (by design):** `/faq`, `/privacy` (copy-only in P5-T09/T10; may still use legacy shell until later).

---

## Acceptance criteria

- [x] `isMarketingRoute` returns true for all seven funnel paths
- [x] Trailing slash / query / hash variants normalize correctly
- [x] Non-funnel routes (`/faq`, `/dashboard`, etc.) remain false
- [x] `RootAppShell` uses `isMarketingRoute` for slim shell
- [x] `isMarketingHomepage` preserved for homepage-only GA deferral
- [x] Verification script passes: `node scripts/verify-marketing-routes.mjs`

---

## Verification

```bash
node scripts/verify-marketing-routes.mjs
# verify-marketing-routes: ok
```

Typecheck: `npx tsc --noEmit` (pass).

---

## Notes

- Depth pages still render their own `SiteNav` / local CSS until P5-T02–T08 migrate them onto `MarketingDepthLayout`. This task only removes legacy chrome from the root shell.
- Expanding the gate exposed that `SiteNav` required `DashboardViewModeProvider`. Switched to `useOptionalDashboardViewMode` so funnel pages do not 500 before P5-T02 replaces `SiteNav` with `MarketingNav`.
- Expanding FAQ/privacy into the funnel gate is deferred until those pages are intentionally moved onto the marketing shell.

---

## Next steps

- **P5-T02:** `MarketingDepthLayout` shared wrapper — [done](./P5-T02-marketing-depth-layout.md)
- **P5-T03:** `/connected-apps` 7-app refactor
