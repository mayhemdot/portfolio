import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { Breadcrumbs } from "@/components/elements/Breadcrumbs";
import { Gutter } from "@/components/Gutter";
import { Message } from "@/components/Message";
import { Text } from "@/components/Text";
import { type CartPageType, staticCart } from "@/payload/seed/cart-static";
import { generateMeta } from "@/utilities/generateMeta";
import { CartPage } from "./page.client";

// Force this page to be dynamic so that Next.js does not cache it
// See the note in '../[slug]/page.tsx' about this
export const dynamic = "force-dynamic";

export default async function Cart() {
	const page: CartPageType | null = staticCart;

	if (!page) {
		return notFound();
	}

	return (
		<>
			<Breadcrumbs
				breadcrumbs={[
					{ id: 1, name: "Главная", href: "/" },
					{ id: 2, name: "Корзина", href: `` },
				]}
			/>
			<div className='min-h-dvh container mx-auto'>
				{!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && <EnableCheckout />}

				<Text comp='h1' size={"lg"} font='laguna' className='mb-8 text-center'>
					{"Корзина"}
				</Text>

				<CartPage page={page} />
				{/* <Blocks blocks={page?.layout} /> */}
			</div>
		</>
	);
}

export async function generateMetadata(): Promise<Metadata> {
	let page: CartPageType | null = null;

	if (!page) {
		page = staticCart;
	}

	return generateMeta({ doc: page });
}

function EnableCheckout() {
	return (
		<Gutter>
			<Message
				className={"mb-4"}
				warning={
					<Fragment>
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
					</Fragment>
				}
			/>
		</Gutter>
	);
}
