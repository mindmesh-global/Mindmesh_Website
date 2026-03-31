'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useOptionalDashboardViewMode } from '@/context/DashboardViewModeContext';

export default function Logo({ fontClassName }: { fontClassName?: string }) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const dashboardVm = useOptionalDashboardViewMode();
  useEffect(() => setMounted(true), []);

  const hideForFullBleed =
    (dashboardVm?.viewMode === 'desktop' && (pathname === '/' || pathname === '/dashboard')) ||
    pathname === '/faq';

  const logo = (
    <Link
      href="/"
      className="fixed top-4 left-6 group z-[99990] flex items-center"
    >
      <span
        className={`text-3xl md:text-4xl font-bold tracking-tight group-hover:opacity-90 transition-opacity ${fontClassName ?? ''}`}
        style={{ color: '#7B2B25' }}
      >
        MindMesh
      </span>
    </Link>
  );

  if (!mounted || typeof document === 'undefined' || hideForFullBleed) return null;
  return createPortal(logo, document.body);
}
