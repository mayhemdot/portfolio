"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/Input";
import { Message } from "@/components/Message";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/modules/users/queries";
import type { User } from "@/modules/users/types";
import classes from "./AccountForm.module.scss";

function BaseSettingsForm({ user }: { user: User }) {
	const [error, setError] = useState("");

	const { user: authUser, login, isLoading } = useAuth();
	const router = useRouter();

	// const {
	// 	register,
	// 	handleSubmit,
	// 	formState: { errors, isValid },
	// 	reset,
	// } = useForm<UpdateUserSchemaType>({
	// 	resolver: zodResolver(UpdateUserSchema),
	// });

	const onSubmit = async (data: any) => login();
	// updateUser(updateData, {
	// 	onSuccess: data => {
	// 		!remapErrors(data, setError, ["name", "email"]);
	// 	},
	// });

	// useEffect(() => {
	// 	if (user === null) {
	// 		router.push(
	// 			`/login?error=${encodeURIComponent(
	// 				"You must be logged in to view this page."
	// 			)}&redirect=${encodeURIComponent("/account")}`
	// 		);
	// 	}

	// 	// Once user is loaded, reset form to have default values
	// 	if (user) {
	// 		reset({
	// 			email: user.email,
	// 			name: user.name,
	// 		});
	// 	}
	// }, [user, router, reset]);

	return (
		<form
			onSubmit={onSubmit}
			className={cn(classes.form, "min-w-64 mx-auto w-full")}
		>
			<Message error={error} className={classes.message} />
			<Input name='id' type='text' value={user?.id} hidden={true} />
			<Input name='name' type='text' label='Name' required />
			<Input name='email' type='text' label='Email Address' required />

			<Button
				aria-label='Обновить аккаунт'
				aria-disabled={isLoading}
				type='submit'
				className={buttonVariants({
					size: "lg",
					className: "mt-2 w-full",
				})}
				disabled={isLoading}
			>
				{isLoading && <ReloadIcon className='size-4 mr-3 animate-spin' />}
				Обновить данные
			</Button>
		</form>
	);
}

export default BaseSettingsForm;

//   const onSubmit = useCallback(
//     async (data: FormData) => {
//       if (user) {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user.id}`, {
//           // Make sure to include cookies with fetch
//           credentials: 'include',
//           method: 'PATCH',
//           body: JSON.stringify({
//             name: data.name,
//             email: data.email,
//           }),
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         })

//         if (response.ok) {
//           const json = await response.json()
//           console.log('new user', json)
//           //   setUser(json.doc)
//           setSuccess('Successfully updated account.')
//           setError('')
//           //   setChangePassword(false)
//           reset({
//             email: json.doc.email,
//             name: json.doc?.name,
//             // password: '',
//             // passwordConfirm: '',
//           })
//         } else {
//           setError('There was a problem updating your account.')
//         }
//       }
//     },
//     [user, reset]
//   )
