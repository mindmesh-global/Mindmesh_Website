# MindMesh — Dashboard View Switcher

This document describes the **dual layout toggle** on the dashboard: users can switch between a **desktop-style** (panel-based) layout and a **scrollable** (landing-style) layout. The URL stays `/dashboard`; only presentation changes.

> **Naming:** Several things used to be called “layout”. See [naming-and-folders.md](./naming-and-folders.md) for how **Next.js `layout.tsx`**, **view mode context**, and **dashboard view shells** differ.

---

## What it does

| Mode | Description |
|------|-------------|
| **Desktop View** | App-like shell: wide container (`max-w-7xl`), neutral gray background, familiar dashboard density. |
| **Scroll View** | Single-column, more vertical spacing, gradient background, larger typography — closer to a scrollable overview page. |

A **pill-shaped control** is **fixed at the top of the viewport** (portaled to `document.body`, same z-index tier as the MindMesh logo). On small screens it is **horizontally centered**; from `sm` and up it sits **top-right** (`right-6`). The **dashboard header** only shows the weather card. Icons use **Lucide**: `Monitor` (desktop) and `ScrollText` (scrollable). Styling: blue background, white label and icons.

---

## State and persistence

- **React Context** (`DashboardViewModeProvider`) holds `viewMode`: `'desktop' | 'scrollable'`.
- **localStorage** key: `mindmesh-dashboard-view`. The value is read after mount so the server and first client paint stay aligned; then the stored preference applies.
- **Hook**: `useViewMode()` from `hooks/useViewMode.ts` returns `{ viewMode, toggleViewMode }`.
- Lower-level access: `useDashboardViewModeContext()` in `context/DashboardViewModeContext.tsx` (also exposes `setViewMode`).

---

## Files involved

| Path | Purpose |
|------|---------|
| `context/DashboardViewModeContext.tsx` | Provider, persistence, `toggleViewMode` / `setViewMode`. |
| `hooks/useViewMode.ts` | Thin hook over the view-mode context. |
| `components/ui/ViewSwitcherButton.tsx` | Toggle UI (Framer Motion + Lucide). Loaded with `next/dynamic` and `ssr: false`. |
| `components/dashboard/view-shells/DashboardDesktopShell.tsx` | Desktop shell: `<main>`, header row, title + `headerRight` slot. |
| `components/dashboard/view-shells/DashboardScrollShell.tsx` | Scrollable shell: `<main>`, gradient, narrower column, `headerRight` slot. |
| `components/dashboard/DashboardMainSections.tsx` | Shared dashboard sections (same data, spacing differs by `variant`). |
| `app/dashboard/page.tsx` | `DashboardViewModeProvider`, scroll/section observers, `AnimatePresence` + shell switch. |
| `app/dashboard/layout.tsx` | **Metadata only** (title, description, Open Graph) for SEO — no client providers here. |

---

## Animations

- **Layout switch**: `framer-motion` `AnimatePresence` with `mode="wait"` wraps each shell branch. Motion props use opacity, vertical offset, and a slight scale (see `layoutTransition` in `app/dashboard/page.tsx`).
- **Button**: `whileHover` / `whileTap` on the switcher; inner label/icon use a small `AnimatePresence` when the mode label changes.

---

## SSR and hydration

`ViewSwitcherButton` is imported with:

```ts
dynamic(() => import('@/components/ui/ViewSwitcherButton'), { ssr: false })
```

That avoids mismatches between server HTML and client-only `localStorage` for the control. The dashboard page itself remains a client component.

---

## Embedding the dashboard (`MindMeshUI`)

`components/mindmeshui.tsx` imports `DashboardPage` directly (not via the `/dashboard` route tree). **`DashboardViewModeProvider` is therefore mounted inside `app/dashboard/page.tsx`**, not only in `app/dashboard/layout.tsx`, so the embedded dashboard and the standalone `/dashboard` route both receive the same context.

---

## Semantic HTML and SEO

- Both shells render a single **`<main aria-label="Dashboard">`** per mode (only one is mounted at a time).
- Section blocks in `DashboardMainSections` use **`<section aria-label="…">`** where appropriate.
- SEO metadata for the dashboard lives in **`app/dashboard/layout.tsx`** (`export const metadata`), independent of the client-only view switch.

---

## Dependencies

- **framer-motion** — `AnimatePresence`, `motion` for layout and button micro-interactions.
- **lucide-react** — `Monitor`, `ScrollText`.
- **next/dynamic** — `ssr: false` for the switcher button.

---

## Optional extensions

- Add **`setViewMode`** to `useViewMode` if other components need to force a mode without toggling.
- A **Zustand** store could mirror context if you later need middleware or devtools; the current implementation uses context only.

---

## Quick test checklist

1. Open `/dashboard`, toggle **Desktop View** ↔ **Scroll View**; layout and animation should swap without navigation.
2. Reload the page; the last mode should persist (localStorage).
3. Open the dashboard inside the home **MindMesh** window; the switcher should work the same (provider on the page).
