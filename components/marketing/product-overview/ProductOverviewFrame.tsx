'use client';

import type { ReactNode } from 'react';
import { Bell, Settings } from 'lucide-react';
import { THEATER_STICKY_TOP_PX } from '@/lib/marketing-theater-scroll';
import type { ProductOverviewSceneId, ProductOverviewSidebarTab } from '@/lib/marketing-product-overview-data';
import { ProductOverviewNav } from './ProductOverviewNav';

export type ProductOverviewFrameProps = {
  children: ReactNode;
  activeTab: ProductOverviewSidebarTab;
  emailExpanded: boolean;
  appsSecondary?: boolean;
  /** Dim dashboard shell when companions overlay (Scene 4). */
  shellOpacity?: number;
  workspaceTitle?: string;
  workspaceSupporting?: string;
  caption?: string;
  footer?: ReactNode;
  /** Scene progress tabs (P11-T10); sits above caption inside sticky box. */
  progressNav?: ReactNode;
  /** Sticky inside overview scroll wrapper (desktop motion). */
  sticky?: boolean;
  /** Hide full sidebar (legacy stacked cards used a scene chip instead). */
  showSidebar?: boolean;
  /**
   * Show the sidebar below `md` (Linear-style mobile peek of the desktop
   * chrome). Ignored when `showSidebar` is false.
   */
  forceSidebar?: boolean;
  sceneLabel?: string;
  className?: string;
  /**
   * Widened breakout + glow treatment (P12-T04), desktop-only via CSS
   * (`min-width: 1024px`); below that breakpoint this only adds the
   * translateY portion of the mount reveal, no width/scale/glow change.
   */
  wide?: boolean;
  /** Mount reveal state (P12-T02 beat sheet); ignored unless `wide` is set. */
  revealed?: boolean;
  /** Sidebar scene switching (same as progress tabs). */
  onSelectScene?: (scene: ProductOverviewSceneId) => void;
  /** Active email folder (passed through to Nav for highlight). */
  activeFolder?: string;
  /** Sidebar email folder switching. */
  onSelectFolder?: (folder: string) => void;
};

/**
 * Persistent MindMesh desktop chrome for the homepage product overview (P11-T04 / P11-T05).
 * Uses marketing tokens; controls are decorative or scene-driven.
 */
