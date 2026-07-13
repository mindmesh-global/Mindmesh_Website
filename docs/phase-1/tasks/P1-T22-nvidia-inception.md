# P1-T22: NVIDIA Inception Badge and Copy (Section 9)

**Task ID:** P1-T22  
**Status:** done  
**Type:** Asset + documentation (Phase 2 wires in `TrustSection.tsx`)  
**Completed:** 2026-07-03  
**Parent:** [phase-1-tasks.md](../phase-1-tasks.md) | [P1-T11-social-proof.md](./P1-T11-social-proof.md)  
**Depends on:** [P1-T11-social-proof.md](./P1-T11-social-proof.md)  
**Blocks:** Phase 2 `TrustSection.tsx` (badge no longer text-only fallback)

---

## Quick reference

| Field | Value |
|-------|-------|
| **Primary badge** | [`public/images/badges/nvidia-inception.svg`](../../../public/images/badges/nvidia-inception.svg) |
| **Alternate badge** | [`public/images/badges/nvidia-inception-mono-black.svg`](../../../public/images/badges/nvidia-inception-mono-black.svg) (light bg only) |
| **Member line** | MindMesh is a member of the NVIDIA Inception Program. |
| **Disclaimer** | NVIDIA Inception membership does not constitute an endorsement by NVIDIA Corporation of MindMesh or its products. |
| **Link target** | https://www.nvidia.com/en-us/startups/ |
| **Section** | `#trust` ([P1-T11](./P1-T11-social-proof.md)) |

---

## Asset inventory

Sourced from NVIDIA Inception member portal download (`Inception Badges/for-screen/`), copied into the website repo 2026-07-03.

| File | Source (Downloads) | Use on website |
|------|-------------------|----------------|
| **`nvidia-inception.svg`** | `nvidia-inception-program-badge-rgb-for-screen.svg` | **Primary** — Section 9 `#trust` on dark marketing bg |
| **`nvidia-inception-mono-black.svg`** | `nvidia-inception-program-badge-rgb-1c-blk-for-screen.svg` | Light surfaces only (e.g. PDF, light cards); **not** `#060e20` |

### Primary badge specs

| Property | Value |
|----------|-------|
| Format | SVG (`for-screen` RGB) |
| Native viewBox | `0 0 500.4288 216` |
| Aspect ratio | ~2.32 : 1 (wide horizontal badge) |
| Colors | NVIDIA green `#76b900`, white badge plate `#fff`, black wordmark |
| Recommended render height | 40–48px desktop, 32–40px mobile |
| At 48px height | width ≈ 111px (auto from aspect ratio) |
| Alt text | `NVIDIA Inception Program member` |

**Dark background note:** The official RGB `for-screen` SVG includes a white rectangular plate behind the logo and "Inception Program" wordmark. On `--mm-bg` `#060e20`, this reads as an intentional badge tile (white card on dark section). Do not recolor or remove the white plate.

**Do not use** `nvidia-inception-mono-black.svg` on `#trust`; black mono badge fails contrast on dark navy.

---

## Approved copy (locked with P1-T11)

| Element | Copy |
|---------|------|
| **Member line (homepage)** | MindMesh is a member of the NVIDIA Inception Program. |
| **Short label (optional, a11y adjacent)** | NVIDIA Inception Program member |
| **Disclaimer (required, fine print below block)** | NVIDIA Inception membership does not constitute an endorsement by NVIDIA Corporation of MindMesh or its products. |
| **First body mention (if expanded copy)** | NVIDIA Inception Program® (trademark on first use only) |

### Prohibited phrasing

Do not use: "NVIDIA-backed", "Powered by NVIDIA", "NVIDIA certified", "Official NVIDIA partner", or any wording implying NVIDIA endorses MindMesh products.

---

## Link target

| Field | Value |
|-------|-------|
| **URL** | https://www.nvidia.com/en-us/startups/ |
| **Apply to** | Optional wrap on badge image and/or member line text |
| **Attributes** | `target="_blank"`, `rel="noopener noreferrer"` |
| **Link text (if not wrapping image)** | NVIDIA Inception Program |

