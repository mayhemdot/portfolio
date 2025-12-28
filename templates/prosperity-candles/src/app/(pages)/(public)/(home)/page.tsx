import type { Metadata } from "next";
import { ArchiveBlock } from "@/app/_blocks/ArchiveBlock";
import { MainImpactHero } from "@/app/_heros/MainImpact";
import { AdvantagesBlock } from "@/app/(pages)/(public)/(home)/AdvantagesBlock";
import { BesidesBlock } from "@/app/(pages)/(public)/(home)/BesidesBlock";
import { WorkflowBlock } from "@/app/(pages)/(public)/(home)/WorkflowBlock";
import SubscribeSection from "@/modules/subscriptions/components/subscribe";
import { staticHome } from "@/payload/seed/home-static";
import { generateMeta } from "@/utilities/generateMeta";
import HomeAnimation from "./HomeAnimation";

import "./Home.module.scss";

export default async function Page() {
	return (
		<>
			<MainImpactHero
				media={{
					mimeType: "video/mp4",
					url: "/video/0001-0120.mp4",
					filename: "0001-0120.mp4",
					id: 1,
					alt: "",
					updatedAt: "",
					createdAt: "",
				}}
				links={[
					{
						id: "1",
						label: "Перейти\r\nв каталог",
						href: "/products",
					},
					{
						id: "2",
						label: "Контакты",
						href: "/contacts",
					},
				]}
			/>
			<ArchiveBlock
				blockType={"archive"}
				relationTo={"products"}
				slider={true}
				moreLink={{ url: "/products", label: "Все продукты" }}
			/>

			<WorkflowBlock
				mediaBackgroundSrc={"/images/master1.jpg"}
				mediaForegroundSrc={"/images/master2.jpg"}
				introContent={""}
				contentTitle={"Добро\r\nпожаловать"}
				contentBody={`Всю продукцию мы делаем вручную и используем только натуральные и премиальные компоненты. 

Ручная работа — это всегда про индивидуальность и неповторимость.
Каждый наш продукт упаковывается в красивую эко-упаковку. 

Мы стараемся, чтобы наши продукты приносили в жизнь и в пространство больше гармонии и баланса, помогали проявить ощущения спокойствия и радости.`}
			/>
			{/* Advantages and guarantee section */}
			<AdvantagesBlock
				contentTitle={""}
				contentBody={""}
				cards={[
					{
						id: 1,
						title: "Ручная работа",
						description:
							"Каждый товар сделан с любовью вручную нашими талантливыми мастерами",
					},
					{
						id: 2,
						title: "Сертификация",
						description:
							"Наша продукция прошла тестирование в лаборатории имеет декларации соответствия",
					},
					{
						id: 3,
						title: "Без вреда для здоровья",
						description:
							"В процессе изготовления используют только безопасные компоненты высокого качества",
					},
					{
						id: 4,
						title: "Собственное производство",
						description:
							"Вся продукция изготавливается и проходит контроль качества на собственном производстве",
					},
				]}
				profits={[
					{
						id: 1,
						title: "Древесный фитиль",
					},
					{
						id: 2,
						title: "Защитная крышка",
					},
					{
						id: 3,
						title: "Соевый воск",
					},
				]}
			/>
			<BesidesBlock
				cards={[
					{
						id: 1,
						title: "Свечи для всех и каждого",
						link: {
							url: "/products?categories=aromatic-candles",
							label: "Свечи для всех и каждого",
						},
						media: {
							id: 1,
							url: "/images/candles_for_all-min.webp",
							alt: "category image",
							filename: "candles_for_all-min.webp",
							updatedAt: "",
							createdAt: "",
						},
					},
					{
						id: 2,
						title: "Спа",
						link: {
							url: "/products?categories=body-care",
							label: "Спа",
						},
						media: {
							id: 2,
							url: "/images/salt.jpg",
							alt: "category image",
							filename: "salt.jpg",
							updatedAt: "",
							createdAt: "",
						},
					},
					{
						id: 3,
						title: "Подарочные наборы",
						link: {
							url: "/products?categories=gift-sets",
							label: "Подарочные наборы",
						},
						media: {
							id: 3,
							url: "/images/surprise.jpg",
							alt: "category image",
							filename: "surprise.jpg",
							updatedAt: "",
							createdAt: "",
						},
					},
				]}
				description={`Мы уже вышли за рамки магазина свечей и пробуем расширять линейку продуктов для дома

Как и любая приличная фирма мы стараемся улучшать и развивать свой ассортимент.`}
				introContent={""}
			/>

			<SubscribeSection />
			<HomeAnimation />
		</>
	);
}

export async function generateStaticParams() {
	return [
		{
			slug: "contacts",
		},
		{
			slug: "products",
		},
	]?.map(({ slug }) => slug);
}

export async function generateMetadata(): Promise<Metadata> {
	return generateMeta({ doc: staticHome });
}
