# Phase 12: Homepage Reveal, Click-to-Explore, and Type Scale

**Status:** Planning (tasks not started)  
**Prerequisite:** [Phase 11 QA](./phase-11/tasks/P11-T14-product-overview-qa.md) (P11-T14, 2026-07-12). Phase 11 sign-off (P11-T15) is intentionally deferred until this phase is scoped.  
**Task breakdown:** [phase-12-tasks.md](./phase-12-tasks.md)  
**Inspiration reference:** [linear.app](https://linear.app/) homepage load sequence and later-page animation style  
**Parent:** [phase-11-product-overview.md](./phase-11-product-overview.md)

Phase 12 changes **how** the homepage product overview reveals itself and **how visitors move through it**. It does not replace the Phase 11 scenes, fixtures, or product-truth work; it changes the entrance animation and the navigation model around them, then extends the same polish to the rest of the homepage and reviews text sizing throughout.

---

## Why

Direct feedback from reviewing [linear.app](https://linear.app/):

1. Linear's homepage app panel does not appear instantly. There is a short pause, then the product frame reveals itself, starting narrower and expanding into a wider, glowing display before the rest of the animated sequence plays.
2. Visitors are not forced through a fast, scroll-driven pass over every product surface. The narrative sections play out, but the product panel itself invites clicking to explore rather than racing past it on scroll.
3. Animation later on the page (feature reveals, transitions) reads as deliberate and polished, not just present.

The current MindMesh homepage:

- Mounts the Hero and Product Overview instantly (server chrome + client hydration), with no entrance pause or "reveal" moment.
- Drives all four Product Overview scenes from **scroll position** (`useScrollSection` + `getProductOverviewVisualStateFromProgress`), so a fast scroll moves through Attention → Inbox → Narrative → Companions quickly, before a visitor has read any one scene.
- Keeps the Product Overview frame at the same `max-w-[1120px]` container width as every other section, with no background glow treatment.
- Uses a single type scale carried over from Phase 1–6 for Hero and section headings, not reviewed against the denser Phase 11 layout.

---

## Goals

1. Give the Hero → Product Overview mount a deliberate, Linear-style reveal: brief pause, then the frame appears and expands into a wider, glowing presentation.
2. Replace scroll-scrubbed scene switching in the Product Overview with **click-to-explore** navigation: the frame loads fully rendered, then visitors choose which scene to view via the existing progress tabs / sidebar, at their own pace.
3. Extend the same animation polish (staged, deliberate reveals) to the sections below the overview (Problem, How It Works, Feature Grid, Integrations, Trust, CTA).
4. Re-audit and adjust homepage typography (Hero, section headings, body copy, overview scene copy) for the new pacing and layout.
5. Protect everything Phase 6 and Phase 11 already earned: Hero LCP path, CLS budget, reduced-motion completeness, and no product/Tauri/Lottie code in the homepage bundle.

---

## Relationship to Phase 11

Phase 11 built the Product Overview shell, four scenes, fixtures, progress navigation, and product-truth copy. Phase 12 **reuses all of it** and changes two things:

| Kept from Phase 11 | Changed in Phase 12 |
|---|---|
| Four scenes (Attention, Inbox & Events, Narrative & Apps, Companions) | Scene switching driven by click/tab, not scroll progress |
| Fixtures (`marketing-product-overview-data.ts`) | Entrance: pause → reveal → expand → glow on first mount |
| `ProductOverviewFrame` chrome, sidebar, captions | Frame width: breaks out of the shared `max-w-[1120px]` container when revealed |
| Progress nav component (`ProductOverviewProgressNav`) | Progress nav becomes the **primary** navigation control, not a secondary jump aid |
| Mobile stacked tour concept | Reconciled with the new desktop click model so both are click/tap-first |
| Product-truth constraints (multi-item Attention, approval-aware writes, desktop-first) | Unchanged; still binding |

This is a net product-truth improvement: the real desktop app's sidebar navigation (Attention / Inbox / Narrative / Apps) is itself click-driven, not scroll-driven. Click-to-explore is closer to how MindMesh actually works than a scroll scrub.

---

## Scope

### In scope

1. Homepage load/reveal choreography for Hero + Product Overview mount (pause, reveal, expand, glow)
2. Product Overview interaction model: scroll-scrub → click/tab-driven scene navigation
3. Visual spec + implementation for a widened, glowing product frame presentation
4. Reveal-on-scroll polish for Problem, How It Works, Feature Grid, Integrations, Trust, CTA
5. Homepage typography audit and revised type scale
6. Mobile + reduced-motion equivalents for all of the above
7. Full QA pass (visual, accessibility, performance, bundle) before sign-off

### Out of scope

- Rebuilding or restaging the four Product Overview scenes' content (Phase 11 content stands)
- New product-truth claims beyond what Phase 11 already corrected
- Copying Linear's visual identity, branding, or literal layout — only the **pacing and presentation pattern** (pause → reveal → expand → glow; deliberate section animation) is the reference
- Introducing scroll-jacking or disabling normal page scroll
- Any authenticated product, Tauri, or live Lottie dependency on the homepage

---

## Interaction model change (detail)

**Before (Phase 11):**

- Visitor scrolls; wrapper progress (0→1) maps to scene (1–4) and pane motion.
- Progress tabs exist but are a secondary "jump" affordance on top of scroll.
- Fast scrolling skips scene content before it is readable.

**After (Phase 12):**

- Visitor scrolls the page normally into the Product Overview section; the frame mounts already showing scene 1 in a settled, fully rendered state (no scroll-tied scrubbing required to see content).
- The visitor clicks progress tabs / sidebar entries to move between scenes, each a discrete, animated transition (`transform` + `opacity`) rather than a scroll-position interpolation.
- Optional: a light one-time entrance motion plays when the section first scrolls into view (the "reveal", covered by P12-T02/T06), separate from scene-to-scene navigation.
- Off-screen pause changes from "pause scroll-progress updates" to "pause/skip entrance and scene-transition animations while not visible."

---

## Visual reveal (detail)

Reference behavior from [linear.app](https://linear.app/): on load, the page holds briefly, then the product frame animates in, growing from a narrower starting frame into a wider full presentation with a soft glow behind it, timed with the rest of the entrance sequence.

MindMesh adaptation constraints:

- Must not delay or resize the Hero H1 LCP element (Phase 6/11 contract).
- The reveal applies to the **Product Overview frame**, not the Hero text.
- "Wider" means the frame is allowed to exceed the shared `max-w-[1120px]` marketing container (up to a new, explicitly specified max width) — this requires a container change, not just a CSS transform.
- Glow is a background treatment (radial gradient / blurred glow shape) behind the frame, MindMesh-colored (`--mm-accent` family), not a literal copy of Linear's colors.
- Reduced-motion visitors get the same end state immediately, no pause and no growth animation.

---

## Performance and accessibility budget

- Hero LCP element and timing stay within the Phase 6/11 budget (soft ceiling 3.5s, target &lt;2.5s exception tracked in P6-T09).
- CLS stays at 0; the wider/glow frame must reserve its layout space up front (skeleton sizing, same discipline as P11-T11).
- No additional product, Tauri, or Lottie modules in the homepage bundle.
- Reveal and section animations use `transform` + `opacity` only.
- Reduced-motion visitors get a complete, static-equivalent experience with no pause, growth, or scroll-tied dependency.
- Click-driven scene navigation is keyboard accessible (arrow keys / tab order), matching the existing `role="tablist"` / `role="tab"` contract from P11-T10.

---

## Definition of done

- [ ] Homepage Hero → Product Overview mount plays a deliberate pause-then-reveal sequence with an expand + glow, guarded by reduced motion
- [ ] Product Overview scene navigation is click/tab-driven; visitors are not forced through scenes by scroll speed
- [ ] Problem, How It Works, Feature Grid, Integrations, Trust, and CTA carry a consistent, deliberate reveal-on-scroll treatment
- [ ] Homepage typography has been re-audited and adjusted where the audit calls for it
- [ ] Mobile and reduced-motion visitors get complete, accessible equivalents of all of the above
- [ ] No product, Tauri, or Lottie code reaches the homepage bundle
- [ ] Hero LCP path, CLS budget, and existing product-truth copy are unchanged or improved
- [ ] P12 sign-off records the final verdict and any accepted tradeoffs
