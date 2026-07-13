import type { ReactNode } from 'react';
import { MarketingFooter } from './MarketingFooter';
import { MarketingNav } from './MarketingNav';

type MarketingLayoutProps = {
  children: ReactNode;
};

export function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div
      data-marketing-theme="dark"
      className="min-h-screen bg-mm-background font-body text-mm-on-background antialiased"
    >
      <MarketingNav />
      <main className="pt-16">{children}</main>
      <MarketingFooter />
    </div>
  );
}
