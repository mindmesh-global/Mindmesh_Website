import { WaitlistForm } from '@/components/marketing/WaitlistForm';
import { marketingTrustContent } from '@/lib/marketing-trust-content';

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

        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-10 lg:max-w-4xl lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="w-full max-w-md shrink-0">
            <WaitlistForm />
          </div>

          <p className="max-w-[18rem] text-center font-display text-xl font-semibold leading-[1.35] tracking-[-0.01em] text-mm-on-background md:text-2xl lg:ml-auto lg:max-w-sm lg:text-right lg:text-3xl lg:leading-[1.3]">
            {marketingTrustContent.waitlistLine}
          </p>
        </div>
      </div>
    </section>
  );
}
