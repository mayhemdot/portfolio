'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePathname } from 'next/navigation'
import { Scene, CAMERA_CONFIG, CameraPose } from './Scene3d'
import gsap from "gsap";
import en from './locales/en.json'
import ru from './locales/ru.json'
import { FillReveal } from '@/components/Animation/FillReveal'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const MAIN_IMPACT_HERO = { en, ru }

export const MainImpactHero: React.FC<Page['hero']> = ({ richText }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const heroRef = React.useRef<HTMLDivElement>(null)
  const heroContentRef = React.useRef<HTMLDivElement>(null)
  const heroLeftRef = React.useRef<HTMLDivElement>(null)
  const heroRightRef = React.useRef<HTMLDivElement>(null)
  const cameraStateRef = React.useRef<CameraPose>({ ...CAMERA_CONFIG.desktop.start })
  const pathname = usePathname()
  const locale = pathname?.startsWith('/en') ? 'en' : 'ru'
  const t = MAIN_IMPACT_HERO[locale]

  useGSAP(
    () => {
      // ScrollTrigger camera fly-through timeline
      const isMobile = window.innerWidth < 768
      const config = isMobile ? CAMERA_CONFIG.mobile : CAMERA_CONFIG.desktop

      cameraStateRef.current = { ...config.start }

      const dissolveTargets = [
        heroContentRef.current,
        heroLeftRef.current,
        heroRightRef.current,
      ].filter(Boolean)

      // Set initial states for performance & crispness
      gsap.set(dissolveTargets, {
        opacity: 1,
        filter: 'blur(0px)',
        willChange: 'filter, opacity',
        pointerEvents: 'auto',
      })

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: '+=150%',
          pin: heroRef.current,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      const TOTAL_DURATION = 2.0

      scrollTl
        .to(cameraStateRef.current, {
          x: config.mid.x,
          y: config.mid.y,
          z: config.mid.z,
          rotX: config.mid.rotX,
          rotY: config.mid.rotY,
          rotZ: config.mid.rotZ,
          fov: config.mid.fov,
          duration: 1,
          ease: 'power1.inOut',
        })
        .to(cameraStateRef.current, {
          x: config.end.x,
          y: config.end.y,
          z: config.end.z,
          rotX: config.end.rotX,
          rotY: config.end.rotY,
          rotZ: config.end.rotZ,
          fov: config.end.fov,
          duration: 1,
          ease: 'power1.inOut',
        })
        .to(
          dissolveTargets,
          {
            opacity: 0,
            filter: 'blur(8px)',
            duration: TOTAL_DURATION * 0.3, // Last 30% of scroll timeline
            ease: 'power2.in',
            onComplete: () => {
              gsap.set(dissolveTargets, { pointerEvents: 'none' })
            },
            onReverseComplete: () => {
              gsap.set(dissolveTargets, { pointerEvents: 'auto' })
            },
          },
          TOTAL_DURATION * 0.7, // Starts at 70% progress
        )

      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    },
    { scope: heroRef },
  )

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      ref={heroRef}
      id="home"
      className="relative flex items-stretch justify-center heightWithoutHeader df-px-xs"
    >
      <div
        ref={heroLeftRef}
        className="max-w-[220px] grow h-full flex flex-col df-gap-2-6 justify-end absolute left-0 df-px z-0"
      >
        <div>
          <FillReveal className={'flex flex-col!'}>
            <CMSLink url={'/telegram'} className="cursor-pointer df-px df-py-xs">
              {t.telegram}
            </CMSLink>
            <CMSLink url={'/contacts'} className="cursor-pointer df-px df-py-xs">
              {t.bhance}
            </CMSLink>
          </FillReveal>
          <CMSLink
            url={'/contacts'}
            appearance={'default'}
            className="rounded-none w-full df-px df-py-xs"
          >
            {t.linkToConatctButton}
          </CMSLink>
        </div>
      </div>
      <div
        ref={heroContentRef}
        className="grow text-center self-center z-10 flex flex-col items-center justify-center"
      >
        {richText && (
          <RichText
            className="mb-6 fl-text-46/90 leading-tight prose xl:mb-8 *:text-foreground"
            data={richText}
            enableGutter={false}
          />
        )}
        <p className="fl-text-16/24 font-light italic">by Gorunoff Evgenii</p>
      </div>

      <div
        ref={heroRightRef}
        className="max-w-[700px] mx-auto mr-2 md:mr-4 z-0 absolute right-0 h-full items-stretch justify-between flex flex-col"
      >
        <FillReveal className="df-px df-py-xs">
          {t.disciplines.line1}
          <br />
          {t.disciplines.line2}
          <br />
          {t.disciplines.line3}
        </FillReveal>
      </div>
      <Scene cameraStateRef={cameraStateRef} />
    </div>
  )
}
