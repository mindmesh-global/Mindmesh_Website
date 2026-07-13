import React from 'react';
import { AbsoluteFill } from 'remotion';
import { AppWindow } from '../components/AppWindow';
import { DashboardOverviewMock } from '../components/DashboardOverviewMock';
import { SceneShell } from '../components/SceneShell';
import { SCENE_DURATIONS } from '../theme';

export const Scene4Dashboard: React.FC = () => {
  const duration = SCENE_DURATIONS.scene4;

  return (
    <SceneShell duration={duration}>
      <AppWindow title="MindMesh — Dashboard" height="92%" width="94%">
        <AbsoluteFill style={{ padding: 14, overflow: 'hidden' }}>
          <DashboardOverviewMock />
        </AbsoluteFill>
      </AppWindow>
    </SceneShell>
  );
};
