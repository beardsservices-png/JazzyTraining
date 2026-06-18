export default function ContentBlock({ section }) {
  switch (section.type) {
    case 'text':
      return (
        <p className="text-slate-700 font-body text-sm leading-relaxed">{section.body}</p>
      );

    case 'tip':
      return (
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 flex gap-3">
          <span className="text-teal-500 text-lg flex-shrink-0">💡</span>
          <p className="text-teal-800 font-body text-sm leading-relaxed">{section.body}</p>
        </div>
      );

    case 'callout':
      return (
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="font-display font-semibold text-slate-800 text-sm mb-1">{section.title}</div>
          <p className="text-slate-600 font-body text-sm leading-relaxed whitespace-pre-line">{section.body}</p>
        </div>
      );

    case 'steps':
      return (
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="font-display font-semibold text-slate-700 text-sm mb-3">Step by step:</div>
          <ol className="space-y-2">
            {section.items.map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-100 text-teal-700 text-xs font-display font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="text-slate-700 font-body text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      );

    case 'example':
      return (
        <div className="bg-slate-50 border-l-4 border-slate-300 rounded-r-xl p-4">
          <div className="font-display font-semibold text-slate-500 text-xs uppercase tracking-wide mb-2">Example</div>
          <p className="text-slate-700 font-body text-sm leading-relaxed whitespace-pre-line">{section.body}</p>
        </div>
      );

    case 'link': {
      const isPlaceholder = section.url.startsWith('[');
      if (isPlaceholder) {
        return (
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 font-display font-semibold text-sm px-4 py-2 rounded-lg">
            🔗 {section.label}
            <span className="font-body font-normal text-amber-500 text-xs">{section.url}</span>
          </div>
        );
      }
      return (
        <a
          href={section.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-display font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
        >
          {section.label}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </a>
      );
    }

    default:
      return null;
  }
}
