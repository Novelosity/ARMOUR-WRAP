'use client'

import { motion } from 'framer-motion'
import ServiceCard from '@/components/ServiceCard'

const SERVICES = [
  {
    title: 'PPF Film',
    subtitle: 'Kevlar Paint Protection',
    copy: 'Invisible paint protection that lasts years. Self-healing, UV-resistant, crystal clear.',
    features: ['High Impact', 'Self-Healing', 'UV Resistant', 'Crystal Clear'],
    imageSrc: '/images/new/hero image product - Copy.png',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00A3FF" strokeWidth="1.5">
        <path d="M12 2L3 7v7c0 5 4 9 9 11 5-2 9-6 9-11V7L12 2z"/>
      </svg>
    ),
  },
  {
    title: 'Polishing',
    subtitle: 'Paint Correction',
    copy: 'Restore deep gloss, mirror finish, and remove swirl marks for showroom-level shine.',
    features: ['Mirror Gloss', 'Swirl Removal', 'Paint Revival', 'Showroom Shine'],
    imageSrc: '/images/new/ChatGPT Image Jun 26, 2026, 03_20_06 PM (1).png',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00A3FF" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
      </svg>
    ),
  },
  {
    title: 'Interior Cleaning',
    subtitle: 'Deep Cabin Care',
    copy: 'Deep cleaning for seats, dashboard, carpets, and full cabin freshness restoration.',
    features: ['Deep Clean', 'Leather Care', 'Fresh Cabin', 'Detail Finish'],
    imageSrc: '/images/new/ChatGPT Image Jun 26, 2026, 03_20_07 PM (2).png',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00A3FF" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    title: 'Exterior Cleaning',
    subtitle: 'Premium Surface Care',
    copy: 'Premium foam wash and surface treatment for a consistently flawless exterior.',
    features: ['Safe Wash', 'Foam Clean', 'Surface Care', 'Flawless Finish'],
    imageSrc: '/images/new/ChatGPT Image Jun 26, 2026, 03_20_07 PM (3).png',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00A3FF" strokeWidth="1.5">
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    ),
  },
  {
    title: 'Glass Cleaning',
    subtitle: 'Crystal Clear Vision',
    copy: 'Streak-free glass treatment with water repel protection for safer, clearer driving.',
    features: ['Streak-Free', 'Clear Vision', 'Water Repel', 'Glass Formula'],
    imageSrc: '/images/new/ChatGPT Image Jun 26, 2026, 03_20_08 PM (4).png',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00A3FF" strokeWidth="1.5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    title: 'Light Restoration',
    subtitle: 'Headlight Revival',
    copy: 'Restore dull, yellowed headlights for brighter output, safer driving, and refined looks.',
    features: ['Lens Clarity', 'Brighter Beam', 'Safer Drive', 'Refined Finish'],
    imageSrc: '/images/new/ChatGPT Image Jun 26, 2026, 03_20_08 PM (5).png',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00A3FF" strokeWidth="1.5">
        <path d="M9 18h6M10 22h4M12 2v4M4.93 4.93l2.83 2.83M1 12h4M19 12h4M16.24 7.76l2.83-2.83M12 6a6 6 0 100 12 6 6 0 000-12z"/>
      </svg>
    ),
  },
]

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative w-full py-24 md:py-32"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #0B0D10 50%, #050505 100%)' }}
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg,transparent,#D4AF37)' }} />
            <span className="label-gold">Section 07 — Our Services</span>
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg,#D4AF37,transparent)' }} />
          </div>

          <h2
            className="heading-xl text-white mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Premium protection.
            <br />
            <span className="text-gold-gradient">Complete care.</span>
          </h2>

          <p className="text-[#D8D8D8] text-sm max-w-lg mx-auto leading-relaxed opacity-75">
            From Kevlar PPF installation to interior detailing — every service is engineered to keep your vehicle flawless.
          </p>
        </motion.div>
      </div>

      {/* Cards grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.title}
              index={i}
              title={service.title}
              subtitle={service.subtitle}
              copy={service.copy}
              features={service.features}
              imageSrc={service.imageSrc}
              icon={service.icon}
            />
          ))}
        </div>
      </div>

      {/* CTA below cards */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mt-14"
      >
        <p className="label-sm mb-5">Ready to book your service?</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://wa.me/923001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3.5 text-[0.65rem] tracking-[0.2em] uppercase font-semibold transition-all duration-200"
            style={{ background: '#D4AF37', color: '#000', border: '1px solid #D4AF37' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F0D060' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#D4AF37' }}
          >
            Book via WhatsApp
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 text-[0.65rem] tracking-[0.2em] uppercase font-semibold transition-all duration-200"
            style={{ border: '1px solid rgba(255,255,255,0.18)', color: '#fff', background: 'rgba(255,255,255,0.04)' }}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            View Full Service List
          </a>
        </div>
      </motion.div>

      {/* Background grid lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: 0.025 }}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute top-0 bottom-0" style={{ left: `${i * 14}%`, width: '1px', background: 'rgba(255,255,255,0.5)' }} />
        ))}
      </div>

      <div className="noise" />
    </section>
  )
}
