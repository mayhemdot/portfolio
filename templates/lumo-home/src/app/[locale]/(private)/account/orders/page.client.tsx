"use client";
import { useEffect, useState } from "react";
import {
	Calendar,
	ChevronDown,
	ChevronRight,
	Eye,
	Package,
	RefreshCw,
	Truck,
	Zap,
} from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/shared/components/ui/collapsible";
import { Input } from "@/shared/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/components/ui/select";
import { Separator } from "@/shared/components/ui/separator";
import { formatDate } from "@/shared/utils/formatDate";
import { formatPrice } from "@/shared/utils/formatPrice";
import { Media } from "@/shared/components/Media";
import { useQueryState, parseAsString, parseAsIndex } from "nuqs";
import {
	isActiveOrders,
	isRefundableOrder,
	isShippedOrders,
} from "@/modules/orders/utils/filters";
import { shippingMethodName } from "@/modules/shipping/utils/shippingName";
import { CancelActionButton } from "@/modules/orders/ui/cancelActionButton";
import { useDebouncedCallback } from "use-debounce";
import { Pagination } from "@/shared/components/Pagination/Pagination";
import { Shell } from "@/shared/components/ui/shell";
import { getStatusColor, getStatusIcon } from "./_constants";
import { useTranslations } from "next-intl";
import { ActiveOrderCard } from "@/app/[locale]/(private)/account/page.client";
import { Order, OrderRaw, OrderStatus } from "@/modules/orders/model/types";
import { PaginatedDocs } from "@/modules/products/queries/searchProducts";
import { LocaleCode } from "@/i18n/localization";
import { Product } from "@/modules/products/model/types";
import { Text } from "@/shared/components/Text";

type Props = {
	userId: number;
	statusList: OrderStatus[];
	ordersData: PaginatedDocs<OrderRaw>;
	totalDocs?: number;
	locale: LocaleCode;
};

