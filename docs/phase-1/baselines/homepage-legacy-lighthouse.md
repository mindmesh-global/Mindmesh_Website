# Legacy homepage Lighthouse baseline (pre–Phase 2)

**Captured:** 2026-07-03 (local production build)  
**URL:** `http://localhost:3002/`  
**Page:** Legacy macOS Hero ([`components/Hero.tsx`](../../components/Hero.tsx))  
**Purpose:** Comparison target before marketing homepage swap

**Capture method:** Marketing swap was already local on disk; baseline used **git HEAD** versions of [`app/page.tsx`](../../app/page.tsx) and [`app/layout.tsx`](../../app/layout.tsx) (legacy Hero + full provider stack). Production build with `RESEND_API_KEY` placeholder in `.env.local`.

---

## How to capture

From repo root, after a successful production build:

```bash
npm install
npm run build
npm run start
# separate terminal:
npx lighthouse http://localhost:3002 \
  --preset=perf \
  --form-factor=mobile \
  --throttling-method=simulate \
  --output=json \
  --output-path=docs/phase-1/baselines/homepage-legacy-lighthouse.json
```

Record median of 3 runs in the table below.

**Build note (2026-07-03):** `next build` may fail without API env vars (e.g. Resend on `/api/contact`). Set dummy keys locally or fix route init before baseline capture. This does not block the workflow doc.

---

## Results

| Metric | Run 1 | Run 2 | Run 3 | **Median** | P1-T17 target |
|--------|-------|-------|-------|------------|---------------|
| LCP (s) | 10.93 | 6.39 | 6.11 | **6.39** | < 2.5 |
| CLS | 0 | 0 | 0 | **0** | < 0.1 |
| TBT (ms) | 457 | 510 | 546 | **510** | advisory |
| Performance score | 51 | 61 | 61 | **61** | advisory ≥ 85 |
| Total JS (KiB) | 461 | 461 | 461 | **461** | decrease after Phase 2 |

**Environment:** Chrome Headless 149.0.0.0 · Lighthouse 13.4.0 · macOS (local)

**LCP element (legacy):** `<h1>` inside Hero home window — *"Your private AI command center for work."* (`main.relative > section.relative > div.relative > h1.mb-8`). Client-rendered after Framer Motion / Hero JS hydrate; element render delay ~381ms on median run.

**Artifacts:**

- Median run JSON: [`homepage-legacy-lighthouse.json`](./homepage-legacy-lighthouse.json) (run 2)
- All runs: [`homepage-legacy-run1.json`](./homepage-legacy-run1.json), [`homepage-legacy-run2.json`](./homepage-legacy-run2.json), [`homepage-legacy-run3.json`](./homepage-legacy-run3.json)

**Notes:**

- Run 1 LCP outlier (10.9s) likely cold-start / first navigation; median uses runs 2–3 cluster (~6.1–6.4s).
- Legacy Hero fails P1-T17 LCP gate (< 2.5s). Marketing homepage (P2-T26) should beat this median.
- ~461 KiB transfer-weight JS on `/` (Framer Motion, Hero windows, overlays, cursor providers).

---

## Post–Phase 2 comparison row

After marketing homepage ships, duplicate this file as `homepage-marketing-lighthouse.md` and compare medians (P2-T26).

| Metric | Legacy median | Marketing median | Delta |
|--------|---------------|------------------|-------|
| LCP (s) | 6.39 | **4.81** | -1.58s |
| CLS | 0 | 0 | same |
| Performance score | 61 | **79** | +18 |
| Total JS (KiB) | 461 | **439** | -22 KiB |

Full marketing baseline: [`homepage-marketing-lighthouse.md`](../../phase-2/baselines/homepage-marketing-lighthouse.md) (P2-T26).
