// 'use client'

// import React, {
//   createContext,
//   useCallback,
//   useContext,
//   useEffect,
//   useReducer,
//   useRef,
//   useState,
// } from 'react'

// import { ProductVariant, User } from '@/payload/payload-types'
// // import { useAuth } from '../Auth'
// import { CartItem, cartReducer } from './reducer'

// export type CartContext = {
//   cart: User['cart']
//   addItemToCart: (item: CartItem) => void
//   deleteItemFromCart: (product: ProductVariant) => void
//   deleteSelectedItems: () => void
//   cartIsEmpty: boolean | undefined
//   clearCart: () => void
//   isProductInCart: (product: ProductVariant) => boolean
//   setItemSelected: (payload: { variantId: number; isSelected: boolean }) => void
//   setAllItemsSelected: (isSelected: boolean) => void
//   allIsSelected: boolean
//   cartTotal: {
//     formatted: string
//     raw: number
//   }
//   cartIsNotSelected: boolean
//   hasInitializedCart: boolean
// }

// const Context = createContext({} as CartContext)

// export const useCart = () => useContext(Context)

// const arrayHasItems = (array) => Array.isArray(array) && array.length > 0

// /**
//  * ensure that cart items are fully populated, filter out any items that are not
//  * this will prevent discontinued products from appearing in the cart
//  */
// const flattenCart = (cart: User['cart']): User['cart'] => ({
//   ...cart,
//   items: cart?.items
//     .map((item) => {
//       if (!item?.variant || typeof item?.variant !== 'object') {
//         return null
//       }

//       return {
//         ...item,
//         // flatten relationship to product
//         variant: item?.variant?.id,
//         quantity: typeof item?.quantity === 'number' ? item?.quantity : 0,
//       }
//     })
//     ?.filter(Boolean) as CartItem[],
// })

// // Step 1: Check local storage for a cart
// // Step 2: If there is a cart, fetch the products and hydrate the cart
// // Step 3: Authenticate the user
// // Step 4: If the user is authenticated, merge the user's cart with the local cart
// // Step 4B: Sync the cart to Payload and clear local storage
// // Step 5: If the user is logged out, sync the cart to local storage only

// export const CartProvider = (props) => {
//   // const { setTimedNotification } = useNotifications();
//   const { children } = props
//   const { user, status: authStatus } = useAuth()

//   const [cart, dispatchCart] = useReducer(cartReducer, {})

//   const [total, setTotal] = useState<{
//     formatted: string
//     raw: number
//   }>({
//     formatted: '0.00',
//     raw: 0,
//   })

//   const hasInitialized = useRef(false)
//   const [hasInitializedCart, setHasInitialized] = useState(false)

//   // Check local storage for a cart
//   // If there is a cart, fetch the products and hydrate the cart
//   useEffect(() => {
//     // wait for the user to be defined before initializing the cart
//     if (user === undefined) return
//     if (!hasInitialized.current) {
//       hasInitialized.current = true

//       const syncCartFromLocalStorage = async () => {
//         const localCart = localStorage.getItem('cart')

//         const parsedCart = JSON.parse(localCart || '{}')

//         if (parsedCart?.items && parsedCart?.items?.length > 0) {
//           const initialCart = await Promise.all(
//             parsedCart.items.map(async ({ variant, quantity }) => {
//               console.log('synced variant', variant)
//               const res = await fetch(
//                 `${process.env.NEXT_PUBLIC_SERVER_URL}/api/product-variants/${variant}`
//               )
//               const data = await res.json()
//               return {
//                 variant: data,
//                 quantity,
//               }
//             })
//           )

//           dispatchCart({
//             type: 'SET_CART',
//             payload: {
//               items: initialCart,
//             },
//           })
//         } else {
//           dispatchCart({
//             type: 'SET_CART',
//             payload: {
//               items: [],
//             },
//           })
//         }
//       }

//       syncCartFromLocalStorage()
//     }
//   }, [user])

//   // authenticate the user and if logged in, merge the user's cart with local state
//   // only do this after we have initialized the cart to ensure we don't lose any items
//   useEffect(() => {
//     if (!hasInitialized.current) return

//     if (authStatus === 'loggedIn') {
//       // merge the user's cart with the local state upon logging in
//       dispatchCart({
//         type: 'MERGE_CART',
//         payload: user?.cart,
//       })
//     }

//     if (authStatus === 'loggedOut') {
//       // clear the cart from local state after logging out
//       dispatchCart({
//         type: 'CLEAR_CART',
//       })
//     }
//   }, [user, authStatus])

//   // every time the cart changes, determine whether to save to local storage or Payload based on authentication status
//   // upon logging in, merge and sync the existing local cart to Payload
//   useEffect(() => {
//     // wait until we have attempted authentication (the user is either an object or `null`)
//     if (!hasInitialized.current || user === undefined || !cart.items) return

