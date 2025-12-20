import { FC } from 'react'

import { cn } from '@/lib/utils'

interface PageTitleProps {
  title: string
  className?: string
  position: 'left' | 'center'
}

const PageTitle: FC<PageTitleProps> = ({ title, className, position }) => {
  const positionStyles = position === 'left' ? 'text-left' : 'text-center'
  return (
    <h1
      className={cn(
        'fsSubtitle mb-4 lg:mb-8 text-2xl font-semibold w-full',
        className,
        positionStyles
      )}
    >
      {title}
    </h1>
  )
}

export default PageTitle
