import type React from "react";
import type { AboutUs as AboutUsProps } from "@/payload/payload-types";
import { Media } from "@/shared/components/Media";
import RichText from "@/shared/components/RichText";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { AboutText } from ".";
import { AboutUsBackground } from "./AboutUsBackground";
import { Skills } from "./SkillsCard";
// import Marquee from "../../Marquee";
// import { InfoAboutUsBlockWrapper } "./AboutUsBackgroundkWrapper";
// import { AboutUsBackground } from "./InfoAboutUsBlockWrapper";

export const MySkilsList: React.FC<AboutUsProps> = async (props) => {
	const { skillsTitle, skillsDescription } = props;

	return (
		<section className="relative text-primary-foreground! min-h-screen fl-py-24/64">
			<div className="grid grid-cols-8 w-full max-h-full h-full relative">
				<div className="flex items-end lg:items-center h-full col-start-2 md:col-start-2 z-1 col-span-4 md:col-span-4">
					<AboutText
						icon=""
						title={skillsTitle}
						description={skillsDescription}
					/>
				</div>

				<div className="col-span-2">
					<Accordion defaultValue={["item-1" as const]} type="single">
						<AccordionItem value="item-1">
							<AccordionTrigger className="fl-text-20/40 font-normal!">
								Is it accessible?
							</AccordionTrigger>
							<AccordionContent className="fl-text-12/20">
								Yes. It adheres to the WAI-ARIA design pattern.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</div>
		</section>
	);
};
