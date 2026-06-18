import { Link } from 'react-router-dom';
import { phases } from '../data/curriculum';
import { useProgress } from '../hooks/useProgress';

export default function PhaseList() {
  const { getPhaseProgress } = useProgress();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display font-bold text-xl text-slate-800">All Phases</h1>
        <p className="text-sm text-slate-500 font-body mt-1">Work through them in order, or jump to what you need.</p>
      </div>

      <div className="space-y-3">
        {phases.map(phase => {
          const { done, total, pct } = getPhaseProgress(phase);
          return (
            <Link
              key={phase.id}
              to={`/phase/${phase.id}`}
              className="block bg-white rounded-xl border border-slate-100 p-4 hover:shadow-md hover:border-slate-200 transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="text-xs font-display font-semibold px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: phase.color }}
                >
                  {phase.badge}
                </span>
                <span className="font-display font-bold text-slate-800 text-sm flex-1">{phase.title}</span>
                {pct === 100 && <span className="text-xs text-green-600 font-body">✓</span>}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-slate-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </div>
              <p className="text-xs text-slate-500 font-body mb-2">{phase.description}</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, backgroundColor: phase.color }}
                  />
                </div>
                <span className="text-xs text-slate-400 font-body">{done}/{total}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
