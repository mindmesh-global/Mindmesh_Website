'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSectionHover } from '@/context/SectionHoverContext';
import { useMindMeshContainer } from '@/context/MindMeshContainerContext';

const PAD = 8;
const HIGHLIGHT_RADIUS = 12; // matches rounded-xl on section boxes

export function SectionDimOverlay() {
  const sectionHover = useSectionHover();
  const hoveredSectionId = sectionHover?.hoveredSectionId ?? null;
  const cutoutRect = sectionHover?.cutoutRect ?? null;
  const mindMeshContainer = useMindMeshContainer();
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  // Re-render when container ref becomes available (refs set after mount)
  useEffect(() => {
    const el = mindMeshContainer?.containerRef?.current ?? null;
    setPortalTarget(el);
  }, [mindMeshContainer?.containerRef]);

  const container = mindMeshContainer?.containerRef?.current;
  const isInsideMindMesh = !!portalTarget && portalTarget !== document.body;

  const r =
    cutoutRect && hoveredSectionId
      ? (() => {
          if (isInsideMindMesh && container) {
            const cr = container.getBoundingClientRect();
            return {
              top: Math.max(0, cutoutRect.top - PAD - cr.top),
              left: Math.max(0, cutoutRect.left - PAD - cr.left),
              bottom: Math.min(cr.height, cutoutRect.bottom + PAD - cr.top),
              right: Math.min(cr.width, cutoutRect.right + PAD - cr.left),
              height: cr.height,
              width: cr.width,
            };
          }
          return {
            top: Math.max(0, cutoutRect.top - PAD),
            left: Math.max(0, cutoutRect.left - PAD),
            bottom: cutoutRect.bottom + PAD,
            right: cutoutRect.right + PAD,
            height: typeof window !== 'undefined' ? window.innerHeight : 0,
            width: typeof window !== 'undefined' ? window.innerWidth : 0,
          };
        })()
      : null;

  if (!hoveredSectionId || !r || typeof document === 'undefined') return null;

  // When inside MindMesh, wait for portal target to avoid fullscreen flash
  if (mindMeshContainer && !portalTarget) return null;

  const target = portalTarget ?? document.body;
  const cutoutW = r.right - r.left;
  const cutoutH = r.bottom - r.top;
  const midHeight = cutoutH;

  const transitionClass = 'transition-all duration-200 ease-out';
  const cutoutStyle = {
    left: r.left,
    top: r.top,
    width: cutoutW,
    height: cutoutH,
    borderRadius: HIGHLIGHT_RADIUS,
    background: 'transparent',
    boxShadow: '0 0 0 9999px rgba(0,0,0,0.65)',
  };

  const overlay = isInsideMindMesh ? (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${transitionClass}`} style={{ zIndex: 1 }} aria-hidden>
      <div
        className={`absolute ${transitionClass}`}
        style={cutoutStyle}
      />
    </div>
  ) : (
    <div className={`fixed inset-0 pointer-events-none ${transitionClass}`} style={{ zIndex: 2147483646 }} aria-hidden>
      <div className={`absolute left-0 right-0 top-0 backdrop-blur-md ${transitionClass}`} style={{ height: r.top, backgroundColor: 'rgba(0,0,0,0.65)' }} />
      <div className={`absolute left-0 right-0 bottom-0 backdrop-blur-md ${transitionClass}`} style={{ top: r.bottom, height: `calc(100vh - ${r.bottom}px)`, backgroundColor: 'rgba(0,0,0,0.65)' }} />
      <div className={`absolute backdrop-blur-md ${transitionClass}`} style={{ left: 0, width: r.left, top: r.top, height: midHeight, backgroundColor: 'rgba(0,0,0,0.65)' }} />
      <div className={`absolute backdrop-blur-md ${transitionClass}`} style={{ left: r.right, width: `calc(100vw - ${r.right}px)`, top: r.top, height: midHeight, backgroundColor: 'rgba(0,0,0,0.65)' }} />
    </div>
  );

  return createPortal(overlay, target);
}
