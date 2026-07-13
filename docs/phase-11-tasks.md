# Phase 11 Tasks

**Phase:** Homepage Product Overview  
**Status:** In progress (P11-T01–T14 done)  
**Prerequisite:** [Phase 10 sign-off](./phase-10/tasks/P10-T10-sign-off.md) (P10-T10, 2026-07-10)  
**Entry spec:** [phase-11-product-overview.md](./phase-11-product-overview.md)  
**Product source of truth:** `/Users/rohittripathi/Desktop/mindmesh_app`  
**Parent:** [phase-1-foundation.md](./phase-1-foundation.md) · [phase-10-theater-upgrades.md](./phase-10-theater-upgrades.md)

This file is the execution tracker for Phase 11. Phase 11 adds a Linear-inspired, MindMesh-specific product overview immediately below the homepage hero. It uses fixture-driven coded UI to show the current desktop product without importing authenticated product code or changing the rest of the homepage structure.

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
| P11-T01 | Product surface inventory + source-of-truth map | done | Yes |
| P11-T02 | Product overview narrative + scene beat sheet | done | Yes |
| P11-T03 | Product fixtures + privacy-safe demo data | done | Yes |
| P11-T04 | App-frame visual specification | done | Yes |
| P11-T05 | Product overview shell + scroll orchestration | done | Yes |
| P11-T06 | Attention Board scene | done | Yes |
| P11-T07 | Email + Upcoming Events scene | done | Yes |
| P11-T08 | Yesterday Narrative + Connected Apps scene | done | Yes |
| P11-T09 | Sensor + Mascot scene | done | Yes |
| P11-T10 | Scene transitions + progress navigation | done | Yes |
| P11-T11 | Homepage placement + dynamic loading | done | Yes |
| P11-T12 | Mobile + reduced-motion experience | done | Yes |
| P11-T13 | Homepage product-truth alignment | done | Yes |
| P11-T14 | Visual, accessibility, and performance QA | done | Yes |
| P11-T15 | Phase 11 sign-off checklist | todo | Yes |

---

## Dependency graph

```text
P11-T01
   ├──> P11-T02
   ├──> P11-T03
   └──> P11-T04

P11-T02 + P11-T03 + P11-T04
   └──> P11-T05

P11-T05
   ├──> P11-T06
   ├──> P11-T07
   ├──> P11-T08
   └──> P11-T09

P11-T06 + P11-T07 + P11-T08 + P11-T09
   ├──> P11-T10
   └──> P11-T13

P11-T10
   └──> P11-T11

P11-T11
   └──> P11-T12

P11-T12 + P11-T13
   └──> P11-T14

P11-T14
   └──> P11-T15
```

---

## P11-T01 - Product surface inventory + source-of-truth map

**Status:** `done`  
**Blocker:** Yes  
**Depends on:** P10-T10  
**Completed:** 2026-07-10  
**Output:** [docs/phase-11/tasks/P11-T01-product-inventory.md](./phase-11/tasks/P11-T01-product-inventory.md)

Audit the current `mindmesh_app` desktop product and map each homepage overview surface to its authoritative component, fixture shape, and behavior.

### Notes

- Default workspace is **Attention Board** (`DEFAULT_DASHBOARD_TAB = 'attention'`).
- All eight product surfaces are **non-importable** (auth, live APIs, Tauri, and/or Lottie/Qdrant).
- Strongest reuse: `ProductFrame`, Static* marketing variants, Sensor/Mascot panels, integrations fixtures, local mascot stills.
- Largest gaps: Attention Board UI/fixtures, marketing narrative panel, overview sidebar chrome.
- P11-T13 candidates: hero "one thing" copy, Execute auto-write framing, JSON-LD `operatingSystem: 'Web'`.

### Scope

- Attention Board and ranked action cards
- Email inbox, sent, and drafts
- Upcoming calendar events
- Yesterday narrative
- Connected apps
- Sensor command bar
- Mascot chat and attachment search
- Desktop shell, navigation, and content hierarchy
- Existing marketing components that can be reused safely

### Acceptance criteria

