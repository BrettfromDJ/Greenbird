import Image from 'next/image'
import Link from 'next/link'
import { d } from './delay'
import { LogoWall } from './logo-wall'
import { Reveal } from './motion'
import { Container, DisplayHeading, Eyebrow } from './primitives'

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
          <LogoWall />

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
                <span className="relative">See the full universe</span>
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
