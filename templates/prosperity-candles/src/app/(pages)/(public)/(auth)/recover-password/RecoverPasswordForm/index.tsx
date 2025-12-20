"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import type React from "react";
import { Fragment, useCallback, useState } from "react";
import Checkmark from "@/components/Checkmark/Checkmark";
import { Input } from "@/components/Input";
import { Message } from "@/components/Message";
import { Button, buttonVariants } from "@/components/ui/button";
import classes from "./index.module.scss";

type FormData = {
	email: string;
};

export const RecoverPasswordForm: React.FC = () => {
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const isSubmitting = false;
	// const {
	// 	register,
	// 	handleSubmit,

	// 	formState: { errors, isSubmitting },
	// } = useForm<FormData>();

	const onSubmit = useCallback(async (data: any) => {
		// TODO: fix this
		// const response = await fetch(
		// 	`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`,
		// 	{
		// 		method: "POST",
		// 		body: JSON.stringify(data),
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 	}
		// );
		// if (response.ok) {
		// 	setSuccess(true);
		// 	setError("");
		// } else {
		// 	setError(
		// 		"There was a problem while attempting to send you a password reset email. Please try again."
		// 	);
		// }
	}, []);

	return (
		<Fragment>
			{!success && (
				<form onSubmit={onSubmit} className='relative mb-4 w-full space-y-2'>
					<Message error={error} className={classes.message} />
					<Input name='email' label='Email Address' required type='email' />
					<Button
						type='submit'
						aria-label='Восстановить паспорт'
						aria-disabled={isSubmitting}
						className={buttonVariants({
							size: "lg",
							className: "w-full self-end",
						})}
						disabled={isSubmitting}
					>
						{isSubmitting && (
							<ReloadIcon className='size-4 mr-3 animate-spin ' />
						)}
						Восстановить
						{/* { recover password } */}
					</Button>
				</form>
			)}
			{success && (
				<div className='flex gap-4'>
					<Checkmark />
					<div>
						<h1 className='fsMiddle'>Request submitted</h1>
						<p className='fsNormal'>
							Check your email for a link that will allow you to securely reset
							your password.
						</p>
					</div>
				</div>
			)}
		</Fragment>
	);
};
