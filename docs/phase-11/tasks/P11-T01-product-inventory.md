# P11-T01: Product Surface Inventory + Source-of-Truth Map

**Task ID:** P11-T01  
**Status:** done  
**Type:** Inventory / documentation  
**Completed:** 2026-07-10  
**Parent:** [phase-11-tasks.md](../../phase-11-tasks.md) | [phase-11-product-overview.md](../../phase-11-product-overview.md)  
**Depends on:** [P10-T10](../../phase-10/tasks/P10-T10-sign-off.md)  
**Blocks:** P11-T02, P11-T03, P11-T04  
**Blocker:** Yes

---

## Goal

Map every Phase 11 homepage product-overview surface to the current `mindmesh_app` desktop product, mark non-importable dependencies, identify safe marketing reuse, and list stale homepage claims for P11-T13.

No UI in this task. Implementation starts from this map, not from screenshots.

---

## Verdict

| Finding | Detail |
|---------|--------|
| Default workspace | **Attention Board** (`DEFAULT_DASHBOARD_TAB = 'attention'`) |
| Product import for homepage | **Forbidden** for all eight surfaces (auth, live APIs, Tauri, and/or Lottie/Qdrant) |
| Strongest reuse | `ProductFrame`, Static* marketing variants, Sensor/Mascot panels, `marketing-demo-data`, `marketing-integrations`, mascot stills |
| Largest gap | **Attention Board** has no marketing counterpart; `MarketingPriorityCard` is single-priority only |
| Narrative gap | `StaticDailyNarrativeCard` exists but has no marketing variant and is not fixture-driven |
| Shell gap | No website sidebar chrome that mirrors `DashboardSidebar` |
| P11-T13 candidates | Hero/How-it-works "one thing" copy; Execute auto-write framing; JSON-LD `operatingSystem: 'Web'` |

---

## Product source of truth

**Repo:** `/Users/rohittripathi/Desktop/mindmesh_app`  
**Desktop app:** `apps/desktop/`

Authenticated users land on `/dashboard`. With no `?tab=`, the resolved tab is **Attention**.

```text
DashboardTab = 'attention' | 'upcoming-events' | 'inbox' | 'narrative' | 'apps'
DEFAULT_DASHBOARD_TAB = 'attention'
```

Source: `apps/desktop/app/dashboard/dashboardTabs.ts`

---

## Scene map (Phase 11)

| Scene | Product truth | Website reuse today | Build in Phase 11 |
|-------|---------------|---------------------|-------------------|
| 1 Attention Board | `AttentionView` + `AttentionBoard` + cards + quiet rows + overlap | None dedicated | New Attention scene + fixtures |
| 2 Email + Upcoming Events | Sidebar folders + `CentralInbox` + `CalendarEvents` | `StaticInboxList` (marketing), `StaticCalendarEvents` (marketing) | New scene chrome; reuse Static* rows |
| 3 Yesterday Narrative + Connected Apps | `DailyNarrativeCard` + `AppsManagementSection` | `StaticConnectedApps` (marketing); narrative dashboard-only | Marketing narrative panel + reuse connected apps |
| 4 Sensor + Mascot | Separate Tauri windows; Sensor bar + Mascot chat | Phase 8/10 panels, demos, local stills | Compact companion scene; no live Lottie |

---

## 1. Attention Board

### Authoritative product paths

| Role | Path under `mindmesh_app/apps/desktop/` |
|------|----------------------------------------|
| Tab container | `app/dashboard/AttentionView.tsx` |
| Board layout | `app/dashboard/components/attention/AttentionBoard.tsx` |
| Public exports | `app/dashboard/components/attention/index.ts` |
| Sections | `app/dashboard/components/attention/AttentionSection.tsx` |
| Action cards | `app/dashboard/components/attention/ActionCard.tsx` |
| Calendar anchors | `app/dashboard/components/attention/AnchorCard.tsx` |
| Quiet rows | `app/dashboard/components/attention/QuietRow.tsx` |
| Why-now helpers | `app/dashboard/components/attention/cardUtils.ts` |
| Overlap banner | `app/dashboard/components/attention/EventOverlapAlert.tsx` |
| Store | `state/attentionBoardStore.ts` |
| Engine types | `packages/attention-engine/src/types/view.ts` (via `lib/attention/types.ts`) |
| Live stream | `hooks/useAttentionBoardStream.ts` |

### Product UI truth

Three ranked sections in one board:

