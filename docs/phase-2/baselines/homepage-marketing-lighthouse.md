# Marketing homepage Lighthouse baseline (Phase 2)

**Captured:** 2026-07-03 (local production build)  
**URL:** `http://localhost:3003/` (production `next start`, marketing homepage)  
**Page:** [`MarketingLayout`](../../components/marketing/MarketingLayout.tsx) + 10 sections  
**Purpose:** Phase 2 verification vs [legacy baseline](../phase-1/baselines/homepage-legacy-lighthouse.md)

---

## How to capture

```bash
npm run build
npx next start -p 3003
# separate terminal, 3 runs:
npx lighthouse http://localhost:3003 \
  --preset=perf \
  --form-factor=mobile \
  --throttling-method=simulate \
  --output=json \
  --output-path=docs/phase-2/baselines/homepage-marketing-lighthouse.json
```

Record median of 3 runs.

---

## Results

| Metric | Run 1 | Run 2 | Run 3 | **Median** | P1-T17 target | Pass? |
|--------|-------|-------|-------|------------|---------------|-------|
| LCP (s) | 4.81 | 4.81 | 4.81 | **4.81** | < 2.5 | **No** |
| CLS | 0 | 0 | 0 | **0** | < 0.1 | Yes |
| TBT (ms) | 78 | 74 | 56 | **74** | advisory | Yes (vs legacy 510) |
| Performance score | 79 | 79 | 79 | **79** | advisory ≥ 85 | Improved vs legacy |
| Total JS (KiB) | 439 | 439 | 439 | **439** | decrease vs legacy | Yes (-22 KiB) |
| Long tasks (count) | 6 | 6 | 5 | **6** | INP proxy < 200ms each | Yes (max 87ms) |

**Environment:** Chrome Headless 149.0.0.0 · Lighthouse 13.4.0 · macOS (local)

**LCP element:** Hero thesis `<p>` — *"MindMesh connects your apps, finds the one thing that matters most right now, and gets it done for you."* (`section#hero > … > p.mt-6`). FCP 2.4s; LCP 4.8s. Element render delay ~188ms on median run; gap likely font load + client hydration before final text paint.

**Artifacts:**

- Median run JSON: [`homepage-marketing-lighthouse.json`](./homepage-marketing-lighthouse.json)
- All runs: [`homepage-marketing-run1.json`](./homepage-marketing-run1.json), [`homepage-marketing-run2.json`](./homepage-marketing-run2.json), [`homepage-marketing-run3.json`](./homepage-marketing-run3.json)

---

## Comparison vs legacy Hero

| Metric | Legacy median | Marketing median | Delta |
|--------|---------------|------------------|-------|
| LCP (s) | 6.39 | **4.81** | **-1.58s (25% faster)** |
| CLS | 0 | 0 | same |
| TBT (ms) | 510 | **74** | **-436ms** |
| Performance score | 61 | **79** | **+18** |
| Total JS (KiB) | 461 | **439** | **-22 KiB** |

Marketing homepage is a large improvement over legacy Hero but **does not yet meet the LCP < 2.5s gate**.

---

## Gate checklist (P2-T26)

| Criterion | Result |
|-----------|--------|
| LCP < 2.5s | **Fail** (4.81s) |
| CLS < 0.1 | **Pass** (0) |
| INP / long tasks in hero path | **Pass** (longest task 87ms; GA + CSS parse, not Hero JS) |
| No mascot / Lottie / cursor JS on `/` | **Pass** (0 network requests for Hero, dotlottie, framer-motion) |
| Score improvement vs legacy | **Pass** (+18 perf score, -1.58s LCP) |

---

## Bundle split (theater code-splitting)

Verified via `.next` build output (no `@next/bundle-analyzer` wired yet):

| Chunk | Role | Not in initial `/` HTML |
|-------|------|-------------------------|
| `c9bbb0cec347937c.js` | Page shell + `MarketingTheaterSections` loader | Theater bodies excluded |
| `049321ca4d891292.js` | `ProductTheaterConnect` (async) | Yes |
| `65659961aaf8d60c.js` | `ProductTheaterFocus` (async) | Yes |
| `61ab482c0008ea8b.js` | `ProductTheaterExecute` (async) | Yes |

`Hero.tsx`, `dotlottie`, and `framer-motion` are **absent** from `/` page entry chunks.

---

## Likely LCP follow-ups (before P2-T27 sign-off)

1. **Defer Google Analytics** (`GoogleAnalytics` in root layout loads ~165 KiB gtag on critical path; long tasks attributed to gtag).
2. **Font strategy:** three `woff2` preloads (Inter + Manrope weights); consider fewer weights or `optional` for non-H1 text.
3. **LCP target element:** ensure H1 (not thesis paragraph) is the painted LCP candidate, or preload display font for hero only.

---

## Post–Phase 2 comparison row (legacy doc updated)

See [homepage-legacy-lighthouse.md](../phase-1/baselines/homepage-legacy-lighthouse.md) comparison table.

---

## Phase 3 LCP revisit (P3-T16, 2026-07-04)

Post scroll-kit re-run after deferring GA on `/` and trimming font weights. Full write-up: [P3-T16-homepage-lcp-revisit.md](../../phase-3/tasks/P3-T16-homepage-lcp-revisit.md).

| Metric | P2 median | P3 median | Delta | Pass? |
|--------|-----------|-----------|-------|-------|
| LCP (s) | 4.81 | **4.06** | **-0.75s** | **No** (< 2.5s) |
| CLS | 0 | 0 | same | Yes |
| TBT (ms) | 74 | **45.5** | -28.5 | Yes |
| Performance score | 79 | **84** | +5 | advisory |
| Total JS (KiB) | 439 | **335** | -104 | Yes |

**LCP element:** unchanged (hero thesis `<p>`). H1 alignment deferred to Phase 6.

**Artifacts:** [`docs/phase-3/baselines/homepage-marketing-lcp-run{1,2,3}.json`](../../phase-3/baselines/homepage-marketing-lcp-run1.json)
