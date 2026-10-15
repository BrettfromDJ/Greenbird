'use client'

import { useEffect, useRef, useState } from 'react'

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return reduced
}

/**
 * Plays the `.r*` animations inside it once it scrolls into view. Content
 * that's already on screen when the page loads plays immediately; content
 * below the fold is hidden ("armed") only after JS runs, so the
 * server-rendered page never depends on this.
 */
export function Reveal({
  className = '',
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const show = () => {
      el.dataset.in = ''
    }
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      show()
      return
    }

    el.dataset.armed = ''
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          show()
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  )
}

/** Eases a number from 0 to `target` once `start` flips true. */
export function useCountUp(target: number, start: boolean, duration = 1600) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf = 0
    const t0 = performance.now()
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / duration)
      setValue(target * (1 - Math.pow(1 - p, 4)))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, start, duration])
  return value
}

/** Marks the page load sequence as finished; see `[data-intro-done]` in globals.css. */
export function IntroDone({ after = 3500 }: { after?: number }) {
  useEffect(() => {
    const t = setTimeout(() => {
      document.documentElement.dataset.introDone = ''
    }, after)
    return () => clearTimeout(t)
  }, [after])
  return null
}
