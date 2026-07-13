# P11-T05: Product Overview Shell + Scroll Orchestration

**Task ID:** P11-T05  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-10  
**Parent:** [phase-11-tasks.md](../../phase-11-tasks.md) | [phase-11-product-overview.md](../../phase-11-product-overview.md)  
**Depends on:** [P11-T02](./P11-T02-overview-beat-sheet.md), [P11-T03](./P11-T03-product-fixtures.md), [P11-T04](./P11-T04-app-frame-spec.md)  
**Blocks:** P11-T06, P11-T07, P11-T08, P11-T09, P11-T10, P11-T11  
**Blocker:** Yes

---

## Goal

Ship the shared product-overview shell: persistent MindMesh frame, sidebar, scroll progress, and four scene layers. Scene UIs are fixture-driven placeholders until P11-T06–T09.

Homepage mount remains **P11-T11**.

---

## What shipped

### Scroll kit

| Item | Location |
|------|----------|
| `TheaterId` + `productOverview` | `lib/marketing-theater-scroll.ts` |
| Wrapper | `180vh` desktop / `120vh` mobile class; CSS mirror in `globals.css` |
| Progress steps | `PRODUCT_OVERVIEW_PROGRESS_STEPS` (P11-T02 table) |
| Reduced motion | `0.9` |
| Visual helpers | `lib/marketing-product-overview-scroll.ts` |

### Components

```text
components/marketing/product-overview/
  ProductOverviewSection.tsx      # MarketingSection + desktop/mobile split
  ProductOverviewDesktop.tsx      # sticky scrub + layered scenes
  ProductOverviewMobile.tsx       # stacked final-state cards
  ProductOverviewFrame.tsx        # title bar + 220px nav + main
  ProductOverviewNav.tsx          # scene-driven sidebar
  ProductOverviewContext.tsx      # scroll + visual state
  scenes/
    AttentionOverviewScene.tsx
    InboxCalendarOverviewScene.tsx
    NarrativeAppsOverviewScene.tsx
    CompanionsOverviewScene.tsx
    OverviewScenePlaceholders.tsx # fixture-driven placeholder UIs
  index.ts
```

### Behavior

- One persistent desktop frame; main pane crossfades via `opacity` + `translateY`
- Off-screen pause via `useScrollSection`
- Progress clamped 0–1
- Mobile: no sticky; four stacked finals
- Reduced motion: pin to companions hold (`0.9`)
- No `mindmesh_app` imports

---

## Acceptance checklist

- [x] One persistent desktop app frame hosts all scenes
- [x] Desktop uses a compact scroll-linked sequence
- [x] Target runway starts within 170–190vh (**180vh**)
- [x] Progress clamps safely from 0 to 1
- [x] Off-screen updates pause
- [x] Motion uses `transform` + `opacity` only
- [x] No product repository code is imported

---

## Follow-ups

- **P11-T06–T09** - replace placeholder scene UIs with polished panels
- **P11-T10** - progress dots / pointer scene navigation polish
- **P11-T11** - mount after hero with dynamic import + skeleton
- **P11-T12** - mobile / reduced-motion QA pass
