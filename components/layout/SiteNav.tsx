'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutTemplate } from 'lucide-react';
import { useDashboardViewMode } from '@/context/DashboardViewModeContext';

type SiteNavProps = {
  activeHref?: string;
  actionLabel?: string;
  actionHref?: string;
  onActionClick?: () => void;
  navClassName?: string;
  navBackgroundColor?: string;
};

const navLinkBase =
  'px-2 py-1 text-slate-400 transition-colors hover:text-slate-200 dark:text-slate-500';
const glossyBlue =
  'bg-gradient-to-b from-blue-400 via-blue-600 to-blue-800 text-white shadow-[0_8px_32px_-4px_rgba(37,99,235,0.55),0_4px_16px_-4px_rgba(29,78,216,0.4),inset_0_1px_0_rgba(255,255,255,0.22)] transition-[transform,box-shadow,filter] duration-200 hover:brightness-105 hover:shadow-[0_12px_40px_-4px_rgba(59,130,246,0.5),inset_0_1px_0_rgba(255,255,255,0.28)] active:scale-[0.98]';
const glossyNavBtn = `rounded-lg ${glossyBlue} px-4 py-2.5 text-sm font-bold sm:px-5`;

const navAliases: Record<string, string[]> = {
  '/connected-apps': ['/connected-apps', '/app-directory'],
};

function isNavLinkActive(href: string, activeHref?: string) {
  const candidates = navAliases[href] ?? [href];
  return !!activeHref && candidates.includes(activeHref);
}

function getNavLinkClass(href: string, activeHref?: string) {
  if (isNavLinkActive(href, activeHref)) {
    return 'border-b-2 border-blue-400 px-2 py-1 font-semibold text-blue-400 dark:border-blue-300 dark:text-blue-300';
  }

  return navLinkBase;
}

export default function SiteNav({
  activeHref,
  actionLabel = 'Desktop View',
  actionHref = '/dashboard',
  onActionClick,
  navClassName,
  navBackgroundColor,
}: SiteNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { setViewMode } = useDashboardViewMode();
  const resolvedActiveHref = activeHref ?? pathname ?? undefined;

  const handleDesktopViewClick = () => {
    setViewMode('desktop');
    router.push('/');
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full bg-slate-950/60 shadow-2xl shadow-slate-950/50 backdrop-blur-xl ${navClassName ?? ''}`}
      style={navBackgroundColor ? { backgroundColor: navBackgroundColor } : undefined}
    >
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-3 px-4 py-4 tracking-tight sm:px-8">
        <Link href="/" className="flex min-w-0 shrink items-center gap-2.5">
          <span className="text-xl font-bold tracking-tight text-white sm:text-2xl">MindMesh</span>
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-center gap-8 text-sm font-medium md:flex">
          <Link href="/" className={getNavLinkClass('/', resolvedActiveHref)}>
            Product
          </Link>
          <Link href="/connected-apps" className={getNavLinkClass('/connected-apps', resolvedActiveHref)}>
            Integrations
          </Link>
          <Link href="/privacy" className={getNavLinkClass('/privacy', resolvedActiveHref)}>
            Security
          </Link>
          <Link href="/faq" className={getNavLinkClass('/faq', resolvedActiveHref)}>
            FAQ
          </Link>
        </div>

        <div className="flex shrink-0 items-center justify-end">
          {onActionClick ? (
            <button
              type="button"
              onClick={onActionClick}
              className={`inline-flex items-center gap-2 ${glossyNavBtn}`}
              aria-label="Switch to desktop dashboard view"
            >
              <LayoutTemplate className="h-4 w-4 shrink-0 opacity-95" aria-hidden />
              <span className="hidden sm:inline">{actionLabel}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={actionLabel === 'Desktop View' ? handleDesktopViewClick : () => router.push(actionHref)}
              className={`inline-flex items-center gap-2 ${glossyNavBtn}`}
              aria-label="Switch to desktop dashboard view"
            >
              <LayoutTemplate className="h-4 w-4 shrink-0 opacity-95" aria-hidden />
              <span className="hidden sm:inline">{actionLabel}</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
