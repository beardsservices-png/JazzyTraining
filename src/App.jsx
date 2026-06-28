import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import PhaseList from './pages/PhaseList';
import PhaseView from './pages/PhaseView';
import ModuleView from './pages/ModuleView';
import Simulation from './pages/Simulation';
import Reference from './pages/Reference';

export default function App() {
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
          {/* Redirect old/broken module URLs to the first orientation module */}
          <Route path="/module/setup-1" element={<Navigate to="/module/0-1" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
