# P2-T26: Phase 2 Lighthouse Verification

**Task ID:** P2-T26  
**Status:** done  
**Type:** Measurement  
**Completed:** 2026-07-03  
**Parent:** [phase-2-tasks.md](../phase-2-tasks.md)  
**Depends on:** P2-T07, P1-T17, P1-T18, P2-T25  
**Blocks:** P2-T27

---

## Quick reference

| Field | Value |
|-------|-------|
| **Baseline doc** | [`homepage-marketing-lighthouse.md`](../baselines/homepage-marketing-lighthouse.md) |
| **Legacy comparison** | [homepage-legacy-lighthouse.md](../../phase-1/baselines/homepage-legacy-lighthouse.md) |
| **Gate outcome** | **Partial pass** — CLS, bundle, legacy improvement pass; **LCP fails** |

---

## Median results (mobile, simulated)

| Metric | Marketing | Legacy | Target | Pass? |
|--------|-----------|--------|--------|-------|
| LCP | **4.81s** | 6.39s | < 2.5s | **No** |
| CLS | **0** | 0 | < 0.1 | Yes |
| TBT | **74ms** | 510ms | advisory | Yes |
| Perf score | **79** | 61 | ≥ 85 advisory | Improved |
| Total JS | **439 KiB** | 461 KiB | decrease | Yes |

---

## Acceptance criteria

- [x] Median of 3 mobile Lighthouse runs recorded
- [ ] LCP < 2.5s — **4.81s (fail)**
- [x] CLS < 0.1
- [x] INP proxy: no long tasks ≥ 200ms in hero path (max 87ms)
- [x] No mascot / Lottie / cursor JS on `/`
- [x] Score improvement vs legacy baseline (advisory)
- [x] Theater chunks split (async chunks verified in build output)

---

## Method

1. `npm run build` (marketing homepage)
2. `npx next start -p 3003`
3. Lighthouse CLI × 3 (`--preset=perf`, mobile, simulated throttling)
4. Compared medians to P2-T25 legacy baseline
5. Inspected `.next/static/chunks` for theater split and absence of Hero/Lottie

---

## Blockers for P2-T27

**LCP gate must be addressed before Phase 2 sign-off.** Recommended quick wins documented in baseline doc: defer GA, tune font preloads, align LCP element to H1.

---

## Next step

**P2-T27** sign-off checklist — performance row blocked until LCP < 2.5s or budget revision is approved.
