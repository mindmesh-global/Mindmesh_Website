'use client';

import Image from 'next/image';

/** Hero background; imported statically from Hero (no dynamic ssr:false) to avoid refresh flash. */
export default function AnimatedBackground() {
  return (
    <>
      <div className="absolute inset-0">
        <Image
          src="/images/hero-sec-bg.png"
          alt=""
          fill
          priority
          quality={75}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-black/50" aria-hidden />
    </>
  );
}
