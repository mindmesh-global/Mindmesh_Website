'use client';

import Link from 'next/link';

export default function Logo({ fontClassName }: { fontClassName?: string }) {
  return (
    <Link
      href="/"
      className="fixed top-4 left-6 z-50 group"
    >
      <span
        className={`text-3xl md:text-4xl lg:text-4xl font-bold tracking-tight group-hover:opacity-90 transition-opacity ${fontClassName ?? ''}`}
        style={{ color: '#7B2B25' }}
      >
        MindMesh
      </span>
    </Link>
  );
}
