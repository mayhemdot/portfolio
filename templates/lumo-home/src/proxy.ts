import createMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/data (data fetches)
     * - favicon.ico (favicon file)
     */
    '/((?!admin|api|trpc|_next|_vercel|.*\\..*).*)',
  ],
}
