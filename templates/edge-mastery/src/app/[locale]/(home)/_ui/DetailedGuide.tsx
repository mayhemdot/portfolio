import Image from "next/image";
import Link from "next/link";
import { Text } from "@/shared/components/Text";
import { Button } from "@/shared/components/ui/Button";
import { cn } from "@/shared/utils/cn";

export function DetailedGuide({ title }: { title: string }) {
  return (
    <section className="block relative padding-x-4-8-16 pb-16 lg:pb-32 z-2 bg-background">
      <div className="space-y-8 mx-auto">
        <Text comp="h2" variant="gradient" size="lg" className="uppercase mb-8 lg:mb-16">
          {/* Detailed guide */}
          {title}
        </Text>

        <div className="w-full xl:w-2/3 mx-auto space-y-8 ">
          <div className="w-full max-w-full gap-8 box-border flex justify-between overflow-x-auto">
            <DetailedCard name="Authomatic" light="green" imageSrc="/image-authomatic.svg" />
            <DetailedCard name="Fixed" light="orange" imageSrc="/image-fixed.svg" />
            <DetailedCard name="Butterfly" light="red" imageSrc="/image-batterfly.svg" />
          </div>

          <Button className={"uppercase w-full"} variant={"glow"} size={"lg"}>
            More
          </Button>
        </div>
      </div>
    </section>
  );
}

function DetailedCard({
  name,
  light = "green",
  imageSrc = "./",
}: {
  name: string;
  light?: "green" | "red" | "orange";
  imageSrc: string;
}) {
  return (
    <div className="group w-1/3 grow min-w-[280px] relative aspect-9/14 overflow-clip flex flex-col rounded-3xl border border-[#2A2A2A] p-6">
      <div className="absolute h-full left-0 top-0">
        <img className={"w-full h-full block relative object-cover z-0 fill-white"} alt="lines" src={"/lines.svg"} />
        <div
          className={cn(
            "w-[245px] h-[760px] scale-100 transition-all duration-500 mix-blend-soft-light group-hover:contrast-125 contrast-75 rounded-full blur-[120px] z-1 absolute -left-1/6 -top-1/3",
            {
              green: "bg-[#98FFF9]",
              red: "bg-[#F52435]",
              orange: "bg-[#F5A524]",
            }[light],
          )}
        ></div>
      </div>

      <Text comp="h5" size="sm" className="z-2 font-mono shiny-text text-[#e4e4e4a4] duration-1000 font-normal">
        {name}
      </Text>

      <div className="aspect-video relative max-w-full w-full grow z-10">
        <Image src={imageSrc} alt="card-base" fill className="object-contain brightness-400" />
      </div>

      <div className="mt-auto space-y-4 z-2 font-thin text-lg">
        <Text comp="p" variant="secondary" size="xs">
          Infuse your desing with a radiant graiy pattern that
        </Text>
        <Link href={"/"} className="text-[#9C8355]">
          Learn more
        </Link>
      </div>
    </div>
  );
}
