'use client'

import Link from 'next/link'
import { useState } from 'react'
import { d } from './delay'

const roles = ['Investor', 'Rep'] as const
type Role = (typeof roles)[number]

const field =
  'h-12 w-full rounded-[6px] border border-white/12 bg-white/[0.03] px-4 text-[14px] text-white placeholder:text-white/35 transition-[border-color,background-color,box-shadow] duration-300 hover:border-white/25 focus:border-brand focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_rgb(75_222_127/0.12)] focus:outline-none'

/**
 * Sign-in form with the live site's fields: an Investor / Rep switch, email,
 * and password with a show/hide toggle. No authentication backend is wired
 * up yet, so submitting only validates the fields and says so.
 */
export function LoginForm() {
  const [role, setRole] = useState<Role>('Investor')
  const [show, setShow] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="w-full max-w-[420px]">
      {/* Segmented switch; the green pill slides between the two options. */}
      <div
        role="radiogroup"
        aria-label="Account type"
        className="intro relative mx-auto grid w-[240px] grid-cols-2 rounded-full border border-white/10 bg-white/[0.03] p-1"
        style={d(300)}
      >
        <span
          aria-hidden
          className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-brand transition-transform duration-500 ease-(--ease-expo)"
          style={{ transform: role === 'Rep' ? 'translateX(100%)' : 'translateX(0)' }}
        />
        {roles.map((r) => (
          <button
            key={r}
            type="button"
            role="radio"
            aria-checked={role === r}
            onClick={() => setRole(r)}
            className={`relative h-9 rounded-full font-mono text-[12px] tracking-[0.12em] uppercase transition-colors duration-300 ${
              role === r ? 'text-on-brand' : 'text-white/55 hover:text-white'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <form
        className="card-sheen intro relative mt-6 overflow-hidden rounded-[8px] bg-panel/85 p-6 backdrop-blur-[40px] shadow-[inset_-2.113px_-2.113px_2.113px_0_rgb(255_255_255/0.05),inset_1.056px_1.056px_1.056px_0_rgb(255_255_255/0.15),0_40px_90px_-30px_rgb(0_0_0/0.7)] sm:p-8"
        style={d(420)}
        onSubmit={(e) => {
          e.preventDefault()
          setSubmitted(true)
        }}
      >
        <label htmlFor="email" className="block text-[14px] leading-[1.3]">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="name@example.com"
          className={`${field} mt-2.5`}
        />

        <div className="mt-6 flex items-baseline justify-between">
          <label htmlFor="password" className="text-[14px] leading-[1.3]">
            Password
          </label>
          <Link
            href="/login/forgot-password"
            prefetch={false}
            className="font-mono text-[11px] tracking-[0.12em] text-white/50 uppercase transition-colors hover:text-brand"
          >
            Forgot?
          </Link>
        </div>
        <div className="relative mt-2.5">
          <input
            id="password"
            name="password"
            type={show ? 'text' : 'password'}
            required
            autoComplete="current-password"
            placeholder="Enter your password"
            className={`${field} pr-12`}
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? 'Hide password' : 'Show password'}
            aria-pressed={show}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-white/45 transition-colors hover:text-brand"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
              <circle cx="12" cy="12" r="3" />
              {show && <path d="M4 4l16 16" strokeLinecap="round" />}
            </svg>
          </button>
        </div>

        <button
          type="submit"
          className="btn-shine group relative mt-8 flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-[6px] bg-brand text-[14px] font-book text-on-brand transition-[background-color,box-shadow] duration-300 hover:bg-brand-hover hover:shadow-[0_8px_30px_-6px_rgb(75_222_127/0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <span className="relative">Sign in</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="relative transition-transform duration-300 ease-(--ease-expo) group-hover:translate-x-0.5"
            aria-hidden
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>

        <p role="status" className="min-h-0 text-center text-[12px] leading-[1.4] text-white/50">
          {submitted && <span className="mt-4 block">Sign-in isn&rsquo;t connected yet.</span>}
        </p>
      </form>

      <p
        className="intro mt-8 text-center font-mono text-[11px] tracking-[0.2em] text-white/40 uppercase"
        style={d(560)}
      >
        Member FINRA · SIPC
      </p>
    </div>
  )
}
