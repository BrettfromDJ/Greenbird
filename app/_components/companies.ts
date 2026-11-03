export type Company = { name: string; logo: string; mark: string }

// Anduril's mark is from the Figma file; the rest are simple-icons (CC0).
// Marks are placeholders until real pricing data is wired in.
export const companies: Company[] = [
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

/** A company's mark as a number, e.g. '$1,315.00' → 1315. */
export const markValue = (c: Company) => Number(c.mark.replace(/[$,]/g, ''))
