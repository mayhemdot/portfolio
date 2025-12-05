'use client'
import gsap from 'gsap'
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/all'
import canUseDOM from '@/utilities/canUseDOM'

export function ScrollSmoothLayout({ children }: { children: React.ReactNode }) {
  if (typeof window === 'undefined') {
    return <>{children}</>
  }
  gsap.registerPlugin(ScrollTrigger)

  const lenis = new Lenis()
  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)
  return <>{children}</>
}
