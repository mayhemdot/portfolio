import { Shipping } from '@/payload-types'

export function shippingMethodName(shippingMethod: Shipping | number) {
  if (typeof shippingMethod === 'object') {
    return shippingMethod?.name || 'Не указан'
  } else if (typeof shippingMethod === 'number') {
    return 'Проверьте relation depth'
  }
}
