import type { Metadata } from 'next'
import { d } from '../_components/delay'
import { IntroDone, Reveal } from '../_components/motion'
import { Container, DisplayHeading, Eyebrow, PrimaryButton } from '../_components/primitives'
import { SiteFooter } from '../_components/site-footer'
import { SiteNav } from '../_components/site-nav'
import { TeamGrid, type TeamMember } from '../_components/team-grid'

export const metadata: Metadata = {
  title: 'Team — Greenbird',
  description: 'The people behind Greenbird Capital.',
}

// Placeholder slots: the live team page couldn't be read from the build
// environment. Replace with the real names, titles, bios and headshots.
const members: TeamMember[] = Array.from({ length: 6 }, () => ({
  name: 'Team Member',
  role: 'Title',
  bio: 'Short bio: two or three sentences on background, experience and focus at Greenbird. The full text opens in place when a visitor selects Read bio.',
}))

const FIRM_BROKERCHECK = 'https://brokercheck.finra.org/firm/summary/306692'

export default function TeamPage() {
  return (
    <>
      <IntroDone />
      <div className="relative overflow-hidden bg-hero">
        <div className="pointer-events-none absolute inset-0 hero-aurora opacity-80" />
        <Container className="relative pt-[26px]">
          <SiteNav />
          <div className="draw-x mt-8 h-px bg-white/10" style={d(250)} />
        </Container>

        <Container className="relative grid gap-10 pt-[60px] pb-20 lg:grid-cols-[minmax(0,760px)_minmax(0,440px)] lg:items-end lg:justify-between lg:pb-[100px]">
          <div>
            <Eyebrow className="intro text-brand" style={d(350)}>
              Our team
            </Eyebrow>
            <DisplayHeading
              as="h1"
              motion="intro"
              delay={450}
              className="mt-6"
              lead="The people behind Greenbird."
              rest="Here when you need them."
              dimRest
            />
          </div>
          <div className="intro" style={d(750)}>
            <p className="text-[16px] leading-[1.3] text-white/60">
              Whether you&apos;re an individual investor or an institution, our team is ready to discuss how Greenbird
              Capital can support your financial objectives.
            </p>
            <a
              href={FIRM_BROKERCHECK}
              target="_blank"
              rel="noreferrer"
              className="glass glass-tint mt-6 inline-flex items-center gap-3 rounded-[6px] px-4 py-3 font-mono text-[12px] leading-none text-white/80 uppercase transition-colors hover:text-brand"
            >
              <span className="live-dot size-[6px] rounded-full bg-brand" />
              Verify us on FINRA BrokerCheck ↗
            </a>
          </div>
        </Container>
      </div>

      <main>
        <Container className="pt-20 pb-24 lg:pt-[100px] lg:pb-[120px]">
          <Reveal className="mb-10 flex items-end justify-between gap-6 border-b border-line pb-6">
            <Eyebrow className="r text-white/50">Leadership &amp; team</Eyebrow>
            <p className="r font-mono text-[12px] leading-[1.3] text-white/50" style={d(100)}>
              {String(members.length).padStart(2, '0')} people
            </p>
          </Reveal>
          <TeamGrid members={members} />
        </Container>

        <section className="border-t border-line-footer">
          <Container className="py-20 lg:py-[100px]">
            <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <Eyebrow className="r text-brand">Get in touch</Eyebrow>
                <DisplayHeading className="mt-6" delay={100} lead="Start the conversation." rest="We’ll take it from here." dimRest />
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
