# P4-T01: `StaticConnectedApps` Marketing Variant

**Task ID:** P4-T01  
**Status:** done  
**Type:** Component refactor  
**Completed:** 2026-07-04  
**Parent:** [phase-4-tasks.md](../phase-4-tasks.md)  
**Depends on:** P3-T18, [P1-T23](../../phase-1/tasks/P1-T23-theater-reuse-map.md), [P1-T06](../../phase-1/tasks/P1-T06-theater-connect.md)  
**Blocks:** P4-T02, P4-T03

---

## Goal

Add a marketing variant of [`StaticConnectedApps.tsx`](../../../components/dashboard/StaticConnectedApps.tsx) with 7-app fixtures, dark theme tokens, beat-sheet visual props, and no dashboard context dependencies.

---

## Implementation

### Props API

```ts
type StaticConnectedAppsProps = {
  variant?: 'dashboard' | 'marketing'; // default dashboard
  apps?: readonly ConnectedAppFixture[];
  step?: 0 | 1 | 2 | 3 | 4;
  visibleAppCount?: number;
  showConnectedBadge?: boolean;
  showSyncBanner?: boolean;
  highlightAddApp?: boolean;
  className?: string;
};
```

| Prop | Beat (P1-T06) | Effect |
|------|---------------|--------|
| `step={0}` | 0.00–0.15 empty | Empty panel, "No sources yet.", Add App highlighted |
| `visibleAppCount` | 0.15–0.55 fly-in | First N cards visible (transform/opacity ready for P4-T02) |
| `showConnectedBadge` | 0.55–0.75 | Green "connected" badge on visible cards |
| `showSyncBanner` | 0.75–0.90 | "{n} sources syncing" banner |
| `step={4}` / default | 0.90–1.00 hold | Full final frame |

### Progress helpers (P4-T02)

Added to [`lib/marketing-theater-scroll.ts`](../../../lib/marketing-theater-scroll.ts):

- `ConnectVisualState`
- `getConnectVisualStateFromStep(step, totalApps, visibleAppCountOverride?)`
- `getConnectVisualStateFromProgress(progress, totalApps)`

### Fixtures

[`ConnectedAppFixture`](../../../lib/marketing-demo-data.ts) type exported; `CONNECTED_APP_FIXTURES_ACME` covers all 7 apps with Acme account labels.

### Dashboard unchanged

Default `variant="dashboard"` renders the original 4-app light-theme panel with `HoverTypingTooltip` and `useSectionHover`.

### Marketing variant

- Dark `--mm-*` tokens (`bg-mm-surface-container`, etc.)
- PNG icons via `next/image` from fixtures
- `grid-cols-2` layout (7 apps in frame)
- No `SectionHoverContext` / `HoverTypingTooltip`
- QA attrs: `data-connect-visible-count`, `data-connect-app-visible`, etc.

---

## Checklist

- [x] `variant="marketing"` with dark theme
- [x] 7 apps from `CONNECTED_APP_FIXTURES_ACME`
- [x] `step` / `visibleAppCount` / badge / banner props
- [x] Empty state + sync banner per P1-T06
- [x] Dashboard default behavior preserved
- [x] Progress → visual state helpers for P4-T02
- [x] Wired into `ProductTheaterConnect` (P4-T03)

---

## Next steps

- **P4-T02:** `ConnectTheaterDemo` using `getConnectVisualStateFromProgress` + Framer motion
- **P4-T03:** Replace inline grid in `ProductTheaterConnect`
