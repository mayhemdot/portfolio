import type { Metadata } from "next";

import {
	SITE_AUTHORS,
	SITE_DESCRIPTION,
	SITE_LOCALE,
	SITE_NAME,
	SITE_TITLE,
} from "@/modules/common/data/constants";
import { SERVICE_LINKS } from "@/modules/common/data/urls";

export function constructMetadata({
	title = SITE_TITLE,
	description = SITE_DESCRIPTION,
	url = SERVICE_LINKS.HOME,
	image = "/images/og-image.jpg",
	icons = "/favicon.ico",
	noIndex = false,
	onlyName = false,
}: {
	title?: string;
	description?: string;
	image?: string;
	icons?: string;
	url?: string;
	noIndex?: boolean;
	onlyName?: boolean;
} = {}): Metadata {
	return {
		title: onlyName ? title : `${SITE_NAME} | ${title}`,
		description,
		openGraph: {
			title,
			locale: SITE_LOCALE,
			description,
			url,
			authors: SITE_AUTHORS,
			siteName: SITE_NAME,
			images: [
				{
					url: image,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [image],
			// creator: '@evgenii_goryunoff'
		},
		icons,
		metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL!),
		...(noIndex && {
			robots: {
				index: false,
				follow: false,
			},
		}),
	};
}

const defaultOpenGraph: Metadata["openGraph"] = {
	type: "website",
	siteName: SITE_NAME,
	title: SITE_TITLE,
	description: SITE_DESCRIPTION,
	images: [
		{
			url: "/og-image.jpg",
		},
	],
};

export const mergeOpenGraph = (
	og?: Metadata["openGraph"]
): Metadata["openGraph"] => {
	return {
		...defaultOpenGraph,
		...og,
		images: og?.images ? og.images : defaultOpenGraph.images,
	};
};
