'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { companies, markValue } from './companies'
import { d } from './delay'
import { usePrefersReducedMotion } from './motion'

const ROWS = companies.slice(0, 6)
const POINTS = 18
const TICK_EVERY = 1600
const READY_AT = 1500

// Deterministic starting history per company, so server and client agree.
function seededSeries(seed: number, end: number) {
  let x = (seed + 1) * 9301
  const rand = () => (x = (x * 9301 + 49297) % 233280) / 233280
  const series = [end]
  for (let i = 1; i < POINTS; i++) series.unshift(series[0]! * (1 + (rand() - 0.52) * 0.035))
  return series
}

function sparkPath(series: number[], w: number, h: number) {
  const min = Math.min(...series)
  const max = Math.max(...series)
  const span = max - min || 1
  return series
    .map(
      (v, i) =>
        `${i === 0 ? 'M' : 'L'}${((i / (series.length - 1)) * w).toFixed(1)},${(h - 2 - ((v - min) / span) * (h - 4)).toFixed(1)}`,
    )
    .join(' ')
}

const fmt = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

type Tick = { dir: 'up' | 'down'; id: number }

/**
 * Illustrative "indicative marks" panel for the private equity hero. Rows draw
 * their sparklines in, then one mark at a time nudges like a live feed.
 * Decorative, so hidden from assistive tech.
 */
export function MarkTicker() {
  const reduced = usePrefersReducedMotion()
  const [series, setSeries] = useState(() => ROWS.map((c, i) => seededSeries(i, markValue(c))))
  const [ticks, setTicks] = useState<(Tick | undefined)[]>(() => ROWS.map(() => undefined))

  useEffect(() => {
    if (reduced) return
    let id = 0
    let interval: ReturnType<typeof setInterval>
    const start = setTimeout(() => {
      interval = setInterval(() => {
        const row = Math.floor(Math.random() * ROWS.length)
        const change = (Math.random() - 0.42) * 0.018
        setSeries((all) => all.map((s, i) => (i === row ? [...s.slice(1), s[s.length - 1]! * (1 + change)] : s)))
        setTicks((all) => all.map((t, i) => (i === row ? { dir: change >= 0 ? 'up' : 'down', id: ++id } : t)))
      }, TICK_EVERY)
    }, READY_AT)
    return () => {
      clearTimeout(start)
      clearInterval(interval)
    }
  }, [reduced])

  return (
    <div
      aria-hidden
      className="card-sheen relative w-full max-w-[480px] overflow-hidden rounded-[4px] bg-panel/85 text-left backdrop-blur-[40px] shadow-[inset_-2.113px_-2.113px_2.113px_0_rgb(255_255_255/0.05),inset_1.056px_1.056px_1.056px_0_rgb(255_255_255/0.15),0_40px_90px_-30px_rgb(0_0_0/0.7)]"
    >
      <div className="intro flex h-[56px] items-center justify-between px-5 sm:px-6" style={d(1150)}>
        <p className="flex items-center gap-2 font-display text-[18px] leading-none font-semibold">
          Indicative marks
          <span className="live-dot size-[5px] rounded-full bg-brand" />
        </p>
        <p className="font-mono text-[11px] leading-none text-white/40 uppercase">Illustrative</p>
      </div>
      <div className="hairline draw-x" style={d(1200)} />

      <ul className="px-5 sm:px-6">
        {ROWS.map((c, i) => {
          const s = series[i]!
          const last = s[s.length - 1]!
          const first = s[0]!
          const change = (last / first - 1) * 100
          const tick = ticks[i]
          return (
            <li
              key={c.name}
              className={`intro flex h-[60px] items-center gap-3 ${i > 0 ? 'border-t border-white/10' : ''}`}
              style={d(1250 + i * 90)}
            >
              <div className="glass glass-tint flex size-9 shrink-0 items-center justify-center rounded-[4px]">
                <Image src={c.logo} alt="" width={18} height={18} className="size-[18px] object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] leading-[1.3]">{c.name}</p>
                <p className="mt-[2px] text-[12px] leading-[1.3] text-white/50">Private equity</p>
              </div>
              <svg width="72" height="26" viewBox="0 0 72 26" className="hidden shrink-0 sm:block">
                <path
                  d={sparkPath(s, 72, 26)}
                  fill="none"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  pathLength={1}
                  className="spark-draw transition-[stroke] duration-500"
                  style={{ ...d(1500 + i * 120), stroke: change >= 0 ? 'var(--color-brand)' : 'rgb(255 255 255 / 0.45)' }}
                />
              </svg>
              <div className="w-[84px] shrink-0 text-right">
                <p
                  key={tick?.id ?? 0}
                  className={`font-mono text-[14px] tabular-nums ${tick ? (tick.dir === 'up' ? 'tick-up' : 'tick-down') : ''}`}
                >
                  {fmt(last)}
                </p>
                <p
                  className={`mt-[2px] font-mono text-[11px] tabular-nums ${change >= 0 ? 'text-brand' : 'text-white/45'}`}
                >
                  {change >= 0 ? '+' : ''}
                  {change.toFixed(1)}%
                </p>
              </div>
            </li>
          )
        })}
      </ul>

      <div className="hairline draw-x" style={d(1700)} />
      <div className="intro flex h-[46px] items-center justify-between gap-4 px-5 sm:px-6" style={d(1750)}>
        <p className="font-mono text-[11px] leading-none text-white/40 uppercase">Source: Notice</p>
        <p className="font-mono text-[11px] leading-none text-white/40 uppercase">Not an offer</p>
      </div>
    </div>
  )
}
