'use client'

import { useRef, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('@/components/r3f/CinematicScene'), { ssr: false })

export default function Cinematic3DSection() {
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setMounted(true) },
      { rootMargin: '200px' }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full h-[80vh] bg-black overflow-hidden border-y border-[#C9A84C]/10">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent z-10" />

      <div className="absolute inset-0 z-0">
        {mounted && <Scene />}
      </div>

      <div className="absolute inset-0 flex items-end justify-center pb-16 z-10 pointer-events-none">
        <div className="text-center">
          <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase font-bold">The Armour Warp Standard</p>
          <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight mt-2">
            Film That Flows<br />Protection That Stays
          </h3>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black via-transparent to-black z-10 opacity-80" />
    </section>
  )
}
