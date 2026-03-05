"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { EffectFlip, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Text } from "@/shared/components/Text";
import { cn } from "@/shared/lib/utils";
import { SlideUp } from "@/shared/components/animations/SlideUp";
import React from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP);

export function BenefitsSection() {
	const swiperRef = useRef<any>(null);

	const t = useTranslations("HomePage.BenefitsSection");
	const scopeRef = React.useRef<HTMLDivElement | null>(null);
	const timeline = React.useRef(gsap.timeline({ paused: true })).current;
	const timeline2 = React.useRef(gsap.timeline({ paused: true })).current;
	// const timeline1 = React.useRef(gsap.timeline({ paused: true })).current;

	const imagesRef = useRef<HTMLDivElement[]>([]);

	const addImageRef = (el: HTMLDivElement | null) => {
		if (el && !imagesRef.current.includes(el)) {
			imagesRef.current.push(el);
		}
	};

	useGSAP(
		() => {
			ScrollTrigger.create({
				trigger: scopeRef.current,
				start: "top 80%",
				onEnter: () => {
					timeline.play();
				},
			});
			gsap.fromTo(
				imagesRef.current,
				{
					clipPath: "inset(0 0 100% 0)",
					scale: 1.25,
					y: 80,
				},
				{
					clipPath: "inset(0 0 0% 0)",
					scale: 1,
					y: 0,
					duration: 1.2,
					ease: "power4.out",
					stagger: {
						each: 0.12,
						from: "center",
					},
					scrollTrigger: {
						trigger: scopeRef.current,
						start: "top 30%",
					},
				},
			);
			ScrollTrigger.create({
				trigger: scopeRef.current,
				start: "top -10%",
				onEnter: () => {
					timeline2.play();
				},
			});
		},
		{ scope: scopeRef },
	);

	return (
		<div
			ref={scopeRef}
			className='min-h-svh fl-gap-32/120 fl-px-16/32 my-8 flex flex-col pb-32  xl:my-32'
		>
			<div className='mx-auto w-full max-w-6xl'>
				<div className='w-full grow-0 space-y-4 xl:w-1/2'>
					<SlideUp
						tag={"h4"}
						timeline={timeline}
						animationDelay={0.1}
						animationDuration={0.23}
						className='font-semibold! fl-text-32/72 leading-tight'
					>
						{t("title")}
					</SlideUp>
					<SlideUp
						tag={"p"}
						timeline={timeline}
						animationDelay={0}
						animationDuration={0.23}
						className='fl-text-16/22 font-normal leading-tight'
					>
						{t("description")}
					</SlideUp>
				</div>
			</div>

			<Swiper
				onSwiper={swiper => {
					swiperRef.current = swiper;
					setTimeout(() => swiper.update(), 100);
				}}
				modules={[Navigation, EffectFlip]}
				direction='horizontal'
				// initialSlide={2}
				// autoHeight={true}
				className='mx-0! relative max-h-full min-w-0'
				// className="relative !w-full !mx-0 [.swiper-wrapper]:h-auto [&>.swiper-wrapper]:flex"
				allowTouchMove={true}
				loop={false}
				slidesPerView={2}
				breakpoints={{
					0: {
						slidesPerView: 2,
						spaceBetween: -12,
						initialSlide: 1.4,
					},
					768: {
						slidesPerView: 3,
						spaceBetween: 0,
						initialSlide: 1.4,
					},
					1024: {
						slidesPerView: 4,
						spaceBetween: 0,
						initialSlide: 1,
					},
					1280: {
						slidesPerView: 5,
						spaceBetween: -16,
						initialSlide: 0,
					},
					1920: {
						slidesPerView: 5,
						spaceBetween: -16,
						initialSlide: 0,
					},
				}}
			>
				{[
					{
						id: 1,
						url: "/images/lamp-rose-1.jpg",
						alt: "alt",
						scale: 80,
					},
					{
						id: 2,
						url: "/images/table-violet.jpg",
						alt: "alt",
						scale: 90,
					},
					{
						id: 3,
						url: "/images/chair-red.jpg",
						alt: "alt",
						scale: 100,
					},
					{
						id: 4,
						url: "/images/chair-orange-1.jpg",
						alt: "alt",
						scale: 90,
					},
					{
						id: 5,
						url: "/images/chair-transparent.jpg",
						alt: "alt",
						scale: 80,
					},
					{
						id: 6,
						url: "/images/lamp-orange-1.jpg",
						alt: "alt",
						scale: 90,
					},
				]?.map(image => (
					<SwiperSlide
						key={image.id}
						className={cn(
							`min-h-120 xl:min-h-140 aspect-13/9 flex! items-center! relative h-full w-full`,
						)}
					>
						<div
							ref={addImageRef}
							className='relative w-full overflow-hidden shadow-2xl'
							style={{
								height: `${image.scale}%`,
								clipPath: "inset(0 0 100% 0)",
							}}
						>
							<Image
								src={image.url}
								alt={image.alt}
								fill
								className='block object-cover object-center'
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			<div className='mx-auto flex w-full max-w-6xl justify-end space-y-2'>
				<div className='max-w-175 w-full space-y-4 self-end xl:w-1/2'>
					<SlideUp
						tag={"h4"}
						timeline={timeline2}
						animationDelay={0.1}
						animationDuration={0.23}
						className='font-semibold! fl-text-32/72 leading-tight'
					>
						{t("qualityTitle")}
					</SlideUp>
					<SlideUp
						tag={"p"}
						timeline={timeline2}
						animationDelay={0}
						animationDuration={0.23}
						className='fl-text-16/22 font-normal leading-tight'
					>
						{t("qualityDescription")}
					</SlideUp>
				</div>
			</div>
		</div>
	);
}
