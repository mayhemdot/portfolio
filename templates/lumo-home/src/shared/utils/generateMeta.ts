import type { Metadata } from "next";
import type { Product } from "@/modules/products/model/types";
import type { MediaType } from "@/shared/components/Media/types";
import { SITE_NAME, SITE_TITLE } from "@/shared/utils/constants";
import { getServerSideURL } from "./getUrl";
import { mergeOpenGraph } from "./mergeOpenGraph";

// import { mergeOpenGraph } from "./mergeOpenGraph";

const getImageURL = (image?: MediaType | null) => {
  const serverUrl = getServerSideURL();

  const url = `${serverUrl}/website-template-OG.webp`;

  if (image && typeof image === "object" && "url" in image) {
    // const ogUrl = image.sizes?.og?.url;
    // url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url;
  }
  return url;
};

export const generateMeta = async (args: {
  doc: Partial<any> | Partial<Product>;
}): Promise<Metadata> => {
  const { doc } = args || {};
  const ogImage = getImageURL(doc?.meta?.image);

  const title = doc?.meta?.title
    ? `${doc?.meta?.title} | ${SITE_TITLE}`
    : "Payload Website Template";

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
