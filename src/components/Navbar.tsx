'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Protection', id: 'protection' },
  { label: 'Technology', id: 'technology' },
  { label: 'Services',   id: 'services'   },
  { label: 'Gallery',    id: 'gallery'    },
  { label: 'Contact',    id: 'contact'    },
]

export default function Navbar() {
  const navRef   = useRef<HTMLElement>(null)
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [activeId, setActiveId]   = useState<string | null>(null)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, delay: 3.4, ease: 'power3.out' }
    )

    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
    setActiveId(id)
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[990] transition-all duration-500 ${
          scrolled ? 'backdrop-blur-xl border-b' : ''
        }`}
        style={{
          opacity: 0,
          background: scrolled ? 'rgba(5,5,5,0.85)' : 'transparent',
          borderColor: scrolled ? 'rgba(255,255,255,0.06)' : 'transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <svg width="24" height="30" viewBox="0 0 24 30" fill="none"
                 className="group-hover:scale-110 transition-transform duration-300">
              <path
                d="M12 1L2 5V14C2 21 12 29 12 29C12 29 22 21 22 14V5L12 1Z"
                fill="rgba(212,175,55,0.1)"
                stroke="url(#navShield)"
                strokeWidth="1.2"
              />
              <text x="12" y="18" textAnchor="middle" fill="#D4AF37" fontSize="7" fontWeight="700">A</text>
              <defs>
                <linearGradient id="navShield" x1="12" y1="1" x2="12" y2="29" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#F0D060"/>
                  <stop offset="100%" stopColor="#9A7B20"/>
                </linearGradient>
              </defs>
            </svg>
            <div className="leading-none">
              <div className="flex items-baseline gap-1">
                <span className="text-white font-bold text-xs tracking-[0.25em]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>ARMOR</span>
                <span className="text-[#D4AF37] font-light text-xs tracking-[0.28em]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>WRAP</span>
              </div>
              <span className="text-[#00A3FF] text-[0.45rem] tracking-[0.5em] font-medium uppercase">STUDIO</span>
            </div>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`text-[0.6rem] tracking-[0.22em] uppercase transition-colors duration-200 cursor-pointer ${
                  activeId === id ? 'text-[#D4AF37]' : 'text-white/50 hover:text-white/90'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollTo('contact')}
              className="hidden md:flex items-center gap-2 text-[0.6rem] tracking-[0.22em] uppercase px-5 py-2.5 transition-all duration-200 cursor-pointer"
              style={{
                border: '1px solid rgba(212,175,55,0.4)',
                color: '#D4AF37',
                background: 'rgba(212,175,55,0.05)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = '#D4AF37'
                ;(e.currentTarget as HTMLElement).style.color = '#000'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(212,175,55,0.05)'
                ;(e.currentTarget as HTMLElement).style.color = '#D4AF37'
              }}
            >
              Book Now
            </button>

            {/* WhatsApp icon */}
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
              style={{ border: '1px solid rgba(37,211,102,0.4)', background: 'rgba(37,211,102,0.06)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.552 4.126 1.521 5.859L.057 23.214a.5.5 0 00.608.634l5.498-1.47A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.807 9.807 0 01-5.025-1.382l-.36-.215-3.726.996 1.008-3.626-.234-.373A9.834 9.834 0 012.182 12C2.182 6.565 6.565 2.182 12 2.182S21.818 6.565 21.818 12 17.435 21.818 12 21.818z"/>
              </svg>
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className={`w-5 h-px bg-[#D4AF37] transition-transform duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
              <span className={`w-5 h-px bg-[#D4AF37] transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-px bg-[#D4AF37] transition-transform duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[989] flex flex-col items-center justify-center md:hidden"
            style={{ background: 'rgba(5,5,5,0.97)', backdropFilter: 'blur(20px)' }}
          >
            {/* Close */}
            <button
              className="absolute top-5 right-6 text-white/40 text-2xl cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >✕</button>

            <div className="flex flex-col items-center gap-8">
              {NAV_LINKS.map(({ label, id }, i) => (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => scrollTo(id)}
                  className="text-2xl font-light tracking-[0.25em] uppercase cursor-pointer"
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    color: 'rgba(255,255,255,0.7)',
                  }}
                >
                  {label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                onClick={() => scrollTo('contact')}
                className="mt-4 px-10 py-3 text-sm tracking-[0.22em] uppercase cursor-pointer"
                style={{ border: '1px solid #D4AF37', color: '#D4AF37', background: 'rgba(212,175,55,0.07)' }}
              >
                Book Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