1. **Now** - urgent action cards with source badges and `whyNow`
2. **Later Today** - same card model, lower weight
3. **Quietly Handled** - grouped summary rows

Optional **Events Overlap Alert** when calendar clashes exist. Header copy: "Here's what needs your attention."

### Fixture shape to mirror (P11-T03)

```typescript
{
  now: AttentionCardFixture[];
  laterToday: AttentionCardFixture[];
  quietlyHandled: QuietRowFixture[];
  overlapAlert?: { title: string; detail: string };
}

// AttentionCardFixture (marketing-safe subset)
{
  id, title, summary?, sourceLabel, sourceApps?, whyNow, isAnchor?
}
```

### Non-importable

Auth JWT, `GET /api/attention/board`, SSE stream, attention-engine package, dossier/detail modal stores.

### Website reuse

| Asset | Notes |
|-------|-------|
| `MarketingPriorityCard` | Single priority only; useful visual reference, **not** the board |
| `StaticDailySummaryPanel` | Clash UI inspiration only; not Attention |
| Existing fixtures | No Attention Board fixtures yet |

**Decision:** Build a new fixture-driven Attention scene. Do not stretch Focus theater's one-card model into Scene 1.

---

## 2. Email inbox (All / Sent / Drafts)

### Authoritative product paths

| Role | Path under `mindmesh_app/apps/desktop/` |
|------|----------------------------------------|
| Inbox UI | `components/gmail/GmailThreadList.tsx` (`CentralInbox`, alias `GmailThreadList`) |
| Folder state | `state/gmailStore.ts` (`EmailFolderKey = 'inbox' \| 'all' \| 'sent' \| 'drafts'`) |
| Preview | `components/gmail/EmailPreview.tsx` |
| Focus panel | `app/dashboard/EmailFocusPanel.tsx` |
| Account filter | `components/gmail/UnifiedInboxFilter.tsx` |

### Product UI truth

Unified multi-provider inbox with sender, subject, snippet, date, unread, attachment indicator, account color dots. Sidebar folders: **Inbox, All, Sent, Drafts** with counts. Deep-link focus can open `EmailFocusPanel`.

### Non-importable

Auth, Gmail / Graph / SMTP APIs, Tauri OAuth/plugin paths, Qdrant focus fallback.

### Website reuse

| Asset | Path | Notes |
|-------|------|-------|
| Marketing inbox rows | `components/dashboard/StaticInboxList.tsx` | `variant="marketing"` |
| Inbox fixtures | `lib/marketing-demo-data.ts` → `INBOX_FIXTURES_ACME` | 3 messages; extend for folders if needed |
| Draft chrome | `MarketingDraftPanel.tsx` | Execute theater; optional detail panel |

**Gap:** No All / Sent / Drafts chrome on the website yet. Scene 2 needs decorative folder nav inside the overview frame.

---

## 3. Upcoming calendar events

### Authoritative product paths

| Role | Path under `mindmesh_app/apps/desktop/` |
|------|----------------------------------------|
| Events list | `components/calendar/CalendarEvents.tsx` |
| Store | `state/calendarStore.ts` |
| Focus panel | `app/dashboard/CalendarFocusPanel.tsx` |
| Overlap helpers | `app/dashboard/components/attention/useVisibleEventOverlaps.ts` |

### Product UI truth

Upcoming events as cards with time, title, location, account color, relative timing. Create/edit exists in product; marketing should keep events decorative unless showing an approval-aware prep state.

### Non-importable

Auth, Google Calendar / Outlook Graph, Tauri partial, Qdrant focus fallback.

### Website reuse

| Asset | Path | Notes |
|-------|------|-------|
| Marketing calendar | `components/dashboard/StaticCalendarEvents.tsx` | `variant="marketing"` |
| Calendar fixtures | `CALENDAR_FIXTURES_ACME` | Standup + client call |
| Prep block | `MarketingCalendarBlock.tsx` | Execute theater |

---

## 4. Desktop shell / navigation

### Authoritative product paths

| Role | Path under `mindmesh_app/apps/desktop/` |
|------|----------------------------------------|
| Page shell | `app/dashboard/DashboardPage.tsx` |
| Sidebar | `app/dashboard/DashboardSidebar.tsx` |
| Tabs | `app/dashboard/dashboardTabs.ts` |
| Title bar | `components/WindowTitleBar.tsx` |
| Root layout | `app/layout.tsx` |
| Auth guard | `components/auth/AuthGuard.tsx` |

