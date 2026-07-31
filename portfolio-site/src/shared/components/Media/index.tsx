import type React from "react";
import { ImageMedia } from "./ImageMedia";
import type { Props } from "./types";
import { VideoMedia } from "./VideoMedia";

export const Media: React.FC<Props> = (props) => {
	const { className, htmlElement = "div", resource, src } = props;

	const isVideo = checkIsVideo(resource, src);

	if (!htmlElement) {
		return isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />;
	}

	const Tag: any = htmlElement;
console.log(props.src)
	return (  
		<Tag className={className}>
			{isVideo ? (
				<VideoMedia {...props} />
			) : (
				<ImageMedia
					{...props}
					blurDataURL={
						(props?.blurDataURL ||
							(typeof props.resource === "object"
								? props.resource?.blurDataURL
								: undefined)) ?? undefined
					}
				/>
			)}
		</Tag>
	);
};

function checkIsVideo(
	resource: Props["resource"],
	src: Props["src"],
): boolean {
	if (typeof resource === "object" && resource?.mimeType) {
		return resource.mimeType.includes("video");
	}
	const urlToCheck =
		typeof resource === "string"
			? resource
			: typeof src === "string"
				? src
				: typeof resource === "object"
					? resource?.url || resource?.filename
					: "";

	if (urlToCheck) {
		const cleanUrl = urlToCheck.split("?")[0].toLowerCase();
		return /\.(mp4|webm|ogg|ogv|mov|m4v)$/i.test(cleanUrl);
	}

	return false;
}
