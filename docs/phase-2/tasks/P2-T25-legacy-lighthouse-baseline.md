# P2-T25: Capture Legacy Lighthouse Baseline

**Task ID:** P2-T25  
**Status:** done  
**Type:** Measurement  
**Completed:** 2026-07-03  
**Parent:** [phase-2-tasks.md](../phase-2-tasks.md)  
**Depends on:** [P1-T18](../phase-1/tasks/P1-T18-perf-workflow.md)  
**Blocks:** P2-T26 (recommended comparison target)

---

## Quick reference

| Field | Value |
|-------|-------|
| **Baseline doc** | [`homepage-legacy-lighthouse.md`](../phase-1/baselines/homepage-legacy-lighthouse.md) |
| **JSON artifact** | [`homepage-legacy-lighthouse.json`](../phase-1/baselines/homepage-legacy-lighthouse.json) |
| **Page under test** | git HEAD legacy Hero (`app/page.tsx` + `app/layout.tsx`) |

---

## Capture summary

| Metric | Median | P1-T17 target | Pass? |
|--------|--------|---------------|-------|
| LCP | **6.39s** | < 2.5s | No |
| CLS | **0** | < 0.1 | Yes |
| TBT | **510ms** | advisory | High |
| Performance score | **61** | advisory ≥ 85 | No |
| Total JS | **461 KiB** | decrease after Phase 2 | Baseline |

**LCP element:** Hero window H1 — *"Your private AI command center for work."*

---

## Method

1. Temporarily restored git HEAD `app/page.tsx` and `app/layout.tsx` (marketing changes were local uncommitted).
2. Added `RESEND_API_KEY=re_baseline_placeholder` in `.env.local` for production build.
3. `npm run build` + `npm run start` on port 3002.
4. Lighthouse CLI × 3 (mobile, simulated throttling, perf preset).
5. Restored marketing `app/page.tsx` and `app/layout.tsx`.

---

## Acceptance criteria

- [x] Median of 3 mobile Lighthouse runs recorded
- [x] LCP element noted for legacy Hero
- [x] JSON artifact committed under `docs/phase-1/baselines/`

---

## Next step

**P2-T26:** Run the same workflow on the marketing homepage and compare medians in `docs/phase-2/baselines/homepage-marketing-lighthouse.md`.
