import type React from "react";
import { type ElementType, Fragment } from "react";
import { Image } from "./Image";
import type { Props } from "./types";
import { Video } from "./Video";

export const Media: React.FC<Props> = props => {
	const { className, resource, htmlElement = "div" } = props;

	const isVideo =
		typeof resource === "object" && resource?.mimeType?.includes("video");

	const Tag = (htmlElement as ElementType) || Fragment;

	return (
		<Tag
			{...(htmlElement !== null
				? {
						className,
				  }
				: {})}
		>
			{isVideo ? <Video {...props} loop={false} /> : <Image {...props} />}
		</Tag>
	);
};
