'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { d } from './delay'
import { useCountUp, usePrefersReducedMotion } from './motion'

const allocations = [
  { label: 'Private equity', share: 63.8, color: 'var(--color-brand)', dot: 'bg-brand' },
  { label: 'Market-linked notes', share: 36.2, color: 'var(--color-sage)', dot: 'bg-sage' },
]

/** A holding's tile: a logo or a short issuer code on a glass chip. */
type Tile = { kind: 'logo'; src: string } | { kind: 'text'; label: string }

type Holding = { name: string; detail: string; price: number | null; tile: Tile }

// Illustrative holdings for the product preview. The first three match the
// design; the rest rotate in so the panel feels live. Marks are placeholders.
// Shield AI and Saronic use monograms until their logo files are supplied.
const pool: Holding[] = [
  { name: 'Anduril Industries', detail: 'Private equity', price: 135.25, tile: { kind: 'logo', src: '/images/logo-anduril.svg' } },
  { name: 'Shield AI', detail: 'Private equity', price: 171.83, tile: { kind: 'text', label: 'S' } },
  { name: 'Autocallable note', detail: '3-yr worst-of autocallable · BNP Paribas', price: null, tile: { kind: 'text', label: 'BNP' } },
  { name: 'Saronic Technologies', detail: 'Private equity', price: 74.18, tile: { kind: 'text', label: 'S' } },
  { name: 'Buffered note', detail: '2-yr S&P 500 buffer · Goldman Sachs', price: null, tile: { kind: 'text', label: 'GS' } },
  { name: 'Databricks', detail: 'Private equity', price: 96.4, tile: { kind: 'logo', src: '/images/logos/databricks.svg' } },
  { name: 'Digital note', detail: '18-mo Nasdaq-100 digital · J.P. Morgan', price: null, tile: { kind: 'text', label: 'JPM' } },
]

const VISIBLE = 3
// When the card finishes rising into the hero (see `.dash-in` delay in hero.tsx).
const READY_AT = 1500
const ROTATE_EVERY = 3200
const TICK_EVERY = 2100

type Tick = { dir: 'up' | 'down'; id: number }

function useDashboardMotion() {
  const reduced = usePrefersReducedMotion()
  const [ready, setReady] = useState(false)
  const [slots, setSlots] = useState(() => Array.from({ length: VISIBLE }, (_, i) => i))
  const [leaving, setLeaving] = useState<number | null>(null)
  const [prices, setPrices] = useState(() => new Map(pool.map((h) => [h.name, h.price])))
  const [ticks, setTicks] = useState(() => new Map<string, Tick>())
  const next = useRef(VISIBLE)
  const [rotated, setRotated] = useState(false)
  const slotsRef = useRef(slots)
  useEffect(() => {
    slotsRef.current = slots
  }, [slots])

  useEffect(() => {
    const t = setTimeout(() => setReady(true), reduced ? 0 : READY_AT)
    return () => clearTimeout(t)
  }, [reduced])

  // Swap one row at a time, working down the list: fade it out, then bring
  // the next holding from the pool in behind it.
  useEffect(() => {
    if (!ready || reduced) return
    let step = 0
    let swap: ReturnType<typeof setTimeout>
    const interval = setInterval(() => {
      const slot = step++ % VISIBLE
      setRotated(true)
      setLeaving(slot)
      swap = setTimeout(() => {
        setSlots((current) => {
          let candidate = next.current % pool.length
          while (current.includes(candidate)) candidate = ++next.current % pool.length
          next.current++
          return current.map((v, i) => (i === slot ? candidate : v))
        })
        setLeaving(null)
      }, 450)
    }, ROTATE_EVERY)
    return () => {
      clearInterval(interval)
      clearTimeout(swap)
    }
  }, [ready, reduced])

  // Nudge one visible mark at a time, like a live feed.
  useEffect(() => {
    if (!ready || reduced) return
    let id = 0
    const interval = setInterval(() => {
      const priced = slotsRef.current.map((i) => pool[i]).filter((h): h is Holding => h?.price != null)
      const pick = priced[Math.floor(Math.random() * priced.length)]
      if (!pick) return
      const change = (Math.random() - 0.4) * 0.012
      setPrices((p) => new Map(p).set(pick.name, (p.get(pick.name) ?? 0) * (1 + change)))
      setTicks((t) => new Map(t).set(pick.name, { dir: change >= 0 ? 'up' : 'down', id: ++id }))
    }, TICK_EVERY)
    return () => clearInterval(interval)
  }, [ready, reduced])

  return { ready, rotated, slots, leaving, prices, ticks }
}

const label = 'font-mono text-[12px] leading-none text-white uppercase'

// Same inset edge highlights as the hero's other glass surfaces, plus a soft drop shadow.
const glassEdge =
  'shadow-[inset_-2.113px_-2.113px_2.113px_0_rgb(255_255_255/0.05),inset_1.056px_1.056px_1.056px_0_rgb(255_255_255/0.15),0_40px_90px_-30px_rgb(0_0_0/0.7)]'

