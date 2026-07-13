import React from 'react';
import { Series } from 'remotion';
import './fonts';
import { BackgroundMusic } from './components/BackgroundMusic';
import { Scene1DesktopLaunch } from './scenes/Scene1DesktopLaunch';
import { Scene2SensorBar } from './scenes/Scene2SensorBar';
import { Scene3BrainQuery } from './scenes/Scene3BrainQuery';
import { Scene4Dashboard } from './scenes/Scene4Dashboard';
import { Scene5InboxCalendar } from './scenes/Scene5InboxCalendar';
import { Scene6DailyNarrative } from './scenes/Scene6DailyNarrative';
import { Scene7LogoCombo } from './scenes/Scene7LogoCombo';
import { Scene8DownloadCTA } from './scenes/Scene8DownloadCTA';
import { SCENE_DURATIONS, TOTAL_FRAMES } from './theme';

export const MindMeshPromo: React.FC = () => (
  <>
    <BackgroundMusic />
    <Series>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.scene1}>
        <Scene1DesktopLaunch />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.scene2}>
        <Scene2SensorBar />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.scene3}>
        <Scene3BrainQuery />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.scene4}>
        <Scene4Dashboard />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.scene5}>
        <Scene5InboxCalendar />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.scene6}>
        <Scene6DailyNarrative />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.scene7}>
        <Scene7LogoCombo />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.scene8}>
        <Scene8DownloadCTA />
      </Series.Sequence>
    </Series>
  </>
);

export const mindMeshPromoConfig = {
  id: 'MindMeshPromo',
  component: MindMeshPromo,
  durationInFrames: TOTAL_FRAMES,
  fps: 30,
  width: 1080,
  height: 700,
  defaultProps: {},
};
