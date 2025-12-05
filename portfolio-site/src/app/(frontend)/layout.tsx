import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'
import { Montserrat_Alternates } from 'next/font/google'
import { ScrollSmoothLayout } from '@/components/ScrollSmooth'
import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import localFont from 'next/font/local'
import { getServerSideURL } from '@/utilities/getURL'
import './globals.css'

const montserrat = Montserrat_Alternates({
  weight: ['400', '700'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const ppValue = localFont({
  src: [
    {
      path: './_fonts/pp_valve/PPValve-PlainExtraLight.otf', // Укажите правильный путь к файлу
      weight: '200',
      style: 'normal',
    },
    {
      path: './_fonts/pp_valve/PPValve-PlainMedium.otf', // Укажите правильный путь к файлу
      weight: '400',
      style: 'normal',
    },
    {
      path: './_fonts/pp_valve/PPValve-PlainExtraBold.otf', // Добавьте файлы для других начертаний
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-pp-value', // Определяем CSS-переменную
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(montserrat.className, ppValue.className)}
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
