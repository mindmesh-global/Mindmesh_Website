'use client';

import { MarketingMascotPanel } from '@/components/marketing/theater/marketing/MarketingMascotPanel';
import { useTheaterScroll } from '@/components/marketing/theater/TheaterScrollContext';
import { getMascotVisualStateFromProgress } from '@/lib/marketing-theater-scroll';

/**
 * Scroll-driven Mascot theater demo (P8-T11).
 * Idle → user ask → typing → staged reply → Open inbox → hold.
 * Motion: transform + opacity only. No MascotChatbot / Lottie.
 */
export function MascotTheaterDemo() {
  const { progress, isPaused, step } = useTheaterScroll();
  const visual = getMascotVisualStateFromProgress(progress);

  return (
    <div
      className="relative min-h-[280px]"
      data-mascot-theater-demo
      data-mascot-theater-paused={isPaused ? 'true' : 'false'}
      data-mascot-theater-step={step}
      data-mascot-scroll-progress={progress.toFixed(3)}
      data-mascot-hold={visual.showHold ? 'true' : 'false'}
    >
      <MarketingMascotPanel
        showUserAsk={visual.showUserAsk}
        userAskMotion={visual.userAskMotion}
        showTyping={visual.showTyping}
        replyVisibleCount={visual.replyVisibleCount}
        actionOpacity={visual.actionOpacity}
      />
    </div>
  );
}
