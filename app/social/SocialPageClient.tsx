'use client';

import { useRouter } from 'next/navigation';
import DesktopRouteLayout from '@/components/layout/DesktopRouteLayout';
import SocialWindow from '@/components/SocialWindow';

export default function SocialPageClient() {
  const router = useRouter();
  return (
    <DesktopRouteLayout activeHref="/social">
      <div className="w-full max-w-[1400px] h-[min(80vh,calc(100vh-7rem))] bg-gray-900/90 backdrop-blur-xl rounded-lg shadow-2xl overflow-hidden flex flex-col">
        <SocialWindow onClose={() => router.push('/')} onMinimize={undefined} />
      </div>
    </DesktopRouteLayout>
  );
}
