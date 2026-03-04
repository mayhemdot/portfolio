import type { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
	return <div className='fl-px-8/32 container mx-auto'>{children}</div>;
}
