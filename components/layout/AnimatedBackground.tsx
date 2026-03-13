'use client';

import Image from 'next/image';

/**
 * Heavy animated background (purple hexagon grid + MindMesh visuals).
 * Lazy loaded with next/dynamic ssr:false so it never blocks server rendering.
 * Google sees text content immediately; browser loads animation after.
 */
export default function AnimatedBackground() {
  return (
    <>
      <div className="absolute inset-0">
        <Image
          src="/images/mindmesh-bg.png"
          alt=""
          fill
          quality={95}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-black/50" />
    </>
  );
}
