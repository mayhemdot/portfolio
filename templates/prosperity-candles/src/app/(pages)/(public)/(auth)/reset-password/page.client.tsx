"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import type React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Input } from "@/components/Input";
import { Message } from "@/components/Message";
import { Button, buttonVariants } from "@/components/ui/button";
import classes from "./index.module.scss";

type FormData = {
	password: string;
	token: string;
};

export const ResetPasswordForm: React.FC = () => {
	const [error, setError] = useState("");
	// const {
	// 	login: { mutate: login, isPending },
	// } = useAuth();

	const [isPending, setIsPending] = useState(false);
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	// const {
	// 	register,
	// 	handleSubmit,
	// 	formState: { errors, isSubmitting },
	// 	reset,
	// } = useForm<FormData>();

	// const onSubmit = useCallback(
	// 	async (data: FormData) => {
	// 		const response = await fetch(
	// 			`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/reset-password`,
	// 			{
	// 				method: "POST",
	// 				body: JSON.stringify(data),
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 				},
	// 			}
	// 		);

	// 		if (response.ok) {
	// 			const json = await response.json();

	// 			// Automatically log the user in after they successfully reset password
	// 			login(
	// 				{ email: json.user.email, password: data.password },
	// 				{
	// 					onSuccess: () => {
	// 						setError("");
	// 						router.push("/account?success=Password reset successfully.");
	// 					},
	// 					onError: e => {
	// 						setError(
	// 							"message" in e
	// 								? e.message
	// 								: "There was a problem while resetting your password. Please try again later."
	// 						);
	// 					},
	// 				}
	// 			);

	// 			// Redirect them to `/account` with success message in URL
	// 		} else {
	// 			setError(
	// 				"There was a problem while resetting your password. Please try again later."
	// 			);
	// 		}
	// 	},
	// 	[router, login]
	// );

	// when Next.js populates token within router,
	// reset form with new token value
	// useEffect(() => {
	// 	reset({ token: token || undefined });
	// }, [reset, token]);
	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		toast.success("Successfully reset password.");
	};
	return token ? (
		<form onSubmit={onSubmit} className='relative mb-4 w-full space-y-2'>
			<Message error={error} className={classes.message} />
			<Input
				name='password'
				type='password'
				label='New Password'
				required
				// register={register}
				// error={errors.password}
			/>
			<input type='hidden' />
			{/* <Button type="submit" {...register("token")}  appearance="primary" label="Reset Password" className={classes.submit} /> */}
			<Button
				type='submit'
				aria-label='Восстановить паспорт'
				className={buttonVariants({
					size: "lg",
					className: "fsNormal w-full",
				})}
			>
				{isPending && <ReloadIcon className='size-4 mr-3 animate-spin' />}
				Сбросить пароль
				{/* { Reset Password } */}
			</Button>
		</form>
	) : (
		<div>
			<Message error='Token not found' className='!w-full' />
			<Button
				aria-label='Go to recover password page'
				className={buttonVariants({
					size: "lg",
					className: "fsNormal mt-4 w-full",
				})}
				onClick={() => router.push("/recover-password")}
			>
				Go to recover password page
			</Button>
		</div>
	);
};
