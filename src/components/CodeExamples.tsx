import { useState } from 'react';
import { codeExamples } from '@/data/codeExamples';
import { Terminal, Copy, Check } from 'lucide-react';

export default function CodeExamples() {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const current = codeExamples[active];

  const copy = () => {
    navigator.clipboard?.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id="code" className="relative py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="reveal text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">Step 04</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">Python Code Examples</h2>
          <p className="mt-3 text-slate-400">
            Real, runnable code for every operation — with the output you'd see and a plain explanation.
          </p>
        </div>

        <div className="reveal mt-10 grid lg:grid-cols-[260px_1fr] gap-6">
          {/* Sidebar */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
            {codeExamples.map((ex, i) => (
              <button
                key={ex.op}
                onClick={() => setActive(i)}
                className={`shrink-0 lg:w-full text-left rounded-xl px-4 py-3 text-sm font-medium transition-all border ${
                  active === i
                    ? 'glass border-accent-blue/60 text-white glow-ring'
                    : 'glass-soft border-navy-700 text-slate-400 hover:text-white hover:border-accent-blue/40'
                }`}
              >
                {ex.op}
              </button>
            ))}
          </div>

          {/* Code panel */}
          <div className="glass rounded-3xl p-6 glow-ring">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-accent-cyan" />
                <h3 className="font-semibold text-white">{current.op}</h3>
              </div>
              <button
                onClick={copy}
                className="inline-flex items-center gap-1.5 rounded-lg glass-soft px-3 py-1.5 text-xs text-slate-300 hover:text-white"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-accent-teal" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <pre className="mt-4 code-block rounded-2xl bg-navy-950/80 border border-navy-700 p-4 text-slate-200 overflow-x-auto">
{current.code}
            </pre>

            <div className="mt-4 rounded-2xl bg-navy-950/60 border border-navy-700 p-4">
              <p className="text-xs uppercase tracking-wider text-slate-500">Output</p>
              <pre className="mt-2 code-block text-accent-teal whitespace-pre-wrap">{current.output}</pre>
            </div>

            <p className="mt-4 text-sm text-slate-300 leading-relaxed">{current.explain}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
