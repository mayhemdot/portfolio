import type { Metadata } from "next";
import React, { Suspense } from "react";
import { Gutter } from "@/components/Gutter";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import classes from "./index.module.scss";
import { OrderConfirmationPage } from "./OrderConfirmationPage";

export default async function OrderConfirmation() {
	return (
		<Gutter className={classes.confirmationPage}>
			<Suspense fallback={<div>Loading...</div>}>
				<OrderConfirmationPage />
			</Suspense>
		</Gutter>
	);
}

export const metadata: Metadata = {
	title: "Order Confirmation",
	description: "Your order has been confirmed.",
	openGraph: mergeOpenGraph({
		title: "Order Confirmation",
		url: "/order-confirmation",
	}),
};
