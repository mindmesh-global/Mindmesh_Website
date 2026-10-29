/**
 * First-viewport upper half (Linear-style): copy lives here; the product
 * overview frame starts in the lower half via ProductOverviewHome.
 * CTAs sit under the app frame (ProductOverviewHome), not in the hero.
 * H1 remains the LCP candidate (P6-T08); no opacity/transform on mount.
 */
export function HeroSection() {
  return (
    <section
      id="hero"
      className="flex min-h-[calc(48svh-4rem)] items-start bg-mm-background pb-10 pt-20 lg:min-h-[calc(50svh-4rem)] lg:pb-14 lg:pt-28"
    >
      <div className="mm-content">
        {/*
          LCP candidate (P6-T08): Manrope display H1, SSR’d above the fold.
        */}
        <h1
          id="hero-heading"
          className="hero-lcp max-w-[720px] font-display text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] text-mm-on-background md:text-[3.25rem] lg:text-[4rem]"
        >
          Work across every client
          <br />
          like you only have one.
        </h1>
        <p className="mt-4 max-w-[560px] text-sm text-mm-on-surface-variant md:text-base">
          MindMesh reads every client&apos;s email, Slack and calendar — ranked by what needs you
          now, with everything else accounted for.
        </p>
      </div>
    </section>
  );
}
