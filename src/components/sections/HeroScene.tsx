'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: (i * 3.37) % 100,
  size: (i % 3) + 1,
  delay: (i * 0.2) % 6,
  duration: 6 + (i % 8),
  opacity: (i % 4) * 0.1 + 0.1,
}))

export default function HeroScene() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const imageRef   = useRef<HTMLDivElement>(null)
  const textRef    = useRef<HTMLDivElement>(null)
  const ctaRef     = useRef<HTMLDivElement>(null)
  const overRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const video   = videoRef.current
    const text    = textRef.current
    const cta     = ctaRef.current
    const image   = imageRef.current
    const over    = overRef.current
    if (!section) return

    /* ── Entrance animation ── */
    const tl = gsap.timeline({ delay: 3.2 })
    tl.fromTo(text,   { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' })
    tl.fromTo(cta,    { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.7')

    /* ── Scroll scrub ── */
    const setupScrub = () => {
      // quickSetters avoid per-frame property parsing overhead
      const setImgScale   = image ? gsap.quickSetter(image, 'scale') as (v: number) => void : null
      const setOverOp     = over  ? gsap.quickSetter(over, 'opacity') as (v: number) => void : null
      const setTextOp     = text  ? gsap.quickSetter(text, 'opacity') as (v: number) => void : null
      const setCtaOp      = cta   ? gsap.quickSetter(cta, 'opacity') as (v: number) => void : null
      const setTextY      = text  ? gsap.quickSetter(text, 'y') as (v: number) => void : null
      const setCtaY       = cta   ? gsap.quickSetter(cta, 'y') as (v: number) => void : null

      // smoothstep: removes the linear "snap" feel from progress curves
      const ss = (t: number) => t * t * (3 - 2 * t)
      const sp = (p: number, start: number, range: number) =>
        ss(Math.max(0, Math.min(1, (p - start) / range)))

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 1.4,
        onUpdate: (self) => {
          const p = self.progress

          // Scrub video
          if (video && !isNaN(video.duration)) {
            video.currentTime = video.duration * p
          }

          // Slow Ken Burns — eased so it starts soft
          setImgScale?.(1 + sp(p, 0, 1) * 0.14)

          // Text fades out with a smooth curve (not raw linear)
          const tFade = Math.max(0, 1 - ss(Math.min(1, p * 2.2)))
          setTextOp?.(tFade)
          setCtaOp?.(tFade)
          setTextY?.(-p * 60)
          setCtaY?.(-p * 60)

          // Overlay darkens
          setOverOp?.(sp(p, 0.3, 0.7) * 0.55)
        },
      })
    }

    if (video) {
      if (video.readyState >= 1) setupScrub()
      else video.addEventListener('loadedmetadata', setupScrub)
    } else {
      setupScrub()
    }

    return () => {
      video?.removeEventListener('loadedmetadata', setupScrub)
      ScrollTrigger.getAll().filter(st => st.trigger === section).forEach(st => st.kill())
    }
  }, [])

  const scrollToProtection = () => {
    document.getElementById('protection')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* Static hero image (shows if no video / while video loads) */}
      <div
        ref={imageRef}
        className="absolute inset-0 will-change-transform"
        style={{ transformOrigin: 'center center' }}
      >
        <img
          src="/images/new/Picture 1 — Hero Intro - Copy.png"
          alt="ArmorWrap Studio hero"
          className="w-full h-full object-cover"
          style={{ opacity: 0.75 }}
        />
      </div>

      {/* Video overlay */}
      <video
        ref={videoRef}
        src="/videos/armour-warp-hero.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.6, mixBlendMode: 'screen' }}
        muted
        playsInline
        preload="auto"
      />

      {/* Gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-transparent to-[#050505] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-transparent to-transparent pointer-events-none" />
      {/* Dark scroll overlay */}
      <div ref={overRef} className="absolute inset-0 bg-[#050505] opacity-0 pointer-events-none" />

      {/* Dust particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${p.x}%`,
              bottom: '-4px',
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animation: `particle-rise ${p.duration}s ${p.delay}s ease-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Vertical studio light beams */}
      {[20, 50, 80].map((x, i) => (
        <div
          key={i}
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            left: `${x}%`,
            width: '1px',
            background: `linear-gradient(180deg, transparent, rgba(0,163,255,${0.06 - i * 0.01}) 30%, transparent)`,
            opacity: 0.4,
          }}
        />
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-20">
        <div ref={textRef} className="opacity-0 max-w-5xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.4, duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-8" style={{ background: '#D4AF37' }} />
            <span className="label-gold">Kevlar PPF by ArmorWrap Studio</span>
          </motion.div>

          {/* Main headline */}
          <h1
            className="heading-hero text-white mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Ultimate
            <br />
            <span
              className="text-gold-gradient"
              style={{ display: 'block' }}
            >
              Protection.
            </span>
            <span
              className="text-blue-gradient"
              style={{ display: 'block', fontSize: 'clamp(2rem, 6vw, 5.5rem)' }}
            >
              Timeless
            </span>
            <span className="text-white" style={{ display: 'block', fontSize: 'clamp(2rem, 6vw, 5.5rem)' }}>
              Perfection.
            </span>
          </h1>

          <p
            className="text-[#D8D8D8] text-base md:text-lg max-w-xl leading-relaxed mt-4 font-light"
          >
            Invisible armor for modern vehicles —<br />
            <span className="text-[#00A3FF]">Kevlar PPF</span> engineered to protect, enhance, and preserve.
          </p>
        </div>

        {/* CTAs */}
        <div ref={ctaRef} className="opacity-0 flex flex-wrap gap-3 mt-8">
          <button
            onClick={scrollToProtection}
            className="flex items-center gap-2 px-7 py-3.5 text-[0.65rem] tracking-[0.2em] uppercase font-semibold transition-all duration-200 cursor-pointer"
            style={{ background: '#D4AF37', color: '#000', border: '1px solid #D4AF37' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F0D060' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#D4AF37' }}
          >
            <span>Book Your Protection</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3.5 text-[0.65rem] tracking-[0.2em] uppercase font-semibold transition-all duration-200 cursor-pointer"
            style={{ border: '1px solid rgba(255,255,255,0.18)', color: '#fff', background: 'rgba(255,255,255,0.04)' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,163,255,0.5)'
              ;(e.currentTarget as HTMLElement).style.color = '#00A3FF'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.18)'
              ;(e.currentTarget as HTMLElement).style.color = '#fff'
            }}
          >
            Explore Services
          </button>

          <a
            href="https://wa.me/923001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-7 py-3.5 text-[0.65rem] tracking-[0.2em] uppercase font-semibold transition-all duration-200"
            style={{ border: '1px solid rgba(37,211,102,0.4)', color: '#25D366', background: 'rgba(37,211,102,0.06)' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = '#25D366'
              ;(e.currentTarget as HTMLElement).style.color = '#fff'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(37,211,102,0.06)'
              ;(e.currentTarget as HTMLElement).style.color = '#25D366'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            </svg>
            WhatsApp Us
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="label-sm" style={{ fontSize: '0.5rem', letterSpacing: '0.35em' }}>Scroll</span>
        <div className="relative w-px h-12 overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <div className="absolute inset-0 animate-scan"
               style={{ background: 'linear-gradient(180deg,transparent,#D4AF37,#00A3FF,transparent)' }} />
        </div>
      </div>

      {/* Bottom section label */}
      <div className="absolute bottom-8 right-8 hidden md:block">
        <span className="label-sm" style={{ fontSize: '0.5rem' }}>01 / 10</span>
      </div>

      {/* Noise texture */}
      <div className="noise" />
    </section>
  )
}
