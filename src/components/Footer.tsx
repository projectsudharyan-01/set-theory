import { Heart, Github, ArrowUp } from 'lucide-react';

export default function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <footer className="relative py-12 px-4 border-t border-navy-700/50">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500 text-center sm:text-left">
          Set Operations – Venn Visualizer · Python Topic 14 · Built for learners from zero to confident.
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={toTop}
            className="inline-flex items-center gap-1.5 rounded-lg glass-soft px-3 py-2 text-xs text-slate-300 hover:text-white"
          >
            <ArrowUp className="h-3.5 w-3.5" /> Back to top
          </button>
          <span className="inline-flex items-center gap-1 text-xs text-slate-500">
            Made with <Heart className="h-3.5 w-3.5 text-accent-rose" /> for Python learners
          </span>
        </div>
      </div>
    </footer>
  );
}
