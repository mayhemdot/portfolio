import { useGSAP } from "@gsap/react";
import type { SlotProps } from "@radix-ui/react-slot";
import React from "react";
import { cn } from "@/shared/lib/utils";

export function SlideUp({
  timeline,
  tag = "h1",
  children,
  className,
  animationDelay = 0,
}: {
  timeline?: gsap.core.Timeline;
  tag?:
    | string
    | React.ForwardRefExoticComponent<
        SlotProps & React.RefAttributes<HTMLElement>
      >;
  children: React.ReactNode;
  className?: string;
  animationDelay?: number;
}) {
  const ref = React.useRef<HTMLAnchorElement | null>(null);

  useGSAP(() => {
    if (!ref.current) return;

    ref.current.style.opacity = "0";
    // Refs allow you to access DOM nodes
    const def = {
      opacity: "1",
      y: 0,
      filter: "blur(0px)",
      duration: 0.275,
      // animation: 'ease-in-out',
      animationDelay,
    };
    // then we can animate them like so...
    if (timeline) {
      timeline.to(ref.current, def, `+=${animationDelay}`);
    } else {
      gsap.to(ref.current, def);
    }
  }, []);

  const Comp = tag;
  return (
    <Comp
      ref={ref}
      // initial={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
      // exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
      // animate={{
      //   y: 0,
      //   opacity: 1,
      //   filter: 'blur(0px)',
      //   transition: { duration: 0.5 },
      // }}
      className={cn(
        "translate-y-[20px] opacity-0 blur-2xl will-change-transform",
        className,
      )}
    >
      {children}
    </Comp>
  );
}
