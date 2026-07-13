'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Hash-aware redirect for legacy `/sensor&mascot` (P8-T14 / P8-T02).
 * `#mascot` → `/mascot`; everything else (including `#sensor`) → `/sensor`.
 * Fragments never reach the server, so this cannot be a config-only 308.
 */
export function LegacySensorMascotRedirect() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.trim().toLowerCase();
    router.replace(hash === '#mascot' ? '/mascot' : '/sensor');
  }, [router]);

  return null;
}
