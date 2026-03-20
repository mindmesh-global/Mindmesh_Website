'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';

export default function Logo({ fontClassName }: { fontClassName?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const logo = (
    <Link
      href="/"
      className="fixed top-4 left-6 group z-[99990] flex items-center"
    >
      <span
        className={`text-3xl md:text-4xl font-bold tracking-tight group-hover:opacity-90 transition-opacity ${fontClassName ?? ''}`}
        style={{ color: '#7B2B25' }}
      >
        MindMesh
      </span>
    </Link>
  );

  if (!mounted || typeof document === 'undefined') return null;
  return createPortal(logo, document.body);
}
