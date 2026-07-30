import { revalidateTag } from "next/cache";
import type { CollectionAfterChangeHook } from "payload";

export const revalidateRedirects: CollectionAfterChangeHook = ({
	doc,
	req: { payload },
}) => {
	payload.logger.info(`Revalidating redirects`);

	try {
		revalidateTag("redirects", "max");
	} catch (err) {
		// Revalidation errors are expected when running outside Next.js request context
	}

	return doc;
};
