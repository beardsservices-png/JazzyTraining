import { Link } from 'react-router-dom';

export default function PhaseCard({ phase, done, total, pct }) {
  return (
    <Link
      to={`/phase/${phase.id}`}
      className="block bg-white rounded-xl border border-slate-100 p-4 hover:shadow-md hover:border-slate-200 transition-all"
    >
      <div className="flex items-center gap-3 mb-3">
        <span
          className="text-xs font-display font-semibold px-2 py-0.5 rounded-full text-white"
          style={{ backgroundColor: phase.color }}
        >
          {phase.badge}
        </span>
        {pct === 100 && (
          <span className="text-xs text-green-600 font-body font-medium">Complete ✓</span>
        )}
      </div>
      <div className="font-display font-bold text-slate-800 text-base mb-1">{phase.title}</div>
      <div className="text-xs text-slate-500 font-body mb-3 line-clamp-2">{phase.description}</div>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, backgroundColor: phase.color }}
          />
        </div>
        <span className="text-xs text-slate-400 font-body flex-shrink-0">{done}/{total}</span>
      </div>
    </Link>
  );
}
