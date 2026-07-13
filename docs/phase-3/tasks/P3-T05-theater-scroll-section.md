# P3-T05: `TheaterScrollSection` Wrapper

**Task ID:** P3-T05  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-04  
**Parent:** [phase-3-tasks.md](../phase-3-tasks.md)  
**Depends on:** P3-T02, P3-T04, P1-T15  
**Blocks:** P3-T06–T08

---

## Quick reference

| Field | Value |
|-------|-------|
| **Component** | [`TheaterScrollSection.tsx`](../../../components/marketing/theater/TheaterScrollSection.tsx) |
| **Scroll hook** | `useScrollSection({ theaterId })` |
| **Context** | `TheaterScrollProvider` wraps frame content |

---

## Anatomy

```text
MarketingSection (headline + subhead outside)
  TheaterScrollSection
    div[ref] min-h-[120vh] md:min-h-[220vh|240vh]
      TheaterScrollProvider
        ProductFrame (sticky top 80px)
          children
        caption
```

---

## Props

| Prop | Type | Purpose |
|------|------|---------|
| `theaterId` | `'connect' \| 'focus' \| 'execute'` | Wrapper height + scroll thresholds |
| `children` | `ReactNode` | Frame demo content |
| `caption` | `string?` | Below-frame caption |
| `sidebar` | `ReactNode?` | Connect left rail (Phase 4) |
| `className` | `string?` | Extra wrapper classes |

---

## Wrapper heights (P3-T01 / P1-T15)

| Theater | Mobile | Desktop |
|---------|--------|---------|
| connect | 120vh | 220vh |
| focus | 120vh | 240vh |
| execute | 120vh | 220vh |

Uses static `THEATER_WRAPPER_CLASS` map (Tailwind JIT-safe).

---

## Acceptance criteria

- [x] Headline/subhead stay in `MarketingSection` (component is frame-only)
- [x] `useScrollSection` ref on scroll wrapper
- [x] Sticky `ProductFrame` inside wrapper
- [x] Scroll state via `TheaterScrollProvider`

---

## Integration (P3-T06+)

Replace direct `ProductFrame` in theater sections:

```tsx
<MarketingSection id="connect" title="..." subtitle="...">
  <TheaterScrollSection theaterId="connect" caption="...">
    {/* grid content */}
  </TheaterScrollSection>
  <p className="mt-6">...</p>
</MarketingSection>
```

---

## Next step

**P3-T06:** Wire `ProductTheaterConnect` to use `TheaterScrollSection`.
