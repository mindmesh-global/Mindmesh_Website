# P8-T02: Legacy `/sensor&mascot` Redirect / Hub Plan

**Task ID:** P8-T02  
**Status:** done  
**Type:** Decision (documentation; implement in P8-T14)  
**Completed:** 2026-07-10  
**Parent:** [phase-8-tasks.md](../phase-8-tasks.md) | [phase-8-sensor-mascot.md](../phase-8-sensor-mascot.md)  
**Depends on:** [P8-T01](./P8-T01-ia-decision.md)  
**Blocks:** P8-T14  
**Blocker:** Yes

---

## Verdict

| Decision | Choice |
|----------|--------|
| Primary option | **A** (default land on Sensor), not B or C |
| Bare `/sensor&mascot` | → `/sensor` |
| `/sensor&mascot#sensor` | → `/sensor` |
| `/sensor&mascot#mascot` | → `/mascot` |
| Permanent thin hub page | **No** |
| Mechanism | **Client redirect shim** at the legacy route (not `next.config` alone) |
| Overlay allowlist | Drop `/sensor&mascot` from `MINDMESH_OVERLAY_ROUTES` in P8-T14 |

---

## Options considered

| Option | Behavior | Pros | Cons |
|--------|----------|------|------|
| **A. Default → `/sensor`** | Bare URL and `#sensor` go to Sensor; `#mascot` goes to Mascot | Matches phase-8 default; Sensor is the “interface” entry | Needs hash-aware routing for Mascot bookmarks |
| B. Default → `/mascot` | Inverse of A | Favors companion story | Weaker fit for “command bar first” product order |
| C. Thin hub | Keep a chooser page with two CTAs | Soft landing | Extra URL; delays split IA from P8-T01 |

**Chosen: A**, with hash rules above. Hub (C) only if analytics later show split URLs confuse users ([phase-8-sensor-mascot.md](../phase-8-sensor-mascot.md) “After Phase 8”).

---

## Why not `next.config.js` alone

HTTP clients **do not send** the URL fragment to the server. Middleware and `redirects()` only see `/sensor&mascot`.

A permanent config redirect to `/sensor` would:

1. Lose the ability to branch on `#mascot` at the edge
2. Risk dropping or mis-applying fragments across browsers

Phase 6 used middleware for `/features` → `/#features` because the **destination** hash is fixed in code, not because the server read an incoming hash. That pattern does **not** map `#mascot` → `/mascot`.

---

## Implementation plan (P8-T14)

### 1. Client redirect shim

Replace the current marketing/CSS-module page with a minimal client page (or tiny client child) at `app/sensor&mascot/`:

```text
on mount:
  hash = window.location.hash (normalized, lowercase)
  if hash === '#mascot' → router.replace('/mascot')
  else → router.replace('/sensor')   // includes '#sensor', empty, unknown
```

Also render a no-JS fallback:

- Short “This page has moved” copy
- Links: Sensor → `/sensor`, Mascot → `/mascot`

Keep `robots: { index: false, follow: false }` (already set in P7-T11). Do **not** put the legacy path back in the sitemap.

### 2. Do **not** add a competing `next.config` 308 for this path

A config 308 would skip the shim and break hash branching. Prefer the shim until internal links are updated; optional later: after link cleanup, add a config 308 for bare path only if the shim is deleted (out of scope unless P8-T14 chooses it).

### 3. Middleware matcher

No middleware entry required for hash branching. Optional: leave middleware focused on Hero hash destinations (`/features`, `/waitlist`).

### 4. Overlay allowlist

In [`lib/mindmesh-legacy-routes.ts`](../../../lib/mindmesh-legacy-routes.ts):

| Before | After (P8-T14) |
|--------|----------------|
| `MINDMESH_OVERLAY_ROUTES = ['/dashboard', '/sensor&mascot']` | `['/dashboard']` only |

`/sensor` and `/mascot` stay on the marketing funnel (P8-T08): slim shell, **no** live overlays.

### 5. Internal link grep (P8-T14)

Update known callers to the new URLs (no legacy path in product chrome):

| Current | Target |
|---------|--------|
| `/sensor&mascot#sensor` | `/sensor` |
| `/sensor&mascot#mascot` | `/mascot` |
| `/sensor&mascot` | `/sensor` (or context-specific) |

Known files today:

- `components/layout/SiteFooter.tsx`
- `components/dashboard/view-shells/DashboardDesktopShell.tsx`

Also update `next.config.js` comment that says `/sensor&mascot` is intentionally not redirected.

### 6. Delete legacy chrome

After the shim ships:

- Remove `sensor&mascot.module.css` and remote-image hero content
- Remove legacy page body (prompts, chat mock) from this route; content lives on `/sensor` and `/mascot`

---

## Redirect matrix (locked)

| Request (browser) | Server sees | Final URL |
|-------------------|-------------|-----------|
| `/sensor&mascot` | `/sensor&mascot` | `/sensor` |
| `/sensor&mascot#sensor` | `/sensor&mascot` | `/sensor` |
| `/sensor&mascot#mascot` | `/sensor&mascot` | `/mascot` |
| `/sensor&mascot#other` | `/sensor&mascot` | `/sensor` (default) |

Status: client `replace` (same-tab). Prefer **308** only if a later path-only edge redirect is added without breaking the matrix; default P8-T14 ship is client replace + noindex.

---

## Acceptance (this task)

- [x] Option **A** chosen (not B or C as primary)
- [x] Hash rules documented (`#mascot` → `/mascot`; else → `/sensor`)
- [x] Mechanism: client shim (middleware/config limitation explained)
- [x] Overlay allowlist + link-update plan for P8-T14
- [x] No permanent hub page

---

## Out of scope here

- Implementing the shim (P8-T14)
- Building `/sensor` / `/mascot` pages (P8-T10 / P8-T12)
- Sitemap regen for new routes (P8-T17)
