import { Text } from "@/components/Text";

export function formatPrice(
	amount: number,
	minimumFractionDigits?: number,
	maximumFractionDigits?: number
) {
	const formatter = new Intl.NumberFormat("ru-RU", {
		style: "decimal",
		minimumFractionDigits: minimumFractionDigits ?? 0,
		maximumFractionDigits: maximumFractionDigits ?? 0,
		useGrouping: true,
	});

	const formattedNumber = formatter.format(amount);

	return (
		<>
			{`${formattedNumber}`}
			<Text
				comp='span'
				size='sm'
				variant='secondary'
				font='ricordi'
				className='ml-1'
			>
				₽
			</Text>
		</>
	);
}
