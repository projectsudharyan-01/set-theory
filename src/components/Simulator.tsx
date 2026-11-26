import { useMemo, useState } from 'react';
import VennDiagram, { type OperationKey } from './VennDiagram';
import { Merge, Gem, MinusCircle, Diff, RotateCcw } from 'lucide-react';

const ops: { key: OperationKey; label: string; icon: typeof Merge; symbol: string; explain: (a: string[], b: string[]) => string }[] = [
  {
    key: 'union', label: 'Union', icon: Merge, symbol: '|',
    explain: (a, b) => `Everything in Set A OR Set B. ${a.length} + ${b.length} items combined, with duplicates removed.`,
  },
  {
    key: 'intersection', label: 'Intersection', icon: Gem, symbol: '&',
    explain: (a, b) => `Items found in BOTH Set A and Set B — the overlapping middle of the Venn diagram.`,
  },
  {
    key: 'difference', label: 'Difference', icon: MinusCircle, symbol: '-',
    explain: (a, b) => `Items in Set A that are NOT in Set B. "A minus B" keeps only A's exclusive side.`,
  },
  {
    key: 'symmetric', label: 'Symmetric', icon: Diff, symbol: '^',
    explain: (a, b) => `Items in A or B, but NOT in both. The outer ring of the Venn, excluding the shared middle.`,
  },
];

const defaultA = ['apple', 'banana', 'cherry', 'date'];
const defaultB = ['cherry', 'date', 'elderberry', 'fig'];

function parseList(raw: string): string[] {
  return raw
    .split(/[,\s]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function Simulator() {
  const [rawA, setRawA] = useState(defaultA.join(', '));
  const [rawB, setRawB] = useState(defaultB.join(', '));
  const [op, setOp] = useState<OperationKey>('union');

  const setA = useMemo(() => parseList(rawA), [rawA]);
  const setB = useMemo(() => parseList(rawB), [rawB]);

  const current = ops.find((o) => o.key === op)!;

  const reset = () => {
    setRawA(defaultA.join(', '));
    setRawB(defaultB.join(', '));
    setOp('union');
  };

  return (
    <section id="simulator" className="relative py-24 px-4">
      <div className="aurora w-[420px] h-[420px] -bottom-20 left-10 bg-accent-teal/20" />
      <div className="mx-auto max-w-6xl relative">
        <div className="reveal text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">Step 03</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">Interactive Simulator</h2>
          <p className="mt-3 text-slate-400">
            Type your own items, pick an operation, and watch the Venn diagram and result update instantly.
          </p>
        </div>

        <div className="reveal mt-10 grid lg:grid-cols-2 gap-8 items-start">
          {/* Controls */}
          <div className="glass rounded-3xl p-6 glow-ring">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">Your Sets</h3>
              <button
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-lg glass-soft px-3 py-1.5 text-xs text-slate-300 hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm text-accent-blue font-medium">
                  <span className="h-2.5 w-2.5 rounded-full bg-accent-blue" /> Set A
                </label>
                <input
                  value={rawA}
                  onChange={(e) => setRawA(e.target.value)}
                  placeholder="apple, banana, cherry"
                  className="mt-2 w-full rounded-xl bg-navy-950/70 border border-navy-700 px-4 py-3 text-sm text-white outline-none focus:border-accent-blue transition-colors"
                />
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {setA.slice(0, 8).map((el) => (
                    <span key={el} className="rounded-md bg-accent-blue/15 text-accent-blue text-xs px-2 py-0.5">{el}</span>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm text-accent-cyan font-medium">
                  <span className="h-2.5 w-2.5 rounded-full bg-accent-cyan" /> Set B
                </label>
                <input
                  value={rawB}
                  onChange={(e) => setRawB(e.target.value)}
                  placeholder="cherry, date, elderberry"
                  className="mt-2 w-full rounded-xl bg-navy-950/70 border border-navy-700 px-4 py-3 text-sm text-white outline-none focus:border-accent-cyan transition-colors"
                />
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {setB.slice(0, 8).map((el) => (
                    <span key={el} className="rounded-md bg-accent-cyan/15 text-accent-cyan text-xs px-2 py-0.5">{el}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Operation</p>
              <div className="grid grid-cols-2 gap-2">
                {ops.map((o) => {
                  const Icon = o.icon;
                  const isActive = op === o.key;
                  return (
                    <button
                      key={o.key}
                      onClick={() => setOp(o.key)}
                      className={`inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-accent-blue to-accent-cyan text-navy-950'
                          : 'glass-soft text-slate-300 hover:text-white'
                      }`}
                    >
                      <Icon className="h-4 w-4" /> {o.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Result */}
            <div className="mt-6 rounded-2xl bg-navy-950/70 border border-navy-700 p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-wider text-slate-500">Result</p>
                <span className="font-mono text-xs text-accent-violet">A {current.symbol} B</span>
              </div>
              <ResultDisplay setA={setA} setB={setB} op={op} />
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">{current.explain(setA, setB)}</p>
            </div>
          </div>

          {/* Venn */}
          <div className="glass rounded-3xl p-6 glow-ring flex flex-col items-center">
            <h3 className="self-start font-semibold text-white">Live Venn Diagram</h3>
            <div className="mt-2 w-full flex justify-center">
              <VennDiagram setA={setA} setB={setB} operation={op} size={520} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultDisplay({ setA, setB, op }: { setA: string[]; setB: string[]; op: OperationKey }) {
  const a = new Set(setA);
  const b = new Set(setB);
  let result: string[] = [];
  if (op === 'union') result = [...new Set([...a, ...b])];
  if (op === 'intersection') result = [...a].filter((x) => b.has(x));
  if (op === 'difference') result = [...a].filter((x) => !b.has(x));
  if (op === 'symmetric') result = [...a].filter((x) => !b.has(x)).concat([...b].filter((x) => !a.has(x)));

  return (
    <div className="mt-2">
      {result.length === 0 ? (
        <p className="font-mono text-slate-500 text-lg">∅ (empty set)</p>
      ) : (
        <p className="font-mono text-white text-lg break-words">{`{ ${result.join(', ')} }`}</p>
      )}
      <p className="mt-1 text-xs text-slate-500">{result.length} element{result.length === 1 ? '' : 's'}</p>
    </div>
  );
}
