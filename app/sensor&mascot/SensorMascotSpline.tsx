'use client';

import dynamic from 'next/dynamic';
import styles from './sensor&mascot.module.css';

const SplineSceneEmbed = dynamic(
  () => import('@/components/SplineSceneEmbed').then((m) => m.SplineSceneEmbed),
  {
    ssr: false,
    loading: () => <div className={styles.splineEmbed} aria-hidden />,
  }
);

export default function SensorMascotSpline() {
  return (
    <div className={styles.imageCard}>
      <SplineSceneEmbed className={styles.splineEmbed} />
    </div>
  );
}
