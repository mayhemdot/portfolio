import { forwardRef, HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type ITitle = {
  title: string
  text?: string | number
  isDisabled?: boolean
}

const Table = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('w-full', className)} {...props} />
)

Table.displayName = 'Table'

const TableItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('grid w-full gap-4', className)} {...props} />
  )
)

TableItem.displayName = 'TableItem'

const TableColumn = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex h-full flex-row items-stretch justify-between  border-dark-beige-color py-1 md:flex-col md:gap-2  md:py-0',
        className
      )}
      {...props}
    />
  )
)

TableColumn.displayName = 'TableColumn'

const TableTitle = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & ITitle>(
  ({ className, title, isDisabled, text, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('fsSmall flex flex-1 items-center text-zinc-500', className)}
      {...props}
    >
      <h3>{title}</h3>
      {text ? (
        <span
          className={cn('px-2 text-zinc-400', {
            'text-muted-foreground': isDisabled,
          })}
        >
          {text}
        </span>
      ) : null}
    </div>
  )
)

TableTitle.displayName = 'TableTitle'

export { Table, TableColumn, TableItem, TableTitle }
