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
import { MESSAGES } from "@/modules/common/data/constants";
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

	const onSubmit = async (e: any) => {
		e.preventDefault();
		toast.error(MESSAGES.subscription);
	};

	return !isSubscribed ? (
		<form
			className='textBlockSubscribe max-w-96 z-10 flex flex-1 flex-col opacity-0 xl:max-w-[680px]'
			onSubmit={onSubmit}
		>
			<div className='flex h-auto shrink-0 flex-col items-start justify-center gap-4 xl:flex-row'>
				<div className='inline-flex flex-col gap-4'>
					<InputField
						label={""}
						// disabled={isSubmitting}
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
