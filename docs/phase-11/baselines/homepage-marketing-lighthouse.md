# Marketing homepage Lighthouse baseline (Phase 11)

**Captured:** 2026-07-12 (local production build)  
**URL:** `http://127.0.0.1:3015/` (`next build` + `npx next start -p 3015 -H 127.0.0.1`)  
**Page:** Marketing homepage after Product Overview (P11-T11–T13)  
**Purpose:** Revisit vs [Phase 6](../../phase-6/baselines/homepage-marketing-lighthouse.md) and [P1-T17](../../phase-1/tasks/P1-T17-performance-budget.md)

---

## How to capture

```bash
npm run build
npx next start -p 3015 -H 127.0.0.1
# separate terminal, 3 runs:
npx lighthouse http://127.0.0.1:3015/ \
  --preset=perf \
  --form-factor=mobile \
  --throttling-method=simulate \
  --only-categories=performance \
  --chrome-flags="--headless=new --no-sandbox --disable-gpu" \
  --output=json \
  --output-path=docs/phase-11/baselines/homepage-marketing-lcp-runN.json
```

Record median of 3 runs by LCP.

---

## Results

| Metric | Run 1 | Run 2 | Run 3 | **Median** | P1-T17 / LHCI | Pass? |
|--------|-------|-------|-------|------------|---------------|-------|
| LCP (s) | 2.44 | 2.93 | 2.92 | **2.92** | Soft ≤ 3.5s; hard &lt; 2.5s | Soft Yes / hard No |
| CLS | 0 | 0 | 0 | **0** | &lt; 0.1 | Yes |
| TBT (ms) | 64 | 56 | 63 | **63** | advisory | Yes |
| Performance score | 0.98 | 0.95 | 0.95 | **0.95** | advisory ≥ 0.85 | Yes |
| Total script transfer (KiB) | 385 | 385 | 385 | **385** | trend | +46 vs P6 |

**Environment:** Chrome Headless · Lighthouse (npx) · macOS · simulated mobile throttling

**LCP element (median):** Hero H1 `#hero-heading` / `section#hero > … > h1#hero-heading`

**LCP breakdown (median):** TTFB ~15ms · element render delay ~86ms

**Forbidden modules on `/` network:** none (no Lottie / Tauri)

**Artifacts:**

- Median JSON: [`homepage-marketing-lcp-median.json`](./homepage-marketing-lcp-median.json) (run 3)
- Runs: [`run1`](./homepage-marketing-lcp-run1.json), [`run2`](./homepage-marketing-lcp-run2.json), [`run3`](./homepage-marketing-lcp-run3.json)
- QA write-up: [P11-T14](../tasks/P11-T14-product-overview-qa.md)

---

## Delta vs Phase 6

| Metric | Phase 6 | **Phase 11** | Delta |
|--------|---------|--------------|-------|
| LCP (s) | 2.93 | **2.92** | ~flat |
| CLS | 0 | **0** | same |
| TBT (ms) | 62 | **63** | ~flat |
| Performance score | 95 | **95** | same |
| Script KiB | 339 | **385** | +46 (overview chunks) |
| LCP element | H1 | **H1** | same |

---

## Gate decision

Soft Lighthouse CI ceiling (LCP ≤ 3.5s, CLS ≤ 0.1, score ≥ 0.85) **passes**.  
P1-T17 hard LCP &lt; 2.5s remains open under the Phase 6 signed exception; Phase 11 does not worsen the median.
