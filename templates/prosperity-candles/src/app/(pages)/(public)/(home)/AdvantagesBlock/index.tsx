"use client";
/* eslint-disable @next/next/no-img-element */
import { Plus } from "lucide-react";
import { Autoplay, FreeMode, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Text } from "@/components/Text";
import { cn } from "@/lib/utils";
import a from "./index.module.scss";

type AdvantagesBlockProps = {
	contentTitle: string;
	contentBody: string;
	cards: { id: number; title: string; description: string }[];
	profits: { id: number; title: string }[];
};

export const AdvantagesBlock = ({ ...props }: AdvantagesBlockProps) => {
	const { contentTitle, cards, profits } = props;

	return (
		<section className={"content-section advantages"}>
			<Text
				comp='h3'
				size={"md"}
				variant={"primary"}
				className={"mb-8 md:mb-12"}
			>
				{contentTitle}
			</Text>
			<div
				className={
					"flex flex-1 flex-col items-center justify-center gap-8 xl:gap-16"
				}
			>
				<div className={"min-h-44 flex w-full items-center justify-center"}>
					<Swiper
						className={"relative h-auto w-full max-w-full"}
						effect={"fade"}
						modules={[FreeMode]}
						breakpoints={{
							0: { slidesPerView: 1, spaceBetween: 8 },
							320: { slidesPerView: 2, spaceBetween: 8 },
							1024: { slidesPerView: 2, spaceBetween: 16 },
							1280: { slidesPerView: 3, spaceBetween: 16 },
							1720: { slidesPerView: 4, spaceBetween: 16 },
						}}
						freeMode={{
							enabled: true,
							minimumVelocity: 0.01,
							momentum: true,
							momentumRatio: 0.7,
						}}
						allowTouchMove={true}
						autoplay={{ delay: 5000 }}
					>
						{cards?.map((card, i: number) => (
							<SwiperSlide
								key={`advantages-${i.toString()}`}
								style={{ height: "auto" }}
								className={cn(a.advantages__item, "min-h-44")}
							>
								<div className='prose flex flex-col items-center justify-center gap-2'>
									<Text
										comp='h3'
										size={"md"}
										variant={"primary"}
										className='self-start overflow-hidden font-medium'
									>
										<strong className='textBlockTextAdvantages block translate-y-[110%] transform will-change-transform'>
											{card.title}
										</strong>
									</Text>
									<div className={"overflow-hidden"}>
										<div
											className={
												"textBlockTextAdvantages prose translate-y-[110%] transform opacity-0 will-change-transform"
											}
										>
											<Text comp='p' size={"smd"} variant={"primary"}>
												{card.description}
											</Text>
										</div>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
				<div className='flex flex-1 flex-col items-center justify-center lg:flex-row'>
					<img
						src={"/images/threebox.png"}
						alt={""}
						className='w-full md:w-1/2'
						width={"594"}
						height={"500"}
					/>
					<div className={"fsNormal flex flex-col gap-2"}>
						{profits?.map(item => (
							<div key={item.id} className={a.feature}>
								<span className='py-4'>{item.title}</span>
								<div className='bg-dark-color text-beige-color h-full rounded-full p-2'>
									<Plus className='size-5' />
								</div>
							</div>
						))}
					</div>
				</div>
				<div className={"mt-8 flex w-full gap-16"}>
					<Swiper
						className='relative w-full overflow-hidden'
						modules={[Mousewheel, Autoplay]}
						onSwiper={swiper => {
							swiper.wrapperEl.style.transitionTimingFunction = "linear";
						}}
						breakpoints={{
							0: { slidesPerView: 1, spaceBetween: 8 },
							768: { slidesPerView: 2, spaceBetween: 8 },
							1024: { slidesPerView: 3, spaceBetween: 16 },
						}}
						preventInteractionOnTransition={true}
						autoplay={{
							delay: 0,
							disableOnInteraction: false,
						}}
						speed={6000}
						slidesPerView={3}
						spaceBetween={"16px"}
						loop={true}
					>
						{[
							{ id: 1, title: "АТМОСФЕРА" },
							{ id: 2, title: "НАСТРОЕНИЕ" },
							{ id: 3, title: "ЧУВСТВЕННОСТЬ" },
							{ id: 4, title: "БОДРОСТЬ" },
							{ id: 5, title: "АТМОСФЕРА" },
							{ id: 6, title: "НАСТРОЕНИЕ" },
							{ id: 7, title: "ЧУВСТВЕННОСТЬ" },
							{ id: 8, title: "БОДРОСТЬ" },
						].map(p => (
							<SwiperSlide
								key={p.id}
								style={{ height: "100%", width: "400px" }}
								className={"fsTitle text-center"}
							>
								{p.title}
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</section>
	);
};
