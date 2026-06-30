'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { motion } from 'framer-motion'

const STEPS = [
  { label: 'Surface Prep',     detail: 'Decontamination wash, clay bar, IPA wipe-down.' },
  { label: 'Pre-cut Film',     detail: 'Custom-cut Kevlar PPF panels for your exact vehicle.' },
  { label: 'Apply & Align',    detail: 'Precision application with slip solution and squeegee.' },
  { label: 'Smooth & Secure',  detail: 'Heat gun contouring on edges, seams tucked.' },
  { label: 'Final Inspection', detail: 'Multi-light inspection for zero bubbles or lifting.' },
]

export default function PPFApplicationScene() {
  const sectionRef  = useRef<HTMLElement>(null)
  const imgRef      = useRef<HTMLDivElement>(null)
  const filmRef     = useRef<HTMLDivElement>(null)
  const titleRef    = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(-1)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ss = (t: number) => t * t * (3 - 2 * t)
    const sp = (p: number, start: number, range: number) =>
      ss(Math.max(0, Math.min(1, (p - start) / range)))

    // Track previous step to avoid unnecessary React re-renders every frame
    let prevStep = -1

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=280%',
      pin: true,
      scrub: 1.8,
      onUpdate: (self) => {
        const p = self.progress

        if (imgRef.current) {
          gsap.set(imgRef.current, {
            opacity: sp(p, 0, 0.4),
            scale: 1.1 - sp(p, 0, 1) * 0.1,
          })
        }

        if (filmRef.current) {
          const filmP = sp(p, 0.15, 0.42)
          gsap.set(filmRef.current, {
            opacity: filmP * 0.5,
            clipPath: `inset(${Math.max(0, (1 - filmP) * 100)}% 0 0 0)`,
          })
        }

        const titleP = sp(p, 0.05, 0.18)
        if (titleRef.current) gsap.set(titleRef.current, { opacity: titleP, y: (1 - titleP) * 30 })

        const stepProgress = Math.max(0, (p - 0.35) / 0.6)
        const nextStep = Math.min(Math.floor(stepProgress * STEPS.length), STEPS.length - 1)
        if (nextStep !== prevStep) {
          prevStep = nextStep
          setActiveStep(nextStep)
        }

        const tlP = sp(p, 0.3, 0.18)
        if (timelineRef.current) gsap.set(timelineRef.current, { opacity: tlP, x: (1 - tlP) * -30 })
      },
    })

    return () => { st.kill() }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="protection"
      className="relative w-full h-screen flex items-center justify-start overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* Background car image */}
      <div
        ref={imgRef}
        className="absolute inset-0 will-change-transform opacity-0"
        style={{ transformOrigin: 'center center' }}
      >
        <img
          src="/images/new/picture 5 png - Copy.png"
          alt="PPF film being applied to luxury car"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505]" />
      </div>

      {/* PPF transparent film overlay */}
      <div
        ref={filmRef}
        className="absolute inset-0 pointer-events-none will-change-transform opacity-0"
        style={{
          background: 'linear-gradient(135deg, rgba(0,163,255,0.06) 0%, rgba(255,255,255,0.04) 50%, rgba(0,163,255,0.06) 100%)',
          clipPath: 'inset(100% 0 0 0)',
        }}
      />

      {/* Blue edge trace lines — simulate PPF wrap edge */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[15, 35, 65, 85].map((x, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0"
            style={{
              left: `${x}%`,
              width: '1px',
              background: 'linear-gradient(180deg, transparent, rgba(0,163,255,0.4) 40%, rgba(0,163,255,0.2) 60%, transparent)',
              animation: `scan ${2.5 + i * 0.3}s ${i * 0.5}s linear infinite`,
            }}
          />
        ))}
      </div>

      {/* Content left panel */}
      <div className="relative z-10 pl-8 md:pl-16 lg:pl-24 pr-8 max-w-lg">
        {/* Title */}
        <div ref={titleRef} className="opacity-0 mb-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: '#00A3FF' }} />
            <span className="label-blue">Section 05 — Application</span>
          </div>
          <h2
            className="heading-xl text-white"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Invisible armor.
            <br />
            <span className="text-blue-gradient">Precision applied.</span>
          </h2>
          <p className="text-[#D8D8D8] text-sm mt-4 leading-relaxed opacity-80 max-w-xs">
            Our certified technicians apply Kevlar PPF panel by panel — hood, bumper, fenders, mirrors, doors.
          </p>
        </div>

        {/* Process timeline */}
        <div ref={timelineRef} className="opacity-0 space-y-2">
          {STEPS.map((step, i) => (
            <div
              key={step.label}
              className="flex items-start gap-4 p-3 transition-[background,border-color] duration-500"
              style={{
                background: activeStep >= i ? 'rgba(0,163,255,0.06)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${activeStep >= i ? 'rgba(0,163,255,0.3)' : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              {/* Step number / check */}
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300"
                style={{
                  background: activeStep >= i ? '#00A3FF' : 'rgba(255,255,255,0.08)',
                  border: `1px solid ${activeStep >= i ? '#00A3FF' : 'rgba(255,255,255,0.15)'}`,
                }}
              >
                {activeStep > i ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <span style={{ fontSize: '0.55rem', color: activeStep >= i ? '#fff' : 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
                    {i + 1}
                  </span>
                )}
              </div>

              <div>
                <p
                  className="text-sm font-medium transition-colors duration-300"
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    color: activeStep >= i ? '#fff' : 'rgba(255,255,255,0.45)',
                  }}
                >
                  {step.label}
                </p>
                {activeStep === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-xs mt-1 leading-relaxed"
                    style={{ color: 'rgba(0,163,255,0.8)' }}
                  >
                    {step.detail}
                  </motion.p>
                )}
              </div>

              {/* Active indicator */}
              {activeStep === i && (
                <div className="ml-auto flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00A3FF]"
                       style={{ animation: 'pulse-blue 1s ease-in-out infinite' }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Film meter */}
        <div className="mt-6 opacity-40">
          <div className="flex justify-between mb-1">
            <span className="label-sm" style={{ fontSize: '0.5rem' }}>Film Coverage</span>
            <span className="label-blue" style={{ fontSize: '0.5rem' }}>
              {activeStep >= 0 ? Math.round(((activeStep + 1) / STEPS.length) * 100) : 0}%
            </span>
          </div>
          <div className="h-px" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <div
              className="h-full origin-left transition-transform duration-500"
              style={{
                background: 'linear-gradient(90deg, #0066CC, #00A3FF)',
                transform: `scaleX(${activeStep >= 0 ? (activeStep + 1) / STEPS.length : 0})`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8">
        <span className="label-sm" style={{ fontSize: '0.5rem' }}>05 / 10</span>
      </div>

      <div className="noise" />
    </section>
  )
}
