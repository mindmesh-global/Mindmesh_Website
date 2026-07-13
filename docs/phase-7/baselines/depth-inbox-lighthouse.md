# Depth `/inbox` Lighthouse (Phase 7)

**Captured:** 2026-07-10  
**URL:** `http://127.0.0.1:3003/inbox`  
**Server:** `output: 'standalone'` (`node .next/standalone/server.js`) after `npm run build`  
**Purpose:** P7-T03 follow-up after P6-T12 `next/image` + mockup sizing/priority fix

---

## Result (1 run, advisory)

| Metric | Value | vs Phase 5 |
|--------|-------|------------|
| LCP | **2.6s** | 5.4s → −2.8s |
| CLS | **0** | same |
| TBT | 40ms | advisory |
| Perf score | **97** | 77 → +20 |
| LCP element | Depth H1 | same as P5 |

JSON: [`depth-inbox-lighthouse.json`](./depth-inbox-lighthouse.json)

See [P7-T03-inbox-lcp-follow-up.md](../tasks/P7-T03-inbox-lcp-follow-up.md).
