import type {
	LetsTalkBlock as LetsTalkBlockProps,
	Media as MediaType,
} from "@/payload/payload-types";
// import { BlurReveal } from "@/shared/components/Animation/BlurReveal";
import { FillReveal } from "@/shared/components/Animation/FillReveal";
import { Media } from "@/shared/components/Media";
import RichText from "@/shared/components/RichText";
import { GetInTouch } from "./GetInTouch";
import { MediaReveal } from "@/shared/components/Animation/MediaReveal";

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
			className="relative min-h-screen bg-black text-primary-foreground flex flex-col items-center justify-center df-px overflow-clip"
		>
			<div className="lets-talk-text">
				{mediaResource && (
        <MediaReveal 
          scrollTrigger={".lets-talk-text"}
          className="absolute inset-0 z-0 w-full h-full backdrop-blur-3xl"
          //  className="backdrop-blur-3xl absolute right-0 top-0 w-[88%] md:w-2/3 2xl:w-1/2 z-0"
           duration={0.7}
           delay={0}>
					<Media
						resource={mediaResource}
						blurDataURL={
							"data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAABQAQCdASoQAAkABUB8JZwABDOAAP7vyfqFR+cYp10sP3Ja+rsaqrG4AAA="
						}
						fill
						
						pictureClassName="absolute inset-0 w-full h-full block"
						imgClassName="absolute inset-0 w-full h-full object-cover object-[70%] pointer-events-none"
						videoClassName="absolute inset-0 w-full h-full object-cover pointer-events-none"
					/>
        </MediaReveal>
				)}
				{/* <div className="lets-talk-text relative z-10 max-w-3xl text-center df-text-space-y df-px df-py backdrop-blur-3xl"> */}
				{title && subtitle && (
					<FillReveal
						className={"df-px df-py"}
						scrollTrigger={".lets-talk-text"}
						fillClassName="backdrop-blur-3xl"
						textClassName="df-text-space-y"
						textDelay={0}
						delay={0}
					>
						<RichText
							className="fl-text-32/64 leading-tight font-heading font-normal text-primary-foreground"
							data={title}
							enableGutter={false}
						/>
						<RichText
							className="fl-text-16/20 mx-auto"
							data={subtitle}
							enableGutter={false}
						/>
						<GetInTouch className="mt-4" />
					</FillReveal>
				)}
				{/* {title && (
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
				</BlurReveal> */}
			</div>
		</section>
	);
}
