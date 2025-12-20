// "use client";

// import {
// 	PaymentElement,
// 	useElements,
// 	useStripe,
// } from "@stripe/react-stripe-js";
// import { ChevronsUpDown } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import type React from "react";
// import { useCallback, useState } from "react";
// import { Media } from "@/app/_components/Media";
// import { Message } from "@/app/_components/Message";
// import { Price } from "@/app/_components/Price";
// import { useCart } from "@/app/_providers/Cart";
// import { fetchField } from "@/app/_utilities/cart";
// import { formattedCartItems } from "@/app/_utilities/cart/cart-items";
// import CartSummary from "@/app/modules/cart/components/CartSummary";
// import NoImage from "@/components/elements/NoImage";
// import { Button, buttonVariants } from "@/components/ui/button";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import {
// 	Collapsible,
// 	CollapsibleContent,
// 	CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import { Separator } from "@/components/ui/separator";
// import type { Order } from "@/payload/payload-types";

// import classes from "./index.module.scss";

// export const CheckoutForm: React.FC<{}> = () => {
// 	const router = useRouter();
// 	const stripe = useStripe();
// 	const elements = useElements();

// 	const [error, setError] = useState<string | null>(null);
// 	const [isLoading, setIsLoading] = useState<boolean>(false);
// 	const [isOpen, setIsOpen] = useState<boolean>(false);

// 	const { cart, cartTotal, cartIsEmpty } = useCart();

// 	const handleSubmit = useCallback(
// 		async e => {
// 			e.preventDefault();
// 			setIsLoading(true);

// 			try {
// 				const { error: stripeError, paymentIntent } =
// 					await stripe?.confirmPayment({
// 						elements: elements,
// 						redirect: "if_required",
// 						confirmParams: {
// 							return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/order-confirmation`,
// 						},
// 					});

// 				if (stripeError) {
// 					setError(stripeError.message);
// 					setIsLoading(false);
// 				}

// 				if (paymentIntent) {
// 					// Before redirecting to the order confirmation page, we need to create the order in Payload
// 					// Cannot clear the cart yet because if you clear the cart while in the checkout
// 					// you will be redirected to the `/cart` page before this redirect happens
// 					// Instead, we clear the cart in an `afterChange` hook on the `orders` collection in Payload

// 					try {
// 						const variations = formattedCartItems(cart?.items)
// 							?.filter(cartItem => Boolean(cartItem.isSelected))
// 							.map(({ variant, price, quantity }) => ({
// 								variant: fetchField(variant),
// 								quantity,
// 								price,
// 							}));

// 						const orderReq = await fetch(
// 							`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`,
// 							{
// 								method: "POST",
// 								credentials: "include",
// 								headers: {
// 									"Content-Type": "application/json",
// 								},
// 								body: JSON.stringify({
// 									total: cartTotal.raw,
// 									stripePaymentIntentID: paymentIntent.id,
// 									items: variations,
// 								}),
// 							}
// 						);

// 						if (!orderReq.ok) {
// 							throw new Error(orderReq.statusText || "Something went wrong.");
// 						}
// 						const {
// 							error: errorFromRes,
// 							doc,
// 						}: {
// 							message?: string;
// 							error?: string;
// 							doc: Order;
// 						} = await orderReq.json();

// 						if (errorFromRes) {
// 							throw new Error(errorFromRes);
// 						}

