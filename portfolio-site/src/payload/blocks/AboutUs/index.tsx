import type React from "react";
import type { AboutUs as AboutUsProps } from "@/payload/payload-types";
import { Media } from "@/shared/components/Media";
import RichText from "@/shared/components/RichText";
import { AboutUsBackground } from "./AboutUsBackground";
import { MySkilsList } from "./MySkilsList";
import { Skills } from "./SkillsCard";
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
		<section id="about" className="relative text-primary-foreground ">
			<AboutUsBackground />
			<div className="overflow-clip bg-black container rounded-3xl mx-auto z-10 flex items-center h-[150vh]">
				<div className="relative h-[70vh] w-full lg:h-screen">
					<div className="grid grid-cols-8 max-h-full h-full relative">
						<div className="flex items-end lg:items-center h-full col-start-2 md:col-start-2 z-1 col-span-6 md:col-span-4">
							<AboutText icon="" title={title} description={description} />
						</div>

						{media && (
							<Media
								resource={media}
								className="absolute right-0 overflow-clip rounded-tl-3xl rounded-bl-3xl top-0 h-full w-[88%] md:w-2/3 xl:w-1/2 z-0"
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
}: {
	icon: any;
	title: any;
	description: any;
}) {
	return (
		<div className="df-px df-py df-text-space-y-editorial rounded-2xl backdrop-blur-3xl">
			<div className="size-16 bg-accent">IC</div>
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
		</div>
	);
}
