import type { AboutUs as AboutUsProps } from '@/payload-types'
import React from 'react'
import RichText from '@/components/RichText'
import Marquee from '../Marquee'
import { Skills } from './Skills'
import { InfoAboutUsBlockWrapper } from './InfoAboutUsBlockWrapper'
import { AboutUsBackground } from './AboutUsBackground'

export const AboutUsBlock: React.FC<AboutUsProps> = async (props) => {
  const { id, title, description, features } = props

  return (
    <>
      <InfoAboutUsBlockWrapper id={`block-${id}`}>
        <AboutUsBackground />
        <div className="relative w-full px-4 md:w-3/5 md:mx-auto py-16 z-10">
          {title && (
            <RichText
              className="fl-text-20/40 text-white text-center mb-12 md:mb-24"
              data={title}
              enableGutter={false}
            />
          )}
          {description && (
            <RichText
              className="fl-text-18/24 prose font-extralight text-white"
              data={description}
              enableGutter={false}
            />
          )}
        </div>
        <div className="z-10 w-full px-4 md:mx-auto mb-16 md:w-3/5 fl-text-12/16 grid font-extralight text-gray-300/80 grid-cols-3 gap-3">
          {features?.map((feature, index) => {
            return (
              <div key={index} className={'grow'}>
                <RichText data={feature?.feature!} className={'text-left'} enableGutter={false} />
              </div>
            )
          })}
        </div>
        <Marquee
          className={'text-white z-10'}
          classNameIcon="[&>path]:fill-white"
          phrases={[
            {
              text: 'EXPERIENCE',
            },
            {
              text: 'EXPERIENCE',
            },
            {
              text: 'EXPERIENCE',
            },
            {
              text: 'EXPERIENCE',
            },
          ]}
        />
        {/* <AboutUsClient /> */}
        {/* <CollectionArchive posts={posts} /> */}
      </InfoAboutUsBlockWrapper>

      <Skills />
      {/* <div className="min-h-[200vh]" ref={projectsContainerRef}></div> */}
    </>
  )
}
