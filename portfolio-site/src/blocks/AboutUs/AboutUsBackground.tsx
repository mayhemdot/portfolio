'use client'
import React, { PropsWithChildren } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export function AboutUsBackground() {
  //   useGSAP(
  //     () => {
  //       const tl = gsap.to('.aboutUsBlock', {
  //         scrollTrigger: {
  //           trigger: '.aboutUsBlock',
  //           start: 'top top',
  //           end: `+=${window.innerHeight}px`,
  //           scrub: 1,
  //           pin: true,
  //           pinSpacing: true,
  //         },
  //         // marginLeft: 0,
  //         marginRight: '0px',
  //         marginLeft: '0px',
  //         borderRadius: '0px',
  //         duration: 1,
  //         ease: 'power4.inOut',
  //       })

  //       return () => tl.kill()
  //     },
  //     // { scope: '.aboutUsBlock' },
  //   )
  return (
    <div className="aboutUsBackground rounded-3xl  mx-2 md:mx-4   h-full z-0 bg-black dark:bg-card absolute inset-0 left-0 top-0" />
  )
}
