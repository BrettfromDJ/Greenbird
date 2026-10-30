import { d } from './delay'
import { Reveal } from './motion'

const external = 'underline underline-offset-2 transition-opacity hover:opacity-70'

/** Legal copy that closes the sage band, under the investment solution cards. */
export function Disclosures() {
  return (
    <Reveal className="mt-[50px]">
      <div className="r-draw h-px bg-black/10" />
      <div
        className="r mt-10 max-w-[1010px] space-y-[1.3em] text-[12px] leading-[1.3] text-on-light/80"
        style={d(150)}
      >
        <p>
          Private equity investments are available to accredited investors only. Specific offering details, terms, and
          risk disclosures are made available after a verified account is established. Market-linked notes are complex
          products that may not be suitable for all investors. Brokerage services through Greenbird Capital, LLC, member{' '}
          <a href="https://www.finra.org" target="_blank" rel="noreferrer" className={external}>
            FINRA
          </a>{' '}
          /{' '}
          <a href="https://www.sipc.org" target="_blank" rel="noreferrer" className={external}>
            SIPC
          </a>
          .
        </p>
        <p>
          Per-share marks shown on this page are indicative values provided by Notice (notice.co), derived from
          secondary-market transactions, indications of interest, and other reference data. They are not trade prices,
          may be based on a limited number of transactions, and do not represent the price at which any investor could
          transact or the value of any interest in any fund. Greenbird is not affiliated with the companies shown, and
          references to them do not imply endorsement.
        </p>
      </div>
    </Reveal>
  )
}
