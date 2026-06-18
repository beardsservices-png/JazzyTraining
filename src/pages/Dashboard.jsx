import { Link } from 'react-router-dom';
import { phases } from '../data/curriculum';
import { useProgress } from '../hooks/useProgress';
import ProgressRing from '../components/ProgressRing';
import PhaseCard from '../components/PhaseCard';

export default function Dashboard() {
  const { getPhaseProgress, getOverallProgress } = useProgress();
  const overall = getOverallProgress(phases);

  return (
    <div className="space-y-6">
      <div className="bg-teal-600 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <ProgressRing pct={overall.pct} size={72} strokeWidth={6} color="#ffffff" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display font-bold text-base">{overall.pct}%</span>
            </div>
          </div>
          <div>
            <div className="font-display font-bold text-lg leading-tight">
              {overall.pct === 0
                ? "Welcome, Jazzlyn."
                : overall.pct === 100
                ? "You did it. Fully trained. 🎉"
                : `Keep going, Jazzlyn.`}
            </div>
            <div className="text-teal-100 text-sm font-body mt-0.5">
              {overall.done} of {overall.total} modules complete
            </div>
          </div>
        </div>
      </div>

      <Link
        to="/simulation"
        className="block bg-white border-2 border-teal-200 rounded-2xl p-5 hover:border-teal-400 hover:shadow-md transition-all"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="#0d9488" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
            </svg>
          </div>
          <div>
            <div className="font-display font-bold text-slate-800">The Simulation</div>
            <div className="text-sm text-slate-500 font-body mt-0.5">Follow a real job from first call to final review — interactive, 10 steps.</div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-slate-300 flex-shrink-0 ml-auto">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </Link>

      <div>
        <div className="font-display font-bold text-slate-800 text-base mb-3">Training Phases</div>
        <div className="space-y-3">
          {phases.map(phase => {
            const { done, total, pct } = getPhaseProgress(phase);
            return (
              <PhaseCard key={phase.id} phase={phase} done={done} total={total} pct={pct} />
            );
          })}
        </div>
      </div>

      <Link
        to="/reference"
        className="block bg-white border border-slate-100 rounded-xl p-4 text-center hover:shadow-md transition-all"
      >
        <div className="font-display font-semibold text-slate-700 text-sm">⭐ Quick Reference</div>
        <div className="text-xs text-slate-400 font-body mt-0.5">All system links, contacts, and prompt templates</div>
      </Link>
    </div>
  );
}
