import Image from 'next/image'

import s from './AdvantageCard.module.scss'

export interface IAdvantageCardProps {
  title: string
  description: string
  image: any
}

const AdvantageCard = ({ title, description, image }: IAdvantageCardProps) => {
  return (
    <div className="col-span-1 flex flex-col items-center gap-4 md:gap-8">
      <div className={s.advantageCardIcon} area-hidden="true">
        <Image
          src={`/images/${image.src}`}
          width={115}
          height={200}
          alt={image.alt}
          className="advantageCardImage z-10 w-[74px] opacity-0 md:w-[115px]"
        />
      </div>
      <div className={'textBlockAdvantages opacity-0'}>
        <h4 className={'fsMiddle mb-4 font-medium'}>{title}</h4>
        <p className={'fsNormal'}>{description}</p>
      </div>
    </div>
  )
}

export default AdvantageCard
