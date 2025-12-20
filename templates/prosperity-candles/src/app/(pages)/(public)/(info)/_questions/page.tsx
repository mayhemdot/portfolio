import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { Gutter } from "@/components/Gutter";
import { mergeOpenGraph } from "@/lib/meta";
// import { fetchDoc } from "@/app/_api/fetchDoc";
// import { fetchSettings } from "@/app/_api/fetchGlobals";
// import { Hero } from "@/app/_components/Hero";
import { generateMeta } from "@/utilities/generateMeta";

import QuestionsPage from "../../[slug]/QuestionsPage";

export default async function Questions() {
	let page: any | null = null;

	// try {
	// 	page = await fetchDoc<Page>({
	// 		collection: "pages",
	// 		slug: "questions",
	// 	});
	// } catch (error) {
	// 	// when deploying this template on Payload Cloud, this page needs to build before the APIs are live
	// 	// so swallow the error here and simply render the page with fallback data where necessary
	// 	// in production you may want to redirect to a 404  page or at least log the error somewhere
	// 	// console.error(error)
	// }

	// if no `cart` page exists, render a static one using dummy content
	// you should delete this code once you have a cart page in the CMS
	// this is really only useful for those who are demoing this template
	if (!page) {
		// TODO: add static content
		page = null;
	}

	if (!page) {
		return notFound();
	}

	return (
		<Fragment>
			{/* 
      <Gutter>
				<Hero {...page?.hero} />
			</Gutter> 
      */}

			<QuestionsPage layout={page.layout} />
		</Fragment>
	);
}

export async function generateMetadata(): Promise<Metadata> {
	return generateMeta({
		doc: {
			meta: {
				title: "Questions",
				description: "Asking questions",
			},
			slug: "/questions",
		},
	});
}