- [x] Every proposed scene points to current product source files
- [x] Product-only dependencies are marked as non-importable
- [x] Reusable marketing components and fixtures are identified
- [x] Unsupported or stale homepage claims are listed for P11-T13
- [x] No implementation begins from screenshots alone

---

## P11-T02 - Product overview narrative + scene beat sheet

**Status:** `done`  
**Blocker:** Yes  
**Depends on:** P11-T01  
**Completed:** 2026-07-10  
**Output:** [docs/phase-11/tasks/P11-T02-overview-beat-sheet.md](./phase-11/tasks/P11-T02-overview-beat-sheet.md)

Define the product-led story directly below the hero and the exact state shown at each scene.

### Notes

- Through-line: Alex @ Acme before the 2pm client call across four scenes in one shell.
- Overview id: `productOverview`; desktop runway target **180vh**; reduced-motion jump **0.90**.
- Scene 1 is a multi-item Attention Board (not one priority). Scene 4 reuses Sensor calc + Mascot attachment stills.
- Overview does not replace Connect / Focus / Execute; it sits under the hero as product context.

### Required scenes

1. Attention Board
2. Email + Upcoming Events
3. Yesterday Narrative + Connected Apps
4. Sensor + Mascot

### Acceptance criteria

- [x] Each scene has a purpose, headline, supporting copy, and final visual state
- [x] The sequence explains one coherent workday rather than a feature collage
- [x] Scene timing avoids long idle scroll ranges
- [x] Desktop, mobile, and reduced-motion states are specified
- [x] Claims match the P11-T01 source-of-truth map

---

## P11-T03 - Product fixtures + privacy-safe demo data

**Status:** `done`  
**Blocker:** Yes  
**Depends on:** P11-T01  
**Completed:** 2026-07-10  
**Output:** [`lib/marketing-product-overview-data.ts`](../lib/marketing-product-overview-data.ts) · [task notes](./phase-11/tasks/P11-T03-product-fixtures.md)

Create deterministic, privacy-safe fixtures shared by all product overview scenes.

### Notes

- Acme / Alex continuity with Dana, 2pm call, and PROD-142.
- New Attention Board + yesterday narrative fixtures; inbox folders + focused email detail.
- Reuses inbox/calendar/connected-apps demo data and Sensor calc + Mascot attachment stills.
- `PRODUCT_OVERVIEW_FIXTURES` is the complete static / reduced-motion bundle.

### Fixture groups

- Attention items and why-now signals
- Inbox threads and email detail
- Calendar events
- Yesterday narrative and evidence
- Connected-app statuses
- Sensor query and result
- Mascot prompt, response, and attachment result

### Acceptance criteria

- [x] Data is synthetic and contains no customer or developer secrets
- [x] Fixtures use readonly types and stable IDs
- [x] No network or browser storage dependency
- [x] Scene copy can be traced to product behavior
- [x] Fixtures can render a complete static reduced-motion state

---

## P11-T04 - App-frame visual specification

**Status:** `done`  
**Blocker:** Yes  
**Depends on:** P11-T01  
**Completed:** 2026-07-10  
**Output:** [docs/phase-11/tasks/P11-T04-app-frame-spec.md](./phase-11/tasks/P11-T04-app-frame-spec.md)

Specify a faithful but simplified desktop app frame for the overview.

### Notes

- Persistent shell: title bar + **220px** sidebar + workspace header + main pane.
- Chrome heights match existing theater frame (`70vh` / `720px` desktop).
- Marketing `mm-*` tokens only (no product amber, no Linear look).
- Mobile: stacked final-state cards; skeleton reserves the same box for CLS-safe dynamic import.

### Scope

- Window chrome
- Left navigation rail
- Workspace header
- Main content region
- Sidebar / detail panel behavior
- Breakpoints and aspect ratios
- Loading skeleton and reserved dimensions

### Acceptance criteria

- [x] Frame is recognizably MindMesh and not a Linear visual copy
- [x] Dimensions prevent layout shift
- [x] Mobile fallback is specified
- [x] Product controls are clearly decorative or scene-driven
- [x] Tokens come from the marketing design system where possible

---

## P11-T05 - Product overview shell + scroll orchestration

