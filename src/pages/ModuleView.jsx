import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { phases } from '../data/curriculum';
import { useProgress, useChecklistProgress } from '../hooks/useProgress';
import ContentBlock from '../components/ContentBlock';
import Checklist from '../components/Checklist';

function AskClaude({ moduleName, phaseTitle }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const prompt = `I'm learning to manage Beard's Home Services operations remotely. I'm currently studying "${moduleName}" (${phaseTitle}). I have a question: [type your question here]`;

  const copy = () => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 z-50 w-12 h-12 bg-teal-600 hover:bg-teal-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all active:scale-95"
        title="Ask Claude about this module"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="relative w-full max-w-2xl bg-white rounded-t-2xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-1">
                <div className="font-display font-bold text-slate-800">Ask Claude</div>
                <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-600 text-2xl leading-none w-8 h-8 flex items-center justify-center">×</button>
              </div>
              <div className="text-slate-500 font-body text-xs mb-3">
                Copy this prompt → open Claude.ai → paste it → edit the question at the end.
              </div>
              <div className="bg-slate-900 rounded-xl p-3 mb-3">
                <p className="text-slate-200 font-mono text-xs leading-relaxed">{prompt}</p>
              </div>
              <div className="flex gap-2 pb-4">
                <button
                  onClick={copy}
                  className={`flex-1 py-3 font-display font-bold text-sm rounded-xl transition-all ${
                    copied ? 'bg-green-500 text-white' : 'bg-teal-600 hover:bg-teal-700 text-white active:scale-95'
                  }`}
                >
                  {copied ? '✓ Copied!' : 'Copy Prompt'}
                </button>
                <a
                  href="https://claude.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-display font-bold text-sm rounded-xl transition-colors text-center"
                >
                  Open Claude →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function ModuleView() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { markComplete, unmarkComplete, isComplete } = useProgress();
  const { checked, toggle } = useChecklistProgress(moduleId);
  const [justCompleted, setJustCompleted] = useState(false);

  let foundModule = null;
  let foundPhase = null;
  for (const phase of phases) {
    const mod = phase.modules.find(m => m.id === moduleId);
    if (mod) { foundModule = mod; foundPhase = phase; break; }
  }

  if (!foundModule) return (
    <div className="text-center py-12">
      <div className="text-slate-400 font-body">Module not found.</div>
      <Link to="/" className="text-teal-600 text-sm font-body mt-2 inline-block">← Back home</Link>
    </div>
  );

  const complete = isComplete(moduleId);

  const handleMarkComplete = () => {
    markComplete(moduleId);
    setJustCompleted(true);
    setTimeout(() => {
      navigate(`/phase/${foundPhase.id}`);
    }, 1200);
  };

  const allModules = phases.flatMap(p => p.modules.map(m => ({ ...m, phaseId: p.id })));
  const currentIdx = allModules.findIndex(m => m.id === moduleId);
  const nextModule = allModules[currentIdx + 1];

  return (
    <div className="space-y-5">
      <AskClaude moduleName={foundModule.title} phaseTitle={foundPhase.title} />

      <Link
        to={`/phase/${foundPhase.id}`}
        className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 font-body"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        {foundPhase.title}
      </Link>

      <div>
        <span
          className="text-xs font-display font-semibold px-2 py-0.5 rounded-full text-white inline-block mb-2"
          style={{ backgroundColor: foundPhase.color }}
        >
          {foundPhase.badge}
        </span>
        <h1 className="font-display font-bold text-xl text-slate-800">{foundModule.title}</h1>
        <div className="text-xs text-slate-400 font-body mt-0.5">{foundModule.readTime} read</div>
      </div>

      <div className="space-y-4">
        {foundModule.content.map((section, i) => (
          <ContentBlock key={i} section={section} />
        ))}
      </div>

      {foundModule.checklist && foundModule.checklist.length > 0 && (
        <Checklist items={foundModule.checklist} checked={checked} onToggle={toggle} />
      )}

      {!complete ? (
        <button
          onClick={handleMarkComplete}
          className={`w-full py-4 rounded-xl font-display font-bold text-white text-base transition-all ${
            justCompleted
              ? 'bg-green-500 complete-pulse'
              : 'bg-teal-600 hover:bg-teal-700 active:scale-95'
          }`}
        >
          {justCompleted ? '✓ Marked Complete!' : 'Mark This Complete →'}
        </button>
      ) : (
        <div className="w-full py-4 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center gap-4">
          <div className="font-display font-semibold text-green-700 text-sm">✓ Completed</div>
          <button
            onClick={() => unmarkComplete(moduleId)}
            className="text-xs text-slate-400 hover:text-red-500 font-body underline underline-offset-2 transition-colors"
          >
            Undo
          </button>
        </div>
      )}

      {nextModule && (
        <Link
          to={`/module/${nextModule.id}`}
          className="block text-center text-sm text-teal-600 font-body hover:underline pb-2"
        >
          Next: {nextModule.title} →
        </Link>
      )}
    </div>
  );
}
