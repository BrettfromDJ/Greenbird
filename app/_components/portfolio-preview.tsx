'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { d } from './delay'
import { useCountUp, usePrefersReducedMotion } from './motion'

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

type Holding = { name: string; detail: string; price: number | null }

// Illustrative holdings for the product preview. The first three match the
// design; the rest rotate in so the panel feels live. Marks are placeholders.
const pool: Holding[] = [
  { name: 'Anduril Industries', detail: 'Private equity', price: 120.95 },
  { name: 'Shield AI', detail: 'Private equity', price: 159.59 },
  { name: 'Autocallable note', detail: '3-yr worst-of autocallable · BNP Paribas', price: null },
  { name: 'Saronic Technologies', detail: 'Private equity', price: 74.18 },
  { name: 'Buffered note', detail: '2-yr S&P 500 buffer · Goldman Sachs', price: null },
  { name: 'Databricks', detail: 'Private equity', price: 96.4 },
  { name: 'Digital note', detail: '18-mo Nasdaq-100 digital · J.P. Morgan', price: null },
]

const VISIBLE = 3
// When the panel finishes rising into the hero (see `.dash-in` delay in hero.tsx).
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

/**
 * Product preview shown at the bottom of the hero. It is decorative (a
 * picture of the app), so it's hidden from assistive tech and laid out at a
 * fixed size like the mock it is.
 */
export function PortfolioPreview() {
  const { ready, rotated, slots, leaving, prices, ticks } = useDashboardMotion()

  const [primary] = allocations
  const share = useCountUp(primary?.share ?? 0, ready, 1800)

  return (
    <div
      aria-hidden
      className="relative h-[657px] w-[961px] overflow-hidden rounded-[4px] text-left"
      style={{
        backgroundImage: 'linear-gradient(145.62deg, rgb(4 22 12) 3.19%, rgb(3 14 8) 103.55%)',
        boxShadow:
          'inset -2.113px -2.113px 2.113px 0 rgb(255 255 255 / 0.05), inset 1.056px 1.056px 1.056px 0 rgb(255 255 255 / 0.15)',
      }}
    >
      <aside className="absolute inset-y-0 left-0 flex w-20 flex-col items-center border-r border-white/20 pt-[27px]">
        <Image src="/images/greenbird-bird@4x.png" alt="" width={31} height={34} className="intro" style={d(1250)} />
        <ul className="mt-[14px] flex flex-col gap-[5px]">
          {sidebar.map((item, i) => (
            <li
              key={item.label}
              className={`intro flex size-[42px] items-center justify-center rounded-[4px] ${item.active ? 'glass' : ''} ${i === 1 ? 'mt-[3px]' : ''}`}
              style={d(1350 + i * 80)}
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
        <p className="intro font-serif text-[24px] leading-[1.3] font-extralight" style={d(1350)}>
          Your portfolio
        </p>
        <p className="intro mt-[21px] ml-[3px] font-mono text-[12px] leading-none uppercase" style={d(1450)}>
          Allocations
        </p>
        <div
          className="glass intro mt-[21px] ml-[3px] flex h-[184px] w-[384px] overflow-hidden rounded-[4px]"
          style={{ '--glass-angle': '154.38deg', ...d(1500) } as React.CSSProperties}
        >
          <div
            className="bar-sheen relative h-full overflow-hidden rounded-l-[4px] bg-brand shadow-[inset_-2.113px_-2.113px_2.113px_0_rgb(255_255_255/0.05),inset_1.056px_1.056px_1.056px_0_rgb(255_255_255/0.15)] transition-[width] duration-[1800ms] ease-(--ease-expo)"
            style={{ width: ready ? `${primary?.share ?? 0}%` : '0%' }}
          />
        </div>
        <div className="intro mt-3 flex w-[381px] justify-between text-[12px] leading-[1.3] tabular-nums" style={d(1550)}>
          {allocations.map((a) => {
            // Both figures climb together as the bar fills.
            const value = (share / (primary?.share || 1)) * a.share
            return (
              <p key={a.label}>
                <span className="text-white/50">{a.label} </span>
                {value.toFixed(1)}%
              </p>
            )
          })}
        </div>
      </div>

      <div className="absolute top-[62px] left-[590px] w-[311px]">
        <p className="intro flex items-center gap-2 font-mono text-[12px] leading-none uppercase" style={d(1400)}>
          Holdings
          <span className="live-dot size-[5px] rounded-full bg-[#00c864]" />
        </p>
        <ul className="mt-6">
          {slots.map((poolIndex, slot) => {
            const h = pool[poolIndex]
            if (!h) return null
            const price = prices.get(h.name)
            const tick = ticks.get(h.name)
            const initial = !rotated
            return (
              <li key={slot}>
                {slot > 0 && <div className="hairline intro mt-5 mb-[19px]" style={d(1700 + slot * 120)} />}
                <div
                  key={h.name}
                  className={`flex h-[50px] gap-3 ${leaving === slot ? 'row-out' : ready ? 'row-in' : 'opacity-0'}`}
                  style={initial ? d(slot * 140) : undefined}
                >
                  <div className="glass size-[50px] shrink-0 rounded-[4px]">
                    <div className="tile-shimmer absolute inset-0 rounded-[4px]" style={initial ? d(slot * 140 + 150) : undefined} />
                  </div>
                  <div className="min-w-0 flex-1 pt-[7px]">
                    <div className="flex items-baseline justify-between gap-3 text-[14px] leading-[1.3]">
                      <p className="truncate">{h.name}</p>
                      {price != null && (
                        <p
                          key={tick?.id ?? 0}
                          className={`font-mono tabular-nums ${tick ? (tick.dir === 'up' ? 'tick-up' : 'tick-down') : ''}`}
                        >
                          ${price.toFixed(2)}
                        </p>
                      )}
                    </div>
                    <p className="mt-[2px] truncate text-[12px] leading-[1.3] text-white/50">{h.detail}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
