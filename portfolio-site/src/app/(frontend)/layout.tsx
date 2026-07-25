import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
// import { GeistMono } from 'geist/font/mono'
// import { GeistSans } from 'geist/font/sans'
import React from 'react'
import { Manrope } from 'next/font/google'
import localFont from 'next/font/local'
import { ScrollSmoothLayout } from '@/components/ScrollSmooth'
import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { getServerSideURL } from '@/utilities/getURL'
import './globals.css'

const manrope = Manrope({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
})

const nyghtSerif = localFont({
  src: [
    {
      path: './_fonts/night-serif/NyghtSerif-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './_fonts/night-serif/NyghtSerif-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: './_fonts/night-serif/NyghtSerif-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './_fonts/night-serif/NyghtSerif-RegularItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './_fonts/night-serif/NyghtSerif-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './_fonts/night-serif/NyghtSerif-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: './_fonts/night-serif/NyghtSerif-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './_fonts/night-serif/NyghtSerif-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
    // {
    //   path: './_fonts/night-serif/NyghtSerif-Dark.woff2',
    //   weight: '900',
    //   style: 'normal',
    // },
  ],
  variable: '--font-nyght-serif',
  display: 'swap',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(manrope.variable, nyghtSerif.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <ScrollSmoothLayout>
            {/* <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          /> */}
            <Header />
            {children}
            <Footer />
          </ScrollSmoothLayout>
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
