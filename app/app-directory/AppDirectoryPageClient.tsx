'use client';

import { useRouter } from 'next/navigation';
import DesktopRouteLayout from '@/components/layout/DesktopRouteLayout';
import AppDirectoryWindow from '@/components/AppDirectoryWindow';

export default function AppDirectoryPageClient() {
  const router = useRouter();
  return (
    <DesktopRouteLayout activeHref="/app-directory">
      <div className="w-full max-w-[1400px] h-[min(80vh,calc(100vh-7rem))] bg-gray-900/90 backdrop-blur-xl rounded-lg shadow-2xl overflow-hidden flex flex-col">
        <AppDirectoryWindow onClose={() => router.push('/')} onMinimize={undefined} />
      </div>
    </DesktopRouteLayout>
  );
}
