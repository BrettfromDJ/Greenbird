import { d } from './delay'

const terms = [
  { label: 'Underlying basket', value: '3 U.S. large-cap equities' },
  { label: 'Structure', value: 'Worst-of autocall' },
  { label: 'Term', value: '3 years' },
]

/**
 * Hero card: an illustrative autocallable note's term sheet. The twelve
 * quarterly observation dates light up in turn, issue to year 3, on a loop.
 */
export function NoteCard() {
  return (
    <div className="card-sheen relative w-full max-w-[480px] overflow-hidden rounded-[4px] bg-panel/85 text-left backdrop-blur-[40px] shadow-[inset_-2.113px_-2.113px_2.113px_0_rgb(255_255_255/0.05),inset_1.056px_1.056px_1.056px_0_rgb(255_255_255/0.15),0_40px_90px_-30px_rgb(0_0_0/0.7)]">
      <div className="intro flex h-[56px] items-center justify-between px-5 sm:px-6" style={d(1150)}>
        <h2 className="flex items-center gap-2 font-display text-[18px] leading-none font-semibold">
          Autocallable note
          <span className="live-dot size-[5px] rounded-full bg-brand" />
        </h2>
        <p className="font-mono text-[11px] leading-none text-white/40 uppercase">Illustrative</p>
      </div>
      <div className="hairline draw-x" style={d(1200)} />

      <div className="px-5 sm:px-6">
        <div className="intro flex items-center gap-3 py-5" style={d(1280)}>
          <div className="glass glass-tint flex h-11 w-14 shrink-0 items-center justify-center rounded-[4px] font-display text-[13px] font-semibold tracking-[0.04em]">
            BNP
          </div>
          <div className="min-w-0">
            <p className="text-[16px] leading-[1.3]">BNP Paribas</p>
            <p className="mt-[2px] text-[12px] leading-[1.3] text-white/50">Senior unsecured · Issuer credit risk</p>
          </div>
        </div>

        <dl className="border-t border-white/10">
          {terms.map((t, i) => (
            <div
              key={t.label}
              className="intro flex h-[50px] items-center justify-between gap-4 border-b border-white/10"
              style={d(1360 + i * 90)}
            >
              <dt className="font-mono text-[11px] leading-none text-white/45 uppercase">{t.label}</dt>
              <dd className="text-right text-[14px] leading-[1.3]">{t.value}</dd>
            </div>
          ))}
        </dl>

        <div className="intro py-5" style={d(1640)}>
          <p className="font-mono text-[11px] leading-none text-white/45 uppercase">Quarterly observations</p>
          <div className="mt-4 grid grid-cols-12 gap-1.5" aria-hidden>
            {Array.from({ length: 12 }, (_, i) => (
              <span
                key={i}
                className="obs-tick h-7 rounded-[2px]"
                style={{ '--i': i } as React.CSSProperties}
              />
            ))}
          </div>
          <div className="mt-2.5 flex justify-between font-mono text-[11px] leading-none text-white/40 uppercase">
            <span>Issue</span>
            <span>Year 3</span>
          </div>
        </div>
      </div>

      <div className="hairline draw-x" style={d(1700)} />
      <div className="intro flex h-[46px] items-center px-5 sm:px-6" style={d(1750)}>
        <p className="font-mono text-[11px] leading-none text-white/40 uppercase">
          Hypothetical example · Not an offer or recommendation
        </p>
      </div>
    </div>
  )
}
