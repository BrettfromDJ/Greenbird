import { Hero } from './hero'
import { InvestmentSolutions } from './investment-solutions'
import { TrustBar } from './trust-bar'
import { Universe } from './universe'

/**
 * The full landing page. `theme` swaps the surface palette (see the
 * `.theme-*` classes in globals.css); layout and content are shared.
 */
export function LandingPage({ theme }: { theme?: 'v2' }) {
  return (
    <main className={theme ? `theme-${theme} min-h-screen bg-ink` : undefined}>
      <Hero />
      <TrustBar />
      <Universe />
      <InvestmentSolutions />
    </main>
  )
}
