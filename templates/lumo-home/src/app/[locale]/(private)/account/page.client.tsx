"use client";
import {
	Check,
	CheckIcon,
	ChevronsUpDown,
	Handshake,
	PrinterIcon,
	Truck,
	Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { LocaleCode } from "@/i18n/localization";
import { Order, type OrderRaw } from "@/modules/orders/model/types";
import {
	isActiveOrders,
	isShippedOrders,
} from "@/modules/orders/utils/filters";
import type { PaginatedDocs } from "@/modules/products/queries/searchProducts";
import type { User } from "@/modules/users/model/types";

import { Text } from "@/shared/components/Text";

import { OrderListItem } from "@/modules/orders/ui/order-list";
import { OrderStatusIcon } from "@/modules/orders/ui/order-list/order-status-item";

type Props = {
	userProfile?: User;
	ordersData: PaginatedDocs<OrderRaw>;
	locale: LocaleCode;
};

export function AccountPageClient({ ordersData, locale }: Props) {
	const t = useTranslations("AccountPage");

	const orders = ordersData?.docs?.map(o => new Order(o, locale));

	const STATUS_LABELS: Record<string, string> = {
		pending: t("orders.statuses.pending"),
		waiting_for_capture: t("orders.statuses.waiting_for_capture"),
		paid: t("orders.statuses.paid"),
		preparing: t("orders.statuses.preparing"),
		delivering: t("orders.statuses.delivering"),
		shipped: t("orders.statuses.shipped"),
		cancelled: t("orders.statuses.cancelled"),
		refund_requested: t("orders.statuses.refund_requested"),
	};
	return (
		<div className='mb-32 grow'>
			<div className={"fl-gap-8/24 mb-2 flex md:mb-4 xl:mb-6"}>
				<ActiveOrderCard
					icon={Zap}
					title={t("cards.activeOrders")}
					count={isActiveOrders(orders)?.length || 0}
				/>
				<ActiveOrderCard
					icon={Check}
					title={t("cards.completedOrders")}
					count={isShippedOrders(orders)?.length || 0}
				/>
			</div>
			<div
				className={
					"2xl:rounded-4xl flex items-center gap-3 rounded-2xl md:rounded-3xl xl:gap-4"
				}
			>
				{[...isActiveOrders(orders)].map(order => {
					return (
						<OrderListItem
							key={order.id}
							orderData={order.raw}
							orderStatusText={
								order.status ? STATUS_LABELS[order.status] || order.status : ""
							}
							locale={locale}
						/>
					);
				})}
			</div>
		</div>
	);
}

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
