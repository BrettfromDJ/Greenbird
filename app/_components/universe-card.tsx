import Image from 'next/image'
import { d } from './delay'
import { universe } from './pe-universe'

function Row({ index, duplicate }: { index: number; duplicate?: boolean }) {
  const c = universe[index]!
  return (
    <li
      aria-hidden={duplicate || undefined}
      className="group flex h-[60px] items-center gap-3 border-b border-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
    >
      <span className="w-6 shrink-0 font-numeric text-[11px] text-white/30 transition-colors group-hover:text-brand">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="glass glass-tint flex size-9 shrink-0 items-center justify-center rounded-[4px] transition-transform duration-500 ease-(--ease-expo) group-hover:scale-110">
        <Image src={c.logo} alt="" width={18} height={18} className="size-[18px] object-contain" />
      </div>
      <p className="min-w-0 flex-1 truncate text-[14px] leading-[1.3]">{c.name}</p>
      <p className="font-mono text-[14px] tabular-nums transition-colors group-hover:text-brand">{c.mark}</p>
    </li>
  )
}

/**
 * Hero card listing the private equity universe with its indicative marks.
 * The list drifts upward in a loop and pauses under the pointer; the second
 * copy of the list exists only for the loop, so it is hidden from assistive tech.
 */
export function UniverseCard() {
  return (
    <div className="card-sheen relative w-full max-w-[480px] overflow-hidden rounded-[4px] bg-panel/85 text-left backdrop-blur-[40px] shadow-[inset_-2.113px_-2.113px_2.113px_0_rgb(255_255_255/0.05),inset_1.056px_1.056px_1.056px_0_rgb(255_255_255/0.15),0_40px_90px_-30px_rgb(0_0_0/0.7)]">
      <div className="intro flex h-[56px] items-center justify-between px-5 sm:px-6" style={d(1150)}>
        <h2 className="flex items-center gap-2 font-display text-[18px] leading-none font-semibold">
          The universe
          <span className="live-dot size-[5px] rounded-full bg-brand" />
        </h2>
        <p className="font-mono text-[11px] leading-none text-white/40 uppercase">Per-share marks</p>
      </div>
      <div className="hairline draw-x" style={d(1200)} />

      <div className="universe-window intro h-[360px] overflow-hidden px-5 sm:px-6" style={d(1300)}>
        <ul className="universe-track">
          {universe.map((c, i) => (
            <Row key={c.name} index={i} />
          ))}
          {universe.map((c, i) => (
            <Row key={`${c.name}-loop`} index={i} duplicate />
          ))}
        </ul>
      </div>

      <div className="hairline draw-x" style={d(1500)} />
      <div
        className="intro flex min-h-[46px] flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 py-3 sm:px-6"
        style={d(1550)}
      >
        <p className="font-mono text-[11px] leading-none text-white/40 uppercase">Source: Notice · Price date: Nov 3</p>
        <p className="font-mono text-[11px] leading-none text-white/40 uppercase">Not an offer or recommendation</p>
      </div>
    </div>
  )
}
