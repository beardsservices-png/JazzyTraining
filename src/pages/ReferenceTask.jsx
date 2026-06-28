import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTask, tasks, categories } from '../data/referenceTasks';

function CategoryLabel({ id }) {
  const cat = categories.find((c) => c.id === id);
  if (!cat) return null;
  return (
    <span className="inline-flex items-center gap-1 text-xs font-body font-medium text-teal-700 bg-teal-50 border border-teal-100 rounded-full px-2.5 py-1">
      <span>{cat.icon}</span>
      {cat.title}
    </span>
  );
}

export default function ReferenceTask() {
  const { taskId } = useParams();
  const task = getTask(taskId);
  const [copied, setCopied] = useState(false);

  if (!task) {
    return (
      <div className="space-y-4">
        <p className="text-slate-700 font-body">Hmm — that task doesn't exist.</p>
        <Link to="/reference" className="inline-flex items-center gap-1 text-teal-600 font-display font-semibold text-sm">
          ← Back to all tasks
        </Link>
      </div>
    );
  }

  const copyPrompt = () => {
    navigator.clipboard.writeText(task.prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  const related = (task.related || []).map((id) => tasks.find((t) => t.id === id)).filter(Boolean);

  return (
    <div className="space-y-6 pb-4">
      {/* Back */}
      <Link to="/reference" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-teal-600 font-body text-sm font-medium transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        All tasks
      </Link>

      {/* Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <CategoryLabel id={task.category} />
          {task.frequency && (
            <span className="inline-flex items-center gap-1 text-xs font-body font-medium text-slate-500 bg-slate-100 rounded-full px-2.5 py-1">
              🔁 {task.frequency}
            </span>
          )}
        </div>
        <div className="flex items-start gap-3">
          <span className="text-3xl leading-none flex-shrink-0">{task.icon}</span>
          <div>
            <h1 className="font-display font-bold text-2xl text-slate-800 leading-tight">{task.title}</h1>
            <p className="text-slate-500 font-body text-sm mt-1">{task.summary}</p>
          </div>
        </div>
      </div>

      {/* Why it matters */}
      {task.why && (
        <div className="bg-gradient-to-br from-teal-50 to-white border border-teal-200 rounded-2xl p-4">
          <div className="font-display font-semibold text-teal-800 text-sm mb-1 flex items-center gap-1.5">
            <span>🎯</span> Why this matters
          </div>
          <p className="text-teal-900/80 font-body text-sm leading-relaxed">{task.why}</p>
        </div>
      )}

      {/* Step by step */}
      {task.sop?.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <div className="font-display font-bold text-slate-700 text-sm uppercase tracking-wide mb-4">Step by step</div>
          <ol className="space-y-0">
            {task.sop.map((step, i) => (
              <li key={i} className="flex items-stretch">
                <div className="flex flex-col items-center flex-shrink-0 mr-3">
                  <span className="w-7 h-7 rounded-full bg-teal-500 text-white text-sm font-display font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  {i < task.sop.length - 1 && <div className="w-0.5 bg-teal-200 flex-1 my-1" />}
                </div>
                <div className="pb-4 min-w-0">
                  <div className="text-slate-800 font-body font-semibold text-sm leading-snug">{step.action}</div>
                  {step.detail && (
                    <div className="text-slate-500 font-body text-sm leading-relaxed mt-0.5">{step.detail}</div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Best practices */}
      {task.best?.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <div className="font-display font-bold text-slate-700 text-sm uppercase tracking-wide mb-3 flex items-center gap-1.5">
            <span className="text-green-500">✓</span> Best practices
          </div>
          <ul className="space-y-2">
            {task.best.map((b, i) => (
              <li key={i} className="flex gap-2.5 text-slate-700 font-body text-sm leading-relaxed">
                <span className="text-green-500 flex-shrink-0 mt-0.5">✓</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Watch out */}
      {task.watch?.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <div className="font-display font-bold text-amber-700 text-sm uppercase tracking-wide mb-3 flex items-center gap-1.5">
            <span>⚠️</span> Watch out
          </div>
          <ul className="space-y-2">
            {task.watch.map((w, i) => (
              <li key={i} className="flex gap-2.5 text-amber-900/80 font-body text-sm leading-relaxed">
                <span className="text-amber-500 flex-shrink-0 mt-0.5">•</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Claude prompt */}
      {task.prompt && (
        <div className="rounded-2xl overflow-hidden border border-slate-800">
          <div className="bg-slate-800 px-4 py-2.5 flex items-center gap-2">
            <span>🧠</span>
            <div className="font-display font-semibold text-slate-200 text-xs">Use this with Claude</div>
          </div>
          <div className="bg-slate-900 p-4">
            <p className="text-slate-300 font-mono text-xs leading-relaxed whitespace-pre-line">{task.prompt}</p>
            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={copyPrompt}
                className={`text-xs font-display font-semibold px-3 py-1.5 rounded-lg transition-all ${
                  copied ? 'bg-green-600 text-white' : 'bg-teal-700 hover:bg-teal-600 text-white'
                }`}
              >
                {copied ? '✓ Copied!' : 'Copy prompt'}
              </button>
              <a
                href="https://claude.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 hover:text-teal-300 font-body text-xs font-semibold transition-colors"
              >
                Open Claude.ai →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Tools / links */}
      {task.tools?.length > 0 && (
        <div>
          <div className="font-display font-bold text-slate-700 text-sm uppercase tracking-wide mb-2">Links &amp; tools</div>
          <div className="flex flex-wrap gap-2">
            {task.tools.map((tool, i) =>
              tool.url ? (
                <a
                  key={i}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:border-teal-300 hover:shadow-sm text-slate-700 font-body text-sm font-medium px-3 py-2 rounded-xl transition-all"
                >
                  {tool.label}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-slate-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              ) : (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-600 font-body text-xs px-3 py-2 rounded-xl"
                  title="Brian still needs to fill this in"
                >
                  {tool.label}: {tool.note}
                </span>
              )
            )}
          </div>
        </div>
      )}

      {/* Related tasks */}
      {related.length > 0 && (
        <div>
          <div className="font-display font-bold text-slate-700 text-sm uppercase tracking-wide mb-2">Related tasks</div>
          <div className="space-y-2">
            {related.map((r) => (
              <Link
                key={r.id}
                to={`/reference/${r.id}`}
                className="flex items-center gap-3 bg-white rounded-xl border border-slate-100 p-3 hover:border-teal-200 hover:shadow-sm transition-all"
              >
                <span className="text-xl flex-shrink-0">{r.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-semibold text-slate-800 text-sm">{r.title}</div>
                  <div className="text-xs text-slate-400 font-body truncate">{r.summary}</div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-slate-300 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
