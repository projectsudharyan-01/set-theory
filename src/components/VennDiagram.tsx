import { useMemo } from 'react';

export type OperationKey =
  | 'none'
  | 'union'
  | 'intersection'
  | 'difference'
  | 'symmetric';

interface VennProps {
  /** Elements in Set A */
  setA: string[];
  /** Elements in Set B */
  setB: string[];
  /** Which region to highlight */
  operation: OperationKey;
  /** Big display mode (showcase) vs simulator */
  size?: number;
  showLabels?: boolean;
}

const CX_A = 170;
const CX_B = 330;
const CY = 180;
const R = 130;

export default function VennDiagram({
  setA,
  setB,
  operation,
  size = 500,
  showLabels = true,
}: VennProps) {
  const computed = useMemo(() => {
    const a = new Set(setA);
    const b = new Set(setB);
    const inter = [...a].filter((x) => b.has(x));
    const onlyA = [...a].filter((x) => !b.has(x));
    const onlyB = [...b].filter((x) => !a.has(x));
    const union = [...new Set([...a, ...b])];
    const diff = onlyA;
    const sym = [...onlyA, ...onlyB];
    let result: string[] = [];
    let label = '';
    let symbol = '';
    switch (operation) {
      case 'union':
        result = union; label = 'Union'; symbol = 'A | B';
        break;
      case 'intersection':
        result = inter; label = 'Intersection'; symbol = 'A & B';
        break;
      case 'difference':
        result = diff; label = 'Difference'; symbol = 'A - B';
        break;
      case 'symmetric':
        result = sym; label = 'Symmetric Diff'; symbol = 'A ^ B';
        break;
      default:
        result = []; label = 'Select an operation'; symbol = '';
    }
    return { inter, onlyA, onlyB, union, diff, sym, result, label, symbol };
  }, [setA, setB, operation]);

  // Region highlight logic
  const fillA = (op: OperationKey) => {
    const base = 'rgba(59,130,246,0.28)';
    const active = 'rgba(59,130,246,0.55)';
    if (op === 'none') return base;
    if (op === 'union' || op === 'symmetric') return active;
    if (op === 'difference') return active;
    if (op === 'intersection') return base;
    return base;
  };
  const fillB = (op: OperationKey) => {
    const base = 'rgba(34,211,238,0.28)';
    const active = 'rgba(34,211,238,0.55)';
    if (op === 'none') return base;
    if (op === 'union' || op === 'symmetric') return active;
    if (op === 'intersection') return base;
    return base;
  };
  // The overlap region fill (drawn on top using a clip)
  const overlapFill = (op: OperationKey) => {
    if (op === 'none') return 'transparent';
    if (op === 'union') return 'rgba(167,139,250,0.55)';
    if (op === 'intersection') return 'rgba(167,139,250,0.75)';
    if (op === 'symmetric') return 'transparent';
    if (op === 'difference') return 'transparent';
    return 'transparent';
  };

  // Labels inside each region
  const onlyA = computed.onlyA.slice(0, 6);
  const onlyB = computed.onlyB.slice(0, 6);
  const inter = computed.inter.slice(0, 4);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="venn-rotation-wrap">
        <svg
          viewBox="0 0 500 360"
          width={size}
          style={{ maxWidth: '100%', height: 'auto' }}
          className="drop-shadow-[0_10px_40px_rgba(34,211,238,0.25)]"
        >
        <defs>
          <clipPath id="clipA">
            <circle cx={CX_A} cy={CY} r={R} />
          </clipPath>
          <clipPath id="clipB">
            <circle cx={CX_B} cy={CY} r={R} />
          </clipPath>
          <clipPath id="clipOverlap">
            <rect x="0" y="0" width="500" height="360" clipPath="url(#clipB)" />
          </clipPath>
          <radialGradient id="gradA" cx="35%" cy="35%" r="75%">
            <stop offset="0%" stopColor="rgba(96,165,250,0.45)" />
            <stop offset="100%" stopColor="rgba(37,99,235,0.15)" />
          </radialGradient>
          <radialGradient id="gradB" cx="65%" cy="35%" r="75%">
            <stop offset="0%" stopColor="rgba(103,232,249,0.45)" />
            <stop offset="100%" stopColor="rgba(6,182,212,0.15)" />
          </radialGradient>
        </defs>

        {/* Circle A */}
        <circle
          className="venn-circle"
          cx={CX_A}
          cy={CY}
          r={R}
          fill={fillA(operation)}
          stroke="rgba(96,165,250,0.9)"
          strokeWidth="2.5"
        />
        {/* Circle B */}
        <circle
          className="venn-circle"
          cx={CX_B}
          cy={CY}
          r={R}
          fill={fillB(operation)}
          stroke="rgba(103,232,249,0.9)"
          strokeWidth="2.5"
        />
        {/* Overlap region (intersection) - circle A clipped by circle B */}
        <g clipPath="url(#clipB)">
          <circle
            className="venn-circle"
            cx={CX_A}
            cy={CY}
            r={R}
            fill={overlapFill(operation)}
          />
        </g>
        {/* Re-draw strokes on top so overlap fill doesn't cover edges */}
        <circle cx={CX_A} cy={CY} r={R} fill="none" stroke="rgba(96,165,250,0.9)" strokeWidth="2.5" />
        <circle cx={CX_B} cy={CY} r={R} fill="none" stroke="rgba(103,232,249,0.9)" strokeWidth="2.5" />

        {showLabels && (
          <>
            {/* Set A label */}
            <text x={CX_A - 75} y={48} fill="#93c5fd" fontSize="20" fontWeight="700" textAnchor="middle">
              Set A
            </text>
            <text x={CX_A - 75} y={70} fill="#cbd5e1" fontSize="12" textAnchor="middle">
              {setA.length} item{setA.length === 1 ? '' : 's'}
            </text>
            {/* Set B label */}
            <text x={CX_B + 75} y={48} fill="#67e8f9" fontSize="20" fontWeight="700" textAnchor="middle">
              Set B
            </text>
            <text x={CX_B + 75} y={70} fill="#cbd5e1" fontSize="12" textAnchor="middle">
              {setB.length} item{setB.length === 1 ? '' : 's'}
            </text>

            {/* Elements in onlyA */}
            {onlyA.map((el, i) => (
              <text
                key={`a-${el}-${i}`}
                x={CX_A - 70}
                y={CY - 40 + i * 26}
                fill="#dbeafe"
                fontSize="14"
                fontWeight="500"
                textAnchor="middle"
              >
                {el}
              </text>
            ))}
            {/* Elements in onlyB */}
            {onlyB.map((el, i) => (
              <text
                key={`b-${el}-${i}`}
                x={CX_B + 70}
                y={CY - 40 + i * 26}
                fill="#cffafe"
                fontSize="14"
                fontWeight="500"
                textAnchor="middle"
              >
                {el}
              </text>
            ))}
            {/* Elements in intersection */}
            {inter.map((el, i) => (
              <text
                key={`i-${el}-${i}`}
                x={(CX_A + CX_B) / 2}
                y={CY - 30 + i * 26}
                fill="#ede9fe"
                fontSize="14"
                fontWeight="600"
                textAnchor="middle"
              >
                {el}
              </text>
            ))}

            {/* Operation result label */}
            {operation !== 'none' && (
              <g>
                <rect x="170" y="320" width="160" height="30" rx="15" fill="rgba(15,23,42,0.7)" stroke="rgba(167,139,250,0.6)" />
                <text x="250" y="340" fill="#e9d5ff" fontSize="14" fontWeight="600" textAnchor="middle">
                  {computed.label} {computed.symbol}
                </text>
              </g>
            )}
          </>
        )}
        </svg>
      </div>

      {/* Result line */}
      {operation !== 'none' && (
        <div className="mt-4 text-center w-full max-w-md">
          <p className="text-sm text-slate-400">
            {computed.label} <span className="text-accent-violet font-mono">{computed.symbol}</span>
          </p>
          <p className="mt-1 font-mono text-lg text-white">
            {computed.result.length === 0 ? (
              <span className="text-slate-500">∅ (empty set)</span>
            ) : (
              `{ ${computed.result.join(', ')} }`
            )}
          </p>
          <p className="text-xs text-slate-500 mt-1">{computed.result.length} element{computed.result.length === 1 ? '' : 's'}</p>
        </div>
      )}
    </div>
  );
}
