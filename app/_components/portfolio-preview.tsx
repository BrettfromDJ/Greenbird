'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { d } from './delay'
import { useCountUp, usePrefersReducedMotion } from './motion'

const allocations = [
  { label: 'Private equity', share: 63.8, color: 'var(--color-alloc-pe)', dot: 'bg-alloc-pe' },
  { label: 'Market-linked notes', share: 36.2, color: 'var(--color-alloc-mln)', dot: 'bg-alloc-mln' },
]

/** A holding's tile: a logo on a dark or light chip, or a short issuer code. */
type Tile = { kind: 'logo'; src: string; light?: boolean } | { kind: 'text'; label: string; light?: boolean }

type Holding = { name: string; detail: string; price: number | null; tile: Tile }

// Illustrative holdings for the product preview. The first three match the
// design; the rest rotate in so the panel feels live. Marks are placeholders.
// Shield AI and Saronic use monograms until their logo files are supplied.
const pool: Holding[] = [
  { name: 'Anduril Industries', detail: 'Private equity', price: 135.25, tile: { kind: 'logo', src: '/images/logo-anduril.svg' } },
  { name: 'Shield AI', detail: 'Private equity', price: 171.83, tile: { kind: 'text', label: 'S', light: true } },
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

const label = 'font-mono text-[11px] leading-none tracking-[0.3em] text-card-muted uppercase'

/** Donut chart: segments grow from 12 o'clock in step with the count-up. */
function AllocationDonut({ progress }: { progress: number }) {
  const size = 88
  const stroke = 6
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const gap = 2.5
  // Each segment starts where the previous one's full share ends.
  const starts = allocations.map((_, i) => allocations.slice(0, i).reduce((sum, a) => sum + (a.share / 100) * c, 0))
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0 -rotate-90">
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
    <div
      className={`flex size-[35px] shrink-0 items-center justify-center rounded-[7px] border ${
        tile.light
          ? 'border-white bg-white text-black'
          : tile.kind === 'logo'
            ? 'border-card-border bg-[#292929]'
            : 'border-card-border bg-[#202321] text-white/90'
      }`}
    >
      {tile.kind === 'logo' ? (
        <Image src={tile.src} alt="" width={20} height={19} className="h-[19px] w-5 object-contain opacity-90" />
      ) : (
        <span className="font-mono text-[11px] font-medium">{tile.label}</span>
      )}
    </div>
  )
}

/**
 * Illustrative portfolio card shown under the hero copy. It is decorative (a
 * picture of the product), so it's hidden from assistive tech.
 */
export function PortfolioPreview() {
  const { ready, rotated, slots, leaving, prices, ticks } = useDashboardMotion()
  const [primary] = allocations
  const share = useCountUp(primary?.share ?? 0, ready, 1800)
  const progress = share / (primary?.share || 1)

  return (
    <div
      aria-hidden
      className="w-full max-w-[400px] overflow-hidden rounded-[12px] border border-card-border bg-card text-left shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)]"
    >
      <div className="intro flex h-[46px] items-center justify-between border-b border-card-rule px-[18px]" style={d(1250)}>
        <p className="font-sans text-[13px] font-semibold">Portfolio</p>
        <p className={label}>Illustrative</p>
      </div>

      <div className="px-[25px]">
        <p className={`intro mt-[29px] ${label}`} style={d(1350)}>
          Allocation
        </p>
        <div className="intro mt-[25px] flex items-center gap-[27px]" style={d(1450)}>
          <AllocationDonut progress={progress} />
          <ul className="min-w-0 flex-1 divide-y divide-card-rule">
            {allocations.map((a) => (
              <li key={a.label} className="flex h-[35.5px] items-center gap-2.5 text-[13px]">
                <span className={`size-[6px] shrink-0 rounded-full ${a.dot}`} />
                <span className="flex-1 truncate text-[#b9baba]">{a.label}</span>
                <span className="font-mono text-[#e8e8e8] tabular-nums">
                  {(progress * a.share).toFixed(1)}%
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="draw-x mt-[23px] h-px bg-card-rule" style={d(1550)} />
        <p className={`intro mt-[26px] ${label}`} style={d(1600)}>
          Holdings
        </p>
      </div>

      <ul className="mx-[11px] mt-0.5 divide-y divide-[#202321]">
        {slots.map((poolIndex, slot) => {
          const h = pool[poolIndex]
          if (!h) return null
          const price = prices.get(h.name)
          const tick = ticks.get(h.name)
          const initial = !rotated
          return (
            <li key={slot} className="h-[65.5px] overflow-hidden">
              <div
                key={h.name}
                className={`flex h-full items-center gap-[13px] px-[10.5px] ${
                  leaving === slot ? 'row-out' : ready ? 'row-in' : 'opacity-0'
                }`}
                style={initial ? d(slot * 140) : undefined}
              >
                <HoldingTile tile={h.tile} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] leading-[1.3] font-semibold">{h.name}</p>
                  <p className="mt-[3px] truncate text-[13px] leading-[1.3] text-[#8b8d8c]">{h.detail}</p>
                </div>
                {price != null && (
                  <p
                    key={tick?.id ?? 0}
                    className={`font-mono text-[15px] text-[#e8e8e8] tabular-nums ${tick ? (tick.dir === 'up' ? 'tick-up' : 'tick-down') : ''}`}
                  >
                    ${price.toFixed(2)}
                  </p>
                )}
              </div>
            </li>
          )
        })}
      </ul>

      <div className="intro mt-[7px] flex h-[44px] items-center border-t border-card-rule px-[25px]" style={d(1700)}>
        <p className={label}>Not an offer or recommendation</p>
      </div>
    </div>
  )
}
