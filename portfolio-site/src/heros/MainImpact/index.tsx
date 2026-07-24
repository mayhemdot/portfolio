'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Scene } from './Scene3d'
import en from './locales/en.json'
import ru from './locales/ru.json'

gsap.registerPlugin(useGSAP)

const MAIN_IMPACT_HERO = { en, ru }

export const MainImpactHero: React.FC<Page['hero']> = ({ richText }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const heroRef = React.useRef<HTMLDivElement>(null)
  const container = React.useRef<HTMLAnchorElement>(null)
  const textRef = React.useRef<HTMLSpanElement>(null)

  const pathname = usePathname()
  const locale = pathname?.startsWith('/en') ? 'en' : 'ru'
  const t = MAIN_IMPACT_HERO[locale]


  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = document.getElementById('projects')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useGSAP(
    () => {
      const card = container.current
      if (!card) return

      // Measure layout size of the card
      const rect = card.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      // Calculate scale to cover the screen with extra safety margin
      const scaleX = viewportWidth / rect.width
      const scaleY = viewportHeight / rect.height
      const scale = Math.max(scaleX, scaleY) * 1.5

      // Calculate initial X & Y offsets to align card center with viewport center
      const cardCenterX = rect.left + rect.width / 2
      const viewportCenterX = viewportWidth / 2
      const initialX = viewportCenterX - cardCenterX

      const cardCenterY = rect.top + rect.height / 2
      const viewportCenterY = viewportHeight / 2
      const initialY = viewportCenterY - cardCenterY

      const tl = gsap.timeline()

      // Set the initial fullscreen scale and centered X/Y translation before paint
      tl.set(card, {
        scale: scale,
        x: initialX,
        y: initialY,
        borderRadius: 0,
        opacity: 1,
      })

      // Shrink to its natural state
      tl.to(card, {
        scale: 1,
        x: 0,
        y: 0,
        borderRadius: '32px',
        duration: 2,
        ease: 'power4.inOut',
        onComplete: () => {
          // Clear transform styles to let Tailwind hover scale transitions work normally
          gsap.set(card, { clearProps: 'transform' })
          card.classList.add('transition-transform', 'duration-300')
        },
      }).to(
        textRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power4.out',
        },
        '+=0.3',
      )
    },
    { scope: heroRef },
  )

  useEffect(() => {
    setHeaderTheme('dark')
  })


  return (
    <div
      ref={heroRef}
      className="relative flex items-stretch justify-center dark:text-background text-foreground heightWithoutHeader df-px-xs"
    >
      <div className="w-[200px] h-full absolute left-0 z-0">
        <div className="flex flex-col df-pb df-gap-2-6 justify-end grow h-full df-px-xs">
          {[
            {
              label: {
                title: t.linkToBlog,
              },
              button: {
                url: '/blog',
                title: t.linkToBlogButton,
              },
            },
            {
              label: {
                title: t.linkToContacts,
              },
              button: {
                url: '/contacts',
                title: t.linkToConatctButton,
              },
            },
          ].map(({ label, button }) => (
            <div className="flex flex-col df-gap-2-6" key={label.title}>
              {/* <span className="font-bold font-sans text-12/16 uppercase mb-2">{label.title}</span> */}
              <CMSLink
                url={button.url}
                appearance={'default'}
                className="rounded-full min-w-[140px] text-12/16 w-fit"
              >
                {button.title}
              </CMSLink>
            </div>
          ))}
        </div>
      </div>
      <div className="grow text-center self-center z-10 flex flex-col items-center justify-center">
        {richText && (
          <RichText
            className="mb-6 fl-text-28/90 leading-tight prose xl:mb-8 *:text-foreground"
            data={richText}
            enableGutter={false}
          />
        )}
        {/* Animated projects card link in normal document flow */}
        <Link
          ref={container}
          href="#projects"
          onClick={handleScrollToProjects}
          className="w-[178px] md:w-[20vw] rounded-full! md:h-auto aspect-[16/4] md:aspect-[16/4] mx-auto dark:bg-white bg-black opacity-0 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {/* Centered text inside the card */}
          <span
            ref={textRef}
            style={{ transform: 'translateY(16px)', opacity: 0 }}
            className="select-none font-sans pointer-events-none fl-text-16/20 font-light md:fl-text-18/24 tracking-wide  dark:text-black text-white text-center transition-colors group-hover:opacity-80"
          >
            {t.introText}
          </span>
        </Link>
      </div>
      <div className="w-[700px] mx-auto mr-2 md:mr-4 z-0 absolute right-0 h-full items-stretch justify-between flex flex-col">
        <div className="text-right fl-text-12/16 bg-secondary df-py-xs w-fit ml-auto df-px">
          {t.disciplines.line1}
          <br />
          {t.disciplines.line2}
          <br />
          {t.disciplines.line3}
        </div>

        <div className="self-end mb-8 bg-secondary df-py-xs df-px df-text-space-y">
          <p className="fl-text-16/20 font-bold uppercase">{t.ourSocialMedia}</p>
          <div className="flex df-gap-1-4 flex-col fl-text-12/16">
            <CMSLink url={'/telegram'}>{t.telegram}</CMSLink>
            <CMSLink url={'/contacts'}>{t.bhance}</CMSLink>
          </div>
        </div>
      </div>
      <Scene/>
      {/* <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-146 md:text-center">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
      </div> */}
    </div>
  )
}
