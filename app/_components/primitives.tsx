import Image from 'next/image'
import Link from 'next/link'
import { d } from './delay'

export function Container({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`mx-auto w-full max-w-[1336px] px-5 xl:px-0 ${className}`}>{children}</div>
}

export function Eyebrow({
  className = '',
  style,
  children,
}: {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}) {
  return (
    <p className={`font-mono text-[12px] leading-[1.3] uppercase ${className}`} style={style}>
      {children}
    </p>
  )
}

/**
 * Two-line display headline; the first line can be dimmed, as in the section
 * intros. Each line slides up out of its own mask, on load (`intro`) or when
 * its <Reveal> scope scrolls in (`reveal`).
 */
export function DisplayHeading({
  lead,
  rest,
  dimLead = false,
  className = '',
  as: Tag = 'h2',
  motion = 'reveal',
  delay = 0,
}: {
  lead: string
  rest: string
  dimLead?: boolean
  className?: string
  as?: 'h1' | 'h2'
  motion?: 'intro' | 'reveal'
  delay?: number
}) {
  const line = motion === 'intro' ? 'intro-line' : 'r-line'
  return (
    <Tag
      className={`font-display text-[36px] leading-[1.1] font-semibold tracking-[-0.01em] text-white sm:text-[52px] sm:leading-[58px] ${className}`}
    >
      <span className="line-mask">
        <span className={`${line} ${dimLead ? 'text-white/60' : ''}`} style={d(delay)}>
          {lead}
        </span>
      </span>
      <span className="line-mask">
        <span className={line} style={d(delay + 120)}>
          {rest}
        </span>
      </span>
    </Tag>
  )
}

const buttonSizes = {
  md: 'h-[46px] gap-[13px] pr-5 pl-[19px]',
  lg: 'h-[54px] gap-[23px] pr-6 pl-[23px]',
} as const

export function PrimaryButton({
  href,
  size = 'md',
  autoShine = false,
  children,
}: {
  href: string
  size?: keyof typeof buttonSizes
  /** Play the light sweep once on load, after the hero intro. */
  autoShine?: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={`btn-shine group relative inline-flex shrink-0 items-center overflow-hidden rounded-[6px] bg-brand text-[14px] leading-none font-book text-white transition-[background-color,box-shadow] duration-300 hover:bg-[#008c48] hover:shadow-[0_8px_30px_-6px_rgb(0_122_63/0.7)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${autoShine ? 'btn-shine-auto' : ''} ${buttonSizes[size]}`}
    >
      <span className="relative">{children}</span>
      <Image
        src="/images/icon-arrow-up-right.svg"
        alt=""
        width={20}
        height={20}
        className="relative transition-transform duration-300 ease-(--ease-expo) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  )
}
