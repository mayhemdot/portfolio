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
import { Shipping, ShippingRaw } from "@/modules/shipping/model/types";
import { getCurrency, LocaleCode } from "@/i18n/localization";
import toast from "react-hot-toast";

type Props = {
	shippings: ShippingRaw[];
	user: User;
	locale: LocaleCode;
};

const percentRate = 0; //0.08;

export default function CheckoutClient({
	shippings: shippingsRaw,
	user,
	locale,
}: Props) {
	const shippings = shippingsRaw.map(s => new Shipping(s, locale));

	const [sameAsShipping, setSameAsShipping] = useState(true);
	const currencyCode = getCurrency(locale);
	const totalItems = useTotalItems();
	const subtotal = useTotalPrice(currencyCode);
	const cartItems = useCartItems();

	const t = useTranslations("CheckoutPage");
	const tGlob = useTranslations("Global.Messages");

	const [shippingMethodSelected, setShippingMethodSelected] = useState<
		string | null
	>(null);

	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState<any>(null);

	const shipping =
		(shippingMethodSelected &&
			shippings.find(s => s.raw.id === Number(shippingMethodSelected))
				?.price) ||
		0;

	// console.log("shippingMethodSelected", shippings.map(s => s.raw.id), shippingMethodSelected)
	const tax = subtotal * percentRate;
	const total = subtotal + shipping + tax;

	// const { mutate } = useCheckout();

	const handlerCheckout = () => toast.error(tGlob("demo.checkout"));

	return (
		<CartAndCheckoutLayout
			currencyCode={currencyCode}
			title={t("title")}
			totalShipping={shipping}
			totalItems={totalItems}
			totalPrice={total}
			action={
				<Button
					type='button'
					onClick={handlerCheckout}
					className='w-full'
					disabled={isLoading}
					size='lg'
				>
					{t("orderSummary.completeOrderButton")}
					{isLoading && <Loader2 className='ml-2 animate-spin' />}
				</Button>
			}
		>
			<form onSubmit={handlerCheckout}>
				{/* Checkout Form */}
				<div className='grid grid-cols-1 gap-4 xl:grid-cols-2'>
					{/* Shipping Method */}
					<Card className='bg-secondary h-fit rounded-3xl'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2'>
								<Truck className='size-5' />
								{t("shippingMethod.title")}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<RadioGroup
								name='shippingMethod'
								onValueChange={setShippingMethodSelected}
								defaultValue={shippingMethodSelected || ""}
							>
								{shippings?.map(s => (
									<div
										key={s.id}
										className='bg-primary text-primary-foreground flex items-center justify-between rounded-full px-4'
									>
										<div className='dark flex h-fit grow items-center space-x-2'>
											<RadioGroupItem value={String(s.id)} id={String(s.id)} />
											<Label
												htmlFor={String(s.id)}
												className='w-full! fl-text-16/20 flex h-10 justify-between font-medium md:h-12 xl:h-14'
											>
												<div className='fl-text-16/20 grow'>{s.name}</div>
												<div className='fl-text-16/20 ml-auto w-fit'>
													{s.prettyPrice()}
												</div>
											</Label>
										</div>
									</div>
								))}
							</RadioGroup>

							{errors?.shippingMethod && (
								<p className='fl-text-16/20 py-2 text-red-500'>
									{errors.shippingMethod.message}
								</p>
							)}
						</CardContent>
					</Card>

					<Card className='bg-secondary h-fit rounded-3xl'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2'>
								<UserIcon className='size-5' />
								{t("customerInformation.title")}
							</CardTitle>
						</CardHeader>
						<CardContent className='flex flex-col gap-4'>
							<InputField
								label=''
								disabled={true}
								className='hidden'
								wrapperClassName='hidden'
								name={"orderedBy.user"}
							/>
							<InputField
								label={t("customerInformation.form.phoneNumber")}
								name='phone'
								className='bg-background!'
								placeholder={t(
									"customerInformation.form.phoneNumberPlaceholder",
								)}
								required
							/>
						</CardContent>
					</Card>

					{/* Shipping Address */}
					<Card className='bg-secondary rounded-3xl'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2'>
								<MapPin className='size-5 shrink-0' />
								{t("shippingAddress.title")}
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-4'>
							<InputField
								name='address'
								className='bg-background!'
								label={t("shippingAddress.form.street")}
								placeholder={t("shippingAddress.form.street")}
								required
							/>
							<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
								<InputField
									name='city'
									className='bg-background!'
									label={t("shippingAddress.form.city")}
									placeholder={t("shippingAddress.form.city")}
									required
								/>
								<InputField
									name='zip'
									className='bg-background!'
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

					{/* Billing Address */}
					<Card className='bg-secondary h-fit rounded-3xl'>
						<CardHeader>
							<CardTitle>{t("billingAddress.title")}</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='mb-4 flex items-center space-x-2'>
								<Checkbox
									disabled={true}
									id='sameAsShipping'
									checked={sameAsShipping}
									onCheckedChange={(data: any) =>
										setSameAsShipping(Boolean(data))
									}
								/>
								<Label htmlFor='sameAsShipping'>Same as shipping address</Label>
							</div>
						</CardContent>
					</Card>
				</div>
			</form>
		</CartAndCheckoutLayout>
	);
}
