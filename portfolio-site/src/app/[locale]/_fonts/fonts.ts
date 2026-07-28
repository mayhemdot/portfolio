import { Manrope } from "next/font/google"
import localFont from "next/font/local"

export const manrope = Manrope({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
})

export const nyghtSerif = localFont({
  src: [
    {
      path: './night-serif/NyghtSerif-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './night-serif/NyghtSerif-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: './night-serif/NyghtSerif-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './night-serif/NyghtSerif-RegularItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './night-serif/NyghtSerif-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './night-serif/NyghtSerif-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: './night-serif/NyghtSerif-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './night-serif/NyghtSerif-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-nyght-serif',
  display: 'swap',
})