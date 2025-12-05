"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { CSSRulePlugin, ScrollTrigger } from "gsap/all";
import { Text } from "@/shared/components/Text";
import { cn } from "@/shared/utils/cn";

gsap.registerPlugin(ScrollTrigger);

type Tip = { title: string; description: string };

export function Features({ tip1, tip2 }: { tip1: Tip; tip2: Tip }) {
  useGSAP(() => {
    let isActive = false;

    ScrollTrigger.create({
      trigger: ".featuresBlock",
      start: "top top",
      end: `+=${window.innerHeight * 2}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: ({ progress }) => {
        const timeline = gsap.timeline();
        // Между 0.2 и 0.3 - процентами
        const maskSize = progress < 0.2 ? 0 : progress > 0.3 ? 100 : (100 * (progress - 0.2)) / 0.1;
        timeline.to(".maskFeatures", {
          "--maskSize": `${maskSize}%`,
          opacity: progress > 0.15 ? 1 : 0,
        });

        const rule = CSSRulePlugin.getRule(".featuresDevider:before");
        if (progress > 0.2 && progress < 0.75 && !isActive) {
          timeline
            .to(rule, {
              cssRule: {
                width: "3px",
                height: "3px",
              },
              duration: 1,
              ease: "power3.out",
            })
            .to(
              ".featuresDevider",
              {
                width: "100%",
                duration: 1,
                opacity: 1,
                ease: "power3.out",
              },
              "-=0.9",
            )
            .to(
              ".featuresTitle",
              {
                duration: 0.8,
                opacity: 1,
                ease: "power3.out",
              },
              "-=0.1",
            )
            .to(
              ".featuresText",
              {
                duration: 1,
                y: 0,
                opacity: 1,
                ease: "power3.out",
              },
              "-=1",
            );

          isActive = true;
        }

        if ((progress < 0.2 || progress > 0.75) && isActive) {
          timeline
            .to(
              ".featuresTitle",
              {
                duration: 0.6,
                opacity: 0,
                y: "8px",
                ease: "power3.out",
              },
              "-=0.1",
            )
            .to(
              ".featuresText",
              {
                duration: 0.7,
                y: "8px",
                opacity: 0,
                ease: "power3.out",
              },
              "-=0.6",
            )
            .to(rule, {
              cssRule: {
                width: "0px",
                height: "0px",
              },
              duration: 0.6,
              ease: "power3.out",
            })
            .to(
              ".featuresDevider",
              {
                width: "0%",
                duration: 0.5,
                ease: "power3.out",
              },
              "-=0.7",
            );

          isActive = false;
        }
      },
    });

    ScrollTrigger.create({
      trigger: ".featuresBlockOverlay",
      start: "top top",
      end: `+=${window.innerHeight * 2}px`,
      onUpdate: ({ progress }) => {
        const timeline = gsap.timeline();
        const maskSize = progress < 0.1 ? 0 : progress > 0.99 ? 100 : (100 * (progress - 0.1)) / (0.99 - 0.1);
        timeline.to(".maskFeatures2", {
          "--maskSize2": `${maskSize}%`,
          scale: 2,
        });
      },
    });
  }, []);

  return (
    <div className="relative overflow-hidden">
      <section className="featuresBlock max-w-full w-full z-0 h-full min-h-screen relative overflow-hidden">
        <div
          className="maskFeatures z-0 absolute inset-0 bg-neutral-100 opacity-0"
          style={{
            maskImage:
              "radial-gradient(circle at center, black var(--maskSize), transparent calc(var(--maskSize) + 1px))",
            WebkitMaskImage:
              "radial-gradient(circle at center, black var(--maskSize), transparent calc(var(--maskSize) + 1px))",
            "--maskSize": "0%",
          }}
        ></div>
        <div className="px-4 z-1 py-20 lg:px-20 absolute inset-0 top-0 left-0 flex flex-col justify-between">
          <Tooltip title={tip1.title} description={tip1.description} position="left" />

          <Tooltip title={tip2.title} description={tip2.description} position="right" />
        </div>
      </section>
      <div className="z-0 bg-neutral-100 absolute bottom-0 h-[200vh] w-full max-w-full"></div>
      <div className="featuresBlockOverlay relative z-20 w-full h-[200vh] overflow-hidden max-w-full">
        <div
          className="maskFeatures2 absolute top-0 translate-y-1/2 inset-0 bg-background"
          style={{
            maskImage:
              "radial-gradient(circle at center, black var(--maskSize2), transparent calc(var(--maskSize2) + 1px))",
            WebkitMaskImage:
              "radial-gradient(circle at center, black var(--maskSize2), transparent calc(var(--maskSize2) + 1px))",
            "--maskSize2": "0%",
          }}
        ></div>
      </div>
    </div>
  );
}

function Tooltip({ position, title, description }: { position: "left" | "right"; title: string; description: string }) {
  return (
    <div
      className={cn("self-end w-[60%] md:w-1/2", {
        "self-start": position === "left",
        "self-end": position === "right",
      })}
    >
      <Text
        comp="h4"
        variant="primary"
        size="sm"
        className={cn("featuresTitle fadeIn opacity-0 font-sans pb-2 md:pb-4 max-w-[600px]", {
          "mr-auto": position === "left",
          "ml-auto": position === "right",
        })}
      >
        {title}
      </Text>
      <span
        className={cn("featuresDevider", {
          "before:right-0": position === "left",
          "before:left-0": position === "right",
        })}
      ></span>
      <Text
        comp="p"
        variant="primary"
        size="xxs"
        className={cn("featuresText fadeIn translate-y-2 opacity-0 prose max-w-[600px]", {
          "mr-auto": position === "left",
          "ml-auto": position === "right",
        })}
      >
        {description}
        {/* 18% хрома и молибден обеспечивают высокую коррозионную устойчивость.
				Дождь, влажность, кровь, соки растений — всё это не проблема. Ваш нож
				остаётся как новый, независимо от условий. */}
      </Text>
    </div>
  );
}

// const LANG = {
//   en: {
//     tip1: {
//       title: "The strength that trust",
//       description: `Our knives are made using powder metallurgy technology, which makes them incredibly
// 	  				resistant to chipping and impact. This is steel that withstands the demands
// 					of the real world.`,
//     },
//     tip2: {
//       title: "Ready for any environment",
//       description: `18% chromium and molybdenum provide excellent corrosion resistance.
// 					Rain, humidity, blood, plant juices — none of it is a problem.
// 					Your knife stays like new no matter the conditions.`,
//     },
//   },
//   ru: {
//     tip1: {
//       title: "Прочность, которой доверяют",
//       description: `Наши ножи изготовлнеы на основе порошковой технология производства
// 					делает ножи невероятно стойкой к сколам и ударам. Это сталь, которая
// 					выдерживает нагрузки реального мира.`,
//     },
//     tip2: {
//       title: "Готов к любой среде",
//       description: `18% хрома и молибден обеспечивают высокую коррозионную устойчивость.
// 					Дождь, влажность, кровь, соки растений — всё это не проблема. Ваш
// 					нож остаётся как новый, независимо от условий.`,
//     },
//   },
// };
