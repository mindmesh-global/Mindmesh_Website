import React from 'react';
import { Img, staticFile } from 'remotion';

export type MindMeshLogoVariant = 'gem' | 'tight' | 'icon';

const LOGO_FILES: Record<MindMeshLogoVariant, string> = {
  gem: 'images/Logo/mindmesh-gem-mark.png',
  tight: 'images/Logo/mindmesh-logo-tight.png',
  icon: 'images/Logo/mindmesh-nav-icon.png',
};

type MindMeshLogoProps = {
  variant?: MindMeshLogoVariant;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
};

/** Official MindMesh logo assets from the website `public/images/Logo/` folder. */
export const MindMeshLogo: React.FC<MindMeshLogoProps> = ({
  variant = 'gem',
  width,
  height,
  style,
}) => (
  <Img
    src={staticFile(LOGO_FILES[variant])}
    style={{
      width: width ?? 'auto',
      height: height ?? 'auto',
      objectFit: 'contain',
      ...style,
    }}
  />
);
