'use client';

import type { ReactNode } from 'react';
import ConditionalOverlays from '@/components/ConditionalOverlays';
import GlobalSiteFooter from '@/components/layout/GlobalSiteFooter';
import { HomeSectionProvider } from '@/context/HomeSectionContext';
import { UIOverlayProvider } from '@/context/UIOverlayContext';
import { OnboardingTourProvider } from '@/context/OnboardingTourContext';
import CursorProvider from '@/components/CursorProvider';
import { CustomCursorProvider } from '@/context/CustomCursorContext';
import CustomContextMenu from '@/components/CustomContextMenu';
import { DashboardViewModeRoot } from '@/components/DashboardViewModeRoot';

type LegacyAppShellProps = {
  children: ReactNode;
};

/** Full legacy provider tree for non-marketing routes (P2-T06). */
export function LegacyAppShell({ children }: LegacyAppShellProps) {
  return (
    <HomeSectionProvider>
      <UIOverlayProvider>
        <OnboardingTourProvider>
          <CustomCursorProvider>
            <CursorProvider>
              <DashboardViewModeRoot>
                {children}
                <ConditionalOverlays />
                <GlobalSiteFooter />
              </DashboardViewModeRoot>
              <CustomContextMenu />
            </CursorProvider>
          </CustomCursorProvider>
        </OnboardingTourProvider>
      </UIOverlayProvider>
    </HomeSectionProvider>
  );
}
