'use client'

import { useRef, MouseEvent } from 'react'
import { motion } from 'framer-motion'

type Variant = 'gold' | 'blue' | 'ghost' | 'whatsapp'

interface ButtonProps {
  children: React.ReactNode
  variant?: Variant
  href?: string
  onClick?: () => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const variants: Record<Variant, string> = {
  gold:      'bg-[#D4AF37] text-black hover:bg-[#F0D060] border border-[#D4AF37]',
  blue:      'bg-[#00A3FF] text-white hover:bg-[#00C4FF] border border-[#00A3FF]',
  ghost:     'bg-transparent text-white border border-[rgba(255,255,255,0.18)] hover:border-[#D4AF37] hover:text-[#D4AF37]',
  whatsapp:  'bg-[#25D366] text-white hover:bg-[#22c55e] border border-[#25D366]',
}

const sizes = {
  sm:  'px-5 py-2.5 text-[0.6rem] tracking-[0.2em]',
  md:  'px-8 py-3.5 text-[0.65rem] tracking-[0.2em]',
  lg:  'px-10 py-4.5 text-[0.7rem] tracking-[0.22em]',
}

export default function Button({
  children,
  variant = 'gold',
  href,
  onClick,
  className = '',
  size = 'md',
}: ButtonProps) {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const el = btnRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`
  }

  const handleMouseLeave = () => {
    const el = btnRef.current
    if (!el) return
    el.style.transform = 'translate(0,0)'
    el.style.transition = 'transform 0.4s cubic-bezier(0.23,1,0.32,1)'
  }

  const baseClass = `
    relative inline-flex items-center justify-center gap-2 uppercase font-semibold
    transition-all duration-200 cursor-pointer select-none overflow-hidden
    ${variants[variant]} ${sizes[size]} ${className}
  `

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {/* Shimmer sweep on hover */}
      <motion.span
        className="absolute inset-0 pointer-events-none"
        initial={{ x: '-100%', opacity: 0 }}
        whileHover={{ x: '100%', opacity: 0.12 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
        }}
      />
    </>
  )

  if (href) {
    return (
      <motion.a
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={baseClass}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.97 }}
      >
        {inner}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={baseClass}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
    >
      {inner}
    </motion.button>
  )
}
