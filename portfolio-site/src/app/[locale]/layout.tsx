import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { type Locale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import React, { type PropsWithChildren } from "react";
import { Providers } from "@/app/[locale]/_providers";
import { InitTheme } from "@/app/[locale]/_providers/Theme/InitTheme";
import { getLanguageFromLocale } from "@/i18n/helpers";
import localization, { type LocaleCode } from "@/i18n/localization";
import { routing } from "@/i18n/routing";
import { Footer } from "@/payload/blocks/Footer/Component";
import { Header } from "@/payload/blocks/Header/Component";
import { ScrollSmoothLayout } from "@/shared/components/ScrollSmooth";
import { getServerSideURL } from "@/utilities/getURL";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import { cn } from "@/utilities/ui";
import { manrope, nyghtSerif } from "./_fonts/fonts";
// import { AdminBar } from "@/shared/components/AdminBar";

import "./globals.css";

export function generateStaticParams() {
	return [{ locale: "en-US" }, { locale: "ru-RU" }];
	// return routing.locales.map((locale) => getLanguageFromLocale(locale));
}

type Props = PropsWithChildren<{
	params: Promise<{ locale: LocaleCode }>;
}>;

export default async function RootLayout({ params, children }: Props) {
	const { isEnabled } = await draftMode();
	const { locale } = await params;

	const lang = getLanguageFromLocale(locale);

	const currentLocale = localization.locales.find((loc) => loc.code === locale);
	const direction = currentLocale?.rtl ? "rtl" : "ltr";

	if (!routing.locales.includes(locale as LocaleCode)) {
		notFound();
	}

	setRequestLocale(locale);

	const messages = await getMessages({ locale: locale });
	return (
		<html
			className={cn(manrope.variable, nyghtSerif.variable)}
			lang={lang}
			dir={direction}
			suppressHydrationWarning
		>
			<head>
				<InitTheme />
				<link href="/favicon.ico" rel="icon" sizes="32x32" />
				<link href="/favicon.svg" rel="icon" type="image/svg+xml" />
			</head>
			<body>
				<Providers>
					<NextIntlClientProvider messages={messages}>
						<ScrollSmoothLayout>
							{/* <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            /> */}
							<Header />
							<main className="main min-h-screen shrink-0">{children}</main>

							<Footer />
							{/* <div>dd</div> */}
						</ScrollSmoothLayout>
					</NextIntlClientProvider>
				</Providers>
			</body>
		</html>
	);
}

export const metadata: Metadata = {
	metadataBase: new URL(getServerSideURL()),
	openGraph: mergeOpenGraph(),
	twitter: {
		card: "summary_large_image",
		creator: "@payloadcms",
	},
};
