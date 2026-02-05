// 'use client'

// import type React from 'react'

// import { useActionState, useEffect, useState } from 'react'
// import { Button } from '@/shared/components/ui/button'
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/shared/components/ui/card'
// import { Input } from '@/shared/components/ui/input'
// import { Label } from '@/shared/components/ui/label'
// import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group'
// import { Separator } from '@/shared/components/ui/separator'
// import { Checkbox } from '@/shared/components/ui/checkbox'
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from '@/shared/components/ui/select'
// import { Truck, MapPin, UserIcon, Loader2 } from 'lucide-react'
// import {
//   useCartItems,
//   useTotalItems,
//   useTotalPrice,
// } from '@/modules/cart/model/helpers'
// import { formatPrice } from '@/shared/utils/formatPrice'
// import { processCheckout } from '../actions/checkoutAction'
// import { useCartStore } from '@/modules/cart/model/store'
// import { useRouter } from 'next/navigation'

// type Props = {
//   shippings: Shipping[]
//   user: User
// }

// export default function Checkout({ shippings, user }: Props) {
//   // const [paymentMethod, setPaymentMethod] = useState("card");
//   const [shippingMethodId, setShippingMethodId] = useState(shippings[0].id)
//   const [sameAsShipping, setSameAsShipping] = useState(true)
//   const router = useRouter()
//   // const totalItems = useTotalItems()
//   const totalPrice = useTotalPrice()
//   const cartItems = useCartItems()
//   const clearCart = useCartStore(store => store.clearCart)

//   const subtotal = totalPrice
//   const shippingMethodSelected = shippings.find(
//     item => item.id === shippingMethodId,
//   )

//   const shipping = shippingMethodSelected?.price || 0
//   const tax = 0 //subtotal * 0.08;
//   const total = subtotal + shipping + tax
//   // console.log('def', cartItems)

//   //   const handleSubmit = (e: React.FormEvent) => {
//   //     e.preventDefault();

//   //     const def = {
//   //       name: "",
//   //       email: "",
//   //       phone: "",
//   //       address: "",
//   //       city: "",
//   //       state: "",
//   //       zip: "",
//   //       country: "",
//   //     };
//   //     // Handle checkout submission
//   //     console.log("Processing checkout...");
//   //   };
//   const [state, checkoutActionHandler, isLoading] = useActionState(
//     processCheckout,
//     {
//       success: false,
//       data: undefined,
//       error: '',
//     },
//   )

//   useEffect(() => {
//     if (state.success) {
//       clearCart()
//       router.push('/')
//     }
//   }, [state.success])

//   return (
//     <div className="min-h-dvh">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
//           <form
//             action={checkoutActionHandler}
//             className="grid grid-cols-1 lg:grid-cols-2 gap-8"
//           >
//             {/* Checkout Form */}
//             <div className="space-y-6">
//               <div
//                 // onSubmit={handleSubmit}
//                 className="space-y-6"
//               >
//                 {/* Customer Information */}
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2">
//                       <UserIcon className="size-5" />
//                       Customer Information
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <input type="hidden" name={'user'} value={user.id} />
//                     <div>
//                       <Label htmlFor="phone">Phone Number</Label>
//                       <Input
//                         id="phone"
//                         name="phone"
//                         type="tel"
//                         placeholder="+7 (xxx) xxx-xx-xx"
//                       />
//                     </div>
//                   </CardContent>
//                 </Card>

//                 {/* Shipping Address */}
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2">
//                       <MapPin className="size-5" />
//                       Shipping Address
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div>
//                       <Label htmlFor="address">Street Address</Label>
//                       <Input
//                         id="address"
//                         name="address"
//                         placeholder="123 Main Street"
//                         required
//                       />
//                     </div>
//                     {/* <div>
//                       <Label htmlFor="apartment">
//                         Apartment, suite, etc. (optional)
//                       </Label>
//                       <Input id="apartment" placeholder="Apt 4B" />
//                     </div> */}
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <div>
//                         <Label htmlFor="city">City</Label>
//                         <Input
//                           id="city"
//                           name="city"
//                           placeholder="Saint-Petersburg"
//                           required
//                         />
//                       </div>
//                       {/* <div>
//                         <Label htmlFor="state">State</Label>
//                         <Select>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select state" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="ny">Moscow</SelectItem>
//                             <SelectItem value="ca">Saint-Petersburg</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </div> */}
//                       <div>
//                         <Label htmlFor="zip">ZIP Code</Label>
//                         <Input
//                           name="zip"
//                           id="zip"
//                           placeholder="12345"
//                           required
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 {/* Shipping Method */}
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2">
//                       <Truck className="h-5 w-5" />
//                       Shipping Method
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <RadioGroup
//                       name="shippingMethod"
//                       value={String(shippingMethodId)}
//                       onValueChange={data => setShippingMethodId(Number(data))}
//                     >
//                       {shippings?.map(s => (
//                         <div
//                           key={s.slug}
//                           className="flex items-center justify-between p-4 border rounded-lg"
//                         >
//                           <div className="flex items-center space-x-2">
//                             <RadioGroupItem
//                               value={String(s.id)}
//                               id={String(s.id)}
//                             />
//                             <Label
//                               htmlFor={String(s.id)}
//                               className={'font-medium'}
//                             >
//                               {s.name}
//                             </Label>
//                           </div>
//                           <div className="text-right">
//                             <div className={'font-medium'}>
//                               {formatPrice(s.price)}
//                             </div>
//                             <div className="text-sm text-gray-500">
//                               {s.description}
//                             </div>
//                           </div>
//                         </div>
//                       ))}

