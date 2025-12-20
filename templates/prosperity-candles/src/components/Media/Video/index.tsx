"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { Props as MediaProps, MediaType } from "../types";
import classes from "./index.module.scss";

export const Video: React.FC<MediaProps & { loop: boolean }> = props => {
	const { videoClassName, resource, loop, onClick } = props;

	const videoRef = useRef<HTMLVideoElement>(null);
	// const [showFallback] = useState<boolean>()

	useEffect(() => {
		const { current: video } = videoRef;
		if (video) {
			video.addEventListener("suspend", () => {
				// setShowFallback(true);
				// console.warn('Video was suspended, rendering fallback image.')
			});
		}
	}, []);

	if (resource && typeof resource !== "string") {
		const { filename } = resource as MediaType;

		return (
			<video
				playsInline
				autoPlay
				muted
				loop={loop ?? true}
				controls={false}
				className={cn(classes.video, videoClassName)}
				onClick={onClick}
				ref={videoRef}
			>
				<source
					className='object-cover'
					src={`${process.env.NEXT_PUBLIC_SERVER_URL}/video/${filename}`}
				/>
			</video>
		);
	}

	return null;
};
