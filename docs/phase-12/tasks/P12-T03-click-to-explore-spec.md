# P12-T03 - Product overview click-to-explore interaction spec

**Status:** `done`
**Depends on:** P12-T01
**Feeds:** P12-T07 (click-to-explore rebuild), P12-T10 (mobile + reduced-motion adaptation)

Defines the replacement navigation model for the Product Overview: all four scenes are click/tab-driven, none are scroll-position-driven. Reuses the four existing scenes and fixtures (`lib/marketing-product-overview-data.ts`) completely unchanged; only *how a visitor moves between them* changes.

---

## 1. Default mounted scene

- Scene **1 (Attention)** is the default active scene on mount, at full legibility, with no scroll gesture required: `opacity: 1`, `scale: 1`, its overlap alert chip visible immediately (`showOverlapChip` is no longer a scroll-gated flag - see Section 6).
- This scene's own appearance is governed entirely by the P12-T02 entrance sequence (the whole frame reveals once, on mount); once that sequence settles, Scene 1's content is simply "there," fully readable, with no further per-scene entrance needed until the visitor clicks another tab.
- No IntersectionObserver-driven scroll-progress calculation determines which scene shows on mount. The active scene is React state (`activeScene`, default `1`), not a derived function of `scrollY`.

---

## 2. Primary navigation control

**Decision: `ProductOverviewProgressNav` (the existing tab strip) is the one primary interactive control for scene switching. `ProductOverviewNav` (the decorative left sidebar) stays decorative and is not made clickable.**

Rationale: `PRODUCT_OVERVIEW_NAV` already maps 1:1 to the four scenes (Attention / Inbox & events / Narrative & apps / Companions), and `ProductOverviewProgressNav` already implements the full WAI-ARIA tabs pattern correctly (see below) - it just needs to stop calling a scroll-jump function. The sidebar, by contrast, renders **five** rows (Attention, Upcoming events, Email, Yesterday narrative, Connected apps; `ProductOverviewNav.tsx:70-133`) where "Upcoming events" has no dedicated scene of its own and "Connected apps" is only ever a *secondary* highlight during Scene 3 - it does not map 1:1 to the four scenes, so turning it into a click target would require inventing new scene-splitting behavior that changes product-truth framing. Keeping it decorative (mirroring `activeTab` as it does today) preserves the existing sidebar exactly as specified in P11-T04, with zero fixture/content changes.

### 2.1 Keyboard behavior (already correct today - retained as-is)

`ProductOverviewProgressNav.tsx` already implements the full pattern; nothing here changes:

- `role="tablist"` / `role="tab"` / `aria-selected` / `aria-controls` / roving `tabIndex` (selected tab = `0`, others = `-1`)
- `ArrowRight` / `ArrowDown` -> next scene (wraps from 4 to 1)
- `ArrowLeft` / `ArrowUp` -> previous scene (wraps from 1 to 4)
- `Home` -> scene 1, `End` -> scene 4
- Focus moves with selection (`focusScene`) so keyboard users don't lose their place
- Native `<button>` semantics give `Enter`/`Space` activation for free

### 2.2 Pointer behavior

- Click anywhere on a tab activates that scene immediately (no drag, no long-press, no double-click).
- Hover state (existing `hover:border-mm-outline-variant hover:text-mm-on-surface`) is retained unchanged.
- Touch targets remain `min-h-11 min-w-[2.75rem]` (already present, `ProductOverviewProgressNav.tsx:97`) - no change needed.
- **Non-goal:** swipe/drag gesture support on the frame body itself is explicitly out of scope for this spec. Tabs are the only required input; adding swipe would introduce new gesture-conflict and testing surface (e.g. against normal page scroll) for a "nice to have" that the tabs already cover.

### 2.3 What changes under the hood

