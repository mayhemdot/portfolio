"use client";
import { FC, PropsWithChildren, useLayoutEffect } from "react";
import gsap from "gsap";
interface ContainerProps {}

const Container: FC<PropsWithChildren<ContainerProps>> = ({ children }) => {
  useLayoutEffect(() => {
    // HERO SECTION
    gsap.timeline().fromTo(".animationPage", { opacity: 0, y: "5%" }, { opacity: 1, y: "0%", duration: 0.7 });
  }, []);
  return <div className="animationPage container min-h-screen pb-16 pt-4">{children}</div>;
};

export default Container;
