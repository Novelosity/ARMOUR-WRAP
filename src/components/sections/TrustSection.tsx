'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 5000, suffix: '+', label: 'Cars Protected' },
  { value: 10, suffix: '+', label: 'Years Experience' },
  { value: 100, suffix: '%', label: 'Customer Satisfaction' },
  { value: 15, suffix: '', label: 'Certified Installers' },
]

function Counter({ value, suffix, label }: { value: number, suffix: string, label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isInView) {
      let start = 0
      const end = value
      const duration = 2000 // ms
      const increment = end / (duration / 16)

      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)
      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-8 relative group">
      <div className="text-5xl md:text-7xl font-black text-white mb-2 tracking-tighter">
        {count}{suffix}
      </div>
      <div className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-bold text-center">
        {label}
      </div>
      {/* Subtle glowing line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent group-hover:w-full transition-all duration-500" />
    </div>
  )
}

export default function TrustSection() {
  return (
    <section className="py-32 bg-[#050505] relative border-t border-[#C9A84C]/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
            Trusted by Car Enthusiasts
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <Counter key={i} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
