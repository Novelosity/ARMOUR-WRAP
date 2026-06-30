'use client'

import { useState, useEffect, useRef } from 'react'

/* ── Global UI ────────────────────────────────────────── */
import LoadingScreen  from '@/components/LoadingScreen'
import Navbar         from '@/components/Navbar'
import ScrollProgress from '@/components/ScrollProgress'
import CustomCursor   from '@/components/CustomCursor'

/* ── Cinematic story sections ─────────────────────────── */
import HeroScene           from '@/components/sections/HeroScene'
import ExplodedLayersScene from '@/components/sections/ExplodedLayersScene'
import LayerFusionScene    from '@/components/sections/LayerFusionScene'
import CarArrivalScene     from '@/components/sections/CarArrivalScene'
import PPFApplicationScene from '@/components/sections/PPFApplicationScene'
import FinishedRevealScene from '@/components/sections/FinishedRevealScene'
import ServicesSection     from '@/components/sections/ServicesSection'
import BeforeAfterSection  from '@/components/sections/BeforeAfterSection'
import TrustBadgesSection  from '@/components/sections/TrustBadgesSection'
import FinalCTASection     from '@/components/sections/FinalCTASection'
import Footer              from '@/components/sections/Footer'

export default function Home() {
  const [loaded, setLoaded]       = useState(false)
  const [isMobile, setIsMobile]   = useState(false)
  const [prefersReduced, setPrefersReduced] = useState(false)
  const lenisRef = useRef<any>(null)

  /* ── Device detection + reduced motion ─────────────── */
  useEffect(() => {
    const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
                   window.matchMedia('(max-width: 768px)').matches
    setIsMobile(mobile)
    setPrefersReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  /* ── Lenis smooth scroll — init after loading ──────── */
  useEffect(() => {
    if (!loaded) return

    let lenis: any = null

    const initLenis = async () => {
      try {
        const Lenis = (await import('lenis')).default
        lenis = new Lenis({
          duration:    1.2,
          easing:      (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
          touchMultiplier: 1.5,
        })
        lenisRef.current = lenis

        // Integrate with GSAP ScrollTrigger
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        lenis.on('scroll', ScrollTrigger.update)

        const raf = (time: number) => {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
      } catch (e) {
        // Lenis unavailable — native scroll fallback
      }
    }

    initLenis()

    return () => {
      lenis?.destroy()
    }
  }, [loaded])

  return (
    <>
      {/* Loading screen */}
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {/* Site shell — invisible until loaded */}
      <div
        className="transition-opacity duration-700"
        style={{ opacity: loaded ? 1 : 0, pointerEvents: loaded ? 'auto' : 'none' }}
      >
        {/* ── Global persistent UI ── */}
        {!isMobile && !prefersReduced && <CustomCursor />}
        <ScrollProgress />
        <Navbar />

        {/* ── Main cinematic story ── */}
        <main style={{ background: '#050505' }}>

          {/* 01 — Cinematic hero with scroll-scrubbed video */}
          <HeroScene />

          {/* 02 — PPF exploded 5-layer view */}
          <ExplodedLayersScene />

          {/* 03 — Layers fuse into one shield */}
          <LayerFusionScene />

          {/* 04 — Luxury car arrives */}
          <CarArrivalScene />

          {/* 05 — PPF application with timeline */}
          <PPFApplicationScene />

          {/* 06 — Finished protected reveal */}
          <FinishedRevealScene />

          {/* 07 — 6 premium service cards */}
          <ServicesSection />

          {/* 08 — Before / after comparison */}
          <BeforeAfterSection />

          {/* 09 — Trust badges + stat counters */}
          <TrustBadgesSection />

          {/* 10 — Final booking CTA */}
          <FinalCTASection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}
