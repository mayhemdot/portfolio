"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, type RefObject, useRef } from "react";
import { cn } from "@/shared/lib/utils";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

type TriggerTarget = string | Element | RefObject<Element | null>;

export type FillRevealProps = {
	children: ReactNode;
	className?: string;
	direction?: "ltr" | "rtl";
	fillDuration?: number;
	textDelay?: number;
	fillClassName?: string;
	textClassName?: string;
	delay?: number;
	textBlur?: number; // initial blur, px
	scrollTrigger?:
		| boolean
		| string // shorthand: selector string used directly as trigger
		| {
				start?: string;
				toggleActions?: string;
				once?: boolean;
				trigger?: TriggerTarget;
		  };
};

function isRefObject(value: unknown): value is RefObject<Element | null> {
	return typeof value === "object" && value !== null && "current" in value;
}

export function FillReveal({
	children,
	className = "",
	direction = "rtl",
	fillDuration = 0.7,
	textDelay = 0.2,
	fillClassName = "bg-secondary",
	textClassName = "",
	delay = 0,
	textBlur = 8,
	scrollTrigger,
}: FillRevealProps) {
	const wrapRef = useRef<HTMLDivElement>(null);
	const fillRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);

	const isStEnabled = Boolean(scrollTrigger);
	const stStart =
		typeof scrollTrigger === "object" ? scrollTrigger.start : undefined;
	const stToggleActions =
		typeof scrollTrigger === "object" ? scrollTrigger.toggleActions : undefined;
	const stOnce =
		typeof scrollTrigger === "object" ? scrollTrigger.once : undefined;
	const stTrigger =
		typeof scrollTrigger === "string"
			? scrollTrigger
			: typeof scrollTrigger === "object"
				? scrollTrigger.trigger
				: undefined;

	useGSAP(
		() => {
			// const fromClip =
			// 	direction === "rtl" ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)";

			const resolvedTrigger: string | Element | null =
				typeof stTrigger === "string"
					? stTrigger
					: isRefObject(stTrigger)
						? stTrigger.current
						: ((stTrigger as Element | undefined) ?? wrapRef.current);

			const scrollTriggerConfig = isStEnabled
				? {
						trigger: resolvedTrigger,
						start: stStart || "top 85%",
						toggleActions: stToggleActions || "play none none none",
						once: stOnce !== undefined ? stOnce : true,
						invalidateOnRefresh: true,
					}
				: undefined;

			const tl = gsap.timeline({
				defaults: { ease: "power2.out" },
				delay,
				scrollTrigger: scrollTriggerConfig,
			});
			// .set(fillRef.current, { clipPath: fromClip })
			// .set(textRef.current, {
			// 	opacity: 0,
			// 	filter: `blur(${textBlur}px)`,
			// })
			tl.to(
				fillRef.current,
				{
					clipPath: "inset(0 0 0 0%)",
					duration: fillDuration,
					ease: "power2.inOut",
				},
				`+=${delay}`,
			).to(
				textRef.current,
				{
					opacity: 1,
					filter: "blur(0px)",
					duration: 0.37,
					ease: "power2.out",
				},
				`+=${textDelay}`,
			);
		},
		{
			// scope: wrapRef,
			dependencies: [
				direction,
				fillDuration,
				textDelay,
				delay,
				textBlur,
				isStEnabled,
				stStart,
				stToggleActions,
				stOnce,
				stTrigger,
			],
		},
	);

	return (
		<div ref={wrapRef} className={cn(`relative w-fit`, className)}>
			<div
				ref={fillRef}
				className={cn(`absolute inset-0`, fillClassName)}
				style={{
					clipPath:
						direction === "rtl" ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
				}}
			/>
			<div
				ref={textRef}
				className={cn(`relative opacity-0 blur-md`, textClassName)}
			>
				{children}
			</div>
		</div>

		// <div ref={wrapRef} className={cn(`relative w-fit`, className)}>
		// 	<div ref={fillRef} className={cn(`absolute inset-0`, fillClassName)} />
		// 	<div
		// 		ref={textRef}
		// 		className={cn(`relative opacity-0 blur-none`, textClassName)}
		// 	>
		// 		{children}
		// 	</div>
		// </div>
	);
}
