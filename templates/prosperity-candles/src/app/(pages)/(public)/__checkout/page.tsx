import type { Metadata } from "next";
import React, { Fragment } from "react";
import { Gutter } from "@/components/Gutter";
import { Message } from "@/components/Message";
import type { Settings } from "@/payload/payload-types";
// import { fetchSettings } from "@/app/_api/fetchGlobals";
// import { LowImpactHero } from "@/app/_heros/LowImpact";
import { getMeUser } from "@/utilities/getMeUser";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import classes from "./index.module.scss";
import { CheckoutPage } from "./page.client";

export default async function Checkout() {
	await getMeUser({
		nullUserRedirect: `/login?error=${encodeURIComponent(
			"You must be logged in to checkout."
		)}&redirect=${encodeURIComponent("/checkout")}`,
	});

	const settings: Settings | null = null;

	try {
		// settings = await fetchSettings();
		console.log("settings");
	} catch (error) {
		// no need to redirect to 404 here, just simply render the page with fallback data where necessary
		console.error(error); // eslint-disable-line no-console
	}

	return (
		<>
			{!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && (
				<Gutter>
					<Message className={classes.message} warning={<Warning />} />
				</Gutter>
			)}
			{/* <LowImpactHero
				type='lowImpact'
				media={null}
				richText={[
					{
						type: "h1",
						children: [
							{
								text: "Оформление",
							},
						],
					},
				]}
			/> */}

			<section className={classes.checkoutPage}>
				<CheckoutPage />
			</section>
		</>
	);
}

function Warning() {
	return (
		<>
			{"To enable checkout, you must "}
			<a
				href='https://dashboard.stripe.com/test/apikeys'
				target='_blank'
				rel='noopener noreferrer'
			>
				{"obtain your Stripe API Keys"}
			</a>
			{" then set them as environment variables. See the "}
			<a
				href='https://github.com/payloadcms/payload/blob/main/templates/ecommerce/README.md#stripe'
				target='_blank'
				rel='noopener noreferrer'
			>
				{"README"}
			</a>
			{" for more details."}
		</>
	);
}

export const metadata: Metadata = {
	title: "Account",
	description: "Create an account or log in to your existing account.",
	openGraph: mergeOpenGraph({
		title: "Account",
		url: "/account",
	}),
};