| Today (scroll-scrub) | Click-to-explore |
|---|---|
| `onSelectScene` calls `scrollProductOverviewToScene(wrapper, scene)`, which `scrollTo()`s the page (`ProductOverviewDesktop.tsx:71-75`, `marketing-product-overview-scroll.ts:175-183`) | `onSelectScene` calls `setActiveScene(scene)` directly - a plain state update, no scroll, no `wrapper` ref needed for navigation |
| Active scene is derived every frame from `scrollState.progress` via `getProductOverviewVisualStateFromProgress` | Active scene is the source of truth (`activeScene` state); visual state is derived from it via a new pure function, `getProductOverviewVisualStateFromScene(scene)` (Section 5) |
| Mobile's `handleSelectScene` calls `target?.scrollIntoView(...)` (`ProductOverviewMobile.tsx:103-107`) | Mobile's tab handler also calls `setActiveScene(scene)` directly - no `scrollIntoView` (Section 7) |

`scrollProductOverviewToProgress` / `scrollProductOverviewToScene` become dead code once P12-T07 lands and should be removed then, not repurposed.

---

## 3. Scene-to-scene transition motion (discrete, not scroll-interpolated)

Today, `SceneLayer` (`OverviewScenePlaceholders.tsx:17-33`) renders every scene's pane simultaneously, each with an `opacity`/`translateY` computed continuously from scroll-local progress (`paneMotionForScene`, `marketing-product-overview-scroll.ts:96-112`). Under click-to-explore there is no continuous input to interpolate from - a scene switch is a single discrete event (a click or key press), so the transition is a fixed-duration animation triggered once per switch, not a per-frame function of scroll position.

| Step | Property | From -> To | Duration | Easing |
|---|---|---|---|---|
| Outgoing scene (the one being left) | `opacity`, `transform: translateY` | `1, translateY(0)` -> `0, translateY(-6px)` | 150ms | `cubic-bezier(0.4, 0, 1, 1)` (ease-in, quick exit) |
| Incoming scene (the one being entered) | `opacity`, `transform: translateY` | `0, translateY(10px)` -> `1, translateY(0)` | 220ms, starting at the same time as the outgoing step (overlapping, not sequential) | `cubic-bezier(0.16, 1, 0.3, 1)` (emphasized decelerate - same category used in the P12-T02 reveal, for a consistent motion language) |

Total perceived switch time: ~220ms (the longer of the two overlapping steps). This replaces `SceneLayer`'s continuous `paneMotion` prop with a discrete "is this the active scene" boolean that drives a CSS transition (or an equivalent transition library call) exactly once per scene change, not a value recomputed every animation frame.

