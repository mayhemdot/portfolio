'use client'

import React from 'react'
import { CMSLink } from '@/components/Link'

export function LetsTalkSection() {
  return (
    <section
      id="lets-talk"
      className="relative min-h-screen bg-black text-primary-foreground flex flex-col items-center justify-center py-24 df-px"
    >
      <div className="max-w-3xl text-center space-y-6">
        <h2 className="fl-text-32/64 font-heading font-normal tracking-tight text-primary-foreground dark:text-primary">
          Let's Build Something Together
        </h2>
        <p className="fl-text-16/20 mx-auto">
          Have an idea or a project in mind? Get in touch and let's turn it into reality.
        </p>
        <div className="pt-4 flex justify-center">
          <CMSLink
            url="/contacts"
            appearance="default"
            className="rounded-full px-8 py-3 bg-accent font-sans font-light text-14/18 hover:opacity-90 transition-opacity"
          >
            Get In Touch
          </CMSLink>
        </div>
      </div>
    </section>
  )
}
