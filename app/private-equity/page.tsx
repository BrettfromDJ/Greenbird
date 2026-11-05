import type { Metadata } from 'next'
import { d } from '../_components/delay'
import { IntroDone, Reveal } from '../_components/motion'
import { Container } from '../_components/primitives'
import { GetInTouch, NumberedCards, ProductHero, RiskSection, SectionIntro } from '../_components/product-sections'
import { SiteFooter } from '../_components/site-footer'
import { UniverseCard } from '../_components/universe-card'

export const metadata: Metadata = {
  title: 'Private Equity | Pre-IPO Investing | Greenbird',
  description:
    "Exposure to private companies we believe are defining their industries, structured through our affiliated Fund's Series LLC framework. Accredited investors only.",
}

const pillars = [
  { value: 'Leaders', label: 'Industry focus' },
  { value: 'Pre-IPO', label: 'Opportunity' },
  { value: 'Long-term', label: 'Hold discipline' },
]

const approach = [
  {
    title: 'Rigorous selection',
    body: 'We look for what we believe are durable competitive positions, exceptional teams, and businesses built to lead their categories. Diligence centers on market leadership and the path to profitability.',
  },
  {
    title: 'Private access',
    body: 'Private markets run on relationships. Ours put us in front of transactions that rarely reach traditional brokerage channels.',
  },
  {
    title: 'Patient capital',
    body: 'We hold for years, not quarters. The aim is an eventual liquidity event, an IPO or an acquisition, though none is ever assured.',
  },
  {
    title: 'Institutional structure',
    body: "Investments are structured through our affiliated Fund's Delaware Series LLCs, with professional management and simplified administration.",
  },
]

const risks = [
  {
    title: 'Illiquidity and loss risk',
    body: 'Private placement securities are illiquid with no guarantee of a secondary market. Investors should be prepared for the possibility of total loss of their entire investment.',
  },
  {
    title: 'Company risk',
    body: 'No assurance that portfolio companies will complete an IPO, liquidity event, or increase in value as projected.',
  },
  {
    title: 'Market development risk',
    body: 'No guarantee that any market for the securities will develop or that disposal will be possible at any time.',
  },
]

const disclosure = [
  'Private placement securities are speculative, illiquid, and entail a high level of risk, including the risk that an investor could lose their entire investment.',
  'There can be no assurance that issuers will complete an IPO or liquidity event, that securities will increase in value or have any value at all, that any market for the securities will develop, or that funds will be able to dispose of securities.',
  'These investments are suitable only for accredited investors who can afford to lose their entire investment and who understand the speculative nature of private equity.',
  'Per-share marks shown on this page are indicative values provided by Notice (notice.co), derived from secondary-market transactions, indications of interest, and other reference data. They are not trade prices, may be based on a limited number of transactions, and do not represent the price at which any investor could transact or the value of any interest in any fund. Greenbird is not affiliated with the companies shown, and references to them do not imply endorsement.',
]

export default function PrivateEquityPage() {
  return (
    <>
      <IntroDone />

      <ProductHero
        eyebrow="Private Equity"
        lead="Industry-defining companies,"
        rest="made investable."
        body={
          <>
            Exposure to private companies we believe are defining their industries, structured through our affiliated
            Fund&rsquo;s Series LLC framework and held alongside everything else you own. Accredited investors only.
          </>
        }
        anchor={{ href: '#strategy', label: 'Explore the strategy' }}
        aside={<UniverseCard />}
      />

      <main>
        <section id="strategy" className="scroll-mt-8 py-20 lg:py-[120px]">
          <Container>
            <SectionIntro
              eyebrow="Investment Strategy"
              lead="A disciplined approach"
              rest="to private markets."
              body="Companies are staying private longer, and more of their growth now happens before any public listing. We go where we see category-defining businesses, from emerging challengers to established names at scale, knowing that no listing, sale, or other liquidity event is ever assured."
            />

            {/* Three pillars, ruled like a term sheet. */}
            <Reveal className="mt-14 lg:mt-[72px]">
              <div className="r-draw h-px bg-white/15" />
              <dl className="grid sm:grid-cols-3">
                {pillars.map((p, i) => (
                  <div
                    key={p.value}
                    className={`r flex flex-col-reverse gap-3 py-8 sm:py-10 ${i > 0 ? 'border-t border-white/10 sm:border-t-0 sm:border-l sm:pl-8' : ''}`}
                    style={d(150 + i * 140)}
                  >
                    <dt className="font-mono text-[12px] leading-[1.3] text-white/50 uppercase">{p.label}</dt>
                    <dd className="font-display text-[44px] leading-none font-semibold tracking-[-0.01em] text-brand lg:text-[56px]">
                      {p.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="r-draw h-px bg-white/15" style={d(200)} />
            </Reveal>

            <div className="mt-14 lg:mt-[72px]">
              <NumberedCards items={approach} />
            </div>
          </Container>
        </section>

        <RiskSection
          intro="Private placement securities carry substantial risk. Read these carefully before considering any private equity investment."
          risks={risks}
          disclosureTitle="Important risk disclosure"
          disclosure={disclosure}
        />

        <GetInTouch
          lead="Public and private."
          rest="One account."
          body="Questions about private equity access? Get in touch and our team will follow up."
        />
      </main>

      <SiteFooter />
    </>
  )
}
