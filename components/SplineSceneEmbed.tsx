'use client';

import { useEffect, useRef, useState } from 'react';
import { SplineScene } from '@/components/ui/splite';

const DEFAULT_SPLINE_SCENE =
  'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode';

type SplineSceneEmbedProps = {
  className?: string;
};

export function SplineSceneEmbed({ className }: SplineSceneEmbedProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '120px', threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className={className}>
      {inView ? (
        <SplineScene scene={DEFAULT_SPLINE_SCENE} className="h-full w-full" />
      ) : (
        <div className="h-full w-full bg-[#020617]" aria-hidden />
      )}
    </div>
  );
}
