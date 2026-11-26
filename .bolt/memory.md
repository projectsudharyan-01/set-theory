# Project memory

## Product intent & audience

- **Set Operations – Venn Visualizer**: interactive educational website for Python Topic 14 (Sets).
- Target audience: absolute beginners with zero prior knowledge of Python sets.
- Goal: teach sets end-to-end via plain-English explanations, step-by-step walkthroughs, real-life examples, and visual diagrams.
- Sections: Introduction, Topics to Learn, Animated Venn Diagram, Interactive Simulator, Python Code Examples, Quiz.
- No backend, login, or database — lightweight, fast, client-side only.

## Brand personality & voice

- Educational clarity is the top priority; visuals and copy must serve understanding.
- Simple, beginner-friendly English; avoid jargon without explanation.
- Friendly, encouraging tone for quiz feedback and explanations.
- Real-life analogies used to ground abstract concepts.

## Visual design & UX direction

- Dark navy/blue premium theme; glassmorphism cards with backdrop blur.
- Aurora glow blobs in background; gradient text for headings.
- Scroll-triggered reveal animations (fade/slide in); hover lift on cards.
- Sticky top nav with active-section highlighting; all buttons functional.
- Venn diagram: large two-circle SVG that spins into view on scroll; region highlights with smooth color transitions for Union / Intersection / Difference / Symmetric Difference.
- Button shine effect on primary actions; copy-to-clipboard for code examples.
- Fully responsive mobile → desktop; `prefers-reduced-motion` supported.
- Icons from lucide-react; no other UI/icon packages.

## Decisions, constraints & rationale

- Framework: Vite + React (JSX), Tailwind CSS, React hooks, lucide-react.
- `@/` path alias maps to `src/`; used for all project imports.
- Quiz: 12 multiple-choice questions spanning every topic; instant feedback, explanations, progress bar, live score, results screen with percentage.
- Topics covered: Creating/Accessing, Add/Remove, Union, Intersection, Difference, Symmetric Difference, Subsets/Supersets, Membership Testing, Set Methods.
- Interactive simulator: user edits Set A / Set B items, selects operation, sees live Venn highlight + result + plain-English explanation.
- Build passes type-checking and compiles cleanly.

## Open questions & assumptions

- Content scope assumed complete for Topic 14; no explicit syllabus provided beyond listed topics.
- Quiz question count (12) chosen to cover all topics — not user-specified.
- No analytics or progress persistence requested; state is in-memory only.
- Future expansion (e.g., 3-circle Venn, frozenset, set comprehensions) not yet requested.