# P5-T14: Depth Page Lighthouse Spot-check

**Task ID:** P5-T14  
**Status:** done  
**Type:** QA / measurement  
**Completed:** 2026-07-09  
**Parent:** [phase-5-tasks.md](../phase-5-tasks.md) | [phase-5-depth-pages.md](../phase-5-depth-pages.md)  
**Depends on:** P5-T03–T08, [P1-T18](../../phase-1/tasks/P1-T18-perf-workflow.md)  
**Blocks:** P5-T15  
**Blocker:** No

---

## Goal

Manual mobile Lighthouse spot-check on each refactored funnel depth page. Record LCP, CLS, and INP proxy (long tasks). No hard performance gate.

---

## Deliverables

| Artifact | Path |
|----------|------|
| Summary | [`docs/phase-5/baselines/depth-pages-lighthouse.md`](../baselines/depth-pages-lighthouse.md) |
| Per-route JSON | `docs/phase-5/baselines/depth-*-lighthouse.json` (6 files) |

---

## Method

- Production build: `npm run build` + `npx next start -p 3003`
- Lighthouse 13.4.0, mobile, simulated throttling, performance category only
- One run per route (spot-check; not 3-run median)

---

## Headline results

| Route | LCP | CLS | Perf | Max long task |
|-------|-----|-----|------|---------------|
| `/connected-apps` | 3.3s | 0 | 92 | 90ms |
| `/inbox` | 5.4s | 0 | 77 | 67ms |
| `/yesterdays-narrative` | 2.8s | 0 | 96 | 80ms |
| `/upcoming-events` | 2.7s | 0 | 96 | 76ms |
| `/security` | 2.6s | 0 | 97 | 68ms |
| `/trust` | 2.7s | 0 | 96 | 66ms |

**CLS:** all pass. **INP proxy:** all long tasks &lt; 200ms. **LCP:** advisory only; `/inbox` is the clear outlier (depth H1 as LCP element).

---

## Acceptance criteria

- [x] Mobile Lighthouse on all six P5-T03–T08 routes
- [x] LCP, CLS, TBT, long-task proxy recorded in summary
- [x] JSON artifacts saved under `docs/phase-5/baselines/`
- [x] No hard gate enforced (documented as advisory)

---

## Next steps

- **P5-T15:** Phase 5 sign-off checklist
