import { User } from '@/payload-types'
import { AvatarUser } from '@/shared/components/Avatar'
import { cn } from '@/shared/lib/utils'
import Link from 'next/link'

export function UserInfoPreview({
  user,
  className,
}: {
  user: User | null | undefined
  className?: string
}) {
  return (
    <Link
      className={cn('flex items-center gap-2 lg:gap-4 bg-primary', className)}
      href={'/account'}
    >
      {user && (
        <AvatarUser user={user} size={70} className="size-16 xl:size-[70px]" />
      )}
      {user && (
        <div className="flex flex-col space-y-1 leading-none">
          <p className="font-medium text-background fl-text-24/32">
            {user?.name || 'Аноним'}
          </p>
          {user?.email && (
            <p className="w-[200px] truncate fl-text-16/20 text-muted-foreground">
              {user?.email || 'email'}
            </p>
          )}
        </div>
      )}
    </Link>
  )
}
