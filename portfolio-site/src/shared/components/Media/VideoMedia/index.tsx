"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import { getMediaUrl } from "@/utilities/getMediaUrl";
import { cn } from "@/utilities/ui";
import type { Props as MediaProps } from "../types";

export const VideoMedia: React.FC<MediaProps> = (props) => {
	const { onClick, resource, src: srcFromProps, videoClassName } = props;

	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const { current: video } = videoRef;
		if (video) {
			video.addEventListener("suspend", () => {
				// setShowFallback(true);
				// console.warn('Video was suspended, rendering fallback image.')
			});
		}
	}, []);

	let videoSrc = "";

	if (typeof srcFromProps === "string") {
		videoSrc = getMediaUrl(srcFromProps);
	} else if (resource && typeof resource === "object") {
		const { filename, url } = resource;
		videoSrc = getMediaUrl(url || `/media/${filename}`);
	} else if (typeof resource === "string") {
		videoSrc = getMediaUrl(resource);
	}

	if (!videoSrc) return null;

	return (
		<video
			autoPlay
			className={cn(videoClassName)}
			controls={false}
			loop
			muted
			onClick={onClick}
			playsInline
			ref={videoRef}
		>
			<source src={videoSrc} />
		</video>
	);
};
