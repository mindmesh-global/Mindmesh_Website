# Naming cheat sheet — “layout”, `page.tsx`, and folders

Several files sound alike but do **different jobs**. Use this table when you need to remember **which thing is which**.

| Name in the repo | What it actually is | Can you rename it? |
|------------------|---------------------|--------------------|
| `app/layout.tsx` | Next.js **App Router** root shell: fonts, global providers, `<html>` / `<body>`. | **No** — Next.js requires this filename. |
| `app/dashboard/layout.tsx` | Next.js **route segment** layout for `/dashboard` only (here: **metadata** for SEO). | **No** — same rule. |
| `app/**/page.tsx` | Next.js **route entry** for that URL (e.g. `app/dashboard/page.tsx` = `/dashboard`). Many routes each have a `page.tsx`; that is normal. | **No** — Next.js convention. |
| `DashboardViewModeContext.tsx` | React **state** for dashboard **view mode** (`desktop` vs `scrollable`) + `localStorage`. | Yes (already a distinct name). |
| `DashboardViewModeProvider` | Wraps dashboard UI so `useViewMode()` works. | — |
| `components/dashboard/view-shells/*` | **Presentational shells** only: chrome around the same dashboard sections (not Next layouts). | Folder name is intentional: **view-shells** ≠ `app/layout.tsx`. |
| `DashboardDesktopShell` | Wide, app-like dashboard frame. | — |
| `DashboardScrollShell` | Narrower, scroll/landing-style dashboard frame. | — |

### Mental model

1. **`layout.tsx` / `page.tsx` under `app/`** → routing and framework (Next.js owns the names).
2. **`DashboardViewMode*`** → **which dashboard presentation** the user chose.
3. **`view-shells`** → **how that presentation looks** (wrapper + header slot).

### Related doc

- Feature details: [dashboard-view-switcher.md](./dashboard-view-switcher.md).

---

## Full project structure (this repo)

Snapshot of folders and files under the project root (`website/`). **Not listed:** `node_modules/`, `.next/`, `.git/`, and local/editor-only files such as `.env.local` or `.cursor/` debug logs.

```
website/
├── app/
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.ts
│   │   └── waitlist/
│   │       └── route.ts
│   ├── app-directory/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── demo/
│   │   └── page.tsx
│   ├── docs/
│   │   └── page.tsx
│   ├── features/
│   │   └── page.tsx
│   ├── privacy/
│   │   └── page.tsx
│   ├── social/
│   │   └── page.tsx
│   ├── subscription/
│   │   └── page.tsx
│   ├── terms/
│   │   └── page.tsx
│   ├── ui/
│   │   └── page.tsx
│   ├── waitlist/
│   │   └── page.tsx
│   ├── globals.css
│   ├── icon.png
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── dashboard/
│   │   ├── view-shells/
│   │   │   ├── DashboardDesktopShell.tsx
│   │   │   └── DashboardScrollShell.tsx
│   │   ├── DashboardMainSections.tsx
│   │   ├── SectionDimOverlay.tsx
│   │   ├── StaticCalendarEvents.tsx
│   │   ├── StaticConnectedApps.tsx
│   │   ├── StaticDailyNarrativeCard.tsx
│   │   ├── StaticDailySummaryPanel.tsx
│   │   ├── StaticInboxList.tsx
│   │   └── StaticWeatherCard.tsx
│   ├── layout/
│   │   ├── AnimatedBackground.tsx
│   │   └── DesktopNav.tsx
│   ├── ui/
│   │   ├── gradient-honeycomb.tsx
│   │   ├── HoverTypingTooltip.tsx
│   │   ├── TypingText.tsx
│   │   └── ViewSwitcherButton.tsx
│   ├── AppDirectoryWindow.tsx
│   ├── ConditionalOverlays.tsx
│   ├── ContactWindow.tsx
│   ├── CursorProvider.tsx
│   ├── CustomContextMenu.tsx
│   ├── CustomCursorFollower.tsx
│   ├── DocsWindow.tsx
│   ├── FeaturesWindow.tsx
│   ├── Hero.tsx
│   ├── Logo.tsx
│   ├── MascotChatbot.tsx
│   ├── mindmeshui.tsx
│   ├── MovieWindow.tsx
│   ├── PricingWindow.tsx
│   ├── SensorBarSpotlight.tsx
│   ├── SocialWindow.tsx
│   └── WaitlistModal.tsx
├── context/
│   ├── CustomCursorContext.tsx
│   ├── DashboardViewModeContext.tsx
│   ├── HomeSectionContext.tsx
│   ├── MindMeshContainerContext.tsx
│   ├── OnboardingTourContext.tsx
│   ├── SectionHoverContext.tsx
│   ├── SplitViewContext.tsx
│   └── UIOverlayContext.tsx
├── docs/
│   ├── dashboard-view-switcher.md
│   └── naming-and-folders.md
├── hooks/
│   ├── useCursor.ts
│   └── useViewMode.ts
├── lib/
│   └── seo.ts
├── public/
│   ├── images/
│   │   ├── icons/
│   │   │   ├── gmail.png
│   │   │   ├── gmail.svg
│   │   │   ├── google-calendar.png
│   │   │   ├── google-calendar.svg
│   │   │   ├── outlook.png
│   │   │   ├── outlook.svg
│   │   │   ├── outlook-calendar.png
│   │   │   ├── outlook-calendar.svg
│   │   │   ├── smtp.png
│   │   │   └── smtp.svg
│   │   ├── Logo/
│   │   │   ├── mindmesh1-logo.png
│   │   │   ├── mindmesh-logo.png
│   │   │   └── mindmesh-logo-tight.png
│   │   ├── app-directory-icon.png
│   │   ├── contact-us-icon.png
│   │   ├── demo-icon.png
│   │   ├── docs-icon.png
│   │   ├── features-icon.png
│   │   ├── herosec-bg.png
│   │   ├── hero-sec-bg.png
│   │   ├── join-waitlist-icon.png
│   │   ├── mindmesh-2.png
│   │   ├── mindmesh-bg.png
│   │   ├── social-icon.png
│   │   └── subscription-icon.png
│   ├── cursor.png
│   ├── custom-cursor.png
│   ├── og-image.png
│   ├── robots.txt
│   └── sitemap.xml
├── types/
│   └── gtag.d.ts
├── utils/
│   └── trackEvent.ts
├── next-env.d.ts
├── next.config.js
├── next-sitemap.config.js
├── package.json
├── package-lock.json
├── postcss.config.js
├── QUICK_START.md
├── README.md
├── README-MIGRATION.md
├── tailwind.config.ts
└── tsconfig.json
```

### Notes

- **`app/`** — Next.js App Router: each route folder’s `page.tsx` maps to a URL path; `layout.tsx` wraps segments; `globals.css` is global styles.
- **`components/layout/`** — site chrome (e.g. nav, animated background), **not** the same as `app/layout.tsx` or dashboard **view-shells**.
- **`components/dashboard/`** — dashboard-specific UI plus **view-shells** for desktop vs scroll presentation.
- **`context/`** — React context providers for app-wide or feature state.
- **`public/`** — static assets served from `/`; `sitemap.xml` / `robots.txt` may be overwritten or complemented by build steps (`next-sitemap`).
When this tree drifts, regenerate it from the repo (e.g. `Get-ChildItem -Recurse` on Windows, or `tree /F` / your IDE file tree) and update this section.
