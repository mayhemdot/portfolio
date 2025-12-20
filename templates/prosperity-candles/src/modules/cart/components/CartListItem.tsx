"use client";

import type { VariantProps } from "class-variance-authority";
import { Trash } from "lucide-react";
import InputInc from "@/components/elements/InputInc";
import NoImage from "@/components/elements/NoImage";
import { Media } from "@/components/Media";
import Price from "@/components/Price/Price";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { type CartLineItem, useCartStore } from "@/modules/cart/store";
import classes from "./index.module.scss";

interface CartTableItemProps {
	item: CartLineItem;
	index: number;
	isSubmitting?: boolean;
	isDisabled?: boolean;
}

function CartListItem({ item, isSubmitting, isDisabled }: CartTableItemProps) {
	const { updateQuantity, removeItem, setItemSelected } = useCartStore();
	const {
		variant: { product, inventory_quantity },
	} = item;
	const isImagesExisted = (product?.images?.length || 0) > 0;

	const firstImage =
		isImagesExisted && typeof product?.images?.[0] === "object"
			? product?.images?.[0]
			: null;
	const amount = item.variant.calculated_price?.calculated_amount || 0;
	return (
		<div
			className={cn(
				"flex flex-col items-start justify-between gap-x-4 gap-y-2 md:flex-row",
				{
					"opacity-70": isDisabled,
				}
			)}
		>
			<div className='inline-flex items-start gap-4'>
				<Checkbox
					disabled={isSubmitting || isDisabled}
					id={item.variant.id.toString()}
					className={cn("size-4", {
						hidden: isDisabled,
					})}
					onCheckedChange={checked => {
						setItemSelected(item.id, Boolean(checked));
					}}
					checked={item.isSelected}
				/>

				<div
					className={cn("min-w-16 max-w-16 relative aspect-square w-full", {
						[classes.mediaWrapper]: firstImage,
					})}
				>
					{firstImage ? (
						<Media
							className={classes.media}
							imgClassName={classes.image}
							url={firstImage?.url}
							fill
						/>
					) : (
						<NoImage />
					)}
				</div>

				<div className='min-w-56 lg:min-w-80 flex flex-col'>
					<Price
						amount={Number(amount)}
						className={cn("block md:hidden", { hidden: isDisabled })}
					/>
					<span className='fsNormal w-fit'>{(product as any)?.title}</span>
					<span className='fsSmall text-muted-foreground'>
						Размер: {item.variant.title}
					</span>
				</div>
			</div>

			<div className='flex w-full grow justify-between gap-4 md:w-fit'>
				<Price
					amount={Number(amount)}
					className={cn("hidden md:block", { hidden: isDisabled })}
				/>
				<InputInc
					className='digits inline-flex'
					isDisabled={isDisabled}
					maxValue={inventory_quantity || 0}
					minValue={Math.min(1, inventory_quantity || 0)}
					onChangeValue={
						value => updateQuantity(item.id.toString(), "rub", value) //{ ...item, quantity: Math.min(value, stock!) }
					}
					defaultValue={Math.min(item.quantity, inventory_quantity || 0)}
				/>
				<RemoveButton
					isSubmitting={isSubmitting}
					onClick={() => removeItem(item.id, "rub")}
					variant={"primary"}
				/>
			</div>
		</div>
	);

	// return (
	//   <TableItem
	//     key={`cart-item-${item.id || index}`}
	//     className="grid w-full grid-cols-1 items-center gap-x-4 gap-y-0 md:grid-cols-[1fr_2.5fr_1.5fr_1fr_0.5fr] fsNormal pb-4"
	//   >
	//     <div className="hidden h-full flex-row items-stretch justify-between md:flex gap-4 border-t-none">
	//       <Checkbox
	//         id={item.id}
	//         className="size-4 hidden md:block"
	//         onCheckedChange={(checked) =>
	//           setItemSelected({ variantId: Number(item.id), isSelected: Boolean(checked) })
	//         }
	//         checked={item.isSelected}
	//       />
	//       <div className={cn('shrink-0', classes.mediaWrapper)}>
	//         {firstImage ? (
	//           <Media
	//             className={classes.media}
	//             imgClassName={classes.image}
	//             resource={firstImage}
	//             fill
	//           />
	//         ) : (
	//           <NoImage />
	//         )}
	//       </div>
	//     </div>

	//     <TableColumn className="!border-t-none">
	//       <TableTitle title={'Название'} className={'hidden md:flex'} />

	//       <div className="flex-auto flex gap-2 shrink-0 md:hidden">
	//         <Checkbox
	//           id={item.id}
	//           className="size-4"
	//           onChange={(checked) =>
	//             setItemSelected({ variantId: Number(item.id), isSelected: Boolean(checked) })
	//           }
	//           defaultChecked={item.isSelected}
	//         />
	//         <div className={cn('shrink-0', classes.mediaWrapper)}>
	//           {firstImage ? (
	//             <Media
	//               className={classes.media}
	//               imgClassName={classes.image}
	//               resource={firstImage}
	//               fill
	//             />
	//           ) : (
	//             <NoImage />
	//           )}
	//         </div>
	//       </div>
	//       <div
	//         className={cn('flex flex-auto items-center justify-end gap-4 md:justify-start', {
	//           'text-muted-foreground': isDisabled,
	//         })}
	//       >
	//         <span className="flex flex-col">
	//           <span className="fsNormal">{product!.title}</span>
	//           <span className="fsSmall text-muted-foreground">
	//             Размер: {variant.sizeName}
	//           </span>
	//         </span>
	//         <div className="flex items-center justify-center md:hidden">
	//           <RemoveButton
	//             isSubmitting={isSubmitting}
	//             onClick={() => deleteItemFromCart(variant)}
	//           />
	//         </div>
	//       </div>
	//     </TableColumn>

	//     <TableColumn>
	//       <TableTitle title={'Количество'} text={'(шт.)'} />
	//       <div className="flex flex-1 justify-end xl:justify-start">
	//         <>
	//           <InputInc
	//             className="digits inline-flex"
	//             // register={register(`items.${index}.quantity`, {
	//             //   minLength: {
	//             //     message: 'Минимальное значение единица',
	//             //     value: 1,
	//             //   },
	//             //   maxLength: {
	//             //     message: 'Максимальное возможное значение 9',
	//             //     value: in_stock,
	//             //   },
	//             // })}
	//             isDisabled={isDisabled}
	//             maxValue={stock}
	//             minValue={minValue}
	//             onChangeValue={(value) => {
	//               addItemToCart({ ...item, quantity: Math.min(value, stock) })
	//             }}
	//             defaultValue={Math.min(item.quantity, stock)}
	//           />
	//         </>
	//       </div>
	//     </TableColumn>

	//     <TableColumn>
	//       <TableTitle title={'Цена'} text={'(руб.)'} className="flex-none" />
	//       <div
	//         className={cn('fsNormal digits flex flex-1 items-center justify-end md:justify-start', {
	//           'text-muted-foreground': isDisabled,
	//         })}
	//       >
	//         <Price amount={Number(item.price) * item.quantity} />
	//       </div>
	//     </TableColumn>

	//     <TableColumn className={'hidden md:flex md:flex-1'}>
	//       <div className={'fsSmall flex-none cursor-pointer text-zinc-500'}>
	//         <HelpCircle className="ml-auto h-5 text-zinc-500" />
	//       </div>
	//       <div className={'fsNormal flex w-full flex-1 flex-col items-end justify-center gap-2'}>
	//         <RemoveButton
	//           isSubmitting={isSubmitting}
	//           onClick={() => deleteItemFromCart(variant)}
	//         />
	//       </div>
	//     </TableColumn>
	//   </TableItem>
	// )
}

