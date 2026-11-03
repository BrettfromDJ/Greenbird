import type { Metadata } from 'next'
import Image from 'next/image'
import { d } from '../_components/delay'
import { HeroBackdrop } from '../_components/hero-backdrop'
import { IntroDone, Reveal } from '../_components/motion'
import { Container, DisplayHeading, Eyebrow, PrimaryButton } from '../_components/primitives'
import { SiteFooter } from '../_components/site-footer'
import { SiteNav } from '../_components/site-nav'
import { Spotlight } from '../_components/spotlight'
import { UniverseCard } from '../_components/universe-card'

export const metadata: Metadata = {
  title: 'Private Equity | Pre-IPO Investing | Greenbird',
  description:
    "Exposure to private companies we believe are defining their industries, structured through our affiliated Fund's Series LLC framework. Accredited investors only.",
}

const LOGIN_URL = 'https://axosclearing.fisglobal.com/investor/axos'

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

      {/* Hero */}
      <section className="relative mx-2 mt-2 overflow-hidden rounded-[10px] bg-hero px-4 pb-16 sm:mx-5 sm:mt-5 sm:px-8 lg:pb-[90px]">
        <HeroBackdrop />
        <div className="relative pt-[26px]">
          <SiteNav />
          <div className="draw-x mt-8 h-px bg-line-hero" style={d(250)} />

          <div className="grid items-center gap-14 pt-16 lg:grid-cols-[minmax(0,1fr)_480px] lg:gap-10 lg:pt-[90px]">
            <div>
              <div className="intro flex items-center gap-2" style={d(350)}>
                <span className="live-dot size-[7px] rounded-full bg-brand" />
                <Eyebrow className="text-brand">Private Equity</Eyebrow>
              </div>
              <DisplayHeading
                as="h1"
                motion="intro"
                delay={450}
                className="mt-7"
                lead="Industry-defining companies,"
                rest="made investable."
                dimRest
              />
              <p className="intro mt-7 max-w-[500px] text-[16px] leading-[1.45] text-white/70" style={d(750)}>
                Exposure to private companies we believe are defining their industries, structured through our
                affiliated Fund&rsquo;s Series LLC framework and held alongside everything else you own. Accredited
                investors only.
              </p>
              <div className="intro mt-9 flex flex-wrap items-center gap-6" style={d(880)}>
                <PrimaryButton href="/contact" size="lg" autoShine>
                  Contact us
                </PrimaryButton>
                <a
                  href="#strategy"
                  className="group inline-flex items-center gap-2 text-[14px] leading-none transition-colors hover:text-brand"
                >
                  Explore the strategy
                  <span className="glass glass-tint flex size-[30px] items-center justify-center rounded-full">
                    <Image
                      src="/images/icon-arrow-up-right-sm.svg"
                      alt=""
                      width={14}
                      height={14}
                      className="rotate-90 transition-transform duration-500 ease-(--ease-expo) group-hover:translate-y-0.5"
                    />
                  </span>
                </a>
              </div>
            </div>

            <div className="dash-in flex justify-center lg:justify-end" style={d(950)}>
              <UniverseCard />
            </div>
          </div>
        </div>
      </section>

      <main>
        {/* Investment strategy */}
        <section id="strategy" className="scroll-mt-8 pt-20 pb-20 lg:pt-[120px] lg:pb-[120px]">
          <Container>
            <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-end">
              <div>
                <Eyebrow className="r text-brand">Investment Strategy</Eyebrow>
                <DisplayHeading
                  className="mt-6"
                  delay={100}
                  lead="A disciplined approach"
                  rest="to private markets."
                  dimRest
                />
              </div>
              <p className="r text-[14px] leading-[1.5] text-white/60" style={d(300)}>
                Companies are staying private longer, and more of their growth now happens before any public listing.
                We go where we see category-defining businesses, from emerging challengers to established names at
                scale, knowing that no listing, sale, or other liquidity event is ever assured.
              </p>
            </Reveal>

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

            <Spotlight className="mt-14 lg:mt-[72px]">
              <Reveal className="grid gap-5 sm:grid-cols-2 lg:gap-6">
                {approach.map((a, i) => (
                  <article
                    key={a.title}
                    className="spotlight r group flex flex-col overflow-hidden rounded-[8px] border border-white/10 bg-hero/40 p-6 transition-colors duration-500 hover:border-brand/30 sm:p-8"
                    style={d((i % 2) * 140 + Math.floor(i / 2) * 120)}
                  >
                    <span className="flex size-[50px] items-center justify-center rounded-full border border-[rgb(105_255_120/0.2)] font-numeric text-[16px] text-brand transition-colors duration-500 group-hover:border-brand/60">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="mt-12">
                      <h3 className="font-display text-[26px] leading-[1.1] font-semibold">{a.title}</h3>
                      <p className="mt-3 max-w-[460px] text-[14px] leading-[1.5] text-white/60">{a.body}</p>
                    </div>
                  </article>
                ))}
              </Reveal>
            </Spotlight>
          </Container>
        </section>

        {/* Important considerations */}
        <section className="bg-sage py-20 text-on-light lg:py-[100px]">
          <Container>
            <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-end">
              <div>
                <Eyebrow className="r text-on-light/50">Important Considerations</Eyebrow>
                <DisplayHeading
                  className="mt-6"
                  delay={100}
                  tone="dark"
                  lead="Risk factors"
                  rest="and disclosures."
                />
              </div>
              <p className="r text-[14px] leading-[1.5] text-on-light/70" style={d(300)}>
                Private placement securities carry substantial risk. Read these carefully before considering any
                private equity investment.
              </p>
            </Reveal>

            <Reveal className="mt-14 grid gap-5 lg:grid-cols-3 lg:gap-6">
              {risks.map((r, i) => (
                <article
                  key={r.title}
                  className="r rounded-[8px] border border-on-light/15 bg-white/25 p-6 transition-[background-color,border-color] duration-500 hover:border-on-light/30 hover:bg-white/40 sm:p-8"
                  style={d(i * 140)}
                >
                  <div className="flex items-center gap-2">
                    <span className="size-[7px] rounded-full bg-on-light" />
                    <span className="font-mono text-[12px] leading-[1.3] text-on-light/50 uppercase">
                      Risk {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-8 font-display text-[24px] leading-[1.15] font-semibold">{r.title}</h3>
                  <p className="mt-3 text-[14px] leading-[1.5] text-on-light/70">{r.body}</p>
                </article>
              ))}
            </Reveal>

            <Reveal className="mt-5 lg:mt-6">
              <div className="r rounded-[8px] bg-on-light p-6 text-white sm:p-10" style={d(100)}>
                <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12">
                  <div className="flex items-start gap-2">
                    <span className="live-dot mt-[5px] size-[7px] shrink-0 rounded-full bg-brand" />
                    <h3 className="font-mono text-[12px] leading-[1.3] text-brand uppercase">
                      Important risk disclosure
                    </h3>
                  </div>
                  <div className="space-y-4 text-[13px] leading-[1.6] text-white/65">
                    {disclosure.map((p) => (
                      <p key={p.slice(0, 24)}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Get in touch */}
        <section>
          <Container className="py-20 lg:py-[110px]">
            <Reveal className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div>
                <Eyebrow className="r text-brand">Get in touch</Eyebrow>
                <DisplayHeading
                  className="mt-6"
                  delay={100}
                  lead="Public and private."
                  rest="One account."
                  dimRest
                />
                <p className="r mt-6 max-w-[420px] text-[14px] leading-[1.5] text-white/60" style={d(300)}>
                  Questions about private equity access? Get in touch and our team will follow up.
                </p>
              </div>
              <div className="r flex flex-wrap items-center gap-6" style={d(400)}>
                <PrimaryButton href="/contact" size="lg">
                  Contact us
                </PrimaryButton>
                <a
                  href={LOGIN_URL}
                  className="group inline-flex items-center gap-2 text-[14px] leading-none transition-colors hover:text-brand"
                >
                  Existing clients — log in
                  <span className="glass glass-tint flex size-[30px] items-center justify-center rounded-full">
                    <Image
                      src="/images/icon-arrow-up-right-sm.svg"
                      alt=""
                      width={14}
                      height={14}
                      className="transition-transform duration-500 ease-(--ease-expo) group-hover:rotate-45"
                    />
                  </span>
                </a>
              </div>
            </Reveal>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
