import Image from 'next/image';
import Link from 'next/link';
import { MarketingSection } from '@/components/marketing/MarketingSection';
import { MARKETING_INTEGRATIONS } from '@/lib/marketing-integrations';

export function IntegrationsSection() {
  return (
    <MarketingSection
      id="integrations"
      eyebrow="Integrations"
      title="Connect what you already use."
      subtitle="Email, calendar, messaging, and tasks stay yours. MindMesh reads them as sources."
      withDivider
    >
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
        {MARKETING_INTEGRATIONS.map((app) => (
          <div key={app.id} className="flex flex-col items-center gap-3 text-center">
            <Image
              src={app.iconSrc}
              alt={`${app.displayName} integration`}
              width={56}
              height={56}
              className="h-14 w-14 object-contain"
            />
            <div>
              <p className="text-sm font-medium text-mm-on-background">{app.displayName}</p>
              <p className="text-xs text-mm-on-surface-variant">{app.category}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-8 text-sm text-mm-on-surface-variant">More connectors added regularly.</p>
      <p className="mt-4">
        <Link href="/connected-apps" className="text-base font-medium text-mm-primary hover:text-mm-primary-dim">
          See all integrations →
        </Link>
      </p>
    </MarketingSection>
  );
}