// 						router.push(`/order-confirmation?order_id=${doc.id}`);
// 					} catch (err) {
// 						// don't throw an error if the order was not created successfully
// 						// this is because payment _did_ in fact go through, and we don't want the user to pay twice
// 						console.error(err.message); // eslint-disable-line no-console
// 						router.push(
// 							`/order-confirmation?error=${encodeURIComponent(err.message)}`
// 						);
// 					}
// 				}
// 			} catch (err) {
// 				const msg =
// 					err instanceof Error ? err.message : "Something went wrong.";
// 				setError(`Error while submitting payment: ${msg}`);
// 				setIsLoading(false);
// 			}
// 		},
// 		[stripe, elements, router, cart, cartTotal]
// 	);
// 	const selectedItems = cart?.items?.filter(item => item.isSelected);
// 	const countItems = selectedItems?.length || 0;
// 	return (
// 		<form onSubmit={handleSubmit} className={classes.form}>
// 			<div className={classes.formContainer}>
// 				{error && <Message error={error} />}
// 				{isLoading && (
// 					<div className={classes.loadingOverlay}>
// 						<p>Обработка платежа...</p>
// 					</div>
// 				)}
// 				<PaymentElement />
// 			</div>
// 			<aside className={classes.summary}>
// 				<CartSummary
// 					countItems={countItems}
// 					cartTotal={cartTotal}
// 					description='Доступные способы и время доставки можно выбрать при оформлении заказа'
// 				>
// 					<Button
// 						className={buttonVariants({
// 							size: "lg",
// 							className: "h-12 w-full rounded-2xl",
// 						})}
// 						type='submit'
// 						disabled={isLoading || cartTotal.raw === 0}
// 					>
// 						{isLoading ? "Оформление заказа..." : "Оформить заказ"}
// 					</Button>
// 				</CartSummary>
// 				{!cartIsEmpty && (
// 					<Card className='bg-beige-color'>
// 						<Collapsible open={isOpen} onOpenChange={setIsOpen}>
// 							<CardHeader>
// 								<CollapsibleTrigger>
// 									<div className='flex items-center justify-between'>
// 										<h4 className='text-sm font-semibold'>
// 											Продукты - ({countItems} шт)
// 										</h4>
// 										<ChevronsUpDown className='size-4' />
// 										<span className='sr-only'>Toggle</span>
// 									</div>
// 								</CollapsibleTrigger>
// 							</CardHeader>

// 							<CollapsibleContent>
// 								<CardContent>
// 									{formattedCartItems(selectedItems)?.map((item, index) => {
// 										if (typeof item?.variant?.product === "object") {
// 											const {
// 												quantity,
// 												variant,
// 												variant: {
// 													images,
// 													product: { id, stripeProductID, title, priceJSON },
// 												},
// 											} = item;

// 											if (!quantity) return null;

// 											const metaImage =
// 												images?.length > 0 &&
// 												typeof images[0]?.image === "object"
// 													? images[0]?.image
// 													: null;

// 											return (
// 												<>
// 													<div className={classes.row} key={index}>
// 														<div className={classes.mediaWrapper}>
// 															{metaImage ? (
// 																<Media
// 																	className={classes.media}
// 																	imgClassName={classes.image}
// 																	resource={metaImage}
// 																	fill
// 																/>
// 															) : (
// 																<NoImage />
// 															)}
// 														</div>
// 														<div className={classes.rowContent}>
// 															{!stripeProductID ? (
// 																<p className={classes.warning}>
// 																	{/* {"This product is not yet connected to Stripe. To link this product, "} */}
// 																	{
// 																		"Этот продукт еще не связан с Stripe. Для связи этого продукта, "
// 																	}
// 																	<Link
// 																		href={`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/products/${id}`}
// 																	>
// 																		{/* edit this product in the admin panel */}
// 																		отредактируйте его в админ панели
// 																	</Link>
// 																	{"."}
// 																</p>
// 															) : (
// 																<>
// 																	<h6 className={classes.title}>{title}</h6>
// 																	<div className={"flex items-center gap-4"}>
// 																		<div>{variant.sizeName}</div>
// 																		<Price
// 																			variant={variant}
// 																			button={false}
// 																			quantity={quantity}
// 																			priceJSON={priceJSON}
// 																		/>
// 																	</div>
// 																</>
// 															)}
// 														</div>
// 													</div>
// 													{!(index === (cart?.items?.length || 0) - 1) ? (
// 														<Separator className='my-4' />
// 													) : null}
// 												</>
// 											);
// 										}
// 										return null;
// 									})}
// 								</CardContent>
// 							</CollapsibleContent>
// 						</Collapsible>
// 					</Card>
// 				)}
// 			</aside>
// 		</form>
// 	);
// };

// export default CheckoutForm;
