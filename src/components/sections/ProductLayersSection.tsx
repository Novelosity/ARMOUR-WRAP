'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Shield, Droplets, Sun, Sparkles } from 'lucide-react'
import Image from 'next/image'

export default function ProductLayersSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Parallax for the main image
  const yImage = useTransform(scrollYProgress, [0, 1], ['10%', '-20%'])
  const scaleImage = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.1, 1.2])
  const opacityText = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} id="product-layers" className="relative h-[250vh] bg-[#0A0A0A] border-t border-b border-[#C9A84C]/10">
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center justify-between px-8 md:px-20 overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#111] via-[#0A0A0A] to-black">
        
        {/* Left Side: Description & Features */}
        <motion.div 
          style={{ opacity: opacityText }}
          className="w-full md:w-1/2 flex flex-col justify-center z-20 mt-20 md:mt-0"
        >
          <div className="mb-4">
            <span className="text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase font-bold">About Us</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight leading-[1.1] filter drop-shadow-lg">
            Perfection is <br /> in our DNA
          </h2>
          <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-md mb-16 font-light">
            ArmorWrap Studio is dedicated to delivering the highest standard of paint protection solutions. Our Kevlar PPF offers unmatched durability, self-healing technology and a flawless finish.
          </p>

          <div className="mb-4">
            <span className="text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase font-bold">Our Flagship Product</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-widest filter drop-shadow-md">
            KEVLAR PPF
          </h3>
          <p className="text-white/50 text-[10px] tracking-[0.3em] uppercase mb-12">
            Stronger. Smarter. Superior.
          </p>

          <div className="space-y-8 relative z-20">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full border border-[#C9A84C]/30 bg-black/40 backdrop-blur-md flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-[#C9A84C]" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm tracking-widest mb-1.5 uppercase">Kevlar Infused Layer</h4>
                <p className="text-white/50 text-xs font-light">Extreme strength & tear resistance</p>
              </div>
            </div>
            
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full border border-[#C9A84C]/30 bg-black/40 backdrop-blur-md flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-[#C9A84C]" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm tracking-widest mb-1.5 uppercase">Self-Healing Technology</h4>
                <p className="text-white/50 text-xs font-light">Automatically repairs minor scratches</p>
              </div>
            </div>
            
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full border border-[#C9A84C]/30 bg-black/40 backdrop-blur-md flex items-center justify-center shrink-0">
                <Sun className="w-5 h-5 text-[#C9A84C]" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm tracking-widest mb-1.5 uppercase">Crystal Clear Finish</h4>
                <p className="text-white/50 text-xs font-light">High gloss with zero orange peel</p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full border border-[#C9A84C]/30 bg-black/40 backdrop-blur-md flex items-center justify-center shrink-0">
                <Droplets className="w-5 h-5 text-[#C9A84C]" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm tracking-widest mb-1.5 uppercase">Stain & UV Resistant</h4>
                <p className="text-white/50 text-xs font-light">Protection that lasts for years</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Uploaded Layers Image with Parallax */}
        <div className="w-full md:w-1/2 h-full absolute md:relative right-0 top-0 opacity-30 md:opacity-100 flex items-center justify-center pointer-events-none">
          <motion.div 
            style={{ y: yImage, scale: scaleImage }}
            className="relative w-full max-w-2xl aspect-[4/3]"
          >
            <Image 
              src="/images/03_kevlar_ppf_product_layers.png"
              alt="Kevlar PPF Layers"
              fill
              className="object-contain filter drop-shadow-[0_0_30px_rgba(201,168,76,0.15)]"
            />
          </motion.div>
        </div>

      </div>
    </section>
  )
}
