import { DynamicBreadcrumb } from "@/shared/components/Breadcrumbs";
import { getLang, LocaleCode } from "@/i18n/localization";
import { getCategories } from "@/modules/categories/model/queries";
import Image from "next/image";
import { Text } from "@/shared/components/Text";
import Link from "next/link";

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

export default async function Page({ params }: Props) {
	const { locale } = await params;
	const lang = getLang(locale);
	const categories = getCategories();

	return (
		<>
			<div className='container mx-auto'>
				<DynamicBreadcrumb breadcrumbs={BREADCRUMBS[lang]} />
			</div>
			<div className='bg-secondary py-8'>
				<div className='container mx-auto rounded-2xl'>
					<div className='fl-mx-16/32 grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4'>
						{categories.map(item => (
							<Link
								href={"/categories/" + item.slug}
								className='rounded-3xl! group relative flex aspect-square items-center justify-center bg-white'
								key={item.id}
							>
								<Image
									src={item.thumbnail}
									fill
									alt=''
									className='z-0 object-cover p-8 transition-transform duration-500 group-hover:scale-105'
								/>
								<div className='rounded-2xl px-4 py-1 backdrop-blur-2xl'>
									<Text
										comp='h2'
										variant={"primary"}
										size={"md"}
										className='z-3'
									>
										{item.name[lang]}
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
