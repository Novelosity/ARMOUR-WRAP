'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { motion } from 'framer-motion'

import Image from 'next/image'

const STEPS = [
  {
    number: '1',
    title: 'SURFACE PREPARATION',
    desc: 'Deep cleaning and decontamination for a perfect base.',
    img: '/images/06_process_surface_prep_car.png',
  },
  {
    number: '2',
    title: 'PRECUT & FITMENT',
    desc: 'Precision cut Kevlar PPF for exact fit and seamless coverage.',
    img: '/images/07_process_precut_fitment_car.png',
  },
  {
    number: '3',
    title: 'APPLICATION',
    desc: 'Expert installation ensures bubble-free and flawless results.',
    img: '/images/08_process_application_car.png',
  },
  {
    number: '4',
    title: 'CURING & FINISHING',
    desc: 'The film sets and we inspect every detail to perfection.',
    img: '/images/09_process_finished_car.png',
  },
]

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Animate vertical line
    gsap.fromTo(lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1, duration: 1.5, ease: 'power2.inOut',
        scrollTrigger: { trigger: section, start: 'top 60%', end: 'bottom 80%', scrub: 1 },
      }
    )

    // Animate panels
    section.querySelectorAll('[data-step]').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%' },
        }
      )
    })
  }, [])

  return (
    <section ref={sectionRef} id="process" className="relative bg-[#000000] py-32 border-b border-[#C9A84C]/10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <span className="text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase font-bold block mb-4">
            Our Process
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            Precision In Every Layer
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-[#C9A84C]/10">
            <div
              ref={lineRef}
              className="absolute inset-0 origin-top"
              style={{ background: 'linear-gradient(to bottom, #C9A84C, transparent)', transform: 'scaleY(0)' }}
            />
          </div>

          <div className="space-y-24 pl-12 md:pl-0">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                data-step
                className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                style={{ opacity: 0 }}
              >
                {/* Content */}
                <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full border border-[#C9A84C] text-[#C9A84C] font-bold text-sm mb-4 ${i % 2 === 0 ? 'md:hidden' : 'hidden'}`}>
                    {step.number}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-widest uppercase">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>

                {/* Timeline dot (Desktop) */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-[#C9A84C] bg-black items-center justify-center z-10">
                  <span className="text-[#C9A84C] text-xs font-bold">{step.number}</span>
                </div>

                {/* Step Image */}
                <div className="w-full md:w-1/2 relative group">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative aspect-[4/3] w-full rounded-lg overflow-hidden border border-white/5"
                  >
                    <Image
                      src={step.img}
                      alt={step.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
