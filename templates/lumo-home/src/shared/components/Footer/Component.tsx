import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { getLang, type LocaleCode } from "@/i18n/localization";
import { Logo } from "@/shared/components/Header/Logo";
import { CMSLink } from "@/shared/components/Link";
import { btnVariants } from "@/shared/components/ui/button";
import { SITE_NAME } from "@/shared/utils/constants";
import { Text } from "@/shared/components/Text";

export async function Footer() {
	const locale = (await getLocale()) as LocaleCode;
	const t = await getTranslations("Global.Footer");

	const lang = getLang(locale);

	const footer = {
		navItems: [
			{
				link: {
					url: "/",
					label: {
						en: "Home",
						ru: "Главная",
					},
				},
			},
			{
				link: {
					url: "/about",
					label: {
						en: "About",
						ru: "O нас",
					},
				},
			},
			{
				link: {
					url: "/products",
					label: {
						en: "Catalog",
						ru: "Каталог",
					},
				},
			},
			{
				link: {
					url: "/contacts",
					label: {
						en: "Contacts",
						ru: "Контакты",
					},
				},
			},
		],
		logo: {
			url: "/logo.svg",
		},
		socialLinks: [
			{
				link: {
					url: "https://twitter.com/payloadcms",
					label: "VK",
				},
			},
			{
				link: {
					url: "https://github.com/payloadcms/payload",
					label: "Telegram",
				},
			},
		],
		policy: [
			{
				url: "/privacy-policy",
				label: {
					en: "Privacy Policy",
					ru: "Политика конфиденциальности",
				},
			},
			{
				url: "/terms-and-conditions",
				label: {
					en: "Terms & Conditions",
					ru: "Условия использования",
				},
			},
		],
	};

	return (
		<footer className='bg-secondary dark:bg-card text-foreground w-full'>
			<div className='container mx-auto flex flex-col gap-8 px-4 py-8 md:flex-row md:justify-between'>
				<div className='flex w-full flex-col justify-between gap-4 xl:flex-row xl:gap-8'>
					{/* <Logo logo={footer.logo} /> */}

					<p className='fl-text-80/140 text-foreground font-medium'>
						{SITE_NAME}
					</p>
					<div className='fl-gap-16/32 inline-flex items-start py-8 md:flex-row md:items-start xl:py-16'>
						{/* <ThemeSelector /> */}
						<div className='fl-gap-4/16 flex flex-col'>
							{/* <h3 className='fl-text-20/24 mb-2 text-center'>
								{t("headers.resources")}
							</h3> */}
							<Text
								comp={"h3"}
								size={"sm"}
								className={"mb-2 text-center font-semibold"}
								variant={"secondary"}
							>
								{t("headers.resources")}
							</Text>
							<nav className='fl-gap-4/16 flex flex-col'>
								{footer?.navItems?.map(({ link: { url, label } }, index) => (
									<CMSLink
										size={"sm"}
										label={label[lang]}
										className={btnVariants({
											variant: "ghost",
											className: "px-8! fl-text-20/24 w-full",
										})}
										key={String(index)}
										url={url}
									/>
								))}
							</nav>
						</div>

						<div className='fl-gap-4/16 flex flex-col'>
							<Text
								comp={"h3"}
								size={"sm"}
								className={"mb-2 text-center font-semibold"}
								variant={"secondary"}
							>
								{t("headers.followUs")}
							</Text>

							<div className='fl-gap-4/16 flex flex-col'>
								{footer.socialLinks?.map(({ link }, index: number) => (
									<CMSLink
										size={"sm"}
										key={String(index)}
										{...link}
										className={btnVariants({
											variant: "ghost",
											className: "px-8! fl-text-20/24 w-full",
										})}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='container mx-auto flex items-center justify-between border-t-2 p-4'>
				<div className='fl-gap-4/8 flex items-center'>
					<Link
						href={"/terms-and-conditions"}
						className={btnVariants({
							variant: "link",
							className: "fl-text-10/16",
						})}
					>
						Terms & Conditions
					</Link>
					<span>|</span>
					<Link
						href={"/privacy-policy"}
						className={btnVariants({
							variant: "link",
							className: "fl-text-10/16",
						})}
					>
						Privacy Policy
					</Link>
				</div>
				<div className='fl-text-10/16'>© 2025 Lumo. {t("policy.rights")}.</div>
			</div>
		</footer>
	);
}
