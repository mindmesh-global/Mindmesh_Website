'use client';

import Link from 'next/link';

export default function Logo() {
  return (
    <Link
      href="/"
      className="fixed top-4 left-6 z-50 group"
    >
      <span
        className="text-3xl md:text-4xl lg:text-4xl font-bold tracking-tight group-hover:opacity-90 transition-opacity"
        style={{
          background: 'linear-gradient(to right, #fbbf24, #f97316, #ec4899, #db2777)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.6)) drop-shadow(0 0 20px rgba(236, 72, 153, 0.4))',
        }}
      >
        MindMesh
      </span>
    </Link>
  );
}
