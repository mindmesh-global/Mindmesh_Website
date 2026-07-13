---
name: Phase 11 Product Overview
overview: Create the Phase 11 entry spec and task tracker for a Linear-inspired, fixture-driven MindMesh product overview directly below the homepage hero. The existing homepage sections remain intact; the new chapter shows the current desktop product through a compact four-scene app shell.
todos:
  - id: phase11-entry
    content: Create the Phase 11 product-overview entry specification
    status: pending
  - id: phase11-tracker
    content: Create the 15-task Phase 11 tracker with dependencies and blockers
    status: pending
  - id: phase11-carry-forward
    content: Link Phase 11 from the Phase 10 sign-off carry-forward
    status: pending
isProject: false
---

# Phase 11: Homepage Product Overview

## Direction

Create [`docs/phase-11-product-overview.md`](/Users/rohittripathi/Desktop/Mindmesh_Website/docs/phase-11-product-overview.md) and [`docs/phase-11-tasks.md`](/Users/rohittripathi/Desktop/Mindmesh_Website/docs/phase-11-tasks.md), following the Phase 10 tracker format.

The phase will add one large product overview between [`HeroSection.tsx`](/Users/rohittripathi/Desktop/Mindmesh_Website/components/marketing/sections/HeroSection.tsx) and [`ProblemSection.tsx`](/Users/rohittripathi/Desktop/Mindmesh_Website/components/marketing/sections/ProblemSection.tsx). Existing Problem, How It Works, Connect, Focus, Execute, Features, Integrations, Trust, and CTA sections remain.

## Product overview contract

- Persistent MindMesh desktop shell based on the current product IA in [`dashboardTabs.ts`](/Users/rohittripathi/Desktop/mindmesh_app/apps/desktop/app/dashboard/dashboardTabs.ts) and [`DashboardSidebar.tsx`](/Users/rohittripathi/Desktop/mindmesh_app/apps/desktop/app/dashboard/DashboardSidebar.tsx).
- Four guided scenes: Attention Board; Email plus Upcoming Events; Yesterday Narrative plus Connected Apps; Sensor plus Mascot.
- Fixture-driven coded UI only. Do not import authenticated product components, Tauri APIs, live customer data, Lottie, or backend calls.
- Desktop uses a short sticky scroll chapter, targeted at 170–190vh with no dead zones. Mobile uses normal-flow static scenes. Reduced motion shows a complete representative final state.
- Reuse [`ProductFrame.tsx`](/Users/rohittripathi/Desktop/Mindmesh_Website/components/marketing/theater/ProductFrame.tsx), existing static dashboard components, Phase 10 Sensor/Mascot panels, and marketing fixtures where accurate.
- Preserve homepage performance gates and dynamically load the interactive scene body below the hero.

## Proposed task list

1. **P11-T01: Product truth and surface map** (blocker)
   - Freeze current product IA and source paths from `mindmesh_app`.
   - Record desktop-first distribution, Attention Board sections, action approvals, and supported integrations.

2. **P11-T02: Overview narrative and scene order** (blocker)
   - Lock the four-scene sequence, section copy, captions, and transition intent.
   - Keep this chapter as product proof, not a duplicate of Connect → Focus → Execute.

3. **P11-T03: Fixture, privacy, and claim contract** (blocker)
   - Define sanitized Acme fixtures and prohibit live product imports or real account data.
   - Align action language with approval-based execution.

4. **P11-T04: App shell visual specification** (blocker)
   - Map sidebar, top bar, content viewport, active-tab treatment, and desktop framing from the current app.
   - Lock responsive and reduced-motion layouts before implementation.

5. **P11-T05: Build reusable MindMesh app frame** (blocker)
   - Add a marketing-only shell under `components/marketing/product-overview/`.
   - Include sidebar navigation and stable frame dimensions without product dependencies.

6. **P11-T06: Build Attention Board scene** (blocker)
   - Show Now, Later Today, Quietly Handled, source badges, and a concise why-now signal.
   - Base visuals on the real Attention Board, not the old single-priority-only card.

7. **P11-T07: Build Email and Upcoming Events scene** (blocker)
   - Reuse or adapt static inbox and calendar components.
   - Demonstrate switching between product tabs inside the same shell.

8. **P11-T08: Build Narrative and Connected Apps scene** (blocker)
   - Show an actionable yesterday recap and the seven connected sources with sync state.

9. **P11-T09: Build Sensor and Mascot scene** (blocker)
   - Present both as desktop companion surfaces using coded panels and local stills.
   - No live Lottie or Tauri window code.

10. **P11-T10: Scroll choreography and state helpers** (blocker)
    - Add a dedicated `productOverview` progress sequence or a scoped equivalent.
    - Ensure transitions use transform and opacity, pause off-screen, and avoid the long-runway issue corrected in Phase 10.

11. **P11-T11: Wire overview below the hero** (blocker)
    - Mount the new section in [`app/page.tsx`](/Users/rohittripathi/Desktop/Mindmesh_Website/app/page.tsx) immediately after `HeroSection`.
    - Add a stable `#product-overview` anchor and update the secondary hero CTA if appropriate.

12. **P11-T12: Product-truth copy alignment** (blocker)
    - Correct homepage metadata from Web to desktop where needed.
    - Remove or qualify automatic execution claims that conflict with product approval flows.
    - Do not broaden this into a full-site rewrite.

13. **P11-T13: Mobile, reduced-motion, and accessibility QA** (blocker)
    - Verify normal-flow mobile scenes, keyboard semantics, heading order, captions, and reduced-motion final state.

14. **P11-T14: Performance and bundle verification** (blocker)
    - Confirm the hero LCP path is unchanged, product code and Lottie stay out of homepage sync chunks, and run a three-pass homepage Lighthouse check.

15. **P11-T15: Visual fidelity and phase sign-off** (blocker)
    - Compare the marketing shell against current `mindmesh_app` surfaces, record intentional simplifications, and sign off Phase 11.

## Explicit non-goals

- Embedding or rebuilding the complete authenticated app.
- Replacing the existing homepage sections.
- Live API, OAuth, Tauri, Qdrant, Lottie, or customer data on the homepage.
- Reproducing settings, billing, onboarding, or every product control in the overview.
- Copying Linear visual assets or branding; only use its product-led storytelling pattern.