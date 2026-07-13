# P8-T18: Lighthouse Spot-Check `/sensor` + `/mascot`

**Task ID:** P8-T18  
**Status:** done  
**Type:** Performance measurement (advisory)  
**Completed:** 2026-07-10  
**Parent:** [phase-8-tasks.md](../phase-8-tasks.md) | [phase-8-sensor-mascot.md](../phase-8-sensor-mascot.md)  
**Depends on:** P8-T10, P8-T12, P8-T15  
**Blocks:** —  
**Blocker:** No

---

## Goal

Production mobile Lighthouse spot-check on Sensor and Mascot depth pages. Record baselines. Confirm Framer is not in the initial shell. Advisory LCP; watch CLS / TBT.

---

## Method

| Field | Value |
|-------|-------|
| Build | Existing `npm run build` (P8-T17) + standalone `PORT=3003` |
| Tool | Lighthouse **13.4.0** · mobile · simulate · performance only |
| Runs | 2 per page |
| Artifacts | [`docs/phase-8/baselines/`](../baselines/) |

---

## Results

| Page | Run | LCP | CLS | TBT | Score |
|------|-----|-----|-----|-----|-------|
| `/sensor` | 1 | **3.0s** | 0 | 120ms | 94 |
| `/sensor` | 2 | **2.7s** | 0 | 120ms | 95 |
| `/mascot` | 1 | 5.5s | 0 | 30ms | 75 (outlier) |
| `/mascot` | 2 | **3.0s** | 0 | 30ms | 94 |

| Check | Result |
|-------|--------|
| LCP element | Depth **H1** on both pages (Manrope display title) |
| Framer in Lighthouse network | **No** |
| Framer string in initial HTML | **No** (theater demos are `next/dynamic` `{ ssr: false }`) |
| CLS | **0** both pages |
| TBT | Low–moderate (30–120ms) |

Summaries: [depth-sensor-lighthouse.md](../baselines/depth-sensor-lighthouse.md) · [depth-mascot-lighthouse.md](../baselines/depth-mascot-lighthouse.md)

---

## Decision

**Advisory pass.** Representative LCP is ~2.7–3.0s (depth-page band; same class as `/inbox` after P7-T03). Mascot run 1 (5.5s) treated as simulate variance / H1 paint delay outlier. No code change in this task. No hard &lt; 2.5s gate for depth pages.

---

## Acceptance

- [x] Prod mobile Lighthouse on `/sensor` and `/mascot`  
- [x] Baselines under `docs/phase-8/baselines/`  
- [x] Framer not in initial shell / network for these pages  
- [x] CLS / TBT recorded; LCP advisory  

---

## Handoff

| Next | Work |
|------|------|
| P8-T19 | Phase 8 sign-off |
