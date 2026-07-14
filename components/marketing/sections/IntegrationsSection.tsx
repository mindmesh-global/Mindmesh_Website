import Link from 'next/link';
import { MarketingSection } from '@/components/marketing/MarketingSection';
import { IntegrationsMarquee } from '@/components/marketing/sections/IntegrationsMarquee';

export function IntegrationsSection() {
  return (
    <MarketingSection
      id="integrations"
      eyebrow="Integrations"
      title="Connect what you already use."
      subtitle="Email, calendar, messaging, and tasks stay yours. MindMesh reads them as sources."
      withDivider
    >
      <IntegrationsMarquee className="py-2" />
      <p className="mt-8 text-sm text-mm-on-surface-variant">More connectors added regularly.</p>
      <p className="mt-4">
        <Link
          href="/connected-apps"
          className="text-base font-medium text-mm-primary hover:text-mm-primary-dim"
        >
          See all integrations →
        </Link>
      </p>
    </MarketingSection>
  );
}
