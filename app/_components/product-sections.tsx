import Image from 'next/image'
import { d } from './delay'
import { HeroBackdrop } from './hero-backdrop'
import { Reveal } from './motion'
import { Container, DisplayHeading, Eyebrow, PrimaryButton } from './primitives'
import { SiteNav } from './site-nav'
import { Spotlight } from './spotlight'

// Sections shared by the product pages (private equity, market-linked notes).

export const LOGIN_URL = 'https://axosclearing.fisglobal.com/investor/axos'

export type Item = { title: string; body: string }

function ArrowLink({ href, rotate, children }: { href: string; rotate?: boolean; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-2 text-[14px] leading-none transition-colors hover:text-brand"
    >
      {children}
      <span className="glass glass-tint flex size-[30px] items-center justify-center rounded-full">
        <Image
          src="/images/icon-arrow-up-right-sm.svg"
          alt=""
          width={14}
          height={14}
          className={`transition-transform duration-500 ease-(--ease-expo) ${rotate ? 'rotate-90 group-hover:translate-y-0.5' : 'group-hover:rotate-45'}`}
        />
      </span>
    </a>
  )
}

export function ProductHero({
  eyebrow,
  lead,
  rest,
  body,
  anchor,
  aside,
}: {
  eyebrow: string
  lead: string
  rest: string
  body: React.ReactNode
  /** In-page link next to the primary button. */
  anchor: { href: string; label: string }
  aside: React.ReactNode
}) {
  return (
    <section className="relative mx-2 mt-2 overflow-hidden rounded-[10px] bg-hero px-4 pb-16 sm:mx-5 sm:mt-5 sm:px-8 lg:pb-[90px]">
      <HeroBackdrop />
      <div className="relative pt-[26px]">
        <SiteNav />
        <div className="draw-x mt-8 h-px bg-line-hero" style={d(250)} />

        <div className="grid items-center gap-14 pt-16 lg:grid-cols-[minmax(0,1fr)_480px] lg:gap-10 lg:pt-[90px]">
          <div>
            <div className="intro flex items-center gap-2" style={d(350)}>
              <span className="live-dot size-[7px] rounded-full bg-brand" />
              <Eyebrow className="text-brand">{eyebrow}</Eyebrow>
            </div>
            <DisplayHeading as="h1" motion="intro" delay={450} className="mt-7" lead={lead} rest={rest} dimRest />
            <p className="intro mt-7 max-w-[500px] text-[16px] leading-[1.45] text-white/70" style={d(750)}>
              {body}
            </p>
            <div className="intro mt-9 flex flex-wrap items-center gap-6" style={d(880)}>
              <PrimaryButton href="/contact" size="lg" autoShine>
                Contact us
              </PrimaryButton>
              <ArrowLink href={anchor.href} rotate>
                {anchor.label}
              </ArrowLink>
            </div>
          </div>

          <div className="dash-in flex justify-center lg:justify-end" style={d(950)}>
            {aside}
          </div>
        </div>
      </div>
    </section>
  )
}

/** Section intro: eyebrow and two-line headline, with the lede beside it on wide screens. */
export function SectionIntro({
  eyebrow,
  lead,
  rest,
  body,
  tone = 'light',
}: {
  eyebrow: string
  lead: string
  rest: string
  body: string
  tone?: 'light' | 'dark'
}) {
  const dark = tone === 'dark'
  return (
    <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-end">
      <div>
        <Eyebrow className={`r ${dark ? 'text-on-light/50' : 'text-brand'}`}>{eyebrow}</Eyebrow>
        <DisplayHeading className="mt-6" delay={100} tone={tone} lead={lead} rest={rest} dimRest={!dark} />
      </div>
      <p className={`r text-[14px] leading-[1.5] ${dark ? 'text-on-light/70' : 'text-white/60'}`} style={d(300)}>
        {body}
      </p>
    </Reveal>
  )
}

/** Numbered cards on the dark ground that light up under the pointer. */
export function NumberedCards({
  items,
  columns = 2,
  children,
}: {
  items: Item[]
  columns?: 2 | 3
  /** Optional art per card, drawn between the number and the title. */
  children?: (index: number) => React.ReactNode
}) {
  return (
    <Spotlight>
      <Reveal className={`grid gap-5 sm:grid-cols-2 lg:gap-6 ${columns === 3 ? 'lg:grid-cols-3' : ''}`}>
        {items.map((a, i) => (
          <article
            key={a.title}
            className="spotlight r group flex flex-col overflow-hidden rounded-[8px] border border-white/10 bg-hero/40 p-6 transition-colors duration-500 hover:border-brand/30 sm:p-8"
            style={d((i % columns) * 140 + Math.floor(i / columns) * 120)}
          >
            <span className="flex size-[50px] items-center justify-center rounded-full border border-[rgb(105_255_120/0.2)] font-numeric text-[16px] text-brand transition-colors duration-500 group-hover:border-brand/60">
              {String(i + 1).padStart(2, '0')}
            </span>
            {children?.(i)}
            <div className={children ? 'mt-8' : 'mt-12'}>
              <h3 className="font-display text-[26px] leading-[1.1] font-semibold">{a.title}</h3>
              <p className="mt-3 max-w-[460px] text-[14px] leading-[1.5] text-white/60">{a.body}</p>
            </div>
          </article>
        ))}
      </Reveal>
    </Spotlight>
  )
}

export function RiskSection({
  intro,
  risks,
  disclosureTitle,
  disclosure,
}: {
  intro: string
  risks: Item[]
  disclosureTitle: string
  disclosure: string[]
}) {
  return (
    <section className="bg-sage py-20 text-on-light lg:py-[100px]">
      <Container>
        <SectionIntro
          tone="dark"
          eyebrow="Important Considerations"
          lead="Risk factors"
          rest="and disclosures."
          body={intro}
        />

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
                <h3 className="font-mono text-[12px] leading-[1.3] text-brand uppercase">{disclosureTitle}</h3>
              </div>
              <div className="space-y-4 text-[13px] leading-[1.6] text-white/65">
                {disclosure.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

export function GetInTouch({ lead, rest, body }: { lead: string; rest: string; body: string }) {
  return (
    <section>
      <Container className="py-20 lg:py-[110px]">
        <Reveal className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <Eyebrow className="r text-brand">Get in touch</Eyebrow>
            <DisplayHeading className="mt-6" delay={100} lead={lead} rest={rest} dimRest />
            <p className="r mt-6 max-w-[420px] text-[14px] leading-[1.5] text-white/60" style={d(300)}>
              {body}
            </p>
          </div>
          <div className="r flex flex-wrap items-center gap-6" style={d(400)}>
            <PrimaryButton href="/contact" size="lg">
              Contact us
            </PrimaryButton>
            <ArrowLink href={LOGIN_URL}>Existing clients — log in</ArrowLink>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
