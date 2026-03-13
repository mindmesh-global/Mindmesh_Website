'use client';

import dynamic from 'next/dynamic';
import DesktopNav from './DesktopNav';

const AnimatedBackground = dynamic(
  () => import('@/components/layout/AnimatedBackground'),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-black" /> }
);

export default function DesktopRouteLayout({
  children,
  activeHref,
}: {
  children: React.ReactNode;
  activeHref?: string;
}) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-16">
      <div className="absolute inset-0">
        <AnimatedBackground />
      </div>

      <DesktopNav activeHref={activeHref} />

      <div className="relative z-10 w-full max-w-5xl mx-4 flex justify-center items-center min-h-[80vh]">
        {children}
      </div>
    </section>
  );
}
