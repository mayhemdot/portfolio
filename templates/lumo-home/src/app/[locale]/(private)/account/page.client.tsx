"use client";
// import { Order, Product, User } from "@/payload-types";
import {
	Zap,
	PrinterIcon,
	CheckIcon,
	Truck,
	Handshake,
	ChevronsUpDown,
} from "lucide-react";
import {
	isActiveOrders,
	isRefundableOrder,
	isShippedOrders,
} from "@/modules/orders/utils/filters";
import { cn } from "@/shared/lib/utils";
import { formatPrice } from "@/shared/utils/formatPrice";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { formatDate } from "@/shared/utils/formatDate";
import { Media } from "@/shared/components/Media";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/shared/components/ui/collapsible";
import { CancelActionButton } from "@/modules/orders/ui/cancelActionButton";
import React from "react";
import { useTranslations } from "next-intl";
import { ORDERS } from "@/modules/orders/model/data";
import { LocaleCode } from "@/i18n/localization";
import { User } from "@/modules/users/model/types";
import { Order, OrderItem } from "@/modules/orders/model/types";
import { Product } from "@/modules/products/model/types";

type Props = {
	userProfile: User;
	orders: Order[];
	locale: LocaleCode;
};

// type OrderItem = {
// 	id?: string | null;
// 	product?:  ProductRaw;
// 	totalPrice?: number | null;
// 	quantity?: number | null;
// };

export function AccountPageClient({ userProfile, orders, locale }: Props) {
	const [isOpen, setIsOpen] = React.useState(false);

	const t = useTranslations("AccountPage");

	const statusLabels: Record<string, string> = {
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
		<div className='grow'>
			<div className={"fl-gap-8/24  mb-2 flex md:mb-4 xl:mb-6"}>
				<ActiveOrderCard
					icon={Zap}
					title={t("cards.activeOrders")}
					count={isActiveOrders(ORDERS)?.length || 0}
				/>
				<ActiveOrderCard
					icon={Zap}
					title={t("cards.completedOrders")}
					count={isShippedOrders(ORDERS)?.length || 0}
				/>
			</div>
			<div
				className={
					"2xl:rounded-4xl flex items-center gap-3 rounded-2xl md:rounded-3xl xl:gap-4"
				}
			>
				{[...isActiveOrders(ORDERS), ...ORDERS].map((order: Order) => {
					const orderStatusText = order.status
						? statusLabels[order.status] || order.status
						: "";
					return (
						<div
							key={order.id}
							className={
								"fl-px-16/24 fl-py-16/24 bg-secondary grow cursor-pointer rounded-3xl"
							}
						>
							<div className='flex items-center justify-between gap-4'>
								<div className='flex items-center gap-4'>
									<StatusIcon variant='accent'>
										<Zap className='size-4 text-background' />
									</StatusIcon>
									<span className='fl-text-20/28 font-semibold'>
										{t("orders.orderNumber", { id: order.id })}
									</span>
								</div>
								<div className='flex items-center gap-3'>
									<p className='fl-text-20/28 font-semibold'>
										{order?.paymentData?.paymentAmount
											? formatPrice(Number(order.paymentData.paymentAmount), {
													localeCode: locale,
											  })
											: ""}
									</p>
									<Button variant='default' size='sm'>
										{<PrinterIcon size={10} className='size-3' />}
										<span className='hidden lg:block'>
											{t("orders.actions.check")}
										</span>
									</Button>
								</div>
							</div>
							<Separator className='my-2' />

							<div className='relative flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center'>
								<span className='bg-primary absolute left-5 z-0 h-full w-1 lg:left-0 lg:h-1 lg:w-full' />
								<OrderStatusItem
									isActive={order.status === "pending"}
									title={t("orders.statusSteps.pending")}
									updatedAt={order.updatedAt}
									icon={<Zap className='size-4 text-primary' />}
									locale={locale}
								/>
								<OrderStatusItem
									title={t("orders.statusSteps.waiting_for_capture")}
									isActive={order.status === "waiting_for_capture"}
									icon={<Handshake className='size-4 text-primary' />}
									locale={locale}
								/>
								<OrderStatusItem
									title={t("orders.statusSteps.delivery")}
									isActive={
										order.status === "preparing" ||
										order.status === "delivering"
									}
									icon={<Truck className='size-4 text-primary' />}
									locale={locale}
								/>

								<OrderStatusItem
									title={t("orders.statusSteps.completed")}
									isActive={order.status === "shipped"}
									icon={<CheckIcon className='size-4 text-primary' />}
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
									{order?.items?.map(orderItem => (
										<OrderProductItem
											key={orderItem?.product?.id}
											orderItem={orderItem}
											localeCode={locale}
										/>
									))}

									<Separator className='my-2' />
									{
										<div className='mb-3 flex flex-row flex-wrap gap-3 lg:gap-8'>
											<div className='space-y-1'>
												<div className='flex gap-2'>
													<span className='text-muted-foreground'>
														{t("orders.details.orderedBy")}
													</span>
													<span>{order.orderedBy?.first_name},</span>
												</div>
												<div className='flex gap-2'>
													<span className='text-muted-foreground'>
														{t("orders.details.phone")}
													</span>
													<span>{order.phone}</span>
												</div>
											</div>
											<Separator
												orientation='horizontal'
												className='lg:hidden'
											/>
											<div className='space-y-1'>
												<div className='flex gap-2'>
													<span className='text-muted-foreground fl-text-16/20'>
														{t("orders.details.email")}
													</span>
													<span className='fl-text-16/20'>
														{order?.orderedBy?.email}
													</span>
												</div>
												<div className='flex gap-2'>
													<span className='text-muted-foreground fl-text-16/20'>
														{t("orders.details.address")}
													</span>
													<span className='fl-text-16/20'>
														{t("orders.details.addressValue", {
															city: order.city ?? "",
															address: order.address ?? "",
															zip: order.zip ?? "",
														})}
													</span>
												</div>
											</div>
											<Separator
												orientation='horizontal'
												className='lg:hidden'
											/>
											<div className='ml-0 space-y-1 lg:ml-auto'>
												<div className='flex gap-2'>
													<span className='text-muted-foreground fl-text-16/20'>
														{t("orders.details.status")}
													</span>
													<span className='fl-text-16/20 font-medium capitalize text-blue-600'>
														{orderStatusText}
													</span>
												</div>
												<div className='flex gap-2'>
													{isRefundableOrder(order) && (
														<CancelActionButton id={order.id} />
													)}
												</div>
											</div>
										</div>
									}
								</CollapsibleContent>
								<CollapsibleTrigger asChild>
									<Button
										variant='ghost'
										size='default'
										className='w-full grow'
									>
										<ChevronsUpDown />
										<span className='sr-only'>
											{t("orders.actions.toggle")}
										</span>
									</Button>
								</CollapsibleTrigger>
							</Collapsible>
						</div>
					);
				})}
			</div>
		</div>
	);
}

