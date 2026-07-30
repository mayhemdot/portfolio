import { revalidateTag } from "next/cache";
import type { GlobalAfterChangeHook } from "payload";

export const revalidateHeader: GlobalAfterChangeHook = ({
	doc,
	req: { payload, context },
}) => {
	if (!context.disableRevalidate) {
		payload.logger.info(`Revalidating header`);

		try {
			revalidateTag("global_header", "max");
		} catch (err) {
			// Revalidation errors are expected when running outside Next.js request context
		}
	}

	return doc;
};
