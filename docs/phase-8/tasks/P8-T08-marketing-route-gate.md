# P8-T08: Expand Marketing Route Gate

**Task ID:** P8-T08  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-10  
**Parent:** [phase-8-tasks.md](../phase-8-tasks.md) | [phase-8-sensor-mascot.md](../phase-8-sensor-mascot.md)  
**Depends on:** [P8-T01](./P8-T01-ia-decision.md), [P5-T01](../../phase-5/tasks/P5-T01-marketing-route-gate.md)  
**Blocks:** P8-T10, P8-T12, P8-T14  
**Blocker:** Yes

---

## Goal

Add `/sensor` and `/mascot` to the slim marketing shell gate so upcoming depth pages do not mount live overlays, custom cursor, or legacy Hero providers. Product theaters on these routes are scroll demos only.

---

## Deliverables

| File | Change |
|------|--------|
| [`lib/marketing-routes.ts`](../../../lib/marketing-routes.ts) | Append `/sensor`, `/mascot` to `MARKETING_FUNNEL_PATHS` |
| [`scripts/verify-marketing-routes.mjs`](../../../scripts/verify-marketing-routes.mjs) | Expect both paths; assert legacy `/sensor&mascot` stays out |

No page UI in this task. `RootAppShell` already gates on `isMarketingRoute`; no shell change required.

---

## Funnel paths (locked after this task)

```ts
export const MARKETING_FUNNEL_PATHS = [
  '/',
  '/inbox',
  '/connected-apps',
  '/yesterdays-narrative',
  '/upcoming-events',
  '/security',
  '/trust',
  '/contact',
  '/billing',
  '/faq',
  '/privacy',
  '/terms',
  '/sensor',
  '/mascot',
] as const;
```

| Path | Slim shell? | Notes |
|------|-------------|--------|
| `/sensor`, `/mascot` | Yes | Scroll theaters only; no live Sensor/Mascot overlays |
| `/sensor&mascot` | No | Legacy; redirect shim in P8-T14 |

---

## Acceptance

- [x] `isMarketingRoute('/sensor')` and `isMarketingRoute('/mascot')` true (incl. trailing slash / query / hash)
- [x] `isMarketingRoute('/sensor&mascot')` false
- [x] Existing funnel paths unchanged
- [x] `RootAppShell` still uses `isMarketingRoute` (no homepage-only gate)
- [x] `node scripts/verify-marketing-routes.mjs` → ok
- [x] `npx tsc --noEmit` clean

---

## Verification

```bash
node scripts/verify-marketing-routes.mjs
# verify-marketing-routes: ok
```

---

## Handoff

| Next | Work |
|------|------|
| P8-T09 | `SensorTheaterDemo` |
| P8-T10 / P8-T12 | Depth pages under slim shell |
| P8-T14 | Legacy redirect + overlay allowlist (do not add `/sensor&mascot` to funnel) |
