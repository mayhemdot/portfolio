'use client'
import { useGSAP } from '@gsap/react'
import React, { PropsWithChildren } from 'react'

import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { useGSAP } from '@gsap/react'
// import React, { PropsWithChildren } from 'react'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger)

export function InfoAboutUsBlockWrapper({ children, id }: PropsWithChildren<{ id: string }>) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      const tl = gsap.to('.aboutUsBackground', {
        marginLeft: 0,
        marginRight: 0,
        borderRadius: 0,
        duration: 1,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${window.innerHeight}px`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          anticipatePin: 1, // помогает на мобильных
        },
      })
      return () => tl.kill()
    },

    { scope: containerRef },
  )

  return (
    <div
      ref={containerRef}
      className="aboutUsBlock mt-[-1px] relative min-h-svh text-center"
      id={`block-${id}`}
    >
      {children}
    </div>
  )
}
