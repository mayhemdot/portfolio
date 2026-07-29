"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type React from "react";
import { useRef } from "react";
import type { AboutUs as AboutUsProps } from "@/payload/payload-types";
import FiveIcon from "@/shared/components/icons/FiveIcon";
import TetrisIcon from "@/shared/components/icons/TetrisIcon";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { AboutText } from ".";
import { defaultSkills, type SkillCategory } from "./defaultSkills";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

export const MySkilsList: React.FC<AboutUsProps> = (props) => {
	const { skillsTitle, skillsDescription } = props;
	const containerRef = useRef<HTMLDivElement>(null);
	const accordionRef = useRef<HTMLDivElement>(null);

	const rawSkills =
		props.skills && props.skills.length > 0
			? props.skills
			: props.skillsList && props.skillsList.length > 0
				? props.skillsList
				: defaultSkills;

	const skillCategories: SkillCategory[] = rawSkills.map((cat: any) => ({
		category: cat.category || "",
		items: Array.isArray(cat.items)
			? cat.items.map((item: any) =>
					typeof item === "string"
						? { name: item }
						: { name: item?.name || "" },
				)
			: [],
	}));

	useGSAP(
		() => {
			if (!accordionRef.current) return;

			const items = gsap.utils.toArray<HTMLElement>(
				".skill-accordion-item",
				accordionRef.current,
			);

			if (items.length === 0) return;

			gsap.set(items, {
				opacity: 0,
				x: 60,
				filter: "blur(8px)",
				willChange: "transform, opacity, filter",
			});

			gsap.to(items, {
				opacity: 1,
				x: 0,
				filter: "blur(0px)",
				duration: 0.8,
				ease: "power2.out",
				stagger: 0.15,
				scrollTrigger: {
					trigger: accordionRef.current,
					start: "top 80%",
					toggleActions: "play none none reverse",
				},
			});
		},
		{ scope: containerRef },
	);

	return (
		<section
			ref={containerRef}
			className="relative text-primary-foreground! bg-black min-h-screen fl-pt-120/200"
		>
			<div className="grid grid-cols-8 w-full max-h-full h-full relative fl-gap-24/64 items-start">
				<div className="md:sticky relative md:top-28 self-start flex h-fit col-start-1 md:col-start-2 z-1 col-span-8 md:col-span-3">
					<AboutText
						icon={<TetrisIcon size={48} />}
						title={skillsTitle}
						description={skillsDescription}
					/>
				</div>

				<div
					ref={accordionRef}
					className="col-span-8 md:col-span-3 df-px df-py"
				>
					{skillCategories && (
						<Accordion defaultValue={"item-0"} type="single" collapsible>
							{skillCategories.map((cat, idx) => (
								<AccordionItem
									key={cat.category || idx}
									value={`item-${idx}`}
									className="skill-accordion-item fl-py-24/48 first:pt-0!"
								>
									<AccordionTrigger className="fl-text-20/40 py-0! font-normal!">
										{cat.category}
									</AccordionTrigger>
									<AccordionContent className="fl-text-12/20">
										<ul className="flex flex-wrap gap-2 pt-2">
											{cat.items.map((item, itemIdx) => (
												<li
													key={item.name || itemIdx}
													className="bg-secondary/20 px-3 py-1 rounded-full fl-text-12/16 font-light"
												>
													{item.name}
												</li>
											))}
										</ul>
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					)}
				</div>
			</div>
		</section>
	);
};