### Product UI truth

Two-column shell: left sidebar (~200–240px) + main pane.

Sidebar order:

1. MindMesh logo
2. Attention board
3. Upcoming events
4. Email (Inbox / All / Sent / Drafts)
5. Yesterday narrative
6. Connected apps
7. Source visibility toggles
8. User avatar

Main window also has custom title-bar chrome (settings, notifications, window controls). Sensor and Mascot are **separate windows**, not dashboard tabs.

### Non-importable

`AuthGuard`, Tauri title-bar / tray / shortcuts, live sync island, reminder banner.

### Website reuse

| Asset | Path | Notes |
|-------|------|-------|
| Product frame | `components/marketing/theater/ProductFrame.tsx` | Caption + sticky chrome; thin optional rail only |
| Theater scroll kit | `TheaterScrollSection`, `useScrollSection`, `lib/marketing-theater-scroll.ts` | Pattern to extend; new overview id needed |

**Gap:** Overview needs a persistent MindMesh-like sidebar that can highlight the active scene. Do not import `DashboardSidebar`.

---

## 5. Yesterday narrative

### Authoritative product paths

| Role | Path under `mindmesh_app/apps/desktop/` |
|------|----------------------------------------|
| Card UI | `app/dashboard/DailyNarrativeCard.tsx` |
| Store | `lib/memory/narrative/narrativeStore.ts` |
| Types | `lib/memory/narrative/types.ts` |
| Fetch | `lib/api/brain.ts` (`fetchDailyNarrative`) |

### Product UI truth

Actionable yesterday recap with summary, expandable sections (highlights, decisions, blockers, open loops), evidence chips, stats, and date picker. Defaults to yesterday in the user timezone.

### Non-importable

Auth / plan gating, live narrative API, local file cache, backend Qdrant generation.

### Website reuse

| Asset | Path | Notes |
|-------|------|-------|
| Dashboard narrative | `components/dashboard/StaticDailyNarrativeCard.tsx` | No marketing variant; hardcoded copy |
| Demo data | none for narrative evidence/stats | **P11-T03 must add** |

**Decision:** Prefer a new marketing narrative panel over extending the dashboard-only card with hover context.

---

## 6. Connected apps

### Authoritative product paths

| Role | Path under `mindmesh_app/apps/desktop/` |
|------|----------------------------------------|
| Tab shell | `app/dashboard/AppsManagementSection.tsx` |
| Store | `state/appsStore.ts` (`SUPPORTED_APPS`) |

### Seven supported sources

Gmail, Google Calendar, Outlook Email, Outlook Calendar, SMTP Mailbox, Slack, Jira.

Matches website `lib/marketing-integrations.ts` / `CONNECTED_APP_FIXTURES_ACME`.

### Non-importable

OAuth connect/disconnect, Tauri callback server, calendar/folder selection modals, live sync status APIs.

### Website reuse

| Asset | Path | Notes |
|-------|------|-------|
| Marketing connected apps | `components/dashboard/StaticConnectedApps.tsx` | `variant="marketing"` |
| Integrations list | `lib/marketing-integrations.ts` | Canonical seven sources |
| Fixtures | `CONNECTED_APP_FIXTURES_ACME` | All connected |

**Product-truth note:** Slack and Jira are connected **sources**. Do not imply unsupported automatic writes from the overview.

---

## 7. Sensor command bar

### Authoritative product paths

| Role | Path under `mindmesh_app/apps/desktop/` |
|------|----------------------------------------|
| Sensor UI | `components/Sensor.tsx` |
| Route | `app/sensor/page.tsx` |
| Brain pipeline | `lib/memory/brain/brainPipeline.ts` |
| Tauri window | `src-tauri/src/main.rs` (`show_sensor_window`, `show_sensor_bar`) |

### Product UI truth

Floating command/query bar in a **separate Tauri window**. Intent classification, email/calendar/meeting previews, markdown answers, quick navigation, trivial calc evaluator. Not a dashboard tab.

### Non-importable

Tauri window APIs, auth, brain pipeline, Qdrant retrieval, live LLM compose.

### Website reuse

| Asset | Path | Notes |
|-------|------|-------|
| Sensor panel | `components/marketing/theater/marketing/MarketingSensorPanel.tsx` | Open Cal story |
| Calc panel | `MarketingSensorCalcPanel.tsx` | `15% of 240` → `36` |
| Fixtures | `lib/marketing-sensor-mascot-content.ts` | Locked Phase 8/10 fixtures |
| Depth sections | `ProductTheaterSensor*.tsx` on `/sensor` | Pattern only |

