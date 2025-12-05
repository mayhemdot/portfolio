'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { LogoIcon } from '@/components/Logo/LogoIcon'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const headerRef = React.useRef(null)
  useGSAP(
    () => {
      gsap.fromTo(
        headerRef.current,
        { y: '-100%' },
        {
          y: '0%',
          ease: 'power4.out',
          duration: 1,
          delay: 1,
        },
      )
    },
    { scope: headerRef },
  )
  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      ref={headerRef}
      className="fl-px-8/16 fl-py-8/16 h-16 xl:h-20 sticky top-0 z-50 text-white mix-blend-difference"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="flex justify-between gap-8 text-inherit">
        <Link href="/">
          <LogoIcon className="w-10! h-10! 2xl:w-16! 2xl:h-16!" />
          {/* <Logo loading="eager" priority="high" className="invert dark:invert-0" /> */}
        </Link>
        {/* <HeaderNav data={data} /> */}

        <nav className="w-full md:w-1/2 lg:w-1/3 fl-text-8/12 mt-auto text-inherit ">
          <div className="z-20 w-full justify-between flex gap-3">
            {['WORKS', 'ABOUT', 'UPDATES', "LET'S TALK"].map((item, index) => (
              <div key={index} className="inline-flex text-nowrap pb-3 text-inherit">
                <span className="sr-only">{item}</span>
                {item}
              </div>
            ))}
          </div>

          <div className="progress h-0.5 bg-white w-full z-10"></div>
          {/* <HeaderNav data={data} /> */}
        </nav>
      </div>
    </header>
  )
}

// export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
//   /* Storing the value in a useState to avoid hydration errors */
//   const [theme, setTheme] = useState<string | null>(null)
//   const { headerTheme, setHeaderTheme } = useHeaderTheme()
//   const pathname = usePathname()

//   useEffect(() => {
//     setHeaderTheme(null)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [pathname])

//   useEffect(() => {
//     if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [headerTheme])

//   return (
//     <header
//       className="container py-2 xl:py-4 h-16 xl:h-20 sticky top-0 z-50"
//       {...(theme ? { 'data-theme': theme } : {})}
//     >
//       <div className="flex justify-between">
//         <Link href="/">
//           <LogoIcon className="w-10! h-10! 2xl:w-16! 2xl:h-16! " />
//           {/* invert dark:invert-0 */}
//           {/* <Logo loading="eager" priority="high" className="invert dark:invert-0" /> */}
//         </Link>
//         <HeaderNav data={data} />
//       </div>
//     </header>
//   )
// }
