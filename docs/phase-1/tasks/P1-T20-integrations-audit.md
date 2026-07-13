# P1-T20: Integrations Audit (Website + Product App)

**Task ID:** P1-T20  
**Status:** done  
**Type:** Strategy and documentation (website fixes in Phase 5/6)  
**Completed:** 2026-07-03  
**Parent:** [phase-1-tasks.md](../phase-1-tasks.md) | [phase-1-foundation.md](../phase-1-foundation.md) §6  
**Depends on:** nothing  
**Blocks:** [P1-T21](../phase-1-tasks.md#p1-t21--source-slack-and-jira-brand-assets-for-marketing) (Slack/Jira assets), Phase 5/6 website alignment

---

## Quick reference

| Field | Value |
|-------|-------|
| **Source of truth** | `mindmesh_app` desktop connectors (7 apps, all production-ready) |
| **Marketing canonical list** | [P1-T10-integrations.md](./P1-T10-integrations.md) `MARKETING_INTEGRATIONS` |
| **Website gap** | Marketing UI lists 4–5 apps; missing **Slack**, **Jira**, and **Outlook Calendar** in several surfaces |
| **Not a product gap** | Slack and Jira OAuth + sync are **live** in the desktop app; website lags |

---

## Canonical 7-app list (validated)

Approved for homepage, theaters, and all public marketing after alignment work.

| # | Display name (marketing) | Type | Product ready | Website icon |
|---|------------------------|------|---------------|--------------|
| 1 | Gmail | Email | Yes | `public/images/icons/gmail.png` |
| 2 | Google Calendar | Calendar | Yes | `public/images/icons/google-calendar.png` |
| 3 | Outlook Email | Email | Yes | `public/images/icons/outlook.png` |
| 4 | Outlook Calendar | Calendar | Yes | `public/images/icons/outlook-calendar.png` |
| 5 | SMTP Mailbox | Email | Yes | `public/images/icons/smtp.png` |
| 6 | Slack | Messaging | Yes | [`slack.png`](../../../public/images/icons/slack.png) ([P1-T21](./P1-T21-slack-jira-assets.md)) |
| 7 | Jira | Tasks | Yes | [`jira.png`](../../../public/images/icons/jira.png) ([P1-T21](./P1-T21-slack-jira-assets.md)) |

**Validation:** Matches [P1-T01](./P1-T01-narrative.md), [P1-T06](./P1-T06-theater-connect.md), [P1-T10](./P1-T10-integrations.md), and [phase-1-foundation.md §6](../phase-1-foundation.md#6-known-content-and-asset-gaps-surface-now-decide-before-phase-5).

**Re-verify when `mindmesh_app` repo is available:** Diff against `appsStore.ts` (or equivalent connector registry) and desktop `AppBrandIcon` / connector packages. Expected product references per [P1-T06](./P1-T06-theater-connect.md): `@mindmesh/connector-slack`, `@mindmesh/connector-jira`, icons under `mindmesh_app/apps/desktop/public/img/apps/`.

---

## Product app (`mindmesh_app`) — source of truth

`mindmesh_app` is **not in this website repo**. Inventory below is from product alignment docs and connector readiness already locked in Phase 1.

| Connector (expected) | Category | OAuth / sync | In website UI today |
|----------------------|----------|--------------|---------------------|
| Gmail | Email | Yes | Partial |
| Google Calendar | Calendar | Yes | Partial |
| Outlook Email | Email | Yes | Partial (often labeled "Outlook") |
| Outlook Calendar | Calendar | Yes | **Missing** in several UIs |
| SMTP Mailbox | Email | Yes | Partial (often labeled "SMTP") |
| Slack | Messaging | **Yes (production)** | **Missing** |
| Jira | Tasks | **Yes (production)** | **Missing** |

**Product files to diff (when available):**

| File (expected path) | Purpose |
|----------------------|---------|
| `appsStore.ts` (desktop app state) | Connector list + connection status |
| `AppBrandIcon.tsx` or similar | Icon mapping per connector |
| `apps/desktop/public/img/apps/` | Slack, Jira, and other brand PNGs |
| `@mindmesh/connector-slack`, `@mindmesh/connector-jira` | Live connector packages |

---

## Website surface audit

### Summary matrix

| Surface | Count | Slack | Jira | Outlook Cal | Status vs 7-app |
|---------|-------|-------|------|-------------|-------------------|
| **Product `mindmesh_app`** | 7 | Yes | Yes | Yes | Source of truth |
| **[P1-T10](./P1-T10-integrations.md) `#integrations`** | 7 | Yes | Yes | Yes | Spec ready (Phase 2 build) |
| **[P1-T06](./P1-T06-theater-connect.md) Connect theater** | 7 | Yes | Yes | Yes | Spec ready (Phase 4 build) |
| **[`/connected-apps`](../../../app/connected-apps/page.tsx)** | 5 | No | No | Yes | **Gap** |
| **[`StaticConnectedApps.tsx`](../../../components/dashboard/StaticConnectedApps.tsx)** | 4 | No | No | No | **Gap** |
| **[`AppDirectoryWindow.tsx`](../../../components/AppDirectoryWindow.tsx)** | 5 | No | No | Yes | **Gap** (Hero legacy) |
| **[`app/faq/page.tsx`](../../../app/faq/page.tsx)** | 5 | No | No | Yes | **Gap** (copy) |
| **[`app/trust/page.tsx`](../../../app/trust/page.tsx)** | ~4 vague | No | No | Unclear | **Gap** (copy) |
| **[`app/privacy/page.tsx`](../../../app/privacy/page.tsx)** | 3 named | No | No | No | **Gap** (legal copy) |
| **[`app/app-directory/page.tsx`](../../../app/app-directory/page.tsx)** metadata | 5 | No | No | Yes | **Gap** (SEO) |
| **[`DocsWindow.tsx`](../../../components/DocsWindow.tsx)** | 5 + generic | No | No | Yes | **Gap** (Hero legacy) |
| **[`DashboardDesktopShell.tsx`](../../../components/dashboard/view-shells/DashboardDesktopShell.tsx)** alt text | 4 | No | No | No | **Gap** (mockup caption) |
| **`public/images/icons/`** | 7 PNGs | Yes | Yes | Yes | **Complete** ([P1-T21](./P1-T21-slack-jira-assets.md)) |
| Billing / pricing copy | Email-focused | No | No | N/A | OK (plan limits, not catalog) |

---

## Per-file detail

### [`app/connected-apps/page.tsx`](../../../app/connected-apps/page.tsx)

| Field | Current | Target |
|-------|---------|--------|
| `supportedApps` array | 5 apps | Add Slack, Jira |
| Hero body copy | 5 apps named | All 7 + messaging/tasks wording |
| Metadata description | Gmail, Outlook, GCal, SMTP | Include Slack, Jira |
| Icons | Lucide placeholders | Product PNGs ([P1-T10](./P1-T10-integrations.md)) |

```22:28:app/connected-apps/page.tsx
const supportedApps = [
  { name: 'Gmail', icon: Mail },
  { name: 'Google Calendar', icon: CalendarDays },
  { name: 'Outlook Email', icon: Mail },
  { name: 'Outlook Calendar', icon: CalendarDays },
  { name: 'SMTP Mailbox', icon: Workflow },
] as const;
```

### [`components/dashboard/StaticConnectedApps.tsx`](../../../components/dashboard/StaticConnectedApps.tsx)

| Card | Shown | Notes |
|------|-------|-------|
| Gmail | Yes | |
| Google Calendar | Yes | |
| Outlook Email | Yes | Labeled **"Outlook"** (normalize to Outlook Email in marketing) |
| Outlook Calendar | **No** | |
| SMTP Mailbox | Yes | |
| Slack | **No** | |
| Jira | **No** | |

**Theater impact:** Connect sequence ([P1-T06](./P1-T06-theater-connect.md)) requires marketing variant with 7 cards + dark theme refactor.

### [`components/AppDirectoryWindow.tsx`](../../../components/AppDirectoryWindow.tsx)

5 apps with icons; missing Slack/Jira. Uses **"Gmail Calendar"** instead of **Google Calendar** and **"SMTP"** instead of **SMTP Mailbox**. Hero legacy; Phase 6 redirect to `/connected-apps`.

### FAQ, trust, privacy copy

| File | Issue |
|------|-------|
| [`app/faq/page.tsx`](../../../app/faq/page.tsx) L58 | Lists 5 apps only |
| [`app/trust/page.tsx`](../../../app/trust/page.tsx) L139 | "Gmail, Google Calendar, Outlook, and SMTP" (no Slack/Jira/Outlook Calendar) |
| [`app/privacy/page.tsx`](../../../app/privacy/page.tsx) L101 | Google + Microsoft only; no Slack/Jira data processing mention |

### Marketing specs (already correct — build only)

| Doc | Apps |
|-----|------|
| [P1-T10](./P1-T10-integrations.md) | 7 |
| [P1-T06](./P1-T06-theater-connect.md) | 7 |
| [P1-T09 Connected apps card](./P1-T09-feature-grid.md) | Copy mentions Slack + Jira |

---

## Display name inconsistencies

Normalize to [P1-T10 display names](./P1-T10-integrations.md) on all surfaces:

| Found in codebase | Canonical marketing name |
|-------------------|-------------------------|
| Gmail Calendar (`AppDirectoryWindow`) | Google Calendar |
| Outlook (`StaticConnectedApps`, trust page) | Outlook Email (when email-only) |
| SMTP (`AppDirectoryWindow`) | SMTP Mailbox |
| "Outlook" in calendar contexts | Outlook Calendar |

---

## Gap list (prioritized)

| ID | Gap | Severity | Phase | Owner action |
|----|-----|----------|-------|--------------|
| G1 | Slack + Jira missing from `/connected-apps` | High | 5/6 | Add to `supportedApps`, copy, metadata |
| G2 | Slack + Jira missing from `StaticConnectedApps` | High | 4/5 | Theater + dashboard demo alignment |
| G3 | Outlook Calendar missing from `StaticConnectedApps` | Medium | 4/5 | Add fourth email/calendar pair |
| G4 | Slack/Jira icons missing on website | High | [P1-T21](./P1-T21-slack-jira-assets.md) | ✅ Resolved 2026-07-03 |
| G5 | FAQ / trust / privacy copy lists incomplete | Medium | 5/6 | Legal + support copy review |
| G6 | `AppDirectoryWindow` / Hero docs stale | Low | 6 | Redirect `/app-directory` |
| G7 | Dashboard mockup alt text (4 apps) | Low | 6 | Update when mockup regenerated |
| G8 | `appsStore.ts` not diffed in this repo | Info | When repo available | Confirm no 8th connector added |

**Not gaps:** Billing plan bullets (email account limits) intentionally narrow. Security page read-only Gmail/GCal notes remain accurate.

---

## Phase 5/6 follow-up checklist

Track as implementation tickets after Phase 2 homepage ships.

### Phase 4 (theater, overlaps G2)

- [ ] `StaticConnectedApps` marketing variant: 7 cards, dark theme, canonical names
- [ ] `lib/marketing-demo-data.ts`: shared 7-app fixture ([P1-T06](./P1-T06-theater-connect.md))
- [ ] `lib/marketing-integrations.ts`: single export shared by `#integrations` and theater

### Phase 5/6 (website alignment)

- [ ] [`app/connected-apps/page.tsx`](../../../app/connected-apps/page.tsx): 7 apps, icons, hero + metadata
- [ ] [`app/faq/page.tsx`](../../../app/faq/page.tsx): integration answer → 7 apps
- [ ] [`app/trust/page.tsx`](../../../app/trust/page.tsx): FAQ "Which apps" → 7 apps
- [ ] [`app/privacy/page.tsx`](../../../app/privacy/page.tsx): third-party services list (Slack, Jira, Atlassian terms)
- [ ] [`app/app-directory/page.tsx`](../../../app/app-directory/page.tsx): metadata or redirect
- [ ] [`DashboardDesktopShell.tsx`](../../../components/dashboard/view-shells/DashboardDesktopShell.tsx): mockup alt text
- [ ] Regenerate connected-apps marketing screenshot if used in dashboard

### Phase 6 (legacy cleanup)

- [ ] [`AppDirectoryWindow.tsx`](../../../components/AppDirectoryWindow.tsx): delete with Hero
- [ ] [`DocsWindow.tsx`](../../../components/DocsWindow.tsx): integration list or delete
- [ ] Redirect `/app-directory` → `/connected-apps` ([P1-T19](./P1-T19-deprecation-reuse.md))

---

## Shared constant (Phase 2+)

Use one array everywhere new code is written:

```ts
// lib/marketing-integrations.ts — from P1-T10
export const MARKETING_INTEGRATIONS = [ /* 7 apps */ ] as const;
```

Import in:

- `IntegrationsSection.tsx` (homepage)
- `ProductTheaterConnect.tsx`
- Phase 5 `/connected-apps` refactor

Do not duplicate app lists in new components.

---

## Acceptance criteria checklist

- [x] Side-by-side: website surfaces vs product 7-app list
- [x] Gap list: website/marketing UI behind product (Slack + Jira called out)
- [x] Phase 5/6 follow-up checklist documented
- [x] 7-app list validated against product source of truth (documented; `appsStore.ts` diff when repo available)
- [x] Display name normalization table included

---

## Stakeholder sign-off

| Role | Name | Decision | Date |
|------|------|----------|------|
| Product / founder | Rohit | 7-app product list confirmed; website alignment deferred to Phase 5/6 | 2026-07-03 |

**P1-T20 status:** Done. Slack/Jira assets: [P1-T21](./P1-T21-slack-jira-assets.md).

---

## Downstream handoff

| Consumer | Uses from this doc |
|----------|-------------------|
| P1-T21 | Slack/Jira icon export paths |
| Phase 4 Connect theater | 7-app fixture + StaticConnectedApps refactor scope |
| Phase 5/6 | Follow-up checklist |
| P1-T10 | Replace inline audit pointer with this doc |
