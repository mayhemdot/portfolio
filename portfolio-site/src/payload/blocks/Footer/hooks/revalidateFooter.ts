import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateFooter: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating footer`)

    try {
      revalidateTag('global_footer')
    } catch (err) {
      // Revalidation errors are expected when running outside Next.js request context
    }
  }

  return doc
}
