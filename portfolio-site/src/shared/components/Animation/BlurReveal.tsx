"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, type RefObject, useRef } from "react";
import { cn } from "@/shared/lib/utils";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

export type TriggerTarget = string | Element | RefObject<Element | null>;

export type BlurRevealProps = {
	children?: ReactNode;
	className?: string;
	contentClassName?: string;
	duration?: number;
	textBlur?: number; // initial blur amount, px
	delay?: number;
	ease?: string;
	scrollTrigger?:
		| boolean
		| string
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

export function BlurReveal({
	children,
	className = "",
	contentClassName = "",
	duration = 0.5,
	textBlur = 8,
	delay = 0,
	ease = "power2.out",
	scrollTrigger,
}: BlurRevealProps) {
	const wrapRef = useRef<HTMLDivElement>(null);
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
			const resolvedTrigger: Element | null =
				typeof stTrigger === "string"
					? document.querySelector(stTrigger)
					: isRefObject(stTrigger)
						? stTrigger.current
						: ((stTrigger as Element | undefined) ?? wrapRef.current);

			if (isStEnabled && !resolvedTrigger) {
				console.warn(
					`[BlurReveal] scrollTrigger target not found for:`,
					stTrigger,
				);
			}

			const scrollTriggerConfig = isStEnabled
				? {
						trigger: resolvedTrigger,
						start: stStart || "top 85%",
						toggleActions: stToggleActions || "play none none none",
						once: stOnce !== undefined ? stOnce : true,
						invalidateOnRefresh: true,
					}
				: undefined;

			gsap
				.timeline({
					defaults: { ease },
					scrollTrigger: scrollTriggerConfig,
					// delay,
				})
				.to(
					textRef.current,
					{
						opacity: 1,
						filter: "blur(0px)",
						duration,
					},
					`+=${delay}`,
				);
		},
		{
			scope: wrapRef,
			dependencies: [
				duration,
				textBlur,
				delay,
				ease,
				isStEnabled,
				stStart,
				stToggleActions,
				stOnce,
				stTrigger,
			],
		},
	);

	return (
		<div ref={wrapRef} className={cn("relative w-fit", className)}>
			<div
				ref={textRef}
				className={cn("relative opacity-0", contentClassName)}
				style={{
					filter: `blur(${textBlur}px)`,
				}}
			>
				{children}
			</div>
		</div>
	);
}
