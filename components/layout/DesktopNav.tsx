'use client';

import Link from 'next/link';
import Image from 'next/image';
import { trackNavClick } from '@/utils/trackEvent';

const navItems = [
  { label: 'MindMesh', href: '/', icon: '/images/Logo/mindmesh-logo-tight.png' },
  { label: 'Join Waitlist', href: '/waitlist', icon: '/images/join-waitlist-icon.png' },
  { label: 'Subscription', href: '/subscription', icon: '/images/subscription-icon.png' },
  { label: 'Features', href: '/features', icon: '/images/features-icon.png' },
  { label: 'App Directory', href: '/app-directory', icon: '/images/app-directory-icon.png' },
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
      <div className="absolute left-12 top-[18%] -translate-y-1/2 flex flex-col gap-6 z-[50]">
        {leftItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => trackNavClick(item.label)}
            className={`flex flex-col items-center gap-2 w-24 transition-opacity hover:opacity-100 ${
              activeHref === item.href ? 'opacity-100' : 'opacity-80'
            }`}
          >
            <div className="w-12 h-12 flex items-center justify-center">
              <Image
                src={item.icon}
                alt={item.label}
                width={48}
                height={48}
                className="desktop-nav-icon-glow object-contain"
              />
            </div>
            <span className="desktop-nav-label-glow text-sm font-semibold text-white text-center">{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="absolute right-12 top-[18%] -translate-y-1/2 flex flex-col gap-6 z-[50]">
        {rightItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => trackNavClick(item.label)}
            className={`flex flex-col items-center gap-2 w-24 transition-opacity hover:opacity-100 ${
              activeHref === item.href ? 'opacity-100' : 'opacity-80'
            }`}
          >
            <div className="w-12 h-12 flex items-center justify-center">
              <Image
                src={item.icon}
                alt={item.label}
                width={48}
                height={48}
                className="desktop-nav-icon-glow object-contain"
              />
            </div>
            <span className="desktop-nav-label-glow text-sm font-semibold text-white text-center">{item.label}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
