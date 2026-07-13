# P5-T11: Cross-link + Nav Consistency

**Task ID:** P5-T11  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-09  
**Parent:** [phase-5-tasks.md](../phase-5-tasks.md) | [phase-5-depth-pages.md](../phase-5-depth-pages.md)  
**Depends on:** [P5-T02](./P5-T02-marketing-depth-layout.md), P5-T03–T08  
**Blocks:** P5-T15

---

## Goal

Single source of truth for marketing nav, footer, and depth-page pillar links so homepage and funnel depth pages stay consistent.

---

## Deliverables

| File | Change |
|------|--------|
| [`lib/marketing-routes.ts`](../../../lib/marketing-routes.ts) | `MARKETING_SECTION_HASHES`, `MARKETING_NAV_LINKS`, `MARKETING_PRIMARY_CTA`, `MARKETING_FOOTER_LINKS`, `MARKETING_DEPTH_BACK_LINKS`, `MARKETING_CTA_HREF`, `homepageSectionHref` |
| [`MarketingNav.tsx`](../../../components/marketing/MarketingNav.tsx) | Consumes shared nav + CTA config |
| [`MarketingFooter.tsx`](../../../components/marketing/MarketingFooter.tsx) | Consumes `MARKETING_FOOTER_LINKS` |
| Depth pages (6) | `backHref` / `backLabel` + waitlist CTA from shared config |
| [`scripts/verify-marketing-routes.mjs`](../../../scripts/verify-marketing-routes.mjs) | Asserts nav/footer/depth exports |

---

## Shared config

| Export | Role |
|--------|------|
| `MARKETING_NAV_LINKS` | Product → `#connect`, Features → `#features`, Security → `#trust` |
| `MARKETING_PRIMARY_CTA` | Join waitlist → `#cta` |
| `MARKETING_FOOTER_LINKS` | Security, Privacy, Terms, Contact (same on `/` and depth) |
| `MARKETING_DEPTH_BACK_LINKS` | Per-route pillar back link |
| `MARKETING_CTA_HREF` | `/#cta` for depth page CTAs |
| `homepageSectionHref` | `#section` on homepage, `/#section` on depth |

### Depth back map

| Route | Back href | Label |
|-------|-----------|-------|
| `/connected-apps` | `/#connect` | See Connect theater → |
| `/inbox` | `/#focus` | See Focus theater → |
| `/yesterdays-narrative` | `/#focus` | See Focus theater → |
| `/upcoming-events` | `/#execute` | See Execute theater → |
| `/security` | `/#trust` | See Trust section → |
| `/trust` | `/#trust` | Back to Trust section → |

---

## Acceptance criteria

- [x] Shared nav link config in `lib/marketing-routes.ts`
- [x] Depth `MarketingNav` links resolve to `/#connect`, `/#features`, `/#trust`, `/#cta`
- [x] Feature pages use contextual pillar back links from shared map
- [x] Footer link set identical on homepage and depth (via shared constant)
- [x] Verify script covers nav/footer/depth exports
- [x] HTTP 200 on depth sample routes with expected anchors

---

## Verification

```text
node scripts/verify-marketing-routes.mjs → ok
200 /inbox, /connected-apps
/#connect /#features /#trust /#cta present in depth nav HTML
See Focus theater / See Connect theater present
Footer: /security /privacy /terms /contact
```

---

## Next steps

- **P5-T12:** Manrope font consolidation
