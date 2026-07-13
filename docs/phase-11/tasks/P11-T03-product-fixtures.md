# P11-T03: Product Fixtures + Privacy-Safe Demo Data

**Task ID:** P11-T03  
**Status:** done  
**Type:** Fixtures / data module  
**Completed:** 2026-07-10  
**Parent:** [phase-11-tasks.md](../../phase-11-tasks.md) | [phase-11-product-overview.md](../../phase-11-product-overview.md)  
**Depends on:** [P11-T01](./P11-T01-product-inventory.md), informed by [P11-T02](./P11-T02-overview-beat-sheet.md)  
**Blocks:** P11-T05 (with P11-T02 + P11-T04); informs P11-T06–T09, P11-T12  
**Blocker:** Yes

---

## Goal

Ship deterministic, privacy-safe fixtures for all four product-overview scenes so UI work can render complete static and reduced-motion states without product imports, network, or storage.

---

## Output

[`lib/marketing-product-overview-data.ts`](../../../lib/marketing-product-overview-data.ts)

---

## Fixture groups

| Group | Export | Source |
|-------|--------|--------|
| Section chrome | `PRODUCT_OVERVIEW_SECTION` | P11-T02 locked copy |
| Captions / nav | `PRODUCT_OVERVIEW_SCENE_CAPTIONS`, `PRODUCT_OVERVIEW_NAV` | P11-T02 |
| Attention Board | `ATTENTION_BOARD_FIXTURES_ACME` | New; Acme / Dana / 2pm / PROD-142 continuity |
| Inbox + calendar | `INBOX_CALENDAR_SCENE_FIXTURES_ACME` | Reuses `INBOX_FIXTURES_ACME`, `CALENDAR_FIXTURES_ACME`; adds folders + focused email |
| Narrative + apps | `NARRATIVE_APPS_SCENE_FIXTURES_ACME` | New narrative; reuses `CONNECTED_APP_FIXTURES_ACME` |
| Companions | `COMPANIONS_SCENE_FIXTURES_ACME` | Reuses Sensor calc + Mascot attachment + Sherpa still |
| Bundle | `PRODUCT_OVERVIEW_FIXTURES` | Complete static / reduced-motion package |

---

## Privacy + safety

- Synthetic Acme / Alex persona only
- No customer names, tokens, emails beyond `alex@acme.co` demo address
- No `fetch`, `localStorage`, cookies, or browser APIs
- No Tauri, Lottie URLs loaded, or `mindmesh_app` imports
- Mascot uses local still path (`/images/mascot-skins/sherpa.png`)

---

## Reduced-motion completeness

`PRODUCT_OVERVIEW_FIXTURES.scenes[1|2|3|4]` each include a full final visual dataset. Pinning progress to `PRODUCT_OVERVIEW_REDUCED_MOTION_PROGRESS` (`0.9`) can render Scene 4 companions while nav/captions still describe all four scenes.

Helpers:

- `getProductOverviewSceneFixtures(scene)`
- `getProductOverviewCaption(scene)`

---

## Acceptance checklist

- [x] Data is synthetic and contains no customer or developer secrets
- [x] Fixtures use readonly types and stable IDs
- [x] No network or browser storage dependency
- [x] Scene copy can be traced to product behavior (P11-T01 / P11-T02)
- [x] Fixtures can render a complete static reduced-motion state

---

## Unblocks

- **P11-T05** - shell can import the bundle
- **P11-T06–T09** - scenes consume typed fixtures
- **P11-T12** - reduced-motion finals use the same data
