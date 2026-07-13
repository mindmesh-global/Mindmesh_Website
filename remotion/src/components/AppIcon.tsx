import React from 'react';
import { Img, staticFile } from 'remotion';

type AppIconProps = {
  src: string;
  size?: number;
  style?: React.CSSProperties;
};

export const AppIcon: React.FC<AppIconProps> = ({ src, size = 32, style }) => (
  <Img
    src={staticFile(src)}
    style={{
      width: size,
      height: size,
      objectFit: 'contain',
      ...style,
    }}
  />
);
