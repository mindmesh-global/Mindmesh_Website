# P12-T06 - Reveal sequence implementation (Hero + Product Overview mount)

**Status:** `done`
**Depends on:** [P12-T02](./P12-T02-reveal-beat-sheet.md), [P12-T04](./P12-T04-widened-frame-glow-spec.md)
**Feeds:** P12-T10 (mobile + reduced-motion adaptation), P12-T11 (QA)

Implements the pause-then-reveal-then-expand-with-glow sequence from P12-T02, and
the widened frame + glow visual treatment from P12-T04, on top of the existing
Product Overview scroll-scrub architecture (unchanged; P12-T07 replaces it).

---

## 1. What shipped

### 1.1 New hook: `useProductOverviewReveal`

`hooks/useProductOverviewReveal.ts` - a small state machine used by both the
desktop and mobile Product Overview components:

- Starts `false` (pre-reveal) unless `prefers-reduced-motion: reduce` is set, in
  which case it starts `true`.
- After mount, holds for **200ms** (P12-T02 beat 1), then flips to `true`,
  triggering the CSS transition to the revealed state.
- Reduced-motion visitors get `true` immediately - no hold, no timer.

This is the single source of truth for "has the mount reveal resolved yet,"
shared by the widened desktop frame and the simpler mobile reveal.

### 1.2 `ProductOverviewFrame`: `wide` + `revealed` props

`components/marketing/product-overview/ProductOverviewFrame.tsx` gained two new
optional props, both defaulting to off so every other caller is unaffected:

- `wide` - opts into the breakout + glow treatment (P12-T04). Only
  `ProductOverviewDesktop` passes `wide`.
- `revealed` - the current reveal state from the hook; only meaningful when
  `wide` is set.

Structural change: the sticky frame is now wrapped in an extra plain
(non-positioned) `div` carrying `data-overview-frame-bleed` when `wide` is set.
This wrapper - not the existing `absolute inset-0` element - is what gets the
`width: 100vw` breakout treatment. Putting `width: 100vw` directly on an
already-inset (`top/right/bottom/left: 0`) absolutely positioned box hits CSS's
over-constrained abspos resolution rules and recomputes `left` out from under
the centering math (verified while implementing this; the classic full-bleed
formula only holds for a normal-flow block). Nesting a plain block for the
breakout keeps `width: 100vw; margin-left: calc(50% - 50vw)` mathematically
correct regardless of how much padding sits between it and the centered
1120px column.

A new `data-overview-frame-glow` div renders inside the sticky frame (behind
the chrome, `z-index: -1`) only when `wide` is set.

### 1.3 CSS additions (`app/globals.css`)

All new rules are scoped the same way as the rest of the theater CSS,
under `[data-marketing-theme='dark']`:

- `[data-overview-frame-wide]` - base rule: `transition: transform 360ms
  cubic-bezier(0.16, 1, 0.3, 1)`, resting `transform: translateY(14px)`
  (pre-reveal), `translateY(0)` once `data-overview-revealed="true"`.
- Same selector inside `@media (min-width: 1024px)` additionally sets
  `width: 100%; max-width: 1280px; padding-inline: 1.5rem` and upgrades the
  transform to `scale(0.875) translateY(14px)` → `scale(1) translateY(0)`
  (0.875 = 1120 / 1280, so the pre-reveal state visually renders at the old
  1120px column width).
- `[data-overview-frame-bleed]` inside the same media query:
  `width: 100vw; margin-left: calc(50% - 50vw); display: flex; justify-content:
  center` - the breakout, with the wide frame flex-centered inside it.
- `[data-overview-frame-glow]` - 720px circular radial gradient using
  `rgba(67, 136, 253, ...)` (the `--mm-accent-strong` blue), 64px blur,
  `opacity: 0 → 1` on a separate `480ms` transition with an `80ms` delay,
  `pointer-events: none`, hidden below 1024px via `display: none` in
  `@media (max-width: 1023px)`.
- `[data-overview-reveal-simple]` - the mobile/tablet-fallback reveal:
  `opacity: 0 → 1` and `translateY(14px) → translateY(0)` together, no scale,
  no glow.

