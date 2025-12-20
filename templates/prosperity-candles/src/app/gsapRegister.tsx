"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { type FC, useLayoutEffect } from "react";

const GsapRegister: FC = () => {
	useLayoutEffect(() => {
		const scroller = document.querySelector(".scrollBarok");
		ScrollTrigger.defaults({ scroller: scroller });
		gsap.registerPlugin(ScrollTrigger);
	}, []);
	return null;
};

export default GsapRegister;