**Status:** `done`  
**Blocker:** Yes  
**Depends on:** P11-T02, P11-T03, P11-T04  
**Completed:** 2026-07-10  
**Output:** [`components/marketing/product-overview/ProductOverviewSection.tsx`](../components/marketing/product-overview/ProductOverviewSection.tsx) · [task notes](./phase-11/tasks/P11-T05-overview-shell.md)

Build the shared product overview shell, frame, context, and scene orchestration.

### Notes

- `productOverview` theater: **180vh** desktop runway, reduced-motion **0.9**.
- Persistent frame (title bar + 220px sidebar + layered main pane).
- Desktop scrub + mobile stacked cards; fixture placeholders until P11-T06–T09.
- Not mounted on the homepage yet (P11-T11).

### Target structure

```text
components/marketing/product-overview/
  ProductOverviewSection.tsx
  ProductOverviewFrame.tsx
  ProductOverviewContext.tsx
  ProductOverviewNav.tsx
  scenes/
```

### Acceptance criteria

- [x] One persistent desktop app frame hosts all scenes
- [x] Desktop uses a compact scroll-linked sequence
- [x] Target runway starts within 170–190vh and is tuned by visual QA
- [x] Progress clamps safely from 0 to 1
- [x] Off-screen updates pause
- [x] Motion uses `transform` + `opacity` only
- [x] No product repository code is imported

---

## P11-T06 - Attention Board scene

**Status:** `done`  
**Blocker:** Yes  
**Depends on:** P11-T05  
**Completed:** 2026-07-10  
**Output:** [`components/marketing/product-overview/scenes/AttentionOverviewScene.tsx`](../components/marketing/product-overview/scenes/AttentionOverviewScene.tsx) · [task notes](./phase-11/tasks/P11-T06-attention-scene.md)

Build the opening overview scene around the current Attention Board.

### Notes

- Ranked board with Now (2 cards), Later Today, Quietly Handled, and overlap chip.
- Source badges use marketing integration icons; why-now copy is fixture-driven.
- Works as a complete static final (reduced motion / mobile).

### Acceptance criteria

- [x] Now, Later Today, and Quietly Handled are represented
- [x] Multiple ranked items are visible
- [x] Source badges and why-now reasoning are legible
- [x] Calendar overlap or timing context is shown
- [x] Final state works without animation

---

## P11-T07 - Email + Upcoming Events scene

**Status:** `done`  
**Blocker:** Yes  
**Depends on:** P11-T05  
**Completed:** 2026-07-12  
**Output:** [`components/marketing/product-overview/scenes/InboxCalendarOverviewScene.tsx`](../components/marketing/product-overview/scenes/InboxCalendarOverviewScene.tsx) · [task notes](./phase-11/tasks/P11-T07-inbox-calendar-scene.md)

Build the communication scene using a simplified inbox, focused email, and upcoming events panel.

### Notes

- Decorative folder strip (Inbox / All / Sent / Drafts) with counts.
- Reuses marketing `StaticInboxList` + `StaticCalendarEvents`.
- Focused Dana thread includes **Needs approval** framing; Join buttons hidden.

### Acceptance criteria

- [x] Inbox hierarchy resembles the current desktop product
- [x] All / Sent / Drafts are represented without implying live controls
- [x] One focused message exposes useful context
- [x] Upcoming event state is visible
- [x] Any send or write action is shown as approval-aware

---

## P11-T08 - Yesterday Narrative + Connected Apps scene

**Status:** `done`  
**Blocker:** Yes  
**Depends on:** P11-T05  
**Completed:** 2026-07-12  
**Output:** [`components/marketing/product-overview/scenes/NarrativeAppsOverviewScene.tsx`](../components/marketing/product-overview/scenes/NarrativeAppsOverviewScene.tsx) · [task notes](./phase-11/tasks/P11-T08-narrative-apps-scene.md)

Build the reflection and connected-context scene.

### Notes

- Narrative card with summary, stats, highlight, open loop, and evidence chips.
- Reuses marketing `StaticConnectedApps` at final connected/sync state (7 sources).
- Explicit read-source framing; no automatic Slack/Jira writes implied.

