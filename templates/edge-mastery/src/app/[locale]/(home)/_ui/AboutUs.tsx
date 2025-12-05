"use client";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Image from "next/image";
import AwardIcon from "@/shared/components/AwardIcon";
import GlowNewsletter from "@/shared/components/GlowNewsletter";
import H1H from "@/shared/components/H1Horizontal";
import { SceneContext } from "@/shared/components/Scene/SceneContext";
import { Scene } from "@/shared/components/SceneOld/Scene";
import { Text } from "@/shared/components/Text";

export function AboutUs({
	title,
	description1,
	description2,
}: {
	title: string;
	description1: string;
	description2: string;
}) {
	useGSAP(() => {
		gsap
			.timeline({
				scrollTrigger: {
					trigger: ".aboutUs",
					start: "top 30%", // когда секция дойдёт до центра экрана
					toggleActions: "play none none reverse",
				},
			})
			.to(".aboutUsCard", {
				filter: "blur(0px)",
				y: 0,
				duration: 2,
				ease: "power4.out",
				stagger: 0.2, // элементы пойдут по очереди
			})
			.to(
				".aboutUsText",
				{
					opacity: 1,
					filter: "blur(0px)",
					y: 0,
					duration: 1.2,
					ease: "power4.out",
					stagger: 0.2,
				},
				"-=0.5"
			);
	}, []);
	return (
		<section className='aboutUs padding-x-4-8-16 z-2 relative block bg-background pb-16 lg:pb-32'>
			<div className='mx-auto space-y-8'>
				<Text
					comp='h2'
					variant='gradient'
					size='lg'
					className='py-8 uppercase lg:py-16 '
				>
					{/* Excellence <br /> in Every Detail */}
					{title}
				</Text>

				<div className='mx-auto grid w-[80%] items-end gap-y-16 [grid-template-columns:repeat(10,1fr)] [grid-template-rows:auto_auto] md:w-full lg:gap-16 xl:gap-24 2xl:w-2/3'>
					<div className='order-2 col-span-10 w-1/2 lg:order-1 lg:col-span-3 lg:w-full'>
						<div className='aboutUsCard first-image relative aspect-square shrink-0 blur-3xl'>
							<Image
								src={"/harding.png"}
								alt='card-base'
								fill
								className='object-cover'
							/>
						</div>
					</div>
					<div className='aboutUsCard order-1 col-span-10 translate-y-16 overflow-hidden blur-3xl lg:order-2 lg:col-span-4'>
						<div className='aspect-9/12 relative z-0 mx-auto flex h-full w-full max-w-[420px] flex-col items-center justify-between overflow-hidden rounded-3xl lg:max-w-full'>
							<div className='fl-text-16/24 w-full p-6'>Garantie hardnes</div>
							<div className='flex items-center justify-center gap-2 xl:gap-4'>
								<div className='fl-text-58/120 z-10  flex flex-col leading-none text-white/60'>
									<span>62</span>
									<span>65</span>
								</div>
								<div className='fl-text-32/64 text-white/60'>HC</div>
							</div>
							<div className='p-6'></div>
							<Image
								src={"/metal-card.svg"}
								alt='card-base'
								fill
								className='object-cover'
								// style={{
								// 	clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
								// 	//polygon(0 0, 100% 0, 100% 100%, 0 100%)
								// }}
							/>
						</div>
					</div>
					<div className='aboutUsCard relative order-4 col-span-10 ml-auto aspect-square w-1/2 shrink-0 blur-3xl lg:order-3 lg:col-span-3 lg:w-full'>
						<Image
							src={"/sharpness.png"}
							alt='card-base'
							fill
							className='object-cover'
						/>
					</div>

					<div className='aboutUsText min-h-32 order-3 col-span-10 translate-y-16  opacity-0 blur-3xl lg:order-4 lg:col-span-5 lg:row-start-2'>
						<Text variant='secondary' size='xs' comp='p' className='font-thin'>
							{/* We source raw materials directly from the manufacturer and perform both cryogenic and traditional heat
              treatment ourselves. */}
							{description1}
						</Text>
					</div>
					<div className='aboutUsText min-h-32 order-5 col-span-10 translate-y-16 opacity-0 blur-3xl lg:col-span-5 lg:row-start-2 '>
						<Text variant='secondary' size='xs' comp='p' className='font-thin'>
							{/* No matter how hard the steel is, all knives require regular sharpening and maintenance.   */}
							{description2}
						</Text>
					</div>
				</div>
			</div>
		</section>
	);
}
