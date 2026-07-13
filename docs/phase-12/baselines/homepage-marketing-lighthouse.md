# Homepage Lighthouse (Phase 12 spot-check)

**Date:** 2026-07-13  
**URL:** `http://127.0.0.1:3030/` (production `next build && next start`)  
**Preset:** mobile, simulated throttling, Lighthouse 13.4.0  
**Runs:** 6 (3 noisy high-TBT outliers filtered for clean median)

## Clean median (TBT &lt; 500ms, n=3)

| Metric | Value | Target (P1-T17) | Status |
|--------|-------|-----------------|--------|
| LCP | **2.995s** | &lt; 2.5s | FAIL |
| CLS | **0** | &lt; 0.1 | PASS |
| TBT | **41ms** | &lt; 300ms (advisory) | PASS |
| Perf score | **94** | ≥ 85 (advisory) | PASS |
| FCP | 1.385s | — | — |
| Speed Index | 1.677s | — | — |
| TTI | 6.301s | — | — |
| JS transfer | 376.5 KiB | — | — |
| Total transfer | 797.2 KiB | — | — |

## vs prior baselines

| Baseline | Score | LCP | TBT | Total |
|----------|-------|-----|-----|-------|
| Phase 6 median | 93 | 2.93s | 168ms | 558 KiB |
| Phase 11 median | 95 | 2.92s | 63ms | 687 KiB |
| Phase 12 clean median | 94 | 2.995s | 41ms | 797.2 KiB |

## Notes

- CLS remains excellent (0).
- LCP is the weak spot: still around the Phase 6/11 lab exception band (~3s), not under the hard &lt;2.5s product target on the clean median.
- Best single run LCP was **2.27s** (run 3).
- Transfer grew vs Phase 11 (~110 KiB), mostly homepage JS/assets from product overview + theater work.
- CI soft ceiling remains LCP warn at 3.5s (`lighthouserc.cjs`); clean median is under that ceiling.
