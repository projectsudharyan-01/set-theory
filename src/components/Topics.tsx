import { useState } from 'react';
import * as Icons from 'lucide-react';
import { topics } from '@/data/topics';
import type { LucideIcon } from 'lucide-react';

export default function Topics() {
  const [active, setActive] = useState(topics[0].id);
  const current = topics.find((t) => t.id === active) ?? topics[0];

  return (
    <section id="topics" className="relative py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="reveal text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">Step 01</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">Topics to Learn</h2>
          <p className="mt-3 text-slate-400">
            Tap any card to see a worked example. Each topic builds on the one before it.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
          {topics.map((t, i) => {
            const Icon = (Icons as unknown as Record<string, LucideIcon>)[t.icon] ?? Icons.Circle;
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`group text-left rounded-2xl p-5 transition-all duration-300 border ${
                  isActive
                    ? 'glass glow-ring border-accent-blue/60 scale-[1.02]'
                    : 'glass-soft border-navy-700 hover:border-accent-blue/40 hover:-translate-y-1'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-xl transition-colors ${
                      isActive
                        ? 'bg-gradient-to-br from-accent-blue to-accent-cyan text-navy-950'
                        : 'bg-navy-700/70 text-accent-cyan group-hover:bg-navy-600'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-mono text-slate-600">0{i + 1}</span>
                </div>
                <h3 className="mt-4 font-semibold text-white">{t.title}</h3>
                <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">{t.short}</p>
                <span
                  className={`mt-3 inline-flex items-center gap-1 text-xs font-medium transition-colors ${
                    isActive ? 'text-accent-cyan' : 'text-slate-500 group-hover:text-slate-300'
                  }`}
                >
                  {isActive ? 'Showing example ↓' : 'Show example'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Example detail panel */}
        <div className="reveal mt-10 glass rounded-3xl p-6 sm:p-8 glow-ring">
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-white">{current.title}</h3>
              <p className="mt-3 text-slate-300 leading-relaxed">{current.explanation}</p>
              <div className="mt-5 rounded-2xl bg-navy-950/70 border border-navy-700 p-4">
                <p className="text-xs uppercase tracking-wider text-slate-500">Output</p>
                <pre className="mt-2 code-block text-accent-teal whitespace-pre-wrap">{current.exampleOutput}</pre>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Python</p>
              <pre className="code-block rounded-2xl bg-navy-950/80 border border-navy-700 p-4 text-slate-200 overflow-x-auto">
{current.example}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
