"use client";

import React from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Aurora from "@/shared/components/Aurora";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface PromoRoundBlockProps {
	id: string;
	introContent?: string;
}

export const PromoRoundBlock: React.FC<PromoRoundBlockProps> = ({
	id,
	introContent,
}) => {
	const sectionRef = React.useRef<HTMLDivElement | null>(null);
	const wrapperRef = React.useRef<HTMLDivElement | null>(null);
	const textRef = React.useRef<HTMLParagraphElement | null>(null);
	const auroraRef = React.useRef<HTMLDivElement | null>(null);

	useGSAP(
		() => {
			if (!sectionRef.current || !wrapperRef.current || !textRef.current)
				return;

			const ctx = gsap.context(() => {
				const isMobile = window.innerWidth < 768;
				const targetWidth = isMobile ? "88%" : "34%";

				gsap.set(wrapperRef.current, {
					width: "100%",
					// borderRadius: "0%",
					scale: 1.15,
				});

				gsap.set(textRef.current, {
					opacity: 0,
					y: 60,
					filter: "blur(20px)",
				});

				gsap.set(auroraRef.current, {
					borderRadius: "0%",
					filter: "blur(8px)",
					scale: 1.3,
					y: 120,
				});

				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top top",
						end: "+=170%",
						scrub: 1,
						pin: true,
					},
				});

				tl.to(wrapperRef.current, {
					width: targetWidth,
					// borderRadius: "50%",
					scale: 1,
					duration: 1.2,
					ease: "power2.out",
				})
					.to(
						auroraRef.current,
						{
							y: 0,
							borderRadius: "100%",
							filter: "blur(0px)",

							boxShadow: "0 40px 140px rgba(247,131,54,0.35)",
							scale: 1,
							duration: 1.3,
							ease: "power2.out",
						},
						"<",
					)
					.to(
						textRef.current,
						{
							opacity: 1,
							y: 0,
							filter: "blur(0px)",
							duration: 0.7,
							ease: "power3.out",
						},
						"-=0.4",
					);

				// breathing animation

				gsap.to(wrapperRef.current, {
					scale: 1.04,
					duration: 3,
					repeat: -1,
					yoyo: true,
					ease: "sine.inOut",
				});
			}, sectionRef);

			return () => ctx.revert();
		},
		{ scope: sectionRef },
	);

	return (
		<div
			ref={sectionRef}
			id={`promo-block-${id}`}
			className='relative flex h-screen  w-full items-center justify-center'
		>
			{introContent && (
				<div
					ref={wrapperRef}
					className='promo-round-wrapper aspect-square w-full will-change-transform'
				>
					{/* glow ring */}
					<div className='pointer-events-none absolute inset-0 z-10 rounded-full border border-white/10' />

					{/* text */}
					<span className='absolute left-1/2   top-1/2 z-20  w-[150%] -translate-x-1/2 -translate-y-1/2'>
						{/* <p
							ref={textRef}
							className='fl-text-28/80 text-dark whitespace-pre-line text-center font-medium leading-tight will-change-transform'
						>
							{introContent}
						</p> */}
						<p
							ref={textRef}
							className='promo-round-text fl-text-28/80 text-dark translate-y-[20px] whitespace-pre-line text-center font-medium leading-tight opacity-0 blur-2xl will-change-transform'
						>
							{introContent}
						</p>
					</span>

					{/* aurora background */}
					<div
						ref={auroraRef}
						className='relative z-0 h-full w-full rotate-180 overflow-clip will-change-transform'
					>
						<Aurora
							speed={1.4}
							rounded={500}
							colorStops={["#f1c13b", "#f78336", "#f1c13b"]}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

// "use client";
// import React from "react";
// import { useGSAP } from "@gsap/react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Aurora from "@/shared/components/Aurora";
// gsap.registerPlugin(ScrollTrigger, useGSAP);
// interface PromoRoundBlockProps {
// 	id: string | number;
// 	introContent?: string;
// }
// export const PromoRoundBlock: React.FC<PromoRoundBlockProps> = props => {
// 	const { id, introContent } = props;
// 	const sectionRef = React.useRef<HTMLDivElement | null>(null);
// 	const wrapperRef = React.useRef<HTMLDivElement | null>(null);
// 	const textRef = React.useRef<HTMLParagraphElement | null>(null);
// 	useGSAP(
// 		() => {
// 			if (!sectionRef.current || !wrapperRef.current || !textRef.current)
// 				return;
// 			const ctx = gsap.context(() => {
// 				const targetWidth =
// 					typeof window !== "undefined" && window.innerWidth < 768
// 						? "90%"
// 						: "33%";

// 				gsap.set(textRef.current, {
// 					opacity: 0,
// 					y: 20,
// 					filter: "blur(10px)",
// 				});

// 				gsap.set(wrapperRef.current, {
// 					width: "100%",
// 					borderRadius: "0%",
// 				});

// 				const tl = gsap.timeline({
// 					scrollTrigger: {
// 						trigger: sectionRef.current,
// 						start: "top top",
// 						end: "+=150%",
// 						scrub: true,
// 						pin: true,
// 					},
// 				});
// 				tl.to(wrapperRef.current, {
// 					width: targetWidth,
// 					borderRadius: "100%",
// 					duration: 1,
// 					ease: "none",
// 				}).to(
// 					textRef.current,
// 					{
// 						opacity: 1,
// 						y: 0,
// 						filter: "blur(0px)",
// 						duration: 0.35,
// 					},
// 					"+=0.1",
// 				);
// 			}, sectionRef);
// 			return () => ctx.revert();
// 		},
// 		{ scope: sectionRef },
// 	);
// 	return (
// 		<div
// 			ref={sectionRef}
// 			id={`promo-block-${id}`}
// 			className={
// 				"relative flex h-[100vh] w-full items-center justify-center overflow-hidden"
// 			}
// 		>
// 			<div
// 				id='promo-round-wrapper'
// 				ref={wrapperRef}
// 				className='promo-round-wrapper aspect-square w-full overflow-clip'
// 			>
// 				<span className='absolute left-[50%] top-1/2 z-10 w-full -translate-x-[50%] -translate-y-1/2'>
// 					<p
// 						id='promo-round-text'
// 						ref={textRef}
// 						className='promo-round-text fl-text-28/80 text-dark translate-y-[20px] whitespace-pre-line text-center font-medium leading-tight opacity-0 blur-2xl will-change-transform'
// 					>
// 						{introContent}
// 					</p>
// 				</span>
// 				<div className='relative z-0 h-full w-full max-w-full rotate-180 overflow-clip'>
// 					<div className='relative flex h-full w-full items-center justify-center'>
// 						{/* '#b84f0a' #d2a528 */}
// 						<Aurora
// 							speed={1.4}
// 							rounded={0}
// 							colorStops={["#f1c13b", "#f78336", "#f1c13b"]}
// 						/>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
