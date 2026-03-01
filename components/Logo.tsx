'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Logo() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <Link
      href="/"
      className={`fixed top-0 -left-4 z-50 flex items-center gap-2 group ${
        isHome ? 'text-white' : 'text-gray-900 dark:text-white'
      }`}
    >
      <Image
        src="/images/Logo/mindmesh logo.png"
        alt="Mindmesh"
        width={128}
        height={128}
        className="object-contain"
      />
      <span className="text-3xl font-semibold group-hover:opacity-80 transition-opacity -mt-2 -ml-9 text-blue-700">
        Mindmesh
      </span>
    </Link>
  );
}
