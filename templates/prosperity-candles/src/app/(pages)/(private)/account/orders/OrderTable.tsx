"use client";
import {
	ArrowDown,
	ArrowUp,
	CheckCircle,
	CircleCheck,
	CircleOff,
	ListFilter,
	MoreHorizontal,
	Timer,
	X,
} from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { Filter } from "@/components/FilterTools/FilterPlus";
import { Message } from "@/components/Message";
import { PaginationClassic } from "@/components/Pagination/Pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { Order } from "@/modules/orders/types";
import type { User } from "@/modules/users/types";
import { formatDateTimeLong } from "@/utilities/formatDateTime";
import { formatPrice } from "@/utilities/formatPrice";

export const statuses = [
	{
		value: "pending",
		label: "In Progress",
		icon: Timer,
	},
	{
		value: "completed",
		label: "Completed",
		icon: CheckCircle,
	},
	{
		value: "cancelled",
		label: "Cancelled",
		icon: CircleOff,
	},
];

export type Result<T> = {
	docs: T;
	hasNextPage: boolean;
	hasPrevPage: boolean;
	nextPage: number;
	page: number;
	prevPage: number;
	totalDocs: number;
	totalPages: number;
};

const initialData: Result<Order[]> = {
	docs: [],
	hasNextPage: false,
	hasPrevPage: false,
	nextPage: 1,
	page: 1,
	prevPage: 1,
	totalDocs: 0,
	totalPages: 1,
};

function OrderTable({ orders }: { orders: Order[] }) {
	const searchParams = useSearchParams();
	const error = searchParams.get("error");
	const status = searchParams?.get("status");
	const limit = searchParams?.get("pageSize") || "10";

	// let searchQuery = qs.stringify(
	//   {
	//     limit,
	//     depth: 2,
	//     page: searchParams?.get('page') || '1',
	//     sort: searchParams?.get('orderBy') || '-createdAt',
	//     where: {
	//       ...(user?.id
	//         ? {
	//             orderedBy: {
	//               equals: user.id,
	//             },
	//           }
	//         : {}),
	//       ...(status
	//         ? {
	//             status: {
	//               equals: status,
	//             },
	//           }
	//         : {}),
	//       // ...(categories
	//       //   ? {
	//       //       categories: {
	//       //         in: categories,
	//       //       },
	//       //     }
	//       //   : {}),
	//     },
	//   },
	//   { addQueryPrefix: true }
	// )
	const data = { ...initialData, docs: orders };
	// const { data, isLoading } = useQuery({
	//   queryKey: ['orders', searchQuery],
	//   initialData: { ...initialData, docs: orders },
	//   queryFn: () => restApi<Result<Order[]>>(`/api/orders${searchQuery}`, { method: 'GET' }),
	// })

	// const queryClient = useQueryClient()

	// const { mutate: cancelOrder, isPending } = useMutation({
	//   mutationFn: async (id: number) => {
	//     await restApi(`/api/orders/${id}`, {
	//       method: 'PATCH',
	//       body: JSON.stringify({ status: 'cancelled' }),
	//     })
	//   },
	//   onSuccess: () => {
	//     queryClient.refetchQueries({
	//       queryKey: ['orders', searchQuery],
	//     })
	//   },
	// })
	const hasOrders = (data?.docs?.length || 0) > 0;

	return (
		<>
			{error && <Message message={error} error={error} success={false} />}
			<div className='flex w-full flex-col pb-12'>
				<div className='flex w-full items-center pb-2'>
					<div className='ml-auto flex items-center gap-2'>
						<Filter
							urlKey={"status"}
							title={"Status"}
							icon={<CircleCheck className='size-3.5 mr-2' />}
							options={statuses}
						/>
						<Filter
							urlKey={"orderBy"}
							title={"Filter"}
							icon={<ListFilter className='size-3.5 mr-2' />}
							options={[
								{
									value: "-createdAt",
									label: "Date desc",
									icon: ArrowDown,
								},
								{
									value: "createdAt",
									label: "Date asc",
									icon: ArrowUp,
								},
							]}
						/>
					</div>
				</div>

				<Card x-chunk='dashboard-06-chunk-0' className='bg-beige-color'>
					<CardHeader>
						<CardTitle className='fsSubtitle font-bold'>Orders</CardTitle>
						<CardDescription className='fsNormal'>
							Manage your products and view their sales performance.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className='w-[300px]'>Created at</TableHead>
									<TableHead className='hidden w-[100px] sm:table-cell'>
										Quantity
									</TableHead>
									<TableHead className='hidden w-[100px] sm:table-cell'>
										Total Sales
									</TableHead>
									<TableHead className='hidden w-[200px] sm:table-cell'>
										Images
									</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>
										<span className='sr-only'>Actions</span>
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody aria-disabled={false}>
								{hasOrders ? (
									data?.docs.map(order => {
										const images = order.items?.map(
											item =>
												typeof item.variant === "object" &&
												item?.variant.product?.images?.map(imageItem => (
													<Image
														key={imageItem.id}
														alt='Product image'
														className='aspect-square rounded-md object-cover'
														height='48'
														src={imageItem?.url}
														width='48'
													/>
												))
										);

										return (
											<TableRow key={order.id}>
												<TableCell className='fsSmall space-y-1'>
													<div suppressHydrationWarning>
														{formatDateTimeLong(order.createdAt)}
													</div>
													<div>
														{typeof order.orderedBy === "object"
															? order.orderedBy?.email
															: order.orderedBy}
													</div>
												</TableCell>
												<TableCell className='hidden sm:table-cell'>
													{order.items?.length}
												</TableCell>
												<TableCell className='hidden sm:table-cell'>
													{formatPrice({ total: order.total })}
												</TableCell>
												<TableCell className='min-w-32 hidden gap-1 font-medium sm:flex'>
													{images?.length && { ...images }}
												</TableCell>
												<TableCell>
													<Badge
														className='fsSmallest'
														variant={
															{
																completed: "success",
																processing: "warn",
																cancelled: "destructive",
																pending: "warn",
															}[order.status!] as any
														}
													>
														{order.status || "unknown"}
													</Badge>
												</TableCell>
												<TableCell>
													<DropdownMenu>
														<DropdownMenuTrigger asChild>
															<Button
																aria-haspopup='true'
																size='icon'
																variant='ghost'
																disabled={
																	// isPending ||
																	// isLoading ||
																	order.status === "cancelled"
																}
															>
																<MoreHorizontal className='size-4' />
																<span className='sr-only'>Toggle menu</span>
															</Button>
														</DropdownMenuTrigger>
														<DropdownMenuContent
															align='end'
															onClick={() => toast.success("Order cancelled!")}
															// onClick={() => cancelOrder(order.id)}
														>
															<DropdownMenuItem>
																Cancel order{" "}
																<X className='size-4 ml-1 shrink-0' />
															</DropdownMenuItem>
														</DropdownMenuContent>
													</DropdownMenu>
												</TableCell>
											</TableRow>
										);
									})
								) : (
									<TableRow className={"font-semibold"}>
										<TableCell className='hidden sm:table-cell'>
											<span>You have no orders.</span>
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</CardContent>
					<CardFooter>
						<span className='text-muted-foreground text-xs'>
							Showing <strong>1-10</strong> of <strong>32</strong> products
						</span>
					</CardFooter>
				</Card>

				<PaginationClassic
					pageState={{
						pageIndex: data?.page - 1 || 0,
						pageSize: parseInt(limit, 10),
						pageCount: data?.totalPages || 1,
					}}
				/>
			</div>
		</>
	);
}

export default OrderTable;