**Recommendation for Scene 4:** Prefer the calc result card for a compact overview beat; it reads clearly in a small frame.

---

## 8. Mascot chat / attachment search

### Authoritative product paths

| Role | Path under `mindmesh_app/apps/desktop/` |
|------|----------------------------------------|
| Route | `app/mascot/page.tsx` |
| Page shell | `components/chatbot/containers/MascotPageContainer.tsx` |
| Chat UI | `features/mascot/components/ChatInterface/ChatInterfaceContainer.tsx` |
| Composer + images | `components/chatbot/presenters/memoryChatComposer/MemoryChatComposer.tsx` |
| Lottie player | `components/chatbot/presenters/MascotLottiePlayer.tsx` |
| Store | `features/mascot/store/mascotStore.ts` |

### Product UI truth

Separate floating **mascot window**: collapsed Lottie bubble or expanded chat, thread sidebar, streaming replies, citations, image attachments / vision actions, dossier context.

There is **no** standalone email-attachment search module. "Attachment" in marketing Phase 10 means a chat/vision hit (for example Acme PDF), not a Gmail attachment browser.

### Non-importable

Tauri mascot window, live brain chat, Qdrant retrieval, **live Lottie** on the marketing funnel.

### Website reuse

| Asset | Path | Notes |
|-------|------|-------|
| Mascot panel | `MarketingMascotPanel.tsx` | Email-count reply story |
| Attachment panel | `MarketingMascotAttachmentPanel.tsx` | PDF hit story |
| Local stills | `public/images/mascot-skins/*.png` | Approach A; seven characters |
| Skin inventory | `MASCOT_ICON_SKINS` in `lib/marketing-sensor-mascot-content.ts` | |

**Decision:** Scene 4 uses local stills + existing marketing panels. Never load `lottie-react` / DotLottie on the homepage.

---

## Dependency matrix (non-importable)

| Surface | Auth | Tauri | Live API | Lottie | Qdrant | Homepage import? |
|---------|------|-------|----------|--------|--------|------------------|
| Attention Board | Yes | Optional | Yes | No | No | **No** |
| Email inbox | Yes | Partial | Yes | No | Focus fallback | **No** |
| Calendar | Yes | Partial | Yes | No | Focus fallback | **No** |
| Dashboard shell | Yes | Yes | Background | No | No | **No** |
| Narrative | Yes | Optional | Yes | No | Backend only | **No** |
| Connected apps | Yes | Yes | OAuth | No | No | **No** |
| Sensor | Yes | **Yes** | Yes | No | **Yes** | **No** |
| Mascot | Yes | **Yes** | Yes | **Yes** | **Yes** | **No** |

---

## Website reuse catalog

### Safe to reuse

| Asset | Path |
|-------|------|
| Product frame | `components/marketing/theater/ProductFrame.tsx` |
| Theater scroll section / context | `components/marketing/theater/TheaterScrollSection.tsx`, `TheaterScrollContext.tsx` |
| Scroll helpers | `hooks/useScrollSection.ts`, `lib/marketing-theater-scroll.ts` |
| Marketing section chrome | `components/marketing/MarketingSection.tsx` |
| Static inbox (marketing) | `components/dashboard/StaticInboxList.tsx` |
| Static calendar (marketing) | `components/dashboard/StaticCalendarEvents.tsx` |
| Static connected apps (marketing) | `components/dashboard/StaticConnectedApps.tsx` |
| Sensor / Mascot panels | `components/marketing/theater/marketing/Marketing{Sensor,SensorCalc,Mascot,MascotAttachment}Panel.tsx` |
| Demo fixtures | `lib/marketing-demo-data.ts` |
| Integrations | `lib/marketing-integrations.ts` |
| Sensor/Mascot content | `lib/marketing-sensor-mascot-content.ts` |
| Mascot stills | `public/images/mascot-skins/` |

### Do not reuse on homepage overview

| Asset | Reason |
|-------|--------|
| Any `mindmesh_app` module | Auth / Tauri / live APIs |
| `StaticWeatherCard` | Live geolocation + network |
| `DashboardDesktopShell` Lottie URLs | Live Lottie forbidden on marketing funnel |
| Dashboard `SectionHoverContext` | Legacy `/dashboard` demo only |
| Authenticated dashboard stores | Not present / not allowed |