function OrderProductItem({
	orderItem,
	localeCode,
}: {
	orderItem: OrderItem;
	localeCode: LocaleCode;
}) {
	const product = new Product(orderItem.product, localeCode);
	// typeof orderItem.product === "object" ? orderItem?.product : null;

	if (!product) return null;

	const resource = product?.images?.[0];

	const currentPrice = product?.price || 0;
	const currentPriceWithQuantity = currentPrice * (orderItem?.quantity || 1);
	return (
		<div
			key={orderItem.id}
			className='rounded-default bg-secondary mb-2 border p-4 last:mb-0'
		>
			<div className='mb-2 flex gap-4'>
				<div className='size-12 lg:size-16 relative overflow-hidden rounded-md border'>
					{resource && (
						<Media resource={resource} fill imgClassName='!object-contain' />
					)}
				</div>

				<div className='min-w-0 flex-1'>
					<h4 className='fl-text-16/20 truncate font-medium'>
						{product.title}
					</h4>
					<p className='fl-text-16/20 text-muted-foreground'>
						{product.prettyPrice(orderItem?.quantity || 1)}
					</p>
				</div>
			</div>
			<div className='flex items-center justify-between border-t pt-1'>
				<span className='fl-text-16/20'>
					{formatPrice(currentPrice, { localeCode })} x {orderItem.quantity}
				</span>
				<div className='flex items-center gap-2'>
					<p className='fl-text-20/24 font-semibold'>{product.prettyPrice()}</p>
				</div>
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
					<h3 className='fl-text-16/28'>{title}</h3>
					<div className='fl-text-16/28 font-extrabold'>{count}</div>
				</div>
				<StatusIcon>
					<props.icon className='size-4 text-background' />
				</StatusIcon>
			</div>
		</div>
	);
}

function OrderStatusItem({
	isActive,
	title,
	icon,
	updatedAt,
	locale,
}: {
	isActive: boolean;
	icon: React.ReactNode;
	title: string;
	updatedAt?: string;
	locale?: string;
}) {
	const formattedLocale = locale === "ru-RU" ? "ru-RU" : "en-US";
	return (
		<div className='z-10 flex items-center'>
			<StatusIcon variant={isActive ? "accent" : "secondary"} className='z-10'>
				{icon}
			</StatusIcon>

			<div className='bg-secondary -ml-1 flex flex-col px-3'>
				<span className='fl-text-16/20 font-semibold capitalize'>{title}</span>
				{updatedAt && (
					<span className='fl-text-16/20 text-muted-foreground font-normal'>
						{formatDate(updatedAt, formattedLocale)}
					</span>
				)}
			</div>
		</div>
	);
}

function StatusIcon({
	className,
	children,
	variant = "default",
}: {
	className?: string;
	children: React.ReactNode;
	variant?: "default" | "secondary" | "accent";
}) {
	return (
		<div
			className={cn(
				"size-10 bg-background inline-flex shrink-0 items-center justify-center rounded-full",
				className,
			)}
		>
			<span
				className={cn("bg-primary rounded-full p-1", {
					"bg-yellow-400": variant === "accent",
					"bg-secondary": variant === "secondary",
					"text-background": variant === "default",
				})}
			>
				{children}
				{/* <Zap className={'size-4 text-background'} /> */}
			</span>
		</div>
	);
}
