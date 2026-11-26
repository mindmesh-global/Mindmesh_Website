import type { Metadata } from 'next';
import Image from 'next/image';
import { MarketingDepthLayout } from '@/components/marketing/MarketingDepthLayout';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';

const pageDescription =
  'Meet the team building MindMesh — the cognitive layer for modern work. A product of The Vansh Group.';

export const metadata: Metadata = {
  title: 'About',
  description: pageDescription,
  openGraph: {
    title: 'MindMesh | About',
    description: pageDescription,
    url: 'https://mindmesh.global/about',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindMesh | About',
    description: pageDescription,
    images: [OG_IMAGE_URL],
  },
};

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const team = [
  {
    name: 'Rohit Tripathi',
    role: 'Director, Chief Builder',
    photo: '/images/team/rohit-tripathi.png',
    linkedin: 'https://www.linkedin.com/in/simplyrohit/',
  },
  {
    name: 'Ravneet Kaur',
    role: 'Director, COO',
    photo: '/images/team/ravneet-kaur.png',
    linkedin: 'https://www.linkedin.com/in/ravneet-kaur-tripathi/',
  },
  {
    name: 'Saurav Suman',
    role: 'Backend Engineer',
    photo: '/images/team/saurav-suman.png',
    linkedin: 'https://www.linkedin.com/in/saurav-suman-b92620213/',
  },
  {
    name: 'Kashish Sewani',
    role: 'Platform Engineer',
    photo: '/images/team/kashish-sewani.png',
    linkedin: 'https://www.linkedin.com/in/kashish-sewani/',
  },
  {
    name: 'Ananya Pandey',
    role: 'Front End Engineer',
    photo: '/images/team/ananya-pandey.jpg',
    linkedin: 'https://www.linkedin.com/in/ananya-pandey-b27860258/',
  },
] as const;

export default function AboutPage() {
  return (
    <MarketingDepthLayout
      eyebrow="About"
      title="The team behind MindMesh"
      subtitle="Building and shipping the cognitive layer for modern work."
      backHref="/"
      backLabel="Back to homepage →"
    >
      <section className="bg-mm-background py-16 lg:py-24">
        <div className="mm-content">
          <div className="max-w-[720px] space-y-5 text-base text-mm-on-surface-variant lg:text-lg">
            <p>
              MindMesh is a product of{' '}
              <a
                href="https://www.thevanshgroup.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-mm-on-background underline decoration-mm-outline-variant underline-offset-2 transition-colors hover:text-mm-primary hover:decoration-mm-primary"
              >
                The Vansh Group
              </a>{' '}
              — a small,
              focused team building tools for the way professionals actually work today.
            </p>
            <p>
              We started from a real problem: fractional leaders and consultants juggling multiple
              clients across dozens of tools, with no single place to see what actually needs
              attention. MindMesh is our answer — a proactive attention layer that reads your
              connected apps and surfaces what matters, with everything else quietly handled.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-mm-background pb-24 lg:pb-32">
        <div className="mm-content">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            Meet the team
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {team.map(({ name, role, photo, linkedin }) => (
              <a
                key={name}
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-4 rounded-xl border border-mm-outline-variant/40 bg-mm-surface-container p-6 text-center transition-colors hover:border-mm-outline-variant"
              >
                <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-mm-outline-variant/40 transition-all group-hover:ring-mm-primary/40">
                  <Image
                    src={photo}
                    alt={name}
                    fill
                    className="object-cover object-top"
                    sizes="96px"
                    quality={90}
                  />
                </div>
                <div className="space-y-1">
                  <p className="font-display text-sm font-semibold text-mm-on-background">{name}</p>
                  <p className="text-xs text-mm-on-surface-variant">{role}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-mm-primary opacity-0 transition-opacity group-hover:opacity-100">
                  <LinkedInIcon />
                  LinkedIn
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </MarketingDepthLayout>
  );
}
