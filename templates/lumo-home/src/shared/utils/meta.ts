import type { Metadata } from "next";
import type { Lang, LocaleCode } from "@/i18n/localization";
import { routing } from "@/i18n/routing";
import {
  ROUTES,
  SITE_AUTHORS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
} from "./constants";

export function constructMetadata({
  locale,
  title = SITE_NAME,
  description = SITE_DESCRIPTION[routing.defaultLocale as Lang],
  url = ROUTES.HOME,
  image = "/images/og-image.jpg",
  icons = "/favicon.ico",
  noIndex = false,
  onlyName = false,
}: {
  title?: string;
  description?: string;
  url?: string;
  locale?: LocaleCode;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  onlyName?: boolean;
  shortName?: boolean;
} = {}): Metadata {
  const titleSite = onlyName ? title : `${title} | ${SITE_NAME}`;
  const {language} = new Intl.Locale(locale || routing.defaultLocale);
  return {
    title: `${titleSite} - ${SITE_TITLE[language as Lang]}`,
    description,
    openGraph: {
      title,
      locale: locale?.split("-").join("_"),
      description,
      url,
      authors: SITE_AUTHORS,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      // creator: '@evgenii_goryunoff'
    },
    icons,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL!),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

function generateOpenGraph(language: Lang) {
  const defaultOpenGraph: Metadata["openGraph"] = {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_TITLE[language],
    description: SITE_DESCRIPTION[language],
    images: [
      {
        url: "/images/og-image.jpg",
      },
    ],
  };
  return defaultOpenGraph;
}

export const mergeOpenGraph = (
  og?: Metadata["openGraph"],
  language: Lang = "ru",
): Metadata["openGraph"] => {
  const openGraph = generateOpenGraph(language);
  return {
    ...openGraph,
    ...og,

    images: og?.images ? og.images : openGraph.images,
  };
};
