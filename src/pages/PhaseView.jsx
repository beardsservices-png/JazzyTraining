import { useParams, Link } from 'react-router-dom';
import { phases } from '../data/curriculum';
import { useProgress } from '../hooks/useProgress';
import ModuleCard from '../components/ModuleCard';

export default function PhaseView() {
  const { phaseId } = useParams();
  const phase = phases.find(p => p.id === phaseId);
  const { getPhaseProgress, isComplete } = useProgress();

  if (!phase) return (
    <div className="text-center py-12">
      <div className="text-slate-400 font-body">Phase not found.</div>
      <Link to="/" className="text-teal-600 text-sm font-body mt-2 inline-block">← Back home</Link>
    </div>
  );

  const { done, total, pct } = getPhaseProgress(phase);

  return (
    <div className="space-y-5">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 font-body">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        All Phases
      </Link>

      <div className="bg-white rounded-2xl border border-slate-100 p-5">
        <span
          className="text-xs font-display font-semibold px-2 py-0.5 rounded-full text-white inline-block mb-2"
          style={{ backgroundColor: phase.color }}
        >
          {phase.badge}
        </span>
        <h1 className="font-display font-bold text-xl text-slate-800 mb-1">{phase.title}</h1>
        <p className="text-slate-500 font-body text-sm mb-4">{phase.description}</p>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, backgroundColor: phase.color }}
            />
          </div>
          <span className="text-sm font-body text-slate-500">{done}/{total} complete</span>
        </div>
      </div>

      <div className="space-y-2">
        {phase.modules.map(module => (
          <ModuleCard
            key={module.id}
            module={module}
            phaseColor={phase.color}
            isComplete={isComplete(module.id)}
          />
        ))}
      </div>
    </div>
  );
}
