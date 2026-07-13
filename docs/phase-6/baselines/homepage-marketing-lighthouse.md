# Marketing homepage Lighthouse baseline (Phase 6)

**Captured:** 2026-07-09 (local production build)  
**URL:** `http://127.0.0.1:3003/` (`next build` + `npx next start -p 3003`)  
**Page:** Marketing homepage after P6-T07 Hero deletion + P6-T08 font/LCP strategy  
**Purpose:** Re-baseline vs [Phase 3 LCP](../../phase-3/baselines/) and [P1-T17](../../phase-1/tasks/P1-T17-performance-budget.md)

---

## How to capture

```bash
npm run build
npx next start -p 3003
# separate terminal, 3 runs:
npx lighthouse http://127.0.0.1:3003/ \
  --preset=perf \
  --form-factor=mobile \
  --throttling-method=simulate \
  --only-categories=performance \
  --chrome-flags="--headless --no-sandbox --disable-gpu" \
  --output=json \
  --output-path=docs/phase-6/baselines/homepage-marketing-lcp-runN.json
```

Record median of 3 runs.

---

## Results

| Metric | Run 1 | Run 2 | Run 3 | **Median** | P1-T17 target | Pass? |
|--------|-------|-------|-------|------------|---------------|-------|
| LCP (s) | 2.94 | 2.93 | 2.92 | **2.93** | < 2.5 | **No** |
| CLS | 0 | 0 | 0 | **0** | < 0.1 | Yes |
| TBT (ms) | 62 | 168 | 57.5 | **62** | advisory | Yes |
| Performance score | 95 | 93 | 95 | **95** | advisory ≥ 85 | Yes |
| Total JS (KiB) | 339 | 339 | 339 | **339** | decrease vs legacy | Yes |
| Long tasks (count) | 5 | 4 | 4 | **4** | INP proxy | Yes |

**Environment:** Chrome Headless 150 · Lighthouse 13.4.0 · macOS (local) · simulated mobile throttling

**LCP element (all runs):** Hero H1 `#hero-heading` / `.hero-lcp` — *"The Cognitive Layer for modern work"*  
(`section#hero > div.mx-auto > div.max-w-[720px] > h1#hero-heading`)

**LCP breakdown (median run):** TTFB ~16ms · element render delay ~109ms

**Artifacts:**

- Median run JSON: [`homepage-marketing-lcp-median.json`](./homepage-marketing-lcp-median.json) (run 2 by LCP sort)
- All runs: [`run1`](./homepage-marketing-lcp-run1.json), [`run2`](./homepage-marketing-lcp-run2.json), [`run3`](./homepage-marketing-lcp-run3.json)

---

## Delta vs prior phases

| Metric | Phase 2 | Phase 3 | **Phase 6** | Delta vs P3 |
|--------|---------|---------|-------------|-------------|
| LCP (s) | 4.81 | 4.06 | **2.93** | **-1.13s (28%)** |
| CLS | 0 | 0 | **0** | same |
| TBT (ms) | 74 | 45.5 | **62** | +16.5ms (still fine) |
| Performance score | 79 | 84 | **95** | **+11** |
| Total JS (KiB) | 439 | 335 | **339** | ~flat |
| LCP element | thesis `<p>` | thesis `<p>` | **H1** | P6-T08 goal met |

---

## Gate decision

P1-T17 LCP &lt; 2.5s still **fails** (median **2.93s**). See [P6-T09](../tasks/P6-T09-homepage-lighthouse-rebaseline.md) for the signed exception: H1 is now the LCP element, LCP improved ~28% vs Phase 3, and further gains need image/CDN or deeper JS cuts (P6-T12), not more font tweaks alone.
