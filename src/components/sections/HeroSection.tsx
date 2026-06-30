'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    // Initial fade in for text
    const tl = gsap.timeline({ delay: 0.5 })
    tl.fromTo(titleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' })
    tl.fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.8')
    tl.fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.6')

    let st: ScrollTrigger

    const setupScrollScrub = () => {
      // Create scroll trigger that pins the section and scrubs video
      st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=200%', // Scroll for 2 screen heights while pinned
        pin: true,
        scrub: 1, // Smooth scrubbing
        onUpdate: (self) => {
          if (!video || isNaN(video.duration)) return
          
          // Scrub video based on scroll progress
          video.currentTime = video.duration * self.progress

          // Fade out text gradually as video progresses
          const textOpacity = Math.max(0, 1 - self.progress * 3)
          gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
            opacity: textOpacity,
            y: -self.progress * 100
          })
        }
      })
    }

    // Wait for video metadata to know the duration before setting up scrub
    if (video.readyState >= 1) {
      setupScrollScrub()
    } else {
      video.addEventListener('loadedmetadata', setupScrollScrub)
    }

    return () => {
      video.removeEventListener('loadedmetadata', setupScrollScrub)
      st?.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} id="hero" className="relative w-full h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <video
        ref={videoRef}
        src="/videos/armour-warp-hero.mp4"
        className="absolute inset-0 w-full h-full object-cover opacity-70 z-0 mix-blend-screen"
        muted
        playsInline
        preload="auto"
      />
      
      {/* Gradients for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#050505] z-0 pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-start justify-center text-left px-8 md:px-20 z-10">
        <div ref={titleRef} className="opacity-0 max-w-4xl pt-20">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white mb-2 filter drop-shadow-lg uppercase">
            Ultimate<br />Protection.
          </h1>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none text-[#C9A84C] mb-6 filter drop-shadow-lg uppercase">
            Armour Warp PPF
          </h2>
        </div>

        <p ref={subtitleRef} className="text-base md:text-lg tracking-widest text-white/90 max-w-lg opacity-0 leading-relaxed font-light mb-10 filter drop-shadow-md">
          Engineered for Strength.<br />Designed for Perfection.
        </p>

        <div ref={ctaRef} className="opacity-0 flex flex-wrap gap-4">
          <button onClick={() => document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 border border-[#C9A84C] bg-[#C9A84C]/10 text-[#C9A84C] text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#C9A84C] hover:text-black transition-colors duration-300">
            Explore PPF Protection
          </button>
          <button className="px-8 py-4 border border-white/20 bg-white/5 text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors duration-300">
            Book Appointment
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-12 flex flex-col items-center gap-2 opacity-60">
          <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#C9A84C] to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  )
}
