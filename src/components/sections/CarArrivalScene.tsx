'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function CarArrivalScene() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef     = useRef<HTMLDivElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ss = (t: number) => t * t * (3 - 2 * t)
    const sp = (p: number, start: number, range: number) =>
      ss(Math.max(0, Math.min(1, (p - start) / range)))

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=220%',
      pin: true,
      scrub: 1.4,
      onUpdate: (self) => {
        const p = self.progress

        if (imgRef.current) {
          const carP = sp(p, 0, 0.55)
          gsap.set(imgRef.current, {
            x: `${(1 - carP) * -30}%`,
            opacity: carP,
            scale: 1 + sp(p, 0, 1) * 0.04,
          })
        }

        if (overlayRef.current) {
          gsap.set(overlayRef.current, { opacity: Math.max(0, 0.7 - sp(p, 0, 0.65) * 0.7) })
        }

        const titleP = sp(p, 0.3, 0.38)
        if (titleRef.current) {
          gsap.set(titleRef.current, { opacity: titleP, y: (1 - titleP) * 40 })
        }
      },
    })

    return () => { st.kill() }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="arrival"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* Main car image */}
      <div
        ref={imgRef}
        className="absolute inset-0 will-change-transform"
        style={{ opacity: 0 }}
      >
        <img
          src="/images/new/Picture 4 — Car Arrival - Copy.png"
          alt="Luxury car arriving at ArmorWrap Studio"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Directional gradients for cinematic feel */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-[#050505]" />
      </div>

      {/* Initial dark overlay that lifts */}
      <div ref={overlayRef} className="absolute inset-0 bg-[#050505]" style={{ opacity: 0.7 }} />

      {/* Studio light beams */}
      {[25, 50, 75].map((x, i) => (
        <div
          key={i}
          className="absolute top-0 h-full pointer-events-none"
          style={{
            left: `${x}%`,
            width: '1px',
            background: `linear-gradient(180deg, rgba(212,175,55,${0.12 - i * 0.03}) 0%, transparent 80%)`,
          }}
        />
      ))}

      {/* Reflective floor gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(0,163,255,0.04) 50%, rgba(0,163,255,0.08))',
        }}
      />

      {/* Title */}
      <div
        ref={titleRef}
        className="relative z-10 text-center px-6 opacity-0"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-12" style={{ background: 'linear-gradient(90deg,transparent,#D4AF37)' }} />
          <span className="label-gold">Section 04</span>
          <div className="h-px w-12" style={{ background: 'linear-gradient(90deg,#D4AF37,transparent)' }} />
        </div>

        <h2
          className="heading-xl text-white"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          The canvas
          <br />
          <span className="text-gold-gradient">arrives.</span>
        </h2>

        <p className="text-[#D8D8D8] text-sm max-w-sm mx-auto mt-4 leading-relaxed opacity-70">
          A pristine luxury vehicle enters our premium detailing studio — ready for its transformation.
        </p>

        {/* Camera angle label */}
        <div className="mt-8 flex items-center justify-center gap-2 opacity-40">
          <div className="w-5 h-3 rounded-sm border border-white/40" />
          <span className="label-sm" style={{ fontSize: '0.5rem' }}>Studio Low Angle</span>
        </div>
      </div>

      {/* Headlight glow effects */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '25%',
          left: '30%',
          width: '180px',
          height: '80px',
          background: 'radial-gradient(ellipse, rgba(255,255,240,0.15) 0%, transparent 70%)',
          filter: 'blur(8px)',
          animation: 'pulse-gold 3s ease-in-out infinite',
        }}
      />

      {/* Section counter */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between">
        <span className="label-sm" style={{ fontSize: '0.5rem' }}>04 / 10</span>
        <div className="flex gap-1">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-6 h-px" style={{ background: i < 4 ? '#D4AF37' : 'rgba(255,255,255,0.15)' }} />
          ))}
        </div>
      </div>

      <div className="noise" />
    </section>
  )
}
