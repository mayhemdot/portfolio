import type { Metadata } from "next";
import { getServerSideURL } from "@/shared/utils/getURL";
import { mergeOpenGraph } from "@/shared/utils/mergeOpenGraph";
import { SITE_NAME } from "./generateMeta";

// import { mergeOpenGraph } from "../../payload/utils/mergeOpenGraph";

// import { getServerSideURL } from "utils/getURL";
// import type { Config, Media, Page } from "@/payload-types";
//Media | Config["db"]["defaultIDType"]

const DEFAULT_DESCRIPTION = "Premium Knives & Sharpening Tools";
const DEFAULT_TITLE = "Edge Mastery - Premium Knives & Sharpening Tools";

export const getImageURL = (image?: any | null) => {
  const serverUrl = getServerSideURL();

  let url = `${serverUrl}/website-template-OG.webp`;

  if (image && typeof image === "object" && "url" in image) {
    const ogUrl = image.sizes?.og?.url;

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url;
  }

  return url;
};

export const generateMeta = async (args: {
  doc: Partial<{
    slug: string[];
    meta: {
      title: string;
      description: string;
      image: any;
    };
  }>;
}): Promise<Metadata> => {
  const { doc } = args || {};

  const ogImage = getImageURL(doc?.meta?.image);

  const title = metadataTitle(doc?.meta?.title);
  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || "",
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join("/") : "/",
    }),
    title,
  };
};

export const generateProductMeta = async ({
  imgSrc,
  title,
  description = DEFAULT_DESCRIPTION,
}: {
  title: string;
  description?: string | null;
  imgSrc?: string | null;
}) => {
  title = metadataTitle(title);

  const ogImage = imgSrc && typeof imgSrc === "string" ? `${getServerSideURL()}/${imgSrc}` : getImageURL();

  return {
    title,
    description,
    openGraph: {
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      description,
      title,
    },
  } as Metadata;
};

export function metadataTitle(title?: string) {
  return title ? `${title} | ${SITE_NAME}` : SITE_NAME;
}
