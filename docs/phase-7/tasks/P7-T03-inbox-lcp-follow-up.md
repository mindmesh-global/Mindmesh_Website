# P7-T03: `/inbox` Depth LCP Follow-up

**Task ID:** P7-T03  
**Status:** done  
**Type:** Performance measurement + low-risk fix  
**Completed:** 2026-07-10  
**Parent:** [phase-7-tasks.md](../phase-7-tasks.md) | [phase-7-launch.md](../phase-7-launch.md)  
**Depends on:** [P5-T14](../../phase-5/tasks/P5-T14-depth-page-lighthouse.md), [P6-T12](../../phase-6/tasks/P6-T12-next-image-optimization.md)  
**Blocks:** —  
**Blocker:** No

---

## Goal

Re-measure `/inbox` mobile Lighthouse after `next/image` enablement. Apply low-risk image fixes if useful. Do **not** block Phase 7 on &lt; 2.5s.

---

## Phase 5 baseline (pre-fix)

From [depth-pages-lighthouse.md](../../phase-5/baselines/depth-pages-lighthouse.md):

| Metric | Value |
|--------|-------|
| LCP | **5.4s** |
| CLS | 0 |
| Perf score | 77 |
| LCP element | Depth H1 (long Manrope title; ~681ms render delay) |

---

## Low-risk code change

[`app/inbox/page.tsx`](../../../app/inbox/page.tsx) mockup `Image`:

| Before | After |
|--------|-------|
| `width={1200}` `height={800}` (wrong; asset is 1024×531) | `width={1024}` `height={531}` |
| `priority` (compete with depth H1) | Removed (lazy default) |
| no `sizes` | `sizes="(max-width: 1024px) 100vw, 560px"` |

Rationale: P5 already identified H1 as LCP. `priority` on a below-hero mockup pulled bytes/scheduling away from the critical heading path after image optimization landed.

---

## Phase 7 re-measure

| Field | Value |
|-------|-------|
| Build | `npm run build` + standalone `PORT=3003` |
| Tool | Lighthouse 13.4.0 · mobile · simulate · perf only |
| Runs | 1 (advisory spot-check) |
| Artifact | [`docs/phase-7/baselines/depth-inbox-lighthouse.json`](../baselines/depth-inbox-lighthouse.json) |

| Metric | P5 | **P7** | Delta |
|--------|----|--------|-------|
| LCP | 5.4s | **2.6s** | **−2.8s** |
| CLS | 0 | **0** | — |
| TBT | ~14ms | **40ms** | advisory |
| Perf score | 77 | **97** | **+20** |
| LCP element | H1 | **H1** (depth title) | same |
| Element render delay | ~681ms | **~59ms** | large drop |

LCP still slightly above the homepage &lt; 2.5s *product* target (**2.6s**). Acceptable for depth pages (no hard gate). Remaining gap is mostly display-font / main-thread paint for a multi-line Manrope H1, not the mockup.

---

## Acceptance criteria

- [x] Production mobile Lighthouse on `/inbox` after P6-T12
- [x] Baseline JSON under `docs/phase-7/baselines/`
- [x] Low-risk image sizing / priority fix applied
- [x] Result documented vs Phase 5 (advisory; no &lt; 2.5s block)

---

## Decision

**Advisory pass.** Inbox is no longer an outlier vs other depth pages (~2.6–3.3s band). Further gains would mean shortening the depth H1 or a depth-page Manrope preload strategy; defer unless product makes depth LCP a hard gate.

---

## Next steps

- Optional: apply the same width/height/`priority` hygiene to `/upcoming-events` mockup (not in this task)
- **P7-T06:** Developer docs Hero cleanup (next blocker)
