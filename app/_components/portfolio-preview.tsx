import Image from 'next/image'

const sidebar = [
  { icon: 'icon-layout-dashboard.svg', label: 'Overview', active: true, dim: false },
  { icon: 'icon-pie-chart.svg', label: 'Allocations', active: false, dim: true },
  { icon: 'icon-arrows-right-left.svg', label: 'Transfers', active: false, dim: true },
  // This icon's 40% opacity is baked into the SVG itself.
  { icon: 'icon-people.svg', label: 'Team', active: false, dim: false },
]

const allocations = [
  { label: 'Private equity', share: 63.8 },
  { label: 'Market-linked notes', share: 36.2 },
]

const holdings = [
  { name: 'Anduril Industries', detail: 'Private equity', price: '$120.95' },
  { name: 'Shield AI', detail: 'Private equity', price: '$159.59' },
  { name: 'Autocallable note', detail: '3-yr worst-of autocallable · BNP Paribas', price: null },
]

/**
 * Static product preview shown at the bottom of the hero. It is decorative —
 * a picture of the app — so it's hidden from assistive tech and laid out at a
 * fixed size like the mock it is.
 */
export function PortfolioPreview() {
  const [primary] = allocations

  return (
    <div
      aria-hidden
      className="relative h-[657px] w-[961px] rounded-[4px] text-left"
      style={{
        backgroundImage: 'linear-gradient(145.62deg, rgb(4 22 12) 3.19%, rgb(3 14 8) 103.55%)',
        boxShadow:
          'inset -2.113px -2.113px 2.113px 0 rgb(255 255 255 / 0.05), inset 1.056px 1.056px 1.056px 0 rgb(255 255 255 / 0.15)',
      }}
    >
      <aside className="absolute inset-y-0 left-0 flex w-20 flex-col items-center border-r border-white/20 pt-[27px]">
        <Image src="/images/greenbird-bird@4x.png" alt="" width={31} height={34} />
        <ul className="mt-[14px] flex flex-col gap-[5px]">
          {sidebar.map((item, i) => (
            <li
              key={item.label}
              className={`flex size-[42px] items-center justify-center rounded-[4px] ${item.active ? 'glass' : ''} ${i === 1 ? 'mt-[3px]' : ''}`}
            >
              <Image
                src={`/images/${item.icon}`}
                alt=""
                width={18}
                height={18}
                className={item.dim ? 'opacity-40' : ''}
              />
            </li>
          ))}
        </ul>
      </aside>

      <div className="absolute top-10 left-[152px] w-[387px]">
        <p className="font-serif text-[24px] leading-[1.3] font-extralight">Your portfolio</p>
        <p className="mt-[21px] ml-[3px] font-mono text-[12px] leading-none uppercase">Allocations</p>
        <div
          className="glass mt-[21px] ml-[3px] flex h-[184px] w-[384px] overflow-hidden rounded-[4px]"
          style={{ '--glass-angle': '154.38deg' } as React.CSSProperties}
        >
          <div
            className="h-full rounded-l-[4px] bg-brand shadow-[inset_-2.113px_-2.113px_2.113px_0_rgb(255_255_255/0.05),inset_1.056px_1.056px_1.056px_0_rgb(255_255_255/0.15)]"
            style={{ width: `${primary?.share ?? 0}%` }}
          />
        </div>
        <div className="mt-3 flex w-[381px] justify-between text-[12px] leading-[1.3]">
          {allocations.map((a) => (
            <p key={a.label}>
              <span className="text-white/50">{a.label} </span>
              {a.share}%
            </p>
          ))}
        </div>
      </div>

      <div className="absolute top-[62px] left-[590px] w-[311px]">
        <p className="font-mono text-[12px] leading-none uppercase">Holdings</p>
        <ul className="mt-6">
          {holdings.map((h, i) => (
            <li key={h.name}>
              {i > 0 && <div className="hairline mt-5 mb-[19px]" />}
              <div className="flex h-[50px] gap-3">
                <div className="glass size-[50px] shrink-0 rounded-[4px]" />
                <div className="flex-1 pt-[7px]">
                  <div className="flex items-baseline justify-between text-[14px] leading-[1.3]">
                    <p>{h.name}</p>
                    {h.price && <p className="font-mono">{h.price}</p>}
                  </div>
                  <p className="mt-[2px] text-[12px] leading-[1.3] text-white/50">{h.detail}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
