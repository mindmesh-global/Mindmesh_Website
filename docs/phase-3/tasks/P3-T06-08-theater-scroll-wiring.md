# P3-T06–T08: Wire Scroll Kit Into Theater Sections

**Task IDs:** P3-T06, P3-T07, P3-T08  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-04  
**Parent:** [phase-3-tasks.md](../phase-3-tasks.md)  
**Depends on:** P3-T05, P2-T17–T19, P1-T06–08

---

## Summary

All three product theaters now use `TheaterScrollSection` instead of bare `ProductFrame`. Headline/subhead remain in `MarketingSection`; scroll wrapper + sticky frame live below.

| Task | Section | File | Wrapper vh (desktop) |
|------|---------|------|----------------------|
| P3-T06 | `#connect` | `ProductTheaterConnect.tsx` | 220vh |
| P3-T07 | `#focus` | `ProductTheaterFocus.tsx` | 240vh |
| P3-T08 | `#execute` | `ProductTheaterExecute.tsx` | 220vh |

---

## Pattern

```tsx
<MarketingSection id="connect" title="..." subtitle="...">
  <TheaterScrollSection theaterId="connect" caption="...">
    {/* static final frame (Phase 4 animates) */}
  </TheaterScrollSection>
  {/* depth links below */}
</MarketingSection>
```

---

## Acceptance criteria

### P3-T06 Connect

- [x] `id="connect"` unchanged
- [x] Copy outside frame (title/subhead in MarketingSection, depth link below)
- [x] Static 7-app grid inside sticky frame
- [x] Scroll wrapper ~220vh desktop via `theaterId="connect"`

### P3-T07 Focus

- [x] `id="focus"` unchanged
- [x] Priority card static final state
- [x] Wrapper 240vh desktop via `theaterId="focus"`

### P3-T08 Execute

- [x] `id="execute"` unchanged
- [x] Static success frame (draft, calendar, Jira, banner)
- [x] Reduced motion handled by `useScrollSection` (progress 0.92)

---

## Notes

- Theater chunks still load via `MarketingTheaterSections` (`ssr: false`).
- Framer Motion enters through `TheaterScrollSection` → `useScrollSection`.
- Phase 4 replaces static inner content with step-driven animation via `useTheaterScroll()`.

---

## Next steps

- **P3-T09:** Optional barrel export under `theater/`
- **P3-T12–T13:** Reduced motion + off-screen pause QA
- **Phase 4:** Beat-sheet animations
