import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
	return (
		<div className='container mx-auto flex min-h-screen flex-col items-center gap-4'>
			{children}
		</div>
	);
}