// function CartListItem({ item, index, isSubmitting, isDisabled }: CartTableItemProps) {
//   // const { variant as ProductVariant, quantity } = item;
//   // const {  in_stock, size, price } = item.productDetail;
//   // const product = variant.product as Product;
//   // const isEdit = register && control && !isDisabled;

//   const { addItemToCart, cart, deleteItemFromCart, setItemSelected } = useCart()

//   console.log('items', cart)

//   const variant = item.variant as ProductVariant
//   const product = variant?.product as Product
//   const images = variant?.images
//   const firstImage =
//     images?.length > 0 && typeof images[0]?.image === 'object' ? images[0]?.image : ''

//   const stock = variant?.stock || 0
//   const minValue = Math.min(1, stock || 0)

//   return (
//     <TableItem
//       key={`cart-item-${item.id || index}`}
//       className="grid w-full grid-cols-1 items-center gap-x-4 gap-y-0 md:grid-cols-[1fr_2.5fr_1.5fr_1fr_0.5fr] fsNormal pb-4"
//     >
//       <div className="hidden h-full flex-row items-stretch justify-between md:flex gap-4 border-t-none">
//         <Checkbox
//           id={item.id}
//           className="size-4 hidden md:block"
//           onCheckedChange={(checked) =>
//             setItemSelected({ variantId: Number(item.id), isSelected: Boolean(checked) })
//           }
//           checked={item.isSelected}
//         />
//         <div className={cn('shrink-0', classes.mediaWrapper)}>
//           {firstImage ? (
//             <Media
//               className={classes.media}
//               imgClassName={classes.image}
//               resource={firstImage}
//               fill
//             />
//           ) : (
//             <NoImage />
//           )}
//         </div>
//       </div>

