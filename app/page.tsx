import { Hero } from './_components/hero'
import { InvestmentSolutions } from './_components/investment-solutions'
import { TrustBar } from './_components/trust-bar'
import { Universe } from './_components/universe'

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <Universe />
      <InvestmentSolutions />
    </main>
  )
}
