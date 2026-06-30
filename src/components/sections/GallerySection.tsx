'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import Image from 'next/image'

const galleryItems = [
  { id: 1, title: 'Gloss Enhancement', img: '/images/06_process_surface_prep_car.png' },
  { id: 2, title: 'Protected Hood',    img: '/images/07_process_precut_fitment_car.png' },
  { id: 3, title: 'Mirror Shine',      img: '/images/08_process_application_car.png' },
  { id: 4, title: 'Luxury Detailing',  img: '/images/09_process_finished_car.png' },
  { id: 5, title: 'PPF Edge Finish',   img: '/images/10_footer_rear_car.png' },
]

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const wrapper = wrapperRef.current
    if (!section || !wrapper) return

    const getScrollAmount = () => -(wrapper.scrollWidth - window.innerWidth)

    const tween = gsap.to(wrapper, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        scrub: 0.8,   // Slightly faster scrub feels snappier
        invalidateOnRefresh: true,
      },
    })

    return () => { tween.kill() }
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-[#050505] overflow-hidden">
      <div className="absolute top-10 left-10 md:left-20 z-10 pointer-events-none">
        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
          Protection You Can<br /><span className="text-[#C9A84C]">See in the Finish</span>
        </h2>
      </div>

      <div className="flex items-center h-screen pt-32 pb-20">
        <div ref={wrapperRef} className="flex flex-nowrap gap-8 px-10 md:px-20 h-full will-change-transform">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="relative w-[85vw] md:w-[42vw] h-full shrink-0 group overflow-hidden border border-white/5"
            >
              <Image
                src={item.img}
                alt={item.title}
                fill
                sizes="(max-width:768px) 85vw, 42vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10">
                <h3 className="text-white font-bold text-xl tracking-widest uppercase mb-2">{item.title}</h3>
                <div className="h-px w-10 bg-[#C9A84C] transition-[width] duration-300 group-hover:w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
