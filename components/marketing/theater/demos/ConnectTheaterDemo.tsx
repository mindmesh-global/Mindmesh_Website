'use client';

import { useEffect, useRef, useState } from 'react';
import { StaticConnectedApps } from '@/components/dashboard/StaticConnectedApps';
import { CONNECTED_APP_FIXTURES_ACME } from '@/lib/marketing-demo-data';
import { useTheaterScroll } from '@/components/marketing/theater/TheaterScrollContext';

const AUTO_PLAY_DURATION_MS = 3800;

/**
 * Connect theater demo.
 * Auto-plays 0→1 when the section enters view (isPaused from useScrollSection context).
 */
export function ConnectTheaterDemo() {
  const { progress: scrollProgress, isPaused } = useTheaterScroll();
  const [autoProgress, setAutoProgress] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) {
      startTimeRef.current = null;
      if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
      return;
    }
    if (startTimeRef.current === null) startTimeRef.current = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - (startTimeRef.current ?? now)) / AUTO_PLAY_DURATION_MS);
      setAutoProgress(p);
      if (p < 1) { rafRef.current = requestAnimationFrame(tick); } else { rafRef.current = null; }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
  }, [isPaused]);

  const progress = Math.max(scrollProgress, autoProgress);

  return (
    <div data-connect-theater-demo>
      <StaticConnectedApps
        variant="marketing"
        apps={CONNECTED_APP_FIXTURES_ACME}
        scrollProgress={progress}
      />
    </div>
  );
}
