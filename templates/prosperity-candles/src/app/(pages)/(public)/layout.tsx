import type { PropsWithChildren } from "react";
import { HeaderCmp } from "@/components/Header";

export default async function LayoutPublicPage({
	children,
}: PropsWithChildren) {
	return (
		<div className='flex min-h-screen w-full flex-col'>
			<HeaderCmp />
			{children}
		</div>
	);
}
