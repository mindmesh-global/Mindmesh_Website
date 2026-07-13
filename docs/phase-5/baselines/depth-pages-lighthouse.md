# Depth page Lighthouse spot-check (Phase 5)

**Captured:** 2026-07-09 (local production build)  
**Server:** `npx next start -p 3003`  
**Preset:** mobile · `--preset=perf` · `--throttling-method=simulate`  
**Purpose:** P5-T14 advisory spot-check on funnel depth pages (no hard LCP gate)

---

## How to capture

```bash
npm run build
npx next start -p 3003
# separate terminal, one run per route:
npx lighthouse http://localhost:3003/<route> \
  --preset=perf \
  --form-factor=mobile \
  --throttling-method=simulate \
  --only-categories=performance \
  --chrome-flags="--headless --no-sandbox" \
  --output=json \
  --output-path=docs/phase-5/baselines/depth-<route>-lighthouse.json
```

Routes: `connected-apps`, `inbox`, `yesterdays-narrative`, `upcoming-events`, `security`, `trust`.

Spot-check uses **one run per route** (not median of 3). Homepage still uses 3-run median for Phase 6 gates.

---

## Results

| Route | LCP (s) | CLS | TBT (ms) | Perf score | Long tasks (max ms) | LCP element |
|-------|---------|-----|----------|------------|---------------------|-------------|
| `/connected-apps` | 3.3 | 0 | 66 | 92 | 4 (90) | H1: Connect the tools you already use |
| `/inbox` | 5.4 | 0 | 14 | 77 | 3 (67) | H1: One inbox for email across every connected account |
| `/yesterdays-narrative` | 2.8 | 0 | 50 | 96 | 3 (80) | Body `<p>` under product story |
| `/upcoming-events` | 2.7 | 0 | 47 | 96 | 3 (76) | H1: See what is ahead… |
| `/security` | 2.6 | 0 | 18 | 97 | 3 (68) | H1: Private by design… |
| `/trust` | 2.7 | 0 | 17 | 96 | 3 (66) | H1: Built on trust you can verify. |

**Environment:** Chrome Headless · Lighthouse 13.4.0 · macOS (local) · Next.js production build

**INP:** Lab INP not reported in these perf-only runs. INP proxy = long-task max duration; all ≤ 90ms (under 200ms advisory).

---

## Notes

- **No hard gate** for depth pages in Phase 5 (unlike homepage LCP in Phase 6).
- **CLS:** all routes **0** (pass advisory &lt; 0.1).
- **LCP:** most routes ~2.6–3.3s; `/inbox` is the outlier at **5.4s** (long Manrope H1 + higher element render delay ~681ms). Mockup image is present but H1 was LCP.
- **Perf scores:** 92–97 except `/inbox` at 77.
- Compared to Phase 2 homepage median (LCP 4.81s, score 79), five of six depth pages are faster/higher-scoring; inbox is in a similar LCP band to the homepage.

### Follow-ups (non-blocking)

1. Revisit `/inbox` LCP: font-display strategy for depth H1, or ensure mockup is not competing awkwardly with a multi-line display title.
2. Optional: 3-run median on `/inbox` before Phase 6 if depth LCP becomes a gate.

---

## Artifacts

| Route | JSON |
|-------|------|
| `/connected-apps` | [`depth-connected-apps-lighthouse.json`](./depth-connected-apps-lighthouse.json) |
| `/inbox` | [`depth-inbox-lighthouse.json`](./depth-inbox-lighthouse.json) |
| `/yesterdays-narrative` | [`depth-yesterdays-narrative-lighthouse.json`](./depth-yesterdays-narrative-lighthouse.json) |
| `/upcoming-events` | [`depth-upcoming-events-lighthouse.json`](./depth-upcoming-events-lighthouse.json) |
| `/security` | [`depth-security-lighthouse.json`](./depth-security-lighthouse.json) |
| `/trust` | [`depth-trust-lighthouse.json`](./depth-trust-lighthouse.json) |

---

## Gate checklist (P5-T14)

| Criterion | Result |
|-----------|--------|
| Mobile Lighthouse run on each P5-T03–T08 route | **Pass** |
| LCP / CLS / TBT / long-task proxy recorded | **Pass** |
| JSON artifacts under `docs/phase-5/baselines/` | **Pass** |
| Hard LCP &lt; 2.5s | **N/A** (advisory only) |
