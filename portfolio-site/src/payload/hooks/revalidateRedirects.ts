import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateRedirects: CollectionAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating redirects`)

  try {
    revalidateTag('redirects')
  } catch (err) {
    // Revalidation errors are expected when running outside Next.js request context
  }

  return doc
}
