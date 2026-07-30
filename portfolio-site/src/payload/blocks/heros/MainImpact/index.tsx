"use client";
export { MainImpactFields } from "./config";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";
import { FillReveal } from "@/shared/components/Animation/FillReveal";
import { CMSLink } from "@/shared/components/Link";
import RichText from "@/shared/components/RichText";

import { CAMERA_CONFIG, type CameraPose, Scene } from "./Scene3d";

const TOTAL_DURATION = 2.0;

export const MainImpactComponent: React.FC<any> = (props) => {
	const { richText, eyebrow, subtitle, items, links } = props;
	// console.log("MainImpactComponent props >>", items);
	const heroRef = React.useRef<HTMLDivElement>(null);
	const heroContentRef = React.useRef<HTMLDivElement>(null);
	const heroLeftRef = React.useRef<HTMLDivElement>(null);
	const heroRightRef = React.useRef<HTMLDivElement>(null);

	const cameraStateRef = React.useRef<CameraPose>({
		...CAMERA_CONFIG.desktop.start,
	});

	useGSAP(() => {
		// ScrollTrigger camera fly-through timeline
		const isMobile = window.innerWidth < 768;
		const config = isMobile ? CAMERA_CONFIG.mobile : CAMERA_CONFIG.desktop;
		cameraStateRef.current = { ...config.start };

		const dissolveTargets = [
			heroContentRef.current,
			heroLeftRef.current,
			heroRightRef.current,
		].filter(Boolean);

		// Set initial states for performance & crispness
		gsap.set(dissolveTargets, {
			opacity: 1,
			filter: "blur(0px)",
			willChange: "filter, opacity",
			pointerEvents: "auto",
		});

		const scrollTl = gsap.timeline({
			scrollTrigger: {
				trigger: document.documentElement,
				start: "top top",
				end: "+=150%",
				pin: heroRef.current,
				scrub: 1,
				invalidateOnRefresh: true,
				pinSpacing: false,
			},
		});
		scrollTl
			.to(cameraStateRef.current, {
				x: config.mid.x,
				y: config.mid.y,
				z: config.mid.z,
				rotX: config.mid.rotX,
				rotY: config.mid.rotY,
				rotZ: config.mid.rotZ,
				fov: config.mid.fov,
				duration: 1,
				ease: "power1.inOut",
			})
			.to(cameraStateRef.current, {
				x: config.end.x,
				y: config.end.y,
				z: config.end.z,
				rotX: config.end.rotX,
				rotY: config.end.rotY,
				rotZ: config.end.rotZ,
				fov: config.end.fov,
				duration: 1,
				ease: "power1.inOut",
			})
			.to(
				dissolveTargets,
				{
					opacity: 0,
					filter: "blur(8px)",
					duration: TOTAL_DURATION * 0.3, // Last 30% of scroll timeline
					ease: "power2.in",
					onComplete: () => {
						gsap.set(dissolveTargets, { pointerEvents: "none" });
					},
					onReverseComplete: () => {
						gsap.set(dissolveTargets, { pointerEvents: "auto" });
					},
				},
				TOTAL_DURATION * 0.7, // Starts at 70% progress
			);
	});

	const renderLeftLinks = () => {
		if (links && links.length > 0) {
			const inlineLinks = links.filter(
				(l: any) => l.link?.appearance !== "default",
			);
			const buttonLinks = links.filter(
				(l: any) => l.link?.appearance === "default",
			);

			const topLinks =
				inlineLinks.length > 0 ? inlineLinks : links.slice(0, -1);

			const bottomLink =
				buttonLinks.length > 0
					? buttonLinks[0]
					: links.length > 1
						? links[links.length - 1]
						: null;

			return (
				<div>
					<FillReveal className={"flex flex-col!"}>
						{topLinks.map((linkItem, idx) => (
							<CMSLink
								key={String(idx)}
								{...linkItem.link}
								className="cursor-pointer df-px df-py-xs rounded-none w-[130px]"
							/>
						))}
					</FillReveal>
					{bottomLink && (
						<CMSLink
							{...bottomLink.link}
							appearance={"default"}
							className="rounded-none w-full df-px df-py-xs"
						/>
					)}
				</div>
			);
		}

		// return (
		// 	<div>
		// 		<FillReveal className={"flex flex-col!"}>
		// 			<CMSLink url={"/telegram"} className="cursor-pointer df-px df-py-xs">
		// 				Telegram
		// 			</CMSLink>
		// 			<CMSLink url={"/contacts"} className="cursor-pointer df-px df-py-xs">
		// 				Bhance
		// 			</CMSLink>
		// 		</FillReveal>
		// 		<CMSLink
		// 			url={"/contacts"}
		// 			appearance={"default"}
		// 			className="rounded-none w-full df-px df-py-xs"
		// 		>
		// 			Contact
		// 		</CMSLink>
		// 	</div>
		// );
	};

	const renderRightContent = ({ items }: { items: any[] }) => {
		if (items && items.length > 0) {
			return (
				<FillReveal className="df-px df-py-xs font-sans fl-text-12/20">
					{items.map((item, idx) => (
						<React.Fragment key={item.id || idx}>
							{idx > 0 && <br />}
							{/* {item.value && (
								<span className="font-semibold mr-2">{item.value}</span>
							)} */}
							{item.label || item.description}
						</React.Fragment>
					))}
				</FillReveal>
			);
		}
		return null;
		// return (
		// <FillReveal className="df-px df-py-xs">
		// 	Art Direction | Web Design | UX & UI
		// 	<br />
		// 	Frontend & Backend Developement
		// 	<br />
		// 	Developement Animation & Interaction E-Commerce
		// </FillReveal>
		// );
	};

	return (
		<section className="hero-wrapper h-[250vh]">
			<div
				ref={heroRef}
				id="home"
				className="flex items-stretch shrink-0 justify-center relative heightWithoutHeader df-px-xs"
			>
				<div
					ref={heroLeftRef}
					className="max-w-[220px] grow h-full flex flex-col df-gap-2-6 justify-end absolute left-0 df-px z-0"
				>
					{renderLeftLinks()}
				</div>

				<div
					ref={heroContentRef}
					className="grow text-center self-center z-10 flex flex-col items-center justify-center"
				>
					{eyebrow && (
						<span className="fl-text-14/18 uppercase tracking-widest text-muted-foreground mb-2">
							{eyebrow}
						</span>
					)}
					{richText && (
						<RichText
							className="mb-6 fl-text-46/90 font-heading leading-tight prose xl:mb-8 *:text-foreground"
							data={richText}
							enableGutter={false}
						/>
					)}
					{subtitle && (
						<p className="fl-text-16/24 font-normal italic">{subtitle}</p>
					)}
				</div>

				<div
					ref={heroRightRef}
					className="max-w-[700px] mx-auto mr-2 md:mr-4 z-0 absolute right-0 h-full items-stretch justify-between flex flex-col"
				>
					{renderRightContent({ items })}
				</div>
				<Scene cameraStateRef={cameraStateRef} />
			</div>
		</section>
	);
};

export const MainImpactHero = MainImpactComponent;
