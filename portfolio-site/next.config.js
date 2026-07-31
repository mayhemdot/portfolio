import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

import redirects from './redirects.js'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      /* 'https://example.com' */
   
      // {
      //   protocol: 'https',
      //   hostname: '*.public.blob.vercel-storage.com', // Разрешаем картинки из Vercel Blob
      // },
    {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/api/media/file/**",
      },

    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
}

console.log(
  "[[[remotePatterns]]]:",
  JSON.stringify(nextConfig.images?.remotePatterns, null, 2),
);

export default withPayload(withNextIntl(nextConfig), { devBundleServerPackages: false })

