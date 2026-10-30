import Image from 'next/image'
import Link from 'next/link'
import { d } from './delay'
import { Reveal } from './motion'
import { Eyebrow, PrimaryButton } from './primitives'

type FooterLink = { label: string; href: string; external?: boolean }

// Compliance destinations other than BrokerCheck aren't published yet; they
// point at "#" until the documents exist.
const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Investment solutions',
    links: [
      { label: 'Private Equity', href: '#private-equity' },
      { label: 'Market-Linked Notes', href: '#market-linked-notes' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Contact', href: '#contact' },
      { label: 'Log in', href: '/login' },
    ],
  },
  {
    title: 'Compliance',
    links: [
      { label: 'Form CRS', href: '#' },
      { label: 'General Disclosures', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Business Continuity', href: '#' },
      { label: 'Senior Helpline', href: '#' },
      { label: 'Verify Registration', href: '#' },
      { label: 'BrokerCheck', href: 'https://brokercheck.finra.org', external: true },
    ],
  },
]

const underline = 'underline underline-offset-2 transition-opacity hover:opacity-70'
const linkHover =
  'relative after:absolute after:inset-x-0 after:bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-500 after:ease-(--ease-expo) hover:after:scale-x-100'

function FooterAnchor({ link, className = '' }: { link: FooterLink; className?: string }) {
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noreferrer" className={className}>
        {link.label}
      </a>
    )
  }
  return (
    <Link href={link.href} prefetch={false} className={className}>
      {link.label}
    </Link>
  )
}

/**
 * Four-panel footer: a closing call to action, link columns, the about line
 * and the brokerage disclosures with a large wordmark. Panels are separated by
 * hairlines (#0b2815); the bottom-right panel is left open as in the design.
 */
export function SiteFooter() {
  return (
    <footer id="contact" className="scroll-mt-8">
      <Reveal className="grid lg:grid-cols-2">
        {/* Get started */}
        <div className="border border-line-footer px-5 pt-[47px] pb-16 sm:px-[52px] lg:min-h-[381px] lg:pb-[74px]">
          <Eyebrow className="r text-brand">Get started</Eyebrow>
          <h2 className="mt-[26px] font-display text-[32px] leading-[38px] font-semibold">
            <span className="line-mask">
              <span className="r-line" style={d(100)}>
                Private markets.
              </span>
            </span>
            <span className="line-mask">
              <span className="r-line" style={d(220)}>
                Possibilities, expanded.
              </span>
            </span>
          </h2>
          <p className="r mt-4 max-w-[337px] text-[16px] leading-[1.3]" style={d(320)}>
            Private equity and market-linked notes through a single account.
          </p>
          <div className="r mt-[30px]" style={d(420)}>
            <PrimaryButton href="#investment-solutions" size="lg">
              Explore the possibilities
            </PrimaryButton>
          </div>
        </div>

        {/* Link columns */}
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-y-10 border-x border-b border-line-footer px-5 pt-[39px] pb-12 sm:grid-cols-[242px_172px_auto] sm:px-[57px] lg:border-t lg:border-l-0"
        >
          {columns.map((column, i) => (
            <div key={column.title} className="r" style={d(150 + i * 100)}>
              <Eyebrow className="text-white/50">{column.title}</Eyebrow>
              <ul className="mt-4 text-[14px] leading-[2.3]">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterAnchor link={link} className={linkHover} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* About */}
        <div className="flex flex-col justify-end border-x border-b border-line-footer px-5 pt-16 pb-[50px] sm:px-[52px] lg:min-h-[381px]">
          <p className="r max-w-[385px] text-[18px] leading-[1.3] text-white/80" style={d(200)}>
            Private equity and market-linked notes, side by side in one account. Private equity is limited to accredited
            investors.
          </p>
          <Eyebrow className="r mt-[18px] text-white/50" style={d(280)}>
            Boca Raton, Florida
          </Eyebrow>
        </div>

        {/* Disclosures + wordmark */}
        <div className="px-5 pt-[41px] pb-[25px] sm:px-[57px]">
          <div className="r max-w-[552px] space-y-[1.3em] text-[12px] leading-[1.3] text-white/50" style={d(250)}>
            <p>
              Securities offered through Greenbird Capital, LLC, a FINRA / SIPC member registered broker-dealer.
              Greenbird Capital provides brokerage services, not investment advisory services; brokerage and advisory
              services and fees differ. See our{' '}
              <Link href="#" className={underline}>
                Form CRS
              </Link>{' '}
              for more information. Investing involves risk, including possible loss of principal. Past performance is
              not indicative of future results.
            </p>
            <p>
              Trades are cleared on a fully disclosed basis and assets are held at Axos Clearing, LLC, a wholly owned
              subsidiary of Axos Financial (NYSE: AX).
            </p>
          </div>
          <ul
            className="r mt-[27px] flex flex-wrap gap-x-10 gap-y-2 text-[12px] leading-[1.3] text-white/50"
            style={d(330)}
          >
            <li>
              Member{' '}
              <a href="https://www.finra.org" target="_blank" rel="noreferrer" className={`text-white ${underline}`}>
                FINRA
              </a>{' '}
              <span className="text-white">/</span>{' '}
              <a href="https://www.sipc.org" target="_blank" rel="noreferrer" className={`text-white ${underline}`}>
                SIPC
              </a>
            </li>
            <li>
              Cleared by <span className="text-white">Axos Clearing, LLC</span>
            </li>
            <li>
              <a
                href="https://brokercheck.finra.org"
                target="_blank"
                rel="noreferrer"
                className={`text-white ${underline}`}
              >
                FINRA BrokerCheck
              </a>
            </li>
          </ul>
          <p className="r mt-[26px] font-mono text-[12px] leading-[1.3] text-white/50 uppercase" style={d(400)}>
            © 2026 Greenbird Capital, LLC · All rights reserved
          </p>
          {/* The wordmark sits 24px left of the text column in the design. */}
          <div className="mt-[25px] overflow-hidden lg:-ml-6">
            <div className="r-line" style={d(450)}>
              <Image src="/images/greenbird-logo-footer@2x.png" alt="Greenbird" width={260} height={77} />
            </div>
          </div>
        </div>
      </Reveal>
    </footer>
  )
}
