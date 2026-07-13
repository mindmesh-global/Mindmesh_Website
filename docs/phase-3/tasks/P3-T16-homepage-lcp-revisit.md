# P3-T16: Revisit Homepage LCP (deferred)

**Task ID:** P3-T16  
**Status:** done  
**Type:** Performance follow-up  
**Completed:** 2026-07-04  
**Parent:** [phase-3-tasks.md](../phase-3-tasks.md)  
**Depends on:** P2-T26

---

## Goal

Optional follow-up from Phase 2 LCP gate miss (median **4.81s**). Apply low-risk mitigations from [P2-T26](../../phase-2/tasks/P2-T26-lighthouse-verification.md). **Not required for Phase 3 sign-off.**

---

## Changes applied

| Change | File | Notes |
|--------|------|-------|
| Defer Google Analytics on `/` | [`DeferredGoogleAnalytics.tsx`](../../../components/analytics/DeferredGoogleAnalytics.tsx) | `requestIdleCallback` (4.5s timeout) or 3.5s fallback; immediate on non-marketing routes |
| Trim font weights | [`app/layout.tsx`](../../../app/layout.tsx) | Inter `400`/`600` only; Manrope `600`/`700` only; `adjustFontFallback: true` |
| Hero copy order | — | **Not changed** (P1-T03 hierarchy preserved) |
| H1 as LCP element | — | **Deferred to Phase 6** (needs display-font strategy without reordering copy) |

---

## Lighthouse re-run (Phase 3 post scroll-kit)

**Captured:** 2026-07-04  
**URL:** `http://localhost:3003/` (production `next start` after `npm run build`)  
**Method:** Lighthouse 13.4.0 · mobile · simulated throttling · 3 runs · median

| Metric | Run 1 | Run 2 | Run 3 | **Median** | P1-T17 target | Pass? |
|--------|-------|-------|-------|------------|---------------|-------|
| LCP (s) | 4.81 | 4.06 | 4.06 | **4.06** | < 2.5 | **No** |
| CLS | 0 | 0 | 0 | **0** | < 0.1 | Yes |
| TBT (ms) | 84 | 45.5 | 34 | **45.5** | advisory | Yes |
| Performance score | 79 | 84 | 84 | **84** | advisory ≥ 85 | Close (+5 vs P2) |
| Total JS (KiB) | 335 | 335 | 335 | **335** | decrease vs legacy | Yes (-104 KiB vs P2) |
| Long tasks (count) | 6 | 4 | 4 | **4** | INP proxy | Yes (max 88ms) |

**Environment:** Chrome Headless · Lighthouse 13.4.0 · macOS (local)

**LCP element (median run):** Hero thesis `<p>` — *"MindMesh connects your apps…"* (`section#hero > … > p.mt-6`). Element render delay ~155ms; gap remains font load + hydration before final Inter text paint.

**Artifacts:**

- Median run JSON: [`homepage-marketing-lcp-median.json`](../baselines/homepage-marketing-lcp-median.json)
- All runs: [`homepage-marketing-lcp-run1.json`](../baselines/homepage-marketing-lcp-run1.json), [`run2`](../baselines/homepage-marketing-lcp-run2.json), [`run3`](../baselines/homepage-marketing-lcp-run3.json)

---

## Delta vs Phase 2 baseline

| Metric | Phase 2 median | Phase 3 median | Delta |
|--------|----------------|----------------|-------|
| LCP (s) | 4.81 | **4.06** | **-0.75s (16%)** |
| CLS | 0 | 0 | same |
| TBT (ms) | 74 | **45.5** | **-28.5ms** |
| Performance score | 79 | **84** | **+5** |
| Total JS (KiB) | 439 | **335** | **-104 KiB** |

Run 1 matched the Phase 2 LCP (4.81s); runs 2–3 benefited from deferred GA and trimmed fonts. Gate **still fails** LCP < 2.5s.

---

## Checklist

- [x] Defer `GoogleAnalytics` on marketing homepage
- [x] Reduce font preload weights (Inter/Manrope subset)
- [ ] Align LCP element to hero H1 (deferred; copy order locked by P1-T03)
- [x] Re-run Lighthouse × 3 and update baseline doc
- [x] Document outcome for Phase 3 handoff

---

## Remaining LCP work (Phase 6)

1. **Display font for H1 only:** preload Manrope 700 for hero; `font-display: optional` for body Inter.
2. **Inline critical hero text** or server-render H1 with fallback metrics to beat thesis-paragraph LCP.
3. **Self-host fonts** or subset woff2 to cut third-party latency (if any remains).

---

## Next steps

- **P3-T17:** Phase 4 entry doc stub
- **P3-T18:** Phase 3 sign-off checklist
