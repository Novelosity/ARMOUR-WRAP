'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { motion } from 'framer-motion'

const MICRO_FEATURES = [
  { icon: '◈', label: 'Self-Healing',       color: '#00A3FF' },
  { icon: '⬡', label: 'Hydrophobic',        color: '#D4AF37' },
  { icon: '⬢', label: 'Impact Absorption',  color: '#00A3FF' },
  { icon: '◇', label: 'Optical Clarity',    color: '#D4AF37' },
  { icon: '◉', label: 'UV Resistance',      color: '#00A3FF' },
]

export default function LayerFusionScene() {
  const sectionRef  = useRef<HTMLElement>(null)
  const shieldRef   = useRef<HTMLDivElement>(null)
  const ringRef     = useRef<HTMLDivElement>(null)
  const titleRef    = useRef<HTMLDivElement>(null)
  const featRef     = useRef<HTMLDivElement>(null)
  const imgRef      = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // smoothstep helpers
    const ss = (t: number) => t * t * (3 - 2 * t)
    const sp = (p: number, start: number, range: number) =>
      ss(Math.max(0, Math.min(1, (p - start) / range)))

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=250%',
      pin: true,
      scrub: 1.4,
      onUpdate: (self) => {
        const p = self.progress

        if (imgRef.current) {
          gsap.set(imgRef.current, {
            opacity: sp(p, 0, 0.5),
            scale: 1.2 - sp(p, 0, 1) * 0.22,
          })
        }

        const shieldP = sp(p, 0.1, 0.4)
        if (shieldRef.current) {
          gsap.set(shieldRef.current, {
            opacity: shieldP,
            scale: 0.5 + shieldP * 0.5,
          })
        }

        if (ringRef.current) {
          const ringP = sp(p, 0.2, 0.4)
          gsap.set(ringRef.current, { opacity: ringP * 0.7, scale: 0.8 + ringP * 0.4 })
        }

        const titleP = sp(p, 0.35, 0.22)
        if (titleRef.current) gsap.set(titleRef.current, { opacity: titleP, y: (1 - titleP) * 30 })

        const featP = sp(p, 0.55, 0.28)
        if (featRef.current) gsap.set(featRef.current, { opacity: featP, y: (1 - featP) * 20 })
      },
    })

    return () => { st.kill() }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="fusion"
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#0B0D10' }}
    >
      {/* Background image */}
      <div
        ref={imgRef}
        className="absolute inset-0 opacity-0 will-change-transform"
        style={{ scale: 1.2, transformOrigin: 'center center' }}
      >
        <img
          src="/images/new/Picture 3 — Layers Merge - Copy.png"
          alt="Layer fusion"
          className="w-full h-full object-cover"
          style={{ opacity: 0.45 }}
          loading="lazy"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,#0B0D10 0%,transparent 30%,transparent 70%,#0B0D10 100%)' }} />
      </div>

      {/* Blue/gold radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(0,163,255,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
      </div>

      {/* Rotating ring */}
      <div
        ref={ringRef}
        className="absolute"
        style={{
          width: 280, height: 280,
          border: '1px solid rgba(0,163,255,0.25)',
          borderRadius: '50%',
          opacity: 0,
          animation: 'spin-slow 12s linear infinite',
          boxShadow: '0 0 40px rgba(0,163,255,0.15), inset 0 0 40px rgba(0,163,255,0.05)',
        }}
      />
      <div
        className="absolute"
        style={{
          width: 340, height: 340,
          border: '1px solid rgba(212,175,55,0.12)',
          borderRadius: '50%',
          animation: 'spin-slow 20s linear infinite reverse',
          opacity: 0.4,
        }}
      />

      {/* Merged shield icon */}
      <div
        ref={shieldRef}
        className="relative z-10"
        style={{ opacity: 0, scale: 0.5 }}
      >
        <svg width="120" height="140" viewBox="0 0 120 140" fill="none">
          {/* Outer shield */}
          <path
            d="M60 4L8 22V68C8 100 60 136 60 136C60 136 112 100 112 68V22L60 4Z"
            fill="rgba(0,163,255,0.06)"
            stroke="url(#fusionGrad)"
            strokeWidth="1.5"
          />
          {/* Inner shield */}
          <path
            d="M60 18L20 32V64C20 88 60 116 60 116C60 116 100 88 100 64V32L60 18Z"
            fill="rgba(0,163,255,0.04)"
            stroke="rgba(0,163,255,0.3)"
            strokeWidth="0.75"
          />
          {/* Center energy mark */}
          <circle cx="60" cy="68" r="16" fill="rgba(0,163,255,0.1)" stroke="rgba(0,163,255,0.6)" strokeWidth="1" />
          <path d="M56 64l4-8 4 8h-3l4 8h-10l4-8h-3z" fill="#00A3FF" opacity="0.9" />
          <defs>
            <linearGradient id="fusionGrad" x1="60" y1="4" x2="60" y2="136" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00D4FF"/>
              <stop offset="50%" stopColor="#00A3FF"/>
              <stop offset="100%" stopColor="#D4AF37"/>
            </linearGradient>
          </defs>
        </svg>

        {/* Glow behind shield */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(0,163,255,0.3) 0%, transparent 65%)',
            filter: 'blur(20px)',
            animation: 'pulse-blue 2.5s ease-in-out infinite',
          }}
        />
      </div>

      {/* Title */}
      <div
        ref={titleRef}
        className="relative z-10 text-center mt-10 px-6 opacity-0"
      >
        <h2
          className="heading-xl text-white mb-3"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Stronger. Clearer.
          <br />
          <span className="text-blue-gradient">Longer Lasting.</span>
        </h2>
        <p className="text-[#D8D8D8] text-sm max-w-md mx-auto leading-relaxed opacity-80">
          Five precision layers fused into one crystal-clear shield — engineered for Pakistan's roads.
        </p>
      </div>

      {/* Micro features */}
      <div
        ref={featRef}
        className="relative z-10 flex flex-wrap justify-center gap-3 mt-8 px-6 max-w-xl opacity-0"
      >
        {MICRO_FEATURES.map((f) => (
          <div
            key={f.label}
            className="flex items-center gap-1.5 px-3 py-1.5"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${f.color}30`,
            }}
          >
            <span style={{ color: f.color, fontSize: '10px' }}>{f.icon}</span>
            <span className="label-sm" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.55rem' }}>{f.label}</span>
          </div>
        ))}
      </div>

      {/* Energy lines across width */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            top: `${30 + i * 20}%`,
            background: `linear-gradient(90deg, transparent, ${i === 1 ? '#00A3FF' : 'rgba(0,163,255,0.3)'}, transparent)`,
            opacity: 0.15 + i * 0.05,
            animation: `shimmer ${2 + i * 0.5}s ${i * 0.7}s linear infinite`,
            backgroundSize: '200% 100%',
          }}
        />
      ))}

      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="label-sm" style={{ fontSize: '0.55rem' }}>03 / 10</p>
      </div>

      <div className="noise" />
    </section>
  )
}
