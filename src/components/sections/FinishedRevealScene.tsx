'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const PROTECTION_POINTS = [
  { x: '20%', y: '45%', label: 'Hood — Protected' },
  { x: '50%', y: '35%', label: 'Roof — PPF Wrapped' },
  { x: '75%', y: '50%', label: 'Rear — Full Coverage' },
  { x: '30%', y: '65%', label: 'Fender — Edge Sealed' },
]

const WATER_BEADS = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  left: `${15 + i * 9}%`,
  delay: `${i * 0.35}s`,
  duration: `${2.5 + (i % 4) * 0.25}s`,
}))

export default function FinishedRevealScene() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef     = useRef<HTMLDivElement>(null)
  const glowRef    = useRef<HTMLDivElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)
  const tagsRef    = useRef<HTMLDivElement>(null)
  const pointsRef  = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ss = (t: number) => t * t * (3 - 2 * t)
    const sp = (p: number, start: number, range: number) =>
      ss(Math.max(0, Math.min(1, (p - start) / range)))

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=200%',
      pin: true,
      scrub: 1.8,
      onUpdate: (self) => {
        const p = self.progress

        if (imgRef.current) {
          gsap.set(imgRef.current, {
            opacity: sp(p, 0, 0.5),
            scale: 1.08 - sp(p, 0, 1) * 0.08,
          })
        }

        if (glowRef.current) {
          gsap.set(glowRef.current, { opacity: sp(p, 0.2, 0.32) * 0.7 })
        }

        const tP = sp(p, 0.1, 0.28)
        if (titleRef.current) gsap.set(titleRef.current, { opacity: tP, y: (1 - tP) * 30 })

        const tagsP = sp(p, 0.35, 0.22)
        if (tagsRef.current) gsap.set(tagsRef.current, { opacity: tagsP, y: (1 - tagsP) * 20 })

        PROTECTION_POINTS.forEach((_, i) => {
          const el = pointsRef.current[i]
          if (!el) return
          const ptP = sp(p, 0.48 + i * 0.05, 0.18)
          gsap.set(el, { opacity: ptP, scale: ptP })
        })
      },
    })

    return () => { st.kill() }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="reveal"
      className="relative w-full h-screen flex flex-col items-center justify-end overflow-hidden pb-20"
      style={{ background: '#050505' }}
    >
      {/* Car image */}
      <div
        ref={imgRef}
        className="absolute inset-0 will-change-transform opacity-0"
      >
        <img
          src="/images/new/picture 6 png - Copy.png"
          alt="Fully protected luxury car with Kevlar PPF"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/30 via-transparent to-[#050505]/80" />
        {/* Deep blue studio atmosphere */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(0,100,200,0.08) 0%, transparent 60%)' }} />
      </div>

      {/* Center glow — deep gloss effect */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none opacity-0"
        style={{
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(0,163,255,0.12) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Water bead animation */}
      <div className="absolute top-[20%] left-0 right-0 pointer-events-none overflow-hidden h-[30%]">
        {WATER_BEADS.map((bead) => (
          <div
            key={bead.id}
            className="absolute w-2 h-3 rounded-full"
            style={{
              left: bead.left,
              top: '10%',
              background: 'radial-gradient(ellipse at 35% 30%, rgba(255,255,255,0.9), rgba(200,220,255,0.4))',
              animation: `bead-fall ${bead.duration} ${bead.delay} ease-in infinite`,
              boxShadow: '0 0 4px rgba(0,163,255,0.4)',
            }}
          />
        ))}
      </div>

      {/* Light streaks */}
      {[30, 70].map((x, i) => (
        <div
          key={i}
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            left: `${x}%`,
            width: '60px',
            background: `linear-gradient(180deg, transparent, rgba(255,255,255,${0.03 + i * 0.01}) 40%, transparent)`,
            filter: 'blur(15px)',
          }}
        />
      ))}

      {/* Protection point hotspots */}
      {PROTECTION_POINTS.map((pt, i) => (
        <div
          key={i}
          ref={el => { pointsRef.current[i] = el }}
          className="absolute pointer-events-none opacity-0"
          style={{ left: pt.x, top: pt.y, transform: 'translate(-50%,-50%)', scale: 0 }}
        >
          <div className="relative">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                background: 'rgba(0,163,255,0.9)',
                boxShadow: '0 0 12px rgba(0,163,255,0.8)',
                animation: 'pulse-blue 2s ease-in-out infinite',
              }}
            />
            <div className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap">
              <div className="h-px w-8 bg-[#00A3FF] opacity-60 inline-block align-middle mr-2" />
              <span className="label-blue inline-block" style={{ fontSize: '0.5rem' }}>{pt.label}</span>
            </div>
          </div>
        </div>
      ))}

      {/* Title — positioned at bottom */}
      <div ref={titleRef} className="relative z-10 text-center px-6 opacity-0 mb-6">
        <h2
          className="heading-xl text-white mb-3"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          The shield is
          <br />
          <span className="text-blue-gradient">invisible.</span>
        </h2>
        <p className="text-[#D8D8D8] text-sm max-w-md mx-auto leading-relaxed opacity-75">
          Protected from scratches, stains, UV rays, road dust, and daily wear — without hiding a single inch of your car's beauty.
        </p>
      </div>

      {/* Protection tags */}
      <div ref={tagsRef} className="relative z-10 flex flex-wrap justify-center gap-2 px-6 opacity-0">
        {['Scratch Resistant', 'UV Blocked', 'Self-Healing', 'Water Beading', 'Stain Proof', 'Road Dust'].map((tag) => (
          <span
            key={tag}
            className="text-[0.55rem] tracking-[0.15em] uppercase px-3 py-1.5"
            style={{
              background: 'rgba(0,163,255,0.07)',
              border: '1px solid rgba(0,163,255,0.25)',
              color: 'rgba(255,255,255,0.75)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="absolute bottom-8 right-8">
        <span className="label-sm" style={{ fontSize: '0.5rem' }}>06 / 10</span>
      </div>
      <div className="noise" />
    </section>
  )
}
