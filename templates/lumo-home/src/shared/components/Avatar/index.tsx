import React from 'react'
import Avvvatars from 'avvvatars-react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar'
import { Media, User } from '@/payload-types'
import { cn } from '@/shared/lib/utils'

interface AvvvatarsWrapperProps {
  value: string
  size?: number
  style?: 'character' | 'shape'
  displayValue?: string
  border?: boolean
  borderSize?: number
  borderColor?: string
  radius?: number
}

export function AvvvatarsWrapper(props: AvvvatarsWrapperProps) {
  // Фильтруем пропсы, чтобы не передавать shadow
  const {
    value,
    size,
    style,
    displayValue,
    border,
    borderSize,
    borderColor,
    radius,
  } = props

  return (
    <Avvvatars
      value={value}
      size={size}
      style={style}
      displayValue={displayValue}
      border={border}
      borderSize={borderSize}
      borderColor={borderColor}
      radius={radius}
    />
  )
}

export function AvatarUser({
  className,
  user,
  size = 40,
}: {
  className?: string
  user: User | undefined | null
  size?: number
}) {
  return (
    <Avatar
      // style={{
      //   width: size + 'px',
      //   height: size + 'px',
      // }}
      className={cn(
        'cursor-pointer hover:opacity-80 transition-opacity',
        className,
      )}
    >
      <AvatarImage
        src={((user as any)?.avatar as Media)?.url || ''}
        alt={user?.email}
      />
      <AvatarFallback className={cn('fl-text-20/32 bg-background', className)}>
        <AvvvatarsWrapper
          key={'header'}
          value={user?.email || 'АН'}
          size={size}
        />
      </AvatarFallback>
    </Avatar>
  )
}
