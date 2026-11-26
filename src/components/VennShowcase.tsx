import { useState } from 'react';
import VennDiagram, { type OperationKey } from './VennDiagram';
import { Merge, Gem, MinusCircle, Diff } from 'lucide-react';

const ops: { key: OperationKey; label: string; icon: typeof Merge; desc: string }[] = [
  { key: 'union', label: 'Union', icon: Merge, desc: 'A | B — everything in both sets combined.' },
  { key: 'intersection', label: 'Intersection', icon: Gem, desc: 'A & B — only the shared middle.' },
  { key: 'difference', label: 'Difference', icon: MinusCircle, desc: 'A - B — items in A, not in B.' },
  { key: 'symmetric', label: 'Symmetric Diff', icon: Diff, desc: 'A ^ B — everything except the shared part.' },
];

const demoA = ['1', '2', '3', '4'];
const demoB = ['3', '4', '5', '6'];

export default function VennShowcase() {
  const [op, setOp] = useState<OperationKey>('union');

  return (
    <section id="venn" className="relative py-24 px-4 overflow-hidden">
      <div className="aurora w-[520px] h-[520px] top-10 left-1/2 -translate-x-1/2 bg-accent-violet/25 animate-glowpulse" />

      <div className="mx-auto max-w-6xl relative">
        <div className="reveal text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">Step 02</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">Animated Venn Diagram</h2>
          <p className="mt-3 text-slate-400">
            Two sets drawn as overlapping circles. Pick an operation to see exactly which region it covers.
          </p>
        </div>

        {/* Operation pills */}
        <div className="reveal mt-8 flex flex-wrap justify-center gap-3">
          {ops.map((o) => {
            const Icon = o.icon;
            const isActive = op === o.key;
            return (
              <button
                key={o.key}
                onClick={() => setOp(o.key)}
                className={`btn-shine inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-accent-blue to-accent-cyan text-navy-950 glow-ring'
                    : 'glass-soft text-slate-300 hover:text-white hover:border-accent-blue/40'
                }`}
              >
                <Icon className="h-4 w-4" /> {o.label}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid lg:grid-cols-[1.2fr_1fr] gap-8 items-center">
          {/* The spinning-into-view Venn */}
          <div className="reveal-spin flex justify-center">
            <div className="relative">
              <div className="absolute -inset-10 rounded-full bg-gradient-to-tr from-accent-blue/10 via-transparent to-accent-cyan/10 blur-2xl" />
              <VennDiagram
                setA={demoA}
                setB={demoB}
                operation={op}
                size={560}
              />
            </div>
          </div>

          {/* Explanation */}
          <div className="reveal">
            <div className="glass rounded-3xl p-6">
              <h3 className="text-lg font-bold text-white">
                {ops.find((o) => o.key === op)?.label}
              </h3>
              <p className="mt-2 text-slate-300 leading-relaxed">
                {ops.find((o) => o.key === op)?.desc}
              </p>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="h-4 w-4 rounded-full bg-accent-blue/70 border border-accent-blue" />
                  <span className="text-slate-300">Blue circle = Set A = {'{1,2,3,4}'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-4 w-4 rounded-full bg-accent-cyan/70 border border-accent-cyan" />
                  <span className="text-slate-300">Cyan circle = Set B = {'{3,4,5,6}'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-4 w-4 rounded-full bg-accent-violet/70 border border-accent-violet" />
                  <span className="text-slate-300">Violet overlap = shared items {`{3,4}`}</span>
                </div>
              </div>

              <p className="mt-5 text-xs text-slate-500 leading-relaxed">
                The highlighted region shows exactly which elements the selected operation returns.
                Scroll down to the simulator to enter your own values.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
