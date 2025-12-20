import type { Metadata } from "next";
import localFont from "next/font/local";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import { Footer } from "../components/Footer";
import { mergeOpenGraph } from "../utilities/mergeOpenGraph";
import { Providers } from "./_providers";
import GsapRegister from "./gsapRegister";
// import "..fancyapps/ui/dist/fancybox/fancybox.css";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./variables.scss";
import "./globals.css";

const TT_Ricordi = localFont({
	src: [
		{
			path: "../styles/TT Ricordi Marmo Trial Light.ttf",
			weight: "300",
			style: "normal",
		},
		{
			path: "../styles/TT Ricordi Marmo Trial Regular.ttf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../styles/TT Ricordi Marmo Trial Variable.ttf",
			weight: "500",
			style: "normal",
		},
	],
	variable: "--font-tt-ricordi",
	display: "swap",
});

const LagunaC = localFont({
	src: [
		{
			path: "../styles/lagunac.otf",
			weight: "500",
			style: "normal",
		},
		{
			path: "../styles/lagunac_bold.otf",
			weight: "600",
			style: "normal",
		},
	],
	variable: "--font-lagunac",
	display: "swap",
});

const Romile = localFont({
	src: "../styles/Romile.otf",
	variable: "--font-romile",
	display: "swap",
});

export default async function RootLayout({ children }: PropsWithChildren) {
	return (
		<html
			lang='en'
			className={`${TT_Ricordi.variable} ${LagunaC.variable} ${Romile.variable}`}
			suppressHydrationWarning
		>
			<head>
				<link rel='icon' href='/favicon.ico' sizes='32x32' />
				<link rel='icon' href='/favicon.svg' type='image/svg+xml' />
			</head>
			<body className={"flex flex-col justify-start"}>
				<Providers>
					<NuqsAdapter>
						<GsapRegister />

						{children}

						<Footer />
						<Toaster
							toastOptions={{ duration: 4000, style: { fontSize: "13px" } }}
						/>
					</NuqsAdapter>
				</Providers>
			</body>
		</html>
	);
}

export const metadata: Metadata = {
	metadataBase: new URL(
		process.env.NEXT_PUBLIC_SERVER_URL || "https://payloadcms.com"
	),
	twitter: {
		card: "summary_large_image",
		creator: "..payloadcms",
	},
	openGraph: mergeOpenGraph(),
};
