'use client'

import { Suspense, useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import dynamic from 'next/dynamic'

// Single dynamic import for the whole canvas — one chunk, not many
const Scene = dynamic(() => import('@/components/r3f/BrandStoryScene'), { ssr: false })

export default function BrandStorySection() {
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Only mount 3D canvas after user scrolls near it
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setMounted(true) },
      { rootMargin: '200px' }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-[#050505] flex items-center justify-center overflow-hidden border-t border-[#C9A84C]/10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-zinc-900/30 via-[#050505] to-black pointer-events-none" />

      <div className="relative z-20 w-full max-w-7xl mx-auto px-8 md:px-20 grid md:grid-cols-2 gap-16 items-center py-32">
        <div>
          <span className="text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase font-bold block mb-4">Our Story</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight leading-[1.1]">
            Precision Protection<br />
            <span className="text-[#C9A84C]">For Every Curve</span>
          </h2>
          <p className="text-white/60 text-sm md:text-base leading-relaxed font-light mb-8 max-w-md">
            Armour Warp is a premium car PPF studio focused on luxury car paint protection. Our Kevlar PPF delivers unmatched durability, extreme gloss, and an invisible shield against the harshest elements.
          </p>
          <div className="h-px w-20 bg-[#C9A84C] mb-8" />
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-3xl font-black text-white mb-1">5000<span className="text-[#C9A84C]">+</span></div>
              <div className="text-white/40 text-xs tracking-widest uppercase">Cars Protected</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white mb-1">10<span className="text-[#C9A84C]">+</span></div>
              <div className="text-white/40 text-xs tracking-widest uppercase">Years Experience</div>
            </div>
          </div>
        </div>

        <div className="w-full h-[400px] md:h-[600px]">
          {mounted && <Scene />}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
    </section>
  )
}
