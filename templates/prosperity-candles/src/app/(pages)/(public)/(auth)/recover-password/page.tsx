import type { Metadata } from "next";
import React, { Suspense } from "react";
import { Card, CardContent } from "@/components/elements/Card";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import { RecoverPasswordForm } from "./RecoverPasswordForm";

export default async function RecoverPassword() {
	return (
		<div className='container mx-auto'>
			<Card className='mb-32 mt-8 w-full max-w-full p-4 sm:mx-auto sm:max-w-[425px] md:max-w-[520px]'>
				<h1 className={"fsMiddle font-bold"}>Восстановление учетной записи</h1>
				<CardContent className='mx-auto max-w-full !p-0'>
					<div className={"fsSmall text-muted-foreground mb-4 space-y-1"}>
						Заполните форму, чтобы восстановить доступ к аккаунту.
					</div>
					<Suspense>
						<RecoverPasswordForm />
					</Suspense>
				</CardContent>
			</Card>
		</div>
	);
}

export const metadata: Metadata = {
	title: "Recover Password",
	description: "Enter your email address to recover your password.",
	openGraph: mergeOpenGraph({
		title: "Recover Password",
		url: "/recover-password",
	}),
};
