"use client";
import { Button } from "@heroui/button";
import { useKeenSlider } from "keen-slider/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CSSProperties, type FC, PropsWithChildren, useState } from "react";
import { Text } from "@/shared/components/Text";
import "keen-slider/keen-slider.min.css";
import { Divider } from "@heroui/react";
import React from "react";
import { cn } from "@/shared/utils/cn";
import type { StoreProduct } from "../../types";
import { ProductPreview } from "../ProductPreview";

const ProductsSlider: FC<{
	bestName: string;
	isWishlisted: boolean;
	products: StoreProduct[];
}> = ({ bestName, products, isWishlisted }) => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const [loaded, setLoaded] = useState(false);

	const [ref, instanceRef] = useKeenSlider<HTMLDivElement>({
		initial: 0,
		loop: true,
		breakpoints: {
			"(min-width: 0px)": {
				slides: {
					perView: 1,
					spacing: 12,
				},
			},
			"(min-width: 576px)": {
				slides: {
					perView: 2,
					spacing: 12,
				},
			},
			// "(min-width: 768px)": {
			//   slides: {
			//     perView: 3,
			//     spacing: 12,
			//   },
			// },
			// "(min-width: 1024px)": {
			//   slides: {
			//     perView: 3,
			//     spacing: 16,
			//   },
			// },
			"(min-width: 1280px)": {
				slides: {
					perView: 3,
					spacing: 16,
				},
			},
			// "(min-width: 1536px)": {
			//   slides: {
			//     perView: 4,
			//     spacing: 16,
			//   },
			// },
			// "(min-width: 1920px)": {
			//   slides: {
			//     perView: 4,
			//     spacing: 16,
			//   },
			// },

			// "(min-width: 2560px)": {
			//   slides: {
			//     perView: 4,
			//     spacing: 16,
			//   },
			// },
			// "(min-width: 24 20px)": {
			//   slides: {
			//     perView: 4,
			//     spacing: 16,
			//   },
			// },
		},
		slideChanged(slider: any) {
			setCurrentSlide(slider.track.details.rel);
		},
		created() {
			setLoaded(true);
		},
	});

	return (
		<div className={cn("hit relative h-full")}>
			<div className='ml-auto w-full 2xl:w-3/4'>
				<div className='w-full'>
					<div className='min-h-12 flex items-center justify-between'>
						<Text size='sm' comp='h3' variant='gradient' className='uppercase'>
							{bestName}
						</Text>
						<span className='fl-gap-8/16 flex items-center'>
							{loaded && (
								<>
									<Button
										isIconOnly
										variant='light'
										onPress={() => instanceRef.current?.prev()}
										disabled={currentSlide === 0}
										className='cursor-pointer'
									>
										<ArrowLeft className='size-6' />
									</Button>
									<span className='~text-lg/xl font-sans font-thin'>
										{currentSlide + 1}/{instanceRef.current?.slides.length}
									</span>
									<Button
										isIconOnly
										variant='light'
										onPress={() => instanceRef.current?.next()}
										disabled={
											currentSlide ===
											(instanceRef.current?.slides.length || 1) - 1
										}
										className='cursor-pointer'
									>
										<ArrowRight className='size-6' />
									</Button>
								</>
							)}
						</span>
					</div>
					<Divider className='mb-8' />
					<div ref={ref} className='keen-slider'>
						{products.map((product, index: number) => (
							<div
								key={product.id}
								className={`keen-slider__slide number-slide${index}`}
							>
								<ProductPreview
									isWishlisted={isWishlisted}
									key={product.id}
									product={product}
									region={null}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductsSlider;

// export const Features = ({
//   children,
//   color,
//   colorDark,
//   className,
// }: PropsWithChildren<{
//   color: string
//   colorDark: string
//   className?: string
// }>) => {
//   const ref = React.useRef<HTMLDivElement>(null)
//   const inView = useInView(ref)

//   return (
//     <section
//       ref={ref}
//       className="py-[8rem]"
// className={cn(
//   "relative flex flex-col items-center rounded-full py-[8rem] z-0",
//   "after:inset-0, after:bg-[radial-gradient(ellipse_100%_40%_at_50%_60%,rgba(var(--feature-color),0.1),transparent))] after:pointer-events-none after:absolute",
//   "before:pointer-events-none before:absolute before:h-[40rem] before:w-full before:translate-y-[-26rem] before:rotate-180 before:scale-[120%] before:bg-[conic-gradient(from_90deg_at_80%_50%,#000212,rgb(var(--feature-color-dark))),conic-gradient(from_270deg_at_20%_50%,rgb(var(--feature-color-dark)),#000212)] before:bg-no-repeat before:transition-[transform,opacity] before:duration-1000 before:ease-in before:[background-position:1%_0%,99%_0%] before:[background-size:50%_100%,50%_100%] before:[mask:radial-gradient(100%_50%_at_center_center,_black,_transparent)] ",
//   className,
//   {
//     "is-visible before:scale-[120%] before:opacity-100": inView,
//     "before:scale-[140%] before:opacity-20": !inView,
//   }
// )}
// style={
//   {
//     "--feature-color": color,
//     "--feature-color-dark": color, //colorDark,
//   } as CSSProperties
// }
// >
//       <span className="fsSubtitle relative">{children}</span>
//     </section>
//   )
// }
