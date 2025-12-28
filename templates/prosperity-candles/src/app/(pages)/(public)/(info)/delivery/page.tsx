import type { Metadata } from "next";
import DeliveryPage, {
	type Column,
} from "@/app/(pages)/(public)/(info)/delivery";
import { Breadcrumbs } from "@/components/elements/Breadcrumbs";
import { Gutter } from "@/components/Gutter";
import { Text } from "@/components/Text";
import { mergeOpenGraph } from "@/lib/meta";
import { SITE_NAME } from "@/modules/common/data/constants";
import { generateMeta } from "@/utilities/generateMeta";

export default async function Delivery() {
	const page = {
		title: "Delivery",
		slug: "contacts",
		layout: {
			columns: [
				{
					title: "Контакты",
					description: "Оставьте свой номер и мы свяжемся с вами",
					link: {
						url: "/",
						label: "Контакты",
					},
					rows: [
						{
							title: "ТЦ Парк",
							phone: "+7 (495) 123-45-67",
							email: "2Tt7O@example.com",
							address: "г. Москва, ул. Парковая, д. 1",
						},
					],
					enableLink: true,
					size: "half",
				},

				{
					title: "Доставка",
					description: "Оставьте свой номер и мы свяжемся с вами",
					rows: [],
					link: {
						url: "/",
						label: "Доставка",
					},
					enableLink: true,
					size: "half",
				},
			] as Column[],
		},
	};

	return (
		<section className='container mx-auto flex min-h-screen flex-col items-center gap-4'>
			<Breadcrumbs
				breadcrumbs={[
					{
						id: 0,
						name: "Главная",
						href: "/",
					},
					{
						id: 1,
						name: "Доставка",
						href: ``,
					},
				]}
			/>
			<Gutter>
				<Text comp='h1' variant={"primary"} font='romile' size={"xl"}>
					Доставка и оплата
				</Text>
			</Gutter>
			<DeliveryPage layout={page.layout} />
		</section>
	);
}

export async function generateMetadata(): Promise<Metadata> {
	return generateMeta({
		doc: {
			meta: {
				title: `${SITE_NAME} - Доставка`,
				description: "Our delivery options",
			},
			slug: "/delivery",
			openGraph: mergeOpenGraph({
				title: "Delivery",
				url: "/delivery",
			}),
		},
	});
}
