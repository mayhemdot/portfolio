'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

gsap.registerPlugin(useGSAP)

const MAIN_IMPACT_HERO = {
  ru: {
    linkToContacts: 'Связаться',
    linkToConatctButton: 'Контакты',

    linkToBlog: 'Блог',
    linkToBlogButton: 'Blog',
  },
  en: {
    linkToContacts: 'Contact',
    linkToConatctButton: 'Contact',

    linkToBlog: 'Blog',
    linkToBlogButton: 'Blog',
  },
}

export const MainImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const container = React.useRef(null)

  useGSAP(
    () => {
      // gsap code here...
      gsap.fromTo(
        container.current,
        { borderRadius: '0px', y: '-50%', scale: 5.13 },
        {
          borderRadius: '32px',
          y: '0%',
          scale: 1,
          duration: 2,
          ease: 'power4.inOut',
        },
      ) // <-- automatically reverted
    },
    { scope: container },
  )
  useEffect(() => {
    setHeaderTheme('dark')
  })

  const t = MAIN_IMPACT_HERO['ru']

  return (
    <div className="relative flex items-stretch justify-center dark:text-background text-foreground heightWithoutHeader mx-2 md:mx-4">
      <div className="w-[200px] h-full absolute left-0 z-0">
        <div className="flex flex-col gap-8 justify-end md:justify-between grow h-full pb-8">
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
          ].map(({ label, button }, i) => (
            <div className="flex flex-col gap-2" key={label.title}>
              <span className="font-bold font-sans text-12/16 uppercase mb-2">{label.title}</span>
              <CMSLink
                url={button.url}
                appearance={'secondary'}
                className="rounded-full text-12/16 w-fit min-w-24"
              >
                {button.title}
              </CMSLink>
            </div>
          ))}
        </div>
      </div>
      <div className={'grow text-center self-center z-10'}>
        {richText && (
          <RichText
            className="mb-6 fl-text-26/90 leading-tight prose xl:mb-8 *:text-foreground"
            data={richText}
            enableGutter={false}
          />
        )}
        <div
          ref={container}
          className={'w-1/3 md:w-1/5 mx-auto aspect-video dark:bg-white bg-black rounded-2xl'}
        />
      </div>
      <div className="w-[700px] z-0 absolute right-0 h-full items-stretch justify-between flex flex-col">
        <div className="text-right fl-text-12/16">
          Art Direction Web Design UX & UI
          <br />
          Design Frontend Developement Backend
          <br />
          Developement Animation & Interaction E-Commerce
        </div>

        <div className="self-end pb-8">
          <p className="fl-text-16/20 font-bold uppercase mb-4">OUR SOCIAL MEDIA</p>
          <div className="flex gap-2 flex-col fl-text-12/16">
            <CMSLink url={'/contacts'}>Instagramm</CMSLink>
            <CMSLink url={'/contacts'}>Bhance</CMSLink>
          </div>
        </div>
      </div>
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
