'use client'

import { useState } from 'react'
import { d } from './delay'

const interests = ['General inquiry', 'Market-linked notes', 'Private equity'] as const

const field =
  'mt-3 w-full rounded-[6px] border border-[#26392c] bg-[#08190e] px-5 font-ui text-[14px] text-white transition-colors outline-none placeholder:text-white/20 hover:border-[#335040] focus:border-brand'
const labelText = 'block font-ui text-[12px] leading-none font-medium'

/**
 * "How can we help?" form. Validation is the browser's own (required, email).
 * There's no backend yet: a valid submission shows the thank-you state.
 */
export function ContactForm() {
  const [interest, setInterest] = useState<(typeof interests)[number]>('General inquiry')
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div className="flex min-h-[460px] flex-col items-start justify-center" role="status">
        <p className="intro font-mono text-[12px] leading-[1.3] text-brand uppercase" style={d(0)}>
          Message sent
        </p>
        <p className="intro mt-4 font-display text-[32px] leading-[1.2] font-semibold" style={d(100)}>
          Thanks — we’ll be in touch.
        </p>
        <p className="intro mt-4 max-w-[420px] text-[16px] leading-[1.3] text-white/60" style={d(200)}>
          A member of our team will reply within one business day. For anything urgent, call us during business hours.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setSent(true)
      }}
      className="mt-8 flex flex-col gap-6"
    >
      <div className="intro grid gap-6 sm:grid-cols-2" style={d(800)}>
        <label className="block">
          <span className={labelText}>Account name*</span>
          <input id="contact-name" name="name" required autoComplete="name" placeholder="John Doe" className={`${field} h-[54px]`} />
        </label>
        <label className="block">
          <span className={labelText}>Phone number</span>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(555) 555-0123"
            className={`${field} h-[54px]`}
          />
        </label>
      </div>

      <label className="intro block" style={d(880)}>
        <span className={labelText}>Email address*</span>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="john@example.com"
          className={`${field} h-[54px]`}
        />
      </label>

      <fieldset className="intro" style={d(960)}>
        <legend className={labelText}>I’m interested in*</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {interests.map((option) => {
            const checked = interest === option
            return (
              <label
                key={option}
                className={`flex h-[54px] cursor-pointer items-center gap-3 rounded-[6px] border bg-[#08190e] px-4 transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand ${
                  checked ? 'border-brand' : 'border-[#26392c] hover:border-[#335040]'
                }`}
              >
                <input
                  type="radio"
                  name="interest"
                  value={option}
                  checked={checked}
                  onChange={() => setInterest(option)}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className={`size-6 shrink-0 rounded-full transition-[border-width,border-color] duration-300 ease-(--ease-expo) ${
                    checked ? 'border-[6px] border-brand' : 'border border-[#3b3f3e]'
                  }`}
                />
                <span className="font-ui text-[13px] leading-none">{option}</span>
              </label>
            )
          })}
        </div>
      </fieldset>

      <label className="intro block" style={d(1040)}>
        <span className={labelText}>Message*</span>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          placeholder="Tell us about your investment goals or any questions you may have..."
          className={`${field} block h-[123px] resize-none py-5 leading-[1.3]`}
        />
      </label>

      <div className="intro" style={d(1120)}>
        <button
          type="submit"
          className="btn-shine relative h-[52px] w-full overflow-hidden rounded-[6px] bg-brand font-ui text-[14px] font-medium text-on-brand transition-[background-color,box-shadow] duration-300 hover:bg-brand-hover hover:shadow-[0_8px_30px_-6px_rgb(75_222_127/0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <span className="relative">Send message</span>
        </button>
      </div>
    </form>
  )
}
