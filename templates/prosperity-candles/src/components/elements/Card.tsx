import { forwardRef, HTMLAttributes, PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'

const Card = forwardRef<PropsWithChildren<HTMLDivElement>, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('w-full rounded-2xl shadow-sm  border-dark-beige-color bg-card', className)}
      {...props}
    >
      <div className="bg m-4 rounded-xl md:m-6 xl:m-8">{children}</div>
    </div>
  )
)

Card.displayName = 'Card'

const CardContent = forwardRef<PropsWithChildren<HTMLDivElement>, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('fsNormal rounded-xl bg-transparent p-4 md:p-6 xl:p-8', className)}
      {...props}
    >
      {children}
    </div>
  )
)

CardContent.displayName = 'CardContent'

export { Card, CardContent }

// const CardWrapper = ({ children }: PropsWithChildren) => {
// 	return (
// 		<div className='w-full rounded-2xl border border-dark-beige-color'>
// 			<div className='m-4 rounded-xl bg-beige-color md:m-6 xl:m-8'>
// 				{children}
// 			</div>
// 		</div>
// 	);
// };

// const CardContent = ({ children }: PropsWithChildren) => {
// 	return (
// 		<div
// 			className={cn(
// 				"rounded-xl border border-dark-beige-color p-4 md:p-6 xl:p-8 ",
// 				v.fsNormal
// 			)}
// 		>
// 			{children}
// 		</div>
// 	);
// };
