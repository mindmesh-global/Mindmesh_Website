'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

const INTRO_STORAGE_KEY = 'mindmesh-intro-greeting-seen';
const MASCOT_TOUR_STORAGE_KEY = 'mindmesh-mascot-tour-seen';
const SENSOR_BAR_STORAGE_KEY = 'mindmesh-sensor-bar-seen';
const DROPDOWN_TOOLTIP_STORAGE_KEY = 'mindmesh-dropdown-tooltip-seen';

type OnboardingTourContextType = {
  introCompleted: boolean;
  mascotTourCompleted: boolean;
  sensorBarCompleted: boolean;
  dropdownTooltipCompleted: boolean;
  setIntroCompleted: () => void;
  setMascotTourCompleted: () => void;
  setSensorBarCompleted: () => void;
  setDropdownTooltipCompleted: () => void;
};

const OnboardingTourContext = createContext<OnboardingTourContextType | null>(null);

export function OnboardingTourProvider({ children }: { children: ReactNode }) {
  const [introCompleted, setIntroCompletedState] = useState(false);
  const [mascotTourCompleted, setMascotTourCompletedState] = useState(false);
  const [sensorBarCompleted, setSensorBarCompletedState] = useState(false);
  const [dropdownTooltipCompleted, setDropdownTooltipCompletedState] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;
    try {
      setIntroCompletedState(localStorage.getItem(INTRO_STORAGE_KEY) === 'true');
      setMascotTourCompletedState(localStorage.getItem(MASCOT_TOUR_STORAGE_KEY) === 'true');
      setSensorBarCompletedState(localStorage.getItem(SENSOR_BAR_STORAGE_KEY) === 'true');
      setDropdownTooltipCompletedState(localStorage.getItem(DROPDOWN_TOOLTIP_STORAGE_KEY) === 'true');
    } catch {
      setIntroCompletedState(false);
      setMascotTourCompletedState(false);
      setSensorBarCompletedState(false);
      setDropdownTooltipCompletedState(false);
    }
  }, [mounted]);

  const setIntroCompleted = useCallback(() => {
    try {
      localStorage.setItem(INTRO_STORAGE_KEY, 'true');
      setIntroCompletedState(true);
    } catch {
      setIntroCompletedState(true);
    }
  }, []);

  const setMascotTourCompleted = useCallback(() => {
    try {
      localStorage.setItem(MASCOT_TOUR_STORAGE_KEY, 'true');
      setMascotTourCompletedState(true);
    } catch {
      setMascotTourCompletedState(true);
    }
  }, []);

  const setSensorBarCompleted = useCallback(() => {
    try {
      localStorage.setItem(SENSOR_BAR_STORAGE_KEY, 'true');
      setSensorBarCompletedState(true);
    } catch {
      setSensorBarCompletedState(true);
    }
  }, []);

  const setDropdownTooltipCompleted = useCallback(() => {
    try {
      localStorage.setItem(DROPDOWN_TOOLTIP_STORAGE_KEY, 'true');
      setDropdownTooltipCompletedState(true);
    } catch {
      setDropdownTooltipCompletedState(true);
    }
  }, []);

  return (
    <OnboardingTourContext.Provider value={{ introCompleted, mascotTourCompleted, sensorBarCompleted, dropdownTooltipCompleted, setIntroCompleted, setMascotTourCompleted, setSensorBarCompleted, setDropdownTooltipCompleted }}>
      {children}
    </OnboardingTourContext.Provider>
  );
}

export function useOnboardingTour() {
  return useContext(OnboardingTourContext);
}
