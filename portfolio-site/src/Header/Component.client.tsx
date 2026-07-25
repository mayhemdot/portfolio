'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState, useRef } from 'react'
import type { Header } from '@/payload-types'
import { LogoIcon } from '@/components/Logo/LogoIcon'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface HeaderClientProps {
  data: Header
}

const NAV_ITEMS = [
  { label: 'HOME', href: '#home', id: 'home' },
  { label: 'ABOUT', href: '#about', id: 'about' },
  { label: 'WORKS', href: '#works', id: 'works' },
  { label: "LET'S TALK", href: '#lets-talk', id: 'lets-talk' },
]



function getSectionBounds(id: string) {
  const el = document.getElementById(id)

  if (!el) {
    return { start: 0, end: 0 }
  }

  const trigger = ScrollTrigger.getAll()
    .find((st) => st.trigger === el)

  if (trigger) {
    return {
      start: trigger.start,
      end: trigger.end,
    }
  }

  const scrollTop =
    window.scrollY || document.documentElement.scrollTop

  const rect = el.getBoundingClientRect()

  return {
    start: rect.top + scrollTop,
    end: rect.top + scrollTop + el.offsetHeight,
  }
}

// function getSectionBounds(id: string): { start: number; end: number } {
//   const el = document.getElementById(id)
//   if (!el) return { start: 0, end: 0 }

//   const allTriggers = ScrollTrigger.getAll()
//   const sectionTriggers = allTriggers.filter((st) => {
//     if (!st.trigger) return false
//     const triggerEl = st.trigger as HTMLElement
//     return (
//       triggerEl === el ||
//       el.contains(triggerEl) ||
//       (st.pin && (st.pin === el || el.contains(st.pin as Node)))
//     )
//   })

//   const scrollTop = window.scrollY || document.documentElement.scrollTop

//   if (sectionTriggers.length > 0) {
//     const minStart = Math.min(...sectionTriggers.map((st) => st.start))
//     const maxEnd = Math.max(...sectionTriggers.map((st) => st.end))
//     return { start: minStart, end: maxEnd }
//   }

//   const rect = el.getBoundingClientRect()
//   const start = rect.top + scrollTop
//   const end = start + el.offsetHeight

//   return { start, end }
// }

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)
  const progressRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useGSAP(
    () => {
      if (!headerRef.current) return

      // Header entrance animation
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

      const updateAllProgress = () => {
        const scrollY = window.scrollY || document.documentElement.scrollTop

        NAV_ITEMS.forEach((item, index) => {
          const bounds = getSectionBounds(item.id)
          const fillEl = progressRefs.current[index]
          if (!fillEl || bounds.end <= bounds.start) return

          let progress = 0
          if (scrollY <= bounds.start) {
            progress = 0
          } else if (scrollY >= bounds.end) {
            progress = 1
          } else {
            progress = (scrollY - bounds.start) / (bounds.end - bounds.start)
          }

          fillEl.style.transform = `scaleX(${progress})`

          if (process.env.NODE_ENV === 'development') {
            // Debug logging for actual scroll positions vs calculated progress
            // console.debug(`[NavProgress] ${item.id} | Start: ${bounds.start.toFixed(0)}px | End: ${bounds.end.toFixed(0)}px | ScrollY: ${scrollY.toFixed(0)}px | Progress: ${(progress * 100).toFixed(1)}%`)
          }
        })
      }

      // Create global scroll observer tied to document scroll
      const globalTrigger = ScrollTrigger.create({
        trigger: document.documentElement,
        start: 0,
        end: 'max',
        onUpdate: updateAllProgress,
        onRefresh: updateAllProgress,
      })

      // Also listen to window scroll and GSAP refresh
      window.addEventListener('scroll', updateAllProgress, { passive: true })
      ScrollTrigger.addEventListener('refresh', updateAllProgress)

      // Refresh triggers to ensure all pinned section spacers are measured
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        updateAllProgress()
      })

      return () => {
        globalTrigger.kill()
        window.removeEventListener('scroll', updateAllProgress)
        ScrollTrigger.removeEventListener('refresh', updateAllProgress)
      }
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
      className="fl-px-8/16 fl-py-8/16 h-16 xl:h-20 sticky top-0 w-full z-100"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="flex justify-between gap-8 text-inherit">
        <Link href="/" className="">
          <LogoIcon className="size-10! 2xl:w-16! 2xl:h-16!" />
        </Link>

        <nav className="w-2/3 md:w-1/2 bg-foreground text-background! lg:w-1/3 fl-text-8/12 mt-auto rounded-lg overflow-hidden shadow-lg">
          <div className="z-20 w-full pt-3 px-3 md:px-4 justify-between flex gap-3">
            {NAV_ITEMS.map((item, index) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className="relative group flex flex-col grow items-center text-nowrap pb-2 text-inherit cursor-pointer select-none"
              >
                <span className="sr-only">{item.label}</span>
                <span className="font-sans font-medium tracking-wider transition-opacity group-hover:opacity-80">
                  {item.label}
                </span>
                {/* Border progress indicator per nav item */}
                <div className="w-full h-[2px] bg-background/20 mt-1.5 relative overflow-hidden rounded-full">
                  <div
                    ref={(el) => {
                      progressRefs.current[index] = el
                    }}
                    className="h-full bg-accent w-full origin-left transition-transform duration-75 ease-out"
                    style={{ transform: 'scaleX(0)' }}
                  />
                </div>
              </a>
            ))}
          </div>
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
