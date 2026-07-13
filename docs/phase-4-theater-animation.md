# Phase 4: Theater Animation

**Status:** Complete (2026-07-06)  
**Sign-off:** [P4-T14-sign-off.md](./phase-4/tasks/P4-T14-sign-off.md)  
**Prerequisite:** [Phase 3 sign-off](./phase-3/tasks/P3-T18-sign-off.md) (2026-07-04)  
**Task breakdown:** [phase-4-tasks.md](./phase-4-tasks.md) (14 tasks, all done)  
**Next phase:** [phase-5-depth-pages.md](./phase-5-depth-pages.md)

Phase 4 implements **scroll-linked beat-sheet animations** for Connect, Focus, and Execute. Phase 3 shipped scroll infrastructure (`useScrollSection`, sticky `ProductFrame`, wrapper vh, off-screen pause, reduced-motion final frames). Phase 4 replaces static final-frame demos with motion driven by `progress` and `step`.

---

## Goal

Animate the three product theaters without re-solving layout or scroll math:

1. Wire beat-sheet motion from [P1-T06](./phase-1/tasks/P1-T06-theater-connect.md)–[P1-T08](./phase-1/tasks/P1-T08-theater-execute.md) to `useScrollSection` output
2. Refactor or wrap `Static*` dashboard components per [P1-T23](./phase-1/tasks/P1-T23-theater-reuse-map.md)
3. Add new marketing micro-components (`MarketingPriorityCard`, draft panel, signal chips, etc.)
4. Keep Framer Motion scoped to theater dynamic chunks; `transform` and `opacity` only
5. Preserve reduced-motion static final frames and off-screen pause behavior from Phase 3

---

## Phase 3 starting point

| Asset | Location | Phase 4 change |
|-------|----------|----------------|
| Scroll wrapper + sticky frame | `TheaterScrollSection`, `ProductFrame` | Keep; animate children inside frame |
| Scroll hook | `hooks/useScrollSection.ts` | Consume `progress`, `step`, `isPaused` |
| Progress thresholds | `lib/marketing-theater-scroll.ts` | Use `CONNECT/FOCUS/EXECUTE_PROGRESS_STEPS` + helpers |
| Step helpers | `getBeatLocalProgress`, `getConnectVisibleAppCount`, `getScrollSyncedCharIndex` | Drive sub-animations |
| Demo fixtures | `lib/marketing-demo-data.ts` | Same Acme persona; wire to animated components |
| Theater sections | `ProductTheaterConnect/Focus/Execute.tsx` | Replace inline static markup with animated demos |
| Dynamic import shell | `MarketingTheaterSections.tsx` | Keep; add Framer `motion.*` inside theater bodies only |
| Mobile vh CSS | `app/globals.css` (`[data-theater]`, `.theater-sticky-frame`) | No change unless beat timing needs taller wrappers |

**QA already passed (Phase 3):** reduced motion ([P3-T12](./phase-3/tasks/P3-T12-reduced-motion-qa.md)), off-screen pause ([P3-T13](./phase-3/tasks/P3-T13-off-screen-pause-qa.md)), mobile sticky ([P3-T15](./phase-3/tasks/P3-T15-mobile-theater-qa.md)), Framer chunk isolation ([P3-T10](./phase-3/tasks/P3-T10-framer-chunk-verify.md)).

---

## Phase 1 inputs (read before coding)

| Topic | Doc |
|-------|-----|
| Connect beat sheet + reduced motion | [P1-T06-theater-connect.md](./phase-1/tasks/P1-T06-theater-connect.md) |
| Focus beat sheet | [P1-T07-theater-focus.md](./phase-1/tasks/P1-T07-theater-focus.md) |
| Execute beat sheet | [P1-T08-theater-execute.md](./phase-1/tasks/P1-T08-theater-execute.md) |
| Reuse map + component matrix | [P1-T23-theater-reuse-map.md](./phase-1/tasks/P1-T23-theater-reuse-map.md) |
| Theater layout (wrapper vh, sticky frame) | [P1-T15-layout-rules.md](./phase-1/tasks/P1-T15-layout-rules.md) § Product theater |
| Performance gates | [P1-T17-performance-budget.md](./phase-1/tasks/P1-T17-performance-budget.md) |
| Scroll kit contract | [phase-3-scroll-kit.md](./phase-3-scroll-kit.md) § `useScrollSection` contract |

---

## Scroll + animation contract (from Phase 3)

| Input | Source | Phase 4 usage |
|-------|--------|---------------|
| `progress` | `useScrollSection` / `useTheaterScroll` | Scrub fly-ins, opacity, typing index |
| `step` | `getTheaterStep(theaterId, progress)` | Discrete beat switches |
| `getBeatLocalProgress(...)` | `lib/marketing-theater-scroll.ts` | Stagger within a beat |
| `isPaused` | off-screen or reduced motion | Skip RAF updates; hold last frame |
| `isInView` | IntersectionObserver | Same pause gate as Phase 3 |

**Reduced-motion final progress:**

| Theater | Jump to progress |
|---------|------------------|
| Connect | 0.90 |
| Focus | 0.85 |
| Execute | 0.92 |

**Animation rules:** `transform` and `opacity` only; pause when `isPaused`; no layout-triggering properties.

---

## Target file structure (Phase 4 additions)

