import { getClientSideURL } from "@/utilities/getURL";

/**
 * Processes media resource URL to ensure proper formatting for Vercel Blob CDN or local fallbacks.
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (
  url: string | null | undefined,
  cacheTag?: string | null,
): string => {
  if (!url) return "";

  // Абсолютный URL (Vercel Blob, S3, localhost и т.д.)
  const fullUrl =
    url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `${getClientSideURL()}${url.startsWith("/") ? url : `/${url}`}`;

  const result = new URL(fullUrl);

  // Добавляем cache-busting без encodeURIComponent
  if (cacheTag) {
    result.searchParams.set("v", cacheTag);
  }

  if (
    process.env.NODE_ENV !== "production" &&
    (result.hostname === "localhost" || result.hostname === "127.0.0.1")
  ) {
    console.warn(
      `[Media Warning] Using local media URL: "${result.toString()}".`,
    );
  }

  return result.toString();
};

// export const getMediaUrl = (
// 	url: string | null | undefined,
// 	cacheTag?: string | null,
// ): string => {
// 	if (!url) return "";

// 	let formattedCacheTag = "";
// 	if (cacheTag && cacheTag !== "") {
// 		formattedCacheTag = `?${encodeURIComponent(cacheTag)}`;
// 	}

// 	// 1. Direct absolute URLs (Vercel Blob CDN, S3, external HTTPS)
// 	if (url.startsWith("http://") || url.startsWith("https://")) {
// 		// Log warning in development if using local URL instead of Vercel Blob CDN
// 		if (
// 			process.env.NODE_ENV !== "production" &&
// 			(url.includes("localhost") || url.includes("127.0.0.1"))
// 		) {
// 			console.warn(
// 				`[Media Warning] Legacy local URL detected: "${url}". Consider re-uploading file to Vercel Blob.`,
// 			);
// 		}
// 		return `${url}${formattedCacheTag}`;
// 	}

// 	// 2. Legacy relative local paths (/media/..., /api/media/...)
// 	if (process.env.NODE_ENV !== "production") {
// 		console.warn(
// 			`[Media Warning] Legacy relative path detected: "${url}". Resolving via fallback URL.`,
// 		);
// 	}

// 	const baseUrl = getClientSideURL();
// 	const sanitizedUrl = url.startsWith("/") ? url : `/${url}`;
// 	return `${baseUrl}${sanitizedUrl}${formattedCacheTag}`;
// };
