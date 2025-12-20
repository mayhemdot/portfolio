"use client";
// import { Fancybox as NativeFancybox, OptionsType } from '@fancyapps/ui'
import { EffectFlip, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Media } from "@/components/Media";
import { useProductCardContext } from "./ProductCardContext";

const ProductCardSlider = () => {
	const { thumbsSwiper, images } = useProductCardContext();

	return (
		<article className='p-0! h-full w-full max-w-full'>
			<div className='w-full rounded-xl'>
				<Swiper
					modules={[Thumbs, EffectFlip]}
					thumbs={{
						swiper:
							thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
					}}
					className='overflow-hidden! relative aspect-square'
					effect={"flip"}
					allowTouchMove={true}
					spaceBetween={24}
					loop={false}
				>
					{images?.map(image => (
						<SwiperSlide
							key={`image-${image.id}`}
							className='h-full w-full overflow-hidden rounded-3xl'
						>
							{/* <Image src={image.url} data-fancybox="gallery" blurDataURL={image.url} placeholder="blur" fill className="h-full w-full cursor-fancy rounded-2xl object-cover p-8 transition-all" alt={`Изображение товара ${media.alt}`} /> */}
							<Media
								imgClassName={
									"h-full w-full rounded-xl cursor-fancy object-cover transition-all"
								}
								url={image?.url}
								fill
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</article>
	);
};

export default ProductCardSlider;

// const [loaded, setLoaded] = useState<boolean>(true)
// useEffect(() => {
//   const timeout = setTimeout(() => setLoaded(false), 200)
//   return () => clearTimeout(timeout)
// }, [])

// function Fancybox(
//   props: PropsWithChildren<{
//     delegate?: string
//     options?: Partial<OptionsType>
//   }>
// ) {
//   const delegate = props.delegate || '[data-fancybox]'

//   useEffect(() => {
//     // const opts = props.options || {};
//     NativeFancybox.bind(delegate, {})

//     return () => {
//       NativeFancybox.unbind(delegate)
//       NativeFancybox.destroy()
//     }
//   }, [])

//   return <>{props.children}</>
// }
