'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export default function CustomCursor() {
  const dotRef    = useRef<HTMLDivElement>(null)
  const ringRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Set centering once — GSAP combines xPercent/yPercent with x/y correctly
    gsap.set(dot,  { xPercent: -50, yPercent: -50 })
    gsap.set(ring, { xPercent: -50, yPercent: -50 })

    let rafId: number

    const onMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        gsap.set(dot, { x: e.clientX, y: e.clientY })
        gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.28, ease: 'power3.out' })
      })
    }

    const onEnter = () => {
      dot.classList.add('hovering')
      ring.classList.add('hovering')
    }
    const onLeave = () => {
      dot.classList.remove('hovering')
      ring.classList.remove('hovering')
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // Attach to all interactive elements
    const attachObserver = new MutationObserver(() => {
      document.querySelectorAll('a, button, [role="button"], [data-cursor]').forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    })
    attachObserver.observe(document.body, { childList: true, subtree: true })

    // Initial attach
    document.querySelectorAll('a, button, [role="button"], [data-cursor]').forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
      attachObserver.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
