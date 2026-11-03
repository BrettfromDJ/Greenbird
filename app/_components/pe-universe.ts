export type UniverseCompany = { name: string; logo: string; mark: string }

// The private equity universe and per-share marks as listed on
// mygreenbird.com/private-equity. Marks are indicative values from Notice.
// Anduril, Anthropic and OpenAI reuse the site's SVG marks; the rest are white
// silhouettes traced from Notice's company icons.
export const universe: UniverseCompany[] = [
  { name: 'Anduril', logo: '/images/logo-anduril.svg', mark: '$125.96' },
  { name: 'Anthropic', logo: '/images/logos/anthropic.svg', mark: '$864.99' },
  { name: 'Chaos Industries', logo: '/images/logos/pe/chaos-industries.png', mark: '$108.22' },
  { name: 'Crusoe', logo: '/images/logos/pe/crusoe.png', mark: '$189.05' },
  { name: 'Erebor', logo: '/images/logos/pe/erebor.png', mark: '$174.57' },
  { name: 'Figure AI', logo: '/images/logos/pe/figure-ai.png', mark: '$153.10' },
  { name: 'OpenAI (ChatGPT)', logo: '/images/logos/openai.svg', mark: '$813.17' },
  { name: 'Polymarket', logo: '/images/logos/pe/polymarket.png', mark: '$124.52' },
  { name: 'Saronic', logo: '/images/logos/pe/saronic.png', mark: '$29.75' },
  { name: 'Shield AI', logo: '/images/logos/pe/shield-ai.png', mark: '$169.84' },
]

export const universeSource = 'Source: Notice · Price date: Nov 3 · Not an offer or recommendation'
