'use client';

import { MarketingMascotAttachmentPanel } from '@/components/marketing/theater/marketing/MarketingMascotAttachmentPanel';
import { useTheaterScroll } from '@/components/marketing/theater/TheaterScrollContext';
import { getMascotAttachmentVisualStateFromProgress } from '@/lib/marketing-theater-scroll';

/**
 * Scroll-driven Mascot attachment-search theater demo (P10-T06).
 * Idle → ask → typing → reply → hit card → Open attachment → hold.
 * Motion: transform + opacity only. No MascotChatbot / Lottie.
 */
export function MascotAttachmentTheaterDemo() {
  const { progress, isPaused, step } = useTheaterScroll();
  const visual = getMascotAttachmentVisualStateFromProgress(progress);

  return (
    <div
      className="relative min-h-[280px]"
      data-mascot-attachment-theater-demo
      data-mascot-attachment-theater-paused={isPaused ? 'true' : 'false'}
      data-mascot-attachment-theater-step={step}
      data-mascot-attachment-scroll-progress={progress.toFixed(3)}
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
