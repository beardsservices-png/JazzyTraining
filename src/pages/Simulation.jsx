import { useState } from 'react';
import { simulationSteps } from '../data/simulation';
import { useSimProgress } from '../hooks/useProgress';

function PhoneCallUI({ step, revealed, onReveal }) {
  const [idx, setIdx] = useState(0);
  const showing = step.transcript.slice(0, idx + 1);
  return (
    <div className="bg-slate-900 rounded-xl p-4 text-sm font-body">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-slate-300 text-xs">Incoming call — Bill answering</span>
      </div>
      <div className="space-y-2 min-h-[120px]">
        {showing.map((line, i) => (
          <div key={i} className={`flex gap-2 ${line.speaker === 'Bill' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[80%] rounded-xl px-3 py-2 text-xs ${
              line.speaker === 'Bill' ? 'bg-teal-700 text-teal-50' : 'bg-slate-600 text-slate-100'
            }`}>
              <span className="font-semibold block mb-0.5 opacity-70">{line.speaker}</span>
              {line.text}
            </div>
          </div>
        ))}
      </div>
      {idx < step.transcript.length - 1 ? (
        <button onClick={() => setIdx(i => i + 1)} className="mt-3 w-full bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg py-2 text-xs font-display font-semibold transition-colors">Continue call →</button>
      ) : !revealed ? (
        <button onClick={onReveal} className="mt-3 w-full bg-teal-600 hover:bg-teal-700 text-white rounded-lg py-2 text-xs font-display font-semibold transition-colors">{step.actionLabel}</button>
      ) : null}
    </div>
  );
}

function LeadsInboxUI({ step, revealed, onReveal }) {
  const [opened, setOpened] = useState(false);
  const l = step.lead;
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden font-body text-sm">
      <div className="bg-teal-600 text-white px-4 py-2 text-xs font-display font-semibold">BHS App — Leads Inbox</div>
      {!opened ? (
        <div className="p-3">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer hover:bg-teal-50 hover:border-teal-200 transition-colors" onClick={() => setOpened(true)}>
            <div className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0" />
            <div className="flex-1">
              <div className="font-semibold text-slate-800 text-sm">{l.name}</div>
              <div className="text-xs text-slate-500">{l.service}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400">{l.time}</div>
              <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-semibold">{l.status}</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 text-center mt-2">Tap the lead to open it</p>
        </div>
      ) : (
        <div className="p-4 space-y-2">
          <div className="flex justify-between"><span className="text-xs text-slate-500">Name</span><span className="text-sm font-semibold text-slate-800">{l.name}</span></div>
          <div className="flex justify-between"><span className="text-xs text-slate-500">Phone</span><span className="text-sm text-slate-800">{l.phone}</span></div>
          <div className="flex justify-between"><span className="text-xs text-slate-500">Service</span><span className="text-sm text-slate-800">{l.service}</span></div>
          <div className="flex justify-between"><span className="text-xs text-slate-500">Received</span><span className="text-sm text-slate-800">{l.time}</span></div>
          <div className="border-t border-slate-100 pt-2 mt-2">
            <span className="text-xs text-slate-500">Notes</span>
            <p className="text-sm text-slate-700 mt-0.5">{l.notes}</p>
          </div>
          {!revealed && (
            <button onClick={onReveal} className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-lg py-2 text-xs font-display font-semibold transition-colors mt-2">{step.actionLabel}</button>
          )}
        </div>
      )}
    </div>
  );
}

function InfoChecklistUI({ step, revealed, onReveal }) {
  const [checked, setChecked] = useState({});
  const toggle = i => setChecked(p => ({ ...p, [i]: !p[i] }));
  const allDone = step.checklistItems.every((_, i) => checked[i]);
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden font-body">
      <div className="bg-violet-600 text-white px-4 py-2 text-xs font-display font-semibold">Follow-Up Call — Info Checklist</div>
      <div className="p-3 space-y-2">
        {step.checklistItems.map((item, i) => (
          <button key={i} onClick={() => toggle(i)} className="w-full flex items-start gap-3 text-left">
            <div className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
              checked[i] ? 'bg-violet-600 border-violet-600' : 'border-slate-300'
            }`}>
              {checked[i] && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-3 h-3"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" /></svg>}
            </div>
            <div className="flex-1">
              <div className={`text-sm font-semibold ${checked[i] ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{item.label}</div>
              {checked[i] && <div className="text-xs text-violet-600 mt-0.5">✓ {item.value}</div>}
            </div>
          </button>
        ))}
      </div>
      {allDone && !revealed && (
        <div className="px-3 pb-3">
          <button onClick={onReveal} className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-lg py-2 text-xs font-display font-semibold transition-colors">{step.actionLabel}</button>
        </div>
      )}
    </div>
  );
}

