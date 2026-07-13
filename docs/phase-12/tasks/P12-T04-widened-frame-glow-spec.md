# P12-T04 - Widened frame + glow visual specification

**Status:** `done`
**Depends on:** P12-T01
**Feeds:** P12-T06 (reveal sequence implementation), P12-T07 (click-to-explore rebuild)

Specifies the revealed Product Overview frame's width (wider than the shared marketing container), the breakout mechanism that lets it escape that container without affecting any other section, and the background glow. This refines the illustrative scale value in [P12-T02](./P12-T02-reveal-beat-sheet.md) with the exact numbers implied by these widths.

---

## 1. Widths: explicit before/after values

| State | Width | Notes |
|---|---|---|
| Shared column (unchanged) | **1120px** (`max-w-[1120px]`, matches `--mm-layout-max: 70rem`) | Used by every other `MarketingSection` - Hero, Problem, How It Works, Feature Grid, Integrations, Trust, CTA, and by the Product Overview section's own eyebrow/title/subtitle (`MarketingSection.tsx:28`). Unaffected by this spec. |
| Product Overview frame, resting width (desktop, `lg` / ≥1024px) | **1280px**, clamped to the viewport: `min(1280px, 100vw - 3rem)` | The "wide" state. 3rem = two 1.5rem gutters (`--mm-layout-gutter`), so the frame never touches the viewport edge even on exactly-1280px-wide viewports. |
| Product Overview frame, tablet/mobile (`< lg`) | **1120px** (same as the shared column) | No breakout below `lg` - see Section 5. |

Ratio: `1120 / 1280 = 0.875`. This is the exact scale factor the reveal uses (Section 3) - not an arbitrary "grow" number, it is literally the ratio between the column width and the wide width, so the visual effect of the reveal *is* the width change, with no separate/uncoordinated scale flourish layered on top.

---

## 2. Breakout mechanism (does not affect other sections)

`ProductOverviewHome` already passes `className="relative isolate"` to its `MarketingSection` (`ProductOverviewHome.tsx:18`) - `isolate` creates a new stacking context, which this spec relies on for the glow's z-index (Section 4) and keeps both scoped to this one section.

The frame's outer wrapper (the same one whose fixed size the skeleton must match, per P12-T02 Section 4) uses the standard "full-bleed inside a centered container" CSS technique, applied only to that one wrapper, not to `MarketingSection` itself:

```css
.overview-frame-breakout {
  width: 100vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  max-width: min(1280px, calc(100vw - 3rem));
}
```

- `width: 100vw; left: 50%; transform: translateX(-50%)` pulls the wrapper out to span the full viewport width regardless of its ancestor's `max-w-[1120px]` constraint (the same trick used for any "this one section is wider than the grid" layout, not specific to this codebase).
- `max-width: min(1280px, calc(100vw - 3rem))` then re-constrains it to the actual resting width from Section 1, so it doesn't literally touch the viewport edges.
- `translateX(-50%)` is used instead of the more common `margin-left: -50vw` because it composes cleanly with the reveal's own `transform: scale(...)` (Section 3) without the two transforms fighting - both live on `transform`, and `translateX(-50%) scale(x)` is a single, well-defined transform chain.
- This wrapper is a **child** of `MarketingSection`'s existing `max-w-[1120px]` container, not a replacement for it - `MarketingSection` itself is not modified, so Problem, How It Works, Feature Grid, Integrations, Trust, and CTA (which all use the same component) are completely unaffected.
- Overflow discipline: nothing about this technique requires `overflow: hidden` on any ancestor. If any clipping utility is needed to guard against sub-pixel rounding at the viewport edge, use `overflow-x-clip` (the pattern already used elsewhere in this codebase - e.g. `ProductOverviewInteractive.tsx:40, 46`) rather than `overflow: hidden`, so the glow (Section 4) is still allowed to bleed vertically above/below the frame without being clipped.

---

## 3. Reveal scale, updated with the real width ratio

This supersedes P12-T02's illustrative `scale(0.94 -> 1)` placeholder for the width-bearing portion of the reveal. The two are reconciled as: the *vertical* motion (`translateY(14px -> 0)`) and *timing* (360ms, emphasized-decelerate) from P12-T02 are unchanged; the *scale* value is replaced with the real ratio from Section 1:

| Property | Before | After |
|---|---|---|
| `transform: scale()` | `0.875` | `1` |
| `transform: translateY()` | `14px` | `0` |
| `transform-origin` | `50% 0%` (unchanged from P12-T02 - grows from top-center) | - |
| `opacity` | `0` | `1` |

Because the wrapper's `width`/`max-width` (Section 1-2) are already committed in layout before the reveal starts (same box for skeleton and real content, per P12-T02 Section 4), animating `scale(0.875 -> 1)` never changes the computed layout size - it only changes how large the box *appears*, which is what produces the "narrow, then wide" read without a `width` transition and without any CLS contribution.

---

## 4. Glow

