'use client';

import { usePathname } from 'next/navigation';
import SiteFooter from '@/components/layout/SiteFooter';

export default function GlobalSiteFooter() {
  const pathname = usePathname();

  if (!pathname || pathname === '/' || pathname === '/dashboard') {
    return null;
  }

  return <SiteFooter />;
}