function TextDraftUI({ step, revealed, onReveal }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden font-body">
      <div className="bg-slate-700 text-white px-4 py-2 text-xs font-display font-semibold flex items-center gap-2">
        <span>💬</span> Draft Message
      </div>
      <div className="p-4">
        <div className="bg-slate-50 rounded-xl p-3 text-sm text-slate-700 leading-relaxed border border-slate-200 min-h-[80px]">{step.draftText}</div>
        {!revealed && (
          <button onClick={onReveal} className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-lg py-2 text-sm font-display font-semibold transition-colors mt-3">{step.actionLabel}</button>
        )}
      </div>
    </div>
  );
}

function EstimateUI({ step, revealed, onReveal }) {
  const e = step.estimate;
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden font-body">
      <div className="bg-teal-600 text-white px-4 py-3">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-display font-bold text-base">Beard's Home Services</div>
            <div className="text-teal-100 text-xs mt-0.5">Mountain Home, AR</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-teal-200">ESTIMATE</div>
            <div className="font-display font-bold text-sm">{e.number}</div>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <div className="text-xs text-slate-500">Customer</div>
          <div className="font-semibold text-slate-800 text-sm">{e.customer}</div>
          <div className="text-xs text-slate-500">{e.address}</div>
        </div>
        <div className="border-t border-slate-100 pt-3 space-y-2">
          {e.items.map((item, i) => (
            <div key={i} className="flex justify-between gap-3">
              <div className="text-xs text-slate-700 flex-1">{item.description}</div>
              <div className="text-sm font-semibold text-slate-800 flex-shrink-0">{item.price}</div>
            </div>
          ))}
        </div>
        <div className="border-t-2 border-teal-100 pt-3 flex justify-between">
          <div className="font-display font-bold text-slate-800">Total</div>
          <div className="font-display font-bold text-teal-600 text-lg">{e.total}</div>
        </div>
        <div className="text-xs text-slate-400 italic">{e.note}</div>
        {!revealed && (
          <button onClick={onReveal} className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-lg py-2 text-sm font-display font-semibold transition-colors">{step.actionLabel}</button>
        )}
      </div>
    </div>
  );
}

function CalendarUI({ step, revealed, onReveal }) {
  const [selected, setSelected] = useState(null);
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden font-body">
      <div className="bg-violet-600 text-white px-4 py-2 text-xs font-display font-semibold">Brian's Availability</div>
      <div className="p-4">
        <div className="grid grid-cols-5 gap-2 mb-4">
          {step.availableDates.map((d, i) => (
            <button key={i} onClick={() => d.available && setSelected(i)} disabled={!d.available}
              className={`rounded-xl py-2 text-center transition-all ${
                !d.available ? 'bg-slate-50 text-slate-300 cursor-not-allowed'
                  : selected === i ? 'bg-violet-600 text-white'
                  : 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
              }`}>
              <div className="text-xs font-semibold">{d.day}</div>
              <div className="text-xs">{d.date}</div>
            </button>
          ))}
        </div>
        <div className="text-xs text-slate-400 mb-3">Green = Brian is available. Tap to select.</div>
        {selected !== null && !revealed && (
          <button onClick={onReveal} className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-lg py-2 text-sm font-display font-semibold transition-colors">{step.actionLabel}</button>
        )}
      </div>
    </div>
  );
}

