'use client';

import { useEffect, useRef, useState } from 'react';
import { MarketingMascotPanel } from '@/components/marketing/theater/marketing/MarketingMascotPanel';
import { useTheaterScroll } from '@/components/marketing/theater/TheaterScrollContext';
import { getMascotVisualStateFromProgress } from '@/lib/marketing-theater-scroll';

const AUTO_PLAY_DURATION_MS = 6000;

export function MascotTheaterDemo() {
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
  const visual = getMascotVisualStateFromProgress(effectiveProgress);

  const chatRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = chatRef.current?.querySelector('[data-mascot-chat-shell]');
    if (el) el.scrollTop = el.scrollHeight;
  }, [visual.showFollowUp, visual.showUserConfirm, visual.showCalendarTyping, visual.showCalendarDone, visual.replyVisibleCount]);

  return (
    <div
      ref={chatRef}
      className="relative min-h-[280px]"
      data-mascot-theater-demo
      data-mascot-theater-paused={isPaused ? 'true' : 'false'}
      data-mascot-theater-step={step}
      data-mascot-scroll-progress={effectiveProgress.toFixed(3)}
      data-mascot-hold={visual.showHold ? 'true' : 'false'}
    >
      <MarketingMascotPanel
        showUserAsk={visual.showUserAsk}
        userAskMotion={visual.userAskMotion}
        showTyping={visual.showTyping}
        replyVisibleCount={visual.replyVisibleCount}
        actionOpacity={visual.actionOpacity}
        showFollowUp={visual.showFollowUp}
        showUserConfirm={visual.showUserConfirm}
        showCalendarTyping={visual.showCalendarTyping}
        showCalendarDone={visual.showCalendarDone}
      />
    </div>
  );
}