export default function OrderPageClient({
	userId,
	statusList,
	ordersData,
	locale,
}: Props) {
	// const localeFromContext = useLocale();
	// const { docs: orders } = ordersData;
	const t = useTranslations("AccountOrdersPage");
	const tStatuses = useTranslations("AccountPage.orders.statuses");

	const [currentPage, setCurrentPage] = useQueryState(
		"page",
		parseAsIndex.withDefault(0),
	);

	const [searchTerm, setSearchTerm] = useQueryState(
		"q",
		parseAsString.withDefault(""),
	);

	const [pageItems, setPageItems] = useQueryState(
		"pageItems",
		parseAsIndex.withDefault(10),
	);

	const [pageState, setPageState] = useState({
		pageIndex: Number(currentPage),
		pageSize: Number(pageItems),
		pageCount: 1,
	});

	useEffect(() => {
		if (
			currentPage === pageState.pageIndex &&
			pageItems === pageState.pageSize
		) {
			return;
		}
		setPageItems(Number(pageState.pageSize));
		setCurrentPage(Number(pageState.pageIndex));
	}, [
		setCurrentPage,
		setPageItems,
		pageState.pageIndex,
		pageState.pageSize,
		currentPage,
		pageItems,
	]);

	const [inputValue, setInputValue] = useState(searchTerm);
	const [statusFilter, setStatusFilter] = useState<string | null>(null);

	const debouncedSearch = useDebouncedCallback((value: string) => {
		setSearchTerm(value);
	}, 1000);

	const orders = ordersData?.docs?.map(o => new Order(o, locale)) || [];

	return (
		<div className='grow space-y-2 md:space-y-4'>
			<h1 className='fl-text-32/48'>{t("title")}</h1>
			<div className='fl-gap-8/16 flex'>
				<ActiveOrderCard
					title={t("cards.all")}
					count={orders?.length || 0}
					icon={Zap}
				/>
				<ActiveOrderCard
					title={t("cards.active")}
					count={isActiveOrders(orders)?.length || 0}
					icon={Truck}
				/>
				<ActiveOrderCard
					title={t("cards.completed")}
					count={isShippedOrders(orders)?.length || 0}
					icon={Package}
				/>
			</div>

			<Shell className='bg-secondary space-y-0! flex items-center gap-2 md:gap-4'>
				<div className='h-fit flex-1'>
					<Input
						placeholder={t("search.placeholder")}
						value={inputValue || ""}
						className={
							"bg-background! mb:mb-0 fl-text-16/20 rounded-full! h-10 border-0 shadow-none md:h-12 xl:h-14"
						}
						onChange={e => {
							setInputValue(e.target.value);
							debouncedSearch(e.target.value);
						}}
					/>
				</div>
				<Select value={statusFilter || ""} onValueChange={setStatusFilter}>
					<SelectTrigger className='h-10! bg-background! md:h-12! xl:h-14! inline-flex w-[150px] rounded-full xl:w-[200px]'>
						<SelectValue placeholder={t("filters.status.placeholder")} />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='all'>
							{t("filters.status.options.all")}
						</SelectItem>
						{statusList?.map(status => (
							<SelectItem key={status} value={status}>
								{tStatuses(status)}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</Shell>
			<OrderList
				userId={userId}
				ordersData={{
					...ordersData,
					docs: ordersData?.docs?.filter(data =>
						statusFilter ? data.status === statusFilter : true,
					),
				}}
				currentPage={currentPage + 1}
				searchTerm={searchTerm}
				statusList={statusList}
				locale={locale}
			/>

			<Pagination pageState={pageState} setPageState={setPageState} />
		</div>
	);
}

export function OrderList({
	userId,
	ordersData,
	currentPage,
	searchTerm,
	locale,
}: Props & {
	currentPage: number;
	searchTerm: string;
}) {
	const [expandedOrders, setExpandedOrders] = useState<number[]>([]);

	const t = useTranslations("AccountOrdersPage");
	const tStatuses = useTranslations("AccountPage.orders.statuses");

	const [isLoading, setIsLoading] = useState();
	const orders = ordersData?.docs?.map(order => new Order(order, locale)) || [];

	const toggleOrderExpansion = (orderId: number) => {
		setExpandedOrders(prev =>
			prev.includes(orderId)
				? prev.filter(id => id !== orderId)
				: [...prev, orderId],
		);
	};
	return (
		<div className='w-full flex-1 space-y-4'>
			{isLoading ? (
				<Card>
					<CardContent className='p-12 text-center'>
						<Package className='size-12 text-muted-foreground mx-auto mb-4' />
						<h3 className='mb-2 text-lg font-semibold'>{t("loading.title")}</h3>
						<p className='text-muted-foreground'>{t("loading.description")}</p>
					</CardContent>
				</Card>
			) : orders?.length === 0 ? (
				<Card className='flex-1'>
					<CardContent className='p-12 text-center'>
						<Package className='size-12 text-muted-foreground mx-auto mb-4' />
						<h3 className='mb-2 text-lg font-semibold'>{t("empty.title")}</h3>
						<p className='text-muted-foreground'>{t("empty.description")}</p>
					</CardContent>
				</Card>
			) : null}

			{!isLoading &&
				orders?.map(order => (
					<Card key={order.id} className='overflow-hidden'>
						<Collapsible
							open={expandedOrders.includes(order.id)}
							onOpenChange={() => toggleOrderExpansion(order.id)}
						>
							<CardHeader className='pb-4'>
								<div className='flex items-center justify-between'>
									<div className='space-y-1'>
										<CardTitle className='text-lg'>
											{t("list.orderTitle", { id: order.id })}
										</CardTitle>
										<CardDescription className='flex items-center gap-2'>
											<Calendar className='size-4' />
											{t("list.orderDate", {
												date: formatDate(order.createdAt, locale),
											})}
										</CardDescription>
									</div>
									<div className='flex items-center gap-3'>
										<Badge className={getStatusColor(order.status)}>
											{getStatusIcon(order.status)}
											<span className='ml-1'>{tStatuses(order.status)}</span>
										</Badge>
										<CollapsibleTrigger asChild>
											<Button variant='ghost' size='sm'>
												{expandedOrders.includes(order.id) ? (
													<ChevronDown className='size-4' />
												) : (
													<ChevronRight className='size-4' />
												)}
											</Button>
										</CollapsibleTrigger>
									</div>
								</div>

								{/* Краткая информация */}
								<div className='flex items-center justify-between pt-2'>
									<div className='text-muted-foreground text-sm'>
										{t("list.itemsCount", {
											count: order.items?.length ?? 0,
										})}
									</div>
									<div className='text-lg font-semibold'>
										{formatPrice(order?.paymentAmount || 0, {
											localeCode: locale,
										})}
									</div>
								</div>
								{/* Трекинг информация */}
								{/* {order.trackingNumber && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Truck className="size-4" />
                      <span>Трек-номер: {order.trackingNumber}</span>
                      {order.estimatedDelivery && (
                        <span>
                          • Ожидаемая доставка:{" "}
                          {formatDate(order.estimatedDelivery)}
                        </span>
                      )}
                    </div>
                  )} */}
							</CardHeader>

							<CollapsibleContent>
								<CardContent className='pt-0'>
									<Separator className='mb-4' />

									{/* Детали заказа */}
									<div className='space-y-4'>
										<h4 className='font-semibold'>
											{t("list.sections.products")}
										</h4>
										<div className='space-y-3'>
											{order.items?.map(item => {
												return (
													<div
														key={item.id}
														className={
															"bg-muted/50 flex items-center gap-4 overflow-clip rounded-lg p-3"
														}
													>
														<div className='size-10 relative'>
															<Media
																imgClassName='object-contain'
																fill
																resource={
																	item.product.images?.[0] || "/placeholder.svg"
																}
															/>
														</div>
														<div className='min-w-0 flex-1'>
															<h5 className='truncate font-medium'>
																{item.product.title || ""}
															</h5>
															<p className='text-muted-foreground text-sm'>
																{t("list.product.quantity", {
																	count: item.quantity ?? 0,
																})}
															</p>
														</div>
														<Text
															comp='p'
															variant='secondary'
															className='text-right'
														>
															{item.product.prettyPrice()}
														</Text>
													</div>
												);
											})}
										</div>

										{/* Адрес доставки */}
										<div>
											<h4 className='mb-2 font-semibold'>
												{t("list.sections.shipping")}
											</h4>
											<p className='text-muted-foreground text-sm'>
												{order.shippingMethod.name}
											</p>
										</div>

										{/* Действия */}
										<div className='flex gap-2 pt-4'>
											<Button variant='outline' size='sm'>
												<Eye className='size-4 mr-2' />
												{t("list.actions.details")}
											</Button>
											{order.status === "shipped" && (
												<Button variant='outline' size='sm'>
													<RefreshCw className='size-4 mr-2' />
													{t("list.actions.reorder")}
												</Button>
											)}
											{isRefundableOrder(order) && (
												<CancelActionButton id={order.id} />
											)}
											{/* {order.trackingNumber && (
                          <Button variant="outline" size="sm">
                            <Truck className="h-4 w-4 mr-2" />
                            Отследить
                          </Button>
                        )} */}
										</div>
									</div>
								</CardContent>
							</CollapsibleContent>
						</Collapsible>
					</Card>
				))}
		</div>
	);
}
{
	/* <div
      className={cn(
        'inline-flex p-3 rounded-full items-center gap-1 bg-background',
        className,
      )}
    >
      <Button
        className="shrink-0"
        variant={variant || 'ghost'}
        size={'icon'}
        onClick={() => update(-1)} //updateQuantity(id!, Math.max(0, quantity - 1))}
      >
        <Minus className="size-3" />
      </Button>
      <span className="w-7 text-center fl-text-20/24 font-medium">
        {quantity}
      </span>
      <Button
        className="shrink-0"
        variant={variant || 'ghost'}
        size={'icon'}
        onClick={() => update(1)} //updateQuantity(id!, quantity + 1)}
      >
        <Plus className="size-3" />
      </Button>
    </div> */
}
