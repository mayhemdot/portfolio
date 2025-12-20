"use client";
import { FC, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const GsapRegister: FC = () => {
  useLayoutEffect(() => {
    const scroller = document.querySelector(".scrollBarok");
    ScrollTrigger.defaults({ scroller: scroller });
    gsap.registerPlugin(ScrollTrigger);
  }, []);
  return null;
};

export default GsapRegister;
