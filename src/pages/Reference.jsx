import { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories, tasks, tasksByCategory } from '../data/referenceTasks';

const systems = [
  { name: "BHS App", url: "https://bhsmobileapp-production.up.railway.app", desc: "Leads, Clock, Filing Cabinet, Expense", icon: "🏗️" },
  { name: "beardsservices.com", url: "https://beardsservices.com", desc: "The main BHS website", icon: "🌐" },
  { name: "Google My Business", url: "https://business.google.com", desc: "GMB dashboard — manage posts, reviews, info", icon: "📍" },
  { name: "Facebook Page", url: "https://www.facebook.com/BeardsHomeServices", desc: "BHS Facebook business page", icon: "📘" },
  { name: "Canva", url: "https://www.canva.com", desc: "Make graphics for posts", icon: "🎨" },
  { name: "GitHub — beardsservices-png", url: "https://github.com/beardsservices-png", desc: "All BHS code repositories", icon: "⚙️" },
  { name: "Railway", url: "https://railway.app", desc: "App hosting platform", icon: "🚂" },
  { name: "Retell AI Dashboard", url: "https://app.retellai.com", desc: "Bill's call logs and configuration", icon: "🤖" },
  { name: "Claude.ai", url: "https://claude.ai", desc: "Your AI assistant for writing and problem-solving", icon: "🧠" },
];

const prompts = [
  { label: "Write a GMB post", text: "Write a Google My Business post for a small Arkansas home services business. We just completed [describe job]. Keep it professional and local, under 100 words." },
  { label: "Write a Facebook post", text: "Write a Facebook post for a small Arkansas handyman business. We just completed [describe job]. Keep the tone local, genuine, and conversational. No hashtags." },
  { label: "Respond to a 5-star review", text: "Write a warm, professional response to this 5-star Google review for a small home services business: [paste review here]." },
  { label: "Respond to a negative review", text: "Write a calm, professional response to this Google review for a small home services business. Acknowledge the concern and offer to make it right offline: [paste review here]." },
  { label: "Customer follow-up text", text: "Help me write a professional follow-up text to a homeowner who contacted Beard's Home Services about [service type]. I need to gather more details about the job before we can quote it." },
  { label: "Write a blog post", text: "Write a 300-word blog post for a home services website about [service type] in Mountain Home, Arkansas. Include local keywords naturally. Keep the tone professional but not stiff." },
  { label: "Estimate follow-up", text: "Help me write a short, friendly follow-up text to a customer who received a BHS estimate 3 days ago and hasn't responded. No pressure." },
  { label: "I'm stuck — help me think", text: "I'm managing the business side of a small home services company (Beard's Home Services, Mountain Home AR) and I have this situation: [describe it]. What would you recommend?" },
];

function TaskCard({ task }) {
  return (
    <Link
      to={`/reference/${task.id}`}
      className="flex items-center gap-3 bg-white rounded-xl border border-slate-100 p-3 hover:border-teal-200 hover:shadow-sm active:scale-[0.98] transition-all"
    >
      <span className="text-2xl flex-shrink-0">{task.icon}</span>
      <div className="flex-1 min-w-0">
        <div className="font-display font-semibold text-slate-800 text-sm leading-tight">{task.title}</div>
        <div className="text-xs text-slate-400 font-body leading-snug mt-0.5">{task.summary}</div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-slate-300 flex-shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
    </Link>
  );
}

