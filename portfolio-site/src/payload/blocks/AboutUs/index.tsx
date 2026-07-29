import type React from "react";
import type { AboutUs as AboutUsProps } from "@/payload/payload-types";
import { FillReveal } from "@/shared/components/Animation/FillReveal";
import ChrestIcon from "@/shared/components/icons/ChrestIcon";
import FiveIcon from "@/shared/components/icons/FiveIcon";
import { Media } from "@/shared/components/Media";
import RichText from "@/shared/components/RichText";
import { cn } from "@/shared/lib/utils";
import { AboutUsBackground } from "./AboutUsBackground";
import { defaultSkills, defaultSkillsList } from "./defaultSkills";
import { MySkilsList } from "./MySkilsList";
import { Skills } from "./SkillsCard";

export { defaultSkills, defaultSkillsList };
// import Marquee from "../../Marquee";
// import { InfoAboutUsBlockWrapper } "./AboutUsBackgroundkWrapper";
// import { AboutUsBackground } from "./InfoAboutUsBlockWrapper";

export const AboutUsBlock: React.FC<AboutUsProps> = async (props) => {
	const {
		title,
		description,
		skillsTitle,
		skillsDescription,
		media,
		features,
	} = props;

	return (
		<section id="about" className="relative text-primary-foreground">
			<AboutUsBackground />
			{/* rounded-3xl */}
			<div className="about-content overflow-clip df-px pr-0! bg-black container mx-auto z-10 flex items-center h-screen xl:h-[150vh]">
				<div className="relative h-[65vh] w-full xl:h-screen">
					<div className="grid grid-cols-8 max-h-full h-full relative">
						<div className="flex items-end lg:items-center h-full col-start-1 md:col-start-2 z-1 col-span-6 md:col-span-4">
							<AboutText
								icon={<FiveIcon size={48} />}
								title={title}
								description={description}
								isBlur={true}
							/>
						</div>

						{media && (
							<Media
								resource={media}
								className="absolute right-0 overflow-clip rounded-tl-3xl rounded-bl-3xl top-0 h-full w-[88%] md:w-2/3 2xl:w-1/2 z-0"
								pictureClassName="block w-full max-h-full h-full"
								imgClassName="w-full h-full object-cover"
							/>
						)}
					</div>
				</div>
			</div>

			<Skills />

			<MySkilsList {...props} />
		</section>
	);
};

export function AboutText({
	icon,
	title,
	description,
	isBlur = false,
}: {
	icon: any;
	title: any;
	description: any;
	isBlur?: boolean;
}) {
	return (
		<FillReveal
			className={cn("df-px df-py")}
			scrollTrigger={".about-content"}
			fillClassName="backdrop-blur-3xl"
			textClassName="df-text-space-y"
			textDelay={0.3}
			delay={0.2}
		>
			{/* <div className="size-16 bg-accent">IC</div> */}
			{icon && icon}
			{title && (
				<RichText
					className="fl-text-20/40 font-sans"
					data={title}
					enableGutter={false}
				/>
			)}

			{description && (
				<RichText
					className="fl-text-12/20 max-w-[600px] font-light font-sans"
					data={description}
					enableGutter={false}
				/>
			)}
		</FillReveal>
	);
}
