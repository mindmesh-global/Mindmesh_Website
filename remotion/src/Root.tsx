import React from 'react';
import { Composition } from 'remotion';
import { mindMeshPromoConfig } from './MindMeshPromo';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id={mindMeshPromoConfig.id}
      component={mindMeshPromoConfig.component}
      durationInFrames={mindMeshPromoConfig.durationInFrames}
      fps={mindMeshPromoConfig.fps}
      width={mindMeshPromoConfig.width}
      height={mindMeshPromoConfig.height}
      defaultProps={mindMeshPromoConfig.defaultProps}
    />
  </>
);
