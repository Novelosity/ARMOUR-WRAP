'use client'

import { motion } from 'framer-motion'

export default function CTASection() {
  return (
    <section className="relative py-32 bg-[#050505] border-t border-[#C9A84C]/10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#111] via-[#050505] to-black opacity-50 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-6">
          Ready to Protect<br />Your Pride?
        </h2>
        <p className="text-white/60 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">
          Book your Armour Warp PPF installation and give your car the invisible shield it deserves.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 border border-[#C9A84C] bg-[#C9A84C]/10 text-[#C9A84C] text-sm font-bold tracking-[0.2em] uppercase hover:bg-[#C9A84C] hover:text-black transition-colors duration-300 shadow-[0_0_20px_rgba(201,168,76,0.2)]"
          >
            Book Your Appointment
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 border border-white/20 bg-transparent text-white text-sm font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors duration-300"
          >
            Contact Us
          </motion.button>
        </div>
      </div>
    </section>
  )
}
