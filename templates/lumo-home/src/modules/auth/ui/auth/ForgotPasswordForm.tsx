"use client";

import { useRouter } from "next/navigation";
import { parseAsString, useQueryState } from "nuqs";
import { InputField } from "@/shared/components/InputField";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";

export function ForgotPasswordFormClient() {
	const [_, setStatus] = useQueryState("status", parseAsString.withDefault(""));

	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState<any>();
	const handleForgotPassword = async (value: any) => {
		// const res = await appAuthClient.forgotPassword({
		//   email: value.email,
		// });
		// if (res.isError) {
		//   toast.error(res.message);
		// } else {
		//   toast.success("Password reset email sent! Please check your inbox.");
		//   // form.reset();
		//   router.push("/forgot-password/confirm");
		// }
	};

	return (
		<form onSubmit={handleForgotPassword}>
			<InputField
				label='Email'
				name='email'
				type='email'
				placeholder='Enter your email'
				autoComplete='email'
				className='mb-4'
				disabled={isLoading}
			/>

			<Button type='submit' disabled={isLoading} className='mt-4 w-full'>
				Send Reset Email
			</Button>

			{errors?.root && (
				<p className='py-4 text-red-600'>{errors.root.toString()}</p>
			)}
		</form>
	);
}
