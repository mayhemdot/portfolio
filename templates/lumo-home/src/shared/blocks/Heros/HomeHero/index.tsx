"use client";
import { useGSAP } from "@gsap/react";
import type { SlotProps } from "@radix-ui/react-slot";
import { gsap } from "gsap";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { SliderHero } from "@/shared/blocks/Heros/HomeHero/SliderHero";
import { CMSLink } from "@/shared/components/Link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/lib/utils";

gsap.registerPlugin(useGSAP);

export const MainHero: React.FC = () => {
  const scopeRef = React.useRef<HTMLDivElement | null>(null);
  const leftSideRef = React.useRef<HTMLDivElement | null>(null);
  const rightSideRef = React.useRef<HTMLDivElement | null>(null);

  const buttonRef = React.useRef<HTMLAnchorElement | null>(null);
  const timeline = React.useRef(gsap.timeline({ paused: true })).current;

  const t = useTranslations("HomePage.HeroSection");

  useGSAP(
    () => {
      // Refs allow you to access DOM nodes
      // then we can animate them like so...
      if (
        buttonRef.current &&
        buttonRef.current.querySelector(".link-text") &&
        buttonRef.current.querySelector(".link-icon")
      ) {
        buttonRef.current.style.width = "10%";
        buttonRef.current.style.opacity = "0";

        timeline
          .to(
            buttonRef.current,
            {
              opacity: 1,
              duration: 0.1,
            },
            "-=0.4",
          )
          .fromTo(
            leftSideRef.current,
            {
              filter: "blur(200px)",
              y: "2%",
              opacity: 0,
            },
            {
              filter: "blur(0px)",
              opacity: 1,
              y: "0%",
              duration: 0.8,
            },
          )
          .fromTo(
            rightSideRef.current,
            {
              filter: "blur(200px)",
              y: "2%",
              opacity: 0,
            },
            {
              filter: "blur(0px)",
              opacity: 1,
              y: "0%",
              duration: 0.8,
            },
            "-=0.8",
          )
          .fromTo(
            buttonRef.current,
            {
              scale: "0",
            },
            {
              scale: "1",
              duration: 0.6,
            },
            "-=0.8",
          )
          .fromTo(
            buttonRef.current.querySelector(".link-icon"),
            {
              scale: "0",
            },
            {
              scale: "1",
              duration: 0.4,
            },
            "-=0.1",
          )
          .to(buttonRef.current, {
            width: "100%",
            duration: 0.4,
          })
          .to(buttonRef.current.querySelector(".link-text"), {
            opacity: 1,
            duration: 0.1,
            // animation: 'easeInOut',
          });

        timeline.play();
      }
    },
    { scope: scopeRef },
  );

  return (
    <section
      ref={scopeRef}
      className="relative w-full flex items-start h-[calc(100dvh-100px)] mx-auto mb-8 xl:mb-32"
    >
      <div className="padding-default relative w-full h-full">
        <div
          ref={leftSideRef}
          className="grow opacity-0 z-0 absolute left-0 top-0 xl:block w-full pt-24 md:w-1/2 xl:w-1/3 h-full md:pt-8 xl:pt-10"
        >
          <div className="relative h-fit">
            <SliderHero />
          </div>
          <div className="lg:inline-flex hidden flex-col p-2 xl:p-4 rounded-2xl leading-tight text-center gap-0 bg-secondary">
            <span className="fl-text-20/24 font-normal">
              100<span style={{ fontFamily: "Arial" }}>%</span>
            </span>
            <span className="fl-text-20/24 font-normal">Safety Guarantee</span>
          </div>
        </div>

        <div className="mx-auto relative h-full z-10 w-full xl:w-1/3 fl-pt-96/192">
          <div className="flex absolute w-fit left-1/2 -translate-x-1/2 translate-y-[60%] xl:translate-y-[40%] top-0 z-10 mx-auto flex-col gap-4 xl:gap-8 justify-center">
            <div>
              <SlideUp
                timeline={timeline}
                tag={"h1"}
                className={
                  "fl-text-80/140 text-nowrap font-medium leading-tight!"
                }
                animationDelay={0}
              >
                LUMO HOME
              </SlideUp>
              <SlideUp
                timeline={timeline}
                tag={"div"}
                className={
                  "fl-text-32/58 text-nowrap leading-tight! mb-4 xl:mb-8"
                }
                animationDelay={0}
              >
                {/* Modern Lightning & Furniture */}
                {t("title")}
              </SlideUp>
              <SlideUp
                tag={"p"}
                timeline={timeline}
                animationDelay={0}
                className={"fl-max-w-260/340 fl-text-16/20 self-end ml-auto"}
              >
                {t("description")}
                {/* Infusing spaces with light and emotion, our unique creations
                transform interiors into art. We don't just design furniture —
                we curate a feeling. */}
              </SlideUp>
            </div>
            {/* <p className="fl-max-w-260/340 text-fluid self-end">
            Infusing spaces with light and emotion, our unique creations
            transform interiors into art. We don't just design furniture—we
            curate a feeling.
          </p> */}

            <CMSLink
              ref={buttonRef}
              className={
                "mx-auto max-w-[460px] w-[16%] opacity-0 [&>span]:opacity-0"
              }
              size={"xl"}
              appearance={"default"}
              icon={ChevronRight}
              label={t("showMore")}
              url={"/products"}
            />
          </div>

          <div className="backdrop-blur-2xl z-0 absolute xl:hidden top-0 left-0 translate-x-[-10%] w-[120%] h-[110%] translate-y-[-10%]" />
        </div>

        <div
          ref={rightSideRef}
          className="heroRightSide opacity-0 grow z-10 absolute right-0 top-0 xl:block xl:w-1/3 h-full py-4 md:py-8 xl:py-10"
        >
          <div className="flex items-center h-full flex-col justify-start">
            <div className="flex flex-col w-full max-w-65 grow gap-2 items-end">
              <Badge size={"sm"} variant={"outline"} className="fl-text-20/24">
                {/* 1000+ Happy clients */}
                <span className="font-medium fl-text-20/24">{t("ourClients.title")}</span> {t("ourClients.description")}
              </Badge>
              <Badge size={"sm"} variant={"outline"} className="fl-text-20/24">
                <span className="font-medium fl-text-20/24">{t("ourDesign.title")}</span> {t("ourDesign.description")}
              </Badge>
            </div>
            <div className="p-3 space-y-3 w-fit max-w-65 bg-secondary rounded-2xl mb-[10%]">
              <Badge
                variant={"outline"}
                className="fl-text-20/24 w-full bg-background"
              >
                {t("topSale")}
              </Badge>

              <div className="flex flex-row gap-2 w-fit">
                {[
                  {
                    src: "/images/product_2.jpg",
                  },
                  {
                    src: "/images/product_3.jpg",
                  },
                  {
                    src: "/images/product_4.jpg",
                  },
                  {
                    src: "/images/product_5.jpg",
                  },
                ].map(({ src }, i) => (
                  <Avatar
                    key={src}
                    className={cn("size-[52px] xl:size-[68px]", {
                      "-ml-[24px]": i > 0,
                    })}
                  >
                    <AvatarImage src={src} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

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
        "will-change-transform opacity-0 blur-2xl translate-y-[20px]",
        className,
      )}
    >
      {children}
    </Comp>
  );
}
