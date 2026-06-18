export default function Checklist({ items, checked, onToggle }) {
  const allDone = items.every((_, i) => checked[i]);

  return (
    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
      <div className="font-display font-semibold text-sm text-slate-700 mb-3">Before you move on:</div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => onToggle(i)}
            className="w-full flex items-start gap-3 text-left group"
          >
            <div className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
              checked[i] ? 'bg-teal-600 border-teal-600' : 'border-slate-300 group-hover:border-teal-400'
            }`}>
              {checked[i] && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-3 h-3">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <span className={`text-sm font-body leading-snug ${checked[i] ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
              {item}
            </span>
          </button>
        ))}
      </div>
      {allDone && (
        <div className="mt-3 text-xs text-teal-600 font-body font-semibold flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
          </svg>
          All checked — you're ready to mark this complete.
        </div>
      )}
    </div>
  );
}
