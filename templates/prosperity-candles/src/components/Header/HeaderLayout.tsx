"use client";
import gsap from "gsap";
import { type PropsWithChildren, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useScrollValue } from "@/utilities/useScrollValue";
import s from "./Header.module.scss";

function HeaderLayout({ children }: PropsWithChildren) {
	useEffect(() => {
		gsap.timeline({
			scrollTrigger: {
				trigger: ".headerAnimation",
				toggleActions: "play none none reverse",
				start: "+=100", // when the top of the trigger hits the top of the viewport
			},
		});
	}, []);

	const { scrollValue, isScrollingUp } = useScrollValue();

	return (
		<header
			className={cn(
				s.header,
				"headerAnimation fl-px-16/96 top-[0%] translate-y-[0%] sm:top-[0%]",
				{
					"top-[100%] -translate-y-[100%]": !isScrollingUp && scrollValue > 600,
				}
			)}
		>
			{children}
		</header>
	);
}

export default HeaderLayout;
