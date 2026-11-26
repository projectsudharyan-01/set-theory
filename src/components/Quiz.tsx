import { useState } from 'react';
import { quizQuestions } from '@/data/quiz';
import { CheckCircle2, XCircle, Trophy, RotateCcw, ChevronRight, HelpCircle } from 'lucide-react';

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = quizQuestions[current];
  const isLast = current === quizQuestions.length - 1;

  const choose = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (isLast) {
      setFinished(true);
      return;
    }
    setCurrent((c) => c + 1);
    setSelected(null);
    setAnswered(false);
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
  };

  const pct = Math.round((score / quizQuestions.length) * 100);

  return (
    <section id="quiz" className="relative py-24 px-4 overflow-hidden">
      <div className="aurora w-[420px] h-[420px] top-20 right-10 bg-accent-rose/20" />
      <div className="mx-auto max-w-3xl relative">
        <div className="reveal text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">Step 05</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">Test Your Knowledge</h2>
          <p className="mt-3 text-slate-400">
            {quizQuestions.length} questions covering every topic. Get instant feedback and explanations.
          </p>
        </div>

        <div className="reveal mt-10">
          {finished ? (
            <div className="glass rounded-3xl p-8 text-center glow-ring reveal-scale">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-accent-amber to-accent-rose text-navy-950">
                <Trophy className="h-10 w-10" />
              </div>
              <h3 className="mt-5 text-2xl font-bold text-white">Quiz Complete!</h3>
              <p className="mt-2 text-slate-300">
                You scored <span className="text-accent-cyan font-bold">{score}</span> / {quizQuestions.length} ({pct}%)
              </p>
              <div className="mx-auto mt-5 max-w-md h-3 rounded-full bg-navy-700 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent-cyan to-accent-blue transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="mt-4 text-sm text-slate-400">
                {pct >= 80 ? 'Excellent! You really understand Python sets.' : pct >= 50 ? 'Good start — review the topics and try again.' : 'Keep practising! Revisit the sections above and retry.'}
              </p>
              <button
                onClick={restart}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-blue to-accent-cyan px-5 py-3 text-sm font-semibold text-navy-950 hover:scale-[1.03] transition-transform"
              >
                <RotateCcw className="h-4 w-4" /> Try Again
              </button>
            </div>
          ) : (
            <div className="glass rounded-3xl p-6 sm:p-8 glow-ring">
              {/* Progress */}
              <div className="flex items-center justify-between text-sm">
                <span className="inline-flex items-center gap-2 text-slate-400">
                  <HelpCircle className="h-4 w-4 text-accent-cyan" />
                  Question {current + 1} of {quizQuestions.length}
                </span>
                <span className="text-slate-400">
                  Score: <span className="text-accent-cyan font-semibold">{score}</span>
                </span>
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-navy-700 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent-cyan to-accent-blue transition-all duration-500"
                  style={{ width: `${((current + (answered ? 1 : 0)) / quizQuestions.length) * 100}%` }}
                />
              </div>

              <span className="mt-5 inline-block rounded-full bg-navy-700/70 px-3 py-1 text-xs text-accent-cyan">
                {q.topic}
              </span>
              <h3 className="mt-3 text-lg sm:text-xl font-semibold text-white leading-snug">{q.question}</h3>

              <div className="mt-5 grid gap-3">
                {q.choices.map((c, idx) => {
                  const isCorrect = idx === q.answer;
                  const isPicked = idx === selected;
                  let state = 'idle';
                  if (answered) {
                    if (isCorrect) state = 'correct';
                    else if (isPicked) state = 'wrong';
                    else state = 'dim';
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => choose(idx)}
                      disabled={answered}
                      className={`group flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                        state === 'correct'
                          ? 'border-accent-teal/70 bg-accent-teal/15 text-white'
                          : state === 'wrong'
                          ? 'border-accent-rose/70 bg-accent-rose/15 text-white'
                          : state === 'dim'
                          ? 'border-navy-700 bg-navy-950/40 text-slate-500'
                          : 'border-navy-700 bg-navy-950/40 text-slate-200 hover:border-accent-blue/50 hover:bg-navy-700/40'
                      }`}
                    >
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-bold ${
                          state === 'correct'
                            ? 'bg-accent-teal text-navy-950'
                            : state === 'wrong'
                            ? 'bg-accent-rose text-navy-950'
                            : 'bg-navy-700 text-slate-300 group-hover:bg-navy-600'
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1">{c}</span>
                      {state === 'correct' && <CheckCircle2 className="h-5 w-5 text-accent-teal" />}
                      {state === 'wrong' && <XCircle className="h-5 w-5 text-accent-rose" />}
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              {answered && (
                <div
                  className={`mt-5 rounded-2xl p-4 border ${
                    selected === q.answer
                      ? 'border-accent-teal/40 bg-accent-teal/10'
                      : 'border-accent-rose/40 bg-accent-rose/10'
                  }`}
                >
                  <p className={`text-sm font-semibold ${selected === q.answer ? 'text-accent-teal' : 'text-accent-rose'}`}>
                    {selected === q.answer ? 'Correct!' : 'Not quite.'}
                  </p>
                  <p className="mt-1 text-sm text-slate-300 leading-relaxed">{q.explanation}</p>
                </div>
              )}

              {/* Next */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={next}
                  disabled={!answered}
                  className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all ${
                    answered
                      ? 'bg-gradient-to-r from-accent-blue to-accent-cyan text-navy-950 hover:scale-[1.03]'
                      : 'bg-navy-700 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {isLast ? 'See Results' : 'Next Question'} <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
