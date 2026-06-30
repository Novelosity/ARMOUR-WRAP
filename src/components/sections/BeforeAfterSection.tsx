'use client'

import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

const BEFORE_TAGS = ['Dust & Grime', 'Swirl Marks', 'Oxidation', 'Water Spots', 'UV Damage', 'Scratches']
const AFTER_TAGS  = ['Crystal Clear', 'Self-Healed', 'UV Protected', 'Water Beading', 'Deep Gloss', 'Flawless']

export default function BeforeAfterSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [sliderX, setSliderX] = useState(50)
  const [dragging, setDragging] = useState(false)

  const updateSlider = useCallback((clientX: number) => {
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    setSliderX(x * 100)
  }, [])

  const onMouseDown = () => setDragging(true)
  const onMouseMove = (e: React.MouseEvent) => { if (dragging) updateSlider(e.clientX) }
  const onMouseUp   = () => setDragging(false)
  const onTouchMove = (e: React.TouchEvent) => updateSlider(e.touches[0].clientX)

  return (
    <section
      id="gallery"
      className="relative w-full py-24 md:py-32"
      style={{ background: '#0B0D10' }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="text-center mb-14 px-6"
      >
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-16" style={{ background: 'linear-gradient(90deg,transparent,#00A3FF)' }} />
          <span className="label-blue">Section 08 — Transformation</span>
          <div className="h-px w-16" style={{ background: 'linear-gradient(90deg,#00A3FF,transparent)' }} />
        </div>
        <h2
          className="heading-xl text-white mb-4"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          From daily wear
          <br />
          <span className="text-blue-gradient">to showroom finish.</span>
        </h2>
        <p className="text-[#D8D8D8] text-sm max-w-md mx-auto leading-relaxed opacity-75">
          Drag the slider to reveal the ArmorWrap transformation — before and after Kevlar PPF installation.
        </p>
      </motion.div>

      {/* Comparison slider */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-5xl mx-auto px-6"
      >
        <div
          ref={containerRef}
          className="relative overflow-hidden select-none"
          style={{
            aspectRatio: '16/9',
            cursor: dragging ? 'grabbing' : 'grab',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={() => setDragging(true)}
          onTouchMove={onTouchMove}
          onTouchEnd={() => setDragging(false)}
        >
          {/* AFTER (right) - full width base */}
          <div className="absolute inset-0">
            <img
              src="/images/new/Picture 6 — Finished Product - Copy.png"
              alt="After ArmorWrap PPF"
              className="w-full h-full object-cover"
              draggable={false}
              loading="lazy"
            />
            {/* After overlay — clean, deep gloss */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(0,163,255,0.06),transparent)' }} />
          </div>

          {/* BEFORE (left) - clipped */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - sliderX}% 0 0)` }}
          >
            <img
              src="/images/new/Picture 1 — Hero Intro - Copy.png"
              alt="Before ArmorWrap PPF"
              className="w-full h-full object-cover"
              draggable={false}
              loading="lazy"
              style={{ filter: 'saturate(0.6) brightness(0.85) contrast(1.05)' }}
            />
            {/* Before overlay — dull effect */}
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(180,130,60,0.06)', mixBlendMode: 'multiply' }}
            />
          </div>

          {/* Slider divider line */}
          <div
            className="absolute top-0 bottom-0 w-px pointer-events-none"
            style={{
              left: `${sliderX}%`,
              background: 'linear-gradient(180deg, transparent, #00A3FF 20%, #00A3FF 80%, transparent)',
              boxShadow: '0 0 12px rgba(0,163,255,0.6)',
            }}
          />

          {/* Slider handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center"
            style={{
              left: `${sliderX}%`,
              width: 44,
              height: 44,
              background: 'rgba(5,5,5,0.9)',
              border: '1px solid #00A3FF',
              borderRadius: '50%',
              boxShadow: '0 0 20px rgba(0,163,255,0.5)',
              cursor: 'grab',
            }}
          >
            {/* Arrows */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M6 5l-4 4 4 4M12 5l4 4-4 4" stroke="#00A3FF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* BEFORE label */}
          <div
            className="absolute top-4 left-4 px-3 py-1.5"
            style={{
              background: 'rgba(5,5,5,0.8)',
              border: '1px solid rgba(255,255,255,0.12)',
              opacity: sliderX > 10 ? 1 : 0,
              transition: 'opacity 0.2s',
            }}
          >
            <span className="label-sm" style={{ fontSize: '0.55rem', color: 'rgba(255,150,50,0.9)' }}>BEFORE</span>
          </div>

          {/* AFTER label */}
          <div
            className="absolute top-4 right-4 px-3 py-1.5"
            style={{
              background: 'rgba(5,5,5,0.8)',
              border: '1px solid rgba(0,163,255,0.3)',
              opacity: sliderX < 90 ? 1 : 0,
              transition: 'opacity 0.2s',
            }}
          >
            <span className="label-blue" style={{ fontSize: '0.55rem' }}>AFTER</span>
          </div>
        </div>

        {/* Tag rows */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          {/* Before tags */}
          <div>
            <p className="label-sm mb-2" style={{ fontSize: '0.5rem', color: 'rgba(255,150,50,0.7)' }}>Before</p>
            <div className="flex flex-wrap gap-1.5">
              {BEFORE_TAGS.map(tag => (
                <span
                  key={tag}
                  className="text-[0.52rem] tracking-[0.12em] uppercase px-2 py-1"
                  style={{ background: 'rgba(255,100,50,0.06)', border: '1px solid rgba(255,100,50,0.2)', color: 'rgba(255,150,100,0.7)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {/* After tags */}
          <div>
            <p className="label-blue mb-2" style={{ fontSize: '0.5rem' }}>After</p>
            <div className="flex flex-wrap gap-1.5">
              {AFTER_TAGS.map(tag => (
                <span
                  key={tag}
                  className="text-[0.52rem] tracking-[0.12em] uppercase px-2 py-1"
                  style={{ background: 'rgba(0,163,255,0.06)', border: '1px solid rgba(0,163,255,0.22)', color: 'rgba(0,163,255,0.8)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-6 right-8">
        <span className="label-sm" style={{ fontSize: '0.5rem' }}>08 / 10</span>
      </div>
      <div className="noise" />
    </section>
  )
}
