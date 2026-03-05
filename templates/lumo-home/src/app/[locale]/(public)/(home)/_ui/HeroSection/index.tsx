"use client";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ThornsIcon from "@/shared/components/icons/ThornsIcon";
import { TitleBackground } from "@/shared/components/icons/TitleBackground";
import { TitleSvg } from "@/shared/components/icons/TitleSvg";
import { btnVariants } from "@/shared/components/ui/button";
import { SlideUp } from "@/shared/components/animations/SlideUp";
// import BtnCurve from "@/shared/components/icons/BtnCurve";

gsap.registerPlugin(useGSAP);

export function Hero() {
	const scopeRef = React.useRef<HTMLDivElement | null>(null);
	const buttonRef = React.useRef<HTMLAnchorElement | null>(null);
	const timeline = React.useRef(gsap.timeline({ paused: true })).current;

	useGSAP(
		() => {
			// Refs allow you to access DOM nodes
			// then we can animate them like so...
			if (buttonRef.current) {
				buttonRef.current.style.width = "0%";
				buttonRef.current.style.opacity = "0";

				timeline
					.to(
						buttonRef.current,
						{
							opacity: 1,
							duration: 0.1,
						},
						"-=0.4",
					)
					.to(buttonRef.current, {
						width: "74%",
						duration: 0.37,
						ease: "power4.out",
					})
					.to(buttonRef.current.querySelector(".link-text"), {
						opacity: 1,
						duration: 0.37,
						// animation: 'easeInOut',
					});

				timeline.play();
			}
		},
		{ scope: scopeRef },
	);

	return (
		<section
			ref={scopeRef}
			className='hero relative mx-auto mb-32 flex h-[calc(100svh-200px)] grow'
		>
			<div className='fl-mx-8/32 xl:rounded-4xl fl-mt-8/16 bg-secondary relative h-full w-full rounded-2xl'>
				<div className='content-hero relative w-full'>
					<TitleBackground className='pointer-events-none absolute bottom-0 left-1/2 z-0 w-[96%] -translate-x-1/2 translate-y-1/2 lg:w-[76%]' />

					{/* <div className="w-[70%] absolute sm:w-[50%] top-1/2 lg:w-[22%] left-1/2 -translate-x-1/2"> */}
					<SlideUp
						tag='div'
						className='main-image absolute! left-1/2 top-1/2 w-[70%] -translate-x-1/2 sm:w-[50%] lg:w-[22%]'
						timeline={timeline}
						animationDelay={0.1}
						animationDuration={0.3}
					>
						<div className='aspect-9/12 relative'>
							<Image
								src={"/hero__image.png"}
								alt={"hero image"}
								fill
								className='object-cover'
								priority={true}
								sizes='100%'
							/>
						</div>
					</SlideUp>

					<div className='absolute bottom-0 left-[50%] h-fit w-[84%] -translate-x-1/2 sm:w-[76%] lg:w-[45%]'>
						<div className='relative mx-auto mb-12 w-fit font-medium'>
							<span className='fl-text-16/20 relative z-10 tracking-widest'>
								FURNITURE MADE FROM ITALY
							</span>
							<ThornsIcon className='fl-w-60/100 pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2' />
						</div>
						<h1 className='fl-text-120/360 sr-only'>LUMO</h1>
						<SlideUp
							timeline={timeline}
							tag={"h1"}
							animationDelay={-0.1}
							animationDuration={0.6}
						>
							<TitleSvg className='bottom-0 z-10 block h-fit w-full' />
						</SlideUp>
					</div>
				</div>

				<SlideUp
					tag='div'
					className='z-1 fl-text-13/20 bottom-1/5 absolute left-[5%] max-w-[max(20%,220px)] rounded-2xl border border-[#F4F4F4] bg-[#313131/4] p-4 backdrop-blur-xl sm:left-[15%] md:left-[25%]'
					timeline={timeline}
					animationDelay={-0.2}
					animationDuration={0.37}
				>
					Infusing spaces with light and emotion, our unique creations transform
					interiors into art. We don't just design furniture—we curate a
					feeling.
				</SlideUp>
				<div className='hero-button z-1 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 '>
					<Link
						ref={buttonRef}
						className={btnVariants({
							variant: "default",
							size: "xl",
							className:
								"mx-auto! flex! relative z-0 mt-1 items-center justify-center opacity-0 will-change-transform [&>span]:opacity-0",
						})}
						href={"/products"}
					>
						<span className={"link-text text-[length:inherit] opacity-0"}>
							EXPLORE COLLECTION
						</span>

						{/* {t("showMore")} */}
					</Link>
				</div>
			</div>
		</section>
	);
}
