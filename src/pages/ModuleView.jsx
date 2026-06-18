import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { phases } from '../data/curriculum';
import { useProgress, useChecklistProgress, useModuleNotes } from '../hooks/useProgress';
import ContentBlock from '../components/ContentBlock';
import Checklist from '../components/Checklist';

export default function ModuleView() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { markComplete, unmarkComplete, isComplete } = useProgress();
  const { checked, toggle } = useChecklistProgress(moduleId);
  const { notes, saveNotes } = useModuleNotes(moduleId);
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
  const hasChecklist = foundModule.checklist && foundModule.checklist.length > 0;
  const checkedCount = hasChecklist ? foundModule.checklist.filter((_, i) => checked[i]).length : 0;
  const allChecked = !hasChecklist || checkedCount === foundModule.checklist.length;

  const handleMarkComplete = () => {
    if (!allChecked) return;
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

      <div>
        <div className="font-display font-semibold text-sm text-slate-700 mb-2">Your Notes</div>
        <textarea
          value={notes}
          onChange={e => saveNotes(e.target.value)}
          placeholder="Jot down anything you want to remember from this module..."
          className="w-full min-h-[80px] text-sm font-body text-slate-700 bg-white border border-slate-200 rounded-xl p-3 resize-none focus:outline-none focus:border-teal-400 placeholder:text-slate-300"
        />
      </div>

      {hasChecklist && (
        <Checklist items={foundModule.checklist} checked={checked} onToggle={toggle} />
      )}

      {!complete ? (
        <div className="space-y-2">
          <button
            onClick={handleMarkComplete}
            disabled={!allChecked}
            className={`w-full py-4 rounded-xl font-display font-bold text-base transition-all ${
              justCompleted
                ? 'bg-green-500 text-white complete-pulse'
                : allChecked
                ? 'bg-teal-600 hover:bg-teal-700 active:scale-95 text-white'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            {justCompleted
              ? '✓ Marked Complete!'
              : allChecked
              ? 'Mark This Complete →'
              : `Check all items above first (${checkedCount}/${foundModule.checklist.length} done)`}
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="w-full py-4 rounded-xl bg-green-50 border border-green-200 text-center">
            <div className="font-display font-semibold text-green-700 text-sm">✓ Completed</div>
          </div>
          <button
            onClick={() => unmarkComplete(moduleId)}
            className="w-full text-center text-xs text-slate-400 font-body hover:text-slate-600 py-1 transition-colors"
          >
            Mark as incomplete
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