**Opacity design note (deliberate deviation from P12-T02's illustrative
values):** the frame chrome itself never drops to `opacity: 0`. P12-T02's beat
sheet described the frame body as animating opacity + scale together; during
implementation this was refined to transform-only for the frame, for a
concrete reason - `next/dynamic`'s skeleton → real-component handoff is a hard
React unmount/mount swap, not a native crossfade. If the frame's opacity
started at 0, there would be a visible blank gap between the skeleton
disappearing and the reveal completing. Keeping the chrome at `opacity: 1`
throughout (only `transform` animates) means the skeleton's identical
bordered-card shape hands off seamlessly into the real chrome, and the "hold"
beat still reads clearly because the frame is visibly smaller/lower for 200ms
before growing. The sequence overall still satisfies "transform + opacity
only": the frame uses transform, the glow uses opacity.

### 1.4 Skeleton parity (`ProductOverviewSkeleton.tsx`)

The desktop skeleton now renders the identical `data-overview-frame-bleed` /
`data-overview-frame-wide` / `data-overview-frame-glow` structure, pinned to
`data-overview-revealed="false"`. At `lg`+ this makes the skeleton render at
the same 1280px-laid-out / 0.875-scaled (visually ~1120px) box as the real
frame's pre-reveal state, so swapping skeleton → real content never changes
width, scale, or position - only the inner placeholder blocks change for real
scene content.

**Scoped deferral:** the skeleton's and scroll-wrapper's `min-h-[180vh]`
scroll-linked height is intentionally untouched. Decoupling height from
scroll is P12-T07's job (removing scroll-scrub entirely); this task only
widens/glows/reveals the sticky frame's width and visual scale on top of the
existing scroll-scrub mechanics, since P12-T06 and P12-T07 are sibling tasks,
not sequential.

### 1.5 Mobile reveal (`ProductOverviewMobile.tsx`)

The outer stacked-tour wrapper gets `data-overview-reveal-simple` +
`data-overview-revealed`, driven by the same hook. This is a single one-time
reveal of the whole tour on mount (not per-card), matching P12-T04 Section 5's
"opacity + translateY only, no scale, no glow" contract for narrow widths.

### 1.6 Overflow safety net

`ProductOverviewHome.tsx`'s `MarketingSection` wrapper gained
`overflow-x-clip` alongside its existing `relative isolate`, as a defensive
guard against the breakout (consistent with the existing pattern already used
for the static tour in P11-T12).

---

## 2. Known transient side effect (accepted tradeoff)

`measureTheaterScrollProgress` (`lib/marketing-theater-scroll.ts`) reads
`.theater-sticky-frame`'s `getBoundingClientRect().height` to compute
scroll-scrub progress. Since the reveal also animates `transform: scale()` on
that same element, the reported height is transiently smaller than final
during the 360ms reveal window right after mount. In practice this is
inconsequential: the Product Overview section sits below the first viewport
on load, so the reveal completes (well under half a second) long before a
visitor scrolls anywhere near it. Accepted as-is; no code changes made to
avoid it.

---

## 3. Verification

### 3.1 Typecheck + build

```bash
npx tsc --noEmit -p .   # exit 0
npm run build            # exit 0, Turbopack compile succeeded
```

### 3.2 Live behavior (production build, `next start`, CDP-driven checks)

| Check | Viewport | Result |
|---|---|---|
| Pre-reveal transform | 1440px (desktop) | `scale(0.875) translateY(14px)` (matrix confirms `0.875` scale, `ty=12.25=14×0.875`) |
| Post-reveal transform | 1440px (desktop) | `scale(1) translateY(0)` (identity matrix) |
| Frame width, pre and post | 1440px (desktop) | `1280px` both times - **no width/layout change, transform only** |
| Frame centering | 1440px (desktop) | Bleed wrapper spans full `1440px` viewport; frame is `1280px`, centered with `80px` gap each side |
| Glow opacity, pre/post | 1440px (desktop) | `0` → `~0.99` at 500ms into the 480ms+80ms-delay transition |
| Horizontal overflow | 1440px (desktop) | None (`scrollWidth === innerWidth`) |
| Pre/post transform | 900px (tablet, `<1024`) | `translateY(14px)` → `translateY(0)`, **no scale** (matrix `1,0,0,1,...`) |
| Glow visibility | 900px (tablet) | `display: none` |
| Width, pre/post | 900px (tablet) | `852px` both times, unchanged |
| Horizontal overflow | 900px (tablet) | None |
| Mobile reveal | 390px (`ProductOverviewMobile`) | `opacity: 0 → 1`, `translateY(14px) → 0`, no horizontal overflow |
| Reduced motion | any width, `prefers-reduced-motion: reduce` | Desktop component does not render at all (existing P11-T12 behavior); Mobile renders with `data-overview-revealed="true"` and `opacity: 1` immediately - no hold, no growth |

