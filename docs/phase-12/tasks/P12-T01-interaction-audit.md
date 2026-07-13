# P12-T01 - Homepage interaction + motion audit

**Status:** `done`
**Depends on:** P11-T14
**Output consumers:** P12-T02 (reveal beat sheet), P12-T03 (click-to-explore spec), P12-T04 (widened frame + glow spec), P12-T05 (typography audit), P12-T08 (section animation polish)

This audit inventories, in implementation-neutral terms, how linear.app's homepage reveals and paces itself, how MindMesh's homepage currently mounts and animates, and what homepage text sizes exist today. It does not propose final decisions; it hands off raw findings and named gaps to P12-T02 through T05 and T08.

---

## 1. linear.app reveal / expand / glow / pacing (reference only)

Method: live inspection of `https://linear.app/` via CDP (computed styles, bounding boxes, DOM attributes), not visual copying of assets or colors.

### 1.1 Frame breakout (narrow → wide)

The hero app visual sits inside a nested wrapper chain:

- `.wrapper` (page-column width, ~1044px on a 1120px-ish viewport)
- `.frameWrapper` (same column width, 1044px) - this is the "slot" the layout reserves
- `.frame` (**1200px**, wider than its own parent) - the actual app visual, allowed to overflow the column
- `.view` (952px) - the cropped/visible viewport onto the app screenshot inside the frame

Concretely: the reserved layout slot is column-width, but the visual content inside is rendered wider than the column and allowed to bleed past it. This is the "narrow-start, wide-reveal" effect the user described, not a slot that resizes. **Implementation-neutral takeaway:** the *reveal* is a width mismatch between an outer positioning wrapper (matches the grid) and an inner visual frame (wider than the grid), not a live width transition tied to scroll.

### 1.2 Glow treatment

Every major app-visual block on the page (hero, and later sections such as the agent/Slack panels) has a sibling `glow` div:

