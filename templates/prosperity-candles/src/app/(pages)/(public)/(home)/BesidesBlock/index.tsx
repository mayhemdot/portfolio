/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import Link from "next/link";
import { Decor } from "@/components/icons/Icons";
import { Text } from "@/components/Text";
import { cn } from "@/lib/utils";
import type { Media } from "@/payload/payload-types";
import s from "./Besides.module.scss";

const cardStyles = [
	{ style: "row-span-3" },
	{ style: "col-start-4 row-span-2 row-start-1 row-end-3" },
	{ style: "col-start-4 row-span-2 row-start-3" },
];

type BesidesBlockProps = {
	introContent: string;
	description: string;
	cards: {
		id?: number;
		title: string;
		link: {
			url: string;
			label: string;
		};
		media: Media;
	}[];
};

export function BesidesBlock(props: BesidesBlockProps) {
	const { introContent, description, cards } = props;

	return (
		<section id='besides' className='content-section'>
			<Text
				comp='h3'
				size={"md"}
				variant={"primary"}
				className={"mb-8 md:mb-12"}
			>
				{introContent}
			</Text>
			<div className='relative flex w-full flex-col overflow-x-hidden xl:flex-row'>
				<div className='flex flex-1 items-center justify-center'>
					<div className={"fsNormal fl-w-320/700 relative my-48 transform"}>
						<Decor.hero.leftLiefAnimated className='absolute top-0 -translate-y-1/3 translate-x-1/2 transform 2xl:scale-150' />
						<div
							className={
								"besidesTextBlock fsNormal prose relative z-10 rounded-xl p-8 opacity-0 backdrop-blur"
							}
						>
							<Text comp='h3' size={"smd"} variant={"primary"}>
								{description}
							</Text>
						</div>
					</div>
				</div>
				<div className='flex flex-1 justify-center xl:justify-start'>
					<div className='grid w-full max-w-[960px] grid-cols-6 grid-rows-4 gap-4 xl:gap-8'>
						{cards?.map((card, i: number) => (
							<div
								className={cn(
									"relative col-span-3 overflow-hidden rounded-2xl pb-[100%]",
									cardStyles[i].style
								)}
								key={`${card.link.label}`}
							>
								<Image
									src={`/images/${(card?.media as Media)?.filename}`}
									alt={"tasty"}
									className='besides__image absolute h-full w-full scale-125 object-cover will-change-auto'
									style={{ clipPath: "inset(0 100% 0 0)" }}
									fill
								/>
								{/* <Media resource={card.media} htmlElement={"img"} alt={"tasty"} className="besides__image absolute h-full w-full scale-125 object-cover will-change-auto" /> */}
								<div
									className={cn(
										" max-w-2/3 md:max-w-1/3 relative aspect-square w-full scale-0 will-change-transform",
										s.textRoundBlur
									)}
								>
									<Link
										href={card.link.url}
										className={"textInRound text-md opacity-0"}
									>
										{card.link.label}
									</Link>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
