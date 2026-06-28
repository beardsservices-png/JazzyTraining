import { useState } from 'react';

export default function ContentBlock({ section }) {
  const [copied, setCopied] = useState(null);

  const copyText = (text, idx) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(idx);
      setTimeout(() => setCopied(null), 2000);
    });
  };

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
          <ol className="space-y-0">
            {section.items.map((item, i) => (
              <li key={i} className="flex items-stretch">
                <div className="flex flex-col items-center flex-shrink-0 mr-3">
                  <span className="w-6 h-6 rounded-full bg-teal-500 text-white text-xs font-display font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  {i < section.items.length - 1 && (
                    <div className="w-0.5 bg-teal-200 flex-1 my-1" />
                  )}
                </div>
                <span className="text-slate-700 font-body text-sm leading-relaxed pb-3">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      );

    case 'flow':
      return (
        <div className="rounded-xl overflow-hidden border border-slate-200">
          {section.title && (
            <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200">
              <div className="font-display font-semibold text-slate-700 text-sm">{section.title}</div>
            </div>
          )}
          <div className="p-3 bg-white flex flex-col items-center">
            {section.items.map((item, i) => (
              <div key={i} className="w-full flex flex-col items-center">
                <div className="w-full flex items-center gap-3 bg-gradient-to-r from-teal-50 to-white border border-teal-200 rounded-xl px-3 py-2.5">
                  <span className="w-6 h-6 rounded-full bg-teal-500 text-white text-xs font-display font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-slate-700 font-body text-sm leading-snug">{item}</span>
                </div>
                {i < section.items.length - 1 && (
                  <div className="flex flex-col items-center py-0.5">
                    <div className="w-px h-2 bg-teal-300" />
                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
                      <path d="M1 1L6 6L11 1" stroke="#5eead4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );

    case 'grid':
      return (
        <div className="grid grid-cols-2 gap-2">
          {section.items.map((item, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col gap-1">
              <span className="text-xl">{item.icon}</span>
              <div className="font-display font-semibold text-slate-800 text-xs leading-tight">{item.title}</div>
              <div className="text-slate-500 font-body text-xs leading-relaxed">{item.body}</div>
            </div>
          ))}
        </div>
      );

    case 'prompt-bank':
      return (
        <div className="rounded-xl overflow-hidden border border-slate-800">
          {section.title && (
            <div className="bg-slate-800 px-4 py-2.5 border-b border-slate-700">
              <div className="font-display font-semibold text-slate-200 text-xs">{section.title}</div>
            </div>
          )}
          <div className="bg-slate-900 divide-y divide-slate-800">
            {section.items.map((prompt, i) => (
              <div key={i} className="flex items-start justify-between gap-3 px-3 py-3">
                <p className="text-slate-300 font-mono text-xs leading-relaxed flex-1">{prompt}</p>
                <button
                  onClick={() => copyText(prompt, i)}
                  className={`text-xs font-display font-semibold px-2.5 py-1 rounded-lg flex-shrink-0 transition-all ${
                    copied === i
                      ? 'bg-green-600 text-white'
                      : 'bg-teal-700 hover:bg-teal-600 text-white'
                  }`}
                >
                  {copied === i ? '✓' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
          <div className="bg-slate-900 px-3 pb-3">
            <a
              href="https://claude.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-teal-400 hover:text-teal-300 font-body text-xs font-semibold transition-colors"
            >
              Open Claude.ai to paste →
            </a>
          </div>
        </div>
      );

    case 'example':
      return (
        <div className="bg-slate-50 border-l-4 border-slate-300 rounded-r-xl p-4">
          <div className="font-display font-semibold text-slate-500 text-xs uppercase tracking-wide mb-2">Example</div>
          <p className="text-slate-700 font-body text-sm leading-relaxed whitespace-pre-line">{section.body}</p>
        </div>
      );

    case 'link':
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

    default:
      return null;
  }
}
