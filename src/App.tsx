import Nav from '@/components/Nav';
import Introduction from '@/components/Introduction';
import Topics from '@/components/Topics';
import VennShowcase from '@/components/VennShowcase';
import Simulator from '@/components/Simulator';
import CodeExamples from '@/components/CodeExamples';
import Quiz from '@/components/Quiz';
import Footer from '@/components/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';

function App() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="min-h-screen bg-navy-950 text-slate-200 selection:bg-accent-blue/40">
      <Nav />
      <main>
        <Introduction />
        <Topics />
        <VennShowcase />
        <Simulator />
        <CodeExamples />
        <Quiz />
      </main>
      <Footer />
    </div>
  );
}

export default App;
