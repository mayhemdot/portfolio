"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Lenis from "lenis";
import { useEffect } from "react";
import canUseDOM from "@/utilities/canUseDOM";

export function ScrollSmoothLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	useEffect(() => {
		// Single centralized refresh after DOM mount & document.fonts.ready settle
		if (typeof document !== "undefined" && document.fonts) {
			document.fonts.ready.then(() => {
				ScrollTrigger.refresh();
			});
		} else {
			ScrollTrigger.refresh();
		}
	}, []);

	if (typeof window === "undefined") {
		return <>{children}</>;
	}
	gsap.registerPlugin(ScrollTrigger);

	const lenis = new Lenis();
	lenis.on("scroll", ScrollTrigger.update);

	gsap.ticker.add((time) => {
		lenis.raf(time * 1000);
	});

	gsap.ticker.lagSmoothing(0);

	return <>{children}</>;
}
