import { d } from './delay'

// Schematic payoff shapes for the three note structures: note return (y)
// against the underlying's performance (x), zero at the centre. Shapes only;
// no figures, since each note's terms are set at issuance.
const W = 240
const H = 120
const shapes = [
  // Principal protected: flat below zero, participates up to a cap.
  { path: 'M0,60 L120,60 L160,24 L240,24', marks: [{ x: 200, y: 16, text: 'Cap' }] },
  // Buffer: absorbs the first part of a decline, then loses 1:1; capped upside.
  {
    path: 'M24,120 L84,60 L120,60 L160,24 L240,24',
    zone: { x: 84, w: 36 },
    marks: [
      { x: 200, y: 16, text: 'Cap' },
      { x: 102, y: 80, text: 'Buffer' },
    ],
  },
  // Growth: leveraged upside to a cap, fully exposed below zero.
  { path: 'M60,120 L120,60 L146,12 L240,12', marks: [{ x: 196, y: 4, text: 'Cap' }] },
]

export function PayoffChart({ index }: { index: number }) {
  const s = shapes[index]!
  return (
    <figure className="mt-8" aria-hidden>
      <svg viewBox={`-4 -8 ${W + 8} ${H + 16}`} className="h-auto w-full overflow-visible">
        {'zone' in s && s.zone && (
          <rect
            x={s.zone.x}
            y={0}
            width={s.zone.w}
            height={H}
            className="r"
            style={{ ...d(500), fill: 'rgb(75 222 127 / 0.08)' }}
          />
        )}
        <line x1={0} x2={W} y1={60} y2={60} style={{ stroke: 'rgb(255 255 255 / 0.15)' }} />
        <line x1={120} x2={120} y1={0} y2={H} style={{ stroke: 'rgb(255 255 255 / 0.15)' }} />
        {/* The underlying, 1:1, for reference. */}
        <path
          d="M60,120 L180,0"
          fill="none"
          strokeDasharray="3 4"
          style={{ stroke: 'rgb(255 255 255 / 0.22)' }}
        />
        <path
          d={s.path}
          fill="none"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
          pathLength={1}
          className="r-stroke"
          style={{ ...d(250 + index * 140), stroke: 'var(--color-brand)' }}
        />
        {s.marks.map((m) => (
          <text
            key={m.text}
            x={m.x}
            y={m.y}
            textAnchor="middle"
            className="r font-mono text-[9px] uppercase"
            style={{ ...d(900 + index * 140), fill: 'rgb(255 255 255 / 0.5)' }}
          >
            {m.text}
          </text>
        ))}
      </svg>
      <figcaption className="mt-3 flex justify-between font-mono text-[10px] leading-none text-white/35 uppercase">
        <span>Underlying ↓</span>
        <span>Underlying ↑</span>
      </figcaption>
    </figure>
  )
}
