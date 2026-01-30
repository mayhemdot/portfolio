import { getProductId } from '@/collections/Products/helpers/getProductId'
import { Order } from '@/payload-types'
import { FieldHookArgs } from 'payload'

export async function calculateTotalPrice({ data, req }: FieldHookArgs<Order>) {
  if (!data?.items?.length) return []

  // Получаем ID продуктов
  const productIDs = data.items
    .map(item => getProductId(item.product))
    .filter(Boolean)

  if (!productIDs?.length) return data.items

  // Запрашиваем продукты из БД
  const { docs: products } = await req.payload.find({
    collection: 'products',
    where: { id: { in: productIDs } },
    depth: 0,
  })

  const productsMap = new Map(products.map(prod => [prod.id, prod]))

  // Обновляем totalPrice
  return data.items.map(item => {
    const productId = getProductId(item.product)
    const product = productId ? productsMap.get(productId) : null

    return {
      ...item,
      totalPrice: (product?.price ?? 0) * (item.quantity ?? 1),
    }
  })
}
