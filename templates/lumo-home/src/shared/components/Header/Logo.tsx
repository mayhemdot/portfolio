
import LogoIcon from '@/shared/components/Header/LogoIcon'
import Link from 'next/link'

export function Logo() {
  return (
    <>
      {(
        <Link href="/" className={'cursor-pointer relative'}>
          <LogoIcon className="size-15 xl:size-16"/>
        </Link>
      )}
    </>
  )
}
