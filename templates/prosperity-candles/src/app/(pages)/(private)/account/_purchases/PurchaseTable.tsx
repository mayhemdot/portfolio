// "use client";
// import {
// 	ArrowDown,
// 	ArrowUp,
// 	ListFilter,
// 	MoreHorizontal,
// 	SearchIcon,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import React, { type FormEvent, useEffect, useState } from "react";
// import { formatDateTime } from "@/app/_utilities/formatDateTime";
// import { Filter } from "@/components/FilterTools/FilterPlus";
// import { Message } from "@/components/Message";
// import { Button, buttonVariants } from "@/components/ui/button";
// import {
// 	Card,
// 	CardContent,
// 	CardDescription,
// 	CardFooter,
// 	CardHeader,
// 	CardTitle,
// } from "@/components/ui/card";
// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuItem,
// 	DropdownMenuLabel,
// 	DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
// import {
// 	Table,
// 	TableBody,
// 	TableCell,
// 	TableHead,
// 	TableHeader,
// 	TableRow,
// } from "@/components/ui/table";
// import type { ProductVariant as IProductVariant } from "@/payload/payload-types";

// function PurchaseTable({
// 	purchasedProductVariations,
// 	orderBy,
// }: {
// 	purchasedProductVariations: IProductVariation[];
// 	orderBy: string;
// }) {
// 	const [error, setError] = useState("");
// 	const [filteredItems, setFilteredItems] = useState(
// 		purchasedProductVariations
// 	);

// 	const handleSearch = (event: FormEvent<HTMLFormElement>) => {
// 		event.preventDefault();
// 		setFilteredItems(
// 			purchasedProductVariations.filter(item => {
// 				if (typeof item.product === "object") {
// 					const data = new FormData(event.currentTarget);
// 					const search = data?.get("search");
// 					if (!search) return true;
// 					return item.product?.title
// 						.toLowerCase()
// 						.includes(search.toString().toLowerCase());
// 				}
// 			})
// 		);
// 		try {
// 			console.log("Form submitted", event.currentTarget.value);
// 		} catch (e) {
// 			setError(e.message);
// 		}
// 	};
// 	useEffect(() => {
// 		setFilteredItems(prev =>
// 			prev.sort((a, b) =>
// 				orderBy === "createdAt"
// 					? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
// 					: new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
// 			)
// 		);
// 	}, [orderBy]);

// 	return (
// 		<section className='flex flex-grow flex-col gap-2'>
// 			<div className='flex items-center justify-between'>
// 				<form onSubmit={handleSearch} className='flex items-center gap-3'>
// 					<Input
// 						name={"search"}
// 						className='h-10 rounded-xl bg-beige-color'
// 						placeholder='Search...'
// 						type='text'
// 					/>
// 					<Button className={buttonVariants({})} type='submit'>
// 						<SearchIcon className='size-5' />
// 					</Button>
// 					<Message error={error} />
// 				</form>
// 				<div className='inline-flex items-center gap-2'>
// 					<Filter
// 						urlKey={"orderBy"}
// 						title={"Filter"} //t('filters.priority')
// 						icon={<ListFilter className='size-3.5 mr-2' />}
// 						options={[
// 							{
// 								value: "-createdAt",
// 								label: "Date desc",
// 								icon: ArrowDown,
// 							},
// 							{
// 								value: "createdAt",
// 								label: "Date asc",
// 								icon: ArrowUp,
// 							},
// 						]}
// 					/>
// 				</div>
// 			</div>

// 			<Card className='bg-beige-color'>
// 				<CardHeader>
// 					<CardTitle className='fsSubtitle font-bold'>Purchases</CardTitle>
// 					<CardDescription className='fsNormal'>
// 						Manage your products and view their sales performance.
// 					</CardDescription>
// 				</CardHeader>
// 				<CardContent>
// 					<Table>
// 						<TableHeader>
// 							<TableRow>
// 								<TableHead className='hidden w-[100px] sm:table-cell'>
// 									<span className='sr-only'>Image</span>
// 								</TableHead>
// 								<TableHead>Name</TableHead>
// 								<TableHead>Variation</TableHead>
// 								<TableHead className='hidden md:table-cell'>
// 									Created at
// 								</TableHead>
// 								<TableHead>
// 									<span className='sr-only'>Actions</span>
// 								</TableHead>
// 							</TableRow>
// 						</TableHeader>
// 						<TableBody>
// 							{filteredItems?.length ? (
// 								filteredItems?.map(variant => {
// 									if (
// 										typeof variant !== "object" ||
// 										typeof variant?.product !== "object"
// 									)
// 										return null;

// 									const product = variant.product;
// 									const image =
// 										variant.images[0]?.image || product.meta?.image;

// 									return (
// 										<TableRow key={variant.id}>
// 											<TableCell className='hidden sm:table-cell'>
// 												<Link href={`/products/${product.slug}`}>
// 													<Image
// 														alt='Product image'
// 														className='aspect-square rounded-md object-cover'
// 														src={typeof image === "object" ? image?.url : ""}
// 														height='64'
// 														width='64'
// 													/>
// 												</Link>
// 											</TableCell>
// 											<TableCell className='font-medium'>
// 												{product.title}
// 											</TableCell>
// 											<TableCell className='hidden md:table-cell'>
// 												{variant.sizeName}
// 											</TableCell>
// 											<TableCell
// 												className='hidden md:table-cell'
// 												suppressHydrationWarning
// 											>
// 												{formatDateTime(product.createdAt)}
// 											</TableCell>
// 											<TableCell>
// 												<DropdownMenu>
// 													<DropdownMenuTrigger asChild>
// 														<Button
// 															aria-haspopup='true'
// 															size='icon'
// 															variant='ghost'
// 														>
// 															<MoreHorizontal className='size-4' />
// 															<span className='sr-only'>Toggle menu</span>
// 														</Button>
// 													</DropdownMenuTrigger>
// 													<DropdownMenuContent align='end'>
// 														<DropdownMenuLabel>Actions</DropdownMenuLabel>
// 														<DropdownMenuItem>Edit</DropdownMenuItem>
// 														<DropdownMenuItem>Delete</DropdownMenuItem>
// 													</DropdownMenuContent>
// 												</DropdownMenu>
// 											</TableCell>
// 										</TableRow>
// 									);
// 								})
// 							) : (
// 								<TableRow className={"font-semibold"}>
// 									<TableCell className='hidden sm:table-cell'>
// 										<span>You have no purchases.</span>
// 									</TableCell>
// 								</TableRow>
// 							)}
// 						</TableBody>
// 					</Table>
// 				</CardContent>
// 				<CardFooter>
// 					<span className='text-xs text-muted-foreground'>
// 						Showing <strong>1-10</strong> of <strong>32</strong> products
// 					</span>
// 				</CardFooter>
// 			</Card>
// 		</section>
// 	);
// }

// export default PurchaseTable;
