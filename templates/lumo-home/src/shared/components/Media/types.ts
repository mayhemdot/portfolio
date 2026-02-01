import type { StaticImageData } from "next/image";
import type { ElementType, Ref } from "react";

export interface Props {
	src?: StaticImageData; // for static media
	url?: string;
	alt?: string;
	resource?: string | number | MediaType; // for Payload media
	size?: string; // for NextImage only
	priority?: boolean; // for NextImage only
	fill?: boolean; // for NextImage only
	className?: string;
	imgClassName?: string;
	videoClassName?: string;
	htmlElement?: ElementType | null;
  loading?:any,
	onClick?: () => void;
	onLoad?: () => void;
	ref?: Ref<null | HTMLImageElement | HTMLVideoElement>;
}

export interface MediaType {
	id: number;
	alt: {
    en: string;
    ru: string;
  };
	caption?: {
    en: string;
    ru: string;
  };
	updatedAt: string;
	createdAt: string;
	url?: string | null;
	filename?: string | null;
	mimeType?: string | null;
	filesize?: number | null;
	width?: number | null;
	height?: number | null;
	focalX?: number | null;
	focalY?: number | null;
}
