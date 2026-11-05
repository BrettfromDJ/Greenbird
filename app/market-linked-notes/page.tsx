import type { Metadata } from 'next'
import { d } from '../_components/delay'
import { IntroDone, Reveal } from '../_components/motion'
import { NoteCard } from '../_components/note-card'
import { PayoffChart } from '../_components/payoff-chart'
import { Container } from '../_components/primitives'
import { GetInTouch, NumberedCards, ProductHero, RiskSection, SectionIntro } from '../_components/product-sections'
import { SiteFooter } from '../_components/site-footer'

export const metadata: Metadata = {
  title: 'Market-Linked Notes | Structured Products | Greenbird',
  description:
    'Senior unsecured debt of major financial institutions, with returns linked to indices, equity baskets, commodities, or currencies. All payments are subject to the issuer’s credit risk.',
}

const structures = [
  {
    title: 'Principal Protected',
    body: '100% of principal repaid at maturity, but only if held to maturity and only if the issuer remains able to pay. Sold before maturity, a note may be worth significantly less than its purchase price. Returns may be capped or contingent on the underlying’s performance.',
  },
  {
    title: 'Buffer Notes',
    body: 'A buffer absorbs the first 10–30% of market decline; the investor bears all losses beyond the buffer. Upside participates in or matches the underlying up to a cap.',
  },
  {
    title: 'Growth Notes',
    body: 'Leveraged upside participation (e.g., 1.5×, 2×, 3×) on the underlying’s performance, capped at a maximum return. Principal is fully exposed to declines in the underlying, and to issuer credit risk.',
  },
]

const reasons = [
  {
    title: 'Defined payoff terms',
    body: 'Each note’s payoff profile is set at issuance: caps, buffers, participation rates, contingent coupons. The terms set out how upside and downside are calculated at maturity.',
  },
  {
    title: 'Diversified asset access',
    body: 'Exposure to indices, equity baskets, commodities, and currencies that are otherwise difficult to access through traditional brokerage products.',
  },
  {
    title: 'Major issuers',
    body: 'Issued by large financial institutions, including BNP Paribas, Goldman Sachs, and JPMorgan. Notes are unsecured obligations: every payment, including any principal repayment, depends entirely on the issuer’s ability to pay.',
  },
  {
    title: 'Account eligibility',
    body: 'Notes are eligible for a wide range of brokerage account types, including taxable, IRA, and trust structures. Held with Axos Clearing alongside other positions.',
  },
]

const fit = [
  {
    title: 'Hold-to-maturity investors',
    body: 'Long-term investors comfortable holding to maturity, who understand returns can be capped or conditional, and accept issuer credit risk and limited liquidity.',
  },
  {
    title: 'Defined-payoff investing',
    body: 'Investors seeking exposure with pre-set terms, such as capped upside, buffers, and contingent coupons, who understand how those terms shape returns.',
  },
  {
    title: 'Diversification',
    body: 'Investors looking to add a defined-payoff sleeve to a broader portfolio. Suitable for buy-and-hold, not short-term trading.',
  },
]

const risks = [
  {
    title: 'Principal and performance risk',
    body: 'Principal is scheduled to be repaid by the issuer only on principal-protected notes held to maturity; on other notes, you can lose some or all of your principal. Returns may differ from underlying performance due to caps, participation rates, and other structural features.',
  },
  {
    title: 'Liquidity risk',
    body: 'Early redemption fees may apply and there is no guarantee of a secondary market. Notes are designed for buy-and-hold investors who can hold to maturity.',
  },
  {
    title: 'Credit risk',
    body: 'Notes are subject to the issuer’s credit risk. If the issuer cannot meet its obligations, you may not receive expected returns or principal.',
  },
]

