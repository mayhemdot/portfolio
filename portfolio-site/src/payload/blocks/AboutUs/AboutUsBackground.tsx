"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function AboutUsBackground() {
	useGSAP(() => {
		gsap.to(".aboutUsBackground", {
			scrollTrigger: {
				trigger: "#about",
				start: "top bottom",
				end: "top top",
				scrub: true,
			},
			width: "100%",
			// На 90% пути угол все еще 24px, а к 100% быстро становится 0px
			keyframes: {
				"0%": { borderRadius: "24px" },
				"90%": { borderRadius: "24px" },
				"100%": { borderRadius: "0px" },
			},
		});
	});
	// useGSAP(() => {
	// 	gsap.to(".aboutUsBackground", {
	// 		width: "100%",
	// 		ease: "none",
	// 		scrollTrigger: {
	// 			trigger: "#about",
	// 			start: "top bottom",
	// 			end: "top top",
	// 			scrub: true,
	// 			invalidateOnRefresh: false,
	// 			onUpdate: (self) => {
	// 				if (self.progress >= 0.9) {
	// 					gsap.to(".aboutUsBackground", {
	// 						borderRadius: "0px",
	// 						duration: 0.3,
	// 						overwrite: "auto", // Предотвращает конфликт анимаций при быстром скролле
	// 					});
	// 				} else {
	// 					gsap.to(".aboutUsBackground", {
	// 						borderRadius: "24px", // Ваш исходный радиус
	// 						duration: 0.3,
	// 						overwrite: "auto",
	// 					});
	// 				}
	// 			},
	// 		},
	// 	});
	// });

	//
	return (
		<div
			className="
        aboutUsBackground
        bg-black
        dark:bg-card
        -z-10
      "
		/>
	);
}

// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import React from "react";

// export function AboutUsBackground() {
// 	useGSAP(
// 		() => {
// 			const tl = gsap.to(".aboutUsBlock", {
// 				scrollTrigger: {
// 					trigger: ".aboutUsBlock",
// 					start: "top top",
// 					end: `+=${window.innerHeight}px`,
// 					scrub: 1,
// 					pin: true,
// 					pinSpacing: true,
// 				},
// 				// marginLeft: 0,
// 				marginRight: "0px",
// 				marginLeft: "0px",
// 				borderRadius: "0px",
// 				duration: 1,
// 				ease: "power4.inOut",
// 			});

// 			return () => tl.kill();
// 		},
// 		// { scope: '.aboutUsBlock' },
// 	);
// 	return (
// 		<div className="aboutUsBackground rounded-3xl  mx-1 md:mx-2 h-full z-0 bg-black dark:bg-card absolute inset-0 left-0 top-0" />
// 	);
// }
