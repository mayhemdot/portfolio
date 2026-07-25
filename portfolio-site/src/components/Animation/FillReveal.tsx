"use client";

import { useRef, useLayoutEffect, ReactNode } from "react";
import gsap from "gsap";

type FillRevealProps = {
  children: ReactNode;
  className?: string;
  direction?: "ltr" | "rtl";
  fillDuration?: number;
  textDelay?: number;
  fillClassName?: string;
  textClassName?: string;
  delay?: number;
  textBlur?: number; // сила блюра на старте, px
};

export function FillReveal({
  children,
  className = "",
  direction = "rtl",
  fillDuration = 1.2,
  textDelay = 0.2,
  fillClassName = "bg-secondary",
  textClassName = "",
  delay = 0,
  textBlur = 8,
}: FillRevealProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const fromClip =
        direction === "rtl" ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)";
      const toClip = "inset(0 0 0 0%)";

      const tl = gsap.timeline({ defaults: { ease: "power2.out" }, delay });

      tl.set(fillRef.current, { clipPath: fromClip })
        .set(textRef.current, {
          opacity: 0,
          filter: `blur(${textBlur}px)`,
        })
        .to(fillRef.current, {
          clipPath: toClip,
          duration: fillDuration,
          ease: "power2.inOut",
        })
        .to(
          textRef.current,
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.5,
            ease: "power2.out",
          },
          `-=${textDelay}`
        );
    }, wrapRef);

    return () => ctx.revert();
  }, [direction, fillDuration, textDelay, delay, textBlur]);

  return (
    <div ref={wrapRef} className={`relative w-fit ${className}`}>
      <div ref={fillRef} className={`absolute inset-0 ${fillClassName}`} />
      <div ref={textRef} className={`relative ${textClassName}`}>
        {children}
      </div>
    </div>
  );
}