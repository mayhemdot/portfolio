"use client";

// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { LoadingShimmer } from "@/components/LoadingShimmer";
import { Message } from "@/components/Message";
import { useCartStore } from "@/modules/cart/store";
// import { CheckoutForm } from "@/app/modules/checkout/components/CheckoutForm";
// import { useAuth } from "@/app/_providers/Auth";
// import { useCart } from "@/app/_providers/Cart";
import type { Settings } from "@/payload/payload-types";
import classes from "./index.module.scss";

const apiKey = `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`;
// const stripe = loadStripe(apiKey);

export const CheckoutPage: React.FC<any> = props => {
	// const { user } = useAuth();
	const user = null;

	const router = useRouter();
	const [error, setError] = useState<string | null>(null);

	const [clientSecret, setClientSecret] = useState();
	const hasMadePaymentIntent = useRef(false);

	const { items, cartIsEmpty, cartTotal } = useCartStore();

	React.useEffect(() => {
		if (user !== null && cartIsEmpty()) {
			router.push("/cart");
		}
	}, [router, cartIsEmpty]);

	// React.useEffect(() => {
	// 	if (user && items.length && hasMadePaymentIntent.current === false) {
	// 		hasMadePaymentIntent.current = true;

	// 		const makeIntent = async () => {
	// 			try {
	// 				const paymentReq = await fetch(
	// 					`${process.env.NEXT_PUBLIC_SERVER_URL}/api/create-payment-intent`,
	// 					{
	// 						method: "POST",
	// 						credentials: "include",
	// 					}
	// 				);

	// 				const res = await paymentReq.json();

	// 				if (res.error) {
	// 					setError(res.error);
	// 				} else if (res.client_secret) {
	// 					setError(null);
	// 					setClientSecret(res.client_secret);
	// 				}
	// 			} catch (e) {
	// 				setError("Something went wrong.");
	// 			}
	// 		};

	// 		makeIntent();
	// 	}
	// }, [cart, user]);

	if (!user) return null;

	return (
		<>
			{cartIsEmpty() && <CartIsEmpty productsPage={{ slug: "" }} />}
			{!clientSecret && !error && <IsLoadingShimmer />}
			{!clientSecret && error && <IsError error={error} />}
			{clientSecret && (
				<>
					{error && <Message error={error} />}
					{/* <Elements
						stripe={stripe}
						options={{
							clientSecret,
							appearance: {
								theme: "none",
								variables: {
									colorBackground: "#f6f1eb",
								},
							},
						}}
					>
						<CheckoutForm />
					</Elements> */}
				</>
			)}
		</>
	);
};

function CartIsEmpty({
	productsPage,
}: {
	productsPage: {
		slug: string;
	};
}) {
	return (
		<div>
			{"Your "}
			<Link href='/cart'>cart</Link>
			{" is empty."}
			{typeof productsPage === "object" && productsPage?.slug && (
				<Link href={`/${productsPage.slug}`}>Continue shopping?</Link>
			)}
		</div>
	);
}

function IsLoadingShimmer() {
	return (
		<div className={classes.loading}>
			<LoadingShimmer number={2} />
		</div>
	);
}

function IsError({ error }: { error: string | null }) {
	return (
		<div className={classes.error}>
			<p>{`Error: ${error}`}</p>
			<Link href='/cart'> Вернуться в корзину</Link>
		</div>
	);
}
