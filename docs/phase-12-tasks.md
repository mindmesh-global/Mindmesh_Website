# Phase 12 Tasks

**Phase:** Homepage Reveal, Click-to-Explore, and Type Scale  
**Status:** In progress (P12-T01–T04, T06 done; P12-T05, T07–T12 todo)  
**Prerequisite:** [Phase 11 QA](./phase-11/tasks/P11-T14-product-overview-qa.md) (P11-T14, 2026-07-12); Phase 11 sign-off (P11-T15) intentionally deferred  
**Entry spec:** [phase-12-homepage-experience.md](./phase-12-homepage-experience.md)  
**Inspiration reference:** [linear.app](https://linear.app/)  
**Parent:** [phase-11-tasks.md](./phase-11-tasks.md)

This file is the execution tracker for Phase 12. Phase 12 reworks how the homepage Hero and Product Overview reveal themselves on load, replaces scroll-scrubbed scene switching in the Product Overview with click/tab-driven navigation, extends deliberate reveal animation to the rest of the homepage, and re-audits homepage typography. It reuses Phase 11's scenes, fixtures, and product-truth copy without changes to their content.

---

## Status legend

- `todo` - ready or waiting on dependencies
- `in-progress` - actively being implemented
- `blocked` - cannot proceed until a prerequisite or decision is resolved
- `done` - implementation and acceptance checks complete

---

## Task index

| ID | Task | Status | Blocker |
|----|------|--------|---------|
| P12-T01 | Homepage interaction + motion audit | done | Yes |
| P12-T02 | Entrance reveal narrative + beat sheet | done | Yes |
| P12-T03 | Product overview click-to-explore interaction spec | done | Yes |
| P12-T04 | Widened frame + glow visual specification | done | Yes |
| P12-T05 | Homepage typography audit + revised type scale | todo | Yes |
| P12-T06 | Reveal sequence implementation (Hero + Product Overview mount) | done | Yes |
| P12-T07 | Product overview click-to-explore rebuild | todo | Yes |
| P12-T08 | Section-level animation polish pass | todo | Yes |
| P12-T09 | Typography scale implementation | todo | Yes |
| P12-T10 | Mobile + reduced-motion adaptation | todo | Yes |
| P12-T11 | Visual, accessibility, and performance QA | todo | Yes |
| P12-T12 | Phase 12 sign-off checklist | todo | Yes |

---

## Dependency graph

```text
P11-T14 (prerequisite)
   └──> P12-T01

P12-T01
   ├──> P12-T02
   ├──> P12-T03
   ├──> P12-T04
   ├──> P12-T05
   └──> P12-T08

P12-T02 + P12-T04
   └──> P12-T06

P12-T03 + P12-T04
   └──> P12-T07

P12-T05
   └──> P12-T09

P12-T06 + P12-T07
   └──> P12-T10

P12-T08 + P12-T09 + P12-T10
   └──> P12-T11

P12-T11
   └──> P12-T12
```

---

## P12-T01 - Homepage interaction + motion audit

**Status:** `done`  
**Blocker:** Yes  
**Depends on:** P11-T14  
**Output:** [P12-T01-interaction-audit.md](./phase-12/tasks/P12-T01-interaction-audit.md)

Study the Linear homepage load and animation pattern and the current MindMesh homepage implementation, then document the gap.

### Scope

- Linear's homepage: entrance pause/reveal timing, the narrow-to-wide expand, the glow treatment, and the pacing of later section animations (reference only — not a visual clone)
- Current `ProductOverviewDesktop` scroll-scrub implementation (`useScrollSection`, `getProductOverviewVisualStateFromProgress`, progress tabs as secondary control)
- Current homepage mount behavior for Hero and Product Overview (no entrance pause today)
- Current section-level animation (or absence of it) on Problem, How It Works, Feature Grid, Integrations, Trust, CTA
- Current typography scale usage across the homepage (sizes, line-height, measure) as raw inventory (not yet a proposal)

### Acceptance criteria

- [x] Linear's reveal/expand/glow pattern and later-page animation pacing are described in implementation-neutral terms (timing, easing category, what changes size/opacity), not asset-level copying
- [x] Current scroll-scrub mechanics and their scan-too-fast problem are documented with file references
- [x] Current homepage mount sequence (Hero, Product Overview) is documented with no entrance treatment noted as the gap
- [x] Current section animation state (present/absent) is documented per section
- [x] Current typography sizes are inventoried per section as raw input for P12-T05
- [x] Findings are scoped to inform P12-T02–T05 without prescribing final decisions

---

## P12-T02 - Entrance reveal narrative + beat sheet

**Status:** `done`  
**Blocker:** Yes  
**Depends on:** P12-T01  
**Output:** [P12-T02-reveal-beat-sheet.md](./phase-12/tasks/P12-T02-reveal-beat-sheet.md)

Define the exact pause-then-reveal sequence for the Hero → Product Overview mount.

### Scope

- Timing budget for the pause, the reveal, and the expand (must fit inside the existing LCP/CLS budget)
- What is static immediately (Hero H1, CTA) vs. what participates in the reveal (Product Overview frame only)
- Skeleton-to-real transition: how the existing CLS-safe skeleton (P11-T11) hands off to the revealed frame
- Reduced-motion equivalent: immediate final state, no pause or growth
- Explicit non-goal: the reveal must not delay Hero LCP or introduce CLS

### Acceptance criteria

- [x] Sequence has a named timing budget for pause, reveal, and expand
- [x] Hero LCP element and timing are explicitly unaffected by the sequence
- [x] Skeleton-to-real handoff is specified with no layout shift
- [x] Reduced-motion final state is specified
- [x] Sequence uses `transform` + `opacity` only

---

## P12-T03 - Product overview click-to-explore interaction spec

**Status:** `done`  
**Blocker:** Yes  
**Depends on:** P12-T01  
**Output:** [P12-T03-click-to-explore-spec.md](./phase-12/tasks/P12-T03-click-to-explore-spec.md)

Define the replacement navigation model for the Product Overview: click/tab-driven scene switching instead of scroll-scrub.

### Scope

- Default scene shown on mount (fully rendered, not scroll-tied)
- Progress tabs / sidebar as the primary control; keyboard and pointer behavior
- Scene-to-scene transition motion (discrete, not scroll-interpolated)
- Whether any residual scroll-linked motion remains (e.g., mount-only fade-in) and why
- Off-screen contract update: what "pause" means when navigation is no longer scroll-progress-based
- Mobile reconciliation: how the existing stacked tour concept maps onto a click-first model instead of scroll-into-view

### Acceptance criteria

- [x] Default mounted scene is fully rendered without requiring a scroll gesture to become legible
- [x] Progress tabs / sidebar are specified as the primary navigation control
- [x] Scene transitions are specified as discrete animations, not scroll-position interpolation
- [x] Off-screen / visibility pause behavior is redefined for the new model
- [x] Mobile behavior is specified consistently with the desktop click model
- [x] Spec keeps all four existing scenes and fixtures unchanged

---

## P12-T04 - Widened frame + glow visual specification

**Status:** `done`  
**Blocker:** Yes  
**Depends on:** P12-T01  
**Output:** [P12-T04-widened-frame-glow-spec.md](./phase-12/tasks/P12-T04-widened-frame-glow-spec.md)

Specify the visual presentation of the revealed Product Overview frame: wider than the shared marketing container, with a background glow.

### Scope

- New max-width for the revealed frame (explicit value; breaks out of `max-w-[1120px]`)
- Container/breakout mechanics (how the section escapes the standard `MarketingSection` width without affecting sibling sections)
- Glow treatment: shape, color tokens (from the `--mm-accent` family), blur/opacity, placement behind the frame
- Narrow-start → wide-reveal sizing states (before/after values, not just "bigger")
- Breakpoints: what "wide" means at tablet and mobile widths, or whether the effect is desktop-only
- CLS discipline: reserved space for the widest state up front

### Acceptance criteria

- [x] Explicit before/after width values are specified for the reveal
- [x] Breakout mechanism is specified without breaking the shared section container for other sections
- [x] Glow uses MindMesh design tokens, not literal Linear colors or assets
- [x] Behavior at tablet/mobile widths is explicitly specified (including "desktop-only" as a valid answer)
- [x] Reserved layout space prevents CLS at the widest state

---

## P12-T05 - Homepage typography audit + revised type scale

**Status:** `todo`  
**Blocker:** Yes  
**Depends on:** P12-T01  
**Output:** `docs/phase-12/tasks/P12-T05-typography-audit.md`

Review and, where warranted, revise homepage text sizes for Hero, section headings/subtitles, Product Overview scene copy, and body copy.

### Scope

- Hero eyebrow, H1, and thesis paragraphs
- `MarketingSection` eyebrow/title/subtitle scale (shared across Problem, How It Works, Features, Integrations, Trust, CTA)
- Product Overview workspace title/supporting text and scene copy sizes
- Line-height, measure (max character width), and contrast at each size
- Explicit before/after table per element with rationale

### Acceptance criteria

- [ ] Every homepage text role (eyebrow, H1, section H2, subtitle, body, overview copy) is listed with current size
- [ ] Proposed sizes (or "no change") are given per role with rationale tied to the new pacing/layout
- [ ] Line-height and measure are checked at proposed sizes for readability
- [ ] No proposed size regresses contrast or accessibility
- [ ] Proposal is limited to sizing/spacing, not new copy

---

## P12-T06 - Reveal sequence implementation (Hero + Product Overview mount)

**Status:** `done`  
**Blocker:** Yes  
**Depends on:** P12-T02, P12-T04  
**Output:** Updated product-overview mount components · [P12-T06-reveal-implementation.md](./phase-12/tasks/P12-T06-reveal-implementation.md)

Implement the pause-then-reveal-then-expand-with-glow sequence from P12-T02 and P12-T04.

### Acceptance criteria

- [x] Sequence matches the P12-T02 timing budget
- [x] Frame width and glow match the P12-T04 specification
- [x] Hero LCP element timing is unaffected (verified, not assumed)
- [x] CLS remains 0 through the sequence
- [x] Reduced-motion visitors see the final state immediately, no pause or growth
- [x] Motion uses `transform` + `opacity` only
- [x] Widened frame is not clipped by overflow ancestors; chrome borders remain visible
- [x] Product Overview sits in normal document flow (no leftover 180vh scrub runway / huge gap before the next section)
---

## P12-T07 - Product overview click-to-explore rebuild

**Status:** `todo`  
**Blocker:** Yes  
**Depends on:** P12-T03, P12-T04  
**Output:** Updated `components/marketing/product-overview/ProductOverviewDesktop.tsx` / `ProductOverviewMobile.tsx` · `docs/phase-12/tasks/P12-T07-click-to-explore-rebuild.md`

Rebuild Product Overview scene navigation from scroll-scrub to click/tab-driven, per the P12-T03 spec, reusing existing scenes and fixtures unchanged.

### Acceptance criteria

- [ ] Scene 1 is fully legible on mount without a scroll gesture
- [ ] Progress tabs / sidebar drive scene changes as the primary control
- [ ] Scene transitions are discrete `transform`/`opacity` animations, not scroll-position interpolation
- [ ] Existing four scenes and fixtures are unchanged in content
- [ ] Off-screen visibility pause behavior is implemented per the updated contract
- [ ] Keyboard navigation between scenes works (arrow keys / tab order, `role="tablist"`/`role="tab"` preserved)
- [ ] No product, Tauri, or Lottie dependency is introduced

---

## P12-T08 - Section-level animation polish pass

**Status:** `todo`  
**Blocker:** Yes  
**Depends on:** P12-T01  
**Output:** Updated `components/marketing/sections/*.tsx` · `docs/phase-12/tasks/P12-T08-section-animation-polish.md`

Apply a consistent, deliberate reveal-on-scroll treatment to Problem, How It Works, Feature Grid, Integrations, Trust, and CTA, in the spirit of Linear's later-page animation pacing.

### Acceptance criteria

- [ ] All six sections share one consistent animation approach (timing, easing, distance)
- [ ] Animation reads as deliberate, not abrupt or distracting
- [ ] Off-screen sections do not animate before scrolling into view
- [ ] Reduced-motion visitors see fully rendered sections with no animation dependency
- [ ] No layout shift is introduced by the animation
- [ ] Motion uses `transform` + `opacity` only

---

## P12-T09 - Typography scale implementation

**Status:** `todo`  
**Blocker:** Yes  
**Depends on:** P12-T05  
**Output:** Updated `components/marketing/sections/*.tsx` · `components/marketing/MarketingSection.tsx` · `components/marketing/product-overview/*.tsx` · `docs/phase-12/tasks/P12-T09-typography-implementation.md`

Apply the revised type scale from P12-T05 across the homepage.

### Acceptance criteria

- [ ] Sizes match the P12-T05 proposal per element
- [ ] No CLS or font-loading regression is introduced
- [ ] Hero LCP element and font strategy (P6-T08) remain intact
- [ ] Visual QA confirms readability at mobile, tablet, and desktop widths

---

## P12-T10 - Mobile + reduced-motion adaptation

**Status:** `todo`  
**Blocker:** Yes  
**Depends on:** P12-T06, P12-T07  
**Output:** `docs/phase-12/tasks/P12-T10-mobile-reduced-motion.md`

Ensure the new reveal sequence and click-to-explore navigation are complete and accessible on mobile and under `prefers-reduced-motion: reduce`.

### Acceptance criteria

- [ ] Mobile visitors get the same click/tap-first navigation as desktop (no scroll-scrub fallback reintroduced)
- [ ] Reduced-motion visitors get the full end state with no pause, growth, or scroll-tied dependency
- [ ] Touch targets meet the existing marketing-site contract (`min-h-11` or equivalent)
- [ ] No horizontal overflow or clipped content from the wider/glow frame at any breakpoint
- [ ] All four scenes remain reachable and legible on mobile

---

## P12-T11 - Visual, accessibility, and performance QA

**Status:** `todo`  
**Blocker:** Yes  
**Depends on:** P12-T08, P12-T09, P12-T10  
**Output:** `docs/phase-12/tasks/P12-T11-qa.md`

Validate the completed Phase 12 changes across motion modes, breakpoints, bundles, and homepage performance.

### Required QA

- Desktop and mobile visual review of the reveal sequence and click-to-explore navigation
- Reduced-motion review
- Keyboard and semantic review of scene navigation
- Section animation review (all six polished sections)
- Typography review at mobile/tablet/desktop widths
- Typecheck and production build
- Bundle inspection (no Lottie/Tauri/product modules)
- Homepage Lighthouse comparison against the [Phase 11 baseline](./phase-11/baselines/homepage-marketing-lighthouse.md)

### Acceptance criteria

- [ ] Reveal sequence and click-to-explore navigation work correctly at desktop and mobile widths
- [ ] No layout shift from the reveal, glow, or widened frame
- [ ] Reduced-motion and off-screen contracts pass
- [ ] No Lottie, Tauri, or product modules appear in homepage chunks
- [ ] LCP, CLS, and TBT remain within the documented marketing budget (no regression vs Phase 11 median)
- [ ] Findings and any accepted tradeoffs are recorded

---

## P12-T12 - Phase 12 sign-off checklist

**Status:** `todo`  
**Blocker:** Yes  
**Depends on:** P12-T11  
**Output:** `docs/phase-12/tasks/P12-T12-sign-off.md`

Close Phase 12 only after all blockers and QA findings are resolved.

### Acceptance criteria

- [ ] P12-T01 through P12-T11 are `done`
- [ ] Reveal sequence, click-to-explore navigation, section polish, and typography updates are recorded with evidence
- [ ] Mobile and reduced-motion evidence is recorded
- [ ] Performance and bundle evidence is recorded
- [ ] Deferred work is explicitly listed
- [ ] Phase 12 verdict is recorded

---

## Global Phase 12 contracts

These apply to every implementation task:

### Product fidelity

- Phase 11 scene content, fixtures, and product-truth copy are unchanged
- Click-to-explore navigation must not introduce new product claims

### Marketing safety

- Fixture-driven coded UI only; no new product, Tauri, or Lottie dependency
- No live API or OAuth calls; no real customer data

### Motion and accessibility

- Motion uses `transform` + `opacity` only
- Reduced-motion visitors receive a complete static experience, no pause/growth/scroll dependency
- Scene navigation and section animation are keyboard accessible and semantically correct
- Off-screen work pauses or skips animation

### Performance

- Hero LCP element and timing are protected
- CLS stays at 0 through the reveal, glow, and widened frame
- Verify bundle output and Lighthouse before sign-off against the Phase 11 baseline

---

## Phase 12 completion gate

Phase 12 is complete when:

1. P12-T01 through P12-T12 are `done`
2. The Hero → Product Overview mount plays a deliberate pause-then-reveal-then-expand-with-glow sequence
3. Product Overview scenes are navigated by click/tab, not scroll speed
4. Problem, How It Works, Feature Grid, Integrations, Trust, and CTA share a consistent, deliberate reveal-on-scroll treatment
5. Homepage typography has been re-audited and adjusted where warranted
6. Mobile and reduced-motion paths are complete
7. Homepage performance and bundle checks pass against the Phase 11 baseline
8. P12-T12 records the final verdict