//       <TableColumn className="!border-t-none">
//         <TableTitle title={'Название'} className={'hidden md:flex'} />

//         <div className="flex-auto flex gap-2 shrink-0 md:hidden">
//           <Checkbox
//             id={item.id}
//             className="size-4"
//             onChange={(checked) =>
//               setItemSelected({ variantId: Number(item.id), isSelected: Boolean(checked) })
//             }
//             defaultChecked={item.isSelected}
//           />
//           <div className={cn('shrink-0', classes.mediaWrapper)}>
//             {firstImage ? (
//               <Media
//                 className={classes.media}
//                 imgClassName={classes.image}
//                 resource={firstImage}
//                 fill
//               />
//             ) : (
//               <NoImage />
//             )}
//           </div>
//         </div>
//         <div
//           className={cn('flex flex-auto items-center justify-end gap-4 md:justify-start', {
//             'text-muted-foreground': isDisabled,
//           })}
//         >
//           <span className="flex flex-col">
//             <span className="fsNormal">{product!.title}</span>
//             <span className="fsSmall text-muted-foreground">
//               Размер: {variant.sizeName}
//             </span>
//           </span>
//           <div className="flex items-center justify-center md:hidden">
//             <RemoveButton
//               isSubmitting={isSubmitting}
//               onClick={() => deleteItemFromCart(variant)}
//             />
//           </div>
//         </div>
//       </TableColumn>

//       <TableColumn>
//         <TableTitle title={'Количество'} text={'(шт.)'} />
//         <div className="flex flex-1 justify-end xl:justify-start">
//           <>
//             <InputInc
//               className="digits inline-flex"
//               // register={register(`items.${index}.quantity`, {
//               //   minLength: {
//               //     message: 'Минимальное значение единица',
//               //     value: 1,
//               //   },
//               //   maxLength: {
//               //     message: 'Максимальное возможное значение 9',
//               //     value: in_stock,
//               //   },
//               // })}
//               isDisabled={isDisabled}
//               maxValue={stock}
//               minValue={minValue}
//               onChangeValue={(value) => {
//                 addItemToCart({ ...item, quantity: Math.min(value, stock) })
//               }}
//               defaultValue={Math.min(item.quantity, stock)}
//             />
//           </>
//         </div>
//       </TableColumn>

