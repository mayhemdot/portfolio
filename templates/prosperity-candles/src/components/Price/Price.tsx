import type { FC, HTMLAttributes } from "react";
import { formatPrice } from "@/modules/products/utils/formatPrice";
import { Text } from "../Text";

interface IPriceProps extends HTMLAttributes<HTMLParagraphElement> {
	amount: string | number;
}

const Price: FC<IPriceProps> = ({ amount = 0, className }: IPriceProps) => {
	const amountNumber =
		typeof amount === "number" ? Number(amount) : parseInt(amount, 10);

	return (
		<Text suppressHydrationWarning comp='p' size={"smd"} className={className}>
			{formatPrice(Number(amountNumber) / 100)}
		</Text>
	);
};

export default Price;