export function ProductOverviewFrame({
  children,
  activeTab,
  emailExpanded,
  appsSecondary = false,
  shellOpacity = 1,
  workspaceTitle,
  workspaceSupporting,
  caption,
  footer,
  progressNav,
  sticky = true,
  showSidebar = true,
  forceSidebar = false,
  sceneLabel,
  className,
  wide = false,
  revealed = true,
  onSelectScene,
  activeFolder,
  onSelectFolder,
}: ProductOverviewFrameProps) {
  const outerClassName = sticky ? 'absolute inset-0' : 'relative';
  const sidebarVisibleBelowMd = showSidebar && forceSidebar;

  return (
    <div
      className={`${outerClassName}${className ? ` ${className}` : ''}`}
      data-product-overview-frame
    >
      {/*
        The breakout wrapper must be a normal-flow box, not the
        absolute/inset-0 element above: overriding `width` on an
        already-inset (left+right both 0) absolutely positioned box hits
        CSS's over-constrained abspos resolution and recomputes `left` out
        from under the centering math. Nesting a plain block here keeps the
        well-known `width: 100vw; margin-left: calc(50% - 50vw)` full-bleed
        formula correct (P12-T04 / P12-T06).
      */}
      <div className="relative" data-overview-frame-bleed={wide ? 'true' : undefined}>
        <div
          className={sticky ? 'theater-sticky-frame' : undefined}
          style={sticky ? { top: THEATER_STICKY_TOP_PX } : undefined}
          data-overview-frame-wide={wide ? 'true' : undefined}
          data-overview-revealed={wide ? (revealed ? 'true' : 'false') : undefined}
        >
          {/* Ambient glow — sits behind the window frame */}
          <div
            className="pointer-events-none absolute -inset-12 z-[0] blur-3xl"
            style={{
              background:
                'radial-gradient(ellipse 75% 55% at 50% 44%, rgba(37,99,235,0.22) 0%, rgba(99,60,220,0.1) 45%, transparent 72%)',
            }}
            aria-hidden
          />

          <div
            data-light-window=""
            className="theater-frame-chrome relative z-[1] flex flex-col overflow-hidden rounded-xl"
            style={{
              border: '1px solid rgba(0,0,0,0.18)',
              boxShadow:
                '0 0 0 0.5px rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.45), 0 20px 56px rgba(0,0,0,0.55), 0 52px 100px rgba(0,0,0,0.35)',
            }}
          >
            {/* macOS light-mode title bar */}
            <div
              className="relative flex h-8 shrink-0 items-center px-3"
              style={{
                background: 'linear-gradient(180deg, #f0f0f2 0%, #e8e8ea 100%)',
                borderBottom: '1px solid rgba(0,0,0,0.12)',
                opacity: shellOpacity,
              }}
            >
              {/* Traffic lights */}
              <div className="flex items-center gap-2" aria-hidden>
                <span className="h-3 w-3 rounded-full" style={{ background: '#FF5F57' }} />
                <span className="h-3 w-3 rounded-full" style={{ background: '#FEBC2E' }} />
                <span className="h-3 w-3 rounded-full" style={{ background: '#28C840' }} />
              </div>

              {/* Centered app title */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium" style={{ color: 'rgba(0,0,0,0.7)' }}>
                  MindMesh
                </span>
                {sceneLabel && !sidebarVisibleBelowMd ? (
                  <span className="ml-2 truncate rounded-md bg-mm-primary/10 px-2 py-0.5 text-xs text-mm-primary md:hidden">
                    {sceneLabel}
                  </span>
                ) : null}
              </div>

              {/* Right controls */}
              <div className="ml-auto hidden shrink-0 items-center gap-2.5 sm:flex" style={{ color: 'rgba(0,0,0,0.35)' }} aria-hidden>
                <Bell className="h-3.5 w-3.5" />
                <Settings className="h-3.5 w-3.5" />
              </div>
            </div>

            <div className="flex min-h-0 flex-1 overflow-hidden">
              {showSidebar ? (
                <div
                  className={sidebarVisibleBelowMd ? 'flex' : 'hidden md:flex'}
                  style={{ opacity: shellOpacity }}
                >
                  <ProductOverviewNav
                    activeTab={activeTab}
                    emailExpanded={emailExpanded}
                    appsSecondary={appsSecondary}
                    onSelectScene={onSelectScene}
                    activeFolder={activeFolder}
                    onSelectFolder={onSelectFolder}
                  />
                </div>
              ) : null}

              <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-mm-surface">
                {workspaceTitle || workspaceSupporting ? (
                  <header
                    className="shrink-0 border-b border-mm-outline-variant/40 px-4 py-3 md:px-5"
                    style={{ opacity: shellOpacity }}
                  >
                    {workspaceTitle ? (
                      <h3 className="text-base font-semibold text-mm-on-surface md:text-lg">
                        {workspaceTitle}
                      </h3>
                    ) : null}
                    {workspaceSupporting ? (
                      <p className="mt-0.5 text-sm text-mm-on-surface-variant">
                        {workspaceSupporting}
                      </p>
                    ) : null}
                  </header>
                ) : null}
                <div className="relative min-h-0 flex-1 overflow-hidden p-4 md:p-5">
                  {children}
                </div>
              </div>
            </div>
          </div>

          {progressNav || caption || footer ? (
            <div className="mt-12 flex flex-col items-center space-y-4 text-center lg:mt-16">
              {progressNav ? (
                <div className="flex w-full max-w-3xl justify-center">{progressNav}</div>
              ) : null}
              {caption ? (
                <p className="max-w-2xl text-sm text-mm-on-surface-variant md:text-base">
                  {caption}
                </p>
              ) : null}
              {footer ? (
                <div className="flex w-full max-w-3xl justify-center">{footer}</div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