- Fixed square box, **400x400px**, `position: absolute`, `border-radius: 400px` (a circle)
- `background: radial-gradient(50% 50%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 90%)` - i.e. a very low-opacity white radial fade, not a saturated color
- Centered behind the frame via a `translate(-200px, -200px)`-style offset (half the box's own size), so it sits centered on the frame edge/corner it's illuminating
- A second `shade`/`shadows` layer provides a darker vignette on the opposite side for depth

**Implementation-neutral takeaway:** the glow is a soft, low-opacity radial gradient in a fixed circular box positioned absolutely behind the frame, not a box-shadow blur and not a colored brand glow at full saturation. Later sections reuse the same glow pattern with different anchor points, suggesting a single reusable "glow behind frame" primitive rather than a one-off hero effect.

### 1.3 Progressive image reveal

Images inside app visuals carry a `data-loaded="true"|"false"` attribute that flips once each image finishes loading. This is consistent with a per-image fade-in-on-load pattern (opacity/blur transition gated by load state) rather than a single all-at-once reveal, which explains why a slow network shows the frame appearing before all its contents are legible.

### 1.4 Later-section pacing

Section headings and body copy on linear.app are broken into multiple stacked `<span>`/text nodes at the same DOM position (e.g. three overlapping copies of the same heading text), which is characteristic of a mask/line reveal technique (multiple states of the same text swapped or crossfaded rather than one static node). Sections below the fold reuse the same glow-behind-frame primitive with different accent placement, giving the page a consistent, deliberate rhythm rather than a different animation per section.

### 1.5 What this means for MindMesh (non-prescriptive)

- A **pause** (hero copy visible, product frame not yet expanded) followed by a **reveal** (frame fades/scales to its resting state) followed by an **expand** (frame's rendered width exceeds the shared content column while its outer slot stays put) is achievable with `opacity` + `transform: scale()` + a wider inner element, no new asset pipeline required.
- A glow behind the frame can be a low-opacity radial-gradient div using MindMesh's own `--mm-accent`/`--mm-primary` tokens (see P12-T04), not literal Linear colors.
- Later-section pacing on MindMesh doesn't need per-letter/per-line text splitting; a consistent fade + slight rise on scroll-into-view (already a common pattern, see 3.2) is sufficient to read as "deliberate" without new animation infrastructure.

---

## 2. Current MindMesh scroll-scrub mechanics (the "scans too fast" problem)

### 2.1 Mechanism

`ProductOverviewDesktop` (`components/marketing/product-overview/ProductOverviewDesktop.tsx:57-161`) drives all four Product Overview scenes from a single continuous scroll-progress value:

- `useScrollSection({ theaterId: 'productOverview' })` (`hooks/useScrollSection.ts:40-214`) tracks an IntersectionObserver + scroll/resize/rAF loop and returns `progress` (0-1) measured across the wrapper's scroll distance via `measureTheaterScrollProgress`.
- `getProductOverviewVisualStateFromProgress(progress)` (`lib/marketing-product-overview-scroll.ts:115-142`) maps that single number to: active scene (via fixed ranges, `SCENE_RANGES` at lines 37-46: scene 1 = 0-0.34, scene 2 = 0.34-0.56, scene 3 = 0.56-0.76, scene 4 = 0.76-1), sidebar tab, email-expanded flag, per-scene pane opacity/translateY (`paneMotionForScene`, lines 96-112), and the caption string.
- The wrapper's scroll distance is a `min-height` set in `app/globals.css:207-229` (`120vh`/`180vh`/`240vh` depending on breakpoint and theater id), so scene changes happen purely as a function of how far the visitor has scrolled through that reserved height, not as a function of dwell time or explicit intent.
- Each scene's "enter" animation is itself scroll-progress-driven: the first 25% of a scene's local range fades/slides its pane in (`enter = Math.min(1, local / 0.25)`), so a fast scroll (e.g. flick-scroll, trackpad momentum, or "scroll to see everything" behavior) can blow through a scene's enter animation and its hold beat inside the same rAF tick.

### 2.2 The scan-too-fast problem

Because scene identity is derived from `scrollY` alone, there is no floor on how much wall-clock time a visitor spends looking at any scene. A visitor who scrolls at normal reading speed (or faster, which is common on marketing pages) can move from scene 1 to scene 4 in well under a second of real time, seeing four different scenes' worth of copy, layout, and email/calendar content flash past with no chance to actually read any of it. This is the core problem P12-T03 needs to solve by decoupling "which scene is showing" from "how fast the visitor's scroll wheel is spinning."

### 2.3 Secondary control: progress tabs already partially "click-to-explore"

`ProductOverviewProgressNav` (`components/marketing/product-overview/ProductOverviewProgressNav.tsx`) already renders a `role="tablist"`/`role="tab"` control with working keyboard arrow/Home/End navigation and `aria-selected`. However, on desktop its `onSelectScene` handler (wired in `ProductOverviewDesktop.tsx:71-75`) does **not** set scene state directly - it calls `scrollProductOverviewToScene(wrapper, scene)` (`lib/marketing-product-overview-scroll.ts:175-183`), which programmatically `scrollTo`'s the page to the scroll offset that corresponds to that scene's "hold" progress value (`PRODUCT_OVERVIEW_SCENE_JUMP_PROGRESS`, lines 52-60). In other words, today's "click a tab" experience is a scroll-jump simulation, not a direct scene switch; the click-to-explore rebuild (P12-T07) needs to replace this indirection with state that sets the active scene directly, independent of scroll position. Mobile (`ProductOverviewMobile.tsx:103-107`) does the same thing via `scrollIntoView`.

### 2.4 Reduced-motion and off-screen handling (keep as reference for the new contract)

- `usePrefersReducedMotion()` short-circuits `ProductOverviewDesktop` entirely (`ProductOverviewDesktop.tsx:157-161`); reduced-motion desktop visitors get `ProductOverviewMobile`'s stacked, non-scrubbed cards instead (routed via CSS in `ProductOverviewInteractive.tsx:39-51`, not JS).
- `useScrollSection`'s `isPaused` (`hooks/useScrollSection.ts:199`) is `true` whenever the wrapper is off-screen or reduced motion is on, and all scroll/rAF listeners are gated on `isInView`/`!prefersReducedMotion`, so off-screen work already stops today. P12-T03 needs to redefine what "paused" means once navigation is no longer scroll-progress-based (there's no scroll progress to pause).

---

## 3. Current homepage mount + section animation state

### 3.1 Mount order and Hero/Product Overview sequencing

`app/page.tsx:61-69` mounts sections in this order: `HeroSection` -> `ProductOverviewHome` -> `ProblemSection` -> `HowItWorksSection` -> `MarketingTheaterSections` (Connect/Focus/Execute/Sensor/Mascot theaters) -> `FeatureGridSection` -> `IntegrationsSection` -> `TrustSection` -> `FinalCTASection`.

- `HeroSection` (`components/marketing/sections/HeroSection.tsx:10-49`) is a plain server-rendered `<section>`. Its H1 carries the `hero-lcp` class and is explicitly documented as the LCP candidate (P6-T08). It has no entrance animation, no opacity/transform state - it paints as soon as HTML+CSS are ready.
- `ProductOverviewHome` (`components/marketing/product-overview/ProductOverviewHome.tsx:9-23`) renders its `MarketingSection` chrome (eyebrow/title/subtitle) synchronously/server-side, then mounts `ProductOverviewInteractive`, which `next/dynamic`-imports (`ssr: false`) either `ProductOverviewDesktop` or `ProductOverviewMobile` (`ProductOverviewInteractive.tsx:6-26`), showing `ProductOverviewSkeleton` until the chunk loads.
- **The gap:** there is no pause, no fade/scale-in, and no coordinated timing between the Hero becoming visible and the Product Overview frame becoming interactive. The frame simply pops in at whatever moment its dynamic chunk resolves (skeleton -> real content swap), with no deliberate reveal choreography. This is the explicit gap P12-T02 is scoped to fill.

### 3.2 Section-level animation state (present / absent), per section

| Section | File | Animation on scroll-into-view? |
|---|---|---|
| Hero | `components/marketing/sections/HeroSection.tsx` | Absent - static SSR, no entrance treatment (intentionally, to protect LCP) |
| Product Overview (frame/shell) | `components/marketing/product-overview/ProductOverviewHome.tsx`, `ProductOverviewDesktop.tsx` | Present, but scroll-**scrub**-driven (opacity/translateY tied to scroll progress, see Section 2), not a discrete reveal-on-enter |
| Problem | `components/marketing/sections/ProblemSection.tsx` | Absent - static list, no motion styles or observer of any kind |
| How It Works | `components/marketing/sections/HowItWorksSection.tsx` | Absent - static 3-column grid, no motion styles |
| Theaters (Connect/Focus/Execute/Sensor/Mascot) | `components/marketing/theater/*`, `components/marketing/sections/ProductTheater*.tsx` | Present, scroll-scrub (`useScrollSection` + theater-specific progress steps), same mechanism/limitation as Product Overview |
| Feature Grid | `components/marketing/sections/FeatureGridSection.tsx` | Absent - static grid; only a `hover:-translate-y-0.5` micro-interaction on hover, no enter animation |
| Integrations | `components/marketing/sections/IntegrationsSection.tsx` | Absent - static grid of integration icons |
| Trust | `components/marketing/sections/TrustSection.tsx` | Absent - static content |
| Final CTA | `components/marketing/sections/FinalCTASection.tsx` | Absent - static content |

**Summary:** the only animated sections today are the scroll-scrubbed theaters (Product Overview + Connect/Focus/Execute/Sensor/Mascot). Problem, How It Works, Feature Grid, Integrations, Trust, and CTA - the six sections named in P12-T08's scope - have **no** animation at all today (not even a basic fade-in), which matches the phase-12 task list's framing of these six as needing a *first* consistent treatment, not a revision of an existing one.

---

## 4. Current typography inventory (raw input for P12-T05)

Sizes below are Tailwind utility classes as they appear in source; "size" means the utility's rendered font-size at that breakpoint, not a proposal.

### 4.1 Hero (`components/marketing/sections/HeroSection.tsx`)

| Element | Classes | Sizes (mobile -> lg) |
|---|---|---|
| Eyebrow | `text-sm font-medium` | 0.875rem, no breakpoint variation |
| H1 (`hero-lcp`) | `text-[2.5rem] ... md:text-[4rem] lg:text-[5rem]` | 2.5rem -> 4rem -> 5rem, `leading-[1.08]`, `tracking-[-0.03em]` |
| Sub-line x2 ("Purpose-built...", "Designed for...") | `text-lg ... lg:text-xl` | 1.125rem -> 1.25rem |
| Thesis paragraph | `text-lg ... lg:text-xl` | 1.125rem -> 1.25rem |

### 4.2 Shared `MarketingSection` chrome (`components/marketing/MarketingSection.tsx:30-48`)

Used as-is by Problem, How It Works, Feature Grid, Integrations, Trust, CTA, and Product Overview:

| Element | Classes | Sizes (mobile -> lg) |
|---|---|---|
| Eyebrow | `text-sm font-medium` | 0.875rem |
| Title (H2) | `text-[2rem] font-bold ... md:text-[2.75rem] lg:text-5xl` | 2rem -> 2.75rem -> 3rem |
| Subtitle | `text-lg ... lg:text-xl`, `max-w-[640px]` | 1.125rem -> 1.25rem |

### 4.3 Per-section body copy (beyond shared chrome)

| Section | Element | Classes |
|---|---|---|
| Problem | Lead paragraph | `text-lg ... lg:text-xl` |
| Problem | Bullet list items | `text-lg font-medium ... lg:text-xl` |
| Problem | Supporting/attribution lines | `text-base`, `text-lg ... lg:text-xl` (mixed within one section) |
| How It Works | Step number | `text-sm font-semibold tabular-nums` |
| How It Works | Step H3 | `text-2xl font-semibold ... lg:text-[1.75rem]` (note: `lg` value is *smaller* than the unprefixed `text-2xl` = 1.5rem vs 1.75rem - worth flagging, not fixing, in P12-T05) |
| How It Works | Step description | `text-base` |
| Feature Grid | Card H3 | `text-xl font-semibold` |
| Feature Grid | Card description | `text-base` |
| Feature Grid | Card link label | `text-sm font-medium` |
| Integrations | App name | `text-sm font-medium` |
| Integrations | App category | `text-xs` |
| Integrations | Footer note / link | `text-sm`, `text-base font-medium` |
| Trust | Member line | `text-base` |
| Trust | Disclaimer / waitlist line | `text-sm` |
| Trust | Security line | `text-base` |
| Trust | Link list | `text-base font-medium` |
| CTA | Uses shared `MarketingSection` chrome only; no additional body copy sizes beyond the waitlist form itself |

### 4.4 Product Overview frame + scene copy

| Element | File | Classes |
|---|---|---|
| Frame title bar app name | `ProductOverviewFrame.tsx:72` | `text-sm font-medium` |
| Frame title bar persona line | `ProductOverviewFrame.tsx:79-81` | `text-xs` |
| Workspace title (per-scene H3) | `ProductOverviewFrame.tsx:102` | `text-base ... md:text-lg` |
| Workspace supporting line | `ProductOverviewFrame.tsx:107` | `text-sm` |
| Caption below frame | `ProductOverviewFrame.tsx:124` | `text-sm` |
| Sidebar nav items | `ProductOverviewNav.tsx:26` | `text-sm` |
| Sidebar email folder rows | `ProductOverviewNav.tsx:108` | `text-xs` |
| Progress nav label | `ProductOverviewProgressNav.tsx:64` | `text-xs font-medium` |
| Progress nav tab label | `ProductOverviewProgressNav.tsx:97` | `text-xs font-medium` |
| Attention card title | `AttentionOverviewScene.tsx:82` | `text-sm ... md:text-base` (now cards) / `text-sm` (later cards) |
| Attention card summary/why-now | `AttentionOverviewScene.tsx:94, 101` | `text-xs md:text-sm` / `text-sm` or `text-xs` |
| Attention section labels (Now/Later/Quiet) | `AttentionOverviewScene.tsx:221` | `text-xs font-semibold uppercase` |
| Attention count badges | `AttentionOverviewScene.tsx:224` | `text-[11px]` |
| Anchor/badge chips | `AttentionOverviewScene.tsx:88` | `text-[10px] uppercase` |
| Email subject (focused panel) | `InboxCalendarOverviewScene.tsx:87` | `text-sm md:text-base` |
| Email meta / approval hint | `InboxCalendarOverviewScene.tsx:90, 95, 117` | `text-xs`, `text-[11px]` |
| Email body | `InboxCalendarOverviewScene.tsx:108` | `text-sm leading-relaxed` |
| Folder chips | `InboxCalendarOverviewScene.tsx:42` | `text-xs` |

**Observation for P12-T05:** the smallest sizes in active use across the homepage are `text-[10px]` and `text-[11px]` (badge/count chips inside Product Overview scenes) and the largest is the Hero H1 at `lg:text-[5rem]`. The spread is wide and mostly consistent within each context (chips small, body copy `text-sm`/`text-base`, headings scale by breakpoint), with one internal inconsistency flagged above (How It Works step H3 `lg` value). This is a raw inventory only; sizing decisions belong to P12-T05.

---

## 5. Handoff to downstream tasks

- **P12-T02** (reveal beat sheet): use Section 1.1-1.3 (frame breakout mechanics, glow primitive, progressive reveal) and Section 3.1 (no current pause/reveal, skeleton-to-real handoff point in `ProductOverviewInteractive`/`ProductOverviewSkeleton`) as the starting brief.
- **P12-T03** (click-to-explore spec): use Section 2 in full - the scan-too-fast root cause (2.1-2.2), the existing (but scroll-jump-based) progress-tab control to repurpose (2.3), and the current pause/off-screen contract to redefine (2.4).
- **P12-T04** (widened frame + glow spec): use Section 1.1 (exact wrapper/frame/view width relationship) and 1.2 (glow box dimensions, gradient shape, opacity, centering) as reference points for MindMesh-token equivalents.
- **P12-T05** (typography audit): use Section 4 in full as the current-state table; no proposals are made here.
- **P12-T08** (section animation polish): use Section 3.2 - Problem, How It Works, Feature Grid, Integrations, Trust, and CTA all currently have zero animation, so this task is establishing a first consistent treatment, not revising an existing one.

## 6. Non-goals confirmed by this audit

- No linear.app assets, copy, or literal colors were captured or referenced beyond structural/geometric measurements (box sizes, opacity values, DOM attribute patterns) needed to describe the pattern in implementation-neutral terms.
- No code changes were made as part of this task.
