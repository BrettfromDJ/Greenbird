import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CompanyMarquee } from '../_components/company-marquee'
import { d } from '../_components/delay'
import { Disclosures } from '../_components/disclosures'
import { HeroBackdrop } from '../_components/hero-backdrop'
import { MarkTicker } from '../_components/mark-ticker'
import { IntroDone, Reveal } from '../_components/motion'
import { Container, DisplayHeading, Eyebrow, PrimaryButton } from '../_components/primitives'
import { SiteFooter } from '../_components/site-footer'
import { SiteNav } from '../_components/site-nav'
import { TrustBar } from '../_components/trust-bar'

export const metadata: Metadata = {
  title: 'Private Equity — Greenbird',
  description:
    'Explore private companies defining their industries, accessed through our affiliated Fund + Series LLC structure. Available to accredited investors.',
}

// Step copy is drawn from the site's existing disclosures and product text.
const steps = [
  {
    title: 'Verify your eligibility',
    body: 'Private equity investments are available to accredited investors only. Eligibility verification is required before you invest.',
  },
  {
    title: 'Open your account',
    body: 'Specific offering details, terms, and risk disclosures are made available after a verified account is established.',
  },
  {
    title: 'Access private companies',
    body: 'Invest in private companies defining their industries through our affiliated Fund + Series LLC structure.',
  },
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
              <div className="intro flex items-center gap-3" style={d(350)}>
                <span className="flex size-[38px] items-center justify-center rounded-full border border-[rgb(105_255_120/0.2)] font-numeric text-[14px] text-brand">
                  01
                </span>
                <Eyebrow className="text-brand">Private equity</Eyebrow>
              </div>
              <DisplayHeading
                as="h1"
                motion="intro"
                delay={450}
                className="mt-7"
                lead="Before the opening bell."
                rest="Private companies, within reach."
                dimRest
              />
              <p className="intro mt-7 max-w-[480px] text-[16px] leading-[1.4] text-white/70" style={d(750)}>
                Explore private companies defining their industries, accessed through our affiliated Fund + Series LLC
                structure. Available to accredited investors.
              </p>
              <div className="intro mt-9 flex flex-wrap items-center gap-6" style={d(880)}>
                <PrimaryButton href="/contact" size="lg" autoShine>
                  Talk to our team
                </PrimaryButton>
                <a
                  href="#how-it-works"
                  className="group inline-flex items-center gap-2 text-[14px] leading-none transition-colors hover:text-brand"
                >
                  How access works
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
              <p className="intro mt-6 text-[11px] leading-[1.3] text-white/50" style={d(1000)}>
                Investment opportunities subject to eligibility.
              </p>
            </div>

            <div className="dash-in flex justify-center lg:justify-end" style={d(950)}>
              <MarkTicker />
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      <main>
        {/* Universe */}
        <section aria-labelledby="pe-universe" className="pt-20 lg:pt-[100px]">
          <Container>
            <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <Eyebrow className="r text-brand">The universe</Eyebrow>
                <DisplayHeading
                  className="mt-6"
                  delay={100}
                  lead="Extraordinary companies."
                  rest="A broader perspective."
                  dimLead
                />
              </div>
              <p id="pe-universe" className="r max-w-[380px] text-[14px] leading-[1.4] text-white/60" style={d(300)}>
                The names shaping what comes next. The companies we follow.
              </p>
            </Reveal>
          </Container>
          <Reveal className="mt-12">
            <div className="r" style={d(150)}>
              <CompanyMarquee />
            </div>
          </Reveal>
          <Container>
            <p className="mt-5 font-mono text-[12px] leading-[1.3] text-white/50 uppercase">
              Source: Notice · Price date: Oct 12 · Not an offer or recommendation · Eligibility verification required
            </p>
          </Container>
        </section>

        {/* How it works */}
        <section id="how-it-works" aria-labelledby="how-title" className="scroll-mt-8 py-20 lg:py-[120px]">
          <Container>
            <Reveal>
              <Eyebrow className="r text-white/50">How access works</Eyebrow>
              <h2 id="how-title" className="sr-only">
                How access works
              </h2>
              <DisplayHeading className="mt-6" delay={100} lead="Three steps to" rest="the private markets." dimRest />

              <ol className="relative mt-14 grid gap-5 lg:grid-cols-3 lg:gap-8">
                {/* The rail draws across behind the step numbers. */}
                <li
                  aria-hidden
                  className="pointer-events-none absolute top-[25px] right-[16%] left-[16%] hidden lg:block"
                >
                  <div className="r-draw h-px bg-gradient-to-r from-brand/60 via-brand/30 to-brand/60" style={d(300)} />
                </li>
                {steps.map((step, i) => (
                  <li key={step.title} className="r relative" style={d(200 + i * 160)}>
                    <div className="flex justify-center lg:justify-center">
                      <span className="relative flex size-[50px] items-center justify-center rounded-full border border-brand/40 bg-ink font-numeric text-[16px] text-brand">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="mt-6 rounded-[8px] border border-white/10 bg-hero/40 p-6 text-center transition-colors duration-500 hover:border-white/20 lg:min-h-[178px]">
                      <h3 className="font-display text-[22px] leading-[1.2] font-semibold">{step.title}</h3>
                      <p className="mx-auto mt-3 max-w-[340px] text-[14px] leading-[1.45] text-white/60">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </Container>
        </section>

        {/* Sage band: cross-link + disclosures */}
        <section className="bg-sage py-[60px]">
          <Container>
            <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_652px] lg:items-stretch">
              <div className="flex flex-col justify-between gap-8">
                <div>
                  <Eyebrow className="r text-on-light/50">Investment solutions</Eyebrow>
                  <DisplayHeading
                    className="mt-6"
                    delay={100}
                    tone="dark"
                    lead="Two ways to invest."
                    rest="One account."
                  />
                </div>
                <p className="r max-w-[420px] text-[14px] leading-[1.4] text-on-light/70" style={d(250)}>
                  Private equity and market-linked notes, side by side in one account. Private equity is limited to
                  accredited investors.
                </p>
              </div>

              <Link
                href="/#market-linked-notes"
                className="r group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[4px] bg-card-mln p-6 text-on-light sm:p-10"
                style={d(200)}
              >
                <Image
                  src="/images/dots-market-linked-notes@2x.png"
                  alt=""
                  fill
                  sizes="652px"
                  className="pointer-events-none origin-bottom-right object-cover object-[right_bottom] transition-transform duration-[1600ms] ease-(--ease-expo) group-hover:scale-110"
                />
                <div className="relative flex items-center gap-4">
                  <span className="flex size-[50px] items-center justify-center rounded-full border border-on-light/20 font-numeric text-[16px] transition-colors duration-500 group-hover:border-on-light/50">
                    02
                  </span>
                  <Eyebrow>Market-linked notes</Eyebrow>
                </div>
                <div className="relative">
                  <p className="font-display text-[36px] leading-none font-semibold">
                    Market, on
                    <br />
                    different terms
                  </p>
                  <p className="mt-5 inline-flex items-center gap-2 text-[14px] leading-none">
                    Discover market-linked notes
                    <span className="glass flex size-[30px] items-center justify-center rounded-full transition-[background-color,transform] duration-500 ease-(--ease-expo) group-hover:scale-110 group-hover:bg-on-light/10">
                      <Image
                        src="/images/icon-arrow-up-right-sm-dark.svg"
                        alt=""
                        width={14}
                        height={14}
                        className="transition-transform duration-500 ease-(--ease-expo) group-hover:rotate-45"
                      />
                    </span>
                  </p>
                </div>
              </Link>
            </Reveal>

            <Disclosures />
          </Container>
        </section>

        {/* Closing CTA */}
        <section>
          <Container className="py-20 lg:py-[100px]">
            <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <Eyebrow className="r text-brand">Get in touch</Eyebrow>
                <DisplayHeading
                  className="mt-6"
                  delay={100}
                  lead="Start the conversation."
                  rest="We’ll take it from here."
                  dimRest
                />
              </div>
              <div className="r" style={d(300)}>
                <PrimaryButton href="/contact" size="lg">
                  Contact the team
                </PrimaryButton>
              </div>
            </Reveal>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
