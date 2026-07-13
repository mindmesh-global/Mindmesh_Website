import { WaitlistForm } from '@/components/marketing/WaitlistForm';

/**
 * Final CTA. Heading sits close to the Trust divider above; form spaced evenly below.
 */
export function FinalCTASection() {
  return (
    <section
      id="cta"
      className="bg-mm-background pb-24 pt-10 lg:pb-32 lg:pt-12"
      aria-labelledby="cta-heading"
    >
      <div className="mm-content flex flex-col gap-14 md:gap-16 lg:gap-20">
        <div className="w-full">
          <h2
            id="cta-heading"
            className="w-full font-display text-2xl font-semibold leading-[1.35] tracking-[-0.01em] text-mm-on-background md:text-3xl lg:text-[2.5rem] lg:leading-[1.3]"
          >
            <span className="text-mm-on-background">
              Connect your apps. See what needs attention. Act with approval.
            </span>{' '}
            <span className="text-mm-on-surface-variant">
              Get early access to MindMesh, the cognitive layer for modern work.
            </span>
          </h2>
        </div>

        <div className="max-w-md">
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
