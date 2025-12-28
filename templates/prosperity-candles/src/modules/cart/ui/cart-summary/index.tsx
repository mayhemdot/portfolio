import { Fragment, type PropsWithChildren } from "react";
import Price from "@/components/Price/Price";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function CartSummary({
	countItems,
	description,
	cartTotal,
	children,
}: PropsWithChildren<{
	description: string;
	countItems: number;
	cartTotal: { formatted: string; raw: number };
}>) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='py-0'>{children}</CardTitle>
				<CardDescription className='fsSmallest'>{description}</CardDescription>
			</CardHeader>
			<CardContent className='fsNormal space-y-2'>
				{[
					{
						label: "Ваша корзина",
						value: <span>{countItems || 0} товар</span>,
					},
					{
						label: "Сумма к оплате:",
						value: (
							<Price
								amount={cartTotal?.raw || 0}
								className='digits flex flex-1 justify-end'
							/>
						),
					},
				].map(row => (
					<Fragment key={row.label}>
						<Separator />
						<div className={"flex grow justify-between"}>
							<span className='font-bold'>{row.label}</span>
							{row.value}
						</div>
					</Fragment>
				))}
			</CardContent>
			<CardFooter className='fsSmallest'>
				Минимальная сумма к оплате: 1000₽
			</CardFooter>
		</Card>
	);
}

export default CartSummary;
