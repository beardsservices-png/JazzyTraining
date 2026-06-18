import { Link } from 'react-router-dom';

export default function ModuleCard({ module, phaseColor, isComplete }) {
  return (
    <Link
      to={`/module/${module.id}`}
      className={`block rounded-xl border p-4 transition-all hover:shadow-md ${
        isComplete
          ? 'bg-green-50 border-green-200'
          : 'bg-white border-slate-100 hover:border-teal-200'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex-shrink-0">
          {isComplete ? (
            <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-4 h-4">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
              </svg>
            </div>
          ) : (
            <div className="w-7 h-7 rounded-full border-2 border-slate-200 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: phaseColor }} />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-display font-semibold text-sm text-slate-800 leading-snug">{module.title}</div>
          <div className="text-xs text-slate-400 font-body mt-0.5">{module.readTime} read</div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-slate-300 flex-shrink-0 mt-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </div>
    </Link>
  );
}
