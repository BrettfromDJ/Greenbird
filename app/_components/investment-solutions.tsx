import Image from 'next/image'
import Link from 'next/link'
import { d } from './delay'
import { Reveal } from './motion'
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
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow className="r text-white/50">Investment solutions</Eyebrow>
            <DisplayHeading className="mt-6" delay={100} lead="Two ways to invest." rest="One account." dimLead />
          </div>
          <a href="#private-equity" className="r group flex items-center gap-[14px]" style={d(400)}>
            <span className="text-[14px] leading-[1.3] text-white/60 transition-colors duration-300 group-hover:text-white/80">
              <span className="block">Distinct ways to invest.</span>
              <span className="block">A single place to begin.</span>
            </span>
            <span className="flex size-[50px] shrink-0 items-center justify-center rounded-full border border-line transition-colors duration-300 group-hover:border-brand/60 group-hover:bg-brand/10">
              <Image src="/images/icon-arrow-down-brand.svg" alt="" width={29} height={29} className="bob" />
            </span>
          </a>
        </Reveal>

        <Reveal className="mt-8 grid gap-8 md:grid-cols-2">
          {solutions.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              className={`r group relative flex min-h-[483px] scroll-mt-8 flex-col justify-between gap-16 overflow-hidden rounded-[4px] p-6 sm:p-10 ${s.background}`}
              style={{ ...d(i * 150), '--rise': '40px' } as React.CSSProperties}
            >
              <Image
                src={s.dots}
                alt=""
                fill
                sizes="(min-width: 768px) 652px, 100vw"
                className="pointer-events-none origin-bottom-right object-cover object-[right_bottom] transition-transform duration-[1600ms] ease-(--ease-expo) select-none group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_100%,rgb(0_122_63/0.18),transparent_70%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

              <div className="relative flex items-center gap-4">
                <span
                  className={`flex size-[50px] items-center justify-center rounded-full border font-numeric text-[16px] leading-none text-brand transition-colors duration-500 group-hover:border-brand/70 ${s.ring}`}
                >
                  {s.index}
                </span>
                <Eyebrow className="text-brand">{s.label}</Eyebrow>
              </div>

              <div className="relative">
                <h3 className="font-display text-[36px] leading-none font-semibold">
                  {s.title.map((line, j) => (
                    <span key={line} className="line-mask">
                      <span className="r-line" style={d(i * 150 + 250 + j * 110)}>
                        {line}
                      </span>
                    </span>
                  ))}
                </h3>
                <p className="mt-6 max-w-[374px] text-[14px] leading-[1.3] text-white/60">{s.body}</p>
                <Link href={s.href} className="group/link mt-5 inline-flex items-center gap-2 text-[14px] leading-none">
                  {s.cta}
                  <span className="glass flex size-[30px] items-center justify-center overflow-hidden rounded-full transition-[background-color,transform] duration-500 ease-(--ease-expo) group-hover/link:scale-110 group-hover/link:bg-brand">
                    <Image
                      src="/images/icon-arrow-up-right-sm.svg"
                      alt=""
                      width={14}
                      height={14}
                      className="transition-transform duration-500 ease-(--ease-expo) group-hover/link:rotate-45"
                    />
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </Reveal>
      </Container>
    </section>
  )
}