```
components/marketing/
  theater/
    demos/                          # NEW: animated demo bodies per theater
      ConnectTheaterDemo.tsx
      FocusTheaterDemo.tsx
      ExecuteTheaterDemo.tsx
    marketing/                      # NEW: marketing-only micro-components (P1-T23)
      MarketingPriorityCard.tsx
      MarketingSignalChips.tsx
      MarketingDraftPanel.tsx
      MarketingCalendarBlock.tsx
      MarketingJiraRow.tsx
      MarketingExecuteSuccess.tsx
  sections/
    ProductTheaterConnect.tsx       # compose TheaterScrollSection + ConnectTheaterDemo
    ProductTheaterFocus.tsx
    ProductTheaterExecute.tsx
components/dashboard/               # REFACTOR: Static* variants for marketing theme
  StaticConnectedApps.tsx
  StaticInboxList.tsx
  StaticCalendarEvents.tsx
lib/
  marketing-demo-data.ts            # fixtures already extended in P3-T11
  marketing-theater-scroll.ts       # thresholds locked; add beat helpers only if needed
```

Exact filenames may shift when `phase-4-tasks.md` is written at sign-off.

---

## Scope preview (by theater)

| Theater | Anchor | Beats (summary) | Key reuse / new build |
|---------|--------|-----------------|------------------------|
| **Connect** | `#connect` | Empty grid → 7-app fly-in → badges → sync banner → hold | Refactor `StaticConnectedApps`; see [P1-T06](./phase-1/tasks/P1-T06-theater-connect.md), [P1-T23](./phase-1/tasks/P1-T23-theater-reuse-map.md) |
| **Focus** | `#focus` | Noisy inbox/calendar → signal chips → cross-highlight → dim → priority card | `StaticInboxList`, `StaticCalendarEvents`; **new** `MarketingPriorityCard`, `MarketingSignalChips` |
| **Execute** | `#execute` | Priority carry-over → draft typing → calendar block → Jira check → success | `TypingText` scrub; **new** draft/calendar/Jira/success panels |

Full progress × component matrix: [P1-T23 § Master matrix](./phase-1/tasks/P1-T23-theater-reuse-map.md#master-matrix-theater--component).

---

## Recommended PR sequence (draft)

| PR | Scope | Exit criteria |
|----|-------|---------------|
| **PR1** | Connect demo + `StaticConnectedApps` marketing variant | Fly-in + badges + banner match P1-T06 beats |
| **PR2** | Focus demo + priority card + signal chips | Priority reveal at 0.50+; reduced motion final frame |
| **PR3** | Execute demo + draft/calendar/Jira/success | Scroll-scrubbed typing; success at 0.92+ |
| **PR4** | Perf QA + Phase 4 sign-off | INP spot-check; Framer still theater-only |

Detailed task IDs: [phase-4-tasks.md](./phase-4-tasks.md).

---

## Performance checklist (Phase 4)

From [P1-T17](./phase-1/tasks/P1-T17-performance-budget.md):

- [x] Framer Motion stays inside theater dynamic chunks (not hero path)
- [x] Animations use `transform` / `opacity` only
- [x] Off-screen pause still gates scroll-driven state updates
- [x] Reduced motion renders static final frame on all three theaters
- [x] INP spot-check: nav anchor scroll to `#connect`, `#focus`, `#execute`
- [x] No new Lottie, mascot, or cursor on `/`

**Deferred:** Homepage LCP < 2.5s ([P3-T16](./phase-3/tasks/P3-T16-homepage-lcp-revisit.md) median 4.06s). Phase 6 polish.

---

## Explicit non-goals (Phase 4)

- Depth page copy updates ([Phase 5](./phase-3-scroll-kit.md#after-phase-3))
- Hero deletion, OG refresh, `images.unoptimized` ([Phase 6](./phase-3-scroll-kit.md#after-phase-3))
- Homepage LCP gate closure
- New marketing sections beyond theaters 4–6
- Real API / live data in demos (fixtures only)

---

## Phase 3 handoff checklist (confirm at P3-T18)

- [x] `useScrollSection` returns stable `progress`, `step`, `isInView`, `isPaused`
- [x] Progress thresholds live in `lib/marketing-theater-scroll.ts`
- [x] All three theaters render inside `TheaterScrollSection`
- [x] Reduced-motion final frames match P1-T06–08 jump targets
- [x] Step helpers + demo fixtures coupled ([P3-T11](./phase-3/tasks/P3-T11-step-helpers-demo-data.md))
- [x] P3-T18 sign-off recorded
- [x] `phase-4-tasks.md` created with task IDs

---

## Definition of done (Phase 4 preview)

Phase 4 is complete when:

- [x] Connect, Focus, Execute demos animate through full beat sheets
- [x] Static final frames match P1-T06–08 at reduced-motion jump progress
- [x] `Static*` refactors documented in P1-T23 matrix are implemented or explicitly deferred
- [x] Framer Motion absent from non-theater `/` chunks
- [x] Phase 4 sign-off recorded ([P4-T14](./phase-4/tasks/P4-T14-sign-off.md))

---

## After Phase 4

| Phase | Focus |
|-------|-------|
| **5** | Depth pages aligned to 7-app story |
| **6** | Hero deletion, LCP polish, OG, image optimization |
