import { LucideProps } from 'lucide-react'

export const avatarIcon = (props: LucideProps) => {
  const { className = '#4A4A4F', ...rest } = props
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...rest}
    >
      <path
        d="M17.9334 22.2146C17.7171 21.0151 16.9849 19.9219 15.8732 19.1389C14.7615 18.3558 13.346 17.9362 11.8906 17.9584C10.4352 17.9805 9.0391 18.4427 7.96236 19.259C6.88562 20.0753 6.20171 21.19 6.03804 22.3954"
        stroke="currentColor"
      />
      <circle cx="12" cy="10.9575" r="3" stroke="currentColor" strokeLinecap="round" />
      <rect x="2.5" y="3.45752" width="19" height="19" rx="3.5" stroke="currentColor" />
    </svg>

    // <svg
    // 	width='24'
    // 	height='24'
    // 	viewBox='0 0 24 24'
    // 	fill='none'
    // 	xmlns='http://www.w3.org/2000/svg'
    // 	{...props}
    // >
    // 	<path
    // 		d='M19 20V18C19 16.9391 18.5786 15.9217 17.8284 15.1716C17.0783 14.4214 16.0609 14 15 14H9C7.93913 14 6.92172 14.4214 6.17157 15.1716C5.42143 15.9217 5 16.9391 5 18V20'
    // 		stroke='#4A4A4F'
    // 		strokeLinecap='round'
    // 		strokeLinejoin='round'
    // 	/>
    // 	<path
    // 		d='M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z'
    // 		stroke='#4A4A4F'
    // 		strokeLinecap='round'
    // 		strokeLinejoin='round'
    // 	/>
    // </svg>

    // <svg
    // 	width='33'
    // 	height='32'
    // 	viewBox='0 0 33 32'
    // 	fill='none'
    // 	{...props}
    // 	xmlns='http://www.w3.org/2000/svg'
    // >
    // 	<path
    // 		d='M16.9854 31C25.2696 31 31.9854 24.2843 31.9854 16C31.9854 7.71573 25.2696 1 16.9854 1C8.70108 1 1.98535 7.71573 1.98535 16C1.98535 24.2843 8.70108 31 16.9854 31Z'
    // 		stroke='#4A4A4F'
    // 		strokeWidth='1.4'
    // 		strokeMiterlimit='10'
    // 	/>
    // 	<path
    // 		d='M21.4854 11.5C21.4854 10.3065 21.0113 9.16195 20.1674 8.31804C19.3234 7.47413 18.1788 7 16.9854 7C15.7919 7 14.6476 7.47413 13.8037 8.31804C12.9598 9.16195 12.4854 10.3065 12.4854 11.5V11.5V14.5C12.4854 15.6935 12.9598 16.8381 13.8037 17.682C14.6476 18.5259 15.7919 19 16.9854 19C18.1788 19 19.3234 18.5259 20.1674 17.682C21.0113 16.8381 21.4854 15.6935 21.4854 14.5V11.5Z'
    // 		stroke='#4A4A4F'
    // 		strokeWidth='1.4'
    // 		strokeMiterlimit='10'
    // 	/>
    // 	<path
    // 		d='M7.1748 27.9551C8.40903 26.5663 9.91832 25.4493 11.6071 24.6746C13.2958 23.9 15.1268 23.4847 16.9845 23.4551C18.7606 23.4764 20.5151 23.8508 22.1451 24.5564C23.7752 25.262 25.2485 26.2847 26.4796 27.5651'
    // 		stroke='#4A4A4F'
    // 		strokeWidth='1.4'
    // 		strokeMiterlimit='10'
    // 	/>
    // </svg>
  )
}
