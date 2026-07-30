import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { getPayload, type RequiredDataFromCollectionSlug } from "payload";
import { cache } from "react";
import { RenderHero } from "@/payload/blocks/heros/RenderHero";
import { RenderBlocks } from "@/payload/blocks/RenderBlocks";
import { homeStatic } from "@/payload/endpoints/seed/home-static";
import configPromise from "@/payload/payload.config";
import { LivePreviewListener } from "@/shared/components/LivePreviewListener";
import { PayloadRedirects } from "@/shared/components/PayloadRedirects";
import { generateMeta } from "@/utilities/generateMeta";
import PageClient from "./page.client";

// 1. Тип для Page и generateMetadata
type PageArgs = {
	params: Promise<{
		slug?: string;
		locale?: string;
	}>;
};

// 2. Тип для generateStaticParams
type StaticParamsArgs = {
	params:
		| Promise<{ slug?: string; locale?: string }>
		| { slug?: string; locale?: string };
};

export async function generateStaticParams({ params }: StaticParamsArgs) {
	const resolvedParams = await Promise.resolve(params);
	const locale = resolvedParams?.locale;

	const payload = await getPayload({ config: configPromise });
	const pages = await payload.find({
		collection: "pages",
		draft: false,
		limit: 1000,
		overrideAccess: false,
		pagination: false,
		locale: locale as any,
		select: {
			slug: true,
		},
	});

	return (
		pages.docs
			?.filter((doc) => {
				return doc.slug !== "home";
			})
			.map(({ slug }) => {
				return { slug, locale };
			}) || []
	);
}

export default async function Page({ params: paramsPromise }: PageArgs) {
	const { isEnabled: draft } = await draftMode();
	const { slug = "home", locale } = await paramsPromise;
	// Decode to support slugs with special characters
	const decodedSlug = decodeURIComponent(slug);
	const url = `/${decodedSlug}`;
	let page: RequiredDataFromCollectionSlug<"pages"> | null;

	page = await queryPageBySlug({
		slug: decodedSlug,
		locale,
	});

	// Remove this code once your website is seeded
	if (!page && slug === "home") {
		page = homeStatic;
	}

	if (!page) {
		return <PayloadRedirects url={url} />;
	}

	const { hero, layout } = page;

	return (
		<>
			<PageClient />
			{/* Allows redirects for valid pages too */}
			<PayloadRedirects disableNotFound url={url} />

			{draft && <LivePreviewListener />}

			<RenderHero {...hero} />
			<RenderBlocks blocks={layout} />
			{/* <LetsTalkSection /> */}
		</>
	);
}

export async function generateMetadata({
	params: paramsPromise,
}: PageArgs): Promise<Metadata> {
	const { slug = "home", locale } = await paramsPromise;
	// Decode to support slugs with special characters
	const decodedSlug = decodeURIComponent(slug);
	const page = await queryPageBySlug({
		slug: decodedSlug,
		locale,
	});

	return generateMeta({ doc: page });
}

const queryPageBySlug = cache(
	async ({ slug, locale }: { slug: string; locale: string | undefined }) => {
		const { isEnabled: draft } = await draftMode();

		const payload = await getPayload({ config: configPromise });

		const result = await payload.find({
			collection: "pages",
			draft,
			limit: 1,
			pagination: false,
			overrideAccess: draft,
			depth: 3,
			locale: locale as any,
			where: {
				slug: {
					equals: slug,
				},
			},
		});

		return result.docs?.[0] || null;
	},
);
