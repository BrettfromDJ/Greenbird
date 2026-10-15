import Image from 'next/image'
import { DisplayHeading, Eyebrow, PrimaryButton } from './primitives'
import { PortfolioPreview } from './portfolio-preview'
import { SiteNav } from './site-nav'

export function Hero() {
  return (
    <section className="relative mx-2 mt-2 overflow-hidden rounded-[10px] bg-hero px-4 pb-16 sm:mx-5 sm:mt-5 sm:px-8 lg:h-[984px] lg:pb-0">
      <Image
        src="/images/dots-hero@2x.png"
        alt=""
        fill
        priority
        sizes="1400px"
        className="pointer-events-none object-cover object-top select-none"
      />

      <div className="relative pt-[26px]">
        <SiteNav />
        <div className="hairline mt-8" />

        <div className="flex flex-col items-center text-center">
          <Eyebrow className="mt-20 text-brand">Meet Greenbird</Eyebrow>
          <DisplayHeading as="h1" className="mt-6" lead="Private markets." rest="Possibilities, expanded." />
          <p className="mt-6 max-w-[337px] text-[16px] leading-[1.3]">
            Private equity and market-linked notes through a single account.
          </p>
          <div className="mt-[30px]">
            <PrimaryButton href="#investment-solutions" size="lg">
              Explore the possibilities
            </PrimaryButton>
          </div>
          <p className="mt-6 text-[11px] leading-[1.3] text-white/50">
            Investment opportunities subject to eligibility.
          </p>

          <div className="mt-[63px] hidden lg:block">
            <PortfolioPreview />
          </div>
        </div>
      </div>
    </section>
  )
}
