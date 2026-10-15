'use client'

import { useEffect, useRef } from 'react'

const PITCH = 12 // matches the dot texture spacing in the hero
const RADIUS = 1.1
const MAX_ALPHA = 0.6
const SWEEP_SPEED = 0.9 // radians per second
const FADE_MS = 500

type Dot = { x: number; y: number; base: number; phase: number; speed: number }

/**
 * A field of dots behind a logo tile. Each dot has its own resting opacity
 * and drifts on its own rhythm, while a soft beam rotates around the centre
 * and lifts the dots it passes. Only animates while `active`.
 */
export function DotField({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx || !active) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const { width, height } = canvas.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const cx = width / 2
    const cy = height / 2
    const offsetX = (width % PITCH) / 2 + PITCH / 2
    const offsetY = (height % PITCH) / 2 + PITCH / 2
    const dots: Dot[] = []
    for (let y = offsetY; y < height; y += PITCH) {
      for (let x = offsetX; x < width; x += PITCH) {
        dots.push({
          x,
          y,
          base: 0.12 + Math.random() * 0.5,
          phase: Math.random() * Math.PI * 2,
          speed: 0.8 + Math.random() * 1.8,
        })
      }
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height)
      const sweep = t * SWEEP_SPEED
      for (const dot of dots) {
        const twinkle = 0.5 + 0.5 * Math.sin(t * dot.speed + dot.phase)
        // How close this dot is to the rotating beam (1 on it, 0 opposite).
        const angle = Math.atan2(dot.y - cy, dot.x - cx)
        const beam = Math.pow(0.5 + 0.5 * Math.cos(angle - sweep), 6)
        const alpha = Math.min(MAX_ALPHA, dot.base * (0.35 + 0.65 * twinkle) + beam * 0.35)
        ctx.fillStyle = `rgba(70, 214, 128, ${alpha.toFixed(3)})`
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, RADIUS, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    if (reduced) {
      draw(0)
      return
    }

    let raf = 0
    const start = performance.now()
    const loop = (now: number) => {
      draw((now - start) / 1000)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      // Keep painting while the canvas fades out, then stop.
      setTimeout(() => cancelAnimationFrame(raf), FADE_MS)
    }
  }, [active])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 size-full transition-opacity duration-500 [mask-image:radial-gradient(ellipse_at_center,#000_35%,transparent_85%)] ${active ? 'opacity-100' : 'opacity-0'}`}
    />
  )
}
