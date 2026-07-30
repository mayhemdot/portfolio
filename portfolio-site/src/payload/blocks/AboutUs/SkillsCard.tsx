"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLocale } from "next-intl";
import React, { useRef } from "react";
import { CMSLink } from "@/shared/components/Link";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/utilities/ui";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

export function Skills() {
	const containerRef = useRef<HTMLDivElement>(null);
	const locale = useLocale();
	useGSAP(
		() => {
			const mm = gsap.matchMedia();

			mm.add("(max-width: 999px)", () => {
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: containerRef.current, // ".cardsWrapper",
						start: "top top",
						end: `+=${window.innerHeight * 2}px`,
						scrub: 1,
						pin: true,
						pinSpacing: true,
						anticipatePin: 1,
						invalidateOnRefresh: true,
					},
				});
				tl.to("#card-2", {
					rotateZ: 10,
					translateX: "0%",
					translateY: "0%",
					duration: 1,
					ease: "power3.out",
				}).to(
					"#card-3",
					{
						rotateZ: 20,
						translateX: "0%",
						translateY: "0%",
						duration: 1,
						ease: "power3.out",
					},
					">0.2",
				);
			});

			mm.add("(min-width: 1000px)", () => {
				if (!containerRef.current) return;

				const cardContainer =
					containerRef.current?.querySelector(".cardContainer");
				// const cardContainer = document.querySelector(".cardContainer")!;

				let isGapDone = false;
				let isFlipDone = false;

				ScrollTrigger.create({
					trigger: containerRef.current, //".cardsWrapper",
					start: "top top",
					end: `+=${window.innerHeight * 4}px`,
					scrub: 1,
					pin: true,
					pinSpacing: true,
					anticipatePin: 1,
					invalidateOnRefresh: true,
					onUpdate: ({ progress }) => {
						const map = gsap.utils.mapRange;

						if (progress <= 0.25) {
							const widthPercentage = map(0, 0.25, 80, 65, progress);
							gsap.set(cardContainer, { width: `${widthPercentage}%` });
						} else {
							gsap.set(cardContainer, { width: "65%" });
						}

						if (progress >= 0.35 && !isGapDone) {
							gsap.to(cardContainer, {
								gap: "20px",
								duration: 0.5,
								ease: "power3.out",
							});
							gsap.to(["#card-1", "#card-2", "#card-3"], {
								borderRadius: "20px",
								duration: 0.5,
								ease: "power3.out",
							});
							isGapDone = true;
						} else if (progress < 0.35 && isGapDone) {
							gsap.to(cardContainer, {
								gap: "0px",
								duration: 0.5,
								ease: "power3.out",
							});

							gsap.to("#card-1", {
								borderRadius: "20px 0 0 20px",
								duration: 0.5,
								ease: "power3.out",
							});

							gsap.to("#card-2", {
								borderRadius: "0px",
								duration: 0.5,
								ease: "power3.out",
							});

							gsap.to("#card-3", {
								borderRadius: "0 20px 20px 0px",
								duration: 0.5,
								ease: "power3.out",
							});
							isGapDone = false;
						}

						if (progress >= 0.7 && !isFlipDone) {
							gsap.to(".aboutFlipCard", {
								rotationY: 180,
								stagger: 0.1,
								duration: 0.75,
								ease: "power3.inOut",
							});
							gsap.to(["#card-1", "#card-3"], {
								y: 30,
								rotationZ: (i) => [-15, 15][i],
							});
							isFlipDone = true;
						} else if (progress < 0.7 && isFlipDone) {
							gsap.to(".aboutFlipCard", {
								rotationY: 0,
								stagger: -0.1,
								ease: "power3.inOut",
							});
							gsap.to(["#card-1", "#card-3"], {
								y: 0,
								rotationZ: 0,
								duration: 0.75,
								ease: "power3.inOut",
							});
							isFlipDone = false;
						}
					},
				});
			});
		},
		{ scope: containerRef },
	);

	return (
		<div
			ref={containerRef}
			className="cardsWrapper flex justify-center items-center h-full bg-black min-h-dvh dark:bg-card overflow-x-hidden"
		>
			<div className="cardContainer flex justify-center flex-row h-[50%] md:h-fit text-primary-foreground">
				<AboutCard
					id="card-1"
					badge="UI/UX"
					title={"WEB DESIGN"}
					description={
						{
							"en-US": "Prototyping • Landings • Design Systems",
							"ru-RU": "Прототипирование • Лендинги • Дизайн-системы",
						}[locale] || ""
					}
					lightSrc={"/redd-light.png"}
					frontSrc={"/images/cover-11.png"}
					className={"fl-w-220/380"}
				/>
				<AboutCard
					badge="WEB DEVELOPMENT"
					id="card-2"
					title={"FULL-STACK DEVELOPMENT"}
					description={
						{
							"en-US": "Frontend • Backend • Architecture • Databases • API",
							"ru-RU": "Frontend • Backend • Архитектура • Базы данных • API",
						}[locale] || ""
					}
					lightSrc={"/blue-light.png"}
					frontSrc={"/images/cover-22.png"}
					className={"fl-w-220/380"}
				/>

				<AboutCard
					badge="3D MODELING"
					id="card-3"
					title={"3D ARTIST"}
					description={
						{
							"en-US": "3D Modeling • Texturing • Rendering",
							"ru-RU": "3D-моделирование • Текстурирование • Рендеринг",
						}[locale] || ""
					}
					lightSrc={"/green-light.png"}
					frontSrc={"/images/cover-33.png"}
					className={"fl-w-220/380"}
				/>
			</div>
		</div>
	);
}

