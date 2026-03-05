"use client";
import type { StaticImageData } from "next/image";
import React, { useRef } from "react";
import type { MediaType } from "@/shared/components/Media/types";
import { Text } from "@/shared/components/Text";
import { cn } from "@/shared/lib/utils";
import { Media } from "../../shared/components/Media";
import { SlideUp } from "@/shared/components/animations/SlideUp";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

type Props = {
	media: MediaType;
	title?: string;
	introContent?: string;
	breakout?: boolean;
	captionClassName?: string;
	className?: string;
	enableGutter?: boolean;
	imgClassName?: string;
	staticImage?: StaticImageData;
	disableInnerContainer?: boolean;
};

export const MediaBlock: React.FC<Props> = props => {
	const {
		captionClassName,
		className,
		enableGutter = true,
		imgClassName,
		media,
		title,
		introContent,
		staticImage,
		disableInnerContainer,
	} = props;

	const scopeRef = useRef<any>(null);
	const caption = media?.caption?.toString() || introContent;
	//   if (media && typeof media === "object") caption = media.caption;
	const timeline = React.useRef(gsap.timeline({ paused: true })).current;
	// ScrollTrigger.create({
	//   trigger: scopeRef.current,
	//   start: "top 80%",
	//   onEnter: () => {
	//     timeline.play();
	//   },
	// });
	useGSAP(
		() => {
			ScrollTrigger.create({
				trigger: scopeRef.current,
				start: "top 80%",
				onEnter: () => {
					timeline.play();
				},
			});
		},
		{
			scope: scopeRef,
		},
	);
	return (
		<div
			ref={scopeRef}
			className={cn(
				"fl-py-32/128 bg-secondary mx-auto flex h-full w-full items-center justify-center xl:min-h-[120dvh]",
				className,
			)}
		>
			{(media || staticImage) && (
				<div className='relative mx-auto max-w-[90%] grow md:max-w-[80%] xl:max-w-[60%]'>
					<div className='w-full space-y-4 pb-8 pt-0 lg:w-2/3 xl:pb-16'>
						{/* <Text
							comp='h4'
							variant={"secondary"}
							size={"lg"}
							className='font-semibold! capitalize leading-tight'
						>
							{title}
						</Text>
						<Text
							comp='p'
							size={"xs"}
							variant={"secondary"}
							className='whitespace-pre-wrap! rounded-2xl'
						>
							{introContent}
						</Text> */}

						<SlideUp
							tag={"h4"}
							timeline={timeline}
							animationDelay={0.1}
							animationDuration={0.23}
							className='font-semibold! fl-text-32/72 leading-tight'
						>
							{title}
						</SlideUp>
						<SlideUp
							tag={"p"}
							timeline={timeline}
							animationDelay={0}
							animationDuration={0.23}
							className='fl-text-16/22 font-normal leading-tight'
						>
							{introContent}
						</SlideUp>
					</div>

					<Media
						// videoClassName='border border-border rounded-[0.8rem] h-full !w-full aspect-video'
						imgClassName={cn(
							"border border-border rounded-[0.8rem] h-full !w-full aspect-video object-cover",
							imgClassName,
						)}
						resource={media}
						src={staticImage}
					/>
					{caption && (
						<div
							className={cn(
								"mt-6",
								{
									container: !disableInnerContainer,
								},
								captionClassName,
							)}
						>
							<Text size={"xs"} comp='p'>
								{caption}
							</Text>
						</div>
					)}
				</div>
			)}
		</div>
	);
};
