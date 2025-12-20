import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { Gutter } from "@/components/Gutter";
// import { fetchDoc } from "@/app/_api/fetchDoc";
// import { fetchSettings } from "@/app/_api/fetchGlobals";
// import { Hero } from "@/components/Hero";
import { mergeOpenGraph } from "@/lib/meta";
import type { Settings } from "@/payload/payload-types";
import { generateMeta } from "@/utilities/generateMeta";
import DeliveryPage from "../../[slug]/DeliveryPage";

export default async function Contacts() {
	const page: any | null = null;

	return (
		<Fragment>
			{/* <Gutter>
				<Hero {...page?.hero} />
			</Gutter> */}

			<DeliveryPage layout={page.layout} />
		</Fragment>
	);
}

// export const metadata: Metadata = {
//   title: 'Delivery',
//   description: 'Our delivery options',
//   openGraph: mergeOpenGraph({
//     title: 'Delivery',
//     url: '/delivery',
//   }),
// }

export async function generateMetadata(): Promise<Metadata> {
	const page: any | null = null;

	// try {
	// 	page = await fetchDoc<Page>({
	// 		collection: "pages",
	// 		slug: "delivery",
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
	// 			title: "Delivery",
	// 			description: "Our delivery options",
	// 		},
	// 		slug: "/delivery",
	// 	} as Page;
	// }

	return generateMeta({ doc: page });
}
