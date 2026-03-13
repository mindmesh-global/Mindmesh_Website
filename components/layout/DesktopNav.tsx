'use client';

import Link from 'next/link';
import Image from 'next/image';

const navItems = [
  { label: 'MindMesh', href: '/', icon: '/images/Logo/mindmesh-logo-tight.png' },
  { label: 'Join Waitlist', href: '/waitlist', icon: '/images/join-waitlist-icon.png' },
  { label: 'Subscription', href: '/subscription', icon: '/images/subscription-icon.png' },
  { label: 'Features', href: '/features', icon: '/images/features-icon.png' },
  { label: 'App Directory', href: '/app-directory', icon: '/images/features-icon.png' },
  { label: 'Social', href: '/social', icon: '/images/social-icon.png' },
  { label: 'Demo.mov', href: '/demo', icon: '/images/demo-icon.png' },
  { label: 'Docs', href: '/docs', icon: '/images/docs-icon.png' },
  { label: 'Contact Us', href: '/contact', icon: '/images/contact-us-icon.png' },
] as const;

const LEFT_COUNT = 5;

interface DesktopNavProps {
  activeHref?: string;
}

export default function DesktopNav({ activeHref }: DesktopNavProps) {
  const leftItems = navItems.slice(0, LEFT_COUNT);
  const rightItems = navItems.slice(LEFT_COUNT);

  return (
    <>
      <div className="absolute left-12 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-20">
        {leftItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-2 w-24 transition-opacity hover:opacity-100 ${
              activeHref === item.href ? 'opacity-100' : 'opacity-80'
            }`}
          >
            <div className="w-11 h-11 rounded-lg flex items-center justify-center overflow-hidden bg-gray-800/50 border border-gray-700/50">
              <Image
                src={item.icon}
                alt={item.label}
                width={44}
                height={44}
                className="object-contain"
              />
            </div>
            <span className="text-sm font-semibold text-white text-center">{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-20">
        {rightItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-2 w-24 transition-opacity hover:opacity-100 ${
              activeHref === item.href ? 'opacity-100' : 'opacity-80'
            }`}
          >
            <div className="w-11 h-11 rounded-lg flex items-center justify-center overflow-hidden bg-gray-800/50 border border-gray-700/50">
              <Image
                src={item.icon}
                alt={item.label}
                width={44}
                height={44}
                className="object-contain"
              />
            </div>
            <span className="text-sm font-semibold text-white text-center">{item.label}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
