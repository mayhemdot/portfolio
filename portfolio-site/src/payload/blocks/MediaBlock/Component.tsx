import type { StaticImageData } from "next/image";
import type React from "react";
import type {
	Media,
	MediaBlock as MediaBlockProps,
} from "@/payload/payload-types";
import { Media as MediaComponent } from "@/shared/components/Media";
import RichText from "@/shared/components/RichText";
import { cn } from "@/utilities/ui";

type Props = MediaBlockProps & {
	breakout?: boolean;
	captionClassName?: string;
	className?: string;
	enableGutter?: boolean;
	imgClassName?: string;
	staticImage?: StaticImageData;
	disableInnerContainer?: boolean;
};

export const MediaBlock: React.FC<Props> = (props) => {
	const {
		captionClassName,
		className,
		enableGutter = true,
		imgClassName,
		media,
		staticImage,
		disableInnerContainer,
	} = props;

	let caption: Media["caption"] | undefined;
	if (media && typeof media === "object") caption = media.caption;

	return (
		<div
			className={cn(
				"",
				{
					container: enableGutter,
				},
				className,
			)}
		>
			{(media || staticImage) && (
				<MediaComponent
					imgClassName={cn(
						"border border-border rounded-[0.8rem]",
						imgClassName,
					)}
					resource={media}
					src={staticImage}
				/>
			)}
			{caption && (
				<div
					className={cn(
						"mt-6",
						{
							container: !disableInnerContainer,
						},
						captionClassName,
					)}
				>
					<RichText data={caption} enableGutter={false} />
				</div>
			)}
		</div>
	);
};
