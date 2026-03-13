'use client';

import Link from 'next/link';
import Image from 'next/image';
import { trackNavClick } from '@/utils/trackEvent';

type GlowVariant = 'rainbow' | 'cyan' | 'emerald' | 'amber' | 'purple' | 'blue' | 'orange' | 'rose' | 'violet';

const navItems: { label: string; href: string; icon: string; glow: GlowVariant }[] = [
  { label: 'MindMesh', href: '/', icon: '/images/Logo/mindmesh-logo-tight.png', glow: 'rainbow' },
  { label: 'Join Waitlist', href: '/waitlist', icon: '/images/join-waitlist-icon.png', glow: 'cyan' },
  { label: 'Subscription', href: '/subscription', icon: '/images/subscription-icon.png', glow: 'emerald' },
  { label: 'Features', href: '/features', icon: '/images/features-icon.png', glow: 'amber' },
  { label: 'App Directory', href: '/app-directory', icon: '/images/app-directory-icon.png', glow: 'purple' },
  { label: 'Social', href: '/social', icon: '/images/social-icon.png', glow: 'blue' },
  { label: 'Demo.mov', href: '/demo', icon: '/images/demo-icon.png', glow: 'orange' },
  { label: 'Docs', href: '/docs', icon: '/images/docs-icon.png', glow: 'rose' },
  { label: 'Contact Us', href: '/contact', icon: '/images/contact-us-icon.png', glow: 'violet' },
];

const GLOW_CLASSES: Record<GlowVariant, string> = {
  rainbow: 'desktop-nav-glow-rainbow',
  cyan: 'desktop-nav-glow-cyan',
  emerald: 'desktop-nav-glow-emerald',
  amber: 'desktop-nav-glow-amber',
  purple: 'desktop-nav-glow-purple',
  blue: 'desktop-nav-glow-blue',
  orange: 'desktop-nav-glow-orange',
  rose: 'desktop-nav-glow-rose',
  violet: 'desktop-nav-glow-violet',
};

const LEFT_COUNT = 5;

interface DesktopNavProps {
  activeHref?: string;
  /** When true, nav items open as Mac-style windows instead of navigating */
  useWindowMode?: boolean;
  /** Called when user clicks a nav item in window mode. href is the nav item href. */
  onOpenWindow?: (href: string) => void;
}

function NavItemContent({ item }: { item: (typeof navItems)[0]; isActive?: boolean }) {
  return (
    <>
      <div className="w-12 h-12 flex items-center justify-center">
        <Image
          src={item.icon}
          alt={item.label}
          width={48}
          height={48}
          className={`${GLOW_CLASSES[item.glow]} object-contain`}
        />
      </div>
      <div className="desktop-nav-label-bg inline-block rounded-sm px-px py-0 w-fit bg-transparent transition-all duration-200">
        <span className="desktop-nav-label-glow text-sm font-semibold text-white text-center block whitespace-nowrap">{item.label}</span>
      </div>
    </>
  );
}

export default function DesktopNav({ activeHref, useWindowMode, onOpenWindow }: DesktopNavProps) {
  const leftItems = navItems.slice(0, LEFT_COUNT);
  const rightItems = navItems.slice(LEFT_COUNT);

  const handleClick = (item: (typeof navItems)[0]) => {
    trackNavClick(item.label);
    if (useWindowMode && onOpenWindow) {
      onOpenWindow(item.href);
    }
  };

  const itemClass = (href: string) =>
    `desktop-nav-item flex flex-col items-center gap-2 w-28 transition-opacity hover:opacity-100 ${
      activeHref === href ? 'opacity-100' : 'opacity-80'
    }`;

  return (
    <>
      <div className="absolute left-12 top-[18%] -translate-y-1/2 flex flex-col gap-6 z-[50]">
        {leftItems.map((item) =>
          useWindowMode && onOpenWindow ? (
            <button
              key={item.href}
              type="button"
              onClick={() => handleClick(item)}
              className={`${itemClass(item.href)} bg-transparent border-none cursor-pointer p-0`}
            >
              <NavItemContent item={item} />
            </button>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => trackNavClick(item.label)}
              className={itemClass(item.href)}
            >
              <NavItemContent item={item} />
            </Link>
          )
        )}
      </div>

      <div className="absolute right-12 top-[18%] -translate-y-1/2 flex flex-col gap-6 z-[50]">
        {rightItems.map((item) =>
          useWindowMode && onOpenWindow ? (
            <button
              key={item.href}
              type="button"
              onClick={() => handleClick(item)}
              className={`${itemClass(item.href)} bg-transparent border-none cursor-pointer p-0`}
            >
              <NavItemContent item={item} />
            </button>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => trackNavClick(item.label)}
              className={itemClass(item.href)}
            >
              <NavItemContent item={item} />
            </Link>
          )
        )}
      </div>
    </>
  );
}
