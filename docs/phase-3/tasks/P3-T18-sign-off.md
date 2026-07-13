# P3-T18: Phase 3 Sign-Off Checklist

**Task ID:** P3-T18  
**Status:** done  
**Type:** Formal gate (documentation + verification)  
**Completed:** 2026-07-04  
**Parent:** [phase-3-tasks.md](../phase-3-tasks.md) | [phase-3-scroll-kit.md](../phase-3-scroll-kit.md)  
**Depends on:** P3-T01–T17  
**Unblocks:** [Phase 4 theater animation](../phase-4-theater-animation.md) (first animation code)

---

## Verdict

**Phase 3 is complete.** All 18 tasks are `done`. All blocker deliverables exist. Phase 4 beat-sheet animation may begin.

| Gate | Result |
|------|--------|
| Blocker tasks (12) | ✅ All done |
| Non-blocker tasks (6) | ✅ All done |
| Child task docs | ✅ 15/15 in `docs/phase-3/tasks/` |
| Scroll kit shipped | ✅ `useScrollSection`, `TheaterScrollSection`, `ProductFrame` |
| Three theaters wired | ✅ Connect, Focus, Execute use scroll anatomy |
| Phase 4 entry + task stub | ✅ [phase-4-theater-animation.md](../phase-4-theater-animation.md), [phase-4-tasks.md](../phase-4-tasks.md) |

---

## Master checklist (from P3-T18 spec)

- [x] All blocker tasks P3-T01–T14 done
- [x] Three theaters use scroll anatomy with static final frames
- [x] `useScrollSection` API stable (documented in [phase-3-scroll-kit.md](../phase-3-scroll-kit.md))
- [x] Reduced motion + off-screen pause QA passed
- [x] Framer Motion scoped to theater chunks
- [x] Phase 4 entry doc linked

---

## Blocker task sign-off

| ID | Task | Deliverable | Status |
|----|------|-------------|--------|
| P3-T01 | Theater scroll constants | [P3-T01-theater-scroll-constants.md](./P3-T01-theater-scroll-constants.md) · [`lib/marketing-theater-scroll.ts`](../../lib/marketing-theater-scroll.ts) | ✅ |
| P3-T02 | Sticky `ProductFrame` | [P3-T02-product-frame.md](./P3-T02-product-frame.md) | ✅ |
| P3-T03 | `usePrefersReducedMotion` | [P3-T03-prefers-reduced-motion.md](./P3-T03-prefers-reduced-motion.md) | ✅ |
| P3-T04 | `useScrollSection` hook | [P3-T04-use-scroll-section.md](./P3-T04-use-scroll-section.md) | ✅ |
| P3-T05 | `TheaterScrollSection` | [P3-T05-theater-scroll-section.md](./P3-T05-theater-scroll-section.md) | ✅ |
| P3-T06 | Wire Connect theater | [P3-T06-08-theater-scroll-wiring.md](./P3-T06-08-theater-scroll-wiring.md) | ✅ |
| P3-T07 | Wire Focus theater | [P3-T06-08-theater-scroll-wiring.md](./P3-T06-08-theater-scroll-wiring.md) | ✅ |
| P3-T08 | Wire Execute theater | [P3-T06-08-theater-scroll-wiring.md](./P3-T06-08-theater-scroll-wiring.md) | ✅ |
| P3-T10 | Framer chunk verify | [P3-T10-framer-chunk-verify.md](./P3-T10-framer-chunk-verify.md) | ✅ |
| P3-T12 | Reduced-motion QA | [P3-T12-reduced-motion-qa.md](./P3-T12-reduced-motion-qa.md) | ✅ |
| P3-T13 | Off-screen pause QA | [P3-T13-off-screen-pause-qa.md](./P3-T13-off-screen-pause-qa.md) | ✅ |
| P3-T14 | INP nav spot-check | [P3-T14-inp-nav-spot-check.md](./P3-T14-inp-nav-spot-check.md) | ✅ |
| P3-T18 | This sign-off | This doc | ✅ |

---

## Workstream checklist (all tasks)

### A: Scroll kit foundation