The outgoing/incoming panes still occupy the same absolutely-positioned box (`SceneLayer`'s `absolute inset-0` pattern is retained), so the switch cannot shift layout - same CLS discipline as the P12-T02 reveal.

`aria-hidden` on the inactive pane and `pointerEvents: 'none'` (already present, `OverviewScenePlaceholders.tsx:24, 27`) are retained so the outgoing scene stops being interactive/announced the moment it starts leaving, not only after its 150ms fade completes.

---

## 4. Residual scroll-linked motion: none

No scroll-linked motion remains in the Product Overview once this spec lands. The only motion tied to page scroll anywhere near this section is the one-time P12-T02 mount reveal, which is gated on "frame ready," not on scroll position, and never repeats or reverses as the visitor scrolls past. Specifically removed:

- The continuous `scrollState.progress` -> `paneMotion` mapping (Section 3)
- `showOverlapChip`'s scroll-gated delay (`scene === 1 && clamped >= 0.06`, `marketing-product-overview-scroll.ts:137`) - the overlap chip is simply part of Scene 1's always-rendered content now (Section 6)
- The Companions scene's scroll-progress-gated `sensorVisible`/`mascotVisible` thresholds (`companionsLocal >= 0.15` / `>= 0.35`) - replaced with a short, time-based (not scroll-based) stagger local to Scene 4 (Section 6)
- `useScrollSection`'s rAF loop, scroll/resize/hashchange listeners, and `measureTheaterScrollProgress` calls for the `productOverview` theater id specifically (other theaters - Connect/Focus/Execute/Sensor/Mascot - are untouched by this spec; they keep their own scroll-scrub per the Phase 12 scope, which is Hero/Product-Overview-only for the interaction model change)

---

## 5. New pure state-mapping function (replaces the progress-based one)

```ts
function getProductOverviewVisualStateFromScene(
  scene: ProductOverviewSceneId
): ProductOverviewVisualState {
  return {
    scene,
    sidebarTab: getProductOverviewSidebarTab(scene), // unchanged helper
    emailExpanded: scene === 2,
    appsSecondary: scene === 3,
    shellOpacity: scene === 4 ? 0.55 : 1, // static target; see Section 6 for the transition-in
    showOverlapChip: scene === 1, // no scroll threshold; see Section 6
    caption: PRODUCT_OVERVIEW_SCENE_CAPTIONS[scene], // unchanged
  };
}
```

This is a pure function of `scene` alone - no `progress`, no `paneMotion` map (Section 3 handles pane motion as a transition trigger, not a returned value). `sensorVisible` / `mascotVisible` are intentionally **not** part of this pure function; they are transient, time-based, and scoped to Scene 4 only (Section 6).

---

## 6. Companions scene (Scene 4) micro-sequence, without scroll

Today, Sensor and Mascot fade in at fixed *scroll-progress* thresholds within Scene 4's range. Under click-to-explore there is no scroll progress to threshold against, but the two-beat "Sensor arrives, then Mascot arrives" narrative is worth keeping - it reads as a small, deliberate introduction rather than a features dump, consistent with the P12-T02 reveal's "deliberate, not abrupt" motion contract (P12-T08's global rule).

Replacement: a short **time-based** stagger, local to the Companions scene component, that starts when Scene 4 becomes active (not on page scroll):

| Beat | Trigger | What appears |
|---|---|---|
| Frame + shell dim | Scene 4 becomes active | `shellOpacity` transitions `1 -> 0.55` over 220ms (same category as the scene-switch transition, Section 3) |
| Sensor | 120ms after Scene 4 becomes active | Sensor panel: `opacity 0 -> 1`, `translateY 8px -> 0`, 200ms |
| Mascot | 280ms after Scene 4 becomes active | Mascot panel: `opacity 0 -> 1`, `translateY 8px -> 0`, 200ms |

This is implemented as two short `setTimeout`-driven (or transition-group) local reveals inside `CompanionsOverviewScene`, gated by the same off-screen rule as everything else (Section 8): if the section is not visible when these timers would fire, they resolve to their end state immediately with no animation rather than firing invisibly. Leaving Scene 4 and returning resets the stagger (it is not a "seen once" flag) - it's a small, cheap re-introduction each time, not persisted state.

`showOverlapChip` (Section 1) has no equivalent stagger: it is simply always visible for Scene 1, since "the default scene is fully rendered on mount" (Section 1) leaves no room for a delayed-reveal chip within the same scene.

---

## 7. Mobile: reconciling the stacked tour with the click-first model

**Decision: mobile adopts the same single-panel, tab-driven model as desktop, replacing the current stacked-cards-plus-`scrollIntoView` pattern.**

Today (`ProductOverviewMobile.tsx`), all four scenes render simultaneously as stacked cards in normal document flow; an `IntersectionObserver` picks whichever card has the most visible area and calls `setActiveScene` purely to highlight the matching tab, while clicking a tab calls `scrollIntoView` to jump the page to that card. This was the right call in P11-T12 (it avoided reintroducing sticky scroll-scrub on small viewports), but it is still fundamentally scroll-driven for navigation - the tabs there don't switch content, they jump-scroll to it. That is inconsistent with "click/tap-first navigation" (P12-T10's acceptance criteria explicitly rules out any scroll-scrub-shaped fallback, and jump-scrolling-to-reveal is the same shape as the problem this phase is removing).

Reconciliation:

- Mobile renders **one active scene panel at a time**, exactly like desktop - same `activeScene` state, same `ProductOverviewProgressNav` component (already responsive; `flex flex-wrap` already wraps its tabs at narrow widths), same discrete crossfade transition (Section 3).
- Tapping a tab calls `setActiveScene(scene)` directly. No `scrollIntoView`, no page-position dependency.
- The `IntersectionObserver`-driven "which card is most visible" logic is removed entirely - there is only ever one panel in the layout to be visible, so there is nothing left to disambiguate.
- The frame keeps `sticky={false}` and `showSidebar={false}` as today (mobile has never used the sticky frame or the full sidebar - those were scroll-scrub-desktop-specific, unrelated to this change).
- Progress nav keeps its current sticky positioning (`sticky top-20 ...`, `ProductOverviewMobile.tsx:115`) so it stays reachable while a visitor reads a tall panel, but this is a CSS sticky-positioning convenience for the tab strip, not a scroll-driven content mechanism - it does not change what content is showing.
- Consequence: this removes the "scroll past all four cards for free" reading pattern mobile had. This is an intentional tradeoff in favor of a single consistent mental model across breakpoints (click to see the next thing, everywhere), which is what P12-T10's acceptance criteria requires ("no scroll-scrub fallback reintroduced"). All four scenes remain fully reachable via tabs (P12-T10 also requires "all four scenes remain reachable and legible on mobile" - satisfied because every tab is always present and tappable, never conditionally hidden).
- File/component structure to implement this consolidation (e.g. whether `ProductOverviewMobile` and `ProductOverviewDesktop` become two thin, breakpoint-styled wrappers around one shared interactive body, or remain separate components that both consume `getProductOverviewVisualStateFromScene`) is an implementation decision left to P12-T07, not fixed by this spec.

---

## 8. Off-screen / visibility contract, redefined

Today, `isPaused` (`useScrollSection`) means "stop sampling scroll position and stop the rAF loop that recomputes pane motion," because there was continuous scroll-driven work to pause. Click-to-explore has no continuous per-frame work at all - scene state only changes on a discrete user action - so most of what "paused" used to mean no longer applies. The contract is redefined narrowly to the motion that *does* still happen over time without direct user input at that exact instant:

- **What needs a pause rule:** only the Section 3 scene-switch transition and the Section 6 Companions stagger, both of which run for a bounded duration (≤220ms and ≤500ms respectively) after being triggered.
- **The rule:** if the Product Overview section is not in the viewport (tracked via a plain `IntersectionObserver` on the section, not the old scroll-progress measurement) at the moment a transition or the Companions stagger would be running, that transition/stagger is skipped and the affected element(s) jump directly to their end state. This covers the edge case of a keyboard user tabbing to a control that's technically off-screen, or a transition that was mid-flight when the visitor scrolled away quickly.
- **What is explicitly *not* paused:** nothing needs to be paused merely because a scene is not the active one - inactive scenes have no ongoing timers or listeners (Section 3's `SceneLayer` is inert once its transition finishes; Section 6's stagger only exists while Scene 4 is active).
- **No replay-on-return:** scrolling the section back into view does not replay any transition or re-run any stagger; it only means the *next* scene switch will be allowed to animate.
- This replaces `isInView`/`isPaused` from `useScrollSection` for the Product Overview specifically; that hook and its scroll-progress plumbing are not needed by the Product Overview after this spec lands (other theaters keep using it unchanged).

---

## 9. Fixture and content guarantee

No fixture, copy, or data file changes. `ATTENTION_BOARD_FIXTURES_ACME`, `INBOX_CALENDAR_SCENE_FIXTURES_ACME`, `NARRATIVE_APPS_SCENE_FIXTURES_ACME`, `COMPANIONS_SCENE_FIXTURES_ACME`, `PRODUCT_OVERVIEW_NAV`, and `PRODUCT_OVERVIEW_SCENE_CAPTIONS` (`lib/marketing-product-overview-data.ts`) are consumed exactly as they are today. Only the mechanism that decides *when* each scene's markup is shown changes.

---

## 10. Non-goals of this task

- Widened frame width, breakout mechanics, and glow are P12-T04's job; this spec assumes whatever fixed, non-scroll-linked box P12-T04 defines and does not propose dimensions.
- Implementation (actual component code, hook removal, state wiring) is P12-T07's job; this is the behavior contract it implements against.
- Mobile/reduced-motion QA evidence is P12-T10's job; this spec only defines the target behavior it must satisfy.
- No code changes were made as part of this task.

---

## Acceptance checklist

- [x] Default mounted scene is fully rendered without requiring a scroll gesture to become legible (Section 1)
- [x] Progress tabs / sidebar are specified as the primary navigation control (Section 2)
- [x] Scene transitions are specified as discrete animations, not scroll-position interpolation (Section 3)
- [x] Off-screen / visibility pause behavior is redefined for the new model (Section 8)
- [x] Mobile behavior is specified consistently with the desktop click model (Section 7)
- [x] Spec keeps all four existing scenes and fixtures unchanged (Section 9)
