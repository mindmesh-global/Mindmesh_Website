# P7-T05: Field CWV / CrUX Monitoring Note

**Task ID:** P7-T05  
**Status:** done  
**Type:** Documentation / ops  
**Completed:** 2026-07-10  
**Parent:** [phase-7-tasks.md](../phase-7-tasks.md) | [phase-7-launch.md](../phase-7-launch.md)  
**Depends on:** [P6-T09](../../phase-6/tasks/P6-T09-homepage-lighthouse-rebaseline.md), [P1-T17](../../phase-1/tasks/P1-T17-performance-budget.md), [P7-T04](./P7-T04-lighthouse-ci.md)  
**Blocks:** —  
**Blocker:** No

---

## Goal

Document how to pull **field** LCP / INP / CLS for `mindmesh.global` and compare them to the lab Lighthouse exception from P6-T09. No app code required for this task.

---

## Why field data matters

| Source | What it measures | Role |
|--------|------------------|------|
| **Lab** (Lighthouse / LHCI) | Simulated mobile on a single controlled load | PR regressions; P7-T04 |
| **Field** (CrUX / RUM) | Real users (p75) over ~28 days | Close or keep the P6 LCP exception |

P6-T09 signed a lab LCP exception at **2.93s** median (target &lt; 2.5s). Follow-up in that doc: revisit if **field** CWV stays above 2.5s.

---

## Product targets (P1-T17)

Use **origin p75** (mobile preferred) unless a URL-level report is available.

| Metric | Target | Lab exception (P6-T09) |
|--------|--------|------------------------|
| LCP | &lt; 2.5s | Lab median **2.93s** (exception open) |
| INP | &lt; 200ms | Lab spot-checks only |
| CLS | &lt; 0.1 | Lab **0** (pass) |

---

## How to pull field CWV

### 1. PageSpeed Insights (fastest, no key)

1. Open [PageSpeed Insights](https://pagespeed.web.dev/)
2. Enter `https://mindmesh.global/` (also spot-check `/inbox` if traffic exists)
3. Read the **Discover what your real users are experiencing** (CrUX) block when present
4. Record phone + desktop p75 for LCP, INP, CLS

If CrUX shows “no data,” the origin may be below the public dataset threshold. Use Search Console or wait for traffic.

### 2. Chrome UX Report (CrUX) API

Useful for repeatable checks. Requires a free [Google Cloud API key](https://developers.google.com/speed/docs/insights/v5/get-started) with **Chrome UX Report API** enabled.

**Origin history (28-day windows):**

```bash
# Replace YOUR_API_KEY. Do not commit keys.
curl -sS "https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=YOUR_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
    "origin": "https://mindmesh.global",
    "formFactor": "PHONE",
    "metrics": [
      "largest_contentful_paint",
      "interaction_to_next_paint",
      "cumulative_layout_shift"
    ]
  }' | tee docs/phase-7/baselines/crux-origin-phone-latest.json
```

Interpret p75 from each metric’s `percentiles.p75` (LCP/INP in ms; CLS unitless × 100 for “score” display in some UIs).

Optional history endpoint: `records:queryHistoryRecord` for trend charts.

### 3. Search Console → Core Web Vitals

1. [Google Search Console](https://search.google.com/search-console) for `mindmesh.global`
2. **Experience → Core Web Vitals** (or **Core Web Vitals** under Enhancements, depending on UI)
3. Open **Mobile** then **Desktop**
4. Note URLs in “Poor” / “Need improvement” and whether `/` is listed

Best for grouping affected URLs; slower to update than PSI.

### 4. Optional RUM (later)

| Option | Notes |
|--------|-------|
| `web-vitals` + GA4 / analytics | Custom events; needs privacy review |
| Vercel / host analytics | If deploy host exposes CWV |
| Third-party RUM | Only if already approved |

Not required for Phase 7. Prefer CrUX + Search Console until a RUM vendor is chosen.

---

## Log sheet (fill when data exists)

Save dated JSON under `docs/phase-7/baselines/` (e.g. `crux-origin-phone-2026-07-10.json`) and paste a row here or in a short baseline md.

| Date | Source | Form | LCP p75 | INP p75 | CLS p75 | vs lab exception | Decision |
|------|--------|------|---------|---------|---------|------------------|----------|
| _TBD_ | PSI / CrUX / GSC | Phone | | | | | Keep exception / close / investigate |

**Current status (2026-07-10):** No field snapshot checked in this task (documentation only). First live pull is an ops follow-up after production traffic is sufficient for CrUX.

---

## Decision rules (lab exception vs field)

| Field LCP p75 (phone) | Action |
|-----------------------|--------|
| &lt; 2.5s for ≥ 2 consecutive monthly checks | **Close** P6-T09 exception; tighten [P7-T04](./P7-T04-lighthouse-ci.md) LCP assert to `error` @ 2500ms |
| 2.5s–3.5s | **Keep** exception; track trend; no merge block from lab alone |
| &gt; 3.5s or climbing | **Investigate** (fonts, main-thread, image, third-party); treat as product priority |
| No CrUX data yet | Rely on LHCI + manual Lighthouse; do not pretend field is green |

Also watch **INP** on homepage theater scroll and waitlist submit if field INP approaches 200ms.

---

## Cadence

| When | What |
|------|------|
| After meaningful marketing deploys | Manual PSI on `/` |
| Monthly (ops) | CrUX origin phone pull + Search Console CWV glance |
| When closing P6 exception | Attach field evidence in a short note under `docs/phase-7/baselines/` |

---

## Acceptance criteria

- [x] Documented PSI, CrUX API, and Search Console paths for `mindmesh.global`
- [x] Linked to P1-T17 targets and P6-T09 exception
- [x] Clear rules for closing vs keeping the lab LCP exception
- [x] Optional RUM noted as later; no required code

---

## Explicit non-goals

- Implementing RUM / GA4 web-vitals in this task
- Committing API keys or live CrUX responses without review
- Forcing lab LCP &lt; 2.5s based on missing field data

---

## Next steps

- **P7-T06:** Developer docs Hero cleanup (blocker)
- Ops: first CrUX / PSI snapshot when origin has enough traffic; store under `docs/phase-7/baselines/`
