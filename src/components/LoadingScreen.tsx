'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

interface Props { onComplete: () => void }

export default function LoadingScreen({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef      = useRef<HTMLDivElement>(null)
  const taglineRef   = useRef<HTMLParagraphElement>(null)
  const lineRef      = useRef<HTMLDivElement>(null)
  const barRef       = useRef<HTMLDivElement>(null)
  const pctRef       = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.9,
          ease: 'power2.inOut',
          onComplete,
        })
      },
    })

    tl.fromTo(logoRef.current,
      { opacity: 0, y: 28, scale: 0.88 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }
    )
    tl.fromTo(lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5, ease: 'power2.inOut' },
      '-=0.4'
    )
    tl.fromTo(taglineRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      '-=0.2'
    )
    tl.fromTo(barRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.8,
        ease: 'power1.inOut',
        onUpdate() {
          if (pctRef.current) pctRef.current.textContent = Math.round(this.progress() * 100) + '%'
        },
      },
      '-=0.1'
    )
    tl.to({}, { duration: 0.3 })

    return () => { tl.kill() }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: '#050505' }}
    >
      {/* Animated background lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px w-full"
            style={{
              top: `${14 + i * 14}%`,
              background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? '#D4AF37' : '#00A3FF'}, transparent)`,
              opacity: 0.06 + i * 0.01,
              animation: `shimmer ${2.5 + i * 0.25}s linear infinite`,
              animationDelay: `${i * 0.35}s`,
            }}
          />
        ))}
        {/* Corner marks */}
        {['top-6 left-6', 'top-6 right-6', 'bottom-6 left-6', 'bottom-6 right-6'].map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-8 h-8 opacity-20`}>
            <div className={`absolute top-0 left-0 w-3 h-px bg-[#D4AF37] ${i > 1 ? 'bottom-0 top-auto' : ''}`} />
            <div className={`absolute top-0 left-0 w-px h-3 bg-[#D4AF37] ${i % 2 === 1 ? 'right-0 left-auto' : ''}`} />
          </div>
        ))}
      </div>

      {/* Logo */}
      <div ref={logoRef} className="relative z-10 text-center opacity-0">
        {/* Shield SVG */}
        <div className="flex justify-center mb-5">
          <svg width="56" height="66" viewBox="0 0 56 66" fill="none">
            <path
              d="M28 2L4 12V32C4 47 28 64 28 64C28 64 52 47 52 32V12L28 2Z"
              fill="rgba(212,175,55,0.08)"
              stroke="url(#shieldG)"
              strokeWidth="1.5"
            />
            <path
              d="M28 10L10 18V32C10 43 28 57 28 57C28 57 46 43 46 32V18L28 10Z"
              fill="rgba(212,175,55,0.05)"
              stroke="rgba(212,175,55,0.3)"
              strokeWidth="0.75"
            />
            {/* Armor "A" mark */}
            <text x="28" y="38" textAnchor="middle" fill="#D4AF37" fontSize="14" fontWeight="700" fontFamily="Space Grotesk, sans-serif">A</text>
            <defs>
              <linearGradient id="shieldG" x1="28" y1="2" x2="28" y2="64" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#F0D060" />
                <stop offset="100%" stopColor="#9A7B20" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="flex items-baseline gap-1 justify-center">
          <span
            className="text-white tracking-[0.3em] font-bold text-3xl"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            ARMOR
          </span>
          <span
            className="text-[#D4AF37] tracking-[0.35em] font-light text-3xl"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            WRAP
          </span>
        </div>
        <p className="text-[#00A3FF] tracking-[0.5em] text-[0.55rem] mt-1 uppercase font-medium">
          STUDIO
        </p>
      </div>

      {/* Divider */}
      <div
        ref={lineRef}
        className="mt-8 h-px w-72 origin-left"
        style={{ background: 'linear-gradient(90deg, transparent, #D4AF37 40%, #00A3FF 60%, transparent)' }}
      />

      {/* Tagline */}
      <p
        ref={taglineRef}
        className="mt-4 text-[0.6rem] tracking-[0.4em] uppercase opacity-0"
        style={{ color: 'rgba(255,255,255,0.3)' }}
      >
        Protect · Enhance · Maintain
      </p>

      {/* Progress */}
      <div className="absolute bottom-14 w-64">
        <div className="flex justify-between mb-2">
          <span className="text-[0.55rem] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Loading
          </span>
          <span ref={pctRef} className="text-[0.55rem] font-mono" style={{ color: '#D4AF37' }}>
            0%
          </span>
        </div>
        <div className="h-px overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <div
            ref={barRef}
            className="h-full origin-left"
            style={{ background: 'linear-gradient(90deg, #9A7B20, #D4AF37, #00A3FF)' }}
          />
        </div>
      </div>
    </div>
  )
}
