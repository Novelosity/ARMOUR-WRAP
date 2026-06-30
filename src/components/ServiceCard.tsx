'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

interface Feature { label: string }

interface ServiceCardProps {
  index: number
  title: string
  subtitle: string
  copy: string
  features: string[]
  imageSrc: string
  icon: React.ReactNode
}

export default function ServiceCard({
  index,
  title,
  subtitle,
  copy,
  features,
  imageSrc,
  icon,
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 150, damping: 20 })
  const springY = useSpring(rotateY, { stiffness: 150, damping: 20 })

  const glowX = useTransform(springY, [-20, 20], ['0%', '100%'])
  const glowY = useTransform(springX, [-20, 20], ['0%', '100%'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    rotateY.set(((e.clientX - cx) / rect.width) * 22)
    rotateX.set(-((e.clientY - cy) / rect.height) * 22)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 900,
        transformStyle: 'preserve-3d',
      }}
      className="relative group cursor-pointer select-none"
    >
      {/* Dynamic glow spot */}
      <motion.div
        className="absolute -inset-px rounded-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(0,163,255,0.22) 0%, transparent 65%)`,
        }}
      />

      <div
        className="relative h-full overflow-hidden rounded-sm"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          transition: 'border-color 0.3s',
        }}
      >
        {/* Image top */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
          {/* Blue edge gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]" />
          {/* Blue left accent */}
          <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#00A3FF] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Icon badge */}
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
               style={{ background: 'rgba(0,163,255,0.15)', border: '1px solid rgba(0,163,255,0.4)' }}>
            {icon}
          </div>

          {/* Index tag */}
          <div className="absolute top-3 left-3">
            <span className="label-blue">0{index + 1}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5" style={{ transform: 'translateZ(20px)' }}>
          {/* Gold accent line */}
          <div className="w-6 h-px mb-3" style={{ background: 'linear-gradient(90deg,#D4AF37,transparent)' }} />

          <p className="label-gold mb-1">{subtitle}</p>
          <h3 className="text-white font-display font-semibold text-lg mb-2 leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}>
            {title}
          </h3>
          <p className="text-[#D8D8D8] text-xs leading-relaxed mb-4 opacity-80">{copy}</p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-1.5">
            {features.map((f) => (
              <span
                key={f}
                className="text-[0.55rem] tracking-[0.15em] uppercase px-2 py-1"
                style={{
                  background: 'rgba(212,175,55,0.07)',
                  border: '1px solid rgba(212,175,55,0.25)',
                  color: 'rgba(212,175,55,0.85)',
                }}
              >
                {f}
              </span>
            ))}
          </div>

          {/* Hover CTA */}
          <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg,#00A3FF,transparent)' }} />
            <span className="label-blue">Learn More</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="#00A3FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Bottom border glow on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
             style={{ background: 'linear-gradient(90deg,transparent,#00A3FF,transparent)' }} />
      </div>
    </motion.div>
  )
}
