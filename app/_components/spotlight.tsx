'use client'

/**
 * Tracks the pointer over any `.spotlight` descendant and feeds its position
 * to the card's CSS glow (--mx / --my).
 */
export function Spotlight({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={className}
      onPointerMove={(e) => {
        const card = (e.target as HTMLElement).closest<HTMLElement>('.spotlight')
        if (!card) return
        const r = card.getBoundingClientRect()
        card.style.setProperty('--mx', `${e.clientX - r.left}px`)
        card.style.setProperty('--my', `${e.clientY - r.top}px`)
      }}
    >
      {children}
    </div>
  )
}
