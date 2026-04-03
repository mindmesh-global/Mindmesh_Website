'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useDashboardViewMode } from '@/context/DashboardViewModeContext';
import mindmeshGemMark from '@/public/images/Logo/mindmesh-gem-mark.png';

const DashboardDesktopShell = dynamic(
  () =>
    import('@/components/dashboard/view-shells/DashboardDesktopShell').then((m) => m.DashboardDesktopShell),
  { ssr: false }
);

const FULL_BLEED_PATHS = ['/', '/dashboard', ];

/** Full-viewport marketing layout above all MindMesh chrome (dock, side icons, logo). */
export default function DashboardFullBleedPortal() {
  const { viewMode } = useDashboardViewMode();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || typeof document === 'undefined') return null;
  if (viewMode !== 'desktop') return null;
  if (!pathname || !FULL_BLEED_PATHS.includes(pathname)) return null;

  return createPortal(
    <div
      id="mindmesh-marketing-scroll"
      className="mindmesh-marketing-root fixed inset-0 z-[200000] overflow-y-auto overflow-x-hidden"
      style={{ backgroundColor: '#0a0a14', color: '#a1a1aa' }}
      role="document"
      aria-label="MindMesh marketing"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <Image
          src={mindmeshGemMark}
          alt=""
          width={1024}
          height={682}
          quality={100}
          priority
          sizes="(max-width: 1024px) 92vw, 880px"
          className="absolute left-1/2 top-[min(14vh,140px)] h-auto w-[min(92vw,880px)] max-w-none -translate-x-1/2 object-contain opacity-[0.16]"
        />
      </div>
      <DashboardDesktopShell />
    </div>,
    document.body
  );
}
