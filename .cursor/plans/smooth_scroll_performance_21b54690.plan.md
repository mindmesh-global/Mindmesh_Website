---
name: Smooth Scroll Performance
overview: Improve scroll smoothness by reducing continuous animation work, expensive repaint effects, and scroll-time layout reads on the marketing/dashboard experience.
todos:
  - id: canvas-scroll-throttle
    content: Throttle or pause HoneycombCanvas animation during active scroll and hidden tabs.
    status: pending
  - id: lottie-gating
    content: Gate Lottie animations so only visible/needed animations run.
    status: pending
  - id: visual-effect-audit
    content: Reduce expensive blur, glow, and backdrop effects in scroll-heavy sections.
    status: pending
  - id: scroll-listener-cleanup
    content: Throttle layout-reading scroll listeners and attach them only when needed.
    status: pending
  - id: profile-verify
    content: Profile scrolling before and after and verify visual behavior.
    status: pending
isProject: false
---

# Smooth Scroll Performance Plan

## Goal

Make scrolling feel smoother, especially on the full-page marketing view and dashboard window, without changing the visual direction of the site more than necessary.

## Scope

Target the code paths that run during scroll or continuously while the page is visible:

- `[/Users/rohittripathi/Desktop/Mindmesh_Website/components/dashboard/view-shells/DashboardDesktopShell.tsx](/Users/rohittripathi/Desktop/Mindmesh_Website/components/dashboard/view-shells/DashboardDesktopShell.tsx)`
- `[/Users/rohittripathi/Desktop/Mindmesh_Website/components/MascotChatbot.tsx](/Users/rohittripathi/Desktop/Mindmesh_Website/components/MascotChatbot.tsx)`
- `[/Users/rohittripathi/Desktop/Mindmesh_Website/components/SensorBarSpotlight.tsx](/Users/rohittripathi/Desktop/Mindmesh_Website/components/SensorBarSpotlight.tsx)`
- `[/Users/rohittripathi/Desktop/Mindmesh_Website/app/dashboard/page.tsx](/Users/rohittripathi/Desktop/Mindmesh_Website/app/dashboard/page.tsx)`
- Potentially `[/Users/rohittripathi/Desktop/Mindmesh_Website/components/ui/gradient-honeycomb.tsx](/Users/rohittripathi/Desktop/Mindmesh_Website/components/ui/gradient-honeycomb.tsx)` if it is used on visible scroll-heavy pages.

## Implementation Plan

1. **Throttle or pause full-screen canvas animation during scroll**
  - In `DashboardDesktopShell.tsx`, update `HoneycombCanvas` so it detects active scrolling and temporarily reduces work.
  - During scroll, either skip frames, lower draw frequency, or pause until a short idle timeout such as `120-200ms` after the last scroll event.
  - Also respect `prefers-reduced-motion` and stop the loop when the tab is hidden.
2. **Lazy-load and gate Lottie animations**
  - Keep the visible active character animation, but avoid running previous/next Lottie animations at the same time unless needed.
  - In `MascotChatbot.tsx`, delay loading the mascot Lottie until the mascot is actually shown and the component is mounted.
  - Consider rendering a static placeholder while scrolling or when `prefers-reduced-motion` is enabled.
3. **Reduce expensive repaint effects in scroll-heavy regions**
  - Audit large `blur-`*, `backdrop-blur-`*, huge shadows, fixed translucent overlays, and `animate-pulse` elements in `DashboardDesktopShell.tsx`.
  - Keep the design, but replace the most expensive always-visible effects with lighter static gradients or smaller blur radii.
  - Prioritize the fixed canvas layer, character showcase glow, and nav backdrop blur.
4. **Clean up scroll listeners that read layout repeatedly**
  - In `MascotChatbot.tsx`, `SensorBarSpotlight.tsx`, and `app/dashboard/page.tsx`, replace direct scroll-time `getBoundingClientRect()` work with a shared throttled `requestAnimationFrame` helper where needed.
  - Only attach listeners when the related overlay/tooltip is visible.
  - Ensure listeners are passive unless they intentionally call `preventDefault()`.
5. **Validate with browser profiling**
  - Use Chrome performance profiling on the production-like page before and after.
  - Check for lower scripting/painting time while scrolling and fewer long frames.
  - Verify that the mascot, sensor bar, character carousel, and marketing scroll still behave correctly.

## Expected Outcome

The largest smoothness gain should come from reducing constant canvas work and concurrent Lottie animations. The repaint and scroll-listener cleanup should further reduce dropped frames on lower-powered devices.