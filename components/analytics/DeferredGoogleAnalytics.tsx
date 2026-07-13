'use client';

import { GoogleAnalytics } from '@next/third-parties/google';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isMarketingHomepage } from '@/lib/marketing-routes';

type DeferredGoogleAnalyticsProps = {
  gaId: string;
};

/**
 * Defers GA on the marketing homepage so gtag is not on the LCP critical path (P3-T16).
 * Other routes load GA on the next tick (legacy behavior).
 */
export function DeferredGoogleAnalytics({ gaId }: DeferredGoogleAnalyticsProps) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isMarketingHomepage(pathname)) {
      setReady(true);
      return undefined;
    }

    let cancelled = false;
    const activate = () => {
      if (!cancelled) setReady(true);
    };

    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(activate, { timeout: 4500 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const timeoutId = window.setTimeout(activate, 3500);
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [pathname]);

  if (!ready) return null;
  return <GoogleAnalytics gaId={gaId} />;
}
