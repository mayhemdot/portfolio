import { OrderStatusIcon } from "@/modules/orders/ui/order-list/order-status-item";
import { Text } from "@/shared/components/Text";

export function ActiveOrderCard({
	title,
	count,
	...props
}: {
	title: string;
	count: number;
	icon: any;
}) {
	return (
		<div className='fl-px-16/32 fl-py-16/32 bg-secondary hover:bg-secondary/70 grow cursor-pointer rounded-3xl'>
			<div className='flex justify-between'>
				<div className='flex flex-col gap-2'>
					<Text
						comp='h3'
						variant='secondary'
						size={"sm"}
						className='font-medium! truncate'
					>
						{title}
					</Text>
					<Text
						comp='p'
						variant='secondary'
						size={"sm"}
						className='font-extrabold!'
					>
						{count}
					</Text>
				</div>
				<OrderStatusIcon>
					<props.icon className='icon-size text-background' />
				</OrderStatusIcon>
			</div>
		</div>
	);
}
