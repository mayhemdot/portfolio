import type { Metadata } from "next";
import { Suspense } from "react";
import { Card, CardContent } from "@/components/elements/Card";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import { ResetPasswordForm } from "./page.client";

export default async function ResetPassword() {
	return (
		<div className='container mx-auto'>
			<Card className='mb-32 mt-8 w-full max-w-full p-4 sm:mx-auto sm:max-w-[425px] md:max-w-[520px]'>
				<h1 className={"fsMiddle text-center font-bold"}>
					Сброс пароля учетной записи
				</h1>
				<CardContent className='p-0! mx-auto max-w-full'>
					<div className={"fsSmall mb-4 space-y-1"}>
						Заполните форму, чтобы установить новый пароль.
					</div>
					<Suspense>
						<ResetPasswordForm />
					</Suspense>
				</CardContent>
			</Card>
		</div>
	);
}

export const metadata: Metadata = {
	title: "Reset Password",
	description: "Enter a new password.",
	openGraph: mergeOpenGraph({
		title: "Reset Password",
		url: "/reset-password",
	}),
};
