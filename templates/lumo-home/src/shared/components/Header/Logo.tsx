import type { Media as MediaType } from '@/payload-types'
import { Media } from '@/shared/components/Media'
import Link from 'next/link'

export function Logo({ logo }: { logo: number | MediaType }) {
  return (
    <div>
      {logo && typeof logo === 'object' && (
        <Link href="/" className={'cursor-pointer relative'}>
          <Media
            resource={logo}
            loading="eager"
            unoptimized={false}
            imgClassName="h-[70px] xl:h-[80px] w-auto"
          />
        </Link>
      )}
    </div>
  )
}
