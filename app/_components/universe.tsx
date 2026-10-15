import Image from 'next/image'
import Link from 'next/link'
import { d } from './delay'
import { Reveal } from './motion'
import { Container, DisplayHeading, Eyebrow } from './primitives'

type Company = { name: string; logo: string; mark: string }

// Placeholder content from the design: every tile currently shows Anduril.
const anduril: Company = { name: 'Anduril', logo: '/images/logo-anduril.svg', mark: '$120.95' }
const companies: Company[] = Array.from({ length: 10 }, () => anduril)
const COLUMNS = 5

export function Universe() {
  return (
    <section aria-label="The universe">
      <Container>
        <Reveal className="flex flex-col items-center text-center">
          <Eyebrow className="r mt-20 text-brand">The universe</Eyebrow>
          <DisplayHeading className="mt-6" delay={100} lead="Extraordinary companies." rest="A broader perspective." dimLead />
          <p className="r mt-6 text-[14px] leading-[1.3] text-white/60" style={d(350)}>
            The names shaping what comes next. The companies we follow.
          </p>
        </Reveal>
      </Container>

      <Container className="mt-[52px]">
        <Reveal>
          <ul className="grid grid-cols-2 border-t border-l border-line sm:grid-cols-3 lg:grid-cols-5">
            {companies.map((company, i) => {
              // Tiles cascade in diagonally from the top-left.
              const wave = (i % COLUMNS) + Math.floor(i / COLUMNS)
              return (
                <li key={i} className="r border-r border-b border-line" style={d(wave * 80)}>
                  <div className="group relative flex h-[158px] flex-col items-center overflow-hidden pt-[41px] font-mono text-[12px] leading-[1.3] transition-colors duration-500 hover:bg-white/[0.025]">
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-center scale-x-0 bg-brand transition-transform duration-500 ease-(--ease-expo) group-hover:scale-x-100" />
                    <Image
                      src={company.logo}
                      alt=""
                      width={20}
                      height={19}
                      className="transition-transform duration-500 ease-(--ease-expo) group-hover:-translate-y-1 group-hover:scale-125"
                    />
                    <p className="mt-[17px] text-white/50 uppercase transition-colors duration-500 group-hover:text-white/80">
                      {company.name}
                    </p>
                    <p className="mt-[9px] text-white/50">
                      MARK: <span className="text-white">{company.mark}</span>
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="flex flex-col-reverse gap-6 pt-6 lg:grid lg:grid-cols-5 lg:items-center lg:gap-0 lg:pt-0 lg:pl-px">
            <p
              className="r font-mono text-[12px] leading-[1.3] text-white/50 uppercase lg:col-span-4"
              style={d(600)}
            >
              Source: Notice · Price date: Oct 12 · Not an offer or recommendation · Eligibility verification required
            </p>
            <div className="r lg:-ml-px" style={d(700)}>
              <Link
                href="#investment-solutions"
                className="group relative flex h-[73px] items-center justify-center gap-[25px] overflow-hidden border border-line text-[14px] leading-none text-brand lg:h-[72px] lg:border-t-0"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-brand/10 transition-transform duration-700 ease-(--ease-expo) group-hover:scale-x-100" />
                <span className="relative">Explore the possibilities</span>
                <Image
                  src="/images/icon-arrow-up-right-brand.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="relative transition-transform duration-500 ease-(--ease-expo) group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
