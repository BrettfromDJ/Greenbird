import type { Metadata } from 'next'
import Image from 'next/image'
import { ContactForm } from '../_components/contact-form'
import { d } from '../_components/delay'
import { IntroDone } from '../_components/motion'
import { OfficeMap } from '../_components/office-map'
import { Container, DisplayHeading, Eyebrow } from '../_components/primitives'
import { SiteFooter } from '../_components/site-footer'
import { SiteNav } from '../_components/site-nav'

export const metadata: Metadata = {
  title: 'Contact — Greenbird',
  description: 'Talk with the Greenbird Capital team about private equity and market-linked notes.',
}

function InfoCard({
  icon,
  label,
  title,
  delay,
  children,
  aside,
}: {
  icon: string
  label: string
  title: string
  delay: number
  children: React.ReactNode
  aside?: React.ReactNode
}) {
  return (
    <div
      className="intro relative flex min-h-[140px] flex-wrap gap-3 overflow-hidden sm:flex-nowrap rounded-[8px] border border-white/10 p-4 transition-colors duration-500 hover:border-white/20"
      style={d(delay)}
    >
      <div className="glass glass-tint flex size-8 shrink-0 items-center justify-center rounded-[4px]">
        <Image src={icon} alt="" width={16} height={16} />
      </div>
      <div className="min-w-0 pt-[10px]">
        <p className="font-mono text-[12px] leading-none text-white/50 uppercase">{label}</p>
        <p className="mt-2 text-[14px] leading-[1.3]">{title}</p>
        <div className="mt-2 text-[12px] leading-[1.3] text-white/50">{children}</div>
      </div>
      {aside}
    </div>
  )
}

export default function ContactPage() {
  return (
    <>
      <IntroDone />
      {/* Nav and contact section share one green panel; the footer sits on the page colour below it. */}
      <div className="bg-hero">
        <Container className="pt-[26px]">
          <SiteNav />
          <div className="draw-x mt-8 h-px bg-white/10" style={d(250)} />
        </Container>

        <main>
          <Container className="grid gap-12 pt-[60px] pb-[99px] lg:grid-cols-[minmax(0,551px)_minmax(0,684px)] lg:justify-between">
            <div>
              <Eyebrow className="intro text-brand" style={d(350)}>
                Meet Greenbird
              </Eyebrow>
              <DisplayHeading
                as="h1"
                motion="intro"
                delay={450}
                className="mt-6"
                lead="Start the conversation."
                rest="We’ll take it from here."
                dimRest
              />
              <p className="intro mt-6 max-w-[558px] text-[16px] leading-[1.3] text-white/60" style={d(700)}>
                Whether you&apos;re an individual investor or an institution, our team is ready to discuss how Greenbird
                Capital can support your financial objectives.
              </p>

              <div className="mt-8 flex flex-col gap-5">
                <InfoCard icon="/images/icon-call.svg" label="Call us" title="Speak with our team" delay={820}>
                  <p>Talk directly with us about opening an account.</p>
                  <a
                    href="tel:+16468763016"
                    className="mt-2 inline-block text-[14px] text-brand transition-opacity hover:opacity-70"
                  >
                    (646) 876-3016
                  </a>
                </InfoCard>

                <InfoCard icon="/images/icon-clock.svg" label="Hours" title="Business hours" delay={900}>
                  <p>Monday – Friday</p>
                  <p>9:00 AM – 5:00 PM ET</p>
                </InfoCard>

                <InfoCard
                  icon="/images/icon-map-pin.svg"
                  label="Visit"
                  title="Office location"
                  delay={980}
                  aside={
                    <OfficeMap className="-mx-4 -mb-4 mt-1 h-[140px] basis-[calc(100%+32px)] border-t border-line sm:absolute sm:inset-y-0 sm:right-0 sm:m-0 sm:h-auto sm:w-[241px] sm:basis-auto sm:rounded-r-[8px] sm:border-t-0 sm:border-l" />
                  }
                >
                  <address className="not-italic">
                    2500 N Military Trl, Ste 120
                    <br />
                    Boca Raton, Florida 33431
                  </address>
                </InfoCard>
              </div>
            </div>

            <section
              aria-labelledby="contact-form-title"
              className="dash-in rounded-[8px] bg-ink p-5 sm:p-[30px] lg:mt-[18px] lg:self-start"
              style={d(600)}
            >
              <h2 id="contact-form-title" className="font-display text-[32px] leading-[1.2] font-semibold">
                How can we help?
              </h2>
              <p className="mt-4 text-[16px] leading-[1.3] text-white/60">
                Tell us a little about what you&apos;re looking for and we&apos;ll be in touch.
              </p>
              <ContactForm />
            </section>
          </Container>
        </main>
      </div>

      <SiteFooter />
    </>
  )
}
