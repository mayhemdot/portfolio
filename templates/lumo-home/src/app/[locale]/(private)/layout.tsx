import { PropsWithChildren } from "react";
import { HeaderBlock } from "@/shared/components/Header/Component";
import { Footer } from "@/shared/components/Footer/Component";
import { retrieveCustomer } from "@/modules/users/actions/getUser";

export default async function RootLayout({ children }: PropsWithChildren) {
	// const userProfile = await getCurrentUserAction({ depth: 3 })
	const userProfile = await retrieveCustomer();
	return (
		<>
			<HeaderBlock user={userProfile} searchIsHidden={true} />
			<main className='min-h-dvh fl-px-8/32 container w-full grow'>
				{children}
			</main>
			<Footer />
		</>
	);
}
