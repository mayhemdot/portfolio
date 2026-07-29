import React from "react";
import type {
	LetsTalkBlock as LetsTalkBlockProps,
	Media as MediaType,
} from "@/payload/payload-types";
import { BlurReveal } from "@/shared/components/Animation/BlurReveal";
import { CMSLink } from "@/shared/components/Link";
import { Media } from "@/shared/components/Media";
import RichText from "@/shared/components/RichText";

export type LetsTalkSectionProps = Partial<LetsTalkBlockProps> & {
	media?: MediaType | string | number | null;
};

export function LetsTalkSection(props: LetsTalkSectionProps) {
	const { title, subtitle, media } = props;

	const mediaResource =
		Array.isArray(media) && media.length > 0
			? (media[0] as any)?.mediaItem || media[0]
			: media;

	return (
		<section
			id="lets-talk"
			className="relative min-h-[130vh] bg-black text-primary-foreground flex flex-col items-center justify-center py-24 df-px overflow-hidden"
		>
			{mediaResource && (
				<Media
					resource={mediaResource}
					fill
					className="absolute inset-0 z-0 w-full h-full"
					pictureClassName="absolute inset-0 w-full h-full block"
					imgClassName="absolute inset-0 w-full h-full object-cover pointer-events-none"
					videoClassName="absolute inset-0 w-full h-full object-cover pointer-events-none"
				/>
			)}

			<div className="lets-talk-text relative z-10 max-w-3xl text-center df-text-space-y">
				{title && (
					<BlurReveal scrollTrigger=".lets-talk-text" delay={0.2}>
						<RichText
							className="fl-text-32/64 font-heading font-normal text-primary-foreground"
							data={title}
							enableGutter={false}
						/>
					</BlurReveal>
				)}
				{subtitle && (
					<BlurReveal scrollTrigger=".lets-talk-text" delay={0.25}>
						<RichText
							className="fl-text-16/20 mx-auto"
							data={subtitle}
							enableGutter={false}
						/>
					</BlurReveal>
				)}
				{/* fl-text-20/40 */}
				<div className="pt-4 flex justify-center">
					<BlurReveal scrollTrigger=".lets-talk-text" delay={0.3}>
						<CMSLink
							url="/contacts"
							size="lg"
							appearance="default"
							className="px-8 py-3 rounded-none bg-accent font-sans font-light fl-text-14/18 hover:bg-accent/80! transition-opacity"
						>
							Get In Touch
						</CMSLink>
					</BlurReveal>
				</div>
			</div>
		</section>
	);
}
