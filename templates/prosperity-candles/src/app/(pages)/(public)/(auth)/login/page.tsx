import type { Metadata } from "next";
import { Card, CardContent } from "@/components/elements/Card";
import { Icons } from "@/components/icons/Icons";
import { LinkButton } from "@/components/LinkButton";
import { RenderParams } from "@/components/RenderParams";
import { Text } from "@/components/Text";
import { cn } from "@/lib/utils";
import { ACCOUNT_LINKS } from "@/modules/common/data/urls";
import { getMeUser } from "@/utilities/getMeUser";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import classes from "./index.module.scss";
import LoginForm from "./page.client";

export default async function Login() {
	// await getMeUser({
	// 	validUserRedirect: `/account?warning=${encodeURIComponent(
	// 		"You are already logged in."
	// 	)}`,
	// });

	return (
		<div className='container mx-auto'>
			<RenderParams className={classes.params} />
			<Card className={classes.card}>
				<div className={cn(classes.cardHeader, "fsH2")}>
					<div className={classes.iconWrapper}>
						<Icons.logo width={"4rem"} height={"4rem"} />
					</div>
					<div className={classes.cardTitleWrapper}>
						<Text comp='h1' size={"smd"} variant={"primary"}>
							Войти в аккаунт
						</Text>
						<LinkButton href={ACCOUNT_LINKS.REGISTER} className='h-8'>
							Вы уже имеете аккаунт?
						</LinkButton>
					</div>
				</div>
				<CardContent className={classes.cardContent}>
					<span className={cn(classes.cardNotice, "fsSmall")}>
						Заполните форму, чтобы войти в вашу учетную запись.
					</span>
					<LoginForm />
				</CardContent>
			</Card>
		</div>
	);
}

export const metadata: Metadata = {
	title: "Login",
	description: "Login or create an account to get started.",
	openGraph: mergeOpenGraph({
		title: "Login",
		url: "/login",
	}),
};
