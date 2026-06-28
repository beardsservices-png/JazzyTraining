import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import PhaseList from './pages/PhaseList';
import PhaseView from './pages/PhaseView';
import ModuleView from './pages/ModuleView';
import Simulation from './pages/Simulation';
import Reference from './pages/Reference';
import ReferenceTask from './pages/ReferenceTask';

export default function App() {
  const [ready, setReady] = useState(false);

  // Pull saved progress from server before rendering so any device picks up
  // where Jazzlyn left off. Falls back to localStorage if offline or in dev.
  useEffect(() => {
    fetch('/api/progress')
      .then(r => r.json())
      .then(data => {
        Object.entries(data).forEach(([k, v]) => {
          localStorage.setItem(k, typeof v === 'string' ? v : JSON.stringify(v));
        });
      })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/phases" element={<PhaseList />} />
          <Route path="/phase/:phaseId" element={<PhaseView />} />
          <Route path="/module/:moduleId" element={<ModuleView />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/reference" element={<Reference />} />
          <Route path="/reference/:taskId" element={<ReferenceTask />} />
          {/* Redirect old/broken module URLs to the first orientation module */}
          <Route path="/module/setup-1" element={<Navigate to="/module/0-1" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
