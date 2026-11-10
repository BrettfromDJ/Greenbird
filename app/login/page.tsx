import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { d } from '../_components/delay'
import { HeroBackdrop } from '../_components/hero-backdrop'
import { LoginForm } from '../_components/login-form'
import { IntroDone } from '../_components/motion'
import { Eyebrow } from '../_components/primitives'
import { PortfolioPreview } from '../_components/portfolio-preview'

export const metadata: Metadata = {
  title: 'Sign in | Greenbird',
  description: 'Sign in to access your portfolio and manage your investments.',
}

export default function LoginPage() {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <IntroDone />

      {/* Brand panel */}
      <section className="relative m-2 flex flex-col overflow-hidden rounded-[10px] bg-hero p-6 sm:m-5 sm:p-8 lg:mr-0 lg:p-10">
        <HeroBackdrop />
        <Link href="/" className="intro relative self-start" style={d(150)}>
          <Image src="/images/greenbird-logo@4x.png" alt="Greenbird home" width={116} height={34} priority />
        </Link>

        {/* The portfolio card floats in the panel on wide screens. */}
        <div className="relative hidden flex-1 items-center justify-center py-10 lg:flex">
          <div className="dash-in w-full max-w-[400px]" style={d(700)}>
            <PortfolioPreview />
          </div>
        </div>

        <div className="relative mt-auto pt-20 lg:pt-0">
          <div className="intro flex items-center gap-3" style={d(300)}>
            <span className="draw-x h-px w-6 bg-brand" style={d(300)} />
            <Eyebrow className="text-white/50">Greenbird</Eyebrow>
          </div>
          <h1 className="mt-5 font-display text-[40px] leading-[1.05] font-semibold sm:text-[64px]">
            <span className="line-mask">
              <span className="intro-line" style={d(400)}>
                Welcome back.
              </span>
            </span>
          </h1>
          <p className="intro mt-4 max-w-[420px] text-[16px] leading-[1.45] text-white/70" style={d(600)}>
            Sign in to access your portfolio and manage your investments.
          </p>
        </div>
      </section>

      {/* Form */}
      <main className="relative flex flex-col px-4 pt-6 pb-10 sm:px-8 lg:pt-8">
        <Link
          href="/"
          className="intro group inline-flex items-center gap-2 self-end text-[14px] leading-none text-white/60 transition-colors hover:text-brand"
          style={d(200)}
        >
          <span aria-hidden className="transition-transform duration-300 ease-(--ease-expo) group-hover:-translate-x-0.5">
            ←
          </span>
          Back to site
        </Link>
        <div className="flex flex-1 items-center justify-center py-8 lg:py-12">
          <LoginForm />
        </div>
      </main>
    </div>
  )
}
