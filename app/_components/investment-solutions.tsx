import Image from 'next/image'
import Link from 'next/link'
import { Container, DisplayHeading, Eyebrow } from './primitives'

const solutions = [
  {
    id: 'private-equity',
    index: '01',
    label: 'Private equity',
    title: ['Before the', 'opening bell'],
    body: 'Explore private companies defining their industries, accessed through our affiliated Fund + Series LLC structure. Available to accredited investors.',
    cta: 'Discover private equity',
    href: '#private-equity',
    background: 'bg-card-pe',
    dots: '/images/dots-private-equity@2x.png',
    ring: 'border-[rgb(105_255_120/0.2)]',
  },
  {
    id: 'market-linked-notes',
    index: '02',
    label: 'Market-linked notes',
    title: ['Market, on', 'different terms'],
    body: 'Senior unsecured debt from major financial institutions, with returns linked to an underlying asset or index. Explore a different approach to market exposure.',
    cta: 'Discover market-linked notes',
    href: '#market-linked-notes',
    background: 'bg-card-mln',
    dots: '/images/dots-market-linked-notes@2x.png',
    ring: 'border-brand/20',
  },
]

export function InvestmentSolutions() {
  return (
    <section id="investment-solutions" aria-label="Investment solutions" className="pb-[76px]">
      <Container className="mt-[100px]">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow className="text-white/50">Investment solutions</Eyebrow>
            <DisplayHeading className="mt-6" lead="Two ways to invest." rest="One account." dimLead />
          </div>
          <a href="#private-equity" className="group flex items-center gap-[14px]">
            <span className="text-[14px] leading-[1.3] text-white/60">
              <span className="block">Distinct ways to invest.</span>
              <span className="block">A single place to begin.</span>
            </span>
            <span className="flex size-[50px] shrink-0 items-center justify-center rounded-full border border-line transition-colors group-hover:border-brand/60">
              <Image src="/images/icon-arrow-down-brand.svg" alt="" width={29} height={29} />
            </span>
          </a>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {solutions.map((s) => (
            <article
              key={s.id}
              id={s.id}
              className={`relative flex min-h-[483px] scroll-mt-8 flex-col justify-between gap-16 overflow-hidden rounded-[4px] p-6 sm:p-10 ${s.background}`}
            >
              <Image
                src={s.dots}
                alt=""
                fill
                sizes="(min-width: 768px) 652px, 100vw"
                className="pointer-events-none object-cover object-[right_bottom] select-none"
              />

              <div className="relative flex items-center gap-4">
                <span
                  className={`flex size-[50px] items-center justify-center rounded-full border font-numeric text-[16px] leading-none text-brand ${s.ring}`}
                >
                  {s.index}
                </span>
                <Eyebrow className="text-brand">{s.label}</Eyebrow>
              </div>

              <div className="relative">
                <h3 className="font-display text-[36px] leading-none font-semibold">
                  {s.title.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h3>
                <p className="mt-6 max-w-[374px] text-[14px] leading-[1.3] text-white/60">{s.body}</p>
                <Link href={s.href} className="group mt-5 inline-flex items-center gap-2 text-[14px] leading-none">
                  {s.cta}
                  <span className="glass flex size-[30px] items-center justify-center rounded-full transition-transform group-hover:scale-110">
                    <Image src="/images/icon-arrow-up-right-sm.svg" alt="" width={14} height={14} />
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
