'use client';

import { usePathname } from 'next/navigation';
import SiteNav from '@/components/layout/SiteNav';

export default function GlobalSiteNav() {
  const pathname = usePathname();

  if (!pathname || pathname === '/' || pathname === '/dashboard') {
    return null;
  }

  return <SiteNav activeHref={pathname} />;
}
