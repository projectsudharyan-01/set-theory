import { useEffect, useState } from 'react';
import { Boxes, Hash, ArrowRight, Sparkles } from 'lucide-react';

const introPoints = [
  {
    icon: Hash,
    title: 'Unique Elements',
    body: 'A set never stores duplicates. Add the same value twice and it stays as one entry only.',
  },
  {
    icon: Boxes,
    title: 'Unordered',
    body: 'Sets do not remember the order you added items. The display order can change between runs.',
  },
];

const realLife = [
  'Your backpack: {books, bottle, pen, lunch} — no item repeats.',
  'A playlist of unique songs — the same song never appears twice.',
  'A class roll call — each student is listed only once.',
];

export default function Introduction() {
  const [typedTitle, setTypedTitle] = useState('');
  const firstTitleLine = 'Set Operations';
  const secondTitleLine = 'Venn Visualizer';
  const fullTitle = firstTitleLine + secondTitleLine;

  useEffect(() => {
    let index = 0;
    const typingTimer = window.setInterval(() => {
      index += 1;
      setTypedTitle(fullTitle.slice(0, index));
      if (index >= fullTitle.length) window.clearInterval(typingTimer);
    }, 85);

    return () => window.clearInterval(typingTimer);
  }, []);

  return (
    <section id="intro" className="relative pt-32 pb-20 px-4 overflow-hidden">
      <div className="aurora w-[480px] h-[480px] -top-40 -left-32 bg-accent-blue/40 animate-glowpulse" />
      <div className="aurora w-[420px] h-[420px] top-20 right-0 bg-accent-cyan/30 animate-glowpulse" />
      <div className="absolute inset-0 grid-bg opacity-60" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 rounded-full glass-soft px-3 py-1 text-xs font-medium text-accent-cyan">
              <Sparkles className="h-3.5 w-3.5" /> Python · Topic 14 · Beginner Friendly
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight" aria-label="Set Operations Venn Visualizer">
              <span>{typedTitle.slice(0, firstTitleLine.length)}</span>
              {typedTitle.length >= firstTitleLine.length && <br />}
              <span className="gradient-text">{typedTitle.slice(firstTitleLine.length)}</span>
              <span className="typing-cursor" aria-hidden="true">|</span>
            </h1>
            <p className="hero-copy-reveal mt-5 text-lg text-slate-300 leading-relaxed max-w-xl">
              Learn Python <span className="text-accent-cyan font-semibold">sets</span> from absolute
              zero — see every operation drawn live on a Venn diagram, try it yourself, read the code,
              then test what you learned.
            </p>

            <div className="hero-copy-reveal mt-7 flex flex-wrap gap-3">
              <a
                href="#topics"
                className="btn-shine inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-blue to-accent-cyan px-5 py-3 text-sm font-semibold text-navy-950 hover:scale-[1.03] transition-transform"
              >
                Start Learning <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#simulator"
                className="inline-flex items-center gap-2 rounded-xl glass px-5 py-3 text-sm font-semibold text-white hover:bg-navy-700/60 transition-colors"
              >
                Try the Simulator
              </a>
            </div>

            <div className="mt-8 stagger grid sm:grid-cols-2 gap-4">
              {introPoints.map((p) => (
                <div key={p.title} className="glass rounded-2xl p-4">
                  <p.icon className="h-6 w-6 text-accent-cyan" />
                  <h3 className="mt-3 font-semibold text-white">{p.title}</h3>
                  <p className="mt-1 text-sm text-slate-400 leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Syntax card */}
          <div className="reveal-scale">
            <div className="glass rounded-3xl p-6 glow-ring">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-300">Python Set Syntax</h3>
                <span className="text-[10px] uppercase tracking-wider text-accent-cyan">Live</span>
              </div>
              <pre className="mt-4 code-block rounded-2xl bg-navy-950/80 border border-navy-700 p-4 text-slate-200 overflow-x-auto">
{`# Create a set with curly braces
fruits = {"apple", "banana", "cherry"}

# Or from a list (removes duplicates)
numbers = set([1, 2, 2, 3])

# Empty set must use set()  NOT  { }
empty = set()

print(fruits)
print(numbers)  # {1, 2, 3}`}
              </pre>
              <div className="mt-4 rounded-2xl bg-navy-950/60 border border-navy-700 p-4">
                <p className="text-xs uppercase tracking-wider text-slate-500">Output</p>
                <pre className="mt-2 code-block text-accent-teal">{'{\'cherry\', \'apple\', \'banana\'}\n{1, 2, 3}'}</pre>
              </div>
            </div>

            {/* Real-life examples */}
            <div className="mt-5 glass rounded-3xl p-6">
              <h3 className="text-sm font-semibold text-white">Real-life Sets</h3>
              <ul className="mt-3 space-y-2">
                {realLife.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent-cyan shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
