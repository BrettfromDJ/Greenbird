import Image from 'next/image'
import { companies, type Company } from './companies'

function Tile({ company, duplicate = false }: { company: Company; duplicate?: boolean }) {
  return (
    <li
      aria-hidden={duplicate || undefined}
      className="group flex h-[96px] w-[240px] shrink-0 items-center gap-4 border-r border-line px-6 transition-colors duration-500 hover:bg-white/[0.03]"
    >
      <div className="glass glass-tint flex size-11 shrink-0 items-center justify-center rounded-[6px] transition-transform duration-500 ease-(--ease-expo) group-hover:-translate-y-0.5 group-hover:scale-105">
        <Image src={company.logo} alt="" width={20} height={20} className="size-5 object-contain" />
      </div>
      <div className="font-mono text-[12px] leading-[1.3]">
        <p className="text-white/50 uppercase transition-colors group-hover:text-white/80">{company.name}</p>
        <p className="mt-1 text-white/50">
          MARK: <span className="text-white">{company.mark}</span>
        </p>
      </div>
    </li>
  )
}

/**
 * Two rows of the company universe drifting in opposite directions. Each row
 * is the list twice over, translated by half its width, so the loop is seamless.
 * Pauses on hover; still for reduced motion.
 */
export function CompanyMarquee() {
  const half = Math.ceil(companies.length / 2)
  const rows = [companies.slice(0, half), companies.slice(half).concat(companies.slice(0, 2))]
  return (
    <div className="marquee-fade border-y border-line" aria-label="Companies we follow">
      {rows.map((row, r) => (
        <div key={r} className={`overflow-hidden ${r > 0 ? 'border-t border-line' : ''}`}>
          <ul className={`marquee-track flex w-max ${r % 2 ? 'marquee-reverse' : ''}`}>
            {[...row, ...row].map((c, i) => (
              <Tile key={`${c.name}-${i}`} company={c} duplicate={i >= row.length} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
