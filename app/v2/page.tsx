import type { Metadata } from 'next'
import { LandingPage } from '../_components/landing-page'

export const metadata: Metadata = {
  title: 'Greenbird — Private markets. Possibilities, expanded. (V2)',
  description: 'Private equity and market-linked notes through a single account.',
}

/** The deep-green palette from the "Home V2" Figma frame (node 35:232). */
export default function HomeV2() {
  return <LandingPage theme="v2" />
}