| Property | Value | Rationale |
|---|---|---|
| Shape | Circle, `720px x 720px`, `border-radius: 50%` | Sized to match `.theater-frame-chrome`'s own max-height cap (720px, `globals.css:249`), so the glow reads as proportionate to the frame it's illuminating rather than a fixed size unrelated to it. |
| Gradient | `radial-gradient(circle at 50% 0%, rgba(67, 136, 253, 0.18) 0%, rgba(67, 136, 253, 0) 70%)` | `rgba(67, 136, 253, ...)` is `--mm-accent-strong` (`#4388fd`, `globals.css:123`) expressed as an alpha-blendable value - a MindMesh design token, not a literal Linear color. `0.18` peak alpha keeps it a soft bloom rather than a saturated glow, consistent with the very-low-opacity approach found in the P12-T01 audit of linear.app's own glow (theirs peaked at 4% white; ours peaks higher because it's a color tint on a much darker background and needs slightly more presence to read at all, but stays well under 20%). |
| Extra softness | `filter: blur(64px)` | The radial gradient already fades smoothly, but a blur pass gives it the softer, "light bleeding through" look rather than a crisp circle edge. 64px is proportionate to the 720px box (~9%). |
| Position | `position: absolute`, centered horizontally, vertically anchored so the gradient's own center (`50% 0%` origin) sits at the frame's top edge | Matches the reveal's `transform-origin: 50% 0%` (Section 3) - the glow blooms from the same point the frame visually grows from, so the two reinforce one narrative beat instead of reading as two unrelated effects. |
| Stacking | Behind `.theater-frame-chrome`, inside the same `isolate`-scoped wrapper as the frame (Section 2) | Never needs a global z-index; scoped entirely to this one section. |
| Animation | `opacity: 0 -> 1` only, no transform, no scale | Matches the Phase 12 global motion contract (`transform` + `opacity` only) and P12-T02 Section 1's glow-bloom beat (starts 80ms after the frame reveal begins, runs 480ms, `cubic-bezier(0.4, 0, 0.2, 1)`). This spec does not change that timing, only supplies the shape/color it animates. |
| CLS contribution | None | `position: absolute` elements are removed from normal layout flow; their presence, size, or opacity can never shift sibling content regardless of when they appear. |

---

## 5. Behavior at tablet and mobile widths

**Decision: the widened frame and the glow are desktop-only (`lg` / ≥1024px). Tablet and mobile get the standard column-width frame with no glow.**

| Breakpoint | Frame width | Glow | Reveal motion |
|---|---|---|---|
| Desktop (`lg`+, ≥1024px) | 1280px (clamped), breakout per Section 2 | Full glow per Section 4 | Full sequence: `scale(0.875 -> 1)` + `translateY` + `opacity`, per Section 3 |
| Tablet (`md`-`lg`, 768-1023px) | 1120px (same as the shared column - no breakout) | None | `opacity` + `translateY` only (from P12-T02); `scale` is fixed at `1` throughout since there is no width change to narrate |
| Mobile (`< md`, <768px) | 1120px equivalent, i.e. the same standard column width used by every other section on that viewport (in practice constrained further by the 1.5rem gutters) | None | Same as tablet: `opacity` + `translateY` only |

Rationale:

- Below `lg`, the viewport itself is frequently narrower than or close to 1120px, so there is little to no room to widen into without the frame's edges crowding the viewport edge - the "wider than the page" effect only reads as intentional when there is visible breathing room around it, which desktop viewports have and tablet/mobile mostly don't.
- Per P12-T03 Section 7, mobile already renders the Product Overview as a single-panel, non-sticky, no-sidebar frame (`sticky={false}`, `showSidebar={false}`) - it was never part of the sticky-scrub desktop presentation this widened treatment is designed around, so keeping it at the standard column width is consistent with, not a regression from, that existing decision.
- Skipping the glow below `lg` also avoids the `filter: blur(64px)` cost on lower-powered mobile devices for an effect that would have very little surrounding space to bloom into anyway.
- This is a deliberate "desktop-only" answer, which the acceptance criteria explicitly allow.

---

## 6. Reserved layout space / CLS discipline at the widest state

- The breakout wrapper's `width: 100vw` / `max-width: min(1280px, ...)` (Section 2) is resolved by the CSS engine at layout time from the very first paint - it does not depend on JS measurement, a mounted ref, or any async data, so it is available identically whether the skeleton or the real frame is currently inside it.
- The skeleton (`ProductOverviewSkeleton`, desktop variant) must be updated (in P12-T06/T07) to render inside this same breakout wrapper at this same resting width, not its current scroll-linked `min-h-[180vh]` box (flagged already in P12-T01 Section 4 and P12-T02 Section 4/8) - this spec adds the width dimension to that existing sizing requirement: the skeleton's committed box must match the real frame's box in **both width and height**, not height alone.
- The glow (Section 4) is `position: absolute` and therefore never included in any layout size calculation - its fade-in cannot contribute to CLS by construction, independent of the 720px box's relationship to the frame's actual rendered height.
- No ancestor between the breakout wrapper and the page root may use `overflow: hidden` in a way that would clip the glow's vertical bleed (Section 2); where clipping is needed for overflow-x safety, use `overflow-x-clip`, which does not affect the vertical axis.

---

## 7. Non-goals of this task

- The exact reveal *timing* (durations, hold, easing categories) is P12-T02's job; this spec only supplies the width/scale numbers and the glow's shape/color that P12-T02's beats animate.
- Click-to-explore scene-switching motion is P12-T03's job and is unaffected by this spec - the widened frame and glow are part of the one-time mount reveal, not part of switching between scenes afterward.
- No code changes were made as part of this task.

---

## Acceptance checklist

- [x] Explicit before/after width values are specified for the reveal (Section 1, Section 3)
- [x] Breakout mechanism is specified without breaking the shared section container for other sections (Section 2)
- [x] Glow uses MindMesh design tokens, not literal Linear colors or assets (Section 4)
- [x] Behavior at tablet/mobile widths is explicitly specified (including "desktop-only" as a valid answer) (Section 5)
- [x] Reserved layout space prevents CLS at the widest state (Section 6)
