import { useState, useEffect, useCallback } from 'react';

const PROGRESS_KEY = 'jazzy_bhs_progress';

function loadProgress() {
  try {
    const stored = localStorage.getItem(PROGRESS_KEY);
    return stored ? JSON.parse(stored) : { completedModules: [] };
  } catch {
    return { completedModules: [] };
  }
}

// Collect all jazzy_ localStorage keys and push to server
function syncToServer() {
  const data = {}
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key?.startsWith('jazzy_')) continue
    try { data[key] = JSON.parse(localStorage.getItem(key)) }
    catch { data[key] = localStorage.getItem(key) }
  }
  fetch('/api/progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).catch(() => {})
}

export function useProgress() {
  const [progress, setProgress] = useState(loadProgress);

  const markComplete = useCallback((moduleId) => {
    setProgress(prev => {
      if (prev.completedModules.includes(moduleId)) return prev;
      const next = { ...prev, completedModules: [...prev.completedModules, moduleId] };
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
      syncToServer();
      return next;
    });
  }, []);

  const unmarkComplete = useCallback((moduleId) => {
    setProgress(prev => {
      const next = { ...prev, completedModules: prev.completedModules.filter(id => id !== moduleId) };
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
      syncToServer();
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

  return { progress, markComplete, unmarkComplete, isComplete, getPhaseProgress, getOverallProgress };
}

export function useChecklistProgress(moduleId) {
  const key = `jazzy_checklist_${moduleId}`;
  const [checked, setChecked] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : {};
    } catch { return {}; }
  });

  const toggle = useCallback((i) => {
    setChecked(prev => {
      const next = { ...prev, [i]: !prev[i] };
      localStorage.setItem(key, JSON.stringify(next));
      syncToServer();
      return next;
    });
  }, [key]);

  return { checked, toggle };
}

export function useModuleNotes(moduleId) {
  const key = `jazzy_notes_${moduleId}`;
  const [notes, setNotes] = useState(() => {
    try { return localStorage.getItem(key) || ''; } catch { return ''; }
  });

  const saveNotes = useCallback((text) => {
    setNotes(text);
    localStorage.setItem(key, text);
    syncToServer();
  }, [key]);

  return { notes, saveNotes };
}

export function useSimProgress(scenarioId) {
  const key = `jazzy_sim_${scenarioId}`;
  const [step, setStep] = useState(0);

  useEffect(() => {
    try {
      const stored = parseInt(localStorage.getItem(key) || '0', 10);
      setStep(stored);
    } catch { setStep(0); }
  }, [key]);

  const advanceStep = useCallback((nextStep) => {
    setStep(nextStep);
    if (scenarioId) {
      localStorage.setItem(key, String(nextStep));
      syncToServer();
    }
  }, [key, scenarioId]);

  const resetSim = useCallback(() => {
    setStep(0);
    if (scenarioId) {
      localStorage.removeItem(key);
      syncToServer();
    }
  }, [key, scenarioId]);

  return { step, advanceStep, resetSim };
}
