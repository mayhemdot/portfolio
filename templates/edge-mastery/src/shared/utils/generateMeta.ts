import { getServerSideURL } from "@/shared/utils/getURL";
import { mergeOpenGraph } from "@/shared/utils/mergeOpenGraph";
import type { Metadata } from "next";

export type Page = {
	title?: string;
	slug: string[] | string;
	meta: {
		title: string;
		description: string;
		keywords?: string;
		image: any;
	};
};

export const SITE_NAME = "Edge Mastery";

export const generateMeta = async (args: {
	doc: Page; //| Product;
}): Promise<Metadata> => {
	const { doc } = args || {};

	const ogImage =
		typeof doc?.meta?.image === "object" &&
		doc.meta.image !== null &&
		"url" in doc.meta.image &&
		`${getServerSideURL()}${doc.meta.image.url}`;

	let metaObj = {
		description: doc?.meta?.description,
		openGraph: mergeOpenGraph({
			...(doc?.meta?.description
				? {
						description: doc?.meta?.description,
				  }
				: {}),
			images: ogImage
				? [
						{
							url: ogImage,
						},
				  ]
				: undefined,
			title: doc?.meta?.title || doc?.title,
			url: Array.isArray(doc?.slug) ? doc?.slug.join("/") : "/",
		}),
		title: doc?.meta?.title || doc?.title,
	} as any;
	if (doc?.meta?.keywords) {
		metaObj["keywords"] = doc?.meta?.keywords;
	}
	return metaObj;
};
