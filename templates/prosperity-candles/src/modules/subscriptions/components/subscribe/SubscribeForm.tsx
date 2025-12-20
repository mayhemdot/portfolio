"use client";

// import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
// import { useMutation } from "@tanstack/react-query";
import { Send } from "lucide-react";
import Link from "next/link";
import { type FC, useState } from "react";
// import { type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
// import { z } from "zod";
// import { restApi } from "@/app/_api/restApi";
import InputField from "@/components/elements/InputField";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SERVICE_LINKS } from "@/modules/common/data/urls";

// import { SERVICE_LINKS } from "@/data/urls";

// interface ISubscribeForm {
//   id?: number
//   email: string
// }

// const SubscribeSchema = z.object({
// 	email: z.string().email({ message: "Please enter a valid email address" }),
// });

// type SubscribeSchemaType = z.infer<typeof SubscribeSchema>;

const SubscribeForm: FC = () => {
	const [isSubscribed, setSubscribed] = useState(false);
	const [checked, setChecked] = useState(false);
	// const {
	// 	register,
	// 	handleSubmit,
	// 	setError,
	// 	formState: { errors, isSubmitting },
	// } = useForm<SubscribeSchemaType>({
	// 	resolver: zodResolver(SubscribeSchema),
	// });

	// const { mutate: subscribe } = useMutation({
	//   mutationFn: (data: ISubscribeForm) =>
	//     SubscribeService.create<ISubscribeForm, ISubscribeForm>(data),
	//   onSuccess: () => setSubscribed(true),
	//   onError: (e: AxiosError) => setServerError(e, setError)
	// })
	// const { mutate: subscribeUser, isPending } = useMutation({
	// 	mutationFn: (data: SubscribeSchemaType) =>
	// 		restApi(`/api/subscribers`, {
	// 			method: "POST",
	// 			body: JSON.stringify({
	// 				email: data.email,
	// 			}),
	// 		}),
	// 	onSuccess: (data: any) => {
	// 		if (!data?.errors?.length) {
	// 			toast.success(data?.message || "Successfully subscribed.");
	// 		} else {
	// 			toast.error(
	// 				data?.errors?.[0].message || "An error occurred while subscribing."
	// 			);
	// 		}
	// 	},
	// 	onError: e => {
	// 		toast.error(e?.message || "There was a problem updating your account.");
	// 	},
	// });
	const onSubmit = async (data: any) => {
		toast.success("Спасибо за подписку!");
	}; // subscribeUser(data)
	// const onSubmit: SubmitHandler<SubscribeSchemaType> = async (data) => {
	//   if (!data) return

	//   try {
	//     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/subscribe`, {
	//       method: 'POST',
	//       headers: {
	//         'Content-Type': 'application/json',
	//       },
	//       body: JSON.stringify(data),
	//     })

	//     if (res && res.ok) {
	//       setSubscribed(true)
	//     } else {
	//       setError('root', { message: 'Something went wrong while subscribing' })
	//       const data = await res?.json()
	//       console.error(data)
	//     }
	//   } catch (error) {
	//     console.error(error)
	//     setError('root', { message: 'Something went wrong while subscribing' })
	//   }
	// }

	return !isSubscribed ? (
		<form
			className='textBlockSubscribe max-w-96 z-10 flex flex-1 flex-col opacity-0 xl:max-w-[680px]'
			onSubmit={onSubmit}
		>
			<div className='flex h-auto shrink-0 flex-col items-start justify-center gap-4 xl:flex-row'>
				<div className='inline-flex flex-col gap-4'>
					<InputField
						// disabled={isSubmitting}
						label={""}
						// error={errors.email}
						className='fsNormal min-h-14 max-h-14 shrink-0 grow basis-2/3 rounded-2xl '
						type='email'
						// {...register("email", {
						// 	required: true,
						// })}
						placeholder='Введите email'
					/>
					<span className='flex items-center gap-4 px-2'>
						<Checkbox
							id='terms'
							className='size-6'
							defaultChecked={checked}
							onClick={() => {
								setChecked(prev => !prev);
							}}
						/>
						<Label htmlFor='terms' className='fsSmall'>
							я ознакомился и согласен с
							<Link href={SERVICE_LINKS.POLITIC}>
								<strong>политикой обработки персональных данных</strong>
							</Link>
						</Label>
					</span>
				</div>

				<Button
					aria-label='Оформить подписку'
					aria-disabled={!checked}
					type='submit'
					className={
						"fsNormal min-h-14  w-full grow basis-1/3 space-x-3 rounded-2xl"
					}
					disabled={!checked}
				>
					<span>Оформить</span>
					{/* {isSubmitting || isPending ? (
						<ReloadIcon className='size-4 animate-spin' />
					) : (
						<Send className='size-4' />
					)} */}
					<Send className='size-4' />
				</Button>

				{/* {errors?.email && <span>{errors.email.message}</span>} */}
			</div>
		</form>
	) : (
		<div className='fsTitle'>Спасибо за подписку</div>
	);
};

export default SubscribeForm;
