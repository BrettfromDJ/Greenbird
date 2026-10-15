import Image from 'next/image'
import Link from 'next/link'
import { Container, DisplayHeading, Eyebrow } from './primitives'

type Company = { name: string; logo: string; mark: string }

// Placeholder content from the design: every tile currently shows Anduril.
const anduril: Company = { name: 'Anduril', logo: '/images/logo-anduril.svg', mark: '$120.95' }
const companies: Company[] = Array.from({ length: 10 }, () => anduril)

export function Universe() {
  return (
    <section aria-label="The universe">
      <Container className="flex flex-col items-center text-center">
        <Eyebrow className="mt-20 text-brand">The universe</Eyebrow>
        <DisplayHeading className="mt-6" lead="Extraordinary companies." rest="A broader perspective." dimLead />
        <p className="mt-6 text-[14px] leading-[1.3] text-white/60">
          The names shaping what comes next. The companies we follow.
        </p>
      </Container>

      <Container className="mt-[52px]">
        <ul className="grid grid-cols-2 border-t border-l border-line sm:grid-cols-3 lg:grid-cols-5">
          {companies.map((company, i) => (
            <li
              key={i}
              className="flex h-[158px] flex-col items-center border-r border-b border-line pt-[41px] font-mono text-[12px] leading-[1.3]"
            >
              <Image src={company.logo} alt="" width={20} height={19} />
              <p className="mt-[17px] text-white/50 uppercase">{company.name}</p>
              <p className="mt-[9px] text-white/50">
                MARK: <span className="text-white">{company.mark}</span>
              </p>
            </li>
          ))}
        </ul>

        <div className="flex flex-col-reverse gap-6 pt-6 lg:grid lg:grid-cols-5 lg:items-center lg:gap-0 lg:pt-0 lg:pl-px">
          <p className="font-mono text-[12px] leading-[1.3] text-white/50 uppercase lg:col-span-4">
            Source: Notice · Price date: Oct 12 · Not an offer or recommendation · Eligibility verification required
          </p>
          <Link
            href="#investment-solutions"
            className="group flex h-[73px] items-center justify-center gap-[25px] border border-line text-[14px] leading-none text-brand transition-colors hover:bg-white/[0.03] lg:-ml-px lg:h-[72px] lg:border-t-0"
          >
            Explore the possibilities
            <Image
              src="/images/icon-arrow-up-right-brand.svg"
              alt=""
              width={20}
              height={20}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </Container>
    </section>
  )
}
