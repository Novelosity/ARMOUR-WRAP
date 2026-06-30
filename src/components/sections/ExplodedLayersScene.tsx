'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const LAYERS = [
  {
    id: 'top-coat',
    label: '01',
    name: 'Protective Top Coat',
    detail: 'Hydrophobic & UV-resistant outer surface. Repels water, dust, and oxidation.',
    color: 'rgba(0,163,255,0.18)',
    borderColor: 'rgba(0,163,255,0.5)',
    glowColor: 'rgba(0,163,255,0.4)',
    offsetY: -180,
  },
  {
    id: 'self-healing',
    label: '02',
    name: 'Self-Healing Layer',
    detail: 'Elastomeric polymer that fills light scratches using ambient heat.',
    color: 'rgba(0,163,255,0.12)',
    borderColor: 'rgba(0,163,255,0.4)',
    glowColor: 'rgba(0,163,255,0.3)',
    offsetY: -90,
  },
  {
    id: 'tpu-film',
    label: '03',
    name: 'TPU Film Core',
    detail: 'Thermoplastic polyurethane — flexible, crystal clear, impact absorbent.',
    color: 'rgba(212,175,55,0.08)',
    borderColor: 'rgba(212,175,55,0.45)',
    glowColor: 'rgba(212,175,55,0.3)',
    offsetY: 0,
  },
  {
    id: 'adhesive',
    label: '04',
    name: 'Adhesive Layer',
    detail: 'Pressure-sensitive acrylic adhesive for bubble-free, residue-free bonding.',
    color: 'rgba(0,163,255,0.12)',
    borderColor: 'rgba(0,163,255,0.4)',
    glowColor: 'rgba(0,163,255,0.3)',
    offsetY: 90,
  },
  {
    id: 'liner',
    label: '05',
    name: 'Release Liner',
    detail: 'Protective backing removed during professional installation.',
    color: 'rgba(255,255,255,0.05)',
    borderColor: 'rgba(255,255,255,0.2)',
    glowColor: 'rgba(255,255,255,0.15)',
    offsetY: 180,
  },
]

export default function ExplodedLayersScene() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)
  const layersRef  = useRef<(HTMLDivElement | null)[]>([])
  const isInView   = useInView(sectionRef, { once: false, margin: '-10%' })

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ss = (t: number) => t * t * (3 - 2 * t)
    const sp = (p: number, start: number, range: number) =>
      ss(Math.max(0, Math.min(1, (p - start) / range)))

    // Set initial off-screen positions before scroll starts
    layersRef.current.forEach((el, i) => {
      if (!el) return
      gsap.set(el, { y: LAYERS[i].offsetY * 2.5, opacity: 0, rotateX: -18 })
    })
    if (titleRef.current) gsap.set(titleRef.current, { opacity: 0, y: 30 })

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=320%',
      pin: true,
      scrub: 1.4,
      onUpdate: (self) => {
        const p = self.progress

        LAYERS.forEach((layer, i) => {
          const el = layersRef.current[i]
          if (!el) return
          const lp = sp(p, i * 0.16, 0.18)
          const finalY = layer.offsetY
          const startY = finalY * 2.5
          // Single gsap.set call per element — no transform conflicts
          gsap.set(el, {
            y:       startY + (finalY - startY) * lp,
            opacity: lp,
            rotateX: (1 - lp) * -18,
          })
        })

        const tp = sp(p, 0, 0.12)
        if (titleRef.current) gsap.set(titleRef.current, { opacity: tp, y: (1 - tp) * 30 })
      },
    })

    return () => { st.kill() }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="technology"
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #0B0D10 100%)' }}
    >
      {/* Background image hint */}
      <div className="absolute inset-0">
        <img
          src="/images/new/Picture 2 — PPF Exploded View - Copy.png"
          alt=""
          className="w-full h-full object-cover opacity-8"
          style={{ opacity: 0.06 }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </div>

      {/* Radial blue glow at center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,163,255,0.06) 0%, transparent 70%)' }}
      />

      {/* Corner brackets */}
      {[
        'top-8 left-8', 'top-8 right-8', 'bottom-8 left-8', 'bottom-8 right-8'
      ].map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-10 h-10 opacity-20 pointer-events-none`}>
          <div className={`absolute ${i < 2 ? 'top-0' : 'bottom-0'} ${i % 2 === 0 ? 'left-0' : 'right-0'} w-4 h-px bg-[#00A3FF]`} />
          <div className={`absolute ${i < 2 ? 'top-0' : 'bottom-0'} ${i % 2 === 0 ? 'left-0' : 'right-0'} w-px h-4 bg-[#00A3FF]`} />
        </div>
      ))}

      {/* Title */}
      <div ref={titleRef} className="absolute top-16 left-0 right-0 text-center opacity-0 z-20 px-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px flex-1 max-w-20" style={{ background: 'linear-gradient(90deg,transparent,#00A3FF)' }} />
          <span className="label-blue">Multi-Layer Engineering</span>
          <div className="h-px flex-1 max-w-20" style={{ background: 'linear-gradient(90deg,#00A3FF,transparent)' }} />
        </div>
        <h2
          className="heading-xl text-white"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Multi-layer engineering.
          <br />
          <span className="text-blue-gradient">One invisible shield.</span>
        </h2>
      </div>

      {/* 3D Exploded Layer stack */}
      <div
        className="relative flex flex-col items-center"
        style={{ perspective: '1200px', perspectiveOrigin: '50% 50%', transformStyle: 'preserve-3d' }}
      >
        {LAYERS.map((layer, i) => (
          <div
            key={layer.id}
            ref={el => { layersRef.current[i] = el }}
            className="absolute flex items-center gap-6 md:gap-10 will-change-transform"
            style={{
              opacity: 0,
              width: 'min(640px, 90vw)',
              y: layer.offsetY * 2.5,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Layer panel */}
            <div
              className="relative flex-1 h-14 md:h-16 flex items-center px-5 gap-4 overflow-hidden"
              style={{
                background: layer.color,
                border: `1px solid ${layer.borderColor}`,
                boxShadow: `0 0 24px ${layer.glowColor}, inset 0 0 16px rgba(0,0,0,0.3)`,
                backdropFilter: 'blur(16px)',
              }}
            >
              {/* Shimmer sweep */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
                  animation: `shimmer 3s ${i * 0.4}s linear infinite`,
                  backgroundSize: '200% 100%',
                }}
              />
              {/* Left glow dot */}
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: layer.borderColor, boxShadow: `0 0 8px ${layer.glowColor}` }} />
              <span className="label-sm flex-shrink-0">{layer.label}</span>
              <p className="text-white font-medium text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {layer.name}
              </p>
            </div>

            {/* Side detail card (right side, desktop) */}
            <div
              className="hidden md:block w-44 text-xs leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              {layer.detail}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-10 left-0 right-0 text-center">
        <p className="label-sm" style={{ fontSize: '0.55rem' }}>02 / 10 — Scroll to see layers converge</p>
      </div>

      <div className="noise" />
    </section>
  )
}
