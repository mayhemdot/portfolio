import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/elements/Logo";
import { Text } from "@/components/Text";
import { Separator } from "@/components/ui/separator";
import {
	ROOT_DIR,
	SITE_EMAIL,
	SITE_NAME,
	SITE_PHONE,
} from "@/modules/common/data/constants";
import classes from "./index.module.scss";

export async function Footer() {
	const firstRows = [
		{
			href: `/products?category=candle`,
			name: "Ароматические свечи",
		},
		{
			href: "/products?category=spa",
			name: "Спа продукты",
		},
		{
			href: "/products?category=diffusor",
			name: "Диффузоры",
		},
		{
			href: "/products?category=surprise",
			name: "Подарочные наборы",
		},
	];

	const footer: {
		columns: {
			title: string;
			links: {
				link: {
					label: string;
					type: "custom" | "reference";
					href: string;
					url: string;
					reference: any;
				};
			}[];
		}[];
	} | null = {
		columns: [
			{
				title: "Категории",
				links: firstRows.map(item => ({
					link: {
						label: item.name,
						type: "custom",
						href: item.href,
						url: item.href,
						reference: "reference",
					},
				})),
			},
			// {
			// 	title: "Контакты",
			// 	links: [
			// 		{
			// 			link: {
			// 				label: "Email",
			// 				type: "custom",
			// 				href: `mailto:${SITE_EMAIL}`,
			// 				url: "",
			// 				reference: "reference",
			// 			},
			// 		},
			// 		{
			// 			link: {
			// 				label: "Телефон",
			// 				type: "custom",
			// 				href: `tel:${SITE_PHONE}`,
			// 				url: "",
			// 				reference: "reference",
			// 			},
			// 		},
			// 	],
			// },
			{
				title: "Карта сайта",
				links: [
					{
						link: {
							label: "Главная",
							type: "custom",
							href: "/",
							url: "/",
							reference: "reference",
						},
					},
					{
						link: {
							label: "Каталог",
							type: "custom",
							href: "/products",
							url: "/products",
							reference: "reference",
						},
					},
					{
						link: {
							label: "Контакты",
							type: "custom",
							href: "/contacts",
							url: "/contacts",
							reference: "reference",
						},
					},
				],
			},
		],
	};

	//   import { useTranslations } from "next-intl";
	// import { Link } from "next-view-transitions";
	// import { cn } from "@/shared/utils/cn";

	// export function Nav({ className }: { className?: string }) {
	//   const t = useTranslations();
	//   return (
	//     <div className={cn("inline-flex flex-col text-left font-mono font-extralight", className)}>
	//       <Link href={"/"} className="hover:text-accent transition-color duration-200">
	//         {/* Home */}
	//         {t("header.menu.drawer.home")}
	//       </Link>
	//       <Link href={"/about"} className="hover:text-accent transition-color duration-200">
	//         {/* About */}
	//         {t("header.menu.drawer.about")}
	//       </Link>
	//       <Link href={"/products"} className="hover:text-accent transition-color duration-200">
	//         {/* Catalog */}
	//         {t("header.menu.drawer.catalog")}
	//       </Link>
	//       <Link href={"/contacts"} className="hover:text-accent transition-color duration-200">
	//         {/* Contacts */}
	//         {t("header.menu.drawer.contacts")}
	//       </Link>
	//     </div>
	//   );
	// }

	// try {
	// 	footer = await fetchFooter();
	// } catch (error) {
	// 	console.log(error);
	// 	// When deploying this template on Payload Cloud, this page needs to build before the APIs are live
	// 	// So swallow the error here and simply render the footer without nav items if one occurs
	// 	// in production you may want to redirect to a 404  page or at least log the error somewhere
	// 	// console.error(error)
	// }

	// const navItems = footer?.navItems || [];
	const columns = footer?.columns || [];
	// console.log("footer", footer);

	return (
		<footer className='content-section flex w-full flex-col pb-8 pt-8 sm:pt-12'>
			<div
				className={
					"fsNormal mb-8 grid grid-cols-2 gap-4 gap-y-8 md:grid-cols-3 lg:grid-cols-5"
				}
			>
				<div>
					<ul className='bg-beige-color inline-flex flex-col rounded-3xl p-8'>
						<li className='mb-8'>
							<Logo />
						</li>
						<li className='mb-2'>
							<a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
						</li>
						<li className='mb-8'>
							<a href={`tel:${SITE_PHONE}`}>{SITE_PHONE}</a>
						</li>
						<li className='flex gap-4'>
							<Link
								className='flex cursor-pointer items-center gap-4'
								href={""}
							>
								<Image
									src={"/images/svg/vk.svg"}
									width={34}
									height={34}
									alt={"иконка вконтакте"}
								/>
							</Link>
							<Link
								className='flex cursor-pointer items-center gap-4'
								href={""}
							>
								<Image
									src={"/images/svg/telegram.svg"}
									width={34}
									height={34}
									alt={"иконка телеграмм"}
								/>
							</Link>
						</li>
					</ul>
				</div>

				<div></div>
				<div></div>

				{columns?.map(column => (
					<div key={`footer-catalog-${column.title}`}>
						<Text comp='h4' size='smd'>
							{column.title}
						</Text>
						<Separator className='my-2 lg:my-4' />
						<ul className={"fsNormal flex flex-col gap-2 lg:gap-4"}>
							{column.links.map(({ link }) => (
								<li key={link.label}>
									<Link href={link.url} className='hover:text-black'>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
			<Separator className={"my-2 lg:my-4"} />
			<div className={"fsSmall flex w-full justify-between"}>
				<div className={"fsSmall"}>
					©{SITE_NAME}, 2024 - {new Date().getFullYear()} год
				</div>
				<Link href={`${ROOT_DIR}/politic`}>
					Политика обработки персональных данных
				</Link>
			</div>
		</footer>
	);
}

//  <div className="flex gap-20">
//             <div>
//               <Text comp="h4" variant="gradient" size={"sm"} className="mb-4">
//                 {t("footer.categories")}
//               </Text>
//               <ProductLinksNav className="gap-2 fl-text-16/24" />
//             </div>

//             <div>
//               <Text comp="h4" variant="gradient" size={"sm"} className="mb-4">
//                 {t("footer.site")}
//               </Text>
//               <Nav className="gap-2 flex flex-col fl-text-16/24" />
//             </div>
//           </div>