| ID | Task | Status | Notes |
|----|------|--------|-------|
| P3-T01 | Theater scroll constants | ✅ | `CONNECT/FOCUS/EXECUTE_PROGRESS_STEPS`, vh heights, reduced-motion jumps |
| P3-T02 | Sticky `ProductFrame` | ✅ | P1-T15 tokens; `.theater-sticky-frame` CSS on mobile |
| P3-T03 | `usePrefersReducedMotion` | ✅ | Shared hook for scroll + layout |
| P3-T04 | `useScrollSection` | ✅ | `progress`, `step`, `isInView`, `isPaused` |
| P3-T05 | `TheaterScrollSection` | ✅ | Wrapper + context provider |

### B: Theater wiring

| ID | Task | Status | Notes |
|----|------|--------|-------|
| P3-T06 | Connect scroll anatomy | ✅ | Static 7-app grid in frame; scroll progress wired |
| P3-T07 | Focus scroll anatomy | ✅ | Static priority demo in frame |
| P3-T08 | Execute scroll anatomy | ✅ | Static execute demo in frame |
| P3-T09 | `theater/` folder reorg | ✅ | Barrel export; legacy `ProductFrame` path removed |

### C: Helpers + QA

| ID | Task | Status | Notes |
|----|------|--------|-------|
| P3-T10 | Framer chunk verify | ✅ | Framer/`useScroll` only in async theater chunks; dotlottie off `/` |
| P3-T11 | Step helpers + fixtures | ✅ | `getBeatLocalProgress`, `getConnectVisibleAppCount`, `THEATER_DEMO_FIXTURES` |
| P3-T12 | Reduced-motion QA | ✅ | No tall wrapper; static final frame; `data-reduced-motion="true"` |
| P3-T13 | Off-screen pause QA | ✅ | `setScrollProgress` gated when off-screen; QA attrs on wrapper |
| P3-T14 | INP nav spot-check | ✅ | All 4 nav anchors < 2ms sync handler |
| P3-T15 | Mobile theater QA | ✅ | 120vh/60vh via CSS; 390×844 pass; iOS Safari deferred |

### D: Perf + handoff

| ID | Task | Status | Notes |
|----|------|--------|-------|
| P3-T16 | LCP revisit (optional) | ✅ | Median 4.06s (-0.75s); gate still fails |
| P3-T17 | Phase 4 entry doc | ✅ | [phase-4-theater-animation.md](../phase-4-theater-animation.md) |
| P3-T18 | Sign-off | ✅ | This doc |

---

## Definition of done (from phase-3-scroll-kit.md)

| Criterion | Status | Evidence |
|-----------|--------|----------|
| `ProductFrame` matches P1-T15 sticky dimensions | ✅ | [P3-T02](./P3-T02-product-frame.md), [P3-T15](./P3-T15-mobile-theater-qa.md) |
| `useScrollSection` used by all three theaters | ✅ | [P3-T06-08](./P3-T06-08-theater-scroll-wiring.md) |
| Scroll wrappers use correct desktop/mobile vh | ✅ | [P3-T15](./P3-T15-mobile-theater-qa.md) · `globals.css` `[data-theater]` |
| Reduced motion renders static final frame | ✅ | [P3-T12](./P3-T12-reduced-motion-qa.md) |
| Off-screen pause stops scroll updates | ✅ | [P3-T13](./P3-T13-off-screen-pause-qa.md) |
| Framer Motion absent from non-theater `/` chunks | ✅ | [P3-T10](./P3-T10-framer-chunk-verify.md) |
| P3-T18 sign-off recorded | ✅ | This doc |
| Phase 4 entry ready | ✅ | [P3-T17](./P3-T17-phase-4-entry-doc.md) |

---

## Scroll kit contract (locked for Phase 4)

From [phase-3-scroll-kit.md](../phase-3-scroll-kit.md) and [`useScrollSection`](../../hooks/useScrollSection.ts):

| Return | Type | Purpose |
|--------|------|---------|
| `progress` | `number` 0–1 | Raw scroll progress within wrapper |
| `step` | `number` | Beat index from threshold table |
| `isInView` | `boolean` | Section intersecting viewport |
| `isPaused` | `boolean` | Off-screen or reduced motion |
| `ref` | `RefObject` | Attach to scroll wrapper |

