"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { Text } from "@/shared/components/Text";
import { btnVariants, Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { addToast } from "@heroui/react";

export function Newsletter({ title, warning, placeholder, button }: { title: string; warning: string; placeholder: string; button: string }) {
  
  useGSAP(() => {
    gsap.fromTo(
      ".newsletterGlow",
      {
        filter: "brightness(100%) contrast(0)",
      },
      {
        filter: "brightness(300%) contrast(100%)",
        scrollTrigger: {
          trigger: ".newsletter",
          start: "top top",
        },
        duration: 3,
        ease: "power3.out",
      },
    );
  }, []);
  return (
    <section className="newsletter flex flex-col justify-center relative w-full pb-16 lg:pb-32 3xl:pb-120 overflow-x-clip min-h-svh bg-background z-20">
      <div className="container relative mx-auto max-w-full">
        <div className="aspect-square relative z-1 w-fit mx-auto">
          <Image
            src="/button-3d-ready.png"
            className="relative w-[304px] lg:w-[360px] h-auto z-10"
            width={406}
            height={406}
            alt={""}
            sizes="(max-width: 768px) 304px, (max-width: 1280px) 406px, 100vw"
          />
          {/* <GlowNewsletter className="relative w-[400px] h-fit z-10" /> */}
          {/* <Image src="/button-3d-ready.svg" fill alt={""} /> */}
        </div>

        <img
          className="newsletterGlow w-full scale-75 h-auto absolute z-0 top-[100px] lg:top-0 left-1/2 -translate-y-1/6 -translate-x-1/2"
          width={1000}
          height={1000}
          style={{ filter: "brightness(100%)" }}
          src="newsletter-glow.svg"
          alt=""
        />

        {/* <Image
          src="newsletter-glow.svg"
          alt=""
          className="w-full contrast-0 h-auto absolute z-0 top-[100px] lg:top-0 left-1/2 -translate-x-1/2"
          width={1000}
          height={1000}
          style={{ filter: "brightness(4)" }}
        /> */}

        <div className="mx-auto relative z-10 w-fit -mt-16">
          {/* <h2 className="text-[48px] whitespace-pre-line uppercase font-bold text-bold bg-clip-text text-[#9C8355] text-center lg:text-[62px] 2xl:text-[100px] font-sans leading-tight mb-8 lg:mb-16">
            {title}
          </h2> */}
          <Text
            comp="h2"
            size="xl"
            variant={"gold"}
            className="font-bold text-center fl-text-42/120! uppercase bg-clip-text font-sans leading-tight mb-8 lg:mb-16"
          >
            {/* Subscribe
            <br /> to our newsletter */}
            {title}
          </Text>
          {/* <h2 className="text-[48px] uppercase font-bold  text-transparent text-bold bg-clip-text inline-flex bg-[linear-gradient(126deg,_#8d8c8c_0%,_rgba(255,255,255,0.85)_50.17%,_rgba(141,140,140,0.71)_100%)] text-center lg:text-[62px] 2xl:text-[100px] font-sans  leading-tight mb-8 lg:mb-16">
            Subscribe
            <br /> to our newsletter
          </h2> */}

          <form className="fl-w-220/400 flex-col lg:flex-row w-fit mx-auto flex gap-4">
            {/* <input type="email" placeholder="Your email" className="h-[56px] rounded-full bg-[#27272A] px-8" /> */}
            <Input className="w-full min-w-[320px]" type="email" placeholder={placeholder} variant={"primary"} />
            <button  
              className={btnVariants({ size: "lg", variant: "glow", className: "w-full lg:w-fit" })}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToast({
                  title: warning,
                  color: "warning",
                  variant: "bordered",
                });
              }}>
              {button}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
