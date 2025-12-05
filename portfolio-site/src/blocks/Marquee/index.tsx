import { FC, Fragment } from 'react'
import clsx from 'clsx'
import { cn } from '@/utilities/ui'
import { LucideProps } from 'lucide-react'

/**
 * Props for `Marquee`.
 */
// export type MarqueeProps = SliceComponentProps<Content.MarqueeSlice>

/**
 * Component for "Marquee" Slices.
 */
const PHRASES = [
  {
    text: 'FRONTEND DEVELOPMENT',
  },
  {
    text: 'BACKEND DEVELOPMENT',
  },
  {
    text: 'ANIMATION',
  },
  {
    text: 'DESIGN',
  },
  {
    text: 'INTERACTION E-Commerce',
  },
]

const Marquee: FC<any> = ({
  phrases,
  className,
  classNameIcon,
}: {
  className?: string
  classNameIcon?: string
  phrases?: { text: string }[]
}) => {
  if (!phrases) {
    phrases = PHRASES
  }

  const MarqueeContent = () => (
    <div className="flex items-center py-10 whitespace-nowrap">
      {phrases?.map((item: any, i: number) => (
        <Fragment key={i}>
          <div
            className={cn(
              'font-bold-slanted px-14 fl-text-26/64! leading-none  uppercase [text-box:trim-both_cap_alphabetic] md:text-[260px]',
              className,
            )}
          >
            {item.text}
          </div>
          <MIcon className={classNameIcon} />
          {/* <LogoMark className="size-36 shrink-0" /> */}
        </Fragment>
      ))}
    </div>
  )
  // data-slice-type={slice.slice_type} data-slice-variation={slice.variation}
  return (
    <section>
      <div
        className="relative flex w-full items-center overflow-hidden select-none"
        aria-hidden="true"
        role="presentation"
      >
        <div className="relative flex items-center whitespace-nowrap">
          <div
            className={clsx(
              'marquee-track animate-marquee flex',
              // slice.primary.direction === 'Right' && 'direction-reverse',
            )}
          >
            {/* Content to duplicate */}
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Marquee

function MIcon(props: LucideProps) {
  return (
    <svg
      width="33"
      height="33"
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20.1667 14L16.8333 4L13.5 14L3.5 17.3334L13.5 20.6667L16.8333 30.6667L20.1667 20.6667L30.1667 17.3334L20.1667 14ZM16.8333 19.6C15.6333 19.6 14.5667 18.6667 14.5667 17.3334C14.5667 16.1334 15.5 15.0667 16.8333 15.0667C18.0333 15.0667 19.1 16 19.1 17.3334C19.1 18.5334 18.0333 19.6 16.8333 19.6Z"
        fill="#0C0C0C"
      />
    </svg>
  )
}
