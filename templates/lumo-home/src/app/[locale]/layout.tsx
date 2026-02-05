import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { type Locale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type React from "react";
import { Toaster } from "react-hot-toast";
import { getLanguageFromLocale } from "@/i18n/helpers";
import localization, { type LocaleCode } from "@/i18n/localization";
import { routing } from "@/i18n/routing";
import { cn } from "@/shared/lib/utils";

type Props = {
	children: React.ReactNode;
	params: Promise<{ locale: Locale }>;
};

const alum = localFont({
	variable: "--font-alum",
	src: [
		{
			path: "../_fonts/AlumniSans-Regular.ttf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../_fonts/AlumniSans-Italic.ttf",
			weight: "400",
			style: "italic",
		},
		{
			path: "../_fonts/AlumniSans-Medium.ttf",
			weight: "500",
			style: "normal",
		},
		{
			path: "../_fonts/AlumniSans-MediumItalic.ttf",
			weight: "500",
			style: "italic",
		},
		{
			path: "../_fonts/AlumniSans-SemiBold.ttf",
			weight: "600",
			style: "normal",
		},
		{
			path: "../_fonts/AlumniSans-SemiBoldItalic.ttf",
			weight: "600",
			style: "italic",
		},
		{
			path: "../_fonts/AlumniSans-Bold.ttf",
			weight: "700",
			style: "normal",
		},
		{
			path: "../_fonts/AlumniSans-BoldItalic.ttf",
			weight: "700",
			style: "italic",
		},
	],
});

export default async function RootLayout(props: Props) {
	const { children, params } = props;

	const { locale } = await params;

	// const countryCode = getCountryCodeFromLocale(locale);
	const lang = getLanguageFromLocale(locale);

	const currentLocale = localization.locales.find(loc => loc.code === locale);

	const direction = currentLocale?.rtl ? "rtl" : "ltr";

	if (!routing.locales.includes(locale as LocaleCode)) {
		notFound();
	}

	setRequestLocale(locale);

	const messages = await getMessages();

	return (
		<html
			lang={lang}
			dir={direction}
			className={alum.variable}
			suppressHydrationWarning
		>
			<body className={cn("antialiased", alum.className)}>
				<NextTopLoader
					color='#1b1718'
					initialPosition={0.08}
					crawlSpeed={200}
					crawl={true}
					showSpinner={false}
				/>
				<NextIntlClientProvider messages={messages}>
					<NuqsAdapter>{children}</NuqsAdapter>
				</NextIntlClientProvider>
				<Toaster />
			</body>
		</html>
	);
}
