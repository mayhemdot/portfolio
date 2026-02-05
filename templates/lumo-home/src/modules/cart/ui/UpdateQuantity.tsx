'use client'

import { useCartStore } from '@/modules/cart/model/store'
import { InputQuantity } from '@/shared/components/ui/input-quantity'

type Props = {
  productId: number 
  productVariant?: number
  enableVariants: boolean
}

export function UpdateQuantityCart({
  productId,
  productVariant,
  enableVariants,
}: Props) {
  const { updateQuantity, cartItems } = useCartStore(store => store)

  const countInCart =
    cartItems.find(item => item.product?.id === productId)?.quantity || 0

  const selectedProductId =
    enableVariants && productVariant ? productVariant : productId.toString()

  const item = cartItems.find(item => item.id === selectedProductId.toString())
  if (!item) return null

  return (
    <InputQuantity
      // className={'bg-secondary'}
      quantity={countInCart}
      update={pos => updateQuantity(item?.id!, Math.max(0, countInCart + pos))}
      variant={'default'}
      size={'default'}
    />
  )
}
