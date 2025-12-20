import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/elements/Breadcrumbs";
import { generateMeta } from "@/utilities/generateMeta";
import HomeAnimation from "../(home)/HomeAnimation";
import ContactPage from "./ContactPage";
import DeliveryPage from "./DeliveryPage";
import QuestionsPage from "./QuestionsPage";

// import { Blocks } from "@/app/_blocks";
// import { Hero } from "@/app/_components/Hero";
// import type { Page as IPage } from "@/payload/payload-types";

// Payload Cloud caches all files through Cloudflare, so we don't need Next.js to cache them as well
// This means that we can turn off Next.js data caching and instead rely solely on the Cloudflare CDN
// To do this, we include the `no-cache` header on the fetch requests used to get the data for this page
// But we also need to force Next.js to dynamically render this page on each request for preview mode to work
// See https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
// If you are not using Payload Cloud then this line can be removed, see `@/app/README.md#cache`
export const dynamic = "force-dynamic";

type Args = {
	params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Args) {
	const { slug } = await params;

	const title = {
		contacts: "Контакты",
		delivery: "Доставка",
		questions: "Вопросы",
	};

	const page = {
		title: "Контакты",
		slug: slug in title ? title[slug as keyof typeof title] : "Контакты",
		layout: {
			columns: [
				{
					title: "Контакты",
					description: "Оставьте свой номер и мы свяжемся с вами",
					link: {
						url: "/",
						label: "Контакты",
					},
					enableLink: true,
					size: "half",
				},

				{
					title: "Доставка",
					description: "Оставьте свой номер и мы свяжемся с вами",
					link: {
						url: "/",
						label: "Доставка",
					},
					enableLink: true,
					size: "half",
				},
			],
		},
	};

	// if (!page) {
	// 	return notFound();
	// }

	// const { hero, layout } = page;

	return (
		<>
			<Breadcrumbs
				breadcrumbs={[
					{
						id: 0,
						name: "Главная",
						href: "/",
					},
					{
						id: 1,
						name: page.title,
						href: `/${page.slug}`,
					},
				]}
			/>
			{/* 
      <Hero {...hero} />
			{slug !== "home" &&
				slug !== "questions" &&
				slug !== "delivery" &&
				slug !== "contacts" && (
					<Blocks
						blocks={layout}
						disableTopPadding={
							!hero || hero?.type === "none" || hero?.type === "lowImpact"
						}
					/>
				)} 
         */}

			{slug === "home" && <HomeAnimation />}
			{slug === "contacts" && <ContactPage layout={page.layout} />}
			{slug === "delivery" && <DeliveryPage layout={page.layout} />}
			{slug === "questions" && <QuestionsPage layout={page.layout} />}
		</>
	);
}

export async function generateStaticParams({ params }: Args) {
	try {
		// const pages = await fetchDocs<IPage>("pages");
		// return pages?.map(({ slug }) => slug);
		return [];
	} catch (e: unknown) {
		return [];
	}
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
	const { slug } = await params;
	// const { isEnabled: isDraftMode } = draftMode();

	// let page: any | null = null;

	// try {
	// 	page = await fetchDoc<IPage>({
	// 		collection: "pages",
	// 		slug,
	// 		draft: isDraftMode,
	// 	});
	// } catch (error) {
	// 	// don't throw an error if the fetch fails
	// 	// this is so that we can render a static home page for the demo
	// 	// when deploying this template on Payload Cloud, this page needs to build before the APIs are live
	// 	// in production you may want to redirect to a 404  page or at least log the error somewhere
	// }

	// if (!page && slug === "home") {
	// 	page = staticHome;
	// }

	return generateMeta({
		doc: {
			meta: {
				title: "Home",
				description: "Home",
			},
			slug: "/",
		},
	});
}
