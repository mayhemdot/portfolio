"use client";

import { Loader2, MapPin, Truck, UserIcon } from "lucide-react";
import { type Locale, useTranslations } from "next-intl";
import { useState } from "react";
import {
  useCartItems,
  useTotalItems,
  useTotalPrice,
} from "@/modules/cart/model/helpers";
import { CartAndCheckoutLayout } from "@/modules/cart/ui/CartLayout";
import type { User } from "@/modules/users/model/types";
import { InputField } from "@/shared/components/InputField";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { formatPrice } from "@/shared/utils/formatPrice";


type Shipping = {
  id: number;
  name: string;
  price: number;
}

type Props = {
  shippings: Shipping[];
  user: User;
  locale: Locale;
};

const percentRate = 0; //0.08;

export default function CheckoutClient({ shippings, user, locale }: Props) {
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const totalItems = useTotalItems();
  const subtotal = useTotalPrice();
  const cartItems = useCartItems();

  const t = useTranslations("checkoutPage");

  // const clearCart = useCartStore(store => store.clearCart)

  // const form = useForm({
  //   resolver: zodResolver(checkoutSchema),
  //   defaultValues: {
  //     orderedBy: {
  //       user: user.id,
  //     },
  //     phone: "",
  //     address: "",
  //     city: "",
  //     zip: "",
  //     items: cartItems?.map((item) => ({
  //       product: item.product.id,
  //       quantity: item.quantity,
  //     })),
  //   },
  // });
  // const shippingMethodId = form.watch("shippingMethod");

  // const shippingMethodSelected = shippings.find(
  //   (item) => shippingMethodId && item.id === Number(shippingMethodId),
  // );

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { isLoading, errors },
  // } = form;

  const [shippingMethodSelected, setShippingMethodSelected] =
    useState<any | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>(null);

  

  const shipping = shippingMethodSelected?.price || 0;
  const tax = subtotal * percentRate;
  const total = subtotal + shipping + tax;

  // const { mutate } = useCheckout();

  const handlerCheckout = (data: any) => {
    console.log(data);
  };

  return (
    <CartAndCheckoutLayout
      currencyCode="USD"
      title={t("title")}
      totalShipping={shipping}
      totalItems={totalItems}
      totalPrice={total}
      action={
        <Button type="submit" className="w-full" disabled={isLoading} size="lg">
          {t("orderSummary.completeOrderButton")}
          {isLoading && <Loader2 className="animate-spin ml-2" />}
        </Button>
      }
    >
  
        <form onSubmit={handlerCheckout}>
          {/* Checkout Form */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {/* Shipping Address */}
            <Card className="bg-secondary rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="size-5" />
                  {t("shippingAddress.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <InputField
                  name="address"
                  label={t("shippingAddress.form.street")}
                  placeholder={t("shippingAddress.form.street")}
                  required
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    name="city"
                    label={t("shippingAddress.form.city")}
                    placeholder={t("shippingAddress.form.city")}
                    required
                    className=""
                  />
                  <InputField
                    name="zip"
                    label={t("shippingAddress.form.zip")}
                    placeholder={t("shippingAddress.form.zip")}
                    required
                  />
                  {/* <div>
                        <Label htmlFor="state">State</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ny">Moscow</SelectItem>
                            <SelectItem value="ca">Saint-Petersburg</SelectItem>
                          </SelectContent>
                        </Select>
                      </div> */}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Method */}
            <Card className="bg-secondary rounded-3xl h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="size-5" />
                  {t("shippingMethod.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                   name="shippingMethod"
                   onValueChange={shippingMethodSelected}
                 >
                   {shippings?.map((s) => (
                     <div
                       key={s.id}
                       className="flex bg-primary text-primary-foreground items-center justify-between px-4 rounded-full"
                     >
                       <div className="dark h-fit flex grow items-center space-x-2">
                         <RadioGroupItem
                           value={String(s.id)}
                           id={String(s.id)}
                         />
                         <Label
                           htmlFor={String(s.id)}
                           className="font-medium flex justify-between h-10 md:h-12 xl:h-14 w-full! fl-text-16/20"
                         >
                           <div className="fl-text-16/20 grow">{s.name}</div>
                           <div className="w-fit ml-auto fl-text-16/20">
                             {formatPrice(s.price, {
                               locale: locale,
                               currencyCode: "USD",
                             })}
                           </div>
                         </Label>
                       </div>
                     </div>
                   ))}
                 </RadioGroup>

                {/* <Controller
                  control={form.control}
                  name="shippingMethod"
                  render={({ field }) => (
                 
                  )}
                /> */}
                {errors?.shippingMethod && (
                  <p className="fl-text-16/20 text-red-500 py-2">
                    {errors.shippingMethod.message}
                  </p>
                )}
              </CardContent>
            </Card>
            <Card className="bg-secondary rounded-3xl h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserIcon className="size-5" />
                  {t("customerInformation.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <InputField
                  label=""
                  disabled={true}
                  className="hidden"
                  wrapperClassName="hidden"
                  name={"orderedBy.user"}
                  // register={register}
                />

                <InputField
                  label={t("customerInformation.form.phoneNumber")}
                  name="phone"
                  placeholder="+7 (xxx) xxx-xx-xx"
                  required
                  // register={register}
                />
              </CardContent>
            </Card>
            {/* Billing Address */}
            <Card className="bg-secondary rounded-3xl h-fit">
              <CardHeader>
                <CardTitle>{t("billingAddress.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox
                    id="sameAsShipping"
                    checked={sameAsShipping}
                    onCheckedChange={(data: any) =>
                      setSameAsShipping(Boolean(data))
                    }
                  />
                  <Label htmlFor="sameAsShipping">
                    Same as shipping address
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
    </CartAndCheckoutLayout>
  );
}
