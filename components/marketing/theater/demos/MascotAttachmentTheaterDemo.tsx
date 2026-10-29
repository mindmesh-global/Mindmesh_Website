'use client';

import { useEffect, useRef, useState } from 'react';
import { MarketingMascotAttachmentPanel } from '@/components/marketing/theater/marketing/MarketingMascotAttachmentPanel';
import { useTheaterScroll } from '@/components/marketing/theater/TheaterScrollContext';
import { getMascotAttachmentVisualStateFromProgress } from '@/lib/marketing-theater-scroll';

const AUTO_PLAY_DURATION_MS = 6000;

export function MascotAttachmentTheaterDemo() {
  const scroll = useTheaterScroll();
  const { isPaused, step } = scroll;

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

  const effectiveProgress = Math.max(scroll.progress, autoProgress);
  const visual = getMascotAttachmentVisualStateFromProgress(effectiveProgress);

  return (
    <div
      className="relative min-h-[280px]"
      data-mascot-attachment-theater-demo
      data-mascot-attachment-theater-paused={isPaused ? 'true' : 'false'}
      data-mascot-attachment-theater-step={step}
      data-mascot-attachment-scroll-progress={effectiveProgress.toFixed(3)}
      data-mascot-attachment-hold={visual.showHold ? 'true' : 'false'}
    >
      <MarketingMascotAttachmentPanel
        showUserAsk={visual.showUserAsk}
        userAskMotion={visual.userAskMotion}
        showTyping={visual.showTyping}
        replyVisibleCount={visual.replyVisibleCount}
        hitMotion={visual.hitMotion}
        actionOpacity={visual.actionOpacity}
      />
    </div>
  );
}
