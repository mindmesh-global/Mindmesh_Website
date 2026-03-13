'use client';

import { useRouter } from 'next/navigation';
import DesktopRouteLayout from '@/components/layout/DesktopRouteLayout';
import FeaturesWindow from '@/components/FeaturesWindow';

export default function FeaturesPageClient() {
  const router = useRouter();
  return (
    <DesktopRouteLayout activeHref="/features">
      <div className="w-full max-w-[1400px] h-[min(80vh,calc(100vh-7rem))] bg-gray-900/90 backdrop-blur-xl rounded-lg shadow-2xl overflow-hidden flex flex-col">
        <FeaturesWindow onClose={() => router.push('/')} onMinimize={undefined} />
      </div>
    </DesktopRouteLayout>
  );
}
