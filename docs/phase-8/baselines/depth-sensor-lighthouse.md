# Depth `/sensor` Lighthouse (Phase 8)

**Captured:** 2026-07-10  
**URL:** `http://127.0.0.1:3003/sensor`  
**Server:** `output: 'standalone'` (`PORT=3003`) after `npm run build`  
**Tool:** Lighthouse 13.4.0 · mobile · simulate · performance only  
**Purpose:** P8-T18 advisory spot-check

---

## Results

| Run | LCP | CLS | TBT | Score |
|-----|-----|-----|-----|-------|
| 1 (primary JSON) | **3.0s** | 0 | 120ms | 94 |
| 2 | **2.7s** | 0 | 120ms | 95 |

| Field | Value |
|-------|-------|
| LCP element | Depth H1 (`Your universal command bar…`) |
| LCP breakdown (run 1) | TTFB ~276ms · element render delay ~144ms |
| Framer in network | **No** |
| Framer in initial HTML | **No** |
| JS transfer (approx) | ~340 KiB |

JSON: [`depth-sensor-lighthouse.json`](./depth-sensor-lighthouse.json) · run 2: [`depth-sensor-lighthouse-run2.json`](./depth-sensor-lighthouse-run2.json)

Advisory: depth LCP in the ~2.7–3.0s band (same class as other depth pages). No hard &lt; 2.5s gate.
