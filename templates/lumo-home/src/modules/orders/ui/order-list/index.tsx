"use client";
import {
	CheckIcon,
	ChevronsUpDown,
	Handshake,
	PrinterIcon,
	Truck,
	Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { LocaleCode } from "@/i18n/localization";
import { Order, type OrderRaw } from "@/modules/orders/model/types";
import { CancelActionButton } from "@/modules/orders/ui/cancelActionButton";
import { isRefundableOrder } from "@/modules/orders/utils/filters";
import { Button } from "@/shared/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/shared/components/ui/collapsible";
import { Separator } from "@/shared/components/ui/separator";
import { formatPrice } from "@/shared/utils/formatPrice";
import { Text } from "@/shared/components/Text";
import { Badge } from "@/shared/components/ui/badge";
import { OrderStatusIcon, OrderStatusItem } from "./order-status-item";
import { OrderProductItem } from "./order-product-item";

type Props = {
	orderData: OrderRaw;
	locale: LocaleCode;
	orderStatusText: string;
};

export function OrderListItem({ orderData, orderStatusText, locale }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const t = useTranslations("AccountPage");

	const order = new Order(orderData, locale);

	return (
		<div
			key={order.id}
			className={
				"fl-px-16/24 fl-py-16/24 bg-secondary grow cursor-pointer rounded-3xl"
			}
		>
			<div className='flex items-center justify-between gap-4'>
				<div className='flex items-center gap-4'>
					<OrderStatusIcon variant='accent'>
						<Zap className='icon-size text-background' />
					</OrderStatusIcon>
					<Text
						comp='p'
						size='xsm'
						variant='secondary'
						className='font-semibold'
					>
						{t("orders.orderNumber", { id: order.id })}
					</Text>
				</div>
				<div className='flex items-center gap-3'>
					<Text
						comp='p'
						size='xsm'
						variant='secondary'
						className='font-semibold'
					>
						{formatPrice(Number(order.paymentAmount), {
							localeCode: locale,
						})}
					</Text>
					<Button variant='default' size='sm' disabled={true}>
						{<PrinterIcon size={10} className='icon-size' />}
						<span className='hidden lg:block'>{t("orders.actions.check")}</span>
					</Button>
				</div>
			</div>
			<Separator className='my-2' />

			<div className='relative flex flex-col items-start justify-between gap-4 overflow-clip lg:flex-row lg:items-center'>
				<span className='bg-primary absolute left-4 z-0 h-full w-1 lg:left-0 lg:h-1 lg:w-full' />
				<OrderStatusItem
					isActive={order.status === "pending"}
					title={t("orders.statusSteps.pending")}
					updatedAt={order.updatedAt}
					icon={<Zap className='icon-size text-primary' />}
					locale={locale}
				/>
				<OrderStatusItem
					title={t("orders.statusSteps.waiting_for_capture")}
					isActive={order.status === "waiting_for_capture"}
					icon={<Handshake className='icon-size text-primary' />}
					locale={locale}
				/>
				<OrderStatusItem
					title={t("orders.statusSteps.delivery")}
					isActive={
						order.status === "preparing" || order.status === "delivering"
					}
					icon={<Truck className='icon-size text-primary' />}
					locale={locale}
				/>

				<OrderStatusItem
					title={t("orders.statusSteps.completed")}
					isActive={order.status === "shipped"}
					icon={<CheckIcon className='icon-size text-primary' />}
					locale={locale}
				/>
			</div>
			<Separator className='my-2' />

			<Collapsible
				open={isOpen}
				onOpenChange={setIsOpen}
				className='flex flex-col gap-2'
			>
				<CollapsibleContent className='flex flex-col gap-1'>
					{order?.raw.items?.map(orderItem => (
						<OrderProductItem
							key={orderItem?.id}
							orderItem={orderItem}
							localeCode={locale}
						/>
					))}

					<Separator className='my-2' />

					<div className='mb-3 flex flex-row flex-wrap gap-3 lg:gap-8'>
						{[
							[
								{
									title: t("orders.details.orderedBy"),
									value: order.orderedBy?.firstName,
								},
								{
									title: t("orders.details.phone"),
									value: order.phone,
								},
							],

							[
								{
									title: t("orders.details.email"),
									value: order?.orderedBy?.email,
								},
								{
									title: t("orders.details.address"),
									value: t("orders.details.addressValue", {
										city: order.city ?? "",
										address: order.address ?? "",
										zip: order.zip ?? "",
									}),
								},
							],
						].map((columns, colIndx) => {
							return (
								<div key={String(colIndx)} className='space-y-1'>
									{columns.map((row, rowInx) => (
										<div key={String(colIndx + rowInx)} className='flex gap-2'>
											<Text comp='span' size='xs' variant='mutedForeground'>
												{row.title}
											</Text>
											<Text comp='span' size='xs' variant='secondary'>
												{row.value}
											</Text>
										</div>
									))}
									<Separator orientation='horizontal' className='lg:hidden' />
								</div>
							);
						})}

						<div className='ml-0 space-y-1 md:ml-auto'>
							<div className='flex items-center gap-2'>
								<Text comp='span' size='xs' variant='mutedForeground'>
									{t("orders.details.status")}
								</Text>
								<Badge
									size={"xs"}
									variant={"secondary"}
									className='fl-text-16/20 font-medium text-blue-600'
								>
									{orderStatusText}
								</Badge>
							</div>
							<div className='w-fit md:ml-auto'>
								{isRefundableOrder(order) && (
									<CancelActionButton id={order.id} />
								)}
							</div>
						</div>
					</div>
				</CollapsibleContent>
				<CollapsibleTrigger asChild>
					<Button variant='secondary' size='default' className='w-full grow'>
						<ChevronsUpDown className='icon-size' />
						<span className='sr-only'>{t("orders.actions.toggle")}</span>
					</Button>
				</CollapsibleTrigger>
			</Collapsible>
		</div>
	);
}
