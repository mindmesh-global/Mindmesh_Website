# P5-T02: `MarketingDepthLayout` Shared Wrapper

**Task ID:** P5-T02  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-09  
**Parent:** [phase-5-tasks.md](../phase-5-tasks.md) | [phase-5-depth-pages.md](../phase-5-depth-pages.md)  
**Depends on:** [P5-T01](./P5-T01-marketing-route-gate.md), [P2-T03](../../phase-2/tasks/P2-T03-marketing-layout.md)  
**Blocks:** P5-T03–T08

---

## Goal

Reusable layout for Phase 5 funnel depth pages: marketing theme, always-visible `MarketingNav`, page hero slot, content, and `MarketingFooter`.

---

## Deliverables

| File | Change |
|------|--------|
| [`MarketingDepthLayout.tsx`](../../../components/marketing/MarketingDepthLayout.tsx) | New depth shell with eyebrow / title / subtitle / optional back link |
| [`MarketingNav.tsx`](../../../components/marketing/MarketingNav.tsx) | Depth-aware links: homepage uses `#section`; depth pages use `/#section` |

Homepage [`MarketingLayout.tsx`](../../../components/marketing/MarketingLayout.tsx) left unchanged (long-scroll composition).

---

## API

```tsx
import { MarketingDepthLayout } from '@/components/marketing/MarketingDepthLayout';

export default function ConnectedAppsPage() {
  return (
    <MarketingDepthLayout
      eyebrow="Connectivity"
      title="Connect the tools you already use"
      subtitle="MindMesh reads your sources without replacing them."
      backHref="/#connect"
      backLabel="See Connect theater →"
    >
      {/* page body sections */}
    </MarketingDepthLayout>
  );
}
```

| Prop | Required | Role |
|------|----------|------|
| `title` | Yes | Page H1 |
| `children` | Yes | Body below the page hero |
| `eyebrow` | No | Small label above title |
| `subtitle` | No | Supporting sentence |
| `backHref` / `backLabel` | No | Pillar / homepage cross-link (P5-T11 will standardize) |
| `className` | No | Extra class on theme root |

---

## Structure

```tsx
<div data-marketing-theme="dark" data-marketing-layout="depth" className="min-h-screen ...">
  <MarketingNav />                 {/* fixed h-16; always visible on depth */}
  <main className="pt-16">
    <header>…eyebrow / H1 / subtitle / back link…</header>
    {children}
  </main>
  <MarketingFooter />
</div>
```

| Rule | Implementation |
|------|----------------|
| Theme | `data-marketing-theme="dark"` |
| Depth marker | `data-marketing-layout="depth"` |
| Nav offset | `main` has `pt-16` |
| Content width | Hero uses `max-w-[1120px] px-6` (same as homepage) |
| No legacy chrome | No `SiteNav`, Hero, overlays, or cursor |

---

## `MarketingNav` depth behavior

| Context | Brand link | Product / Features / Security / CTA |
|---------|------------|-------------------------------------|
| Homepage (`/`) | `#hero` smooth scroll; hide until past hero | In-page `#connect`, `#features`, `#trust`, `#cta` |
| Depth funnel | `/` via `Link` | `/#connect`, `/#features`, `/#trust`, `/#cta` via `Link` |
| Depth funnel | Nav always visible (`pastHero` forced true) | Same |

---

## Acceptance criteria

- [x] `MarketingDepthLayout` exports with theme + nav + hero slot + footer
- [x] Required `title`; optional eyebrow, subtitle, back link
- [x] `MarketingNav` works from depth pages without broken hash-only links
- [x] Homepage nav behavior preserved (hide until past `#hero`)
- [x] No Hero / overlay / cursor imports
- [x] Typecheck pass

---

## Usage note

Pages are **not** migrated in this task. P5-T03–T08 wrap each depth route in `MarketingDepthLayout` and remove local `SiteNav` / Manrope loads.

---

## Next steps

- **P5-T03:** `/connected-apps` 7-app refactor — [done](./P5-T03-connected-apps-refactor.md)
- **P5-T04:** `/inbox` marketing alignment
