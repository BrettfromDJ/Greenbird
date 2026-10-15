import Image from 'next/image'
import Link from 'next/link'
import { PrimaryButton } from './primitives'

const links = [
  { label: 'Private Equity', href: '#private-equity' },
  { label: 'Market-Linked Notes', href: '#market-linked-notes' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
]

export function SiteNav() {
  return (
    <header className="grid h-[46px] grid-cols-[1fr_auto] items-center lg:grid-cols-[1fr_auto_1fr]">
      <Link href="/" aria-label="Greenbird home" className="justify-self-start">
        <Image src="/images/greenbird-logo@4x.png" alt="Greenbird" width={116} height={34} priority />
      </Link>

      <nav aria-label="Primary" className="hidden lg:block">
        <ul className="flex items-center gap-9 text-[14px] leading-[1.3]">
          {links.map((link) => (
            <li key={link.label}>
              <Link href={link.href} className="transition-opacity hover:opacity-70">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-9 justify-self-end">
        <Link href="/login" className="hidden text-[14px] leading-[1.3] transition-opacity hover:opacity-70 sm:block">
          Login
        </Link>
        <PrimaryButton href="#contact">Contact us</PrimaryButton>
      </div>
    </header>
  )
}
