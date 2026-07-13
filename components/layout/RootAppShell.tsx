'use client';

import type { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { isMarketingRoute } from '@/lib/marketing-routes';

const LegacyAppShell = dynamic(
  () =>
    import('@/components/layout/LegacyAppShell').then((mod) => ({
      default: mod.LegacyAppShell,
    })),
  { ssr: false }
);

type RootAppShellProps = {
  children: ReactNode;
};

/**
 * Routes marketing funnel paths through a slim shell (no legacy chrome).
 * Other routes load `LegacyAppShell` via dynamic import (P3-T10 / P5-T01).
 */
export function RootAppShell({ children }: RootAppShellProps) {
  const pathname = usePathname();

  if (isMarketingRoute(pathname)) {
    return <>{children}</>;
  }

  return <LegacyAppShell>{children}</LegacyAppShell>;
}