//     const flattenedCart = flattenCart(cart)

//     if (user) {
//       // prevent updating the cart when the cart hasn't changed
//       if (JSON.stringify(flattenCart(user.cart)) === JSON.stringify(flattenedCart)) {
//         setHasInitialized(true)
//         return
//       }

//       try {
//         const syncCartToPayload = async () => {
//           const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user.id}`, {
//             // Make sure to include cookies with fetch
//             credentials: 'include',
//             method: 'PATCH',
//             body: JSON.stringify({
//               cart: flattenedCart,
//             }),
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           })

//           if (req.ok) {
//             localStorage.setItem('cart', '[]')
//           }
//         }

//         syncCartToPayload()
//       } catch (e) {
//         console.error('Error while syncing cart to Payload.') // eslint-disable-line no-console
//       }
//     } else {
//       localStorage.setItem('cart', JSON.stringify(flattenedCart))
//     }

//     setHasInitialized(true)
//   }, [user, cart])

//   const isProductInCart = useCallback(
//     (incomingProduct: ProductVariant): boolean => {
//       let isInCart = false
//       const { items: itemsInCart } = cart || {}
//       if (Array.isArray(itemsInCart) && itemsInCart.length > 0) {
//         isInCart = Boolean(
//           itemsInCart.find(({ variant }) =>
//             typeof variant === 'object'
//               ? variant?.id === incomingProduct.id
//               : variant === incomingProduct.id
//           ) // eslint-disable-line function-paren-newline
//         )
//       }
//       return isInCart
//     },
//     [cart]
//   )

//   // this method can be used to add new items AND update existing ones
//   const addItemToCart = useCallback((incomingItem: CartItem) => {
//     dispatchCart({
//       type: 'ADD_ITEM',
//       payload: incomingItem,
//     })
//   }, [])

//   const deleteItemFromCart = useCallback((incomingProduct: ProductVariant) => {
//     dispatchCart({
//       type: 'DELETE_ITEM',
//       payload: incomingProduct,
//     })
//   }, [])

//   const setItemSelected = useCallback(
//     (payload: { variantId: number; isSelected: boolean }) => {
//       dispatchCart({
//         type: 'SET_ITEM_SELECTED',
//         payload,
//       })
//     },
//     []
//   )
//   const setAllItemsSelected = useCallback((isSelected: boolean) => {
//     dispatchCart({
//       type: 'SET_ALL_ITEMS_SELECTED',
//       payload: isSelected,
//     })
//   }, [])

//   const deleteSelectedItems = useCallback(() => {
//     dispatchCart({
//       type: 'DELETE_SELECTED_ITEMS',
//     })
//   }, [])
//   const clearCart = useCallback(() => {
//     dispatchCart({
//       type: 'CLEAR_CART',
//     })
//   }, [])

//   // calculate the new cart total whenever the cart changes
//   useEffect(() => {
//     if (!hasInitialized) return

//     const newTotal =
//       cart?.items?.reduce((acc, item) => {
//         if (typeof item.variant !== 'object') return 0
//         if (typeof item.variant.product !== 'object') return 0

//         const stripePriceId = (item.variant as ProductVariant)?.stripePriceId

//         if (stripePriceId === undefined) {
//           console.error('stripePriceId is undefined проверьте присвоен ли товар')
//         }

//         const prices = JSON.parse(item.variant?.product?.priceJSON || '{}')?.data

//         if (!stripePriceId || !prices?.length) return 0

//         const currentPrice = prices.find((price) => price.id === stripePriceId) || {
//           unit_amount: 0,
//         }
//         const quantity = typeof item?.quantity === 'number' ? item?.quantity : 0

//         return acc + (item.isSelected ? currentPrice?.unit_amount * quantity : 0)
//       }, 0) || 0

//     setTotal({
//       formatted: (newTotal / 100).toLocaleString('en-US', {
//         style: 'currency',
//         currency: 'USD',
//       }),
//       raw: newTotal,
//     })
//   }, [cart, hasInitialized])

//   const cartHasItems = arrayHasItems(cart?.items)
//   const selectedItems = cartHasItems ? cart?.items.filter((item) => item?.isSelected) : []

//   return (
//     <Context.Provider
//       value={{
//         cart,
//         addItemToCart,
//         deleteItemFromCart,
//         deleteSelectedItems,
//         cartIsEmpty: hasInitializedCart && !cartHasItems,
//         setAllItemsSelected,
//         cartIsNotSelected: hasInitializedCart && !selectedItems.length,
//         allIsSelected:
//           hasInitializedCart && cartHasItems && selectedItems.length === cart?.items?.length,
//         clearCart,
//         isProductInCart,
//         cartTotal: total,
//         hasInitializedCart,
//         setItemSelected,
//       }}
//     >
//       {children && children}
//     </Context.Provider>
//   )
// }
