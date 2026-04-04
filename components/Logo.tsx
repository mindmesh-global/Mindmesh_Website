'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useOptionalDashboardViewMode } from '@/context/DashboardViewModeContext';
import { isMindmeshHeroComponentRoute } from '@/lib/mindmesh-hero-routes';

export default function Logo({ fontClassName }: { fontClassName?: string }) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const dashboardVm = useOptionalDashboardViewMode();
  useEffect(() => setMounted(true), []);

  /** Maroon wordmark: macOS (scrollable) Hero pages only — not marketing scroll shell (`desktop`). */
  const showFloatingWordmark =
    dashboardVm?.viewMode === 'scrollable' && isMindmeshHeroComponentRoute(pathname);

  const logo = (
    <Link
      id="mindmesh-desktop-logo"
      href="/"
      className="fixed top-4 left-6 group z-[220010] flex items-center"
    >
      <span
        className={`text-3xl md:text-4xl font-bold tracking-tight group-hover:opacity-90 transition-opacity ${fontClassName ?? ''}`}
        style={{ color: '#7B2B25' }}
      >
        MindMesh
      </span>
    </Link>
  );

  if (!mounted || typeof document === 'undefined' || !showFloatingWordmark) return null;
  return createPortal(logo, document.body);
}
