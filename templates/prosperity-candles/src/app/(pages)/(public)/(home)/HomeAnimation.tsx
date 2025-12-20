"use client";
import gsap from "gsap";
import { type FC, useLayoutEffect } from "react";

const HomeAnimation: FC = () => {
	useLayoutEffect(() => {
		// HERO SECTION
		gsap
			.timeline()
			.to(".rowHide", {
				translateY: "0%",
				duration: 1.2,
				ease: "power4.inOut",
				stagger: {
					amount: 0.4,
				},
			})
			.to(
				".buttonRound",
				{
					scale: 1,
					duration: 2,
					stagger: {
						amount: 0.4,
					},
					ease: "power4.inOut",
				},
				"-=1.4"
			)
			.to(
				".textButtonRound",
				{
					opacity: 1,
					duration: 1,
					stagger: {
						amount: 0.25,
					},
				},
				"-=0.6"
			);

		// WORKFLOW SECTION
		gsap
			.timeline({
				scrollTrigger: {
					trigger: "#workflowTrigger",
					// markers: true,
				},
			})
			.to(".masterBg", {
				clipPath: "inset(0 0% 0 0)",
				duration: 1.4,
				delay: 0.1,
				ease: "power4.inOut",
			})
			.to(
				".master",
				{
					clipPath: "inset(0 0% 0 0)",
					duration: 1.4,
					ease: "power4.inOut",
				},
				"-=1.25"
			)
			.to(
				".masterBg, .master",
				{
					scale: 1,
					duration: 1.2,
					stagger: {
						amount: 0.25,
					},
				},
				"-=1"
			)
			.to(
				".textBlockMaster",
				{
					opacity: 1,
					duration: 1.4,
				},
				"-=1.4"
			);

		// ADVANTAGES SECTION
		// Using variables is looks like "--beforeScale": 1
		gsap
			.timeline({
				scrollTrigger: {
					trigger: ".advantages",
				},
			})
			.to(
				".textBlockTextAdvantages",
				{
					y: "0%",
					opacity: 1,
					duration: 1.4,
					stagger: {
						amount: 0.45,
					},
					ease: "power4.inOut",
				},
				"-=2"
			);

		const textRoundBlur = gsap.utils.toArray('[class*="textRoundBlur"]');
		gsap
			.timeline({
				scrollTrigger: {
					trigger: "#besides",
				},
			})
			.to(".besidesTextBlock", {
				opacity: 1,
				duration: 1,
			})
			.to(
				".besides__image",
				{
					clipPath: "inset(0 0% 0 0)",
					duration: 1.4,
					ease: "power4.inOut",
					stagger: {
						amount: 0.25,
					},
				},
				"-=1.1"
			)
			.to(
				".besides__image",
				{
					scale: 1,
					duration: 1.2,
					stagger: {
						amount: 0.25,
					},
				},
				"-=1.2"
			)
			.to(
				textRoundBlur,
				{
					scale: 1,
					duration: 2,
					ease: "power4.inOut",
				},
				"-=1.4"
			)
			.to(
				".textInRound",
				{
					opacity: 1,
					duration: 1.4,
					ease: "power4.inOut",
				},
				"-=1.2"
			);

		// SUBSCRIBE SECTION
		gsap
			.timeline({
				scrollTrigger: {
					trigger: "#subscribe",
				},
			})
			.to(
				".textBlockSubscribe",
				{
					opacity: 1,
					duration: 1,
				},
				"-=0.4"
			);
		gsap
			.timeline({
				scrollTrigger: {
					trigger: "#subscribe",
					scrub: 1,
					start: "top 80%", //"top bottom",
					end: "top 0%", // "bottom bottom",
					// markers: true,
				},
			})
			.to("#estimate", {
				rotate: 180,
			});
	}, []);
	return <></>;
};

export default HomeAnimation;
