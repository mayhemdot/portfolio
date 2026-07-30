import type React from "react";
import { ImageMedia } from "./ImageMedia";
import type { Props } from "./types";
import { VideoMedia } from "./VideoMedia";

export const Media: React.FC<Props> = (props) => {
	const { className, htmlElement = "div", resource } = props;

	const isVideo =
		typeof resource === "object" && resource?.mimeType?.includes("video");

	if (!htmlElement) {
		return isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />;
	}

	const Tag: any = htmlElement;

	return (
		<Tag className={className}>
			{isVideo ? (
				<VideoMedia {...props} />
			) : (
				<ImageMedia
					{...props}
					blurDataURL={
						props?.blurDataURL ||
						(typeof props.resource === "object"
							? props.resource?.blurDataURL
							: "")
					}
				/>
			)}
		</Tag>
	);
};