//                       {/* <div className="flex items-center justify-between p-4 border rounded-lg">
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="express" id="express" />
//                           <Label htmlFor="express" className="font-medium">
//                             Express Shipping
//                           </Label>
//                         </div>
//                         <div className="text-right">
//                           <div className="font-medium">{formatPrice(599)}</div>
//                           <div className="text-sm text-gray-500">
//                             2-3 business days
//                           </div>
//                         </div>
//                       </div> */}
//                     </RadioGroup>
//                   </CardContent>
//                 </Card>

//                 {/* Payment Method */}
//                 {/* <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2">
//                       <CreditCard className="h-5 w-5" />
//                       Payment Method
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <RadioGroup
//                       value={paymentMethod}
//                       onValueChange={setPaymentMethod}
//                     >
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="card" id="card" />
//                         <Label htmlFor="card">Credit/Debit Card</Label>
//                       </div>
//                     </RadioGroup>

//                     {paymentMethod === "card" && (
//                       <div className="space-y-4 pt-4">
//                         <div>
//                           <Label htmlFor="cardNumber">Card Number</Label>
//                           <Input
//                             id="cardNumber"
//                             placeholder="1234 5678 9012 3456"
//                           />
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                           <div>
//                             <Label htmlFor="expiry">Expiry Date</Label>
//                             <Input id="expiry" placeholder="MM/YY" />
//                           </div>
//                           <div>
//                             <Label htmlFor="cvv">CVV</Label>
//                             <Input id="cvv" placeholder="123" />
//                           </div>
//                         </div>
//                         <div>
//                           <Label htmlFor="cardName">Name on Card</Label>
//                           <Input id="cardName" placeholder="John Doe" />
//                         </div>
//                       </div>
//                     )}
//                   </CardContent>
//                 </Card> */}

//                 {/* Billing Address */}
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Billing Address</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="flex items-center space-x-2 mb-4">
//                       <Checkbox
//                         id="sameAsShipping"
//                         checked={sameAsShipping}
//                         onCheckedChange={data =>
//                           setSameAsShipping(Boolean(data))
//                         }
//                       />
//                       <Label htmlFor="sameAsShipping">
//                         Same as shipping address
//                       </Label>
//                     </div>

//                     {!sameAsShipping && (
//                       <div className="space-y-4">
//                         <div>
//                           <Label htmlFor="billingAddress">Street Address</Label>
//                           <Input
//                             id="billingAddress"
//                             placeholder="123 Main Street"
//                           />
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                           <div>
//                             <Label htmlFor="billingCity">City</Label>
//                             <Input id="billingCity" placeholder="New York" />
//                           </div>
//                           {/* <div>
//                             <Label htmlFor="billingState">State</Label>
//                             <Select>
//                               <SelectTrigger>
//                                 <SelectValue placeholder="Select state" />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 <SelectItem value="ny">New York</SelectItem>
//                                 <SelectItem value="ca">California</SelectItem>
//                                 <SelectItem value="tx">Texas</SelectItem>
//                                 <SelectItem value="fl">Florida</SelectItem>
//                               </SelectContent>
//                             </Select>
//                           </div> */}
//                           <div>
//                             <Label htmlFor="billingZip">ZIP Code</Label>
//                             <Input id="billingZip" placeholder="10001" />
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </CardContent>
//                 </Card>
//               </div>
//             </div>

//             {/* Order Summary */}
//             <div className="lg:sticky lg:top-8">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Order Summary</CardTitle>
//                   <CardDescription>Review your items and total</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   {/* Cart Items */}
//                   <div className="space-y-4">
//                     {cartItems?.map(item => (
//                       <div
//                         key={item.id}
//                         className="flex items-center space-x-4"
//                       >
//                         <input
//                           type="hidden"
//                           name="items[]"
//                           defaultValue={JSON.stringify({
//                             product: item.product.id,
//                             quantity: item.quantity,
//                           })}
//                         />
//                         <img
//                           src={
//                             (item.product.images?.[0] as Media).url ||
//                             '/placeholder.svg'
//                           }
//                           alt={item.product.title || 'Product'}
//                           className="w-16 h-16 object-cover rounded-md"
//                         />
//                         <div className="flex-1">
//                           <h4 className="font-medium">{item.product.title}</h4>
//                           <p className="text-sm text-gray-500">
//                             Qty: {item.quantity}
//                           </p>
//                         </div>
//                         <div className="font-medium">
//                           {formatPrice(
//                             (item.product.price || 0) * item.quantity,
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <Separator />

//                   {/* Order Totals */}
//                   <div className="space-y-2">
//                     <div className="flex justify-between">
//                       <span>Subtotal</span>
//                       <span>{formatPrice(subtotal)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Shipping</span>
//                       <span>{formatPrice(shipping)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Tax</span>
//                       <span>{formatPrice(0)}</span>
//                     </div>
//                     <Separator />
//                     <div className="flex justify-between font-bold text-lg">
//                       <span>Total</span>
//                       <span>{formatPrice(total)}</span>
//                     </div>
//                   </div>

//                   <Button
//                     type="submit"
//                     className="w-full"
//                     disabled={isLoading}
//                     size="lg"
//                   >
//                     Complete Order{' '}
//                     {isLoading && <Loader2 className="animate-spin ml-2" />}
//                   </Button>

//                   <p className="text-xs text-gray-500 text-center">
//                     By completing your order, you agree to our Terms of Service
//                     and Privacy Policy.
//                   </p>
//                 </CardContent>
//               </Card>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }
