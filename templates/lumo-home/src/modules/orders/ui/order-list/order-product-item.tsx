import { LocaleCode } from "@/i18n/localization";
import { OrderItemRaw } from "@/modules/orders/model/types";
import { Product } from "@/modules/products/model/types";
import { Media } from "@/shared/components/Media";
import { formatPrice } from "@/shared/utils/formatPrice";
import { Text } from "@/shared/components/Text";

export function OrderProductItem({
	orderItem,
	localeCode,
}: {
	orderItem: OrderItemRaw;
	localeCode: LocaleCode;
}) {
	const product = new Product(orderItem.productRaw, localeCode);

	if (!product) return null;

	const resource = product?.images?.[0];
	const currentPrice = product?.price || 0;

	return (
		<div
			key={orderItem.id}
			className='bg-background mb-2 rounded-2xl p-4 last:mb-0'
		>
			<div className='mb-2 flex gap-4'>
				<div className='size-12 lg:size-16 relative overflow-hidden rounded-md border'>
					{resource && (
						<Media resource={resource} fill imgClassName='!object-contain' />
					)}
				</div>
				<div className='min-w-0 flex-1'>
					<Text comp='h4' variant='secondary' className='truncate font-medium'>
						{product.title}
					</Text>
					<Text comp='p' variant='mutedForeground'>
						{product.prettyPrice(orderItem?.quantity || 1)}
					</Text>
				</div>
			</div>
			<div className='flex items-center justify-between border-t pt-1'>
				<Text comp='p' variant='secondary'>
					{formatPrice(currentPrice, { localeCode })} x {orderItem.quantity}
				</Text>
				<Text comp='p' variant='secondary' size='xsm' className='font-semibold'>
					{product.prettyPrice()}
				</Text>
			</div>
		</div>
	);
}
