import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { Button } from "@/components/Button";
import { Gutter } from "@/components/Gutter";
import { HR } from "@/components/HR";
import { Media } from "@/components/Media";
import { Price } from "@/components/Price";
import { ORDERS } from "@/modules/orders/queries";
import type { Order } from "@/modules/orders/types";
import { formatDateTime } from "@/utilities/formatDateTime";
import { getMeUser } from "@/utilities/getMeUser";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import classes from "./index.module.scss";

type Args = {
	params: Promise<{ id: string }>;
};

export default async function OrderPage({ params }: Args) {
	const { id } = await params;
	// const { token } = await getMeUser({
	// 	nullUserRedirect: `/login?error=${encodeURIComponent(
	// 		"You must be logged in to view this order."
	// 	)}&redirect=${encodeURIComponent(`/order/${id}`)}`,
	// });

	const order: Order = ORDERS[0];

	// try {
	// 	order = await fetch(
	// 		`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/${id}`,
	// 		{
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 				Authorization: `JWT ${token}`,
	// 			},
	// 		}
	// 	)?.then(async res => {
	// 		if (!res.ok) notFound();
	// 		const json = await res.json();
	// 		if ("error" in json && json.error) notFound();
	// 		if ("errors" in json && json.errors) notFound();
	// 		return json;
	// 	});
	// } catch (error) {
	// 	console.error(error); // eslint-disable-line no-console
	// }

	if (!order) {
		notFound();
	}

	return (
		<Gutter className={classes.orders}>
			<h1>
				{`Order`}
				<span className={classes.id}>{`${order.id}`}</span>
			</h1>
			<div className={classes.itemMeta}>
				<p>{`ID: ${order.id}`}</p>
				<p>{`Payment Intent: ${order.stripePaymentIntentID}`}</p>
				<p>{`Ordered On: ${formatDateTime(order.createdAt)}`}</p>
				<p className={classes.total}>
					{"Total: "}
					{new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "usd",
					}).format(order.total / 100)}
				</p>
			</div>
			<HR />
			<div className={classes.order}>
				<h4 className={classes.orderItems}>Items</h4>
				{order.items?.map((item, index) => {
					if (
						typeof item.variant === "object" &&
						typeof item.variant?.product === "object"
					) {
						const {
							quantity = 1,
							variant,
							variant: {
								product,
								product: { id, title }, // meta, stripeProductID
							},
						} = item;

						const isLast = index === (order?.items?.length || 0) - 1;
						const metaImage = product?.images?.[0];

						return (
							<Fragment key={index.toString()}>
								<div className={classes.row}>
									<Link
										href={`/products/${product.slug}`}
										className={classes.mediaWrapper}
									>
										{!metaImage && (
											<span className={classes.placeholder}>No image</span>
										)}
										{metaImage && typeof metaImage !== "string" && (
											<Media
												className={classes.media}
												imgClassName={classes.image}
												url={metaImage?.url}
												fill
											/>
										)}
									</Link>
									<div className={classes.rowContent}>
										{/* {!stripeProductID && (
											<p className={classes.warning}>
												{
													"This product is not yet connected to Stripe. To link this product, "
												}
												<Link
													href={`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/products/${id}`}
												>
													edit this product in the admin panel
												</Link>
												{"."}
											</p>
										)} */}
										<h5 className={classes.title}>
											<Link
												href={`/products/${product.slug}`}
												className={classes.titleLink}
											>
												{title}
											</Link>
										</h5>
										<p>{`Quantity: ${quantity}`}</p>
										{/* <Price product={product} button={false} quantity={quantity} /> */}
										<Price
											variant={variant}
											button={false}
											quantity={quantity || 1}
											size={"smd"}
										/>
										{/* <Price amount={""} /> */}
									</div>
								</div>
								{!isLast && <HR />}
							</Fragment>
						);
					}

					return null;
				})}
			</div>
			<HR />
			<div className={classes.actions}>
				<Button href='/orders' appearance='primary' label='See all orders' />
				<Button href='/account' appearance='secondary' label='Go to account' />
			</div>
		</Gutter>
	);
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: number | string }>;
}): Promise<Metadata> {
	const { id } = await params;
	return {
		title: `Order ${id}`,
		description: `Order details for order ${id}.`,
		openGraph: mergeOpenGraph({
			title: `Order ${id}`,
			url: `/orders/${id}`,
		}),
	};
}
