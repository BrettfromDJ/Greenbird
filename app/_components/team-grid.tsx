'use client'

import Image from 'next/image'
import { useState } from 'react'
import { d } from './delay'
import { Reveal } from './motion'

export type TeamMember = {
  name: string
  role: string
  /** Portrait exported from the design: full card width, fading into the card green at the bottom. */
  photo: { src: string; width: number; height: number }
  bio?: string
  linkedin?: string
}

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  const [open, setOpen] = useState(false)
  const bioId = `bio-${index}`

  return (
    <article
      className="r group relative aspect-[424/550] overflow-hidden rounded-[8px] bg-hero"
      style={d((index % 3) * 120)}
    >
      <Image
        src={member.photo.src}
        alt={member.name}
        width={member.photo.width}
        height={member.photo.height}
        sizes="(min-width: 1024px) 424px, (min-width: 640px) 50vw, 100vw"
        className="absolute inset-x-0 top-0 h-auto w-full origin-top transition-transform duration-[1200ms] ease-(--ease-expo) group-hover:scale-[1.04]"
      />

      <span className="absolute top-5 left-5 flex size-[50px] items-center justify-center rounded-full border border-[rgb(105_255_120/0.2)] font-numeric text-[16px] leading-none text-brand">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="absolute inset-x-0 bottom-0 px-5 pb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-[26px] leading-none font-semibold">{member.name}</h3>
            <p className="mt-2.5 text-[14px] leading-[1.3] text-white/80">{member.role}</p>
          </div>
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="mt-0.5 shrink-0 transition-[opacity,transform] duration-300 hover:-translate-y-0.5 hover:opacity-80"
            >
              <Image src="/images/icon-linkedin.svg" alt="" width={24} height={24} />
            </a>
          )}
        </div>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={bioId}
          onClick={() => setOpen(true)}
          className="group/btn mt-[23px] inline-flex items-center gap-2 text-[14px] leading-[1.3] transition-colors hover:text-brand"
        >
          Read bio
          <span className="glass glass-tint flex size-7 items-center justify-center rounded-full text-[14px] transition-transform duration-500 ease-(--ease-expo) group-hover/btn:rotate-90">
            +
          </span>
        </button>
      </div>

      {/* Bio slides up over the portrait in the same tinted glass as the hero card. */}
      <div
        id={bioId}
        role="region"
        aria-label={`${member.name} bio`}
        aria-hidden={!open}
        className={`absolute inset-0 flex flex-col bg-hero/95 p-5 backdrop-blur-[30px] transition-[opacity,transform] duration-500 ease-(--ease-expo) sm:p-6 ${
          open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[12px] leading-[1.3] text-brand uppercase">{member.role}</p>
            <p className="mt-2 font-display text-[26px] leading-none font-semibold">{member.name}</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            aria-label="Close bio"
            className="glass glass-tint flex size-7 shrink-0 rotate-45 items-center justify-center rounded-full text-[14px] transition-colors hover:text-brand"
          >
            +
          </button>
        </div>
        <div className="hairline mt-5" />
        <p className="mt-5 overflow-y-auto text-[14px] leading-[1.5] text-white/70">
          {member.bio ?? 'Full bio coming soon.'}
        </p>
      </div>
    </article>
  )
}

export function TeamSection({ label, members }: { label: string; members: TeamMember[] }) {
  return (
    <Reveal className="mt-[60px] first:mt-0">
      <div className="r flex items-center gap-2 border-b border-white/10 pb-5">
        <span className="size-[7px] rounded-full bg-brand" />
        <h2 className="font-mono text-[12px] leading-[1.3] text-brand uppercase">{label}</h2>
      </div>
      <div className="mt-[38px] grid gap-[31px] sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m, i) => (
          <MemberCard key={`${m.name}-${i}`} member={m} index={i} />
        ))}
      </div>
    </Reveal>
  )
}