---

## Brand compliance

Per [P1-T11](./P1-T11-social-proof.md) and NVIDIA program guidelines:

| Rule | Implementation |
|------|----------------|
| Use official portal assets only | ✅ SVG copied unmodified from member download |
| No modification | Do not recolor, crop logo, add effects, or stretch |
| No false endorsement | Disclaimer required under NVIDIA block |
| Clear space | Preserve minimum clear space around badge (height of lowercase "n" in NVIDIA wordmark) |
| One badge per section | Single Inception badge in `#trust` only |
| Trademarks | "NVIDIA" and "NVIDIA Inception" are trademarks of NVIDIA Corporation |

**Source folder on disk (authoritative backup):**  
`/Users/rohittripathi/Downloads/Inception Badges/for-screen/`

---

## Fallback (if badge fails to load)

P1-T11 text-only fallback remains valid for edge cases (CDN error, ad blocker):

```tsx
<p className="nvidia-trust-line">
  MindMesh is a member of the NVIDIA Inception Program.
</p>
<p className="nvidia-disclaimer">…</p>
```

With assets in repo, Phase 2 default is **badge + copy**, not text-only.

---

## Phase 2 implementation

### Data shape (update P1-T11)

```ts
// lib/marketing-trust-content.ts — nvidia block
nvidia: {
  memberLine: 'MindMesh is a member of the NVIDIA Inception Program.',
  badgeSrc: '/images/badges/nvidia-inception.svg',
  badgeAlt: 'NVIDIA Inception Program member',
  programUrl: 'https://www.nvidia.com/en-us/startups/',
  disclaimer:
    'NVIDIA Inception membership does not constitute an endorsement by NVIDIA Corporation of MindMesh or its products.',
},
```

### TrustSection snippet

```tsx
<div className="nvidia-block">
  <a
    href="https://www.nvidia.com/en-us/startups/"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block"
  >
    <Image
      src="/images/badges/nvidia-inception.svg"
      alt="NVIDIA Inception Program member"
      width={111}
      height={48}
      className="h-10 w-auto md:h-12"
    />
  </a>
  <p className="mt-4 text-base text-mm-on-background">{TRUST_SECTION.nvidia.memberLine}</p>
  <p className="mt-2 max-w-xl text-sm text-mm-on-surface-variant">
    {TRUST_SECTION.nvidia.disclaimer}
  </p>
</div>
```

Use `next/image` or inline `<img>`; SVG is small (~13KB). No PNG export required unless OG/social needs raster later.

---

## Visual check on `#060e20`

| Check | Pass criteria |
|-------|---------------|
| Badge legibility | Green eye mark and wordmark clear at 40px height |
| White plate | Acceptable contrast against `#060e20` section bg |
| Disclaimer | Readable at 13–14px muted text |
| Mobile | Badge centered; min height 32px |

---

## Acceptance criteria checklist

- [x] Official NVIDIA Inception badge asset in repo (`public/images/badges/nvidia-inception.svg`)
- [x] Approved one-line copy documented (matches P1-T11)
- [x] Link target: NVIDIA Inception program page
- [x] Copy and usage comply with brand requirements (disclaimer, prohibited phrases)
- [x] Text-only fallback documented (P1-T11); badge now primary

---

## Stakeholder sign-off

| Role | Name | Decision | Date |
|------|------|----------|------|
| Product / founder | Rohit | Approved RGB for-screen badge on `#trust`; assets copied to repo | 2026-07-03 |

**P1-T22 status:** Done. Phase 2 `TrustSection.tsx` can render the NVIDIA block with badge.

---

## Downstream handoff

| Consumer | Uses from this doc |
|----------|-------------------|
| Phase 2 `TrustSection.tsx` | `badgeSrc`, copy, disclaimer, link |
| [P1-T11](./P1-T11-social-proof.md) | Update `badgeSrc` from planned PNG to shipped SVG |
| P1-T24 sign-off | NVIDIA assets no longer blocked |