### Acceptance criteria

- [x] Yesterday narrative contains an actionable recap
- [x] Evidence or supporting stats are visible
- [x] Seven connected product sources are represented
- [x] Connected and sync states are visually distinct
- [x] No unsupported automatic-write behavior is implied

---

## P11-T09 - Sensor + Mascot scene

**Status:** `done`  
**Blocker:** Yes  
**Depends on:** P11-T05  
**Completed:** 2026-07-12  
**Output:** [`components/marketing/product-overview/scenes/CompanionsOverviewScene.tsx`](../components/marketing/product-overview/scenes/CompanionsOverviewScene.tsx) · [task notes](./phase-11/tasks/P11-T09-companions-scene.md)

Build the final overview scene around the two desktop companion surfaces.

### Notes

- Reuses `MarketingSensorCalcPanel` + `MarketingMascotAttachmentPanel` in final states.
- Sherpa local still; no live Lottie. Distinct companion-window chrome for each surface.
- Scroll stagger via `sensorVisible` / `mascotVisible`.

### Acceptance criteria

- [x] Sensor command and deterministic result are shown
- [x] Mascot conversation or attachment result is shown
- [x] Sensor and Mascot remain distinct product surfaces
- [x] Existing Phase 10 marketing panels are reused where practical
- [x] Mascot uses local stills; no live Lottie is loaded

---

## P11-T10 - Scene transitions + progress navigation

**Status:** `done`  
**Blocker:** Yes  
**Depends on:** P11-T06, P11-T07, P11-T08, P11-T09  
**Completed:** 2026-07-12  
**Output:** [`ProductOverviewProgressNav.tsx`](../components/marketing/product-overview/ProductOverviewProgressNav.tsx) · [task notes](./phase-11/tasks/P11-T10-scene-transitions.md)

Connect the four scenes into one guided product walkthrough.

### Notes

- Numbered scene tabs with labels (not color alone); keyboard arrows supported.
- Desktop jumps to hold beats; mobile sticky nav scroll-into-views stacked cards.
- Reduced-motion: nav visible, non-interactive while progress is pinned.

### Acceptance criteria

- [x] Current scene is obvious without reading hidden controls
- [x] Transition order follows the approved beat sheet
- [x] No scene visually overlaps the next section
- [x] Keyboard and pointer navigation are coherent where controls exist
- [x] Animations do not depend on color alone
- [x] No dead scroll zones are present

---

## P11-T11 - Homepage placement + dynamic loading

**Status:** `done`  
**Blocker:** Yes  
**Depends on:** P11-T10  
**Completed:** 2026-07-12  
**Output:** [`app/page.tsx`](../app/page.tsx) · [`ProductOverviewHome.tsx`](../components/marketing/product-overview/ProductOverviewHome.tsx) · [task notes](./phase-11/tasks/P11-T11-homepage-placement.md)

Mount the complete product overview directly after `HeroSection`.

### Notes

- Order: Hero → Product Overview → Problem (rest unchanged).
- SSR section chrome; Desktop/Mobile load dynamically with a CLS-safe skeleton (`180vh` desktop reserve).
- Hero LCP path untouched; no product-repo imports.

### Acceptance criteria

- [x] Order is Hero, Product Overview, Problem
- [x] Interactive body is dynamically loaded below the hero
- [x] A dimensionally stable server-rendered shell or fallback is present
- [x] Hero H1, CTA, and LCP path are unchanged
- [x] Existing homepage sections remain in their current order
- [x] No authenticated product dependency reaches the homepage bundle

---

## P11-T12 - Mobile + reduced-motion experience

**Status:** `done`  
**Blocker:** Yes  
**Depends on:** P11-T11  
**Completed:** 2026-07-12  
**Output:** Stacked static tour for mobile + reduced-motion · [task notes](./phase-11/tasks/P11-T12-mobile-reduced-motion.md)

Create complete alternatives for visitors who cannot or should not use the sticky desktop sequence.

### Notes

- Reduced-motion desktop uses the same four-card static tour as mobile (not scene-4-only scrub).
- CSS `motion-reduce` routing avoids scrub; touch targets at `min-h-11`; overflow clipped.

