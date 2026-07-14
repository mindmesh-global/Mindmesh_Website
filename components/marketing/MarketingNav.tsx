'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import {
  MARKETING_HOMEPAGE_PATH,
  MARKETING_NAV_LINKS,
  MARKETING_PRIMARY_CTA,
  MARKETING_SECTION_HASHES,
  homepageSectionHref,
  isMarketingHomepage,
} from '@/lib/marketing-routes';

const linkClassName =
  'text-sm font-medium text-mm-on-surface-variant transition-colors hover:text-mm-on-background';

const primaryButtonClassName =
  'rounded-md bg-mm-primary-fixed px-4 py-2 text-sm font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim';

const mobilePrimaryButtonClassName =
  'rounded-md bg-mm-primary-fixed px-3 py-1.5 text-sm font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim';

function handleHomepageAnchorClick(
  href: string,
  onNavigate?: () => void
) {
  return (event: React.MouseEvent<HTMLAnchorElement>) => {
    const id = href.replace('#', '');
    const target = document.getElementById(id);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', href);
      onNavigate?.();
    }
  };
}

export function MarketingNav() {
  const pathname = usePathname();
  const onHomepage = isMarketingHomepage(pathname);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  const brandHref = onHomepage
    ? MARKETING_SECTION_HASHES.hero
    : MARKETING_HOMEPAGE_PATH;
  const brandOnClick = onHomepage
    ? handleHomepageAnchorClick(MARKETING_SECTION_HASHES.hero, closeMobile)
    : () => closeMobile();

  const ctaHref = onHomepage
    ? MARKETING_PRIMARY_CTA.hash
    : homepageSectionHref(MARKETING_PRIMARY_CTA.hash, false);

  const primaryCta = onHomepage ? (
    <a
      href={MARKETING_PRIMARY_CTA.hash}
      onClick={handleHomepageAnchorClick(MARKETING_PRIMARY_CTA.hash, closeMobile)}
      className={mobilePrimaryButtonClassName}
    >
      {MARKETING_PRIMARY_CTA.label}
    </a>
  ) : (
    <Link
      href={ctaHref}
      onClick={closeMobile}
      className={mobilePrimaryButtonClassName}
    >
      {MARKETING_PRIMARY_CTA.label}
    </Link>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="flex h-16 items-center border-b border-mm-outline-variant/40 bg-mm-surface-container/90 backdrop-blur-md">
        <div className="mm-content flex items-center justify-between gap-4">
          {onHomepage ? (
            <a
              href={brandHref}
              onClick={brandOnClick}
              className="font-display text-sm font-semibold tracking-tight text-mm-on-background"
            >
              MindMesh
            </a>
          ) : (
            <Link
              href={MARKETING_HOMEPAGE_PATH}
              onClick={closeMobile}
              className="font-display text-sm font-semibold tracking-tight text-mm-on-background"
            >
              MindMesh
            </Link>
          )}

          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 md:flex"
          >
            {MARKETING_NAV_LINKS.map(({ label, hash }) => {
              const href = homepageSectionHref(hash, onHomepage);
              return onHomepage ? (
                <a
                  key={hash}
                  href={href}
                  onClick={handleHomepageAnchorClick(href)}
                  className={linkClassName}
                >
                  {label}
                </a>
              ) : (
                <Link key={hash} href={href} className={linkClassName}>
                  {label}
                </Link>
              );
            })}
            {onHomepage ? (
              <a
                href={MARKETING_PRIMARY_CTA.hash}
                onClick={handleHomepageAnchorClick(MARKETING_PRIMARY_CTA.hash)}
                className={primaryButtonClassName}
              >
                {MARKETING_PRIMARY_CTA.label}
              </a>
            ) : (
              <Link
                href={homepageSectionHref(MARKETING_PRIMARY_CTA.hash, false)}
                className={primaryButtonClassName}
              >
                {MARKETING_PRIMARY_CTA.label}
              </Link>
            )}
          </nav>

          {/* Linear-style mobile chrome: primary CTA outside, other links in the menu. */}
          <div className="flex items-center gap-2 md:hidden">
            {primaryCta}
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-mm-on-background"
              aria-expanded={mobileOpen}
              aria-controls="marketing-mobile-nav"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <nav
          id="marketing-mobile-nav"
          aria-label="Primary mobile"
          className="border-b border-mm-outline-variant/40 bg-mm-surface-container md:hidden"
        >
          <div className="mm-content flex flex-col gap-1 py-4">
            {MARKETING_NAV_LINKS.map(({ label, hash }) => {
              const href = homepageSectionHref(hash, onHomepage);
              return onHomepage ? (
                <a
                  key={hash}
                  href={href}
                  onClick={handleHomepageAnchorClick(href, closeMobile)}
                  className="rounded-md px-2 py-3 text-sm font-medium text-mm-on-background"
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={hash}
                  href={href}
                  onClick={closeMobile}
                  className="rounded-md px-2 py-3 text-sm font-medium text-mm-on-background"
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
