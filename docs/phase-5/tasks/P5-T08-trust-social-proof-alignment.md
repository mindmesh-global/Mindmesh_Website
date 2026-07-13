# P5-T08: `/trust` Social Proof Alignment

**Task ID:** P5-T08  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-09  
**Parent:** [phase-5-tasks.md](../phase-5-tasks.md) | [phase-5-depth-pages.md](../phase-5-depth-pages.md)  
**Depends on:** [P5-T02](./P5-T02-marketing-depth-layout.md), [P1-T11](../../phase-1/tasks/P1-T11-social-proof.md), [P1-T22](../../phase-1/tasks/P1-T22-nvidia-inception.md)  
**Blocks:** P5-T15

---

## Goal

Migrate `/trust` onto `MarketingDepthLayout`, match homepage NVIDIA Inception badge treatment, and update the integrations FAQ answer to all 7 apps via `MARKETING_INTEGRATIONS`.

---

## Deliverables

| File | Change |
|------|--------|
| [`app/trust/page.tsx`](../../../app/trust/page.tsx) | Full rewrite: depth layout, trust content, NVIDIA block, 7-app FAQ |
| `app/trust/trust.module.css` | **Deleted** |

---

## Before → after

| Item | Before | After |
|------|--------|-------|
| Shell | `SiteNav` + local CSS | `MarketingDepthLayout` |
| Font | Per-page `Manrope` | Root `font-display` / `font-body` |
| Hero | "Privacy First" + long sanctuary copy | Homepage trust eyebrow / headline / subhead |
| NVIDIA | Absent | Same badge + member line + disclaimer as `TrustSection` |
| Integrations FAQ | Gmail, GCal, Outlook, SMTP only | All 7 apps from `MARKETING_INTEGRATIONS` |
| Legacy chrome | Sensor / Mascot / Lucide FAQ UI | Removed |
| Theme | CSS module hex | `mm-*` utilities |
| CTA | None | Join waitlist → `/#cta` |

---

## Page structure

1. **Depth hero:** Trust · "Built on trust you can verify." · homepage subhead · `/#trust`  
2. **NVIDIA + security line:** badge, member line, disclaimer, trust line, `/security`  
3. **FAQ cards:** product, storage, training, permissions, 7 apps, work-life balance  
4. **Legal depth:** `/security` + `/privacy`  
5. **CTA:** waitlist line + Join waitlist → `/#cta`

Removed: Sensor/Mascot "core mechanics", Lucide icon chrome, incomplete 4-app list, CSS module.

---

## Acceptance criteria

- [x] Wrapped in `MarketingDepthLayout` (no `SiteNav`)
- [x] Hero matches `marketingTrustContent` headline / subhead
- [x] NVIDIA badge treatment matches homepage (`badgeSrc`, member line, disclaimer, link)
- [x] "Which apps" FAQ lists all 7 integrations
- [x] No Sensor / Mascot marketing chrome
- [x] No per-page Manrope import
- [x] Local CSS module removed
- [x] Cross-links to `/security`, `/connected-apps`, `/privacy`, `/#cta`
- [x] HTTP 200 on `/trust`

---

## Verification

```text
200 /trust
"Built on trust you can verify.", NVIDIA Inception, Slack, Jira, MarketingNav present
SiteNav / Manrope / Sensor / Mascot absent from HTML
```

---

## Next steps

- **P5-T09:** FAQ integration copy (7 apps) on `/faq` (non-blocker)
- **P5-T11:** Cross-link + nav consistency (recommended blocker path)
