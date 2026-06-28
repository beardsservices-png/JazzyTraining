import { useEffect } from 'react';
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
  useEffect(() => {
    fetch('/api/progress')
      .then(r => r.json())
      .then(data => {
        let changed = false;
        Object.entries(data).forEach(([k, v]) => {
          const val = typeof v === 'string' ? v : JSON.stringify(v);
          if (localStorage.getItem(k) !== val) {
            localStorage.setItem(k, val);
            changed = true;
          }
        });
        if (changed) window.location.reload();
      })
      .catch(() => {});
  }, []);

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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