### Acceptance criteria

- [x] Mobile uses normal document flow
- [x] All four product stories remain understandable
- [x] `prefers-reduced-motion: reduce` avoids scroll scrubbing
- [x] Reduced-motion state shows complete representative content
- [x] No clipped controls, horizontal page scroll, or text overflow
- [x] Touch targets meet the existing marketing-site contract

---

## P11-T13 - Homepage product-truth alignment

**Status:** `done`  
**Blocker:** Yes  
**Depends on:** P11-T06, P11-T07, P11-T08, P11-T09  
**Output:** [P11-T13-product-truth-alignment.md](./phase-11/tasks/P11-T13-product-truth-alignment.md)

Correct homepage statements that conflict with the current product as discovered in P11-T01.

### Acceptance criteria

- [x] Attention Board descriptions reflect multiple ranked items
- [x] Email and calendar actions do not overstate automatic writes
- [x] Sensor, Mascot, Slack, and Jira claims match current behavior
- [x] Existing narrative remains concise
- [x] Changes are limited to product-truth corrections, not a full-site rewrite

---

## P11-T14 - Visual, accessibility, and performance QA

**Status:** `done`  
**Blocker:** Yes  
**Depends on:** P11-T12, P11-T13  
**Output:** [P11-T14-product-overview-qa.md](./phase-11/tasks/P11-T14-product-overview-qa.md)

Validate the completed overview across motion modes, breakpoints, bundles, and homepage performance.

### Required QA

- Desktop and mobile visual review
- Reduced-motion review
- Off-screen pause / resume review
- Keyboard and semantic review
- Dead-zone and sticky-overlap review
- Typecheck and lint
- Production build
- Bundle inspection
- Homepage Lighthouse comparison

### Acceptance criteria

- [x] Four scenes are clear at desktop and mobile widths
- [x] No sticky overlap or delayed second-scene reveal
- [x] No layout shift from the product frame
- [x] Reduced-motion and off-screen contracts pass
- [x] No Lottie, Tauri, or product modules appear in homepage chunks
- [x] LCP, CLS, and TBT remain within the documented marketing budget
- [x] Findings and any accepted tradeoffs are recorded

---

## P11-T15 - Phase 11 sign-off checklist

**Status:** `todo`  
**Blocker:** Yes  
**Depends on:** P11-T14  
**Output:** `docs/phase-11/tasks/P11-T15-sign-off.md`

Close Phase 11 only after all blockers and QA findings are resolved.

### Acceptance criteria

- [ ] P11-T01 through P11-T14 are `done`
- [ ] Product overview is directly below the hero
- [ ] Product source-of-truth links are recorded
- [ ] Mobile and reduced-motion evidence is recorded
- [ ] Performance and bundle evidence is recorded
- [ ] Deferred work is explicitly listed
- [ ] Phase 11 verdict is recorded

---

## Global Phase 11 contracts

These apply to every implementation task:

### Product fidelity

- The current `mindmesh_app` desktop repository is the product source of truth
- Do not recreate legacy website dashboard assumptions
- Do not imply unsupported product actions

### Marketing safety

- Fixture-driven coded UI only
- No live product APIs, OAuth, Tauri, or customer data
- No live Lottie on the marketing funnel
- Reuse local mascot stills

### Motion and accessibility

- Motion uses `transform` + `opacity` only
- Reduced-motion users receive a complete static experience
- Off-screen work pauses
- Controls are keyboard accessible and semantically correct

### Performance

- Preserve the hero's server-rendered LCP path
- Dynamically load the interactive product overview
- Reserve frame dimensions to prevent CLS
- Verify bundle output and Lighthouse before sign-off

---

## Phase 11 completion gate

Phase 11 is complete when:

1. P11-T01 through P11-T15 are `done`
2. The product overview appears directly below the homepage hero
3. All four current-product scenes are represented
4. Desktop scrolling has no dead zones or sticky overlap
5. Mobile and reduced-motion paths are complete
6. Product-truth corrections are applied
7. Homepage performance and bundle checks pass
8. P11-T15 records the final verdict
