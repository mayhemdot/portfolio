"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import type React from "react";
import { useRef } from "react";
import { Input } from "@/components/Input";
import { LinkButton } from "@/components/LinkButton";
import { Message } from "@/components/Message";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { remapErrors, useAuth } from "@/app/_providers/Auth";
// import {
// 	SignUpSchema,
// 	type SignUpSchemaType,
// } from "@/app/_providers/Auth/validators";

import toast from "react-hot-toast";
import { Button, buttonVariants } from "@/components/ui/button";
import { MESSAGES } from "@/modules/common/data/constants";
import classes from "./index.module.scss";

const CreateAccountForm: React.FC = () => {
	const searchParams = useSearchParams();

	const redirect = searchParams.get("redirect");
	// const {
	// 	create: { mutate: createUser, isPending },
	// } = useAuth();
	// const router = useRouter();

	// const {
	// 	register,
	// 	handleSubmit,
	// 	formState: { errors, isSubmitting },
	// 	setError,
	// } = useForm<SignUpSchemaType>({
	// 	resolver: zodResolver(SignUpSchema),
	// });

	// const onSubmit = (data: SignUpSchemaType) =>
	//   createUser(data, {
	//     onSuccess: (resp) => {
	//       if (!remapErrors(resp, setError, ['email', 'password', 'passwordConfirm'])) {
	//         if (redirect) router.push(redirect as string)
	//         else router.push(`/verify-email?to=${data.email}`)
	//       }
	//     },
	//   })
	const onSubmit = async (e: any) => {
		e.preventDefault();
		toast.error(MESSAGES.register);
	};

	return (
		<form onSubmit={onSubmit} className='relative mb-4 w-full space-y-2'>
			{/* <Message error={errors.root?.message} className={classes.message} /> */}
			<Input
				name='email'
				label='Email Address'
				required
				disabled
				type='email'
			/>
			<Input
				name='password'
				type='password'
				label='Password'
				required
				disabled
			/>
			<Input
				name='passwordConfirm'
				type='password'
				label='Confirm Password'
				required
				disabled
			/>

			<div className='flex w-full items-center justify-between pt-2'>
				<LinkButton
					aria-label='Создать аккаунт'
					type='submit'
					className='w-full grow'
				>
					Создать аккаунт
				</LinkButton>
			</div>
		</form>
	);
};

export default CreateAccountForm;

// const onSubmit = useCallback(
//   async (data: FormData) => {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
//       method: 'POST',
//       body: JSON.stringify(data),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })

//     if (!response.ok) {
//       const message = response.statusText || 'There was an error creating the account.'
//       setError(message)
//       return
//     }

//     const redirect = searchParams.get('redirect')

//     const timer = setTimeout(() => {
//       setLoading(true)
//     }, 1000)

//     try {
//       create(data)
//       clearTimeout(timer)
//       if (redirect) router.push(redirect as string)
//       else router.push(`/verify-email?to=${data.email}`)
//       // else router.push(`/account?success=${encodeURIComponent('Account created successfully')}`)
//     } catch (e) {
//       console.log('[error]', e)
//       clearTimeout(timer)
//       setError('There was an error with the credentials provided. Please try again.')
//     }
//   },
//   [create, router, searchParams]
// )
// console.log('error', error, data)
// console.log('error', error)
{
	/* <Button type="submit" label={loading ? "Processing" : "Create Account"} disabled={loading} appearance="primary" className={classes.submit} /> */
}

{
	/* <Button
        aria-label="Войти в аккаунт"
        aria-disabled={loading}
        type="submit"
        className={buttonVariants({
          variant: "default",
          size: "lg",
          className: "fsNormal ml-auto h-12 basis-1/3 rounded-2xl",
        })}
        disabled={loading} //|| !isDirty || !isValid
      >
        {loading && <ReloadIcon className="mr-3 h-4 w-4 animate-spin " />}
        Войти
      </Button> */
}
