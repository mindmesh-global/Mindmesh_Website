# Depth `/mascot` Lighthouse (Phase 8)

**Captured:** 2026-07-10  
**URL:** `http://127.0.0.1:3003/mascot`  
**Server:** `output: 'standalone'` (`PORT=3003`) after `npm run build`  
**Tool:** Lighthouse 13.4.0 · mobile · simulate · performance only  
**Purpose:** P8-T18 advisory spot-check

---

## Results

| Run | LCP | CLS | TBT | Score | Notes |
|-----|-----|-----|-----|-------|-------|
| 1 | 5.5s | 0 | 30ms | 75 | Outlier (H1 element render delay ~1069ms) |
| 2 (primary JSON) | **3.0s** | 0 | 30ms | 94 | Representative |

| Field | Value |
|-------|-------|
| LCP element | Depth H1 (`Your conversational companion…`) |
| Framer in network | **No** |
| Framer in initial HTML | **No** |
| JS transfer (approx) | ~340 KiB |

JSON: [`depth-mascot-lighthouse.json`](./depth-mascot-lighthouse.json) (run 2 values)

Advisory: treat **~3.0s** as the representative Mascot LCP (same band as `/sensor`). CLS 0; TBT low. No hard &lt; 2.5s gate for depth pages.
