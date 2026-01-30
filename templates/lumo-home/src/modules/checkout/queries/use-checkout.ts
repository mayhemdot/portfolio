// import { useMutation } from '@tanstack/react-query'
// import { restApi } from '@/shared/utils/restApi'
// import { CheckoutActionSchema } from '@/modules/checkout/model/schemas'
// import { useRouter } from 'next/navigation'
// import { useCartStore } from '@/modules/cart/model/store'
// import { Order, Payment } from '@/payload-types'
// import toast from 'react-hot-toast'

// type CheckoutResponseError = {
//   errors?: Array<{
//     name: string
//     data: any
//     message: string
//   }>
// }
// type CheckoutResponseSuccess = {
//   doc: Order
//   message: string
// }

// type CheckoutResponse = CheckoutResponseError | CheckoutResponseSuccess

// export const useCheckout = () => {
//   const clearCart = useCartStore(store => store.clearCart)
//   const router = useRouter()
//   return useMutation<CheckoutResponse, Error, CheckoutActionSchema>({
//     mutationFn: async (checkoutData: CheckoutActionSchema) => {
//       const response = await restApi('/api/orders', {
//         method: 'POST',
//         body: JSON.stringify(checkoutData),
//       })

//       return response as CheckoutResponse
//     },
//     onSuccess: data => {
//       if ((data as CheckoutResponseError)?.errors?.length) {
//         toast.error((data as CheckoutResponseError)?.errors![0]?.message)
//       } else {
//         clearCart()
//         // console.log('>>data', data)
//         router.push(
//           ((data as CheckoutResponseSuccess)?.doc?.payment as Payment)
//             ?.confirmation.confirmation_url,
//         )
//       }
//     },
//     onError: error => {
//       console.log('[useCheckout]', error)
//     },
//   })
// }
