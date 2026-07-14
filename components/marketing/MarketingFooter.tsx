import Link from 'next/link';
import { MARKETING_FOOTER_LINKS } from '@/lib/marketing-routes';

const linkClassName =
  'text-sm text-mm-on-surface-variant transition-colors hover:text-mm-primary';

export function MarketingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-mm-outline-variant bg-mm-background">
      <div className="mm-content py-12 lg:py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-3">
            <p className="font-display text-sm font-semibold tracking-tight text-mm-on-background">
              MindMesh
            </p>
            <p className="text-sm leading-relaxed text-mm-on-surface-variant">
              The cognitive layer for modern work.
            </p>
            <p className="text-sm text-mm-on-surface-variant">
              © {year} MindMesh. A product of The Vansh Group.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-x-8 md:gap-y-3"
          >
            {MARKETING_FOOTER_LINKS.map(({ label, href }) => (
              <Link key={href} href={href} className={linkClassName}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
