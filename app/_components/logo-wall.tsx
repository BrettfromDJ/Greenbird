'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { d } from './delay'
import { DotField } from './dot-field'
import { usePrefersReducedMotion } from './motion'

type Company = { name: string; logo: string; mark: string }

// Anduril's mark is from the Figma file; the rest are simple-icons (CC0).
// Marks are placeholders until real pricing data is wired in.
const companies: Company[] = [
  { name: 'Anduril', logo: '/images/logo-anduril.svg', mark: '$120.95' },
  { name: 'SpaceX', logo: '/images/logos/spacex.svg', mark: '$212.40' },
  { name: 'Stripe', logo: '/images/logos/stripe.svg', mark: '$31.75' },
  { name: 'Databricks', logo: '/images/logos/databricks.svg', mark: '$96.40' },
  { name: 'OpenAI', logo: '/images/logos/openai.svg', mark: '$188.20' },
  { name: 'Anthropic', logo: '/images/logos/anthropic.svg', mark: '$142.65' },
  { name: 'Revolut', logo: '/images/logos/revolut.svg', mark: '$1,315.00' },
  { name: 'Canva', logo: '/images/logos/canva.svg', mark: '$44.10' },
  { name: 'Discord', logo: '/images/logos/discord.svg', mark: '$27.85' },
  { name: 'Epic Games', logo: '/images/logos/epicgames.svg', mark: '$58.30' },
  { name: 'Notion', logo: '/images/logos/notion.svg', mark: '$23.60' },
  { name: 'Perplexity', logo: '/images/logos/perplexity.svg', mark: '$64.95' },
  { name: 'Mistral AI', logo: '/images/logos/mistralai.svg', mark: '$39.20' },
  { name: 'Brex', logo: '/images/logos/brex.svg', mark: '$12.45' },
  { name: 'Vercel', logo: '/images/logos/vercel.svg', mark: '$18.90' },
]

const TILES = 10
const COLUMNS = 5
const SWAP_EVERY = 1100

type Tile = { current: number; previous: number | null; swaps: number }

const initialTiles: Tile[] = Array.from({ length: TILES }, (_, i) => ({ current: i, previous: null, swaps: 0 }))

function shuffledTiles() {
  const order = Array.from({ length: TILES }, (_, i) => i)
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[order[i], order[j]] = [order[j]!, order[i]!]
  }
  return order
}

/**
 * The company wall. While it's on screen, one tile at a time swaps to a
 * company that isn't showing, in shuffled order, so the grid keeps changing
 * without ever showing the same name twice. A hovered tile holds still.
 */
export function LogoWall() {
  const reduced = usePrefersReducedMotion()
  const [tiles, setTiles] = useState(initialTiles)
  const [onScreen, setOnScreen] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)
  const tilesRef = useRef(initialTiles)
  // Companies waiting off the wall, oldest first, so every name gets a turn.
  const waiting = useRef(companies.map((_, i) => i).slice(TILES))
  const hovered = useRef<number | null>(null)
  const [hoveredTile, setHoveredTile] = useState<number | null>(null)

  useEffect(() => {
    const el = listRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setOnScreen(!!entry?.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!onScreen || reduced) return
    let order: number[] = []
    const interval = setInterval(() => {
      if (!order.length) order = shuffledTiles()
      const tile = order.pop()!
      if (tile === hovered.current) return
      const incoming = waiting.current.shift()
      if (incoming === undefined) return

      const next = tilesRef.current.map((t, i) =>
        i === tile ? { current: incoming, previous: t.current, swaps: t.swaps + 1 } : t,
      )
      waiting.current.push(tilesRef.current[tile]!.current)
      tilesRef.current = next
      setTiles(next)
    }, SWAP_EVERY)
    return () => clearInterval(interval)
  }, [onScreen, reduced])

  return (
    <ul ref={listRef} className="grid grid-cols-2 border-t border-l border-line sm:grid-cols-3 lg:grid-cols-5">
      {tiles.map((tile, i) => {
        // Tiles cascade in diagonally from the top-left when the wall scrolls in.
        const wave = (i % COLUMNS) + Math.floor(i / COLUMNS)
        const current = companies[tile.current]!
        const previous = tile.previous === null ? null : companies[tile.previous]!
        return (
          <li
            key={i}
            className="r border-r border-b border-line"
            style={d(wave * 80)}
            onPointerEnter={() => {
              hovered.current = i
              setHoveredTile(i)
            }}
            onPointerLeave={() => {
              hovered.current = null
              setHoveredTile(null)
            }}
          >
            <div className="group relative h-[158px] overflow-hidden font-mono text-[12px] leading-[1.3] transition-colors duration-500 hover:bg-white/[0.025]">
              <DotField active={hoveredTile === i} />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px origin-center scale-x-0 bg-brand transition-transform duration-500 ease-(--ease-expo) group-hover:scale-x-100" />
              {previous && <TileFace key={`${tile.swaps}-out`} company={previous} state="out" />}
              <TileFace key={`${tile.swaps}-in`} company={current} state={tile.swaps ? 'in' : 'static'} />
            </div>
          </li>
        )
      })}
    </ul>
  )
}

function TileFace({ company, state }: { company: Company; state: 'static' | 'in' | 'out' }) {
  return (
    <div
      aria-hidden={state === 'out'}
      className={`absolute inset-0 flex flex-col items-center pt-[41px] ${state === 'in' ? 'face-in' : state === 'out' ? 'face-out' : ''}`}
    >
      {state === 'in' && <span className="face-flash pointer-events-none absolute inset-0" />}
      {/* Hover moves the image; the wrapper carries the swap animation, whose fill would override it. */}
      <div className="face-part" style={d(140)}>
        <Image
          src={company.logo}
          alt=""
          width={20}
          height={19}
          className="h-[19px] w-5 object-contain transition-transform duration-500 ease-(--ease-expo) group-hover:-translate-y-1 group-hover:scale-125"
        />
      </div>
      <p
        className="face-part mt-[17px] text-white/50 uppercase transition-colors duration-500 group-hover:text-white/80"
        style={d(200)}
      >
        {company.name}
      </p>
      <p className="face-part mt-[9px] text-white/50" style={d(260)}>
        MARK: <span className="text-white">{company.mark}</span>
      </p>
    </div>
  )
}
