'use client'

import Image from 'next/image'
import { useState } from 'react'
import { d } from './delay'
import { DotField } from './dot-field'
import { Reveal } from './motion'

export type TeamMember = {
  name: string
  role: string
  bio: string
  /** Square-ish headshot in /public; falls back to initials. */
  photo?: string
  linkedin?: string
  brokercheck?: string
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')
}

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  const [hovered, setHovered] = useState(false)
  const [open, setOpen] = useState(false)
  const bioId = `bio-${index}`

  return (
    <article
      className="r group relative flex flex-col overflow-hidden rounded-[8px] border border-white/10 bg-hero/40 transition-colors duration-500 hover:border-white/20"
      style={d((index % 3) * 110 + Math.floor(index / 3) * 80)}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Portrait: the brand dot texture behind a green-toned photo or monogram. */}
      <div className="relative aspect-[5/6] overflow-hidden bg-panel">
        <div className="team-portrait-bg pointer-events-none absolute inset-0 transition-transform duration-[1600ms] ease-(--ease-expo) group-hover:scale-110" />
        <DotField active={hovered} />
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="(min-width: 1024px) 430px, 100vw"
            className="team-photo object-cover transition-[filter,transform] duration-700 ease-(--ease-expo) group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="glass glass-tint flex size-28 items-center justify-center rounded-full font-display text-[40px] font-semibold text-white/90 transition-transform duration-700 ease-(--ease-expo) group-hover:scale-105">
              {initials(member.name)}
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#03170b] to-transparent" />
        <span className="absolute top-4 left-4 flex size-10 items-center justify-center rounded-full border border-[rgb(105_255_120/0.2)] font-numeric text-[13px] text-brand backdrop-blur-sm">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-mono text-[12px] leading-[1.3] text-brand uppercase">{member.role}</p>
        <h3 className="mt-2 font-display text-[24px] leading-[1.15] font-semibold">{member.name}</h3>

        <div
          id={bioId}
          className={`grid transition-[grid-template-rows] duration-500 ease-(--ease-expo) ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
        >
          <div className="overflow-hidden">
            <p className="mt-3 text-[14px] leading-[1.45] text-white/60">{member.bio}</p>
          </div>
        </div>
        {!open && <p className="mt-3 line-clamp-2 text-[14px] leading-[1.45] text-white/60">{member.bio}</p>}

        <div className="mt-auto flex items-center justify-between gap-4 pt-5">
          <button
            type="button"
            aria-expanded={open}
            aria-controls={bioId}
            onClick={() => setOpen((v) => !v)}
            className="group/btn inline-flex items-center gap-2 text-[14px] leading-none transition-colors hover:text-brand"
          >
            {open ? 'Close bio' : 'Read bio'}
            <span className="glass flex size-[26px] items-center justify-center rounded-full">
              <span
                className={`relative block size-2.5 transition-transform duration-500 ease-(--ease-expo) ${open ? 'rotate-45' : ''}`}
              >
                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
                <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current" />
              </span>
            </span>
          </button>
          <div className="flex items-center gap-3 font-mono text-[11px] text-white/50 uppercase">
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-brand">
                LinkedIn ↗
              </a>
            )}
            {member.brokercheck && (
              <a href={member.brokercheck} target="_blank" rel="noreferrer" className="transition-colors hover:text-brand">
                BrokerCheck ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <Reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {members.map((m, i) => (
        <MemberCard key={`${m.name}-${i}`} member={m} index={i} />
      ))}
    </Reveal>
  )
}
