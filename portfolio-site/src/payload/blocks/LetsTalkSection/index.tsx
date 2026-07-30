import type {
	LetsTalkBlock as LetsTalkBlockProps,
	Media as MediaType,
} from "@/payload/payload-types";
import { BlurReveal } from "@/shared/components/Animation/BlurReveal";
import { Media } from "@/shared/components/Media";
import RichText from "@/shared/components/RichText";
import { GetInTouch } from "./GetInTouch";

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
			className="relative min-h-[130vh] bg-black text-primary-foreground flex flex-col items-center justify-center py-24 df-px overflow-clip"
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

				<BlurReveal
					scrollTrigger=".lets-talk-text"
					delay={0.3}
					className="pt-4 mx-auto"
				>
					<GetInTouch />
				</BlurReveal>
			</div>
		</section>
	);
}
