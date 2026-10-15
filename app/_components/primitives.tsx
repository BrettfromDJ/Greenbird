import Image from 'next/image'
import Link from 'next/link'

export function Container({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`mx-auto w-full max-w-[1336px] px-5 xl:px-0 ${className}`}>{children}</div>
}

export function Eyebrow({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <p className={`font-mono text-[12px] leading-[1.3] uppercase ${className}`}>{children}</p>
}

/** Two-line display headline; the first line can be dimmed, as in the section intros. */
export function DisplayHeading({
  lead,
  rest,
  dimLead = false,
  className = '',
  as: Tag = 'h2',
}: {
  lead: string
  rest: string
  dimLead?: boolean
  className?: string
  as?: 'h1' | 'h2'
}) {
  return (
    <Tag
      className={`font-display text-[36px] leading-[1.1] font-semibold tracking-[-0.01em] text-white sm:text-[52px] sm:leading-[58px] ${className}`}
    >
      <span className={`block ${dimLead ? 'text-white/60' : ''}`}>{lead}</span>
      <span className="block">{rest}</span>
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
  children,
}: {
  href: string
  size?: keyof typeof buttonSizes
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={`inline-flex shrink-0 items-center rounded-[6px] bg-brand text-[14px] leading-none font-book text-white transition-colors hover:bg-[#008c48] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${buttonSizes[size]}`}
    >
      {children}
      <Image src="/images/icon-arrow-up-right.svg" alt="" width={20} height={20} />
    </Link>
  )
}
