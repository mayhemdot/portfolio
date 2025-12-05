import { cn } from '@/utilities/ui'

type Props = {}

export function Bounded({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn('fl-px-8/16', className)}>{children}</div>
}
