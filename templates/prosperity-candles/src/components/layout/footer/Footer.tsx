// import Logo from '@/components/ui/custom/Logo'

import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

import Logo from "@/components/elements/Logo";
import { Separator } from "@/components/ui/separator";
import {
	ROOT_DIR,
	SITE_EMAIL,
	SITE_NAME,
	SITE_PHONE,
} from "@/modules/common/data/constants";

const Footer: FC = () => {
	return (
		<footer className='container m-auto flex flex-col pb-8 pt-8 sm:pt-12'>
			<div
				className={
					"fsNormal mb-8 grid grid-cols-2 gap-4 gap-y-8 md:grid-cols-3 lg:grid-cols-5"
				}
			>
				<ul className='flex flex-col'>
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
						<a className='flex cursor-pointer items-center gap-4'>
							<Image
								src={"/images/svg/vk.svg"}
								width={34}
								height={34}
								alt={"иконка вконтакте"}
							/>
						</a>
						<a className='flex cursor-pointer items-center gap-4'>
							<Image
								src={"/images/svg/telegram.svg"}
								width={34}
								height={34}
								alt={"иконка телеграмм"}
							/>
						</a>
					</li>
				</ul>
				<div>
					<h4 className={"fsNormal"}>Каталог</h4>
					<Separator className='my-2 lg:my-4' />
					<ul className={"fsSmall flex flex-col gap-2"}>
						{[
							{
								href: `catalog?category=candle`,
								name: "Ароматические свечи",
							},
							{
								href: "catalog?category=spa",
								name: "	Спа продукты",
							},
							{
								href: "catalog?category=diffusor",
								name: "Диффузоры",
							},
							{
								href: "catalog?category=surprise",
								name: "Подарочные наборы",
							},
						].map((item, i) => (
							<li key={`footer-catalog-${i}`}>
								<Link
									href={`${ROOT_DIR}/${item.href}`}
									className='hover:text-black'
								>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div>
					<h4 className={"fsNormal"}>Для клиентов</h4>
					<Separator className='my-2 lg:my-4' />
					<ul className={"fsSmall flex flex-col gap-2"}>
						{[
							{
								href: "#",
								name: "О компании",
							},
							{
								href: "delivery",
								name: "Доставка и оплата",
							},
							{
								href: "partners",
								name: "Стать партнером",
							},
							{
								href: "contacts",
								name: "Контакты",
							},
						].map((item, i) => (
							<li key={`footer-catalog-${i}`}>
								<Link
									href={`${ROOT_DIR}/${item.href}`}
									className='hover:text-black'
								>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div>
					<h4 className={"fsNormal"}>Реквизиты</h4>
					<Separator className='my-2 lg:my-4' />
					<ul className={"fsSmall) flex flex-col gap-2"}>
						<li>
							<Link href='#' className='hover:text-black'>
								ИП Петров Петр Петрович
							</Link>
						</li>
						<li>
							<Link href='#' className='hover:text-black'>
								ИНН - XXXX XXXX XXX
							</Link>
						</li>
					</ul>
				</div>

				<div>
					<h4 className={"fsNormal"}>Производство</h4>
					<Separator className='my-2 lg:my-4' />
					<ul className={"fsSmall flex flex-col gap-2"}>
						<li>
							<Link href='#' className='hover:text-black'>
								г. Санкт-Петербург, Васильевский проспект, д. 12
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<Separator className={"my-2 lg:my-4"} />
			<div className={"fsSmall flex w-full justify-between"}>
				<div className={"fsSmall"}>©{SITE_NAME}, 2024 год</div>
				<Link href={`${ROOT_DIR}/politic`}>
					Политика обработки персональных данных
				</Link>
			</div>
		</footer>
	);
};

export default Footer;