### Must build new

```text
components/marketing/product-overview/
  ProductOverviewSection.tsx
  ProductOverviewFrame.tsx
  ProductOverviewContext.tsx
  ProductOverviewNav.tsx
  scenes/
    AttentionOverviewScene.tsx
    InboxCalendarOverviewScene.tsx
    NarrativeAppsOverviewScene.tsx
    CompanionsOverviewScene.tsx

lib/marketing-product-overview-data.ts   # P11-T03
```

Also needed:

- Attention Board fixture types and UI
- Marketing narrative panel (or scene-local narrative chrome)
- Persistent overview sidebar / scene nav
- New overview scroll id + compact 170–190vh runway (P11-T05)

---

## Homepage composition today

Source: `app/page.tsx`

```text
HeroSection
ProblemSection
HowItWorksSection
MarketingTheaterSections   → Connect, Focus, Execute
FeatureGridSection
IntegrationsSection
TrustSection
FinalCTASection
```

Phase 11 inserts **Product Overview** immediately after `HeroSection`. Sensor/Mascot remain depth pages (`/sensor`, `/mascot`) and also appear as Scene 4 in the overview.

---

## Stale / unsupported claims for P11-T13

Bounded homepage truth-alignment candidates. Do not treat this as a full-site rewrite.

### Attention is multi-item, not "one thing"

| Location | Claim | Issue |
|----------|-------|-------|
| `components/marketing/sections/HeroSection.tsx` | "finds the **one thing** that matters most right now" | Default product is a ranked Attention Board |
| `components/marketing/sections/HowItWorksSection.tsx` | "**single** most important thing" / "**one priority**" | Same |
| `components/marketing/sections/ProductTheaterFocus.tsx` | "become **one priority**" | Focus theater is a later story; overview Scene 1 must not contradict the board |
| `lib/marketing-demo-data.ts` Focus caption | "One priority for 2pm…" | Keep for Focus theater if reframed; do not use as overview truth |
| `app/page.tsx` JSON-LD | "finds what matters most right now" | Singular implication |

### Email / calendar / Jira writes need approval-aware framing

| Location | Claim | Issue |
|----------|-------|-------|
| `HowItWorksSection.tsx` Step 03 | "Draft the reply, block the time, update the task" | No approval language |
| `ProductTheaterExecute.tsx` | "draft, schedule, and update tasks **without switching apps**" | Overstates automatic execution |
| Execute fixtures / success chips | "Reply drafted / Prep blocked / **PROD-142 done**" | Risks implying automatic Jira writes |
| `HeroSection.tsx` | "gets it done **for you**" | Overstates autonomy |

### Desktop-first vs Web

| Location | Claim | Issue |
|----------|-------|-------|
| `app/page.tsx` JSON-LD | `operatingSystem: 'Web'` | Product is desktop-first; FAQ already says desktop-native |

### Keep as accurate

- `IntegrationsSection`: MindMesh **reads** sources
- `FeatureGridSection`: readable source layer
- Sensor/Mascot relationship line in `lib/marketing-sensor-mascot-content.ts`
- Slack/Jira as signal sources in Focus theater chips (read-only)

---

## Fixture gaps for P11-T03

| Fixture group | Status |
|---------------|--------|
| Attention Now / Later / Quiet + why-now | **Missing** |
| Calendar overlap alert | **Missing** |
| Inbox folders (All / Sent / Drafts) | Partial (inbox rows only) |
| Focused email detail | Partial (`DRAFT_FIXTURE_ACME` / inbox rows) |
| Calendar events | Present (`CALENDAR_FIXTURES_ACME`) |
| Yesterday narrative + evidence/stats | **Missing** |
| Connected apps (7) | Present |
| Sensor query/result | Present (reuse calc or Open Cal) |
| Mascot prompt/response/attachment | Present |
| Approval-aware action states | **Missing** |

---

## Acceptance checklist

- [x] Every proposed scene points to current product source files
- [x] Product-only dependencies are marked as non-importable
- [x] Reusable marketing components and fixtures are identified
- [x] Unsupported or stale homepage claims are listed for P11-T13
- [x] No implementation begins from screenshots alone

---

## Unblocks

- **P11-T02** - narrative + beat sheet from this scene map
- **P11-T03** - fixtures from the shapes and gaps above
- **P11-T04** - app-frame spec from shell / sidebar truth
