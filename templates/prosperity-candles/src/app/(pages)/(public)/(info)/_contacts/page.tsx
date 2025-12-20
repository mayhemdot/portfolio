import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Gutter } from "@/components/Gutter";
import { mergeOpenGraph } from "@/lib/meta";
import type { Settings } from "@/payload/payload-types";
// import { Hero } from "@/app/_components/Hero";
import { generateMeta } from "@/utilities/generateMeta";
import ContactPage from "../../[slug]/ContactPage";

export default async function Contacts() {
	// let page: Page | null = null;
	return (
		<Gutter>
			<div>Contact pages</div>
		</Gutter>
	);
	// try {
	// 	page = await fetchDoc<Page>({
	// 		collection: "pages",
	// 		slug: "contacts",
	// 	});
	// } catch (error) {
	// 	// when deploying this template on Payload Cloud, this page needs to build before the APIs are live
	// 	// so swallow the error here and simply render the page with fallback data where necessary
	// 	// in production you may want to redirect to a 404  page or at least log the error somewhere
	// 	// console.error(error)
	// }

	// // if no `cart` page exists, render a static one using dummy content
	// // you should delete this code once you have a cart page in the CMS
	// // this is really only useful for those who are demoing this template
	// if (!page) {
	// 	// TODO: add static content
	// 	page = null;
	// }

	// if (!page) {
	// 	return notFound();
	// }

	// let settings: Settings | null = null;

	// try {
	// 	settings = await fetchSettings();
	// } catch (error) {
	// 	// when deploying this template on Payload Cloud, this page needs to build before the APIs are live
	// 	// so swallow the error here and simply render the page with fallback data where necessary
	// 	// in production you may want to redirect to a 404  page or at least log the error somewhere
	// 	// console.error(error)
	// }

	// return (
	// 	<Fragment>
	// 		<Gutter>
	// 			{/* <Hero {...page?.hero} /> */}
	// 		</Gutter>

	// 		<ContactPage layout={page.layout} />
	// 	</Fragment>
	// );
}

// export const metadata: Metadata = {
//   title: 'Contacts',
//   description: 'Our contacts',
//   openGraph: mergeOpenGraph({
//     title: 'Contacts',
//     url: '/contacts',
//   }),
// }

export async function generateMetadata(): Promise<Metadata> {
	const page: any | null = null;

	// try {
	// 	page = await fetchDoc<Page>({
	// 		collection: "pages",
	// 		slug: "contacts",
	// 	});
	// } catch (error) {
	// 	// don't throw an error if the fetch fails
	// 	// this is so that we can render a static cart page for the demo
	// 	// when deploying this template on Payload Cloud, this page needs to build before the APIs are live
	// 	// in production you may want to redirect to a 404  page or at least log the error somewhere
	// }

	// if (!page) {
	// 	page = {
	// 		meta: {
	// 			title: "Contacts",
	// 			description: "Our contacts",
	// 		},
	// 		slug: "/contacts",
	// 	} as Page;
	// }

	return generateMeta({ doc: page });
}
