# P12-T02 - Entrance reveal narrative + beat sheet

**Status:** `done`
**Depends on:** P12-T01
**Feeds:** P12-T06 (reveal sequence implementation)

Defines the exact pause-then-reveal-then-expand sequence for the Hero -> Product Overview mount, as a named timing budget and a before/after value table, so P12-T06 can implement it without further design decisions. Widths, the glow's exact shape/tokens, and the breakout mechanism are P12-T04's job; this beat sheet treats the Product Overview frame's *final resting box* as a given (already reserved in layout, non-scroll-linked) and only choreographs opacity/transform inside it.

---

## 1. Sequence overview

Four named beats, in order. Only the Product Overview frame body and its glow participate; everything else on first paint (Hero, the Product Overview section's own eyebrow/title/subtitle) is fully static from the first frame.

| Beat | Trigger | Duration (target) | What moves |
|---|---|---|---|
| **0. Static** | Page load | n/a (instant) | Hero (H1, sub-lines, CTAs) and the Product Overview section header render immediately, fully opaque, no motion. The CLS-safe skeleton (existing, P11-T11) renders in the frame's reserved box. |
| **1. Hold** | Frame body is ready to render (dynamic chunk resolved + fonts ready) | 200ms minimum | Nothing. Skeleton stays exactly as-is. This is the deliberate "pause" - the reserved box is already full size, so nothing shifts; the visitor's eye stays on the Hero for one deliberate beat before the frame draws attention. |
| **2. Reveal** | End of Hold | 360ms | Frame body: `opacity 0 -> 1`, `transform: scale(0.94) translateY(14px) -> scale(1) translateY(0)` (transform-origin `50% 0%`, i.e. grows from its top-center). Skeleton: `opacity 1 -> 0` over the first 160ms of this beat only (fast crossfade out), so real content is what finishes the beat. |
| **3. Glow bloom** | Starts 80ms after Reveal begins (overlaps beat 2) | 480ms (ends ~140ms after Reveal settles) | Glow layer: `opacity 0 -> 1` only, no transform. Starting late and running long relative to the frame gives the glow a "bloom after the object appears" read instead of popping in with it. |

Total visible motion budget from "frame ready" to "fully settled": **200ms hold + up to ~560ms of overlapping reveal/glow motion ≈ 760ms**, excluding whatever time was already spent on network/JS-chunk loading (which the existing skeleton already covers with zero perceived delay, since the skeleton itself is instant and dimensionally final).

There is no separate "expand" beat. The apparent width growth ("narrow reveal, then wider than the page column") is produced by the `scale(0.94 -> 1)` transform in beat 2 acting on a box whose **layout width is already the final wide width** (P12-T04's job to define the exact value and breakout mechanism). Scaling a pre-sized box from 0.94 to 1.0 reads as "the app expands," while the actual CSS width/height never change, so there is no reflow and no CLS contribution - this mirrors the mechanism found in the P12-T01 audit of linear.app (outer slot fixed, inner frame wider, revealed via a size/opacity change rather than a live width transition).

---

## 2. Easing (implementation-neutral)

| Beat | Easing category | Reference curve (starting point, tunable in P12-T06) |
|---|---|---|
| Reveal scale + opacity | Emphasized decelerate (fast start, long soft settle - reads as "arriving," not "sliding") | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Skeleton fade-out | Linear or standard ease-out, short | `cubic-bezier(0.4, 0, 1, 1)` over 160ms |
| Glow bloom opacity | Gentle ease-in-out (no snap at either end, since a glow appearing abruptly reads as a flash, not a bloom) | `cubic-bezier(0.4, 0, 0.2, 1)` |

These are concrete starting values so P12-T06 has something to implement and tune against, not a locked spec; ±10-15% timing/curve adjustment during implementation is expected and acceptable as long as the beat order and the "hold before reveal" read are preserved.

---

## 3. What is static vs. what participates

| Element | Participates in reveal? | Why |
|---|---|---|
| Hero eyebrow, H1 (`hero-lcp`), sub-lines, CTA links | No - always visible, no initial opacity/transform state | H1 is the documented LCP candidate (P6-T08); giving it any animated initial state risks delaying or invalidating its LCP paint. It must never depend on JS mount timing. |
| Product Overview section eyebrow/title/subtitle (`MarketingSection` header inside `ProductOverviewHome`) | No - server-rendered, always visible | Server-rendered today (P11-T11); keeping it static means the section always has legible content even if the client bundle is slow, and avoids a second, competing motion element next to the frame. |
| Product Overview skeleton (`ProductOverviewSkeleton`) | Yes - fades out (beat 2, first 160ms only) | It is the placeholder the real frame replaces; per beat 2, it must be visually gone before the frame's own reveal settles. |
| Product Overview frame body (chrome + active scene content) | Yes - beat 2 (scale + opacity) | This is the one visual element the whole sequence exists to introduce. |
| Glow layer behind the frame | Yes - beat 3 (opacity only) | Per P12-T01 finding, glow is a separate absolutely-positioned layer; it must never carry transform/scale, only opacity, per the global "transform + opacity only" motion contract. |
| Progress nav / caption / footer under the frame (`ProductOverviewFrame`'s `progressNav`/`caption`/`footer` slots) | Yes - inherits the frame's opacity/transform (not separately choreographed) | Treating these as part of the same box keeps the sequence to one visual unit instead of staggering sub-elements, which would extend the total budget past the ~760ms target for no narrative benefit. |

---

## 4. Skeleton-to-real handoff (no layout shift)

1. `ProductOverviewSkeleton` and the real frame body must render inside the **same-sized wrapper box** - i.e. the wrapper's width/height are fixed to the frame's final resting dimensions (per P12-T04) from the very first paint of the Product Overview section, not derived from scroll distance. (Today's skeleton uses a scroll-linked `min-h-[180vh]` desktop wrapper inherited from the scroll-scrub theater pattern; P12-T06/T07 must replace that with the fixed resting height once click-to-explore removes the scroll dependency - see P12-T01 Section 4 and P12-T03.)
2. The skeleton and the real frame body are both absolutely positioned inside that fixed box (skeleton behind/below, real frame above), so swapping which one is visible never changes the box's own size - only their own `opacity` changes.
3. Handoff timing: skeleton `opacity 1 -> 0` runs entirely inside the first 160ms of beat 2 ("Reveal"), while the real frame body's `opacity 0 -> 1` / `scale(0.94 -> 1)` runs the full 360ms of the same beat. The two overlap (skeleton is gone well before the frame settles) rather than a hard cut, so there is never a one-frame gap of empty box.
4. Because both occupy the same fixed box, this handoff produces **zero layout shift** by construction; CLS from this transition is not a matter of tuning, it's structural (P12-T04 must supply the fixed resting box size; P12-T06 must not let content size vary within a beat).

---

## 5. Reduced motion

Per the global Phase 12 motion contract ("reduced-motion visitors receive a complete static experience, no pause/growth/scroll dependency"):

- Beats 1-3 do not run. There is no hold, no scale/opacity ramp, no glow bloom.
- As soon as the frame body is ready to render, it appears in its **final state directly**: full opacity, `scale(1)`, glow at full opacity - the same end state beats 1-3 would have produced, just without the transition.
- Implementation gate: `prefers-reduced-motion: reduce`, consistent with the existing `motion-reduce:` Tailwind variant usage already in the codebase (e.g. `ProductOverviewInteractive.tsx`'s `motion-reduce:!hidden` / `motion-reduce:!block`). No JS branching is required beyond what a CSS transition-duration override (`0ms` under the media query) already achieves, matching the pattern used elsewhere in this codebase.
- This is unrelated to (and does not reintroduce) the separate mobile-vs-desktop routing decided in P11-T12; it only concerns whether the mount of whichever body is chosen (desktop motion or mobile stacked) plays a transition or snaps to its end state.

---

## 6. LCP and CLS guarantees

- **LCP:** Hero's `hero-lcp` H1 is server-rendered, unconditional, and has no opacity/transform dependency on this sequence or on any client JS mount signal (Section 3). The reveal sequence's trigger ("frame body ready") is scoped entirely to the Product Overview section's own dynamic import lifecycle and never blocks, delays, or reads from anything in the Hero section. P12-T06's acceptance criteria already require this to be *verified* (Lighthouse/LCP trace), not just assumed by this spec.
- **CLS:** The reveal never changes any element's layout box size - only `opacity` and `transform` (`scale`, `translateY`) on elements whose box is already committed at final size (Section 4). `transform: scale()` does not participate in layout and does not trigger reflow, so it cannot contribute to CLS regardless of the scale factor chosen.
- **Motion contract:** every animated property in this beat sheet is `opacity` or `transform`; no beat animates `width`, `height`, `top`/`left`, or `margin`.

---

## 7. Timing budget summary (for P12-T06)

| Named budget | Value |
|---|---|
| Hold (beat 1) | 200ms minimum, no maximum (stays until frame body is actually ready) |
| Reveal (beat 2) | 360ms |
| Skeleton fade-out (nested inside beat 2) | 160ms, starting at beat 2's t=0 |
| Glow bloom (beat 3) | 480ms, starting at beat 2's t=80ms |
| Total settled time from "frame ready" | ~760ms (200ms hold + 560ms latest-finishing motion: 80ms glow delay + 480ms glow duration) |
| Reduced motion | 0ms - final state on first paint of the frame body |

---

## 8. Non-goals of this task

- Exact wide-frame width, breakout container mechanics, and glow shape/color tokens are specified in P12-T04, not here.
- Click-to-explore scene-switching behavior and its own transition motion are specified in P12-T03, not here (this beat sheet only covers the *initial* Hero -> Product Overview mount, not scene-to-scene navigation afterward).
- No typography sizes are proposed here (P12-T05).
- No code changes were made as part of this task; `ProductOverviewSkeleton`'s current scroll-linked `min-h-[180vh]` sizing is flagged as needing replacement in P12-T06/T07 but is not changed here.

---

## Acceptance checklist

- [x] Sequence has a named timing budget for pause, reveal, and expand (Section 1, Section 7)
- [x] Hero LCP element and timing are explicitly unaffected by the sequence (Section 3, Section 6)
- [x] Skeleton-to-real handoff is specified with no layout shift (Section 4)
- [x] Reduced-motion final state is specified (Section 5)
- [x] Sequence uses `transform` + `opacity` only (Section 6)