**Helpers (P3-T11):** `getTheaterStep`, `getBeatLocalProgress`, `getConnectVisibleAppCount`, `getScrollSyncedCharIndex` in [`lib/marketing-theater-scroll.ts`](../../lib/marketing-theater-scroll.ts).

**Reduced-motion jump progress:** Connect 0.90 · Focus 0.85 · Execute 0.92.

---

## Code inventory (Phase 4 starting point)

| Module | Path |
|--------|------|
| Scroll constants + helpers | `lib/marketing-theater-scroll.ts` |
| Demo fixtures | `lib/marketing-demo-data.ts` |
| Scroll hook | `hooks/useScrollSection.ts` |
| Reduced motion hook | `hooks/usePrefersReducedMotion.ts` |
| Theater barrel | `components/marketing/theater/index.ts` |
| Frame + wrapper | `components/marketing/theater/ProductFrame.tsx`, `TheaterScrollSection.tsx` |
| Theater sections | `components/marketing/sections/ProductTheater{Connect,Focus,Execute}.tsx` |
| Dynamic loader | `components/marketing/MarketingTheaterSections.tsx` |
| Mobile vh CSS | `app/globals.css` (`[data-theater]`, `.theater-sticky-frame`) |

---

## Locked decisions (carry into Phase 4)

| Decision | Source |
|----------|--------|
| Beat thresholds from P1-T06–08 live in `marketing-theater-scroll.ts` | [P3-T01](./P3-T01-theater-scroll-constants.md) |
| Animations use `transform` and `opacity` only | [phase-3-scroll-kit.md](../phase-3-scroll-kit.md) |
| Pause scroll-driven updates when `isPaused` | [P3-T04](./P3-T04-use-scroll-section.md), [P3-T13](./P3-T13-off-screen-pause-qa.md) |
| Framer Motion stays inside theater dynamic chunks | [P3-T10](./P3-T10-framer-chunk-verify.md) |
| Reuse map drives component refactors | [P1-T23](../phase-1/tasks/P1-T23-theater-reuse-map.md) |
| Static final frames at reduced-motion jump progress | [P3-T12](./P3-T12-reduced-motion-qa.md) |

---

## Known deferrals (do not block Phase 4)

| Item | Phase | Doc / notes |
|------|-------|-------------|
| Beat-sheet fly-in, dimming, typing scrub | 4 | By design; static demos until P4 |
| `StaticConnectedApps` marketing variant | 4 | [P1-T23](../phase-1/tasks/P1-T23-theater-reuse-map.md) |
| Homepage LCP < 2.5s (median 4.06s) | 6 | [P3-T16](./P3-T16-homepage-lcp-revisit.md) |
| P2-T27 Phase 2 sign-off | 2 | Open; does not block Phase 4 animation work |
| Real iOS Safari sticky QA | 4+ | [P3-T15](./P3-T15-mobile-theater-qa.md) |
| Depth pages, Hero deletion, OG | 5–6 | [phase-3-scroll-kit.md](../phase-3-scroll-kit.md) |

---

## Performance summary (Phase 3)

| Check | Result | Doc |
|-------|--------|-----|
| Framer only in theater chunks | Pass | [P3-T10](./P3-T10-framer-chunk-verify.md) |
| INP nav anchor scroll | Pass (< 2ms) | [P3-T14](./P3-T14-inp-nav-spot-check.md) |
| LCP revisit | Improved, gate open | [P3-T16](./P3-T16-homepage-lcp-revisit.md) median 4.06s |
| No mascot / Lottie / cursor on `/` | Pass | [P3-T10](./P3-T10-framer-chunk-verify.md) |

---

## Stakeholder sign-off

| Role | Name | Decision | Date |
|------|------|----------|------|
| Product / founder | Rohit | **Phase 3 approved.** Proceed to Phase 4 theater animation. | 2026-07-04 |

---

## Next step

Start with [P4-T01](./phase-4-tasks.md#p4-t01--staticconnectedapps-marketing-variant) in [phase-4-tasks.md](../phase-4-tasks.md). Overview: [phase-4-theater-animation.md](../phase-4-theater-animation.md).

**P3-T18 status:** Done. Phase 3 closed.
