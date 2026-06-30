'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShieldAlert, RefreshCw, Droplet, SunMedium, Sparkles, Award } from 'lucide-react'

const features = [
  {
    icon: ShieldAlert,
    title: 'Extreme Durability',
    description: 'Kevlar technology offers superior resistance against impact and abrasion.'
  },
  {
    icon: RefreshCw,
    title: 'Self-Healing Surface',
    description: 'Advanced top coat heals swirl marks and light scratches with heat.'
  },
  {
    icon: Droplet,
    title: 'Hydrophobic Coating',
    description: 'Repels water, dirt, and contaminants. Easy to clean.'
  },
  {
    icon: SunMedium,
    title: 'UV & Stain Resistant',
    description: 'Prevents yellowing and staining. Keeps it new.'
  },
  {
    icon: Sparkles,
    title: 'High Gloss Finish',
    description: 'Enhances your car\'s look with a mirror-like shine.'
  },
  {
    icon: Award,
    title: '10 Year Warranty',
    description: 'Long-lasting protection with peace of mind warranty.'
  }
]

export default function PerformanceFeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} id="features" className="relative py-32 bg-[#050505] border-b border-[#C9A84C]/10 overflow-hidden">
      {/* Background gradients for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-zinc-900/30 via-[#050505] to-black z-0 pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-6xl">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <span className="text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase font-bold block mb-4">
            Why Choose Kevlar PPF?
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight">
            Built For<br />Performance
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                className="group p-10 bg-[#0a0a0a] border border-white/5 hover:border-[#C9A84C]/40 transition-colors duration-500 flex flex-col items-center text-center relative overflow-hidden"
              >
                {/* Subtle hover background effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#C9A84C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="w-16 h-16 rounded-full border border-[#C9A84C]/20 flex items-center justify-center mb-6 text-[#C9A84C] group-hover:scale-110 group-hover:border-[#C9A84C]/60 transition-all duration-500 relative z-10">
                  <Icon strokeWidth={1.5} className="w-6 h-6" />
                </div>
                
                <h3 className="text-white font-bold text-lg tracking-widest uppercase mb-4 relative z-10">
                  {feature.title}
                </h3>
                
                <p className="text-white/50 text-sm leading-relaxed font-light relative z-10">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
