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

export type MediaRevealProps = {
	children: ReactNode;
	className?: string;
	delay?: number;
	duration?: number;
	initialBlur?: number; // стартовый blur в px
  saturateTo?: number
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

export function MediaReveal({
	children,
	className = "",
	delay = 0,
	duration = 1,
	initialBlur = 12,
	scrollTrigger,
  saturateTo = 1,
}: MediaRevealProps) {
	const containerRef = useRef<HTMLDivElement>(null);

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
			const resolvedTrigger: string | Element | null =
				typeof stTrigger === "string"
					? stTrigger
					: isRefObject(stTrigger)
						? stTrigger.current
						: ((stTrigger as Element | undefined) ?? containerRef.current);

			const scrollTriggerConfig = isStEnabled
				? {
						trigger: resolvedTrigger,
						start: stStart || "top 85%",
						toggleActions: stToggleActions || "play none none none",
						once: stOnce !== undefined ? stOnce : true,
						invalidateOnRefresh: true,
					}
				: undefined;

			gsap.to(containerRef.current, {
				opacity: 1,
				filter: `blur(0px) saturate(${saturateTo})`,
				duration,
				delay,
				ease: "power2.out",
				scrollTrigger: scrollTriggerConfig,
			});
		},
		{
			dependencies: [
				delay,
				duration,
				initialBlur,
				isStEnabled,
				stStart,
				stToggleActions,
				stOnce,
				stTrigger,
			],
		},
	);

	return (
		<div
			ref={containerRef}
			className={cn("shrink-0 w-full h-full", className)}
			style={{
				filter: `blur(${initialBlur}px) saturate(0.8)`,
				willChange: "filter, opacity",
			}}
		>
			{children}
		</div>
	);
}