function AboutCard({
	id,
	title,
	badge,
	description,
	lightSrc,
	className,
	frontSrc,
}: {
	id: string;
	title: string;
	badge: string;
	description: string;
	lightSrc: string;
	className: string;
	frontSrc: string;
}) {
	return (
		<div id={id} className={cn("aboutFlipCard aspect-5/8!", className)}>
			<div className="aboutFlipCardFront">
				<Image
					alt="front image"
					className="object-cover w-full h-full"
					width={600}
					height={800}
					src={frontSrc}
					quality={100}
				/>
			</div>

			<div className="aboutFlipCardBack">
				<div className="relative px-8 py-8 flex justify-between h-full flex-col mx-auto z-10">
					<Badge variant={"outline"} className="text-white font-extralight">
						{badge}
					</Badge>
					<div className="flex flex-col items-center self-center w-fit">
						<h4
							className={"text-center w-fit leading-tight fl-text-20/32! mb-3"}
						>
							{title}
						</h4>
						<p className="font-extralight w-fit text-center text-secondary fl-text-14/16">
							{description}
						</p>
					</div>
					<div></div>
					{/* <CMSLink url={"/about"}>Read more</CMSLink> */}
				</div>
				<Image
					alt="green light"
					className="z-0 translate-y-1/2 inset-0 object-cover"
					fill
					src={lightSrc}
				/>
				<Image
					alt="grade"
					quality={100}
					className="z-1 object-cover inset-0"
					fill
					src={"/grade2.png"}
				/>
			</div>
		</div>
	);
}

// useGSAP(
// 	() => {
// 		const mm = gsap.matchMedia();

// 		mm.add("(min-width: 1000px)", () => {
// 			const container = containerRef.current;
// 			if (!container) return;

// 			const cardContainer =
// 				container.querySelector<HTMLDivElement>(".cardContainer")!;

// 			const cards = gsap.utils.toArray<HTMLElement>(
// 				".aboutFlipCard",
// 				container,
// 			);

// 			const [card1, card2, card3] = cards;

// 			const tl = gsap.timeline({
// 				defaults: {
// 					ease: "none",
// 				},
// 				scrollTrigger: {
// 					trigger: container.querySelector(".cardsWrapper"),
// 					start: "top top",
// 					end: () => `+=${window.innerHeight * 4}`,
// 					scrub: 1,
// 					pin: true,
// 					anticipatePin: 1,
// 					invalidateOnRefresh: true,
// 				},
// 			});

// 			// ------------------------
// 			// Stage 1
// 			// ------------------------

// 			tl.to(
// 				cardContainer,
// 				{
// 					width: "65%",
// 					duration: 1,
// 				},
// 				0,
// 			);

// 			// ------------------------
// 			// Stage 2
// 			// ------------------------

// 			tl.to(
// 				cardContainer,
// 				{
// 					gap: 20,
// 					duration: 1,
// 				},
// 				1.4,
// 			);

// 			tl.to(
// 				cards,
// 				{
// 					borderRadius: 20,
// 					duration: 1,
// 					stagger: 0,
// 				},
// 				1.4,
// 			);

// 			// ------------------------
// 			// Stage 3
// 			// ------------------------

// 			tl.to(
// 				cards,
// 				{
// 					rotationY: 180,
// 					stagger: 0.08,
// 					duration: 1,
// 				},
// 				2.8,
// 			);

// 			tl.to(
// 				card1,
// 				{
// 					rotationZ: -15,
// 					y: 30,
// 					duration: 1,
// 				},
// 				2.8,
// 			);

// 			tl.to(
// 				card3,
// 				{
// 					rotationZ: 15,
// 					y: 30,
// 					duration: 1,
// 				},
// 				2.8,
// 			);

// 			return () => {
// 				tl.kill();
// 			};
// 		});

// 		return () => mm.revert();
// 	},
// 	{ scope: containerRef },
// );
