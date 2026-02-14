import type { Metadata } from "next";
import React from "react";
import { DynamicBreadcrumb } from "@/shared/components/Breadcrumbs";
import { Badge } from "@/shared/components/ui/badge";
import { Shell } from "@/shared/components/ui/shell";
import { constructMetadata } from "@/shared/utils/meta";
import { getLang, LocaleCode } from "@/i18n/localization";

export const metadata: Metadata = constructMetadata({
	title: "Контакты",
	url: "/contacts",
	description: "Контактная информация",
});

type Props = {
	params: Promise<{
		locale: LocaleCode;
	}>;
};

const BREADCRUMBS = {
	ru: [
		{ label: "Главная", url: "/" },
		{ label: "Контакты", url: "!" },
	],
	en: [
		{ label: "Home", url: "/" },
		{ label: "Contacts", url: "!" },
	],
};

export default async function Page({ params }: any) {
	const { locale } = await params;
	const lang = getLang(locale);

	return (
		<div className='container mx-auto'>
			<DynamicBreadcrumb breadcrumbs={BREADCRUMBS[lang]} />

			<h1 className='fl-text-32/64 mx-auto mb-4 text-center font-bold'>
				Contacts
			</h1>

			<div className='mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2'>
				<ContactCard
					key={"1"}
					className='col-span-2'
					title={"Contact center"}
					cards={[
						{
							label: "Address",
							value: "Daily from 9:00 AM to 10:00 PM (London time)",
						},
						{ label: "Phone", value: "+44 7XXX XXXXXX" },
						{ label: "Email", value: "store@gmail.ru" },
					]}
				/>
				<ContactCard
					key={"2"}
					className={"col-span-2 md:col-span-1"}
					title={"Store LUMO #1"}
					cards={[
						{
							label: "Address",
							value: "125 Baker Street, London W1U 6RT, UK",
						},
						{ label: "Phone", value: "+44 7XXX XXXXXX" },
						{ label: "Email", value: "store@gmail.ru" },
					]}
				/>
				<ContactCard
					key={"3"}
					className={"col-span-2 md:col-span-1"}
					title={"Store LUMO #2"}
					cards={[
						{
							label: "Address",
							value: "48 Kensington High Street, London W8 4PF, UK",
						},
						{ label: "Phone", value: "+44 7XXX XXXXXX" },
						{ label: "Email", value: "store@gmail.ru" },
					]}
				/>
			</div>
			{/* <Map />
      <ContactInfo /> */}
		</div>
	);
}

function ContactCard({
	className,
	title,
	cards,
}: {
	className?: string;
	title: string;
	cards: { label: string; value: string }[];
}) {
	return (
		<Shell className={className}>
			<h2 className='fl-text-24/32 text-center font-medium leading-none'>
				{title}
			</h2>
			<div className='flex flex-col items-start gap-2'>
				{cards.map(card => (
					<div
						key={card.label}
						className='flex w-full grow items-center justify-between gap-3'
					>
						<Badge size={"xs"}>{card.label}</Badge>
						<span className='fl-text-16/20'>{card.value}</span>
					</div>
				))}
			</div>
		</Shell>
	);
}
