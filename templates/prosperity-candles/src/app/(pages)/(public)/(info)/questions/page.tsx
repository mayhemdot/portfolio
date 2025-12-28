import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { Breadcrumbs } from "@/components/elements/Breadcrumbs";
import { Gutter } from "@/components/Gutter";
import { Text } from "@/components/Text";
import { mergeOpenGraph } from "@/lib/meta";

import { generateMeta } from "@/utilities/generateMeta";
import QuestionsPage from "./page.client";

export default async function Questions() {
	const page: any | null = { layout: { columns: [] } };

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
						name: "F.A.Q",
						href: ``,
					},
				]}
			/>

			<Gutter>
				<Text comp='h1' variant={"primary"} font='romile' size={"xl"}>
					Контакты
				</Text>
			</Gutter>
			<QuestionsPage layout={page.layout} />
		</section>
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
			openGraph: mergeOpenGraph({
				title: "Questions",
				url: "/questions",
			}),
		},
	});
}
