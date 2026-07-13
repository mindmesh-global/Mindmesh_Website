# Phase 11: Homepage Product Overview

**Status:** In progress (P11-T01–T12 done)  
**Prerequisite:** [Phase 10 sign-off](./phase-10/tasks/P10-T10-sign-off.md) (P10-T10, 2026-07-10)  
**Task breakdown:** [phase-11-tasks.md](./phase-11-tasks.md)  
**Product source of truth:** `/Users/rohittripathi/Desktop/mindmesh_app`  
**Parent:** [phase-1-foundation.md](./phase-1-foundation.md) · [phase-10-theater-upgrades.md](./phase-10-theater-upgrades.md)

Phase 11 adds a large, product-led MindMesh overview immediately below the homepage hero. It follows the product-storytelling pattern used by Linear while keeping MindMesh's existing visual system, narrative, and product identity.

The current homepage remains intact. The new chapter gives visitors a realistic overview of the shipping desktop product before they continue into Problem, How It Works, Connect, Focus, Execute, Features, Integrations, Trust, and CTA.

---

## Goal

1. Show the current MindMesh desktop product directly below the hero
2. Introduce the main product surfaces inside one persistent app shell
3. Use a short guided sequence with light animation and no dead scroll zones
4. Match the current `mindmesh_app` product instead of legacy website mockups
5. Keep the homepage fast, deterministic, accessible, and privacy-safe

---

## Placement

Current homepage:

```text
Hero
Problem
How it works
Connect
Focus
Execute
Features
Integrations
Trust
CTA
```

Phase 11:

```text
Hero
Product overview (new)
Problem
How it works
Connect
Focus
Execute
Features
Integrations
Trust
CTA
```

The product overview mounts in [`app/page.tsx`](../app/page.tsx) immediately after `HeroSection`.

---

## Product overview scenes

### Scene 1: Attention Board

Show the real product's default workspace:

- Now
- Later Today
- Quietly Handled
- Source badges
- Why-now reasoning
- Calendar overlap signal

Product references:

- `mindmesh_app/apps/desktop/app/dashboard/AttentionView.tsx`
- `mindmesh_app/apps/desktop/app/dashboard/components/attention/AttentionBoard.tsx`
- `mindmesh_app/apps/desktop/app/dashboard/components/attention/ActionCard.tsx`
- `mindmesh_app/apps/desktop/app/dashboard/components/attention/QuietRow.tsx`

### Scene 2: Email + Upcoming Events

Show the desktop sidebar switching between:

- Email inbox
- All / Sent / Drafts
- Upcoming events
- A focused email or meeting context

Product references:

- `mindmesh_app/apps/desktop/components/gmail/GmailThreadList.tsx`
- `mindmesh_app/apps/desktop/components/calendar/CalendarEvents.tsx`
- `mindmesh_app/apps/desktop/app/dashboard/DashboardSidebar.tsx`

### Scene 3: Yesterday Narrative + Connected Apps

Show:

- Actionable yesterday recap
- Evidence and stats
- Seven connected sources
- Sync / connected state

Product references:

- `mindmesh_app/apps/desktop/app/dashboard/DailyNarrativeCard.tsx`
- `mindmesh_app/apps/desktop/app/dashboard/AppsManagementSection.tsx`
- `mindmesh_app/apps/desktop/state/appsStore.ts`

### Scene 4: Sensor + Mascot

Show both companion surfaces without embedding the live product:

- Sensor command bar
- Quick calculation or navigation result
- Mascot conversation / attachment result
- Local companion still

Product references:

- `mindmesh_app/apps/desktop/components/Sensor.tsx`
- `mindmesh_app/apps/desktop/app/mascot/page.tsx`
- Existing Phase 10 marketing demos and local mascot stills

---

## Interaction contract

| Surface | Contract |
|---------|----------|
| Desktop | Persistent app frame with short scroll-linked scene changes |
| Scroll runway | Target **170–190vh**; verify by feel before sign-off |
| Mobile | Normal-flow static scenes; no sticky dependency |
| Reduced motion | Complete representative final state; no scrub requirement |
| Motion | `transform` + `opacity` only |
| Off-screen | Pause updates when overview leaves viewport |
| Input | Decorative preview; no fake functional controls unless clearly presented as scene navigation |

The Phase 10 visible-flow correction is a hard constraint: visitors must not scroll through long idle states waiting for content to appear.

---

## Implementation contract

- Fixture-driven coded UI only
- No authenticated product imports
- No Tauri APIs
- No live API or OAuth calls
- No real customer data
- No live Lottie on the marketing funnel
- No Qdrant, search engine, attention engine, or backend dependencies
- Interactive body dynamically loaded below the hero
- Existing homepage hero LCP path stays unchanged

Preferred reuse:

- `components/marketing/theater/ProductFrame.tsx`
- `components/dashboard/StaticInboxList.tsx`
- `components/dashboard/StaticCalendarEvents.tsx`
- Existing Phase 10 Sensor and Mascot marketing panels
- `lib/marketing-demo-data.ts`
- `lib/marketing-integrations.ts`
- `public/images/mascot-skins/`

New components should live under:

```text
components/marketing/product-overview/
```

---

## Product-truth constraints

The overview must reflect the current product:

- MindMesh is desktop-first, not a web-only product
- The default workspace is the Attention Board
- Attention includes multiple ranked items, not only one priority
- Email and calendar actions may require approval
- Jira and Slack are connected sources; do not imply unsupported automatic writes
- Sensor and Mascot are separate desktop companion surfaces

Phase 11 includes a bounded homepage truth-alignment task. It does not authorize a full-site copy rewrite.

---

## Performance budget

- No product repository code in homepage bundles
- No Lottie or Tauri modules
- Product overview body loads asynchronously
- No change to hero H1 ordering or font behavior
- No CLS from the app frame
- Revisit homepage Lighthouse after wiring
- Keep existing homepage Connect / Focus / Execute sections lazy and unchanged unless required for product-truth corrections

---

## Explicit non-goals

- Rebuilding the complete MindMesh app on the website
- Replacing existing homepage sections
- Embedding the authenticated desktop product
- Live customer data or demo accounts
- Reproducing settings, billing, onboarding, or every product control
- Copying Linear branding, assets, layouts, or visual identity
- Dashboard redesign inside `mindmesh_app`

---

## Definition of done

- [ ] Product overview appears directly below the homepage hero
- [ ] Four scenes represent the current desktop product
- [ ] Desktop sequence feels compact and has no dead scroll zones
- [ ] Mobile and reduced-motion experiences are complete
- [ ] No live product, Tauri, Lottie, or customer data reaches the homepage
- [ ] Product claims match current product behavior
- [ ] Homepage performance and bundle checks pass
- [ ] P11-T15 sign-off recorded
