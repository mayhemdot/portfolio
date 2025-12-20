import type { StaticImageData } from "next/image";
import type React from "react";
import { Gutter } from "@/components/Gutter";
import { Media } from "@/components/Media";
import RichText from "@/components/RichText";
import type { Page } from "@/payload/payload-types";

import classes from "./index.module.scss";

type Props = Extract<Page["layout"][0], { blockType: "mediaBlock" }> & {
	staticImage?: StaticImageData;
	id?: string;
};

export const MediaBlock: React.FC<Props> = props => {
	const { media, position = "default", staticImage } = props;

	let caption;
	if (media && typeof media === "object") caption = media.caption;

	return (
		<div className={classes.mediaBlock}>
			{position === "fullscreen" && (
				<div className={classes.fullscreen}>
					<Media resource={media} src={staticImage} />
				</div>
			)}
			{position === "default" && (
				<Gutter>
					<Media resource={media} src={staticImage} />
				</Gutter>
			)}
			{caption && (
				<Gutter className={classes.caption}>
					<RichText content={caption} />
				</Gutter>
			)}
		</div>
	);
};
