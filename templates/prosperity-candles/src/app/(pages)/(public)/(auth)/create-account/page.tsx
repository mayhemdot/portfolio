import type { Metadata } from "next";
import { Card, CardContent } from "@/components/elements/Card";
import { Icons } from "@/components/icons/Icons";
import { LinkButton } from "@/components/LinkButton";
import { RenderParams } from "@/components/RenderParams";
import { Text } from "@/components/Text";
import { ACCOUNT_LINKS } from "@/modules/common/data/urls";
import { getMeUser } from "@/utilities/getMeUser";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import CreateAccountForm from "./page.client";

export default async function CreateAccount(params: {
	searchParams: Promise<any>;
}) {
	// await getMeUser({
	// 	validUserRedirect: `/account?warning=${encodeURIComponent(
	// 		"Cannot create a new account while logged in, please log out and try again."
	// 	)}`,
	// });
	const searchParams = await params.searchParams;
	const paramsUrls = new URLSearchParams(searchParams).toString();

	const allParams = searchParams.toString() ? `?${paramsUrls.toString()}` : "";

	return (
		<div className='container mx-auto'>
			<RenderParams />
			<Card className='mb-32 mt-8 w-full max-w-full p-4 sm:mx-auto sm:max-w-[425px] md:max-w-[520px]'>
				<div className={"fsH2 relative mb-4 flex items-center md:mb-8"}>
					<div className='relative mb-2 hidden md:block'>
						<Icons.logo width={"4rem"} height={"4rem"} />
					</div>
					<div className='mx-auto flex basis-5/6 flex-col items-center justify-center'>
						<Text comp='h1' size={"smd"} variant={"primary"}>
							Создать новый аккаунт
						</Text>
						<LinkButton
							href={`${ACCOUNT_LINKS.LOGIN}${allParams}`}
							className='h-8'
						>
							Может у вас уже есть аккаунт?
						</LinkButton>
					</div>
					<div></div>
				</div>
				<CardContent className='p-0! mx-auto max-w-full'>
					<CreateAccountForm />
				</CardContent>
			</Card>
		</div>
	);
}

export const metadata: Metadata = {
	title: "Create Account",
	description: "Create an account or log in to your existing account.",
	openGraph: mergeOpenGraph({
		title: "Create Account",
		url: "/create-account",
	}),
};
