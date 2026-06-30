'use client'

import { useRef, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('@/components/r3f/ProductScene'), { ssr: false })

export default function ProductSection() {
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
    <section ref={sectionRef} id="product" className="relative w-full min-h-screen bg-[#0a0a0a] flex items-center overflow-hidden border-t border-[#C9A84C]/10">
      <div className="w-full max-w-7xl mx-auto px-8 md:px-20 grid md:grid-cols-2 gap-16 items-center py-32">

        {/* 3D Canvas */}
        <div className="w-full h-[400px] md:h-[600px] order-2 md:order-1">
          {mounted && <Scene />}
        </div>

        {/* Content */}
        <div className="order-1 md:order-2">
          <span className="text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase font-bold block mb-4">Technology</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight leading-[1.1]">
            Advanced PPF<br />
            <span className="text-[#C9A84C]">Film Technology</span>
          </h2>
          <p className="text-white/60 text-sm leading-relaxed font-light mb-10">
            Our Kevlar-infused PPF is a five-layer engineered system, each precisely tuned to protect, heal, and preserve your vehicle's finish for over a decade.
          </p>

          <div className="space-y-5">
            {[
              { num: '01', label: 'Car Paint Layer',    desc: 'The original factory finish — protected beneath it all.' },
              { num: '02', label: 'Clear Coat',         desc: 'Locking in gloss before the PPF begins its work.' },
              { num: '03', label: 'Kevlar PPF Core',    desc: 'Military-grade strength, stops impacts cold.' },
              { num: '04', label: 'Self-Healing Coat',  desc: 'Minor scratches vanish under gentle heat.' },
              { num: '05', label: 'Hydrophobic Top',    desc: 'Water, mud, and contaminants slide clean off.' },
            ].map(item => (
              <div key={item.num} className="flex items-start gap-4 group">
                <span className="text-[#C9A84C]/40 text-xs font-bold tracking-widest mt-1 group-hover:text-[#C9A84C] transition-colors">{item.num}</span>
                <div>
                  <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-0.5">{item.label}</h4>
                  <p className="text-white/40 text-xs font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
    </section>
  )
}
