"use client";

import NextImage, { type StaticImageData } from "next/image";
import React from "react";
import cssVariables from "@/app/cssVariables";
import { cn } from "@/lib/utils";
import type { Props as MediaProps, MediaType } from "../types";
import classes from "./index.module.scss";

const { breakpoints } = cssVariables;

export const Image: React.FC<MediaProps> = props => {
	const {
		imgClassName,
		onClick,
		onLoad: onLoadFromProps,
		resource,
		priority,
		fill,
		src: srcFromProps,
		url: urlFromProps,
		alt: altFromProps,
	} = props;

	const [isLoading, setIsLoading] = React.useState(true);

	let width: number | undefined | null;
	let height: number | undefined | null;
	let alt = altFromProps;
	let src: StaticImageData | string = srcFromProps || urlFromProps || "";

	if (!src && resource && typeof resource !== "string") {
		const {
			width: fullWidth,
			height: fullHeight,
			filename: fullFilename,
			alt: altFromResource,
		} = resource as MediaType;

		width = fullWidth;
		height = fullHeight;
		alt = altFromResource;

		const filename = fullFilename;

		src = `${process.env.NEXT_PUBLIC_SERVER_URL}/images/${filename}`;
	}

	// NOTE: this is used by the browser to determine which image to download at different screen sizes
	const sizes = Object.entries(breakpoints)
		.map(([, value]) => `(max-width: ${value}px) ${value}px`)
		.join(", ");

	return (
		<NextImage
			className={cn(classes.image, imgClassName, {
				[classes.placeholder]: isLoading,
			})}
			src={src}
			alt={alt || ""}
			onClick={onClick}
			onLoad={() => {
				setIsLoading(false);
				if (typeof onLoadFromProps === "function") {
					onLoadFromProps();
				}
			}}
			fill={fill}
			width={!fill ? width || undefined : undefined}
			height={!fill ? height || undefined : undefined}
			sizes={sizes}
			priority={priority}
		/>
	);
};
