"use client";

import { useSearchParams } from "next/navigation";
import type React from "react";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/elements/Card";
import { LinkButton } from "@/components/LinkButton";
import { Message } from "@/components/Message";
import { SuccessfullyMessage } from "@/components/SuccessfullyMessage";
import classes from "./index.module.scss";

export const OrderConfirmationPage: React.FC<{}> = () => {
	const searchParams = useSearchParams();
	const orderID = searchParams.get("order_id");
	const error = searchParams.get("error");

	// const { clearCart } = useCart()
	// const
	// useEffect(() => {
	//   clearCart()
	// }, [clearCart])

	const locale = "ru";

	const t = {
		en: {
			success: {
				title: "Order confirmation",
				message: `Your order has been successfully processed. You will receive an email with confirmation.`,
				links: {
					left: { label: "Continue shopping" },
					right: { label: "View order" },
				},
			},
			error: {
				title: "Order error",
				message: `Your order has not been processed. Please contact support.`,
				links: {
					left: { label: "View contacts" },
					// right: { label: 'View ' },
				},
			},
		},
		ru: {
			success: {
				title: "Подтверждение заказа",
				message: `Ваш заказ успешно обработан. Вы получите письмо с подтверждением.`,
				links: {
					left: { label: "Продолжить покупки" },
					right: { label: "Перейти к заказу" },
				},
			},
			error: {
				title: "Ошибка заказа",
				message: `Ваш заказ не обработан. Пожалуйста, свяжитесь с поддержкой.`,
				links: {
					left: { label: "Перейти к контактам" },
				},
			},
		},
	};
	const layout = t[locale][error ? "error" : "success"];
	return (
		<div className='container min-h-screen'>
			<div className='max-w-prose pt-[30%]'>
				{error ? (
					<>
						<Message error={error} />
						<Card>
							<CardContent>
								<p className='fsNormal py-4'>
									{` Ваш платеж был успешно обработан, но произошла ошибка при обработке вашего заказа. Пожалуйста, свяжитесь с нами для решения данного вопроса.`}
								</p>
								<div className={classes.actions}>
									<LinkButton
										aria-label={layout.links["left"].label}
										href={`/contacts`}
										variant='secondary'
									>
										{layout.links["left"].label}
									</LinkButton>
								</div>
							</CardContent>
						</Card>
					</>
				) : (
					<SuccessfullyMessage
						title='Спасибо за заказ!'
						message={
							<>
								<span>{`Ваш заказ передан на обработку.`}</span>
								<span>{`Вы получите электронное письмо с подтверждением.`}</span>
								<span>{`Ваш номер заказа: ${orderID}.`}</span>
							</>
						}
						actions={
							<>
								<LinkButton
									aria-label={layout.links["left"].label}
									href={`/products`}
									variant='secondary'
									size={"lg"}
								>
									{/* Вернуться к покупкам */}
									{layout.links["left"].label}
								</LinkButton>
								<LinkButton
									aria-label={layout.links["right"].label}
									href={`/account/orders?orderId=${orderID}`}
									variant='outline'
									size={"lg"}
								>
									{/* Перейти к заказу */}
									{layout.links["right"].label}
								</LinkButton>
							</>
						}
					/>
				)}
			</div>
		</div>
	);
};

// <Card>
//   <CardContent>
//     <div className="flex flex-col gap-4">
//       <div className="flex flex-col gap-2 items-center">
//         <Checkmark />
//         <h1>Спасибо за заказ!</h1>
//       </div>
//       <Separator />
//       <div>
//         <p className="pb-4 fsNormal flex-col flex">
//           <span>{`Ваш заказ передан на обработку.`}</span>
//           <span>{`Вы получите электронное письмо с подтверждением.`}</span>

//           <span>{`Ваш номер заказа: ${orderID}.`}</span>
//         </p>
//         <div className={classes.actions}>
//           <Link
//             href={`/products`}
//             className={buttonVariants({
//               variant: 'secondary',
//               className: 'fsSmall flex items-center gap-2 group',
//             })}
//           >
//             <span>Вернуться к покупкам</span>
//             <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
//           </Link>

//           <Link
//             href={`/account/orders?orderId=${orderID}`}
//             className={buttonVariants({
//               variant: 'outline',
//               className: 'fsSmall flex items-center gap-2 group',
//             })}
//           >
//             <span>Перейти к заказу</span>
//             <ArrowRight className="size-3.5 text-dark-color group-hover:translate-x-1 transition-transform" />
//           </Link>
//         </div>
//       </div>
//     </div>
//   </CardContent>
// </Card>
{
	/* <Link
href={`/products`}
className={buttonVariants({
  variant: 'secondary',
  className: 'fsSmall flex items-center gap-2 group',
})}
>
<span>Вернуться к покупкам</span>
<ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
</Link> */
}