/** Donut chart: segments grow from 12 o'clock in step with the count-up, over a faint glass track. */
function AllocationDonut({ progress }: { progress: number }) {
  const size = 88
  const stroke = 7
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const gap = 3
  // Each segment starts where the previous one's full share ends.
  const starts = allocations.map((_, i) => allocations.slice(0, i).reduce((sum, a) => sum + (a.share / 100) * c, 0))
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="size-[72px] shrink-0 -rotate-90 sm:size-[88px]">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgb(255 255 255 / 0.06)" strokeWidth={stroke} />
      {allocations.map((a, i) => {
        const full = (a.share / 100) * c
        const len = Math.max(0, full * progress - gap)
        const start = (starts[i] ?? 0) + gap / 2
        return (
          <circle
            key={a.label}
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={a.color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${len} ${c}`}
            strokeDashoffset={-start}
          />
        )
      })}
    </svg>
  )
}

function HoldingTile({ tile }: { tile: Tile }) {
  return (
    <div className="glass glass-tint flex size-[40px] shrink-0 items-center justify-center rounded-[4px]">
      {tile.kind === 'logo' ? (
        <Image src={tile.src} alt="" width={20} height={19} className="h-[19px] w-5 object-contain" />
      ) : (
        <span className="font-mono text-[11px] text-white/80">{tile.label}</span>
      )}
    </div>
  )
}

/**
 * Illustrative portfolio card shown under the hero copy, in the same tinted
 * glass as the rest of the hero. Decorative (a picture of the product), so
 * it's hidden from assistive tech.
 */
export function PortfolioPreview() {
  const { ready, rotated, slots, leaving, prices, ticks } = useDashboardMotion()
  const [primary] = allocations
  const share = useCountUp(primary?.share ?? 0, ready, 1800)
  const progress = share / (primary?.share || 1)

  return (
    <div
      aria-hidden
      className={`card-sheen relative w-full max-w-[400px] overflow-hidden rounded-[4px] bg-panel/85 text-left backdrop-blur-[40px] ${glassEdge}`}
    >
      <div className="intro flex h-[56px] items-center justify-between px-5 sm:px-[25px]" style={d(1250)}>
        <p className="font-display text-[18px] leading-none font-semibold">Portfolio</p>
        <p className="font-mono text-[11px] leading-none text-white/40 uppercase">Illustrative</p>
      </div>
      <div className="hairline draw-x" style={d(1300)} />

      <div className="px-5 sm:px-[25px]">
        <p className={`intro mt-[26px] ${label}`} style={d(1350)}>
          Allocation
        </p>
        <div className="intro mt-[22px] flex items-center gap-4 sm:gap-[27px]" style={d(1450)}>
          <AllocationDonut progress={progress} />
          <ul className="min-w-0 flex-1 divide-y divide-white/10">
            {allocations.map((a) => (
              <li key={a.label} className="flex h-[36px] items-center gap-2.5 text-[13px]">
                <span className={`size-[6px] shrink-0 rounded-full ${a.dot}`} />
                <span className="flex-1 truncate text-white/60">{a.label}</span>
                <span className="font-mono text-white tabular-nums">{(progress * a.share).toFixed(1)}%</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="hairline draw-x mt-[22px]" style={d(1550)} />
        <p className={`intro mt-[24px] flex items-center gap-2 ${label}`} style={d(1600)}>
          Holdings
          <span className="live-dot size-[5px] rounded-full bg-brand" />
        </p>
      </div>

      <ul className="mt-2 px-5 sm:px-[25px]">
        {slots.map((poolIndex, slot) => {
          const h = pool[poolIndex]
          if (!h) return null
          const price = prices.get(h.name)
          const tick = ticks.get(h.name)
          const initial = !rotated
          return (
            <li key={slot} className={`h-[66px] overflow-hidden ${slot > 0 ? 'border-t border-white/10' : ''}`}>
              <div
                key={h.name}
                className={`flex h-full items-center gap-3 ${leaving === slot ? 'row-out' : ready ? 'row-in' : 'opacity-0'}`}
                style={initial ? d(slot * 140) : undefined}
              >
                <HoldingTile tile={h.tile} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] leading-[1.3]">{h.name}</p>
                  <p className="mt-[2px] truncate text-[12px] leading-[1.3] text-white/50">{h.detail}</p>
                </div>
                {price != null && (
                  <p
                    key={tick?.id ?? 0}
                    className={`font-mono text-[14px] tabular-nums ${tick ? (tick.dir === 'up' ? 'tick-up' : 'tick-down') : ''}`}
                  >
                    ${price.toFixed(2)}
                  </p>
                )}
              </div>
            </li>
          )
        })}
      </ul>

      <div className="hairline draw-x mt-2" style={d(1700)} />
      <div className="intro flex h-[46px] items-center px-5 sm:px-[25px]" style={d(1700)}>
        <p className="font-mono text-[11px] leading-none text-white/40 uppercase">Not an offer or recommendation</p>
      </div>
    </div>
  )
}
