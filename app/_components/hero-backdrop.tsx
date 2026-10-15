'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

/**
 * The hero's dot field: a drifting green glow under the exported dot texture,
 * which breathes slowly, plus a spotlight that follows the pointer and lights
 * up the dot grid around it.
 */
export function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    const host = el?.parentElement
    if (!el || !host) return
    if (window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches) return

    let raf = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = host.getBoundingClientRect()
        el.style.setProperty('--mx', `${e.clientX - r.left}px`)
        el.style.setProperty('--my', `${e.clientY - r.top}px`)
        el.dataset.spot = ''
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(raf)
      delete el.dataset.spot
    }
    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div ref={ref} aria-hidden className="intro-fade pointer-events-none absolute inset-0 select-none">
      <div className="hero-aurora absolute -inset-[10%]" />
      <div className="hero-dots absolute inset-0">
        <Image src="/images/dots-hero@2x.png" alt="" fill priority sizes="1400px" className="object-cover object-top" />
      </div>
      <div className="hero-spot hero-spot-grid absolute inset-0" />
      <div className="hero-spot absolute inset-0">
        <Image
          src="/images/dots-hero@2x.png"
          alt=""
          fill
          sizes="1400px"
          className="hero-spot-dots object-cover object-top"
        />
      </div>
    </div>
  )
}
