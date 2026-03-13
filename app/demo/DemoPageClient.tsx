'use client';

import DesktopRouteLayout from '@/components/layout/DesktopRouteLayout';

export default function DemoPageClient() {
  return (
    <DesktopRouteLayout activeHref="/demo">
      <div className="w-full max-w-4xl bg-gray-900/90 backdrop-blur-xl rounded-lg shadow-2xl overflow-hidden p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Demo.mov</h2>
        <div className="aspect-video bg-black/50 rounded-lg flex items-center justify-center">
          <p className="text-gray-400">Demo video placeholder - add your demo.mov or video embed here</p>
        </div>
      </div>
    </DesktopRouteLayout>
  );
}
