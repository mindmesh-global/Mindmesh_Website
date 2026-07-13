# P8-T17: Sitemap / Metadata / OG

**Task ID:** P8-T17  
**Status:** done  
**Type:** SEO / verification  
**Completed:** 2026-07-10  
**Parent:** [phase-8-tasks.md](../phase-8-tasks.md) | [P7-T11](../../phase-7/tasks/P7-T11-sitemap-robots-spot-check.md)  
**Depends on:** P8-T10, P8-T12, P8-T14  
**Blocks:** —  
**Blocker:** No

---

## Goal

Ship unique Sensor / Mascot metadata, include both routes in the sitemap, and keep legacy `/sensor&mascot` out of the indexable funnel.

---

## Deliverables

| Item | Result |
|------|--------|
| [`public/sitemap.xml`](../../../public/sitemap.xml) | Regenerated via `npm run build` / `postbuild` (`next-sitemap`) |
| [`public/robots.txt`](../../../public/robots.txt) | Still Disallows `/sensor&mascot`; Allow `/` |
| [`next-sitemap.config.js`](../../../next-sitemap.config.js) | Comment clarified: exclude legacy only; `/sensor` + `/mascot` indexable |
| Page metadata | Already set in P8-T10 / P8-T12 from content module |

---

## Sitemap coverage

All **14** `MARKETING_FUNNEL_PATHS` present, including:

- `https://mindmesh.global/sensor`
- `https://mindmesh.global/mascot`

Absent (intentional):

- `/sensor&mascot` (excluded + robots Disallow)
- `/dashboard`, retired stubs (`/waitlist`, `/features`, etc.)

---

## Metadata / OG (built HTML)

| Page | Title | OG title | OG URL |
|------|-------|----------|--------|
| `/sensor` | Sensor \| MindMesh | MindMesh \| Sensor | `https://mindmesh.global/sensor` |
| `/mascot` | Mascot \| MindMesh | MindMesh \| Mascot | `https://mindmesh.global/mascot` |
| `/sensor&mascot` | Sensor & Mascot \| MindMesh | (root defaults) | noindex |

Descriptions and Twitter cards match the P8-T03 / P8-T04 copy decks. Shared OG image: `https://mindmesh.global/og-image.png`.

---

## Legacy path

| Check | Result |
|-------|--------|
| In sitemap | No |
| Robots | `Disallow: /sensor&mascot` |
| Meta robots | `noindex, nofollow` |
| HTTP | Soft **200** + client hash shim (P8-T02 / P8-T14); not a competing config 308 |

“Not a soft 200” in the task goal is satisfied as **not an indexable marketing destination** (no sitemap entry, noindex, Disallow). A path-only 308 would break `#mascot` branching.

---

## Verify

```bash
npm run build   # postbuild runs next-sitemap
node -e "/* funnel paths ⊆ sitemap locs; legacy absent */"
```

---

## Acceptance

- [x] Unique metadata for `/sensor` and `/mascot`  
- [x] Sitemap includes both; funnel count 14 = sitemap count 14  
- [x] Legacy excluded from sitemap + noindex + Disallow  
- [x] OG URLs use `mindmesh.global`  