//       <TableColumn>
//         <TableTitle title={'Цена'} text={'(руб.)'} className="flex-none" />
//         <div
//           className={cn('fsNormal digits flex flex-1 items-center justify-end md:justify-start', {
//             'text-muted-foreground': isDisabled,
//           })}
//         >
//           <Price amount={Number(item.price) * item.quantity} />
//         </div>
//       </TableColumn>

//       <TableColumn className={'hidden md:flex md:flex-1'}>
//         <div className={'fsSmall flex-none cursor-pointer text-zinc-500'}>
//           <HelpCircle className="ml-auto h-5 text-zinc-500" />
//         </div>
//         <div className={'fsNormal flex w-full flex-1 flex-col items-end justify-center gap-2'}>
//           <RemoveButton
//             isSubmitting={isSubmitting}
//             onClick={() => deleteItemFromCart(variant)}
//           />
//         </div>
//       </TableColumn>
//     </TableItem>
//   )
// }

export default CartListItem;

function RemoveButton({
	isSubmitting,
	onClick,
	variant,
}: {
	isSubmitting?: boolean;
	onClick: () => void;
	variant: VariantProps<typeof buttonVariants>["variant"];
}) {
	return (
		<Button
			aria-label='Удалить товар из корзины'
			aria-disabled={isSubmitting}
			className={buttonVariants({
				variant: "secondary",
				size: "cube",
				className:
					"m-0 rounded-xl bg-transparent p-0 transition-colors hover:bg-transparent/5",
			})}
			disabled={isSubmitting}
			onClick={e => {
				e.preventDefault();
				onClick();
				// toast.success(`Товар успешно удален из корзины!`, {
				//   style: TOAST_STYLE,
				// });
			}}
		>
			<Trash color='gray' className='size-3 md:size-4 hover:text-black' />
		</Button>
	);
}

// import { ICartItem, IOrderForm } from "@/app/(pages)/cart/includes/Cart";
// import { useCart } from "@/store/cart";
// import InputInc from "@/components/ui/custom/InputInc";
// import NoImage from "@/components/ui/custom/NoImage";
// import Price from "@/components/ui/custom/Price";
// import { TableColumn, TableItem, TableTitle } from "@/components/ui/elements/Table";
// import { Table, TableItem, TableTitle } from "@/components/ui/table";
// import { TOAST_STYLE } from "@/helpers/axios";

{
	/* {firstImage ? (
						<Image
							className="shrink-0 max-w-full aspect-square object-contain w-full overflow-hidden"
							src={firstImage}
							alt={'Изображение продукта'}
							// quality={100}
							fill
							sizes="100%"
							// style={{ objectFit: "cover" }}
						/>
					) : (
						<NoImage isDisabled={isDisabled} />
					)} */
}
{
	/* {firstImage ? (
							<Image
								className="absolute left-0 top-0 h-full w-full shrink-0 rounded-sm"
								src={firstImage}
								alt={'Изображение продукта'}
								fill
								// quality={100}
								sizes="100%"
								style={{ objectFit: 'cover' }}
							/>
						) : (
							<NoImage isDisabled={isDisabled} className="size-4" />
						)} */
}
{
	/* <TableColumn>
	       <TableTitle title={"Размер"} text={variant.sizeName as string} />
	       <div
	         className={cn("flex flex-1 items-center justify-end md:flex-auto md:justify-start", {
	           "text-muted-foreground": isDisabled,
	         })}
	       >
	         {isEdit ? (
	           <>
	             <span className="digits">{parseFloat(size.size).toFixed(2)}</span>
	             {size?.unit}
	           </>
	         ) : (
	           <>{size?.name}</>
	         )}
	         {variant.sizeName}
	       </div>
	     </TableColumn> */
}
