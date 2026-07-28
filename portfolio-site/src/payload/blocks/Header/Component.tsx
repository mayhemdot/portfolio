import type { Header as HeaderType } from "@/payload/payload-types";
import { getCachedGlobal } from "@/utilities/getGlobals";
import { HeaderClient } from "./Component.client";

export async function Header() {
	const headerData: HeaderType = await getCachedGlobal("header", 1)();

	// return null;
	return <HeaderClient data={headerData} />;
}
