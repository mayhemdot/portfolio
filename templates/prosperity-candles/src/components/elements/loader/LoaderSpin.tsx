import { cva, VariantProps } from 'class-variance-authority'
import { Loader2, LucideProps } from 'lucide-react'

import { cn } from '@/lib/utils'

const loaderVariants = cva('size-4 shrink-0 animate-spin', {
  variants: {
    variant: {
      black: 'text-black',
      white: 'text-white',
    },
  },
  defaultVariants: {
    variant: 'black',
  },
})

export interface LoaderSpinProps extends LucideProps, VariantProps<typeof loaderVariants> {}

function LoaderSpin({ className, variant, ...props }: LoaderSpinProps) {
  return <Loader2 className={cn(loaderVariants({ variant }), className)} {...props} />
}

export { LoaderSpin }
