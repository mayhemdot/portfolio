import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ViewTransitions } from "next-view-transitions";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import localization from "@/i18n/localization";
import { routing } from "@/i18n/routing";
import {
	getCountryCodeFromLocale,
	getLanguageFromLocale,
} from "@/modules/common/lib/get-region";
import { getRegion } from "@/modules/common/lib/get-region-action";
import { FooterCmp } from "@/modules/globals/components/Footer";
import { HeaderCmp } from "@/modules/globals/components/Header";
import { HeadExt } from "@/shared/components/Global/Head";
import { cn } from "@/shared/utils/cn";
import { ClientProviders } from "../providers";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default async function Layout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale?: string }>;
}>) {
	const { locale = routing.defaultLocale } = await params;

	const countryCode = getCountryCodeFromLocale(locale);
	const lang = getLanguageFromLocale(locale);

	const currentLocale = localization.locales.find(
		loc => loc.code === countryCode
	);
	const direction = currentLocale?.rtl ? "rtl" : "ltr";

	// if (!hasLocale(routing.locales, locale)) {
	//   notFound();
	// }

	setRequestLocale(locale);
	const messages = await getMessages();
	const region = await getRegion(countryCode);

	return (
		<ViewTransitions>
			<html lang={lang} dir={direction}>
				<HeadExt />
				<body
					className={cn(
						`antialiased dark`,
						geistSans.variable,
						geistMono.variable
					)}
				>
					<NextTopLoader
						color='#fff'
						easing='ease'
						zIndex={1000}
						crawl={true}
						showSpinner={false}
					/>
					<NuqsAdapter>
						<NextIntlClientProvider messages={messages}>
							<ClientProviders region={region}>
								<HeaderCmp locale={locale} customer={null} />
								<main className='min-h-dvh relative h-fit w-full max-w-full grow'>
									{children}
								</main>
								<FooterCmp locale={locale} />
							</ClientProviders>
						</NextIntlClientProvider>
					</NuqsAdapter>
				</body>
			</html>
		</ViewTransitions>
	);
}
