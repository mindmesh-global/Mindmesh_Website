'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MarketingSectionDivider } from '@/components/marketing/MarketingSectionDivider';

const testimonials = [
  {
    id: 'nitin-shridhar',
    quote:
      'MindMesh has genuinely been a lifesaver and a game changer for me. It saves me at least 2–3 hours every day by helping me quickly summarise key tasks, meetings, and follow-ups in chronological order, while also highlighting what needs attention first. Managing multiple emails, conversations, and action items now feels far simpler and much less time-consuming.',
    name: 'Nitin Shridhar',
    company: 'Masters Union',
    avatar: '/images/avatar-pushpreet-bhatia.jpg',
  },
  {
    id: 'harneet-kaur',
    quote:
      'Working across multiple teams and stakeholders means my inbox is constantly overwhelming. MindMesh cuts through the noise and shows me exactly what needs my attention and what can wait. I no longer dread Monday mornings — everything is organised, prioritised, and I can actually start the day focused instead of firefighting.',
    name: 'Harneet Kaur',
    company: 'Veeva Systems',
    avatar: '/images/avatar-harneet-kaur.jpg',
  },
] as const;

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const total = testimonials.length;

  const prev = () => setActive((i) => (i === 0 ? total - 1 : i - 1));
  const next = () => setActive((i) => (i === total - 1 ? 0 : i + 1));

  const { quote, name, company, avatar } = testimonials[active];

  return (
    <section
      id="testimonials"
      className="bg-mm-background py-20 lg:py-28"
      aria-labelledby="testimonials-heading"
    >
      <div className="mm-content">
        <h2
          id="testimonials-heading"
          className="font-display text-[2rem] font-bold tracking-tight text-mm-on-background md:text-[2.75rem] lg:text-5xl"
        >
          The best leaders are already on MindMesh.
        </h2>

        {/* All three cards rendered in the same grid cell — hidden ones still
            contribute their height so the container never shrinks. */}
        <div
          aria-live="polite"
          aria-atomic="true"
          className="mt-14 grid lg:mt-20"
        >
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className="col-start-1 row-start-1 transition-opacity duration-300"
              style={{ visibility: i === active ? 'visible' : 'hidden', opacity: i === active ? 1 : 0 }}
              aria-hidden={i !== active}
            >
              <div
                data-light-window=""
                className="overflow-hidden rounded-xl"
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.18)',
                  boxShadow:
                    '0 0 0 0.5px rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.45), 0 20px 56px rgba(0,0,0,0.55), 0 52px 100px rgba(0,0,0,0.35)',
                }}
              >
                <figure className="grid md:grid-cols-[1fr_auto]">
                  {/* Left: quote */}
                  <div className="flex flex-col justify-center px-8 py-10 md:px-12 md:py-16">
                    <div
                      className="mb-4 font-display text-[3.5rem] leading-none select-none"
                      style={{ color: 'rgba(0,102,204,0.3)' }}
                      aria-hidden
                    >
                      &ldquo;
                    </div>
                    <blockquote>
                      <p className="font-display text-lg font-semibold leading-[1.55] tracking-[-0.01em] text-mm-on-background md:text-xl lg:text-[1.375rem] lg:leading-[1.5]">
                        {t.quote}
                      </p>
                    </blockquote>
                  </div>

                  {/* Right: photo column */}
                  <div
                    className="relative flex items-center justify-center px-10 py-10 md:w-72 md:py-0 lg:w-80"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(67,136,253,0.12) 0%, rgba(99,60,220,0.10) 100%)',
                      borderLeft: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(67,136,253,0.18) 0%, transparent 70%)',
                      }}
                      aria-hidden
                    />
                    <figcaption className="relative flex flex-col items-center gap-4 text-center">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        width={200}
                        height={200}
                        className="h-44 w-44 rounded-full object-cover ring-4 ring-mm-primary/25 lg:h-52 lg:w-52"
                      />
                      <div>
                        <p className="text-sm font-semibold text-mm-on-surface">{t.name}</p>
                        <p className="mt-0.5 text-xs text-mm-on-surface-variant">{t.company}</p>
                      </div>
                    </figcaption>
                  </div>
                </figure>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-mm-outline-variant/60 text-mm-on-surface-variant transition-colors hover:border-mm-outline hover:text-mm-on-surface"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Testimonials">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`${t.name}'s testimonial`}
                onClick={() => setActive(i)}
                className={[
                  'rounded-full transition-all duration-200',
                  i === active
                    ? 'h-2.5 w-2.5 bg-mm-primary'
                    : 'h-2 w-2 bg-mm-outline-variant/60 hover:bg-mm-outline-variant',
                ].join(' ')}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-mm-outline-variant/60 text-mm-on-surface-variant transition-colors hover:border-mm-outline hover:text-mm-on-surface"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <MarketingSectionDivider className="mt-20 lg:mt-28" />
      </div>
    </section>
  );
}
