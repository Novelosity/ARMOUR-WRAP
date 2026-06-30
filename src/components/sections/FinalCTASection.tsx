'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap, ScrollTrigger } from '@/lib/gsap'

// Seeded values so server and client render identically (no Math.random at module level)
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: (i * 5.3) % 100,
  size: (i % 5) * 0.5 + 0.5,
  delay: (i * 0.4) % 8,
  duration: 7 + (i % 6),
  opacity: (i % 7) * 0.05 + 0.05,
}))

const TRUST_ITEMS = [
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
        <path d="M12 2L3 7v7c0 5 4 9 9 11 5-2 9-6 9-11V7L12 2z"/><path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    label: 'Certified Installers',
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    label: 'Premium Materials',
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
    label: 'Satisfaction Guaranteed',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const itemVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function FinalCTASection() {
  const imgRef  = useRef<HTMLDivElement>(null)
  const secRef  = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = secRef.current
    if (!section) return

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        if (imgRef.current) {
          gsap.to(imgRef.current, { scale: 1, duration: 1.4, ease: 'power2.out' })
        }
      },
    })

    if (imgRef.current) gsap.set(imgRef.current, { scale: 1.08 })

    return () => { st.kill() }
  }, [])

  return (
    <section
      ref={secRef}
      id="contact"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-24"
      style={{ background: '#050505' }}
    >
      {/* Hero background image */}
      <div
        ref={imgRef}
        className="absolute inset-0 will-change-transform"
      >
        <img
          src="/images/new/Picture 10 — Final CTA - Copy.png"
          alt="ArmorWrap Studio final CTA"
          className="w-full h-full object-cover"
          style={{ opacity: 0.55 }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-transparent to-[#050505]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-transparent to-[#050505]/60" />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${p.x}%`,
              bottom: '-2px',
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animation: `particle-rise ${p.duration}s ${p.delay}s ease-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Vertical studio lights */}
      {[20, 50, 80].map((x, i) => (
        <div
          key={i}
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            left: `${x}%`,
            width: '1px',
            background: `linear-gradient(180deg, transparent, rgba(212,175,55,${0.08 - i * 0.02}) 30%, transparent)`,
          }}
        />
      ))}

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        {/* Label */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-12" style={{ background: 'linear-gradient(90deg,transparent,#D4AF37)' }} />
          <span className="label-gold">Section 10 — Book Now</span>
          <div className="h-px w-12" style={{ background: 'linear-gradient(90deg,#D4AF37,transparent)' }} />
        </motion.div>

        {/* Main headline */}
        <motion.h2
          variants={itemVariants}
          className="heading-hero text-white mb-6"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Protect.
          <br />
          <span className="text-gold-gradient">Enhance.</span>
          <br />
          <span className="text-blue-gradient">Maintain.</span>
        </motion.h2>

        <motion.p variants={itemVariants} className="text-[#D8D8D8] text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10 opacity-80">
          Advanced Kevlar PPF protection and expert detailing for a flawless finish that lasts years, not months.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-12">
          <a
            href="https://wa.me/923001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-9 py-4 text-[0.65rem] tracking-[0.22em] uppercase font-bold transition-all duration-200"
            style={{ background: '#D4AF37', color: '#000', border: '1px solid #D4AF37' }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLElement).style.background = '#F0D060'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(212,175,55,0.4)'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLElement).style.background = '#D4AF37'
              ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            </svg>
            Book Now via WhatsApp
          </a>

          <button
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-9 py-4 text-[0.65rem] tracking-[0.22em] uppercase font-semibold transition-all duration-200 cursor-pointer"
            style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#fff', background: 'rgba(255,255,255,0.04)' }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,163,255,0.5)'
              ;(e.currentTarget as HTMLElement).style.color = '#00A3FF'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)'
              ;(e.currentTarget as HTMLElement).style.color = '#fff'
            }}
          >
            View Services
          </button>

          <a
            href="tel:+923001234567"
            className="flex items-center gap-2 px-9 py-4 text-[0.65rem] tracking-[0.22em] uppercase font-semibold transition-all duration-200"
            style={{ border: '1px solid rgba(0,163,255,0.3)', color: '#00A3FF', background: 'rgba(0,163,255,0.04)' }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLElement).style.background = '#00A3FF'
              ;(e.currentTarget as HTMLElement).style.color = '#fff'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLElement).style.background = 'rgba(0,163,255,0.04)'
              ;(e.currentTarget as HTMLElement).style.color = '#00A3FF'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.58 1.18 2 2 0 012.56 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l.9-.9a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            Call Us
          </a>
        </motion.div>

        {/* Divider */}
        <motion.div variants={itemVariants} className="divider-gold max-w-48 mx-auto mb-8" />

        {/* Trust line */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6 md:gap-12">
          {TRUST_ITEMS.map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              {icon}
              <span className="label-sm" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.6rem' }}>{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Location */}
        <motion.div variants={itemVariants} className="mt-10 flex items-center justify-center gap-2 opacity-45">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          <span className="label-sm" style={{ fontSize: '0.55rem' }}>Pakistan — Serving Premium Vehicles Nationwide</span>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-6 right-8">
        <span className="label-sm" style={{ fontSize: '0.5rem' }}>10 / 10</span>
      </div>
      <div className="noise" />
    </section>
  )
}
