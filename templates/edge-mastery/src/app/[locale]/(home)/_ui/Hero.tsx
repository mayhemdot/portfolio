import Image from "next/image";
import { LocalizedClientLink } from "@/modules/common/components/LocalizedClientLink";
import AwardIcon from "@/shared/components/AwardIcon";
import H1H from "@/shared/components/H1Horizontal";
import { SceneContext } from "@/shared/components/Scene/SceneContext";
import { Text } from "@/shared/components/Text";
import { btnVariants } from "@/shared/components/ui/Button";

export function Hero({
	title = "Premium quality \r\n knife store",
	toCatalogBtn = "Find your knife",
}: {
	title: string;
	toCatalogBtn: string;
}) {
	return (
		<SceneContext>
			<Image
				className={"max-h-svh absolute left-0 top-0 z-0 h-fit w-full"}
				src={"/card-base.png"}
				alt='hero cover image'
				fill
				quality={100}
				sizes='100vw'
				loading='eager'
				priority={true}
			/>
			<section className='hero-wrapper min-h-dvh pointer-events-none relative z-10 -mt-16 h-screen w-full max-w-full'>
				<div className='relative block h-full'>
					<div className='padding-x-4-8-16 fl-px-64/80 pt-18 text-nowrap pointer-events-none absolute left-1/2 z-0 w-full -translate-x-1/2'>
						<H1H className={"w-full max-w-full"} />
					</div>

					<div className='padding-4-8-16 absolute bottom-0 space-y-8 xl:space-y-10 2xl:space-y-12'>
						{/* <p className="font-mono  prose shiny-text w-full duration-1000 font-thin fl-text-32/64 leading-tight">
              {title}
            </p> */}
						<Text
							comp='h1'
							size='lg'
							font='mono'
							variant={"gradient"}
							className={
								"shiny-text pointer-events-none w-full font-thin duration-1000"
							}
						>
							{title}
						</Text>

						<LocalizedClientLink
							href='/products'
							className={btnVariants({
								variant: "glow",
								size: "lg",
								className:
									"pointer-events-auto relative z-20 w-full max-w-[460px]",
							})}
						>
							{toCatalogBtn}
						</LocalizedClientLink>
					</div>

					<div className='bottom-46 fl-w-120/260 padding-4-8-16 pointer-events-none absolute right-0 box-content md:bottom-0'>
						<AwardIcon className='box-content h-full w-full max-w-full' />
					</div>
				</div>
			</section>
		</SceneContext>
	);
}
