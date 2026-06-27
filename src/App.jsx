import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import PhaseList from './pages/PhaseList';
import PhaseView from './pages/PhaseView';
import ModuleView from './pages/ModuleView';
import Simulation from './pages/Simulation';
import Reference from './pages/Reference';
import ReferenceTask from './pages/ReferenceTask';

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
          <Route path="/reference/:taskId" element={<ReferenceTask />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
