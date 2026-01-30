import { useCartStore } from './store'

export const useCartItems = () => useCartStore(state => state.cartItems)

export const useTotalItems = () =>
  useCartStore(state =>
    state.cartItems.reduce((total, item) => total + item.quantity, 0),
  )

export const useTotalPrice = () =>
  useCartStore(state =>
    state.cartItems.reduce(
      (total, item) => total + (item.product.price ?? 0) * item.quantity,
      0,
    ),
  )
