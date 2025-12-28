import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Column } from "@/app/(pages)/(public)/(info)/delivery";
import { Breadcrumbs } from "@/components/elements/Breadcrumbs";
import { Gutter } from "@/components/Gutter";
import { Text } from "@/components/Text";
import { mergeOpenGraph } from "@/lib/meta";
import {
	SITE_EMAIL,
	SITE_NAME,
	SITE_TITLE,
} from "@/modules/common/data/constants";
import type { Settings } from "@/payload/payload-types";
import { generateMeta } from "@/utilities/generateMeta";
import ContactPage from "./page.client";

export default async function Contacts() {
	const page = {
		title: "Контакты",
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
							description: "",
							phone: "+7 (495) 123-45-67",
							email: SITE_EMAIL,
							address: "г. Москва, ул. Парковая, д. 1",
							work: "Пн-Пт: 10:00 - 19:00",
						},
					],
					enableLink: true,
					size: "half",
				},

				{
					title: "Доставка",
					description: "Доставка в Москву и область",
					rows: [
						{
							description: "Самовывоз из магазина бесплатно",
						},
						{
							description: "Доставка по городу: 1000 ₽",
						},
						{
							description: "Экспресс-доставка от 2000 ₽",
						},
					],
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
						name: "Контакты",
						href: ``,
					},
				]}
			/>
			<Gutter>
				<Text comp='h1' variant={"primary"} font='romile' size={"xl"}>
					Контакты
				</Text>
			</Gutter>
			<ContactPage layout={page.layout} />
		</section>
	);
}

export async function generateMetadata(): Promise<Metadata> {
	return generateMeta({
		doc: {
			meta: {
				title: `${SITE_NAME} - Контакты`,
				description: "Our contacts",
			},
			slug: "/contacts",
			openGraph: mergeOpenGraph({
				title: "Contacts",
				url: "/contacts",
			}),
		},
	});
}
