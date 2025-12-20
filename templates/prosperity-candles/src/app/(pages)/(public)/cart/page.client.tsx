"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LoadingShimmer } from "@/components/LoadingShimmer";
import { Text } from "@/components/Text";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import CartList from "@/modules/cart/components/CartList";
import CartSummary from "@/modules/cart/components/CartSummary";
import { useCartStore } from "@/modules/cart/store";
import { MESSAGES } from "@/modules/common/data/constants";
import { useAuth } from "@/modules/users/queries";
import type { CartPageType } from "@/payload/seed/cart-static";

// import { LoadingShimmer } from "@//components/LoadingShimmer";
// import { useAuth } from "@/app/_providers/Auth";
// import { formattedCartItems } from "@/app/_utilities/cart/cart-items";
// import classes from './index.module.scss'
// import type {  Settings } from "@/payload/payload-types";

export function CartPage({ page }: { page: CartPageType }) {
	const router = useRouter();
	const { user } = useAuth();
	const {
		// addItem,
		// updateQuantity,
		// removeItem,
		cartIsNotSelected,
		deleteSelectedItems,
		setAllItemsSelected,
		allIsSelected,
		cartTotal,
		cartIsEmpty,
		items,
		getCart,
		hasInitializedCart,
	} = useCartStore();

	const cart = getCart();

	const total = cartTotal();
	const length = items?.length || 0; //selectedItems?.
	const isEmpty = cartIsEmpty();
	const allItemsIsSelected = allIsSelected();
	const cartItemsIsNotSelected = cartIsNotSelected();

	return (
		<div className={"fl-px-16/96 flex grow flex-wrap  gap-4 pb-24  lg:px-0"}>
			{hasInitializedCart && isEmpty && (
				<div
					className={
						"bg-beige-color mx-auto space-y-4 rounded-3xl p-8 text-center"
					}
				>
					<Text comp='h3' size={"md"} variant={"primary"}>
						{/* Your cart is empty. */}
						Ваша корзина пуста
					</Text>
					{user && <GoToCatalog slug={"products"} />}
					{!user && <GoToLogin />}
				</div>
			)}
			{hasInitializedCart && !isEmpty && (
				<>
					<section className='flex h-fit flex-1 basis-auto flex-col gap-2'>
						<div className='fsSmall bg-beige-color fl-px-24/64 fl-py-24/32 flex items-center justify-between rounded-3xl'>
							<div className='inline-flex items-center space-x-2'>
								<Checkbox
									id={"item-1"}
									className='size-4'
									checked={allItemsIsSelected}
									onCheckedChange={selected => {
										setAllItemsSelected(Boolean(selected));
									}}
								/>
								<Label htmlFor={"item-1"} className='fsSmall'>
									Выбрать все
								</Label>
							</div>
							<Button
								variant='destructive-ghost'
								size='none'
								className='fsSmall'
								onClick={() => deleteSelectedItems()}
							>
								Удалить выбранные
							</Button>
						</div>

						{hasInitializedCart ? (
							<CartList items={cart.items} />
						) : (
							<LoadingShimmer />
						)}
					</section>
					<aside className='h-fit shrink-0 grow basis-[320px] lg:basis-[420px]'>
						<CartSummary
							cartTotal={{
								raw: total,
								formatted: total.toFixed(2),
							}}
							countItems={length || 0}
							description={
								"Доступные способы и время доставки можно выбрать при оформлении заказа"
							}
						>
							<Button
								size={"lg"}
								className={"w-full"}
								onClick={() => {
									if (user) {
										toast.error(MESSAGES.checkout);
									} else {
										router.push(user ? "/cart" : "/login?redirect=%2Fcart");
									}
								}}
								disabled={!cartItemsIsNotSelected || total === 0}
							>
								{user ? "Оформить заказ" : "Войти в аккаунт"}
							</Button>
						</CartSummary>
					</aside>
				</>
			)}
		</div>
	);
}

// function CartTable({
//   cartItems,
//   cartIsEmpty,
//   productsPage,
//   ...rest
// }: {
//   cartItems: CartItems
//   cartIsEmpty: boolean
//   productsPage: any
//   isSubmitting?: boolean
// }) {
//   const items = formattedCartItems(cartItems)

//   // const isExisted = items?.filter((item) => item.variant.in_stock != 0 && item.variant.in_stock - item.quantity >= 0);
//   // const isNotExisted = items?.filter((item) => item.variant.in_stock == 0 || item.variant.in_stock - item.quantity < 0);

//   return <CartList items={items} {...rest} />
// }

function GoToCatalog({ slug }: { slug: string }) {
	return (
		<div className='fsSmall py-2'>
			<Link
				href={`/${slug}`}
				className={buttonVariants({
					size: "lg",
					variant: "link",
					className: "group",
				})}
			>
				Ваша корзина пуста нажмите чтобы продолжить покупки{" "}
				<ArrowRight
					className={"ml-2 transition-transform group-hover:translate-x-1"}
					size={16}
				/>
			</Link>
		</div>
	);
}

function GoToLogin() {
	return (
		<div className='fsSmall flex w-full max-w-lg flex-col items-center  gap-4 py-2 md:flex-row'>
			<Link
				href={`/login?redirect=%2Fcart`}
				className={buttonVariants({ size: "lg", variant: "default" })}
			>
				Войти в аккаунт
			</Link>{" "}
			<div>{`Чтобы увидеть сохраненную корзину.`}</div>
			{/* {` to view a saved cart.`} */}
		</div>
	);
}
