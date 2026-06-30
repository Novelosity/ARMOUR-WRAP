'use client'

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'

interface TrustBadgeProps {
  index: number
  label: string
  sublabel: string
  icon: React.ReactNode
}

export default function TrustBadge({ index, label, sublabel, icon }: TrustBadgeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 180, damping: 22 })
  const springY = useSpring(rotateY, { stiffness: 180, damping: 22 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    rotateY.set(((e.clientX - rect.left - rect.width / 2) / rect.width) * 25)
    rotateX.set(-((e.clientY - rect.top - rect.height / 2) / rect.height) * 25)
  }
  const handleMouseLeave = () => { rotateX.set(0); rotateY.set(0) }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 700,
        transformStyle: 'preserve-3d',
      }}
      className="group relative flex flex-col items-center text-center cursor-default select-none"
    >
      {/* Shield shape */}
      <div
        className="relative w-24 h-28 flex items-center justify-center mb-4"
        style={{ filter: 'drop-shadow(0 0 20px rgba(212,175,55,0.3))' }}
      >
        {/* SVG Shield */}
        <svg viewBox="0 0 96 112" fill="none" className="absolute inset-0 w-full h-full">
          <path
            d="M48 4L8 18V54C8 76 48 108 48 108C48 108 88 76 88 54V18L48 4Z"
            fill="url(#shieldFill)"
            stroke="url(#shieldStroke)"
            strokeWidth="1.5"
          />
          <defs>
            <linearGradient id="shieldFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(212,175,55,0.12)" />
              <stop offset="100%" stopColor="rgba(212,175,55,0.04)" />
            </linearGradient>
            <linearGradient id="shieldStroke" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.25" />
            </linearGradient>
          </defs>
        </svg>

        {/* Inner glow ring */}
        <div
          className="absolute inset-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%)' }}
        />

        {/* Icon */}
        <div
          className="relative z-10 w-10 h-10 flex items-center justify-center"
          style={{ transform: 'translateZ(16px)' }}
        >
          {icon}
        </div>
      </div>

      {/* Text */}
      <div style={{ transform: 'translateZ(10px)' }}>
        <p
          className="text-white font-semibold text-sm mb-0.5 leading-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {label}
        </p>
        <p className="label-sm">{sublabel}</p>
      </div>

      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ boxShadow: '0 0 30px rgba(212,175,55,0.2)' }}
      />
    </motion.div>
  )
}
