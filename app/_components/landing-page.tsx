import { Hero } from './hero'
import { InvestmentSolutions } from './investment-solutions'
import { SiteFooter } from './site-footer'
import { TrustBar } from './trust-bar'
import { Universe } from './universe'

export function LandingPage() {
  return (
    <>
      <main>
        <Hero />
        <TrustBar />
        <Universe />
        <InvestmentSolutions />
      </main>
      <SiteFooter />
    </>
  )
}
