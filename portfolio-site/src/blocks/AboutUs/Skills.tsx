'use client'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Image from 'next/image'
import { cn } from '@/utilities/ui'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { CMSLink } from '@/components/Link'

gsap.registerPlugin(ScrollTrigger)

export function Skills() {
  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(max-width: 999px)', () => {
      // 📌 Мобильный: убираем все стили, отключаем ScrollTrigger
      ScrollTrigger.getAll().forEach((t) => t.kill())

      document.querySelectorAll('.cardContainer, .aboutFlipCard').forEach((el) => {
        ;(el as HTMLElement).style.transform = ''
        ;(el as HTMLElement).style.opacity = ''
        ;(el as HTMLElement).style.width = ''
        ;(el as HTMLElement).style.gap = ''
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.cardsWrapper',
          start: 'top top',
          end: `+=${window.innerHeight * 2}px`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
        },
      })
      tl.to('#card-2', {
        rotateZ: 10,
        translateX: '0%',
        translateY: '0%',
        duration: 1,
        ease: 'power3.out',
      }).to(
        '#card-3',
        {
          rotateZ: 20,
          translateX: '0%',
          translateY: '0%',
          duration: 1,
          ease: 'power3.out',
        },
        '>0.2',
      )
    })

    mm.add('(min-width: 1000px)', () => {
      // const stickyHeader = document.querySelector('.sticky-header h1')!
      const cardContainer = document.querySelector('.cardContainer')!

      let isGapDone = false
      let isFlipDone = false

      ScrollTrigger.create({
        trigger: '.cardsWrapper',
        start: 'top top',
        end: `+=${window.innerHeight * 4}px`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        onUpdate: ({ progress }) => {
          const map = gsap.utils.mapRange

          // Заголовок
          // if (progress <= 0.25) {
          //   const p = map(0.1, 0.25, 0, 1, progress)
          //   gsap.set(stickyHeader, { y: map(0, 1, 40, 0, p), opacity: p })
          // }

          // Ширина контейнера
          if (progress <= 0.25) {
            const widthPercentage = map(0, 0.25, 80, 65, progress)
            gsap.set(cardContainer, { width: `${widthPercentage}%` })
          } else {
            gsap.set(cardContainer, { width: '65%' })
          }

          // GAP + Border radius
          if (progress >= 0.35 && !isGapDone) {
            gsap.to(cardContainer, { gap: '20px', duration: 0.5, ease: 'power3.out' })
            gsap.to(['#card-1', '#card-2', '#card-3'], {
              borderRadius: '20px',
              duration: 0.5,
              ease: 'power3.out',
            })
            isGapDone = true
          } else if (progress < 0.35 && isGapDone) {
            gsap.to(cardContainer, { gap: '0px', duration: 0.5, ease: 'power3.out' })

            gsap.to('#card-1', {
              borderRadius: '20px 0 0 20px',
              duration: 0.5,
              ease: 'power3.out',
            })

            gsap.to('#card-2', {
              borderRadius: '0px',
              duration: 0.5,
              ease: 'power3.out',
            })

            gsap.to('#card-3', {
              borderRadius: '0 20px 20px 0px',
              duration: 0.5,
              ease: 'power3.out',
            })
            isGapDone = false
          }

          // Flip
          if (progress >= 0.7 && !isFlipDone) {
            gsap.to('.aboutFlipCard', {
              rotationY: 180,
              stagger: 0.1,
              duration: 0.75,
              ease: 'power3.inOut',
            })
            gsap.to(['#card-1', '#card-3'], { y: 30, rotationZ: (i) => [-15, 15][i] })
            isFlipDone = true
          } else if (progress < 0.7 && isFlipDone) {
            gsap.to('.aboutFlipCard', {
              rotationY: 0,
              stagger: -0.1,
              ease: 'power3.inOut',
            })
            gsap.to(['#card-1', '#card-3'], {
              y: 0,
              rotationZ: 0,
              duration: 0.75,
              ease: 'power3.inOut',
            })
            isFlipDone = false
          }
        },
      })
    })

    return () => {
      mm.revert()
    }
  }, [])
  return (
    <div className="cardsWrapper flex justify-center items-center h-full bg-black min-h-screen dark:bg-card  overflow-x-hidden ">
      <div className="cardContainer py-24 flex justify-center h-fit text-white">
        <AboutCard
          id="card-1"
          badge="UI/UX"
          title={'WEB DESIGN'}
          description={'Skilled to create convinident interface'}
          lightSrc={'/redd-light.png'}
          frontSrc={'/images/cover-11.png'}
          className={'fl-w-200/380'}
        />
        <AboutCard
          badge="WEB DEVELOPMENT"
          id="card-2"
          title={'FULL-STACK DEVELOPMENT'}
          description={'Skilled to create convinident interface '}
          lightSrc={'/blue-light.png'}
          frontSrc={'/images/cover-22.png'}
          className={'fl-w-200/380'}
        />

        <AboutCard
          badge="3D MODELING"
          id="card-3"
          title={'3D ARTIST'}
          description={'Skilled to create convinident interface'}
          lightSrc={'/green-light.png'}
          frontSrc={'/images/cover-33.png'}
          className={'fl-w-180/380'}
        />
      </div>
    </div>
  )
}

function AboutCard({
  id,
  title,
  badge,
  description,
  lightSrc,
  className,
  frontSrc,
}: {
  id: string
  title: string
  badge: string
  description: string
  lightSrc: string
  className: string
  frontSrc: string
}) {
  return (
    <div id={id} className={cn('aboutFlipCard aspect-5/8!', className)}>
      <div className="aboutFlipCardFront">
        <Image
          alt="front image"
          className="object-cover w-full h-full"
          width={600}
          height={800}
          src={frontSrc}
          quality={100}
        />
      </div>

      <div className="aboutFlipCardBack">
        <div className="relative px-8 py-8 flex justify-between h-full flex-col mx-auto z-10">
          <Badge variant={'outline'} className="text-white font-extralight">
            {'FRONTEND'}
          </Badge>
          <div>
            <h4 className={'text-left w-fit leading-tight mx-auto fl-text-20/28! mb-3'}>{title}</h4>
            <p className="font-extralight text-center text-secondary fl-text-14/16">
              {description}
            </p>
          </div>

          <CMSLink url={'/about'}>Read more</CMSLink>
        </div>
        <Image
          alt="green light"
          className="z-0 translate-y-1/2 inset-0 object-cover"
          fill
          src={lightSrc}
        />
        <Image
          alt="grade"
          quality={100}
          className="z-1 object-cover inset-0"
          fill
          src={'/grade2.png'}
        />
      </div>
    </div>
  )
}
