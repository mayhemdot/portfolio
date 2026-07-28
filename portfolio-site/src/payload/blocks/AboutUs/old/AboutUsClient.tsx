"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";

export function AboutUsClient() {
	const projectsContainerRef = React.useRef(null);

	useGSAP(
		() => {
			gsap.to(projectsContainerRef.current, {
				scrollTrigger: projectsContainerRef.current,
				scale: 1.2,
				duration: 1,
				ease: "power4.inOut",
			});
		},
		{
			scope: projectsContainerRef,
		},
	);
	return (
		<div className="min-h-[200vh] bg-red-400" ref={projectsContainerRef}></div>
	);
}