const disclosure = [
  'Market-Linked Notes are not FDIC-insured, and you can lose some or all of your principal on notes without principal repayment features. Any principal repayment depends on the issuer’s credit. Returns may not reflect the full performance of the reference securities or index and may be lower than a direct investment.',
  'Tax treatment: MLN returns are frequently considered interest income and taxed at the holder’s ordinary income rate, but may be subject to capital gains tax. Treatment varies based on product terms. Consult your tax advisor.',
  'Notes are subject to the issuer’s credit risk. Diversification does not ensure a profit or protect against loss in a declining market.',
]

export default function MarketLinkedNotesPage() {
  return (
    <>
      <IntroDone />

      <ProductHero
        eyebrow="Market-Linked Notes"
        lead="Know every term,"
        rest="before you invest."
        body="Senior unsecured debt of major financial institutions, with returns linked to indices, equity baskets, commodities, or currencies. Caps, buffers, and participation rates set at issuance. All payments are subject to the issuer’s credit risk."
        anchor={{ href: '#structures', label: 'Explore the structures' }}
        aside={<NoteCard />}
      />

      <main>
        <section id="structures" className="scroll-mt-8 pt-20 lg:pt-[120px]">
          <Container>
            <SectionIntro
              eyebrow="Structures"
              lead="Three structures"
              rest="to know."
              body="Each note’s payoff profile is set at issuance. The terms, including capped upside, downside buffers, and participation rates, are stated in the offering documents."
            />
            <div className="mt-14 lg:mt-[72px]">
              <NumberedCards items={structures} columns={3}>
                {(i) => <PayoffChart index={i} />}
              </NumberedCards>
            </div>
            <p className="mt-5 font-mono text-[11px] leading-[1.4] text-white/40 uppercase">
              Schematic payoff shapes at maturity · Dashed line: the underlying · Not to scale
            </p>
          </Container>
        </section>

        <section className="py-20 lg:py-[120px]">
          <Container>
            <SectionIntro
              eyebrow="Why MLNs"
              lead="Why investors"
              rest="hold them."
              body="Market-linked notes trade open-ended upside for a stated payoff profile. Most investors use them as a defined sleeve within a broader portfolio."
            />
            <div className="mt-14 lg:mt-[72px]">
              <NumberedCards items={reasons} />
            </div>
          </Container>
        </section>

        {/* Investor fit: ruled profile rows. */}
        <section className="pb-20 lg:pb-[120px]">
          <Container>
            <SectionIntro
              eyebrow="Investor Fit"
              lead="Who"
              rest="holds them."
              body="MLNs are designed for buy-and-hold investors with specific outcome objectives. Not appropriate for all investors."
            />
            <Reveal className="mt-14 lg:mt-[72px]">
              <div className="r-draw h-px bg-white/15" />
              {fit.map((f, i) => (
                <div key={f.title}>
                  <div
                    className="r group grid gap-4 py-8 sm:grid-cols-[80px_minmax(0,1fr)] lg:grid-cols-[80px_minmax(0,1fr)_440px] lg:items-baseline lg:py-10"
                    style={d(150 + i * 140)}
                  >
                    <span className="font-mono text-[12px] leading-[1.3] text-brand uppercase">
                      Profile {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-[28px] leading-[1.1] font-semibold transition-colors duration-500 group-hover:text-brand lg:text-[36px]">
                      {f.title}
                    </h3>
                    <p className="text-[14px] leading-[1.5] text-white/60 sm:col-start-2 lg:col-start-3">{f.body}</p>
                  </div>
                  <div className="r-draw h-px bg-white/15" style={d(250 + i * 140)} />
                </div>
              ))}
            </Reveal>
          </Container>
        </section>

        <RiskSection
          intro="MLNs carry distinct risks: issuer credit, structural caps, illiquidity. Read carefully before considering an investment."
          risks={risks}
          disclosureTitle="Additional disclosures"
          disclosure={disclosure}
        />

        <GetInTouch
          lead="Hold notes alongside"
          rest="everything else."
          body="Questions about market-linked notes? Get in touch and our team will follow up."
        />
      </main>

      <SiteFooter />
    </>
  )
}
