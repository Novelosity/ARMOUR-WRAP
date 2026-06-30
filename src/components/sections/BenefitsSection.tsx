'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { Shield, Sparkles, Sun, Droplets, Clock, CheckCircle } from 'lucide-react'

const benefits = [
  { icon: Shield,       title: 'Invisible Shield',        desc: 'Seamless protection that preserves your original paint.' },
  { icon: Sparkles,     title: 'Self-Healing Technology', desc: 'Scratches disappear with simple heat exposure.' },
  { icon: Sun,          title: 'Crystal Clear Finish',    desc: 'High-gloss transparency with zero orange peel.' },
  { icon: Clock,        title: 'Extreme Durability',      desc: 'Engineered with Kevlar for maximum impact resistance.' },
  { icon: Droplets,     title: 'Hydrophobic Protection',  desc: 'Water and dirt slide off effortlessly.' },
  { icon: CheckCircle,  title: '10-Year Warranty',        desc: 'Guaranteed against yellowing or cracking.' },
]

export default function BenefitsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Only animate opacity + translateY — both GPU-composited
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 75%' },
      }
    )
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full py-32 bg-[#050505] overflow-hidden">
      {/* Single gradient — cheaper than compositing many overlapping layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#050505] to-[#050505] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
            Built to Protect.<br />
            <span className="text-[#C9A84C]">Designed to Disappear.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              ref={el => { cardsRef.current[i] = el }}
              className="group p-8 border border-white/5 bg-[#0a0a0a] hover:border-[#C9A84C]/40
                         transition-[border-color,background-color,transform] duration-300 will-change-transform
                         hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Hover glow — pointer-events-none so it doesn't cause repaints outside its node */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="w-11 h-11 rounded-full border border-[#C9A84C]/20 flex items-center justify-center mb-6 text-[#C9A84C] relative z-10 transition-[background-color,transform] duration-300 group-hover:bg-[#C9A84C]/10 group-hover:scale-110 will-change-transform">
                <benefit.icon className="w-5 h-5" strokeWidth={1.5} />
              </div>

              <h3 className="text-white font-bold text-base uppercase tracking-widest mb-3 relative z-10">{benefit.title}</h3>
              <p className="text-white/50 text-sm font-light leading-relaxed relative z-10">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