export default function Reference() {
  const [query, setQuery] = useState('');
  const [copiedIdx, setCopiedIdx] = useState(null);

  const copy = (text, idx) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    }).catch(() => {});
  };

  const q = query.trim().toLowerCase();
  const matched = q
    ? tasks.filter((t) =>
        `${t.title} ${t.summary} ${t.category} ${(t.related || []).join(' ')}`.toLowerCase().includes(q)
      )
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-xl text-slate-800">Task Reference</h1>
        <p className="text-sm text-slate-500 font-body mt-1">Your how-to manual for every BHS task. Flip to what you're doing and follow the steps.</p>
      </div>

      {/* How to use */}
      <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 flex gap-3">
        <span className="text-teal-500 text-lg flex-shrink-0">📖</span>
        <p className="text-teal-800 font-body text-sm leading-relaxed">
          Don't memorize this. When you start a task, open it here and follow the steps exactly — like a recipe. Do it enough times and you won't need to look anymore.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tasks… (e.g. review, payment, clock)"
          className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm font-body text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
        />
      </div>

      {/* Catalog */}
      {matched ? (
        <section>
          <h2 className="font-display font-bold text-slate-700 text-sm uppercase tracking-wide mb-3">
            {matched.length} result{matched.length === 1 ? '' : 's'}
          </h2>
          {matched.length === 0 ? (
            <p className="text-sm text-slate-400 font-body">No tasks match "{query}". Try a simpler word.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-2">
              {matched.map((t) => <TaskCard key={t.id} task={t} />)}
            </div>
          )}
        </section>
      ) : (
        categories.map((cat) => {
          const catTasks = tasksByCategory(cat.id);
          if (catTasks.length === 0) return null;
          return (
            <section key={cat.id}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{cat.icon}</span>
                <h2 className="font-display font-bold text-slate-700 text-sm uppercase tracking-wide">{cat.title}</h2>
              </div>
              <p className="text-xs text-slate-400 font-body mb-3">{cat.blurb}</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {catTasks.map((t) => <TaskCard key={t.id} task={t} />)}
              </div>
            </section>
          );
        })
      )}

      <div className="border-t border-slate-200 pt-6 space-y-6">
        <section>
          <h2 className="font-display font-bold text-slate-700 text-sm uppercase tracking-wide mb-3">Systems &amp; Links</h2>
          <div className="space-y-2">
            {systems.map((s, i) => {
              const isPlaceholder = s.url === 'placeholder';
              return (
                <a
                  key={i}
                  href={isPlaceholder ? undefined : s.url}
                  target={isPlaceholder ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 bg-white rounded-xl border border-slate-100 p-3 ${
                    isPlaceholder ? 'opacity-60 cursor-default' : 'hover:border-teal-200 hover:shadow-sm transition-all'
                  }`}
                >
                  <span className="text-xl flex-shrink-0">{s.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-semibold text-slate-800 text-sm">{s.name}</div>
                    <div className="text-xs text-slate-400 font-body">{s.desc}</div>
                    {isPlaceholder && (
                      <div className="text-xs text-amber-500 font-body mt-0.5">{s.placeholder}</div>
                    )}
                  </div>
                  {!isPlaceholder && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 text-slate-300 flex-shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  )}
                </a>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="font-display font-bold text-slate-700 text-sm uppercase tracking-wide mb-3">Key Contact</h2>
          <div className="bg-white rounded-xl border border-slate-100 p-4">
            <div className="font-display font-semibold text-slate-800">Brian (Dad)</div>
            <a href="tel:+18703211072" className="text-sm text-teal-600 font-body font-semibold mt-0.5 inline-block">(870) 321-1072</a>
            <div className="text-xs text-slate-400 font-body mt-1">First call for anything BHS-related. If something breaks, text him. Don't stress it.</div>
          </div>
        </section>

        <section>
          <h2 className="font-display font-bold text-slate-700 text-sm uppercase tracking-wide mb-1">Claude Prompt Templates</h2>
          <p className="text-xs text-slate-400 font-body mb-3">Tap any prompt to copy it. Paste into claude.ai and fill in the brackets.</p>
          <div className="space-y-2">
            {prompts.map((p, i) => (
              <button
                key={i}
                onClick={() => copy(p.text, i)}
                className="w-full text-left bg-white rounded-xl border border-slate-100 p-4 hover:border-teal-200 hover:shadow-sm transition-all active:scale-95"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="font-display font-semibold text-slate-800 text-sm">{p.label}</div>
                  <span className={`text-xs flex-shrink-0 font-body font-medium ${
                    copiedIdx === i ? 'text-green-600' : 'text-teal-500'
                  }`}>
                    {copiedIdx === i ? '✓ Copied!' : 'Copy'}
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-body mt-1 line-clamp-2 leading-relaxed">{p.text}</div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
