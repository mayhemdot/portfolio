import { Text, type TextProps } from "@/shared/components/Text";
import {
	type ConvertToLocaleParams,
	formatPrice,
} from "@/shared/utils/formatPrice";

export function Price({
	amount,
	options,
	className,
	...rest
}: {
	amount: number | string;
	className?: string;
	options?: ConvertToLocaleParams;
} & Omit<TextProps, "children">) {
	return (
		<Text {...rest} className={className}>
			{formatPrice(Number(amount), { ...options })}
		</Text>
	);
}
