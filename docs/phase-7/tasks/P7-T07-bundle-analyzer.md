# P7-T07: Bundle Analyzer Spot-Check

**Task ID:** P7-T07  
**Status:** done  
**Type:** Tooling / verification  
**Completed:** 2026-07-10  
**Parent:** [phase-7-tasks.md](../phase-7-tasks.md) | [phase-7-launch.md](../phase-7-launch.md)  
**Depends on:** [P1-T17](../../phase-1/tasks/P1-T17-performance-budget.md), [P1-T18](../../phase-1/tasks/P1-T18-perf-workflow.md)  
**Blocks:** —  
**Blocker:** No

---

## Goal

Wire `@next/bundle-analyzer` (missing before this task) and confirm Framer Motion / theater demos are not in the main homepage `/` sync chunk. Record a short baseline note.

---

## Deliverables

| File | Change |
|------|--------|
| [`package.json`](../../../package.json) | `devDependency` `@next/bundle-analyzer`; script `analyze` |
| [`next.config.js`](../../../next.config.js) | Wrap config with analyzer (`ANALYZE=true`, `openAnalyzer: false`) |
| [`docs/phase-7/baselines/homepage-bundle-analyzer.md`](../baselines/homepage-bundle-analyzer.md) | Spot-check results |
| [`app/dashboard/page.tsx`](../../../app/dashboard/page.tsx) | Incidental: default export no longer accepts custom props (Next 16 `PageProps` constraint blocked analyze finish) |

---

## How to run

```bash
npm run analyze
```

Uses `ANALYZE=true next build --webpack` so webpack-bundle-analyzer can emit HTML under `.next/analyze/` (Turbopack default build does not drive this plugin). Reports are gitignored via `/.next/`.

Optional Turbopack-native UI (no extra package): `npx next build --experimental-analyze`.

---

## Results (2026-07-10)

- **Pass:** `/` sync chunks clean of `framer-motion`, theater demo bodies, and `dotlottie`.
- Theater UIs load only via `MarketingTheaterSections` → `next/dynamic` async chunks.
- Homepage theater scroll kit does **not** import `framer-motion` anymore; Framer still appears on `/dashboard` (`535-*.js` ~117 KB), which is expected.
- Full table: [homepage-bundle-analyzer.md](../baselines/homepage-bundle-analyzer.md).

---

## Acceptance

- [x] `@next/bundle-analyzer` installed and gated on `ANALYZE`
- [x] `npm run analyze` completes
- [x] Framer / theater demos confirmed off `/` main sync chunk
- [x] Baseline note written under `docs/phase-7/baselines/`
