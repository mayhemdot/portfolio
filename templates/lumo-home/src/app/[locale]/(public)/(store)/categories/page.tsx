import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { Lang, LocaleCode } from "@/i18n/localization";
import { getCategories } from "@/modules/categories/model/queries";
import { DynamicBreadcrumb } from "@/shared/components/Breadcrumbs";
import { Text } from "@/shared/components/Text";
import { constructMetadata } from "@/shared/utils/meta";

type Props = {
	params: Promise<{
		locale: LocaleCode;
	}>;
};

const BREADCRUMBS = {
	ru: [
		{ label: "Главная", url: "/" },
		{ label: "Категории", url: "!" },
	],
	en: [
		{ label: "Home", url: "/" },
		{ label: "Categories", url: "!" },
	],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const { language } = new Intl.Locale(locale);

	return constructMetadata({
		title: BREADCRUMBS[language as Lang][1].label,
		onlyName: false,
		locale: locale as LocaleCode,
		url: `/categories`,
	});
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	const { language } = new Intl.Locale(locale);

	const categories = getCategories();

	return (
		<>
			<div className='fl-px-8/32 container mx-auto'>
				<DynamicBreadcrumb
					padding={false}
					breadcrumbs={BREADCRUMBS[language as Lang]}
				/>
			</div>
			<div className='bg-secondary py-4 lg:py-8'>
				<div className='fl-px-8/32 container mx-auto rounded-2xl'>
					<div className='grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 2xl:gap-8'>
						{categories.map(item => (
							<Link
								href={`/categories/${item.slug}`}
								className='rounded-3xl! bg-background group relative flex aspect-square items-center justify-center'
								key={item.id}
							>
								<Image
									src={item.thumbnail}
									fill
									alt=''
									className='z-0 object-cover p-4 transition-transform duration-500 group-hover:scale-105 md:p-8'
								/>
								<div className='rounded-2xl px-4 py-1 backdrop-blur-2xl'>
									<Text
										comp='h2'
										variant={"primary"}
										size={"md"}
										className='z-3'
									>
										{item.name[language as Lang]}
									</Text>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
