import { useState } from 'react';
import { Menu, X, GitFork } from 'lucide-react';
import { useActiveSection } from '@/hooks/useActiveSection';

const links = [
  { id: 'intro', label: 'Introduction' },
  { id: 'topics', label: 'Topics' },
  { id: 'venn', label: 'Venn Diagram' },
  { id: 'simulator', label: 'Simulator' },
  { id: 'code', label: 'Code' },
  { id: 'quiz', label: 'Quiz' },
];

export default function Nav() {
  const active = useActiveSection(links.map((l) => l.id));
  const [open, setOpen] = useState(false);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-3 flex items-center justify-between rounded-2xl glass px-4 py-3 glow-ring">
          <button onClick={() => go('intro')} className="flex items-center gap-2 group">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent-blue to-accent-cyan text-navy-950">
              <GitFork className="h-5 w-5" />
            </span>
            <span className="text-left leading-tight">
              <span className="block text-sm font-bold text-white">Venn Visualizer</span>
              <span className="block text-[10px] text-slate-400">Python · Topic 14</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active === l.id ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {l.label}
                {active === l.id && (
                  <span className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-accent-cyan to-accent-blue" />
                )}
              </button>
            ))}
          </nav>

          <button
            className="md:hidden grid h-9 w-9 place-items-center rounded-lg glass-soft text-white"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden mt-2 rounded-2xl glass p-2 flex flex-col">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                  active === l.id ? 'bg-navy-700 text-white' : 'text-slate-300 hover:bg-navy-700/50'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
