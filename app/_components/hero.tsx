import { d } from './delay'
import { HeroBackdrop } from './hero-backdrop'
import { IntroDone } from './motion'
import { DisplayHeading, Eyebrow, PrimaryButton } from './primitives'
import { PortfolioPreview } from './portfolio-preview'
import { SiteNav } from './site-nav'

export function Hero() {
  return (
    <section className="relative mx-2 mt-2 overflow-hidden rounded-[10px] bg-hero px-4 pb-16 sm:mx-5 sm:mt-5 sm:px-8 lg:pb-20">
      <HeroBackdrop />
      <IntroDone />

      <div className="relative pt-[26px]">
        <SiteNav />
        <div className="draw-x mt-8 h-px bg-line-hero" style={d(250)} />

        <div className="flex flex-col items-center text-center">
          <Eyebrow className="intro mt-20 text-brand" style={d(350)}>
            Meet Greenbird
          </Eyebrow>
          <DisplayHeading
            as="h1"
            motion="intro"
            delay={450}
            className="mt-6"
            lead="Private markets."
            rest="Possibilities, expanded."
          />
          <p className="intro mt-6 max-w-[337px] text-[16px] leading-[1.3]" style={d(750)}>
            Private equity and market-linked notes through a single account.
          </p>
          <div className="intro mt-[30px]" style={d(880)}>
            <PrimaryButton href="#investment-solutions" size="lg" autoShine>
              Explore the possibilities
            </PrimaryButton>
          </div>
          <p className="intro mt-6 text-[11px] leading-[1.3] text-white/50" style={d(1000)}>
            Investment opportunities subject to eligibility.
          </p>

          <div className="dash-in mt-12 flex w-full justify-center lg:mt-[63px]" style={d(950)}>
            <PortfolioPreview />
          </div>
        </div>
      </div>
    </section>
  )
}