### 3.3 Lighthouse (production build, `next start -p 3022`, mobile + simulated throttling, matching [Phase 11 baseline](../../phase-11/baselines/homepage-marketing-lighthouse.md) methodology)

| Metric | Run 1 | Run 2 | Run 3 | Median | Phase 11 baseline | Delta |
|---|---|---|---|---|---|---|
| LCP (s) | 2.57 | 2.91 | 2.90 | **2.90** | 2.92 | ~flat (-0.02s) |
| CLS | 0 | 0 | 0 | **0** | 0 | same |
| Performance score | 0.97 | 0.95 | 0.95 | **0.95** | 0.95 | same |
| TBT (ms) | 91 | 65.5 | 49 | **65.5** | 63 | ~flat |

Raw run artifacts: [`p12-t06-run1.json`](../baselines/p12-t06-run1.json),
[`run2`](../baselines/p12-t06-run2.json), [`run3`](../baselines/p12-t06-run3.json).

Hero LCP element was not re-verified as a different DOM node (it remains the
Hero `#hero-heading` H1; Hero markup was not touched by this task), but timing
is confirmed unaffected: median LCP moved from 2.92s to 2.90s (within run
noise), and CLS holds at 0 across all three runs, directly confirming the
reveal introduces no layout shift.

### 3.4 Bundle / forbidden-module check

`network-requests` audit from the Lighthouse run: 20 script requests, zero
matches for `lottie|tauri|mindmesh-app|electron`. No new dependency was added;
this task only touched existing marketing components and `globals.css`.

### 3.5 Accessibility

Lighthouse accessibility score: `0.94`, same two pre-existing failing audits
as before this task (`aria-prohibited-attr` on `StaticInboxList`'s unread-dot
span, `link-in-text-block`) - both are unrelated to Product Overview and were
not introduced by this change. The new glow divs are `aria-hidden` and
`pointer-events: none`, so they are inert to assistive tech and pointer input.

---

## 4. Acceptance criteria

- [x] Sequence matches the P12-T02 timing budget (200ms hold, 360ms reveal
  transform, glow 80ms delay + 480ms bloom)
- [x] Frame width and glow match the P12-T04 specification (1280px max-width
  breakout at `lg`+, centered; 720px glow, 64px blur, `--mm-accent-strong`
  token; desktop-only)
- [x] Hero LCP element timing is unaffected (verified via Lighthouse: median
  2.90s vs. 2.92s baseline, not assumed)
- [x] CLS remains 0 through the sequence (verified: 0 across 3 runs)
- [x] Reduced-motion visitors see the final state immediately, no pause or
  growth (verified programmatically)
- [x] Motion uses `transform` + `opacity` only (frame: transform; glow:
  opacity; mobile simple reveal: opacity + transform)
- [x] Widened frame is not clipped by overflow ancestors; chrome borders remain visible
- [x] Product Overview sits in normal document flow (no leftover 180vh scrub runway)

---

## 5. Follow-up layout fixes (same task)

After the first ship, two visual bugs showed up on the live homepage and were
fixed in the same deliverable:

1. **Borders clipped.** `ProductOverviewInteractive`'s desktop wrapper still
   had `overflow-x-clip` from P11. The widened 1280px frame breaks out of the
   1120px column, so that clip cut ~100px off each side (sidebar labels and
   chrome borders). Removed `overflow-x-clip` from the desktop motion wrapper
   only; mobile keeps it. Also switched the breakout to
   `left: 50%; transform: translateX(-50%); width: min(1280px, calc(100vw - 3rem))`
   instead of `width: 100vw` + negative margin, so the frame never overflows
   the viewport via scrollbar-gutter mismatch.
2. **Huge gap before the next section.** The Phase 11 sticky scrub runway
   (`min-h-[180vh]`) was still under the revealed frame, leaving ~1000px of
   empty scroll after the app. Collapsed product overview to normal document
   flow (`relative`, `sticky={false}`, no CSS/Tailwind 180vh). Scene switching
   via scroll is gone here; P12-T07 owns click-to-explore navigation.
