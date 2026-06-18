import { useState, useCallback } from 'react';

const PROGRESS_KEY = 'jazzy_bhs_progress';
const SIM_KEY = 'jazzy_sim_step';

function loadProgress() {
  try {
    const stored = localStorage.getItem(PROGRESS_KEY);
    return stored ? JSON.parse(stored) : { completedModules: [] };
  } catch {
    return { completedModules: [] };
  }
}

export function useProgress() {
  const [progress, setProgress] = useState(loadProgress);

  const markComplete = useCallback((moduleId) => {
    setProgress(prev => {
      if (prev.completedModules.includes(moduleId)) return prev;
      const next = { ...prev, completedModules: [...prev.completedModules, moduleId] };
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isComplete = useCallback((moduleId) => {
    return progress.completedModules.includes(moduleId);
  }, [progress]);

  const getPhaseProgress = useCallback((phase) => {
    const total = phase.modules.length;
    const done = phase.modules.filter(m => progress.completedModules.includes(m.id)).length;
    return { done, total, pct: total === 0 ? 0 : Math.round((done / total) * 100) };
  }, [progress]);

  const getOverallProgress = useCallback((phases) => {
    const total = phases.reduce((a, p) => a + p.modules.length, 0);
    const done = progress.completedModules.length;
    return { done, total, pct: total === 0 ? 0 : Math.round((done / total) * 100) };
  }, [progress]);

  return { progress, markComplete, isComplete, getPhaseProgress, getOverallProgress };
}

export function useSimProgress() {
  const [step, setStep] = useState(() => {
    try { return parseInt(localStorage.getItem(SIM_KEY) || '0', 10); } catch { return 0; }
  });

  const advanceStep = useCallback((nextStep) => {
    setStep(nextStep);
    localStorage.setItem(SIM_KEY, String(nextStep));
  }, []);

  const resetSim = useCallback(() => {
    setStep(0);
    localStorage.removeItem(SIM_KEY);
  }, []);

  return { step, advanceStep, resetSim };
}