function FinalCloseUI({ step, revealed, onReveal }) {
  const [done, setDone] = useState({});
  const toggle = i => setDone(p => ({ ...p, [i]: !p[i] }));
  const allDone = step.tasks.every((_, i) => done[i]);
  return (
    <div className="space-y-3 font-body">
      {step.tasks.map((task, i) => (
        <button key={i} onClick={() => toggle(i)}
          className={`w-full text-left rounded-xl border p-4 transition-all ${
            done[i] ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200 hover:border-teal-200'
          }`}>
          <div className="flex items-start gap-3">
            <span className="text-2xl">{task.icon}</span>
            <div className="flex-1">
              <div className={`font-display font-semibold text-sm ${done[i] ? 'text-green-700' : 'text-slate-800'}`}>{task.label}</div>
              <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{task.draft}</div>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
              done[i] ? 'bg-green-500 border-green-500' : 'border-slate-300'
            }`}>
              {done[i] && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-3 h-3"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" /></svg>}
            </div>
          </div>
        </button>
      ))}
      {allDone && !revealed && (
        <button onClick={onReveal} className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl py-3 text-sm font-display font-bold transition-colors">{step.actionLabel}</button>
      )}
    </div>
  );
}

function MockUI({ step, revealed, onReveal }) {
  switch (step.mockType) {
    case 'phone-call':     return <PhoneCallUI step={step} revealed={revealed} onReveal={onReveal} />;
    case 'leads-inbox':    return <LeadsInboxUI step={step} revealed={revealed} onReveal={onReveal} />;
    case 'info-checklist': return <InfoChecklistUI step={step} revealed={revealed} onReveal={onReveal} />;
    case 'text-draft':     return <TextDraftUI step={step} revealed={revealed} onReveal={onReveal} />;
    case 'estimate-card':  return <EstimateUI step={step} revealed={revealed} onReveal={onReveal} />;
    case 'calendar':       return <CalendarUI step={step} revealed={revealed} onReveal={onReveal} />;
    case 'final-close':    return <FinalCloseUI step={step} revealed={revealed} onReveal={onReveal} />;
    default:               return null;
  }
}

export default function Simulation() {
  const { step, advanceStep, resetSim } = useSimProgress();
  const [revealed, setRevealed] = useState(false);
  const [currentStepIdx, setCurrentStepIdx] = useState(Math.max(0, step - 1));
  const [isComplete, setIsComplete] = useState(step >= simulationSteps.length);

  const currentStep = simulationSteps[currentStepIdx];

  const handleReveal = () => setRevealed(true);

  const handleNext = () => {
    const next = currentStepIdx + 1;
    if (next >= simulationSteps.length) {
      setIsComplete(true);
      advanceStep(simulationSteps.length);
    } else {
      setCurrentStepIdx(next);
      advanceStep(next);
      setRevealed(false);
    }
  };

  const handleReset = () => {
    resetSim();
    setCurrentStepIdx(0);
    setRevealed(false);
    setIsComplete(false);
  };

  if (isComplete) {
    return (
      <div className="space-y-6">
        <div className="bg-teal-600 rounded-2xl p-6 text-white text-center">
          <div className="text-4xl mb-3">🎉</div>
          <h1 className="font-display font-bold text-xl mb-2">Simulation Complete</h1>
          <p className="text-teal-100 font-body text-sm">You followed Terry Webb's fence job from first call to final review. That's the full cycle — every time.</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-5">
          <h2 className="font-display font-bold text-slate-800 mb-3">What you just did:</h2>
          <div className="space-y-2">
            {simulationSteps.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</div>
                <div className="text-sm font-body text-slate-700">{s.title}</div>
                <div className="ml-auto text-xs text-slate-400 font-body">{s.tool}</div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleReset} className="w-full py-3 rounded-xl border border-slate-200 text-slate-500 font-body text-sm hover:bg-slate-50 transition-colors">Run it again from the start</button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display font-bold text-xl text-slate-800">The Simulation</h1>
        <p className="text-sm text-slate-500 font-body mt-1">From First Ring to Final Review — Terry Webb's fence job.</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-teal-600 rounded-full transition-all duration-500" style={{ width: `${((currentStepIdx) / simulationSteps.length) * 100}%` }} />
        </div>
        <span className="text-xs text-slate-400 font-body flex-shrink-0">Step {currentStepIdx + 1} of {simulationSteps.length}</span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="bg-slate-800 text-white px-4 py-3 flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-teal-500 text-white text-xs font-display font-bold flex items-center justify-center flex-shrink-0">{currentStep.id}</div>
          <div>
            <div className="font-display font-bold text-base leading-tight">{currentStep.title}</div>
            <div className="text-slate-400 text-xs font-body">{currentStep.tool}</div>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <div className="text-xs text-slate-500 font-display font-semibold uppercase tracking-wide mb-1">Situation</div>
            <p className="text-sm text-slate-700 font-body leading-relaxed">{currentStep.context}</p>
          </div>
          <MockUI step={currentStep} revealed={revealed} onReveal={handleReveal} />
          {!revealed && !['phone-call','leads-inbox','info-checklist','text-draft','estimate-card','calendar','final-close'].includes(currentStep.mockType) && (
            <button onClick={handleReveal} className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl py-3 text-sm font-display font-semibold transition-colors">{currentStep.actionLabel}</button>
          )}
          {revealed && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="text-xs text-green-600 font-display font-semibold uppercase tracking-wide mb-1">Result</div>
              <p className="text-sm text-green-800 font-body leading-relaxed whitespace-pre-line">{currentStep.result}</p>
            </div>
          )}
          {revealed && (
            <button onClick={handleNext} className="w-full bg-slate-800 hover:bg-slate-700 text-white rounded-xl py-3 text-sm font-display font-bold transition-colors">
              {currentStepIdx + 1 >= simulationSteps.length ? 'Finish Simulation →' : `Next: ${simulationSteps[currentStepIdx + 1]?.title} →`}
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 p-4">
        <div className="font-display font-semibold text-slate-700 text-xs uppercase tracking-wide mb-3">All Steps</div>
        <div className="space-y-1.5">
          {simulationSteps.map((s, i) => (
            <div key={i} className={`flex items-center gap-2 text-xs font-body ${i === currentStepIdx ? 'text-teal-600 font-semibold' : 'text-slate-400'}`}>
              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${i === currentStepIdx ? 'bg-teal-500' : i < currentStepIdx ? 'bg-green-400' : 'bg-slate-200'}`} />
              {s.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
