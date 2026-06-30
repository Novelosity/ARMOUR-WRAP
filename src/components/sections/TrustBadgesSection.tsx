'use client'

import { motion } from 'framer-motion'
import TrustBadge from '@/components/TrustBadge'

const STAT_COUNTERS = [
  { value: '5,000+', label: 'Vehicles Protected' },
  { value: '10+',    label: 'Years of Expertise' },
  { value: '100%',   label: 'Satisfaction Rate' },
  { value: '3 Year', label: 'PPF Warranty' },
]

const BADGES = [
  {
    label: 'Premium Quality Film',
    sublabel: 'Kevlar-Grade Material',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
        <path d="M12 2L3 7v7c0 5 4 9 9 11 5-2 9-6 9-11V7L12 2z"/><path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    label: 'Expert Installation',
    sublabel: 'Certified Technicians',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
        <circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 018 0v2"/><path d="M18 20v-2a3 3 0 00-2-2.83"/><path d="M14 6.35A4 4 0 0116 8"/>
      </svg>
    ),
  },
  {
    label: 'Scratch Resistant',
    sublabel: 'Surface Hardness 9H',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    label: 'Self-Healing Tech',
    sublabel: 'Elastomeric Recovery',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
  },
  {
    label: 'UV Protection',
    sublabel: 'Block 99% UV Rays',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
        <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
      </svg>
    ),
  },
  {
    label: 'Long-Lasting Gloss',
    sublabel: '5–10 Year Lifespan',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
]

export default function TrustBadgesSection() {
  return (
    <section
      id="trust"
      className="relative w-full py-24 md:py-32"
      style={{ background: 'linear-gradient(180deg, #0B0D10 0%, #050505 100%)' }}
    >
      {/* Stat counters */}
      <div className="max-w-5xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STAT_COUNTERS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="text-center py-6 px-4"
              style={{ border: '1px solid rgba(212,175,55,0.12)', background: 'rgba(212,175,55,0.03)' }}
            >
              <p
                className="text-3xl md:text-4xl font-bold mb-1"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  background: 'linear-gradient(135deg,#9A7B20,#F0D060,#9A7B20)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {stat.value}
              </p>
              <p className="label-sm" style={{ fontSize: '0.55rem' }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16 px-6"
      >
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-16" style={{ background: 'linear-gradient(90deg,transparent,#D4AF37)' }} />
          <span className="label-gold">Section 09 — Trust & Quality</span>
          <div className="h-px w-16" style={{ background: 'linear-gradient(90deg,#D4AF37,transparent)' }} />
        </div>
        <h2
          className="heading-xl text-white mb-4"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Why ArmorWrap
          <br />
          <span className="text-gold-gradient">is Pakistan's premium choice.</span>
        </h2>
      </motion.div>

      {/* Badges grid */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 md:gap-6">
          {BADGES.map((badge, i) => (
            <TrustBadge
              key={badge.label}
              index={i}
              label={badge.label}
              sublabel={badge.sublabel}
              icon={badge.icon}
            />
          ))}
        </div>
      </div>

      {/* Trust line */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center mt-16 px-6"
      >
        <div className="divider-gold max-w-xs mx-auto mb-6" />
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {['Certified Installers', 'Premium Kevlar Material', 'Satisfaction Guaranteed'].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#D4AF37' }} />
              <span className="label-sm" style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.6)' }}>{item}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '800px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(212,175,55,0.04) 0%, transparent 70%)',
        }} />
      </div>

      <div className="absolute bottom-6 right-8">
        <span className="label-sm" style={{ fontSize: '0.5rem' }}>09 / 10</span>
      </div>
      <div className="noise" />
    </section>
  )
}
