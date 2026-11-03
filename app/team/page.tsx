import type { Metadata } from 'next'
import { d } from '../_components/delay'
import { IntroDone } from '../_components/motion'
import { Container, DisplayHeading, Eyebrow } from '../_components/primitives'
import { SiteFooter } from '../_components/site-footer'
import { SiteNav } from '../_components/site-nav'
import { TeamSection, type TeamMember } from '../_components/team-grid'

export const metadata: Metadata = {
  title: 'Team — Greenbird',
  description: 'The people behind Greenbird Capital.',
}

const linkedinSearch = (name: string) =>
  `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(name)}`

// Bios and profile URLs aren't in the design yet; LinkedIn links fall back to a
// people search until the real profile URLs are supplied.
const leadership: TeamMember[] = [
  {
    name: 'Michael Gestone',
    role: 'Founder',
    photo: { src: '/images/team/michael-gestone@2x.png', width: 848, height: 1028 },
    linkedin: linkedinSearch('Michael Gestone'),
  },
  {
    name: 'Nikolas Costello',
    role: 'Founder, CEO, COO & CCO',
    photo: { src: '/images/team/nikolas-costello@2x.png', width: 848, height: 882 },
    linkedin: linkedinSearch('Nikolas Costello'),
  },
]

// The design's "Team" row reuses the founders' names under two other people's
// photos, so these names and titles are placeholders until the real ones arrive.
const team: TeamMember[] = [
  {
    name: 'Name to come',
    role: 'Title to come',
    photo: { src: '/images/team/team-member-03@2x.png', width: 848, height: 758 },
  },
  {
    name: 'Name to come',
    role: 'Title to come',
    photo: { src: '/images/team/team-member-04@2x.png', width: 848, height: 980 },
  },
]

export default function TeamPage() {
  return (
    <>
      <IntroDone />
      <Container className="pt-[26px]">
        <SiteNav />
        <div className="draw-x mt-8 h-px bg-white/10" style={d(250)} />
      </Container>

      <main>
        <Container className="grid gap-8 pt-[60px] lg:grid-cols-[minmax(0,600px)_417px] lg:justify-between">
          <div>
            <Eyebrow className="intro text-brand" style={d(350)}>
              Meet Greenbird
            </Eyebrow>
            <DisplayHeading as="h1" motion="intro" delay={450} className="mt-6" lead="The people behind" rest="Greenbird" />
          </div>
          <p className="intro text-[16px] leading-[1.3] text-white/60 lg:pt-[35px]" style={d(700)}>
            Whether you&apos;re an individual investor or an institution, our team is ready to discuss how Greenbird
            Capital can support your financial objectives.
          </p>
        </Container>

        <Container className="pt-[60px] pb-[60px]">
          <TeamSection label="Leadership & team" members={leadership} />
          {team.length > 0 && <TeamSection label="Team" members={team} />}
        </Container>
      </main>

      <SiteFooter />
    </>
  )
}
