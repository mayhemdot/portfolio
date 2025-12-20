import { ImageIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function NoImage({ isDisabled, className }: { isDisabled?: boolean; className?: string }) {
  return (
    <div
      className={cn(
        'absolute flex h-full w-full items-center justify-center rounded-xl border border-box border-dark-beige-color',
        { 'border-zinc-400': isDisabled }
      )}
    >
      <ImageIcon
        color="gray"
        className={cn('size-5', className, { 'text-zinc-400': isDisabled })}
      />
    </div>
  )
}

export default NoImage
