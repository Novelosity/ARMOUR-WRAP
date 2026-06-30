'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    const dot = dotRef.current
    if (!bar) return

    ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress })
        if (dot) gsap.set(dot, { left: `${self.progress * 100}%` })
      },
    })
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[9997]" style={{ background: 'rgba(255,255,255,0.04)' }}>
      {/* Track fill */}
      <div
        ref={barRef}
        className="absolute inset-0 origin-left"
        style={{
          background: 'linear-gradient(90deg, #9A7B20, #D4AF37 40%, #00A3FF 70%, #00D4FF)',
          transform: 'scaleX(0)',
        }}
      />
      {/* Leading dot */}
      <div
        ref={dotRef}
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
        style={{
          background: '#00D4FF',
          boxShadow: '0 0 8px rgba(0,212,255,0.8)',
          left: '0%',
        }}
      />
    </div>
  )
}
