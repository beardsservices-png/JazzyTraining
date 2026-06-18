import { useState } from 'react';

const systems = [
  { name: "BHS App", url: "placeholder", desc: "Leads, Clock, Filing Cabinet, Expense", icon: "🏗️", placeholder: "[ASK BRIAN — Railway URL]" },
  { name: "beardsservices.com", url: "https://beardsservices.com", desc: "The main BHS website", icon: "🌐" },
  { name: "Google My Business", url: "https://business.google.com", desc: "GMB dashboard — manage posts, reviews, info", icon: "📍" },
  { name: "Facebook Page", url: "placeholder", desc: "BHS Facebook business page", icon: "📘", placeholder: "[ASK BRIAN — Facebook page URL]" },
  { name: "GitHub — beardsservices-png", url: "https://github.com/beardsservices-png", desc: "All BHS code repositories", icon: "⚙️" },
  { name: "Railway", url: "https://railway.app", desc: "App hosting platform", icon: "🚂" },
  { name: "Retell AI Dashboard", url: "https://app.retellai.com", desc: "Bill's call logs and configuration", icon: "🤖" },
  { name: "Claude.ai", url: "https://claude.ai", desc: "Your AI assistant for writing and problem-solving", icon: "🧠" },
];

const prompts = [
  {
    label: "Write a GMB post",
    text: "Write a Google My Business post for a small Arkansas home services business. We just completed [describe job]. Keep it professional and local, under 100 words.",
  },
  {
    label: "Write a Facebook post",
    text: "Write a Facebook post for a small Arkansas handyman business. We just completed [describe job]. Keep the tone local, genuine, and conversational. No hashtags.",
  },
  {
    label: "Respond to a 5-star review",
    text: "Write a warm, professional response to this 5-star Google review for a small home services business: [paste review here].",
  },
  {
    label: "Respond to a negative review",
    text: "Write a calm, professional response to this Google review for a small home services business. Acknowledge the concern and offer to make it right offline: [paste review here].",
  },
  {
    label: "Customer follow-up text",
    text: "Help me write a professional follow-up text to a homeowner who contacted Beard's Home Services about [service type]. I need to gather more details about the job before we can quote it.",
  },
  {
    label: "Write a blog post",
    text: "Write a 300-word blog post for a home services website about [service type] in Mountain Home, Arkansas. Include local keywords naturally. Keep the tone professional but not stiff.",
  },
  {
    label: "Estimate follow-up",
    text: "Help me write a short, friendly follow-up text to a customer who received a BHS estimate 3 days ago and hasn't responded. No pressure.",
  },
  {
    label: "I'm stuck — help me think",
    text: "I'm managing the business side of a small home services company (Beard's Home Services, Mountain Home AR) and I have this situation: [describe it]. What would you recommend?",
  },
];

export default function Reference() {
  const [copiedIdx, setCopiedIdx] = useState(null);

  const copy = (text, idx) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    }).catch(() => {});
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-xl text-slate-800">Quick Reference</h1>
        <p className="text-sm text-slate-500 font-body mt-1">Everything you need, one place.</p>
      </div>

      <section>
        <h2 className="font-display font-bold text-slate-700 text-sm uppercase tracking-wide mb-3">Systems & Links</h2>
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
          <div className="text-sm text-amber-500 font-body mt-0.5">[ASK BRIAN — fill in phone number]</div>
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
  );
}
