'use client';

import DesktopRouteLayout from '@/components/layout/DesktopRouteLayout';
import WaitlistModal from '@/components/WaitlistModal';

export default function WaitlistPageClient() {
  return (
    <DesktopRouteLayout activeHref="/waitlist">
      <div className="w-full max-w-2xl">
        <WaitlistModal isOpen={true} onClose={() => {}} embedded />
      </div>
    </DesktopRouteLayout>
  );
}
